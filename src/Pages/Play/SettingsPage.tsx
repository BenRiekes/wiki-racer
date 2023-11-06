import React, { useState, useEffect} from 'react';
import axios, { AxiosError } from 'axios';

import Icon from '@mdi/react';
import { mdiRefresh } from '@mdi/js';
import { Button, Box, HStack, Heading, VStack} from '@chakra-ui/react';
import { GameProvider, useGame, Article, PlayerState } from '../../Context/GameContext';

function SettingsPage () {

    return (
        <div>Settings Page</div>
    );
}

export default SettingsPage;

