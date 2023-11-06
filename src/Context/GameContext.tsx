import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';

//--------------------------------

interface GameContextState {
    isPlaying: boolean;
    handleIsPlaying: () => void;
    playerState: PlayerState | null;
    handlePlayerState: (article: Article) => void;
    opponentState: PlayerState | null;
    handleOpponentState: (article: Article) => void;
    rootTail: [Article, Article] | null;
    handleRootTail: (actions: 'Root' | 'Tail' | 'Both') => Promise<void>;
}

export interface Article {
    title: string;
    body: string;
    url: string;
    links: string[];
    isHref: { [key: string]: boolean };
}

export interface PlayerState {
    currentArticle: Article;
    history: Article[];
}

interface GameProviderProps {
    children: React.ReactNode
}

//--------------------------------

const defaultGameContextState: GameContextState = {
    isPlaying: false,
    handleIsPlaying: () => {},
    playerState: null,
    handlePlayerState: () => {},
    opponentState: null,
    handleOpponentState: () => {},
    rootTail: null,
    handleRootTail: async () => {},
};

const GameContext = createContext<GameContextState>(
    defaultGameContextState
);

//------------------------------

export function useGame() {
    const context = useContext(GameContext);

    if (!context) {
      throw new Error('useGame must be used within a GameProvider');
    }

    return context;
}

export function GameProvider({ children}: { children: ReactNode }) {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [rootTail, setRootTail] = useState<[Article, Article] | null>(null)
    const [playerState, setPlayerState] = useState<PlayerState | null>(null);
    const [opponentState, setOpponentState] = useState<PlayerState | null>(null);

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

    function handleIsPlaying () {
        setIsPlaying(!isPlaying);
    }

    function handlePlayerState (article: Article) {
        
        setPlayerState((prevState) => {
            if (!prevState) return null;
            return {
                ...prevState, currentArticle: article,
                history: [...prevState.history, article]
            }
        });
    }

    function handleOpponentState (article: Article) {

        setOpponentState((prevState) => {
            if (!prevState) return null;
            return {
                ...prevState, currentArticle: article,
                history: [...prevState.history, article]
            }
        });
    }

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

    const value = {
        isPlaying, handleIsPlaying, playerState, handlePlayerState,
        opponentState, handleOpponentState, rootTail, handleRootTail
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}
 

   



