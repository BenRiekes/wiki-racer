import axios, { AxiosError } from 'axios';

export interface Article {
    title: string;
    body: string;
    url: string;
    links: string[];
    isHref: { [key: string]: boolean };
}

export interface PlayerState {
    currentArticle: Article;
    history: Article[];
}


//--------------------------------

export async function fetchArticle (url?: string): Promise<Article> {

    if (typeof url === 'undefined') {
        url = 'https://en.wikipedia.org/wiki/Special:Random';
    }

    try {
        const response = await axios.get<Article>('/api/fetch-article', {
            params: { url: url }
        });
        
        return response.data;
    
    } catch (error) {
        console.log('An error occurred: ', error);
        throw new Error('Faled to fetch article');
    }
}