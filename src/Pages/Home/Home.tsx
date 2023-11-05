import {
    Box, VStack, Button, Flex, Divider,
    Grid, GridItem, Container, HStack, Heading, 
    Text, AbsoluteCenter, AspectRatio, Image
} from '@chakra-ui/react'

import Hero from './Hero';
import Icon from '@mdi/react';
import Sponsor from './Sponsor';
import SponsorData from '../../Data/SponsorData';

function Home() {

    return (

        <VStack w='100%' spacing={10} alignItems='center' >
            <Hero/>

            <Box width='100%' position='relative'>
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
                {SponsorData.map((sponsor, index) => (
                    <Sponsor key={index} {...sponsor}/>
                ))}
            </Box>

        </VStack>
    );
}

export default Home;