import React, { useRef } from 'react';

import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';

interface InptGroupProps { 
    action : 'Root' | 'Tail';
    placeholder: string;
    rootTailLoading: {[key: string]: boolean};
    handleRootTail: (action: 'Root' | 'Tail', add: boolean, url?: string) => void;
}


function InptGroup (props: InptGroupProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isLoading = props.rootTailLoading[props.action]; // Use rootTailLoading from props

    const handler = () => {
        
        if (!isLoading && inputRef.current?.value) {
            props.handleRootTail(props.action, true, inputRef.current.value);
        }
    }

    return (
        <InputGroup size='lg'>

            <Input  
                ref={inputRef} pr='4.5rem'
                placeholder={props.placeholder as string}
            />

            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' backgroundColor='green.50' onClick={handler}>
                    <Icon path={mdiCheck} size={1}/>
                </Button>
            </InputRightElement>
        </InputGroup>
    );
}

export default InptGroup;