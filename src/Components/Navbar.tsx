import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

import Icon from '@mdi/react';
import { mdiMenu, mdiClose, mdiAccountOutline, mdiWikipedia} from '@mdi/js';

import {
    Box, Flex, Avatar, HStack, Text, useToast, Heading,
    IconButton, Button, Menu, MenuButton, MenuList, MenuItem,
    MenuDivider, useDisclosure, useColorModeValue, Stack, Spacer, Toast
} from '@chakra-ui/react';


interface NavbarProps {
    children: React.ReactNode;
    to: string;
}

const Links = ['Home', 'Play'];

//------------------------------------

const NavLink = (props: NavbarProps) => {
    const { children } = props;

    return (
        <Box 
            as={Link} px={2} py={1} rounded = {'md'} to={props.to} color='white'
            _hover = {{textDecoration: 'none', bg: 'blue.50'}}
        >
            {children}
        </Box>
    )
}

export default function Navbar () {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box bg='red.100' px={4}>

                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

                    <Button 
                        size={'sm'}
                        aria-label={'Open Menu'}
                        display={{ md: 'none'}}
                        onClick={isOpen ? onClose : onOpen}
                    >
                        {isOpen ? 
                            <Icon path={mdiClose} size={1}/> : 
                            <Icon path={mdiMenu} size={1}/>
                        }
                    </Button>

                    <HStack spacing={8} alignItems={'center'}>

                        <Heading size='md' color='white'>Wiki Racer</Heading>
                
                        <HStack 
                            as={'nav'} 
                            spacing={4} 
                            display={{ base: 'none', md: 'flex'}}
                        >
                            {Links.map((link) => (
                                <NavLink key={link} to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}>{link}</NavLink>
                            ))}
                        </HStack>

                    </HStack>

                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link} to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}

            </Box>
        </>
    )
}