import React, { useState, useRef, useEffect } from "react";

import { GameProps } from "./GameContainer";
import { Article } from "../../Utils/Functions";
import BtnGroup from "../../Components/BtnGroup";
import InptGroup from "../../Components/InptGroup";
import ArticleCard from "../../Components/ArticleCard";



import { Flex, VStack, HStack, Heading, Button, ButtonGroup, 
    IconButton, Divider, InputRightElement, Box, Input, InputGroup, Spinner
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
                    gap={5}  p={5} w='100%' h='auto' 
                    direction={{base:'column', md: 'row'}}
                    alignItems='center' justifyContent='flex-start' 
                    boxShadow='md' borderRadius='lg' 
                >
                    <Heading size='2xl'color='white' alignSelf='flex-start'>
                        Configure
                    </Heading>
                    
                    <Divider orientation='vertical' borderColor='white' />

                    <BtnGroup 
                        action='Root' 
                        rootArticle={props.rootArticle} 
                        tailArticle={props.tailArticle} 
                        rootTailLoading={props.rootTailLoading} 
                        handleRootTail={props.handleRootTail}
                    />

                    <BtnGroup 
                        action='Tail' 
                        rootArticle={props.rootArticle} 
                        tailArticle={props.tailArticle} 
                        rootTailLoading={props.rootTailLoading} 
                        handleRootTail={props.handleRootTail}
                    />

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