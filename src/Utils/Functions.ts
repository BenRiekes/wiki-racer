import axios from "axios";

export interface Article {
    title: string;
    body: string;
    url: string;
    links: string[];
    isHref: { [key: string]: boolean };
};

export interface PlayerState {
    currentArticle: Article;
    history: Article[];
};

export async function fetchArticle (url?: string): Promise<Article> {

    if (typeof url === 'undefined') {
        url = 'https://en.wikipedia.org/wiki/Special:Random';
    }

    try {
        const res = await axios.get<Article>('/api/fetch-article', {
            params: { url: url }
        });

        const resArticle: Article = res.data;
        return resArticle;

    } catch (error) {
        console.log('Error occurred: ' + error);
        throw new Error ('Failed to fetch article');
    }
} 