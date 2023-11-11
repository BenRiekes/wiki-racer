import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { fileURLToPath } from 'url'
import * as cheerio from 'cheerio';
import path from 'path';
import cors from 'cors';
import { contains } from 'cheerio/lib/static';

//---------Setup------------------------

const PORT = 3002;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

//-----------Types---------------------

interface Article {
    title: string;
    body: string;
    url: string;
    links: string[];
    isHref: { [key: string]: boolean }; 
};

//------------Immutable----------------

const BASE_URL = 'https://en.wikipedia.org/wiki/';
const RANDOM_URL = 'https://en.wikipedia.org/wiki/Special:Random';

//------------Helpers----------------

function containsWhiteSpace (str: string): boolean {
    return /\s/g.test(str);
}

function replaceWhiteSpace (str: string): string {
    return str.replace(/\s/g, '_');
}

function formatURL (title: string): string {
    return BASE_URL + title.replace(/\s+/g, '_');
}

//------------Functions----------------

async function fetchArticleContent (url: string) {
    const response = await axios.get(url);
    return cheerio.load(response.data);
}

function processTitleURL ($: cheerio.CheerioAPI) {
    const title = $('h1:first').text();
    const url = formatURL(title);
    return { title, url };
}

function processParagraphs ($: cheerio.CheerioAPI) {
    let paragraphTexts: string[] = [];
    let links: string[] = [];
    let isHref: { [key: string]: boolean } = {};

    $('.mw-parser-output > p').each((_index, pElement) => {

        let indexText = $(pElement).text().replace(/\n/g, ' ').trim();
        paragraphTexts.push(indexText);

        $(pElement).find('a[href]').each((_index, element) => {
            const text = $(element).text().trim();
            const link = $(element).attr('href') || '';

            //Ignore citations:
            if (!text.includes('[') && !text.includes(']')) {
                isHref[text] = true;
                const absoluteLink = new URL(link, BASE_URL).href;
                links.push(absoluteLink);
            }
        });
    });

    return { paragraphTexts, links, isHref };
}

//------------API----------------------


app.get('/api/fetch-article', async (req: Request, res: Response) => {

    let requestURL = req.query.url as string;

    if (typeof requestURL !== 'string') {
        return res.status(400).json({message: `Invalid URL: ${requestURL}`});
    }

    if (requestURL !== RANDOM_URL && !requestURL.startsWith(BASE_URL, 0)) {
        return res.status(400).json({message: `Invalid URL: ${requestURL}`});
    }

    if (containsWhiteSpace(requestURL)) {
        requestURL = replaceWhiteSpace(requestURL);
    }

    try {
        const $ = await fetchArticleContent(requestURL);
        const { title, url } = processTitleURL($);
        const { paragraphTexts, links, isHref } = processParagraphs($);

        let article: Article = {
            title: title,
            body: paragraphTexts.join(' '),
            url: url,
            links: links,
            isHref: isHref
        };
        
        return res.status(200).json(article);

    } catch (error) {

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            return res.status(500).json({message: axiosError.message});
        } 
                
        else if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        } 
                
        else {
            return res.status(500).json({message: 'An unknown error occured'});
        }
    }
});


app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})


