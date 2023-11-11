import { Flex, VStack, HStack, Heading, Text, Badge, Divider } from "@chakra-ui/layout";
import { GameProps } from "./GameContainer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

function GameScreen (props: GameProps) {

    return (
        
        <Flex width='100%' h='200vh' justifyContent='center' bg='blue.100'>

            <VStack w='90%' mt={5} spacing={10} alignItems='center' boxShadow='xl' bg='white' borderRadius='sm'>

                <HStack w='100%' spacing={5} alignItems='center' borderBottom='1px' borderBottomColor='black' p={2}>

                    <Badge variant='subtle' backgroundColor='green.50' fontSize='1.5rem' fontWeight='bold' >
                        Start: {props.rootArticle?.title}
                    </Badge>

                    <Badge variant='subtle' backgroundColor='green.50' fontSize='1.5rem' fontWeight='bold' >
                        End: {props.tailArticle?.title}
                    </Badge>

                    <Divider orientation='vertical' borderColor='black'/>   

                </HStack>

            </VStack>
        </Flex>
    );
}

export default GameScreen;