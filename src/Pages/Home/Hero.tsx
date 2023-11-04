import {
    Box, VStack, Button, Flex, Divider,
    Grid, GridItem, Container, HStack, Heading, 
    Text, AbsoluteCenter, AspectRatio, Image
} from '@chakra-ui/react'

import Icon from '@mdi/react';
import { mdiHuman, mdiCog, mdiTrophy  } from '@mdi/js';


interface FeatureProps {
    heading: string;
    text: string;
    icon: string;
}

const Feature = (props: FeatureProps) => {

    return (
        <GridItem alignSelf='start'>

            <VStack spacing={1} alignItems='start'>

                <HStack spacing={2}>
                    <Heading size='md'>{props.heading}</Heading>
                    <Icon path={props.icon} size={1} />
                </HStack>

                <Text textAlign='left'>{props.text}</Text>
            </VStack>
            
        </GridItem>
    );
}

function Hero () {

    return (

        <Box as={Container} maxW='90%' mt={14} >

            <Grid 
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(2, 1fr)',
                }}
                gap={4}
            >
                <GridItem colSpan={1}>
                    <VStack alignItems='flex-start' spacing='20px'>

                        <Heading size='xl'>
                            Wiki Racer
                        </Heading>

                        <Button size='md'>
                            Play now!
                        </Button>
                    </VStack>
                </GridItem>

                <GridItem>
                    <Flex>
                        <Text>
                            Think you're faster than AI? Load up Wiki Racer! Find the 
                            fastest path between two randomly generated wimipedia articles.
                            Good luck, and happy searching - May the best man, or ai, win!
                        </Text>
                    </Flex>
                </GridItem>

                <Divider mt={5} mb={5}/>

                <Grid
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                    }}
                    gap={{ base: '8', sm: '12', md: '16' }}
                >
                    <Feature
                        heading={'Human'}
                        text={'Are humans faster than AI?'}
                        icon={mdiHuman}
                    />

                    <Feature
                        heading={'AI'}
                        text={'Or is AI faster than humans?'}
                        icon={mdiCog}
                    />
                        
                </Grid>
            </Grid>
        </Box>
    );
}

export default Hero;