import React, { useEffect, useRef } from "react";
import { PlayerState, Article } from "../Utils/Functions";

import Icon from "@mdi/react";
import { mdiArrowRightThin, mdiHistory } from '@mdi/js';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Divider, HStack, Text} from "@chakra-ui/react";

interface BreadCrumbProps {
    playerState: PlayerState | null;
    playerStateHistoryRemoveAfterIndex: (index: number, player: 'Player' | 'Opp') => void;
}

function BreadCrumbs (props: BreadCrumbProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [props.playerState?.history]);

    //Set the current article to the clicked article
    //Pop all articles after the clicked article from history
    const handleClick = async (index: number, article: Article) => { 

        const articles: Article[] = props.playerState?.history as Article[];

        if (props.playerState === null) {
            return;
        } 

        if (article.url === props.playerState.currentArticle.url) {
            return;
        } 

        props.playerStateHistoryRemoveAfterIndex(index, 'Player');
    }

    const backgroundColor = (index: number) => {
        if (props.playerState === null)  return;

        if (index === props.playerState?.history?.length - 1) {
            return 'blue.50';
        }

        return 'gray.200';
    }

    return (

        <Box ref={scrollRef} w='100%' pb='10px' overflowX='scroll'
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

            <Breadcrumb spacing='8px'  separator={<Icon path={mdiArrowRightThin} size={1} /> }>

                {props.playerState?.history?.map((article, index) => (

                    <BreadcrumbItem 
                        key={index} 
                        p={2} mr={2} w='auto'
                        backgroundColor={backgroundColor(index)} 
                        color='black' fontSize='md' fontWeight='bold'
                        whiteSpace='nowrap' borderRadius='md' cursor='pointer'

                        onClick={() => handleClick(index, article)}
                    >
                        <BreadcrumbLink  textDecoration='none' whiteSpace='nowrap' 
                          
                            onClick={() => handleClick(index, article)}
                        >
                            {article.title}
                        </BreadcrumbLink>

                    </BreadcrumbItem>    
                ))}    

            </Breadcrumb>

           
        </Box>
    );
}

export default BreadCrumbs;