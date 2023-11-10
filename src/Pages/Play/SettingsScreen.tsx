import { useEffect } from "react";
import { GameProps } from "./GameContainer";

import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import SmallCard from "../../Components/SmallCard";
import { Flex, VStack, HStack, Heading, Button, ButtonGroup, IconButton, Divider, useColorMode, useColorModeValue, Box } from "@chakra-ui/react";


function SettingsScreen (props: GameProps) {

    useEffect(() => {
        props.handleRootTail(true, 'Both');
    }, []);

    //----------------------------------------

    function truncate (text: string, length: number): string {

        if (text.length < length) {
            return text;
        }

        return text.substring(0, length) + '...';
    }
    
    //----------------------------------------

    return (
        <Flex width='100%' h='200vh' justifyContent='center' bg='blue.100'>

            <VStack w='90%' mt={5} spacing={10} alignItems='center'>

                <Flex
                    gap={5}  p={5} w='100%' h='auto' 
                    direction={{base:'column', md: 'row'}}
                    alignItems='center' justifyContent='flex-start' 
                    boxShadow='lg' 
                >

                    <Heading size='2xl'color='white'>
                        Configure Game
                    </Heading>
                    
                    <Divider orientation='vertical' borderColor='white' />

                    {props.rootTail?.map((article, index) => (

                        <VStack spacing={2} alignSelf='flex-start' wrap='wrap'>

                            <Heading size='lg' color='white' alignSelf='flex-start'>
                                {index === 0 ? 'Start' : 'End'}:
                            </Heading>

                            {article ? (
                                <ButtonGroup size='lg' variant='solid' isAttached>

                                    <Button minW='125px'
                                        onClick = {() => window.open(article.url, '_blank')}
                                    >
                                        {truncate(article.title, 15)}
                                    </Button>

                                    <IconButton 
                                        aria-label='Remove' 
                                        backgroundColor='red.50'
                                        icon={<Icon path={mdiClose} size={1}/>}
                                        onClick = {() => props.handleRootTail(false, index === 0 ? 'Root' : 'Tail')}
                                    />
                                </ButtonGroup> 
                            ): (
                                <Button size='lg' variant='sold' bg='white'>
                                    Select
                                </Button>
                            )}
                        </VStack>

                    ))}

                </Flex>

            </VStack>
            
        </Flex>
    );
}

export default SettingsScreen;