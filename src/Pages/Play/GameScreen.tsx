import React, { useState, useEffect } from "react";

import { GameProps } from "./GameContainer";
import { Paragraph, LinkSegment, Article, PlayerState} from '../../Utils/Functions'; 
import useStopWatch from "../../Hooks/useStopWatch";


import Icon from '@mdi/react';
import { mdiArrowRightThin } from '@mdi/js';
import { Flex, VStack, HStack, Heading, Text, Badge, Divider, Box } from "@chakra-ui/layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, useBreakpointValue } from "@chakra-ui/react";

function GameScreen (props: GameProps) {

    const { elapsedTime, handleStart, handleStop, 
        handleReset, formattedTime } = useStopWatch()
    ;
    
    const [minutes, seconds, milliseconds] = formattedTime.split(':');
    const isRowLayout = useBreakpointValue({ base: false, md: true });

    //----------------------------------------

    

    //----------------------------------------

    function CustomBadge ({text}: {text: string}) {
        const fontSize = isRowLayout? 'lg' : 'md';
        const textAlign = isRowLayout? 'center' : 'left';
        const minW = isRowLayout? 'auto' : '100%';
        const maxW = isRowLayout? 'auto' : '100%';
        
        return (
            <Badge
                maxWidth={maxW} minWidth={minW} flexGrow={1} 
                variant='subtle' backgroundColor='green.50' 
                textAlign={textAlign} fontWeight='bold' 
                fontSize={fontSize} isTruncated
            >
                {text}
            </Badge>
        );
    }

    function StopWatch () {
        const fontSize = isRowLayout? 'xl' : 'md';

        return (
            <HStack spacing={1} p={1} alignSelf='flex-start' borderRadius='md' backgroundColor='blue.100' color='white' >
                <Text fontSize={fontSize} fontWeight='bold'>{minutes}</Text>
                <Text fontSize={fontSize}>:</Text>
                <Text fontSize={fontSize} fontWeight='bold'>{seconds}</Text>
                <Text fontSize={fontSize}>:</Text>
                <Text fontSize={fontSize} fontWeight='bold'>{milliseconds}</Text>
            </HStack>
        )
    }

    function BreadCrumbs ({history}: {history: Article[] | undefined}) {

        return (
            <Box w='100%' pb='8px' overflowX='scroll'
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
                <Breadcrumb spacing='8px' separator={<Icon path={mdiArrowRightThin} size={1} />}>

                    {history?.map((article, index) => (

                        <BreadcrumbItem key={index} p={2} 
                            borderRadius='md' backgroundColor='blue.100' 
                            color='white' fontSize='sm' fontWeight='bold' 
                        >
                            <BreadcrumbLink  whiteSpace='nowrap'>
                                {article.title}
                            </BreadcrumbLink>

                        </BreadcrumbItem>
                    ))}          
                </Breadcrumb>
            </Box>
        );  
    }


    //----------------------------------------

    return (
        <Flex width='100%' h='200vh' justifyContent='center' bg='blue.100'>

            <VStack w='90%' mt={5} spacing={0} alignItems='center' boxShadow='xl' bg='white' borderRadius='sm'>

                <Flex w='100%' gap={3} p={2}
                    flexDirection={isRowLayout ? 'row' : 'column'}
                    alignItems='center' justifyContent='flex-start'
                >
                    <VStack w='100%' spacing={3} alignItems='flex-start'>
                        {isRowLayout ? (
                            <HStack w='100%'>
                                <CustomBadge text={`${props.rootArticle?.title as string}`} />
                                <CustomBadge text={`${props.tailArticle?.title as string}`} />
                            </HStack>
                        ): (
                            <VStack w='100%' alignSelf='flex-start' alignItems='flex-start'>
                                <CustomBadge text={`${props.rootArticle?.title as string}`} />
                                <CustomBadge text={`${props.tailArticle?.title as string}`} />
                            </VStack>
                        )}

                        <Divider 
                            orientation='horizontal' 
                            borderColor='black' 
                        />

                        <HStack spacing={5} w='100%'>
                            <StopWatch />
                            <BreadCrumbs history={props.playerState?.history}/>
                        </HStack>

                        <Divider 
                            orientation='horizontal' 
                            borderColor='black' 
                        />
                    </VStack>
                </Flex>  

                <HStack w='100%' p={2} spacing={3}  alignItems='center'>

                    

                </HStack>

                  
            </VStack>
        </Flex>
    );
}

export default GameScreen;