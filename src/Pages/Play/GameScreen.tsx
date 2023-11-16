import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";

import { GameProps } from "./GameContainer";
import useStopWatch from "../../Hooks/useStopWatch";
import BreadCrumbs from "../../Components/BreadCrumbs";
import ArticleDisplay from "../../Components/ArticleDisplay";
import EndModal from "../../Components/EndModal";


import { Article, AssistantResponse, fetchArticle, fetchAssistant} from '../../Utils/Functions'; 
import { Flex, VStack, HStack, Heading, Text, Badge, Divider, Box, Link, Stack } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, Button, ModalFooter, ModalHeader, ModalOverlay, useBreakpointValue, useDisclosure } from "@chakra-ui/react";

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

                    console.log(`
                        | ---------- Assistant Response ---------- | \n
                        | Thread ID: ${assistantRes.threadId}
                        | Action: ${assistantRes.action}
                        | Index: ${assistantRes.index}
                    `);
                    
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
            fetchAssistantResponse();
        }

       
    }, [props.opponentState?.currentArticle]);



    //----------------------------------------
    
    function StopWatch () {
        const { elapsedTime, handleStart, handleStop,  handleReset, formattedTime } = useStopWatch();

        const fontSize = isRowLayout? 'xl' : 'lg';
        const width = isRowLayout? 'auto' : '100%';
        const [minutes, seconds, milliseconds] = formattedTime.split(':');

        return (
            <HStack width={width} spacing={1} p={1} alignSelf='flex-start' justifyContent='center'   borderRadius='md' backgroundColor='blue.100' color='white' >
                <Text fontSize={fontSize} fontWeight='bold'>{minutes}</Text>
                <Text fontSize={fontSize}>:</Text>
                <Text fontSize={fontSize} fontWeight='bold'>{seconds}</Text>
                <Text fontSize={fontSize}>:</Text>
                <Text fontSize={fontSize} fontWeight='bold'>{milliseconds}</Text>
            </HStack>
        )
    }


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
                                    <StopWatch />

                                    <BreadCrumbs 
                                        playerState={props.playerState} 
                                        playerStateHistoryRemoveAfterIndex={props.playerStateHistoryRemoveAfterIndex}
                                    />
                                </HStack>
                            ) : (

                                <VStack spacing={5} w='100%'>
                                    <StopWatch />

                                    <BreadCrumbs 
                                        playerState={props.playerState} 
                                        playerStateHistoryRemoveAfterIndex={props.playerStateHistoryRemoveAfterIndex}
                                    />
                                </VStack>
                            )}
    
                            <Divider 
                                orientation='horizontal' 
                                borderColor='black' 
                            />

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