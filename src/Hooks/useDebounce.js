import { useState, useEffect } from 'react';
/*
    - This hook takes holds some state
    - It sets a timeout on it
    - It clears it if the timeout changes

    - When paired with an implementation component
    - (i.e a search bar)... It is able to regulate
    - The amoung of api calls made.

    - This ultimately saves on performance
*/
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        //Update val after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
export default useDebounce;
