import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

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


function Profile () {
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {

        async function fetchAndSet (type: 'Name' | 'URL', value: string, needsProcessing: boolean) {

            try {
                const res = await axios.get<Article>('api/fetch-article', {
                    params: { value: value, type: type, needsProcessing: needsProcessing }
                });
        
                const resArticleLight: Article = res.data;
                setArticle(resArticleLight);
                
        
            } catch (error: unknown) {

                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;

                    if (axiosError.response?.status === 400) {
                        console.log(error.message);
                    }
                }

                console.error(error);
                return { title: '', url: '' };
            }
        }

        fetchAndSet('Name', 'Chicago', true);
        console.log(article);
    }, [])

    return (
        <div>Play</div>
    )
}

export default Profile; 