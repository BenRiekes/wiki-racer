import { useState, useEffect } from 'react';
function useDelayedLoading(initalStates = {}, minLoadingTime = 1000) {
    const [loadingStates, setLoadingStates] = useState(initalStates);
    const [timeoutIds, setTimeoutIds] = useState({});
    function startLoading(key, delay = 200) {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
        const timeoutId = setTimeout(() => {
            setLoadingStates((prev) => ({ ...prev, [key]: true }));
        }, delay);
        setTimeoutIds((prevState) => ({ ...prevState, [key]: timeoutId }));
    }
    function stopLoading(key) {
        const existingTimeout = timeoutIds[key];
        if (existingTimeout) {
            clearTimeout(existingTimeout);
            setTimeoutIds(prevState => ({ ...prevState, [key]: null }));
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
        };
    }, [timeoutIds]);
    return { loadingStates, startLoading, stopLoading };
}
export default useDelayedLoading;
