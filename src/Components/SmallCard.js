import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardBody, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
function SmallCard(props) {
    return (_jsxs(Card, { size: 'sm', boxShadow: 'xl', flexShrink: 1, minW: useBreakpointValue({ base: '100%', md: 'auto' }), children: [_jsx(CardHeader, { children: _jsx(Heading, { size: 'md', children: props.title }) }), _jsx(CardBody, { children: _jsx(Text, { children: props.desc }) })] }));
}
export default SmallCard;
