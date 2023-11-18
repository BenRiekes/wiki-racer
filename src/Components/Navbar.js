import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiMenu, mdiClose } from '@mdi/js';
import { Box, Flex, HStack, Heading, Button, useDisclosure, Stack } from '@chakra-ui/react';
const Links = ['Home', 'Play'];
//------------------------------------
const NavLink = (props) => {
    const { children } = props;
    return (_jsx(Box, { as: Link, px: 2, py: 1, rounded: 'md', to: props.to, color: 'white', _hover: { textDecoration: 'none', bg: 'blue.50' }, children: children }));
};
export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (_jsx(_Fragment, { children: _jsxs(Box, { bg: 'red.100', px: 4, children: [_jsxs(Flex, { h: 16, alignItems: 'center', justifyContent: 'space-between', children: [_jsx(Button, { size: 'sm', "aria-label": 'Open Menu', display: { md: 'none' }, onClick: isOpen ? onClose : onOpen, children: isOpen ?
                                _jsx(Icon, { path: mdiClose, size: 1 }) :
                                _jsx(Icon, { path: mdiMenu, size: 1 }) }), _jsxs(HStack, { spacing: 8, alignItems: 'center', children: [_jsx(Heading, { size: 'md', color: 'white', children: "Wiki Racer" }), _jsx(HStack, { as: 'nav', spacing: 4, display: { base: 'none', md: 'flex' }, children: Links.map((link) => (_jsx(NavLink, { to: link === 'Home' ? '/' : `/${link.toLowerCase()}`, children: link }, link))) })] })] }), isOpen ? (_jsx(Box, { pb: 4, display: { md: 'none' }, children: _jsx(Stack, { as: 'nav', spacing: 4, children: Links.map((link) => (_jsx(NavLink, { to: link === 'Home' ? '/' : `/${link.toLowerCase()}`, children: link }, link))) }) })) : null] }) }));
}
