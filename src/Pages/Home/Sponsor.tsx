import React from 'react';

import { Card, CardHeader, CardBody, CardFooter, 
    Stack, Text, Heading, Image, Button, useColorModeValue 
} from '@chakra-ui/react'

interface SponsorProps {
    title: string;
    description: string;
    image: string;
    url: string;
}

function Sponsor (props: SponsorProps) {

    const handleVisitClick = () => {
        window.open(props.url, '_blank');
    }
    
    return (
        <Card 
            direction={{ base: 'column', sm: 'row'}}
            overflow='hidden'
            variant='outline'
            mb={10}
        >
            <Image 
                objectFit='cover'
                maxW={{base: '100%', sm: '200px'}}
                src={props.image}
                alt={props.title}
            />

            <Stack>

                <CardBody>
                    <Heading size='md'>
                        {props.title}
                    </Heading>

                    <Text py='2'>
                        {props.description}
                    </Text>
                </CardBody>
                    
                <CardFooter>
                    <Button variant='solid' onClick={handleVisitClick}>
                        Visit {props.title}
                    </Button>
                </CardFooter>

            </Stack>
        </Card>
    );
}

export default Sponsor;