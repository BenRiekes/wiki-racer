import { GameProps } from "../Pages/Play/GameContainer";
import { Article } from "../Utils/Functions";
import { Card, CardBody, CardFooter, Divider, Heading, HStack, Image, Skeleton, SkeletonText, Text, VStack, Button, AspectRatio } from "@chakra-ui/react";

interface ArticleCardProps  {
    article?: Article,
    isLoading: boolean,
    gameProps: GameProps
}

const wikipediaImage = 
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Wikipedia_logo_puzzle_globe_spins_horizontally_and_vertically%2C_revealing_the_contents_of_all_of_its_puzzle_pieces_%284K_resolution%29_%28VP9%29.webm/2160px--Wikipedia_logo_puzzle_globe_spins_horizontally_and_vertically%2C_revealing_the_contents_of_all_of_its_puzzle_pieces_%284K_resolution%29_%28VP9%29.webm.jpg'
;

function ArticleCard ({article, isLoading, gameProps}: ArticleCardProps ) {

    const truncate = (text: string, length: number): string => {
        if (text.length <= length) {
            return text;
        }
        return text.substring(0, length) + '...';
    };

    return (

        <Card
            size='sm' width='225px'
            bg='white' boxShadow='md' borderRadius='lg'
            display='inline-block' flexShrink={0}
        >
            <AspectRatio ratio={1} >
                <Image
                    p={2}
                    src={wikipediaImage} 
                    alt={'Wiki Logo'}
                    objectFit='cover'
                    borderRadius='xl'
                    filter={isLoading ? 'blur(4px)' : 'none'}
                />
            </AspectRatio>

            <CardBody mt={2} p={3}>

                <VStack spacing={2} alignItems='flex-start'>

                    {isLoading ? (
                        <>
                            <Skeleton height='20px' width='70%' />
                            <SkeletonText mt={4} noOfLines={2} skeletonHeight={2} />
                            <Skeleton height='20px'  width='100%' />
                        </>
                    ) : (
                        <>
                            <Heading size='sm' textDecor='underline' cursor='pointer'
                                onClick={() => article && window.open(article.url, '_blank')}
                            >
                                {article ? truncate(article.title, 20) : 'Loading...'}
                            </Heading>

                            <Text noOfLines={2}>
                                {article ? truncate(article.body, 50) : 'Loading...'}
                            </Text>
                        </>
                    )}
                </VStack>
            </CardBody>

            {!isLoading && article && (
                <>
                    <Divider />

                    <CardFooter py={2}>
                        <HStack w='100%' spacing={2}>
                            <Button bg='green.50' onClick={() => gameProps.handleRoot(true, article.url)}>
                                Start
                            </Button>
                            <Button bg='green.50' onClick={() => gameProps.handleTail(true, article.url)}>
                                End
                            </Button>
                        </HStack>
                    </CardFooter>
                </>
            )}
        </Card>
    )
}

export default ArticleCard; 