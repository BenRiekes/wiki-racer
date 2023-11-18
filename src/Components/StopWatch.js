import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { HStack, Text } from '@chakra-ui/layout';
function StopWatch(props) {
    const [time, setTime] = useState(0);
    const milliseconds = time % 100;
    const hours = Math.floor(time / 360000);
    const seconds = Math.floor((time % 6000) / 100);
    const minutes = Math.floor((time - hours * 360000) / 6000);
    useEffect(() => {
        let intervalId;
        if (props.isRunning) {
            intervalId = setInterval(() => {
                setTime((time) => time + 1);
            }, 10);
        }
        else {
            clearInterval(intervalId);
            if (time !== 0) {
                setTime(0);
            }
        }
        return () => clearInterval(intervalId);
    }, [props.isRunning, time]);
    return (_jsxs(HStack, { width: props.isRowLayout ? 'auto' : '100%', spacing: 1, p: 1, alignSelf: 'flex-start', justifyContent: 'center', borderRadius: 'md', backgroundColor: 'blue.100', color: 'white', children: [_jsx(Text, { fontSize: props.isRowLayout ? 'xl' : 'lg', fontWeight: 'bold', children: minutes }), _jsx(Text, { fontSize: props.isRowLayout ? 'xl' : 'lg', children: ":" }), _jsx(Text, { fontSize: props.isRowLayout ? 'xl' : 'lg', fontWeight: 'bold', children: seconds }), _jsx(Text, { fontSize: props.isRowLayout ? 'xl' : 'lg', children: ":" }), _jsx(Text, { minWidth: '1.25em', fontSize: props.isRowLayout ? 'xl' : 'lg', fontWeight: 'bold', children: milliseconds })] }));
}
export default StopWatch;
