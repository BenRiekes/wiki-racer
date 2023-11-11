import { useState, useEffect, useCallback } from 'react';

type TimeoutID = 
    ReturnType<typeof setTimeout>
;

function useDelayedLoading (initalStates: {[key: string]: boolean} = {}, minLoadingTime: number = 1000) {
    const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>(initalStates);
    const [timeoutIds, setTimeoutIds] = useState<{[key: string]: TimeoutID | null}>({});

    

    function startLoading (key: string, delay: number = 200) {
        setLoadingStates((prev) => ({...prev, [key]: false}));

        const timeoutId = setTimeout(() => {
            setLoadingStates((prev) => ({...prev, [key]: true}));
        }, delay);

        setTimeoutIds((prevState) => ({...prevState, [key]: timeoutId}));
    } 

    function stopLoading (key: string) {
        const existingTimeout = timeoutIds[key];

        if (existingTimeout) {
            clearTimeout(existingTimeout);
            setTimeoutIds(prevState => ({...prevState, [key]: null}));
        }

        setTimeout(() => {
            setLoadingStates(prevState => ({ ...prevState, [key]: false }));
        }, minLoadingTime);
    } 

    useEffect(() => {

        return () => {
            Object.values(timeoutIds).forEach(timeoutId => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            });
        }

    }, [timeoutIds]);

    return { loadingStates, startLoading, stopLoading};
}

export default useDelayedLoading; 