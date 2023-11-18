import React, { useEffect, useRef } from "react";

import { GameProps } from "./GameContainer";
import BreadCrumbs from "../../Components/BreadCrumbs";
import ArticleDisplay from "../../Components/ArticleDisplay";
import StopWatch from "../../Components/StopWatch";
import EndModal from "../../Components/EndModal";

import { Article, AssistantResponse, fetchArticle, fetchAssistant} from '../../Utils/Functions'; 
import { Flex, VStack, HStack, Heading, Text, Divider } from "@chakra-ui/layout";
import { useBreakpointValue} from "@chakra-ui/react";

function GameScreen (props: GameProps) {
    const isRowLayout = useBreakpointValue({ base: false, md: true });
    
    const requestInProgress = useRef<boolean>(false);
    const threadId = useRef<string | undefined>(undefined);
    
    useEffect(() => {

        async function fetchAssistantResponse () {

            if (
                !requestInProgress.current &&
                props.rootArticle && props.tailArticle &&
                props.opponentState?.currentArticle && props.opponentState?.history
            ) {
                requestInProgress.current = true;

                try {
                    const assistantRes: AssistantResponse = await fetchAssistant(
                        props.rootArticle,
                        props.tailArticle,
                        props.opponentState.currentArticle,
                        props.opponentState.history,
                        threadId.current
                    );

                    if (!threadId.current) {
                        threadId.current = assistantRes.threadId;
                    }

                    if (assistantRes.action === 'continue') {

                        if (!props.opponentState.currentArticle.links) {
                            throw new Error ('No links found for current article');
                        }
                        
                        const selectionURL: string = props.opponentState.currentArticle.links[assistantRes.index].url;
                        const selectionArticle: Article = await fetchArticle('URL', selectionURL, true);
                        props.handlePlayerState(selectionArticle, 'Opp');

                    } else if (assistantRes.action === 'back') {

                        if (!props.opponentState.history) {
                            throw new Error ('No history found for opponent');
                        }

                        props.playerStateHistoryRemoveAfterIndex(assistantRes.index, 'Opp');

                    } else {
                        throw new Error ('Invalid action returned from assistant');
                    }

                } catch (error: unknown) {
                    console.error(error);

                } finally {
                    requestInProgress.current = false;
                } 
            }
        }
        
        if (props.winner === null) {
            setTimeout(fetchAssistantResponse, 10000);
        }

       //Possibly change to playerState.currentArticle
       //To have the ai only trigger when the player goes
    }, [props.opponentState?.currentArticle]);

    //----------------------------------------

    return (
        <>
            <Flex width='100%' h='auto' minHeight='100vh' justifyContent='center' bg='blue.100'>

                <VStack w='90%' mt={5} spacing={0} alignItems='center' boxShadow='xl' bg='white' borderRadius='sm'>

                    <Flex w='100%' gap={3} p={2}
                        flexDirection={isRowLayout ? 'row' : 'column'}
                        alignItems='center' justifyContent='flex-start'
                    >
                        <VStack w='100%' spacing={5} alignItems='flex-start'>

                            {isRowLayout ? (
                                <HStack  spacing={5} w='100%' alignSelf='flex-start' justifyContent='flex-start'>
                                    
                                    <Heading size='md' p={2} borderRadius='md' backgroundColor='gray.200' isTruncated>
                                        Start: {props.rootArticle?.title}
                                    </Heading>

                                    <Heading size='md' p={2} borderRadius='md' backgroundColor='gray.200' isTruncated>
                                        End: {props.tailArticle?.title}
                                    </Heading>
                                </HStack>
                            ): (
                                <VStack w='100%' alignSelf='flex-start' alignItems='flex-start'>

                                    <Heading w='100%' maxW='100%' size='md' p={2} borderRadius='md' backgroundColor='gray.200' isTruncated>
                                        Start: {props.rootArticle?.title}
                                    </Heading>

                                    <Heading w='100%' maxW='100%' size='md' p={2} borderRadius='md' backgroundColor='gray.200' isTruncated>
                                        End: {props.tailArticle?.title}
                                    </Heading>

                                </VStack>
                            )}
                            
                            {isRowLayout ? (
                                <HStack spacing={5} w='100%'>
                                    <StopWatch isRunning={props.isPlaying} isRowLayout={true} />
                                    <BreadCrumbs 
                                        playerState={props.playerState} 
                                        playerStateHistoryRemoveAfterIndex={props.playerStateHistoryRemoveAfterIndex}
                                    />
                                </HStack>
                            ) : (
                                <VStack spacing={5} w='100%'>
                                    <StopWatch isRunning={props.isPlaying} isRowLayout={false} />
                                    <BreadCrumbs 
                                        playerState={props.playerState} 
                                        playerStateHistoryRemoveAfterIndex={props.playerStateHistoryRemoveAfterIndex}
                                    />
                                </VStack>
                            )}
    
                            <Divider orientation='horizontal' borderColor='black' />

                            <ArticleDisplay 
                                isRowLayout={isRowLayout} 
                                playerState={props.playerState} 
                                handlePlayerState={props.handlePlayerState}
                            />
                        </VStack>
                    </Flex>  
                </VStack>
            </Flex>

            <EndModal
                winner={props.winner}
                handlePlayingStatus={props.handlePlayingStatus}
            />
        </>
    );
}

export default GameScreen;