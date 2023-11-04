import {
    Box, VStack, Button, Flex, Divider,
    Grid, GridItem, Container, HStack, Heading, 
    Text, AbsoluteCenter, AspectRatio, Image
} from '@chakra-ui/react'

import Hero from './Hero';
import Icon from '@mdi/react';
import Sponsor from './Sponsor';
import { Gradient } from '../../Utils/Animations';



const Sponsors = [
    {
        title: 'Wikipedia', 
        description: 'Wikipedia is a free, multilingual online encyclopedia collaboratively written by volunteers around the world.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkSxoyG0_P9IQ7dPKvy7giDg6nHB4FHwzKog&usqp=CAU',
        url: 'https://www.wikipedia.org/'
    },

    {
        title: 'Chat-GPT',
        description: 'ChatGPT is an AI-driven language model developed by OpenAI, designed to understand and generate human-like text based on the input it receives.',
        image: 'https://chataigpt.org/wp-content/uploads/2023/09/Chat-ai-gpt-unlimited-free-prompt-Ai-tool.png',
        url: 'https://openai.com/blog/chatgpt'
    }
]
 

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
                    <Heading size='lg' noOfLines={1}>
                        Powered By:
                    </Heading>
                </AbsoluteCenter>
            </Box>

            <Box width='90%' display='flex' flexDirection='column'>
                {Sponsors.map((sponsor, index) => (
                    <Sponsor key={index} {...sponsor}/>
                ))}
            </Box>

        </VStack>

    );
}

export default Home;