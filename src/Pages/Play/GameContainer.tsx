import React, { useState, useEffect, useCallback} from 'react';
import axios, { AxiosError } from 'axios';

import Icon from '@mdi/react';
import GameScreen from './GameScreen';
import SettingsScreen from './SettingsScreen';
import SearchInput from '../../Components/SearchInput';
import { Paragraph, LinkSegment, Article, PlayerState, fetchArticle} from '../../Utils/Functions'; 

import { mdiRefresh } from '@mdi/js';
import { Button, Box, HStack, Heading, VStack, Flex} from '@chakra-ui/react';

//----------------------------


export interface GameProps {
    isPlaying: boolean;
    playerState: PlayerState | null;
    opponentState: PlayerState | null;

    rootArticle: Article | null;
    tailArticle: Article | null;
    rootTailLoading: {[key: string]: boolean};

    handlePlayingStatus: (value: boolean) => void;
    handlePlayerState: (article: Article, player: 'Player' | 'Opp') => void;
    handleRootTail: (action: 'Root' | 'Tail', add: boolean, value: string) => void;
}


//----------------------------

function GameContainer () {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playerState, setPlayerState] = useState<PlayerState |  null>(null);
    const [opponentState, setOpponentState] = useState<PlayerState | null>(null);
    
    const [rootArticle, setRootArticle] = useState<Article | null>(null);
    const [tailArticle, setTailArticle] = useState<Article | null>(null);
    const [rootTailLoading, setRootTailLoading] = useState<{[key: string]: boolean}>({'Root': true, 'Tail': true});

    //---------------------------------------------------------

    async function handlePlayingStatus (value: boolean) {

        if (value) {

            if (!rootArticle || !tailArticle) {
                return;
            }

            //Request the body and links for root and tial
            const updatedRoot = await fetchArticle('URL', rootArticle.url, true);
            const updatedTail = await fetchArticle('URL', tailArticle.url, true);

            setRootArticle(updatedRoot); 
            setTailArticle(updatedTail);
            handlePlayerState(updatedRoot, 'Player');
            handlePlayerState(updatedRoot, 'Opp');
        } else {
            setPlayerState(null);
            setOpponentState(null);
        }

        setIsPlaying(value);
    }

    function handlePlayerState (article: Article, player: 'Player' | 'Opp') {

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

    async function handleRootTail(action: 'Root' | 'Tail', add: boolean, value: string) {

        setRootTailLoading(prev => ({ ...prev, [action]: true }));
    
        if (!add) {
            action === 'Root' ? setRootArticle(null) : setTailArticle(null);
            setRootTailLoading(prev => ({ ...prev, [action]: false }));
            return;
        }
    
        const article: Article = await fetchArticle('URL', value, false);
    
        if (action === 'Root') {

            if (article.url === tailArticle?.url || article.url === rootArticle?.url) {
                setRootTailLoading(prev => ({ ...prev, [action]: false }));
                return;
            }

            setRootArticle(article);

        } else if (action === 'Tail') {

            if (article.url === rootArticle?.url || article.url === tailArticle?.url) {
                setRootTailLoading(prev => ({ ...prev, [action]: false }));
                return;
            }

            setTailArticle(article);
        }
    
        // Stop loading after setting the article
        setRootTailLoading(prev => ({ ...prev, [action]: false }));
    }

    const props = {
        isPlaying, playerState, opponentState, 
        rootArticle, tailArticle, rootTailLoading,
        handlePlayingStatus, handlePlayerState, handleRootTail
    }
 
    return (

        <Flex w='100%' justifyContent='center'>
            {!isPlaying ? (
                <SettingsScreen {...props}/>
            ) : (
                <GameScreen {...props}/>
            )}
        </Flex>
    )
}


export default GameContainer; 