import axios from "axios";
export const BASE_URL = 'https://en.wikipedia.org/wiki/';
export const RANDOM_URL = 'https://en.wikipedia.org/wiki/Special:Random';
export async function fetchArticle(type, value, needsProcessing) {
    try {
        const res = await axios.get('api/fetch-article', {
            params: { type: type, value: value, needsProcessing: needsProcessing }
        });
        const article = res.data;
        return article;
    }
    catch (error) {
        throw new Error('Failed to fetch article');
    }
}
export async function fetchAssistant(rootArticle, tailArticle, currentArticle, history, threadId) {
    try {
        const res = await axios.post('api/assistant', {
            rootArticle: rootArticle,
            tailArticle: tailArticle,
            currentArticle: currentArticle,
            history: history,
            threadId: threadId ? threadId : undefined
        });
        const assistantResponse = res.data;
        return assistantResponse;
    }
    catch (error) {
        throw new Error('Failed to fetch assistant');
    }
}
