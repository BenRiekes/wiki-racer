import React, { useState, useEffect, useCallback} from 'react';
import axios, { AxiosError } from 'axios';

import Icon from '@mdi/react';
import GameScreen from './GameScreen';
import SettingsScreen from './SettingsScreen';
import SearchInput from '../../Components/SearchInput';
import { Article, PlayerState, fetchArticle } from '../../Utils/Functions'; 

import { mdiRefresh } from '@mdi/js';
import { Button, Box, HStack, Heading, VStack, Flex} from '@chakra-ui/react';

//----------------------------

export interface GameProps {
    isPlaying: boolean;
    playerState: PlayerState | null;
    opponentState: PlayerState | null;
    rootTail: [Article | null, Article | null] | null;

    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    setPlayerState: React.Dispatch<React.SetStateAction<PlayerState | null>>;
    setOpponentState: React.Dispatch<React.SetStateAction<PlayerState | null>>;
    setRootTail: React.Dispatch<React.SetStateAction<[Article | null, Article | null] | null>>;
    
    handlePlayingStatus: () => void;
    fetchArticle: (url?: string) => Promise<Article>;
    handlePlayerState: (article: Article, player: 'Player' | 'Opp') => void;
    handleRootTail: (add: boolean, actions: 'Root' | 'Tail' | 'Both') => Promise<void>;
}


//----------------------------

function GameContainer () {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playerState, setPlayerState] = useState<PlayerState |  null>(null);
    const [opponentState, setOpponentState] = useState<PlayerState | null>(null);
    const [rootTail, setRootTail] = useState<[Article | null, Article | null] | null>(null);

    //---------------------------------------------------------


    function handlePlayingStatus () {
        setIsPlaying(!isPlaying);
    }

    //Checks for win on each turn and sets state of new articles clicked
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

    //Lets user select the start and end articles via randomization
    async function handleRootTail (add: boolean, actions: 'Root' | 'Tail' | 'Both') { 

        const stateMap = {
            'Root': rootTail ? rootTail[0] : null,
            'Tail': rootTail ? rootTail[1] : null,
        }
    
        let root = stateMap['Root'];
        let tail = stateMap['Tail'];
    
        if (actions === 'Root' || actions === 'Both') {
            root = add ? await fetchArticle() : null;
        }
    
        if (actions === 'Tail' || actions === 'Both') {
            tail = add ? await fetchArticle() : null;
        }
        
        setRootTail([root, tail]);
    }

    //--------------------------------------------------------

    const props: GameProps = {
        isPlaying, setIsPlaying, rootTail, setRootTail,
        playerState, setPlayerState, opponentState, setOpponentState,
        fetchArticle, handlePlayingStatus, handlePlayerState, handleRootTail,
    };
 
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