import React, { useState, useEffect, useCallback } from 'react';

function useStopWatch () {

    const [isActive, setIsActive] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && startTime) {

            interval = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 10);

        } else {
            
            if (interval) {
                clearInterval(interval as any);
            }
        }

        return () => {

            if (interval) {
                clearInterval(interval as any);
            }
        }

    }, [isActive, startTime]);

    const handleStart = useCallback(() => {
        setStartTime(Date.now() - elapsedTime);
        setIsActive(true);
    }, [elapsedTime]);
    
    const handleStop = useCallback(() => {
        setIsActive(false);
    }, []);

    const handleReset = useCallback(() => {
        setIsActive(false);
        setElapsedTime(0);
        setStartTime(null);
    }, []);

    const formatTime = useCallback((ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
    }, []);

    

    return { elapsedTime, handleStart, handleStop, handleReset, formattedTime: formatTime(elapsedTime) }
}

export default useStopWatch;