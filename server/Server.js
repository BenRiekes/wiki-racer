import express from 'express';
import axios from 'axios';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as cheerio from 'cheerio';
//---------Setup------------------------
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = 3002;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.static(path.join(__dirname, '../build')));
//----------Open AI -------------------

const openai = new OpenAI({
    apiKey: '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' //process.env.OPEN_AI_KEY
});

//------------Immutable----------------
const BASE_URL = 'https://en.wikipedia.org/wiki/';
const RANDOM_URL = 'https://en.wikipedia.org/wiki/Special:Random';

function processParagraphs($) {
    let links = [];
    let paragraphs = [];
    $('.mw-parser-output > p').each((_index, pElement) => {
        let paragraph = [];
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
                }
                else {
                    currentText += $(element).text();
                }
            }
            else if (element.type === 'text') {
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
    return { body: paragraphs, links: links };
}
//------------API----------------------
app.post('/api/assistant', async (req, res) => {
    const { rootArticle, tailArticle, currentArticle, articleHistory, threadId } = req.body;
    function formatMessage() {
        const getLinks = () => {
            if (!currentArticle.links) {
                return [];
            }
            const formatWikiTitleFromURL = (url) => {
                const lastSlashIndex = url.lastIndexOf('/');
                const titleWithUnderscores = url.substring(lastSlashIndex + 1);
                const title = titleWithUnderscores.replace(/_/g, ' ');
                return decodeURIComponent(title);
            };
            let linksArr = [];
            for (let i = 0; i < currentArticle.links.length; i++) {
                const str = `${formatWikiTitleFromURL(currentArticle.links[i].url)}`;
                linksArr.push(str);
            }
            return linksArr;
        };
        const getHistory = () => {
            if (!articleHistory || articleHistory.length === 1) {
                return [];
            }
            let historyArr = [];
            for (let i = 0; i < articleHistory.length; i++) {
                const str = `${articleHistory[i].title}`;
                historyArr.push(str);
            }
            return historyArr;
        };
        const rootMsg = `The article you are starting from: ${rootArticle.title}.`;
        const tailMsg = `The article you are trying to reach: ${tailArticle.title}.`;
        const currentMsg = `The article you are currently on: ${currentArticle.title}.`;
        const linksMsg = currentArticle.links && currentArticle.links.length > 0 ?
            (`Fowards array: [${getLinks().join(', ')}]\n`) :
            ('Fowards array: The fowards array is empty, please select an index from the backwards array');
        const historyMsg = articleHistory && articleHistory.length > 1 ?
            (`Backwards array: [${getHistory().join(', ')}]\n`) :
            ('Backwards array: You are on the first article, please select an index from the fowards array');
        const compiledMsg = `
            ${rootMsg}\n ${tailMsg} \n${currentMsg} \n${linksMsg}\n ${historyMsg}
        `;
        return (compiledMsg);
    }
    try {
        const thread = threadId ?
            (await openai.beta.threads.retrieve(threadId)) :
            (await openai.beta.threads.create());
        const message = await openai.beta.threads.messages.create(thread.id, {
            role: 'user',
            content: formatMessage(),
        });
        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: 'asst_ZYH8Z1KeiTGIkXaqvbzXk3lC',
        });
        console.log('--------------------------------------');
        console.log(`| Run:\n| Run ID: ${run.id}\n| Thread ID: ${thread.id}\n| Message ID: ${message.id}`);
        console.log('--------------------------------------');
        while (true) {
            const runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
            if (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
                setTimeout(() => { }, 500);
            }
            if (runStatus.status === 'completed') {
                console.log('| Run Status: Completed');
                console.log('--------------------------------------');
                break;
            }
            if (runStatus.status === 'failed') {
                console.log('| Run Status: Failed');
                console.log('--------------------------------------');
                return res.status(500).json({ message: 'An unknown error occured' });
            }
        }
        async function getLatestMessage() {
            const messages = await openai.beta.threads.messages.list(thread.id, {
                order: 'desc'
            });
            const latest = () => {
                for (let i = 0; i < messages.data.length; i++) {
                    if (messages.data[i].role === 'assistant') {
                        return messages.data[i].content[0].text.value;
                    }
                }
                throw new Error('No latest message found');
            };
            const regex = /(continue|back)\s+(\d+)/i;
            const match = latest().match(regex);
            if (!match) {
                throw new Error('No valid action found');
            }
            return {
                action: match[1],
                index: parseInt(match[2])
            };
        }
        const { action, index } = await getLatestMessage();
        console.log(`| Action: ${action}, Index: ${index}`);
        res.status(200).json({ action: action, index: index, threadId: thread.id });
    }
    catch (error) {
        return res.status(500).json({ message: 'An unknown error occured' });
    }
});
app.get('/api/fetch-article', async (req, res) => {
    const value = req.query.value;
    const type = req.query.type;
    const needsProcessing = req.query.needsProcessing === 'true';
    if (typeof value !== 'string') {
        return res.status(400).json({ message: `Invalid value: ${value}` });
    }
    if (type === 'URL' && (value !== RANDOM_URL && !value.startsWith(BASE_URL, 0))) {
        return res.status(400).json({ message: `Invalid URL: ${value}` });
    }
    if (type === undefined) {
        return res.status(400).json({ message: 'Value cannot be undefined' });
    }
    //----------------------------------------
    async function fetchCheerio(url) {
        const response = await axios.get(url);
        return cheerio.load(response.data);
    }
    function formatToWikiURL(name) {
        if (!name) {
            throw new Error('Name is undefined');
        }
        const nameValue = value.charAt(0).toUpperCase() + value.slice(1);
        const nameValueWords = nameValue.split(' ');
        const nameValueCapitalizedWords = nameValueWords.map((word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }));
        const nameValueJoined = nameValueCapitalizedWords.join('_');
        return `${BASE_URL}${nameValueJoined}`;
    }
    try {
        const cheerioRequestURL = type === 'Name' ? formatToWikiURL(value) : value;
        const $ = await fetchCheerio(cheerioRequestURL);
        let article;
        const title = $('h1:first').text();
        const url = `${BASE_URL}${$('h1:first').text().replace(/\s+/g, '_')}`;
        if (!needsProcessing) {
            article = { title: title, url: url };
            return res.status(200).json(article);
        }
        else {
            const { body, links } = processParagraphs($);
            article = {
                title: title, url: url,
                body: body, links: links
            };
            return res.status(200).json(article);
        }
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error;
            return res.status(500).json({ message: axiosError.message });
        }
        else if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: 'An unknown error occured' });
        }
    }
});
app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
