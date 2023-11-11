import React, { useState, useRef, useEffect } from "react";

import { GameProps } from "./GameContainer";
import { Article } from "../../Utils/Functions";
import BtnGroup from "../../Components/BtnGroup";
import InptGroup from "../../Components/InptGroup";
import ArticleCard from "../../Components/ArticleCard";

import Icon from '@mdi/react';
import { mdiClose, mdiRefresh } from '@mdi/js';
import { Flex, VStack, HStack, Heading, Button, ButtonGroup, 
    IconButton, Divider, InputRightElement, Box, Input, InputGroup, Spinner, useBreakpointValue, Text
} from "@chakra-ui/react";



function SettingsScreen (props: GameProps) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [exploreArticles, setExploreArticles] = useState<Article[]>([]);
    
    useEffect(() => {
        props.handleRootTail('Root', true);
        props.handleRootTail('Tail', true);

        async function fetchArticles () {
            
            try {
                const articlePromises = Array.from({length: 20}, () => props.fetchArticle());
                const articles = await Promise.all(articlePromises);
                setExploreArticles(articles);

            } catch (error) {
                console.error('Failed to fetch articles: ', error);
            } finally {
               setIsLoading(false);
            } 
        }

        fetchArticles();
    }, []);



    //----------------------------------------

    return (
        <Flex width='100%' h='auto' justifyContent='center' bg='blue.100'>

            <VStack w='90%' mt={5} spacing={10} alignItems='center'>

                <Flex 
                    w='100%' gap={5} 
                    direction={{base: 'column', md: 'row'}}
                    boxShadow='md' borderRadius='lg' 
                >

                    <VStack 
                        h='100%' 
                        w={useBreakpointValue({ base: '100%', md: 'auto' })}
                        p={2} spacing={5} 
                        alignSelf={useBreakpointValue({ base: 'center', md: 'flex-start' })}
                        alignItems='flex-start' 
                        
                    >
                        <Heading size='2xl' color='white'>
                            Configure
                        </Heading>

                        <Button size='lg' w='100%' onClick={() => props.handlePlayingStatus()}>
                            Play
                        </Button>
                    </VStack>

                    <Divider 
                        orientation={useBreakpointValue({ base: 'horizontal', md: 'vertical' })} 
                        borderColor='white' 
                    />

                    <VStack 
                        h='100%' 
                        w={useBreakpointValue({ base: '100%', md: '100%' })} 
                        p={2} spacing={5} 
                        alignSelf='flex-start' 
                        alignItems='flex-start'
                        justifyContent='space-evenly' 
                       
                    >
                        
                        
                        <BtnGroup 
                            action='Root' 
                            article={props.rootArticle} 
                            rootTailLoading={props.rootTailLoading} 
                            handleRootTail={props.handleRootTail}
                        />

                        <BtnGroup 
                            action='Tail' 
                            article={props.tailArticle} 
                            rootTailLoading={props.rootTailLoading} 
                            handleRootTail={props.handleRootTail}
                        />          
                    </VStack>
                </Flex>

                <Flex 
                    gap={5}  p={5} w='100%' h='auto' 
                    direction={{base:'column', md: 'row'}}
                    alignItems='center' justifyContent='flex-start' 
                    boxShadow='md' borderRadius='lg'
                >

                    <VStack spacing={5} w='100%' alignSelf='flex-start' wrap='wrap'>

                        <Heading size='xl'color='white' alignSelf='flex-start'>
                            Custom 
                        </Heading>

                        <InptGroup 
                            action='Root' 
                            placeholder='Start Link:' 
                            rootTailLoading={props.rootTailLoading} 
                            handleRootTail={props.handleRootTail}
                        />

                        <InptGroup 
                            action='Tail' 
                            placeholder='End Link:'  
                            rootTailLoading={props.rootTailLoading} 
                            handleRootTail={props.handleRootTail}
                        />

                    </VStack>
                </Flex>

                <VStack p={5} mb={5} spacing={2} width='100%' borderRadius='lg' boxShadow='md'>

                    <Heading alignSelf='flex-start' size='xl' color='white'>
                        Explore
                    </Heading>

                    <Box width='100%' overflowX='scroll'

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
                        <HStack spacing={5} paddingY='15px'>

                            {isLoading ? (
                                Array.from({ length: 20 }).map((_, index) => (
                                    <ArticleCard key={index} isLoading={true} gameProps={props} />
                                ))
                            ) : (
                                exploreArticles.map((article, index) => (
                                    <ArticleCard key={index} article={article} isLoading={false} gameProps={props} />
                                ))
                            )}
                        </HStack>
                    </Box>
               </VStack>
            </VStack>
        </Flex>
    );
}

export default SettingsScreen;