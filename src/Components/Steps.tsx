import React from "react";
import { CardProps } from './SmallCard';
import { Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepSeparator, Card, CardBody, Heading, Text, Stack, useBreakpointValue } from "@chakra-ui/react";

function StepCard (props: CardProps) {

    return (
        <Card 
            size='sm'
            direction={{ base: 'column', lg: 'row' }}
            overflow='hidden'
            variant='outline'
            alignItems='flex-start'
        >
            <Stack>
                <CardBody>
                    <Heading size='md' cursor='pointer' textDecoration='underline'
                        onClick = {() => window.open(props.href, '_blank')}
                    >
                        {props.title}
                    </Heading>
                    <Text py='2'>{props.desc}</Text>
                </CardBody>
            </Stack>
        </Card>
    );
    
}

function Steps ({props, heading}: {props: CardProps[], heading: string}) {

    const stepperWidth = useBreakpointValue({base: '100%', md: '45%', lg: '45%'});

    return (

        <Stepper 
            index={1} orientation='vertical' size='md' 
            height='auto' width={stepperWidth}
            gap='5' mb={2}
        >

            <Heading size='xl' color='white' alignSelf='flex-start' mb={2}>
                {heading}
            </Heading>

            {props.map((step, index) => (

                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <StepCard {...step} />
                    <StepSeparator />
                </Step>
            ))}

        </Stepper>
    );
}

export default Steps;