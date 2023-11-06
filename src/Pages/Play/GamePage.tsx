import React, { useState, useEffect} from 'react';
import axios, { AxiosError } from 'axios';

import Icon from '@mdi/react';
import { mdiRefresh } from '@mdi/js';
import { Button, Box, HStack, Heading, VStack} from '@chakra-ui/react';
import { GameProvider, useGame, Article, PlayerState } from '../../Context/GameContext';


interface GamePageProps {
    rootArticle: Article;
    tailArticle: Article;
}

function GamePage (props: GamePageProps, ) {

    const initPlayerState: PlayerState = {
        currentArticle: props.rootArticle,
        history: [props.tailArticle]
    }

    const [playerState, setPlayerState] = useState<PlayerState>(initPlayerState);
    const [opponenetState, setOpponentState] = useState<PlayerState>(initPlayerState);
    
    return (
        <div>GamePage</div>
    );
}

export default GamePage; 