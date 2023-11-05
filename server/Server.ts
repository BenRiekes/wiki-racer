import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { fileURLToPath } from 'url'
import * as cheerio from 'cheerio';
import path from 'path';
import cors from 'cors';

//---------Setup------------------------

const PORT = 3001;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

//-----------Types---------------------

type Article = {
    title: string;
    body: string;
    url: string;
    links: string[];
    isHref: { [key: string]: boolean }; 
};

//------------API----------------------

app.get('/api/fetch-article', async (req: Request, res: Response) => {

    const requestURL = req.query.url;
    const baseURL = 'https://en.wikipedia.org/wiki/';
    const RANDOM_URL = 'https://en.wikipedia.org/wiki/Special:Random';

    if (typeof requestURL !== 'string' || !requestURL.startsWith(baseURL)) {
        return res.status(400).json({message: 'Invalid URL'});
    }

    try {

        let article: Article = {
            title: '', body: '', url: '',
            links: [], isHref: {}
        };

        const response = await axios.get(requestURL);
        const html = response.data;
        const $ = cheerio.load(html);

        article.url = requestURL; 
        article.title = $('h1:first').text(); //goes to the first h1 of the webpage
        
        //The url will be the random wiki page url 
        //Upon game start. The random url allows me to get the 
        //Start and end urls, and I can still use this functon 
        //For request onwards - might abstract later.

        if (requestURL === RANDOM_URL) { //Wiki urls are always the article title
            article.url = baseURL + article.title.replace(/\s+/g, '_');
        } 

        let paragraphTexts: string[] = [];
        
        //Loop through all of the main content pragraphs
        //Excluding things like references
        $('.mw-parser-output > p').each((_index, pElem) => {
            
            //Get the text of the paragraph and remove all of the weird chars
            let indexText = $(pElem).text().replace(/\n/g, ' ').trim()
            paragraphTexts.push(indexText);

            //Processes links within the paragraph
            $(pElem).find('a[href]').each((_index, element) => {
                const text = $(element).text().trim();
                const link = $(element).attr('href') || '';

                if (!text.includes('[') && !text.includes(']')) { //Excludes citation hrefs
                    article.isHref[text] = true; //Add to href map
                    const absoluteLink = new URL(link, baseURL).href; //Format link
                    article.links.push(absoluteLink) //Push link
                }
            });
        });

        article.body = paragraphTexts.join(' ');
        return res.status(200).json(article); 

    } catch (error: unknown) {

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
})


app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})


