import { extendTheme } from '@chakra-ui/react';

// Define your color tokens
const colors = {

    yellow: {
        50: '#fffd33',
        100: '#ffcd0a',
        200: '#ffa602',
        300: '#d89e00',
    },
    orange: {
        50: '#fad09e',
        100: '#f5a23d',
        200: '#eb670f',
        300: '#e24104',
    },
    red: {
        50: '#ff99aa',
        100: '#ff3355',
        200: '#eb213c',
        300: '#c60929',
    },
    green: {
        50: '#b2df9c',
        100: '#66b739',
        200: '#26890c',
        300: '#106b03',
    },
    teal: {
        50: '#99e5e5',
        100: '#33cccc',
        200: '#0aa3a3',
        300: '#028282',
    },
    blue: {
        50: '#a2d1f2',
        100: '#45a3e5',
        200: '#1368ce',
        300: '#0542b9',
    },
    purple: {
        50: '#c2a5df',
        100: '#864cbf',
        200: '#46178f',
        300: '#25076b',
    },
};

const Theme = extendTheme({
    colors,
});

export default Theme;