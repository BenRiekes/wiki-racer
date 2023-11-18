import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';
function InptGroup(props) {
    const inputRef = useRef(null);
    const isLoading = props.rootTailLoading[props.action]; // Use rootTailLoading from props
    const handler = () => {
        if (!isLoading && inputRef.current?.value) {
            props.handleRootTail(props.action, true, inputRef.current.value);
        }
    };
    return (_jsxs(InputGroup, { size: 'lg', children: [_jsx(Input, { ref: inputRef, pr: '4.5rem', placeholder: props.placeholder }), _jsx(InputRightElement, { width: '4.5rem', children: _jsx(Button, { h: '1.75rem', size: 'sm', backgroundColor: 'green.50', onClick: handler, children: _jsx(Icon, { path: mdiCheck, size: 1 }) }) })] }));
}
export default InptGroup;
