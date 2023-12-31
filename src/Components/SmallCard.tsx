import React from "react";
import { Card, CardHeader, CardBody, Heading, Text, useBreakpointValue } from "@chakra-ui/react";

export interface CardProps {
    title: string;
    desc?: string;
    image?: string;
    href?: string;
}

function SmallCard (props: CardProps) {

    return ( 
        <Card 
            size='sm' boxShadow='xl' flexShrink={1}
            minW={useBreakpointValue({base: '100%', md: 'auto'})}  
        >
            <CardHeader>
                <Heading size='md'>{props.title}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{props.desc}</Text>
            </CardBody>
        </Card>
    );
}

export default SmallCard;