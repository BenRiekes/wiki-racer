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
};

const RANDOM_URL = 
    'https://en.wikipedia.org/wiki/Special:Random'
;


//------------API----------------------


app.get('/api/fetch-article', async (req: Request, res: Response) => {

    if (typeof req.query.url !== 'string') {

        return res.status(400).json({
            message: 'Invalid URL'
        });
    }

    try {
        const response = await axios.get(req.query.url);
        const html = response.data;
        console.log('hello' + html);
        const $ = cheerio.load(html);

        const links: string[] = [];
        const title: string = $('h1:first').text();
        const body: string = $('p').toArray().map(element => $(element).text()).join('');

        const url: string = req.query.url.localeCompare(RANDOM_URL) === 0 ? 
            title.replace(/\s+/g, '_') : req.query.url
        ;

        $('p a[href]').each((_index, element) => {
            const text = $(element).text();
            const link = $(element).attr('href');

            if (!text.includes('[') && !text.includes(']')) {
                links.push('https://en.wikipedia.org' + link);
            }
        });

        const article: Article = {title, body, url, links};
        return res.json(article);

    } catch (error: unknown) {

        if (axios.isAxiosError(error)) {

            const axiosError = error as AxiosError;

            console.error('Axios error details:', {
                message: axiosError.message,
                request: axiosError.request,
                response: axiosError.response,
                config: axiosError.config,
            });

            return res.status(500).json({
                message: error.message
            });

        }  else if (error instanceof Error) {

            return res.status(500).json({ 
                message: error.message 
            });

        } else {

            return res.status(500).json({ 
                message: 'An unexpected error of unknown type occureed' 
            });
        }
    }
});

app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})


