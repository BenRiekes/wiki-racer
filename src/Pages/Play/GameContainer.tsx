import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import GameScreen from './GameScreen';
import SettingsScreen from './SettingsScreen';
import { Article, PlayerState, fetchArticle} from '../../Utils/Functions'; 

//----------------------------

export interface GameProps {
    isPlaying: boolean;
    winner: 'Player' | 'Opp' | null;
    playerState: PlayerState | null;
    opponentState: PlayerState | null;

    rootArticle: Article | null;
    tailArticle: Article | null;
    rootTailLoading: {[key: string]: boolean};

    handlePlayingStatus: (value: boolean) => void;
    setWinner: React.Dispatch<React.SetStateAction<'Player' | 'Opp' | null>>;
    setPlayerState: React.Dispatch<React.SetStateAction<PlayerState | null>>;
    setOpponentState: React.Dispatch<React.SetStateAction<PlayerState | null>>;
    handlePlayerState: (article: Article, player: 'Player' | 'Opp') => void;
    handleRootTail: (action: 'Root' | 'Tail', add: boolean, value: string) => void;
    playerStateHistoryRemoveAfterIndex: (index: number, player: 'Player' | 'Opp') => void;
}

//----------------------------

function GameContainer () {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [winner, setWinner] = useState<'Player' | 'Opp' | null>(null);

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
            try {
                const updatedRoot: Article = await fetchArticle('URL', rootArticle.url, true);
                const updatedTail: Article = await fetchArticle('URL', tailArticle.url, true);

                setRootArticle(updatedRoot); 
                setTailArticle(updatedTail);
                handlePlayerState(updatedRoot, 'Player');
                handlePlayerState(updatedRoot, 'Opp');
            } catch (error) {
                console.log(error);
            }
           
        } else {
            setPlayerState(null);
            setOpponentState(null);
        }

        setIsPlaying(value);
    }

    //--------------------------------------------------------

    function handlePlayerState (article: Article, player: 'Player' | 'Opp') {

        let history = [];

        if (winner !== null) {
            return;
        }

        if (tailArticle?.url === article.url) {
            setWinner(player);
            return;
        }

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

    function playerStateHistoryRemoveAfterIndex (index: number, player: 'Player' | 'Opp') {

        if (winner !== null) {
            return;
        }

        let history: Article[] = player === 'Player' ?
            (playerState?.history as Article[]) : (opponentState?.history as Article[])
        ;

        for (let i = history.length - 1; i > index; i--) {
            history.pop();
        }

        player === 'Player' ?
            setPlayerState((prevState) => ({...prevState, currentArticle: history[index], history: [...history]})) :
            setOpponentState((prevState) => ({...prevState, currentArticle: history[index], history: [...history]}))
        ;
    }

    //--------------------------------------------------------

    async function handleRootTail(action: 'Root' | 'Tail', add: boolean, value: string) {

        if (isPlaying) {
            return;
        }

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
    
        //Stop loading after setting the article
        setRootTailLoading(prev => ({ ...prev, [action]: false }));
    }

    const props = {
        isPlaying, winner, playerState, opponentState, 
        rootArticle, tailArticle, rootTailLoading,
        setPlayerState, setWinner,
        setOpponentState,
        handlePlayingStatus, 
        handlePlayerState, 
        handleRootTail,
        playerStateHistoryRemoveAfterIndex
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