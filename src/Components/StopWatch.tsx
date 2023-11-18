import React, { useState, useEffect } from 'react';
import { HStack, Text } from '@chakra-ui/layout';

interface StopWatchProps {
    isRunning: boolean;
    isRowLayout: boolean;
}

function StopWatch (props: StopWatchProps) {
    const [time, setTime] = useState<number>(0);

    const milliseconds = time % 100;
    const hours = Math.floor(time / 360000);
    const seconds = Math.floor((time % 6000) / 100); 
    const minutes = Math.floor((time - hours * 360000) / 6000);

    useEffect(() => {
        let intervalId: any;

        if (props.isRunning) {

            intervalId = setInterval(() => {
                setTime((time) => time + 1);
            }, 10);

        } else {
            clearInterval(intervalId);

            if (time !== 0) {
                setTime(0);
            }
        }

        return () => clearInterval(intervalId);
    }, [props.isRunning, time]);

    return (
        <HStack 
            width={props.isRowLayout? 'auto' : '100%'} spacing ={1} p={1} 
            alignSelf='flex-start' justifyContent='center' borderRadius='md' 
            backgroundColor='blue.100' color='white' 
        >
            <Text  fontSize={props.isRowLayout? 'xl' : 'lg'} fontWeight='bold'>{minutes}</Text>
            <Text fontSize={props.isRowLayout? 'xl' : 'lg'} >:</Text>
            <Text  fontSize={props.isRowLayout? 'xl' : 'lg'} fontWeight='bold'>{seconds}</Text>
            <Text fontSize={props.isRowLayout? 'xl' : 'lg'} >:</Text>
            <Text minWidth='1.25em' fontSize={props.isRowLayout? 'xl' : 'lg'} fontWeight='bold'>{milliseconds}</Text>
        </HStack>
    );
}

export default StopWatch;