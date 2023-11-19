import Steps from '../../Components/Steps';
import SmallCard from '../../Components/SmallCard';
import {Box, VStack, Flex, Heading} from '@chakra-ui/react'
import { HeaderCardData, ExampleCardData1, ExampleCardData2 } from '../../Data/CardData';

function Home() { 

    return (

        <Flex width='100%' h='auto' justifyContent='center' bg='blue.100'>

            <VStack w='90%' mt={5} spacing={10} alignItems='center'>
                
                <Heading size='2xl'color='white' alignSelf='flex-start'>
                    Wiki Racer.
                </Heading>
                 
                <Flex 
                    w='100%' h='auto' direction={{base:'column', md: 'row'}}
                    alignItems='center' justifyContent='space-evenly' 
                    gap={5} 
                >
                    {HeaderCardData.map((card, index) => (
                        <SmallCard key={index} {...card}/>
                    ))}
                </Flex>

                <Box 
                    width='100%' p={2} 
                    borderTop='1px' borderTopColor='white'
                    borderBottom='1px' borderBottomColor='white'
                >
                    <Heading size='lg' color='white'>
                        Embark on a Wikipedia adventure in 'Wiki Racer.' 
                        Race against others or AI, navigating through links to reach a target article first. 
                        Employ strategy and speed to traverse the knowledge web. 
                        Each round is a unique journey across Wikipedia's vast universe. 
                        Dive in, discover, and outsmart your way to victory!
                    </Heading>
                </Box>

                <Flex 
                    w='100%' h='auto' direction={["column", "column", "row"]}
                    alignItems='flex-start' justifyContent='space-between' 
                    gap={10} 
                >
                    <Steps props={ExampleCardData1} heading={'Example #1'}/>
                    <Steps props={ExampleCardData2} heading={'Example #2'}/>
                </Flex>
            </VStack>
        </Flex>
    );
}

export default Home;