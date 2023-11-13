import React, { useState, useEffect } from "react";

import { GameProps } from "./GameContainer";
import useStopWatch from "../../Hooks/useStopWatch";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { Paragraph, LinkSegment, Article, PlayerState, fetchArticle} from '../../Utils/Functions'; 
import { Flex, VStack, HStack, Heading, Text, Badge, Divider, Box, Link, Stack } from "@chakra-ui/layout";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, useBreakpointValue } from "@chakra-ui/react";

function GameScreen (props: GameProps) {

    const { elapsedTime, handleStart, handleStop, 
        handleReset, formattedTime } = useStopWatch()
    ;
    
    const [minutes, seconds, milliseconds] = formattedTime.split(':');
    const isRowLayout = useBreakpointValue({ base: false, md: true });

    //----------------------------------------

    async function handleLinkClick (url: string) {
        const article = await fetchArticle('URL', url, true);
        props.handlePlayerState(article, 'Player');
    }

    function ArticleDisplay () {
        const article: Article =  props.playerState?.currentArticle as Article;
        if (!article) return;

        return (

            <Box p={2} w='100%'>
                <Heading size='md' mb={5} textDecor='underline'> {article.title}</Heading>

                {article.body?.map((paragraph, pIndex) => (
                    <Text key={pIndex} mb={5}>

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
    
    function AccordionDisplay () {

        const width1= isRowLayout? '15vw' : '100%';
        const width2= isRowLayout? '20vw' : '90%';
        const width3=isRowLayout? undefined : '100%'
        const LinkSegment: LinkSegment[] = props.playerState?.currentArticle?.links as LinkSegment[];

        if (!LinkSegment) return;

        const formatWikiTitleFromURL = (url: string) => {
            const lastSlashIndex = url.lastIndexOf('/');
            const titleWithUnderscores = url.substring(lastSlashIndex + 1);
            const title = titleWithUnderscores.replace(/_/g, ' ');
            return decodeURIComponent(title);
        }
        

        return (
            

            <Accordion allowToggle width={width3} >

                <AccordionItem backgroundColor='gray.200'>

                    <h2>
                        <AccordionButton w={width1}>
                            <Box as="span" flex='1' textAlign='left'>
                                Links 
                            </Box>
                            
                        </AccordionButton>
                    </h2>

                    <AccordionPanel 
                        pb={1} w={width2} 
                        maxH='50vh' overflowY='scroll' 
                        css={{ 
                            '&::-webkit-scrollbar': {
                                width: '0.6em',
                                height: '0.6em',
                                backgroundColor: '#E2E8F0',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#CBD5E0',
                            },
                        }}
                    >
                        
                        <VStack w='100%' spacing={1} align='stretch'>

                            {LinkSegment.map((link, index) => (

                                <Button key={index}  
                                    size='md' 
                                    maxW='100%' 
                                    borderRadius='md' 
                                    backgroundColor='red.100' 
                                    justifyContent='flex-start' 
                                    color='white' isTruncated

                                    onClick={() => handleLinkClick(link.url)}
                                > 
                                    
                                    {formatWikiTitleFromURL(link.url)}
                                    
                                </Button>
                            ))}

                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        )
    }   


    function StopWatch () {
        const fontSize = isRowLayout? 'xl' : 'lg';
        const width = isRowLayout? 'auto' : '100%';

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

                        <Stack direction={isRowLayout ? 'row' : 'column'} w='100%' alignItems='flex-start'>

                            <AccordionDisplay />
                            <ArticleDisplay />
                        </Stack>

                        
                    </VStack>

                </Flex>  
                  
            </VStack>
        </Flex>
    );
}

export default GameScreen;