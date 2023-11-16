import axios, { AxiosError } from "axios";

export type Paragraph = 
    Array<string | LinkSegment>
;

export type LinkSegment = {
    text: string;
    url: string;
}

export type Article = {
    title: string;
    url: string;
    body?: Paragraph[];
    links?: LinkSegment[];
}

export type PlayerState = {
    currentArticle: Article;
    history: Article[];
};

export type AssistantResponse = {
    action: 'continue' | 'back';
    index: number;
    threadId: string;
}

export const BASE_URL = 'https://en.wikipedia.org/wiki/';
export const RANDOM_URL = 'https://en.wikipedia.org/wiki/Special:Random';

export async function fetchArticle (type: 'Name' | 'URL', value: string, needsProcessing: boolean): Promise<Article> {

    try {
        const res = await axios.get<Article>('api/fetch-article', {
            params: { type: type, value: value, needsProcessing: needsProcessing }
        });

        const article: Article = res.data;
        return article;

    } catch (error: unknown) {
        throw new Error('Failed to fetch article');
    }
}

export async function fetchAssistant (rootArticle: Article, tailArticle: Article, currentArticle: Article, history: Article[], threadId?: string) {

    try {
        const res = await axios.post<AssistantResponse>('api/assistant', {
            rootArticle: rootArticle,
            tailArticle: tailArticle,
            currentArticle: currentArticle,
            history: history,
            threadId: threadId ? threadId : undefined
        });

        const assistantResponse: AssistantResponse = res.data;
        console.log(assistantResponse);
        return assistantResponse;

    } catch (error: unknown) {
        throw new Error('Failed to fetch assistant');
    }
}


