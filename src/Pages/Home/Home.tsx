import Steps from '../../Components/Steps';
import SmallCard from '../../Components/SmallCard';
import {Box, VStack, Flex, Heading} from '@chakra-ui/react'
import { HeaderCardData, ExampleCardData } from '../../Data/CardData';

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
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni ipsam expedita maxime numquam, vitae iure tempore rem? Iure similique sit optio nihil sunt dolorem, possimus voluptatem harum commodi autem. Veniam!
                    </Heading>
                </Box>

                <Flex 
                    w='100%' h='auto' direction={["column", "column", "row"]}
                    alignItems='center' justifyContent='space-between' 
                    gap={10} 
                >
                    <Steps props={ExampleCardData} heading={'Example #1'}/>
                    <Steps props={ExampleCardData} heading={'Example #2'}/>
                </Flex>
            </VStack>
        </Flex>
    );
}

export default Home;