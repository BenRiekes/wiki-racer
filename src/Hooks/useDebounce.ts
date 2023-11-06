import React, { useState, useEffect } from 'react';

/*
    - This hook takes holds some state
    - It sets a timeout on it
    - It clears it if the timeout changes

    - When paired with an implementation component
    - (i.e a search bar)... It is able to regulate
    - The amoung of api calls made. 

    - This ultimately saves on performance
*/

function useDebounce (value: string, delay:  number): string { 
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {   

        //Update val after delay
        const handler = setTimeout(() => { 
            setDebouncedValue(value);
        }, delay);

        return () => { //Cancel the timeout if the val changes
            clearTimeout(handler);
        }

    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;