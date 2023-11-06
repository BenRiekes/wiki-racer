import React, { useState, useEffect} from 'react';
import axios, { AxiosError } from 'axios';

import Icon from '@mdi/react';
import GamePage from './GamePage';
import SettingsPage from './SettingsPage';

import { mdiRefresh } from '@mdi/js';
import { Button, Box, HStack, Heading, VStack} from '@chakra-ui/react';
import { Article, PlayerState, fetchArticle } from '../../Utils/Functions';

//----------------------------

function GameContainer () {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const startGame = () => setIsPlaying(true);
    const endGame = () => setIsPlaying(false);


    return (
        <Box>
            
        </Box>
    )
}

export default GameContainer; 