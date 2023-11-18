import { useBreakpointValue, Accordion, AccordionItem, AccordionButton, AccordionPanel, Button, Text, Link, Heading, Box, VStack, Stack } from '@chakra-ui/react';
import { Paragraph, LinkSegment, Article, PlayerState, fetchArticle} from '../Utils/Functions';



interface ArticleDisplayProps {
    isRowLayout: boolean | undefined;
    playerState: PlayerState | null;
    handlePlayerState: (article: Article, player: 'Player' | 'Opp') => void;
}

function ArticleDisplay (props: ArticleDisplayProps) {
    const currentArticle = props.playerState?.currentArticle as Article;
    const isRowLayout = props.isRowLayout;

    const handleLinkClick = async (url: string) => {
        const article = await fetchArticle('URL', url, true);
        props.handlePlayerState(article, 'Player');
    }

    const AccordionDisplay = () => {
        const width1= isRowLayout? '15vw' : '100%';
        const width2= isRowLayout? '20vw' : '90%';
        const width3= isRowLayout? undefined : '100%'
        const defaultIndex= isRowLayout? 0 : 1;
        const LinkSegment: LinkSegment[] = currentArticle?.links as LinkSegment[];


        const formatWikiTitleFromURL = (url: string) => {
            const lastSlashIndex = url.lastIndexOf('/');
            const titleWithUnderscores = url.substring(lastSlashIndex + 1);
            const title = titleWithUnderscores.replace(/_/g, ' ');
            return decodeURIComponent(title);
        }

        return (
            <Accordion allowToggle defaultIndex={defaultIndex} width={width3} >
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
                                    color='white' 
                                    _hover={{ backgroundColor: 'blue.100' }}
                                    onClick={() => handleLinkClick(link.url)}
                                >   
                                    <Text isTruncated>{formatWikiTitleFromURL(link.url)}</Text>
                                </Button>
                            ))}
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        )
    }

    const ContentDisplay = () => {

        if (!currentArticle) {
            return null;
        }

        return (
            <Box p={2} w='100%'>
                <Heading size='md' mb={5} textDecor='underline'>{currentArticle.title}</Heading>

                {currentArticle.body?.map((paragraph, pIndex) => (
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

    return (
        <Stack direction={props.isRowLayout ? 'row' : 'column'} w='100%' alignItems='flex-start'>
            <AccordionDisplay  />
            <ContentDisplay />
        </Stack>
    );
}

export default ArticleDisplay;