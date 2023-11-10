import React, { useState, useRef, useEffect } from "react";

import { GameProps } from "./GameContainer";
import { Article } from "../../Utils/Functions";
import ArticleCard from "../../Components/ArticleCard";

import Icon from "@mdi/react";
import { mdiClose, mdiRefresh, mdiCheck} from "@mdi/js";
import { Flex, VStack, HStack, Heading, Button, ButtonGroup, 
    IconButton, Divider, InputRightElement, Box, Input, InputGroup
} from "@chakra-ui/react";




function SettingsScreen (props: GameProps) {

    const articlesGenerated = 20;
    const endRef = useRef<HTMLInputElement | null>(null);
    const startRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [exploreArticles, setExploreArticles] = useState<Article[]>([]);

    useEffect(() => {
        props.handleRoot(true);
        props.handleTail(true);

        async function fetchArticles () {
            
            try {
                const articlePromises = Array.from({length: articlesGenerated}, () => props.fetchArticle());
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

    function truncate (text: string, length: number): string {

        if (text.length < length) {
            return text;
        }
    
        return text.substring(0, length) + '...';
    }

    function handleInput(ref: React.RefObject<HTMLInputElement>, handler: (add: boolean, url?: string) => void) {
        
        if (ref.current?.value) {
            handler(true, ref.current.value);
        }
    }

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

                    {props.rootTail?.map((article, index) => (

                        <VStack spacing={2} alignSelf='flex-start' wrap='wrap' key={index}>

                            <Heading size='lg' color='white' alignSelf='flex-start'>
                                {index === 0 ? 'Start' : 'End'}:
                            </Heading>

                            {article ? (

                                <ButtonGroup size='lg' variant='solid' isAttached>

                                    <Button 
                                        onClick = {() => window.open(article.url, '_blank')}
                                    >
                                        
                                        {truncate(article.title, 8)}  
                                    </Button>

                                    <IconButton 
                                        aria-label='Refresh'
                                        backgroundColor='green.50'
                                        icon={<Icon path={mdiRefresh} size={1}/>}
                                        onClick = {() => index === 0 ? props.handleRoot(true) : props.handleTail(true)}
                                    />

                                    <IconButton 
                                        aria-label='Remove' 
                                        backgroundColor='red.50'
                                        icon={<Icon path={mdiClose} size={1}/>}
                                        onClick = {() => index === 0 ? props.handleRoot(false) : props.handleTail(false)}
                                    />
                                </ButtonGroup> 
                            ): (

                                <ButtonGroup size='lg' variant='solid' isAttached>
                                    <Button>
                                        Not Selected
                                    </Button>

                                    <IconButton 
                                        aria-label='Refresh'
                                        backgroundColor='green.50'
                                        icon={<Icon path={mdiRefresh} size={1}/>}
                                        onClick = {() => index === 0 ? props.handleRoot(true) : props.handleTail(true)}
                                    />
                                </ButtonGroup>   
                            )}
                        </VStack>
                    ))}
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

                        <InputGroup size='lg' color='white'>

                            <Input  
                                ref={startRef} 
                                pr='4.5rem' 
                                placeholder='Start Link:'
                            />

                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => handleInput(startRef, props.handleRoot)}>
                                    <Icon path={mdiCheck} size={1}/>
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <InputGroup size='lg' color='white'>

                            <Input 
                                ref={endRef} 
                                pr='4.5rem' 
                                placeholder='End Link:'
                            />

                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => handleInput(endRef, props.handleTail)}>
                                    <Icon path={mdiCheck} size={1}/>
                                </Button>
                            </InputRightElement>
                        </InputGroup>
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
                                Array.from({ length: articlesGenerated }).map((_, index) => (
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