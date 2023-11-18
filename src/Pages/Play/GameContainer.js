import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import GameScreen from './GameScreen';
import SettingsScreen from './SettingsScreen';
import { fetchArticle } from '../../Utils/Functions';
//----------------------------
function GameContainer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [winner, setWinner] = useState(null);
    const [playerState, setPlayerState] = useState(null);
    const [opponentState, setOpponentState] = useState(null);
    const [rootArticle, setRootArticle] = useState(null);
    const [tailArticle, setTailArticle] = useState(null);
    const [rootTailLoading, setRootTailLoading] = useState({ 'Root': true, 'Tail': true });
    //---------------------------------------------------------
    async function handlePlayingStatus(value) {
        if (value) {
            if (!rootArticle || !tailArticle) {
                return;
            }
            //Request the body and links for root and tial
            try {
                const updatedRoot = await fetchArticle('URL', rootArticle.url, true);
                const updatedTail = await fetchArticle('URL', tailArticle.url, true);
                setRootArticle(updatedRoot);
                setTailArticle(updatedTail);
                handlePlayerState(updatedRoot, 'Player');
                handlePlayerState(updatedRoot, 'Opp');
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            setPlayerState(null);
            setOpponentState(null);
        }
        setIsPlaying(value);
    }
    //--------------------------------------------------------
    function handlePlayerState(article, player) {
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
                return { ...prevState, currentArticle: article, history: [...history, article] };
            });
        }
        else { //AI
            setOpponentState((prevState) => {
                history = prevState?.history || [];
                return { ...prevState, currentArticle: article, history: [...history, article] };
            });
        }
    }
    function playerStateHistoryRemoveAfterIndex(index, player) {
        if (winner !== null) {
            return;
        }
        let history = player === 'Player' ?
            playerState?.history : opponentState?.history;
        for (let i = history.length - 1; i > index; i--) {
            history.pop();
        }
        player === 'Player' ?
            setPlayerState((prevState) => ({ ...prevState, currentArticle: history[index], history: [...history] })) :
            setOpponentState((prevState) => ({ ...prevState, currentArticle: history[index], history: [...history] }));
    }
    //--------------------------------------------------------
    async function handleRootTail(action, add, value) {
        if (isPlaying) {
            return;
        }
        setRootTailLoading(prev => ({ ...prev, [action]: true }));
        if (!add) {
            action === 'Root' ? setRootArticle(null) : setTailArticle(null);
            setRootTailLoading(prev => ({ ...prev, [action]: false }));
            return;
        }
        const article = await fetchArticle('URL', value, false);
        if (action === 'Root') {
            if (article.url === tailArticle?.url || article.url === rootArticle?.url) {
                setRootTailLoading(prev => ({ ...prev, [action]: false }));
                return;
            }
            setRootArticle(article);
        }
        else if (action === 'Tail') {
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
        setPlayerState, setWinner, setOpponentState,
        handlePlayingStatus, handlePlayerState,
        handleRootTail, playerStateHistoryRemoveAfterIndex
    };
    return (_jsx(Flex, { w: '100%', justifyContent: 'center', children: !isPlaying ? (_jsx(SettingsScreen, { ...props })) : (_jsx(GameScreen, { ...props })) }));
}
export default GameContainer;
