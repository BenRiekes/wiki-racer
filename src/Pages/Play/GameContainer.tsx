import React, { useState, useEffect} from 'react';
import axios, { AxiosError } from 'axios';

import Icon from '@mdi/react';

import { mdiRefresh } from '@mdi/js';
import { Button, Box, HStack, Heading, VStack} from '@chakra-ui/react';

//----------------------------

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


//----------------------------

function GameContainer () {

    //settings to null is good practice but my god it suks ass to deal w/
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [rootTail, setRootTail] = useState<[Article, Article] | null>(null);
    const [playerState, setPlayerState] = useState<PlayerState |  null>(null);
    const [opponentState, setOpponentState] = useState<PlayerState | null>(null);

    
    //---------------------------------------------------------

    async function fetchArticle (url?: string): Promise<Article> {

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

    //---------------------------------------------------------


    function handlePlayingStatus () {
        setIsPlaying(!isPlaying);
    }

    //Checks for win on each turn and sets state of new articles clicked
    function handlePlayerState (article: Article, player: 'Player' | 'Opp') {

        if (rootTail?.[1].url === article.url) { //Check for win
            alert(`${player} has won in ${playerState?.history.length} clicks!`);
            handlePlayingStatus();
            return;
        }

        let history = [];

        if (player === 'Player') {

            setPlayerState((prevState) => {
                history = prevState?.history || [];
                return {...prevState, currentArticle: article, history: [...history, article]}
            });

        } else { //AI

            setOpponentState((prevState) => {
                history = prevState?.history || [];
                return {...prevState, currentArticle: article, history: [...history, article]}
            });
        }   
    }

    //Lets user select the start and end articles via randomization
    async function handleRootTail (actions: 'Root' | 'Tail' | 'Both') { 

        if (rootTail === null) {
            const [root, tail] = await Promise.all([
                fetchArticle(), fetchArticle()
            ]);

            setRootTail([root, tail]);
            return;
        }

        const root = actions === 'Root' || actions === 'Both' ?
            await fetchArticle() : rootTail[0]
        ;

        const tail = actions === 'Tail' || actions === 'Both' ?
            await fetchArticle() : rootTail[1]
        ;

        setRootTail([root, tail]);
    }
 
    return (

        <div>
            {!isPlaying ? (
                <SettingsScreen />
            ) : (
                <GameScreen />
            )}
        </div>
    )
}

function SettingsScreen () {

    return (
        <div></div>
    );
}

function GameScreen () {

    return (
        <div></div>
    );
}

export default GameContainer; 