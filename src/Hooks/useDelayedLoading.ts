import { useState, useEffect } from 'react';

function useDelayedLoading () {
    const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
    const [timeoutIds, setTimeoutIds] = useState<{ [key: string]: NodeJS.Timeout | null }>({});
}