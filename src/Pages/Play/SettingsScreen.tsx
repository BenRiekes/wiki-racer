import React, { useState, useRef, useEffect } from "react";
import { GameProps } from "./GameContainer";

import Icon from "@mdi/react";
import { mdiClose, mdiRefresh, mdiCheck} from "@mdi/js";
import SmallCard from "../../Components/SmallCard";
import { Flex, VStack, HStack, Heading, Button, ButtonGroup, IconButton, Divider, InputRightElement, useColorMode, useColorModeValue, Box, Input, InputGroup, Card, CardBody, Image, Text, CardFooter, Grid, AspectRatio } from "@chakra-ui/react";
import { Article } from "../../Utils/Functions";

const wikipediaImage = 
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Wikipedia_logo_puzzle_globe_spins_horizontally_and_vertically%2C_revealing_the_contents_of_all_of_its_puzzle_pieces_%284K_resolution%29_%28VP9%29.webm/2160px--Wikipedia_logo_puzzle_globe_spins_horizontally_and_vertically%2C_revealing_the_contents_of_all_of_its_puzzle_pieces_%284K_resolution%29_%28VP9%29.webm.jpg'
;

function SettingsScreen (props: GameProps) {

    const startRef = useRef<HTMLInputElement | null>(null);
    const endRef = useRef<HTMLInputElement | null>(null);
    const [exploreArticles, setExploreArticles] = useState<Article[]>([]);

    useEffect(() => {
        props.handleRoot(true);
        props.handleTail(true);

        async function fetchArticles () {

           const articlesGenerated = 20;
           const articlePromises = Array.from({length: articlesGenerated}, () => props.fetchArticle());
           const articles = await Promise.all(articlePromises);
           setExploreArticles(articles);
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

    //----------------------------------------
    

    function handleInput(ref: React.RefObject<HTMLInputElement>, handler: (add: boolean, url?: string) => void) {
        
        if (ref.current?.value) {
            handler(true, ref.current.value);
        }
    }
    
    //----------------------------------------

    return (
        <Flex width='100%' h='auto' justifyContent='center' bg='blue.100'>

            <VStack w='90%' mt={5} spacing={10} alignItems='center'>

                <Flex
                    gap={5}  p={5} w='100%' h='auto' 
                    direction={{base:'column', md: 'row'}}
                    alignItems='center' justifyContent='flex-start' 
                    boxShadow='xl' borderRadius='lg'
                >
                    <Heading size='2xl'color='white'>
                        Configure Game
                    </Heading>
                    
                    <Divider orientation='vertical' borderColor='white' />

                    {props.rootTail?.map((article, index) => (

                        <VStack spacing={2} alignSelf='flex-start' wrap='wrap' key={index}>

                            <Heading size='lg' color='white' alignSelf='flex-start'>
                                {index === 0 ? 'Start' : 'End'}:
                            </Heading>

                            {article ? (

                                <ButtonGroup size='lg' variant='solid' isAttached>
                                    <Button minW='100px' 
                                        onClick = {() => window.open(article.url, '_blank')}
                                    >
                                        {truncate(article.title, 10)}
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

                {/* Custom Config: ----------------------------------- */}

                <Flex 
                    gap={5}  p={5} w='100%' h='auto' 
                    direction={{base:'column', md: 'row'}}
                    alignItems='center' justifyContent='flex-start' 
                    boxShadow='sm' borderRadius='lg'
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


                {/* Explore Config: ----------------------------------- */}

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

                            {exploreArticles.map((article, index) => (

                                <Card key={index}
                                    size='sm' width='225px' 
                                    bg='white' boxShadow='md' borderRadius='md'
                                    display='inline-block' flexShrink={0}
                                >
                                    <AspectRatio ratio={1}>
                                        <Image 
                                            src={wikipediaImage}
                                            alt={'Wiki Logo'}
                                            objectFit='cover'
                                            borderRadius='lg'
                                        />
                                    </AspectRatio>

                                    <CardBody mt={2} p={3}>

                                        <VStack spacing={2} alignItems='flex-start'>

                                            <Heading size='sm' textDecor='underline' cursor='pointer'
                                                onClick={() => window.open(article.url, '_blank')}
                                            >
                                                {truncate(article.title, 20)}
                                            </Heading>
                                            
                                            <Text noOfLines={2}>{truncate(article.body, 50)}</Text>
                                        </VStack>
                                    </CardBody>

                                    <Divider/>

                                    <CardFooter py={2}>
                                        
                                        <HStack w= '100%' spacing = {2}>
                                            <Button bg='green.50' onClick={() => props.handleRoot(true, article.url)}>
                                                Start
                                            </Button>

                                            <Button bg='green.50' onClick={() => props.handleTail(true, article.url)}>
                                                End
                                            </Button>
                                        </HStack>
                                    </CardFooter>
                                </Card>
                            ))}
                        </HStack>
                    </Box>
               </VStack>
            </VStack>

        </Flex>
    );
}

export default SettingsScreen;