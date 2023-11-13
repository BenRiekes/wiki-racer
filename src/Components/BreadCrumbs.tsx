import React, { useEffect, useRef } from "react";
import { PlayerState, Article } from "../Utils/Functions";

import Icon from "@mdi/react";
import { mdiArrowRightThin } from '@mdi/js';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@chakra-ui/react";

interface BreadCrumbProps {
    playerState: PlayerState | null;
    setPlayerState: React.Dispatch<React.SetStateAction<PlayerState | null>>;
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

        if (index !== articles.length - 1) {

            for (let i = articles.length - 1; i > index; i--) {
                articles.pop();
            }

            props.setPlayerState((prevState) => {
                return {...prevState, currentArticle: articles[index], history: [...articles]}
            })
        }

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
            <Breadcrumb spacing='8px' separator={<Icon path={mdiArrowRightThin} size={1} /> }>

                {props.playerState?.history?.map((article, index) => (

                    <BreadcrumbItem key={index} p={2} mr={2}
                        backgroundColor={backgroundColor(index)} 
                        color='black' fontSize='md' fontWeight='bold' borderRadius='md'
                    >
                        <BreadcrumbLink  whiteSpace='nowrap' onClick={() => handleClick(index, article)}>
                            {article.title}
                        </BreadcrumbLink>

                    </BreadcrumbItem>    
                ))}    
     
            </Breadcrumb>
        </Box>
    );
}

export default BreadCrumbs;