import React, { useState, useEffect} from 'react';
import axios, { AxiosError } from 'axios';

import Icon from '@mdi/react';
import { mdiRefresh } from '@mdi/js';
import { Button, Box, HStack, Heading, VStack} from '@chakra-ui/react';
import { Article, PlayerState, fetchArticle } from '../../Utils/Functions';

function SettingsPage () {

    const initArticleState: Article = {
        title: '', body: '' , url: '',
        links: [], isHref: {}
    }

    const [rootTail, setRootTail] = useState<[Article, Article]>(
        [initArticleState, initArticleState]
    );

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

    return (
        <div>Settings Page</div>
    );
}

export default SettingsPage;

/*
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
*/