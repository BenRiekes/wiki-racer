import React, { useState, useEffect, ChangeEvent } from 'react';
import { Input, InputProps } from '@chakra-ui/react';
import useDebounce from '../Hooks/useDebounce';

interface SearchInputProps extends InputProps {
    value: string;
    onValChange: (value: string) => void;
    debounceTime: number;
    placeHolder?: string;
    className?: string;
}

function SearchInput (props: SearchInputProps, {...rest}) {
    const [inputValue, setInputValue] = useState<string>(props.value);
    const debouncedValue = useDebounce(inputValue, props.debounceTime);

    useEffect(() => {
        props.onValChange(debouncedValue);
    }, 
        [debouncedValue, props.onValChange]
    );

    function handleInputChange (e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    return (
        <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder={props.placeholder}
            className={props.className}
            {...rest} 
        />
    )
}

export default SearchInput;