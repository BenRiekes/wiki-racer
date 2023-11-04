import {
    Box, VStack, Button, Flex, Divider,
    Grid, GridItem, Container, HStack, Heading, 
    Text, AbsoluteCenter, AspectRatio, Image
} from '@chakra-ui/react'

import Hero from './Hero';
import Icon from '@mdi/react';
import { Gradient } from '../../Utils/Animations';


const gptImage = 'https://chataigpt.org/wp-content/uploads/2023/09/Chat-ai-gpt-unlimited-free-prompt-Ai-tool.png'
const wikiImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkSxoyG0_P9IQ7dPKvy7giDg6nHB4FHwzKog&usqp=CAU';
 

function Home() {

    return (

        <VStack 
            w='100%'
            spacing={10} 
            alignItems='center' 
        >
            <Hero/>

            <Box 
                width='100%' 
                position='relative'
            >
                <Divider/>  

                <AbsoluteCenter 
                    display='flex' 
                    alignItems='center' 
                    justifyContent='center'
                >
                    <Heading size='xl' noOfLines={1}>
                        Powered By:
                    </Heading>
                </AbsoluteCenter>
            </Box>

        </VStack>

    );
}

export default Home;