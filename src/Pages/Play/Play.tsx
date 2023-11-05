import React, { useState, useEffect} from 'react';
import axios, { AxiosError } from 'axios';

import Icon from '@mdi/react';
import { mdiRefresh } from '@mdi/js';
import { Button, Box, HStack, Heading, VStack} from '@chakra-ui/react';


//------------------------------

interface Article {
    title: string;
    body: string;
    url: string;
    links: string[];
    isHref: { [key: string]: boolean };
}
    
interface PlayerState {
    currentArticle: Article;
    history: Article[];
}

//------------------------------

const initArticleState: Article = {
    title: '',
    body: '',
    url: '',
    links: [],
    isHref: {}
}

const initPlayerState: PlayerState = {
    currentArticle: initArticleState,
    history: []
}

//-----------------------------

function Play () {

    const [playerState, setPlayerState] = useState<PlayerState>(initPlayerState);
    const [opponentState, setOpponentState] = useState<PlayerState>(initPlayerState);
    const [rootTail, setRootTail] = useState<[Article, Article]>([initArticleState, initArticleState]);

    //--------------------------

    async function fetchArticle (url?: string): Promise<Article> {

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

    //----------------------------

    async function fetchRootAndTail (actions: 'Root' | 'Tail' | 'Both') {

        const root = actions === 'Root' || actions == 'Both' ?
            await fetchArticle() : rootTail[0]
        ;

        const tail = actions === 'Tail' || actions === 'Both' ?
            await fetchArticle() : rootTail[1]
        ;

        setRootTail([root, tail]);
    }

    useEffect(() => {
        fetchRootAndTail('Both');
    }, [])

    //----------------------------

    const GameHeader: React.FC = () => {

        const handleVisitClick = (index: number) => {
            window.open(rootTail[index].url, '_blank');
        }

        return (

            <VStack 
                width='45%' backgroundColor='brand.400'
                borderRadius='md' spacing={2} alignItems='flex-start'
            >
                <HStack m={2} justifyContent='flex-start'>

                    <Button size ='md' variant='outline' color='brand.600'
                        rightIcon={<Icon path={mdiRefresh} size={1}/>}
                        onClick = {() => {fetchRootAndTail('Root')}}
                    >
                        <Heading size='md'>Start:</Heading>
                    </Button>

                    <Heading size='md' color='brand.600' textDecor='underline' cursor='pointer'
                        onClick = {() => {handleVisitClick(0)}}
                    >
                        {rootTail[0].title}
                    </Heading>
                </HStack>

                <HStack m={2} justifyContent='flex-start'>

                    <Button size ='md' variant='outline' color='brand.600'
                        rightIcon={<Icon path={mdiRefresh} size={1}/>}
                        onClick = {() => {fetchRootAndTail('Tail')}}
                    >
                        <Heading size='md'>End:</Heading>
                    </Button>

                    <Heading size='md' color='brand.600' textDecor='underline' cursor='pointer'
                        onClick = {() => {handleVisitClick(1)}}
                    >
                        {rootTail[1].title}
                    </Heading>
                </HStack>

                <Button m={2} w='90%' alignSelf='center' size='md' variant='outline' color='brand.600'
                    onClick = {() => {fetchRootAndTail('Both')}}
                >
                    Randomize
                </Button> 
               
            </VStack>
        );
    }
    

    return (
        
        <VStack w='100%' mt={15} spacing={10} alignItems='center'>

            <GameHeader />
        </VStack>
    )
}

export default Play; 