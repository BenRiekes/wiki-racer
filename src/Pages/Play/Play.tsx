import React, { useState, useEffect} from 'react';
import axios, { AxiosError } from 'axios';


type Article = {
    title: string;
    body: string;
    url: string;
    links: string[];
}
    
type PlayerState = {
    currentArticle: Article;
    history: Article[];
}

//------------------------------
  

function Play () {

    const [article, setArticle] = useState(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {

        const fetchArticle = async () => {

            try {
                const response = await axios.get('/api/fetch-article', {
                    params: {
                      url: 'https://en.wikipedia.org/wiki/Special:Random'
                    }
                });

                setArticle(response.data);
            }

            catch (error: any) {
                setError(error);
            }
        }

        fetchArticle();
    }, []);

    console.log(article);
    console.log(error);

    return (
        <div>Play</div>
    )
}

export default Play; 