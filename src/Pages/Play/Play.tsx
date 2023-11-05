import React, { useState, useEffect} from 'react';
import axios, { AxiosError } from 'axios';


//------------------------------

type Article = {
    title: string;
    body: string;
    url: string;
    links: string[];
    isHref: { [key: string]: boolean };
}
    
type PlayerState = {
    currentArticle: Article;
    history: Article[];
}

//------------------------------

const initState: Article = {
    title: '',
    body: '',
    url: '',
    links: [],
    isHref: {}
} 

function Play () {
    const [article, setArticle] = useState<Article>(initState);

    useEffect(() => {

        const fetchArticle = async () => {

            try {
                const response = await axios.get('/api/fetch-article', {
                    params: {
                      url: 'https://en.wikipedia.org/wiki/Special:Random'
                    }
                });

                setArticle(response.data); 
            } catch (error: any) {
                console.error('An unexpected error occurred: ' + error);
            }
        }

        fetchArticle();
    }, []);

    

    return (
        <div>Play</div>
    )
}

export default Play; 