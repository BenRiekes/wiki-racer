import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import useDebounce from '../Hooks/useDebounce';
function SearchInput(props, { ...rest }) {
    const [inputValue, setInputValue] = useState(props.value);
    const debouncedValue = useDebounce(inputValue, props.debounceTime);
    useEffect(() => {
        props.onValChange(debouncedValue);
    }, [debouncedValue, props.onValChange]);
    function handleInputChange(e) {
        setInputValue(e.target.value);
    }
    return (_jsx(Input, { value: inputValue, onChange: handleInputChange, placeholder: props.placeholder, className: props.className, ...rest }));
}
export default SearchInput;
