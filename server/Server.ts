import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { fileURLToPath } from 'url'
import * as cheerio from 'cheerio';
import path from 'path';
import cors from 'cors';
import { contains } from 'cheerio/lib/static';
import { Link } from 'react-router-dom';

//---------Setup------------------------

const PORT = 3002;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

//-----------Types---------------------

type Paragraph = 
    Array<string | LinkSegment>
;

type LinkSegment = {
    text: string;
    url: string;
}

type Article = {
    title: string;
    url: string;
    body?: Paragraph[];
    links?: LinkSegment[];
}   

//------------Immutable----------------

const BASE_URL = 'https://en.wikipedia.org/wiki/';
const RANDOM_URL = 'https://en.wikipedia.org/wiki/Special:Random';


function processParagraphs ($: cheerio.CheerioAPI): {body: Paragraph[], links: LinkSegment[]} {
    let links: LinkSegment[] = [];
    let paragraphs: Paragraph[] = [];

    $('.mw-parser-output > p').each((_index, pElement) => {
        let paragraph: Paragraph = [];
        let currentText = '';

        $(pElement).contents().each((_idx, element) => {
           
            if (element.type === 'tag') {
                const tagName = element.tagName.toLowerCase();

                if (tagName === 'a') {
                    const text = $(element).text();
                    const href = $(element).attr('href');

                    if (currentText.trim()) {
                        paragraph.push(currentText);
                        currentText = '';
                    }

                    if (href && !href.includes('#cite_note')) {
                        const url = new URL(href, BASE_URL).href;
                        paragraph.push({ text, url });
                        links.push({ text, url });
                    }

                } else {
                    currentText += $(element).text();
                }
            } else if (element.type === 'text') {
                currentText += $(element).text();
            }
        });

        if (currentText.trim()) {
            paragraph.push(currentText);
        }

        if (paragraph.length > 0) {
            paragraphs.push(paragraph);
        }
    });

    return {body: paragraphs, links: links};
}

//------------API----------------------

app.get('/api/fetch-article', async (req: Request, res: Response) => {
    const value = req.query.value as string;
    const type = req.query.type as | 'Name' | 'URL' | undefined;
    const needsProcessing = req.query.needsProcessing === 'true';

    if (typeof value !== 'string') {
        return res.status(400).json({message: `Invalid value: ${value}`});
    }

    if (type === 'URL' && (value !== RANDOM_URL && !value.startsWith(BASE_URL, 0))) {
        return res.status(400).json({message: `Invalid URL: ${value}`});
    }

    if (type === undefined) {
        return res.status(400).json({message: 'Value cannot be undefined'});
    }

    //----------------------------------------

    async function fetchCheerio (url: string) {
        const response = await axios.get(url);
        return cheerio.load(response.data);
    }

    function formatToWikiURL (name: string): string {

        if (!name) {
            throw new Error('Name is undefined');
        }

        const nameValue: string = value.charAt(0).toUpperCase() + value.slice(1);
        const nameValueWords: string[] = nameValue.split(' ');
        
        const nameValueCapitalizedWords: string[] = nameValueWords.map((word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }));

        const nameValueJoined: string = nameValueCapitalizedWords.join('_');
        return `${BASE_URL}${nameValueJoined}`;
    }

   

    try {
        const cheerioRequestURL: string = type === 'Name' ? formatToWikiURL(value) : value;
        const $: cheerio.CheerioAPI = await fetchCheerio(cheerioRequestURL);

        let article: Article;
        const title = $('h1:first').text();
        const url = `${BASE_URL}${$('h1:first').text().replace(/\s+/g, '_')}`;

        if (!needsProcessing) {
            article = { title: title, url: url}
            return res.status(200).json(article);

        } else {
            const {body, links} = processParagraphs($);

            article = {
                title: title, url: url,
                body: body, links: links
            }

            return res.status(200).json(article);
        }

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


