import React, { useState, useEffect } from "react";

import { GameProps } from "./GameContainer";
import useStopWatch from "../../Hooks/useStopWatch";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { Paragraph, LinkSegment, Article, PlayerState, fetchArticle} from '../../Utils/Functions'; 
import { Flex, VStack, HStack, Heading, Text, Badge, Divider, Box, Link } from "@chakra-ui/layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, useBreakpointValue } from "@chakra-ui/react";

function GameScreen (props: GameProps) {

    const { elapsedTime, handleStart, handleStop, 
        handleReset, formattedTime } = useStopWatch()
    ;
    
    const [minutes, seconds, milliseconds] = formattedTime.split(':');
    const isRowLayout = useBreakpointValue({ base: false, md: true });

    //----------------------------------------

    function ArticleDisplay () {
        const article: Article =  props.playerState?.currentArticle as Article;
        if (!article) return;

        async function handleLinkClick (url: string) {
            const article = await fetchArticle('URL', url, true);
            props.handlePlayerState(article, 'Player');
        }

        return (

            <Box p={2} w='100%'>
                <Heading size='md' mb={4} textDecor='underline'> {article.title}</Heading>

                {article.body?.map((paragraph, pIndex) => (
                    <Text key={pIndex} mb={2}>

                        {paragraph.map((content, cIndex) => 
                            typeof content === 'string' ? (
                                content
                            ) : (
                                <Link key={cIndex}  color='blue.200' textDecor='underline'
                                    onClick={() => handleLinkClick(content.url)}
                                >
                                    {content.text}
                                </Link>
                            )
                        )}
                    </Text>
                ))}
            </Box>
        );
    }   


    function StopWatch () {
        const fontSize = isRowLayout? 'xl' : 'lg';
        const width = isRowLayout? 'auto' : '100%';
        const alignSelf = isRowLayout? 'flex-start' : 'center';

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
                                <BreadCrumbs playerState={props.playerState} setPlayerState={props.setPlayerState}/>
                            </HStack>
                        ) : (

                            <VStack spacing={5} w='100%'>
                                <StopWatch />
                                <BreadCrumbs playerState={props.playerState} setPlayerState={props.setPlayerState}/>
                            </VStack>
                        )}

                       
                        <Divider 
                            orientation='horizontal' 
                            borderColor='black' 
                        />

                        <ArticleDisplay/>
                    </VStack>

                </Flex>  
                  
            </VStack>
        </Flex>
    );
}

export default GameScreen;