import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Button, Text, Link, Heading, Box, VStack, Stack } from '@chakra-ui/react';
import { fetchArticle } from '../Utils/Functions';
function ArticleDisplay(props) {
    const currentArticle = props.playerState?.currentArticle;
    const isRowLayout = props.isRowLayout;
    const handleLinkClick = async (url) => {
        const article = await fetchArticle('URL', url, true);
        props.handlePlayerState(article, 'Player');
    };
    const AccordionDisplay = () => {
        const width1 = isRowLayout ? '15vw' : '100%';
        const width2 = isRowLayout ? '20vw' : '90%';
        const width3 = isRowLayout ? undefined : '100%';
        const defaultIndex = isRowLayout ? 0 : 1;
        const LinkSegment = currentArticle?.links;
        const formatWikiTitleFromURL = (url) => {
            const lastSlashIndex = url.lastIndexOf('/');
            const titleWithUnderscores = url.substring(lastSlashIndex + 1);
            const title = titleWithUnderscores.replace(/_/g, ' ');
            return decodeURIComponent(title);
        };
        return (_jsx(Accordion, { allowToggle: true, defaultIndex: defaultIndex, width: width3, children: _jsxs(AccordionItem, { backgroundColor: 'gray.200', children: [_jsx("h2", { children: _jsx(AccordionButton, { w: width1, children: _jsx(Box, { as: "span", flex: '1', textAlign: 'left', children: "Links" }) }) }), _jsx(AccordionPanel, { pb: 1, w: width2, maxH: '50vh', overflowY: 'scroll', css: {
                            '&::-webkit-scrollbar': {
                                width: '0.6em',
                                height: '0.6em',
                                backgroundColor: '#E2E8F0',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#CBD5E0',
                            },
                        }, children: _jsx(VStack, { w: '100%', spacing: 1, align: 'stretch', children: LinkSegment.map((link, index) => (_jsx(Button, { size: 'md', maxW: '100%', borderRadius: 'md', backgroundColor: 'red.100', justifyContent: 'flex-start', color: 'white', _hover: { backgroundColor: 'blue.100' }, onClick: () => handleLinkClick(link.url), children: _jsx(Text, { isTruncated: true, children: formatWikiTitleFromURL(link.url) }) }, index))) }) })] }) }));
    };
    const ContentDisplay = () => {
        if (!currentArticle) {
            return null;
        }
        return (_jsxs(Box, { p: 2, w: '100%', children: [_jsx(Heading, { size: 'md', mb: 5, textDecor: 'underline', children: currentArticle.title }), currentArticle.body?.map((paragraph, pIndex) => (_jsx(Text, { mb: 5, children: paragraph.map((content, cIndex) => typeof content === 'string' ? (content) : (_jsx(Link, { color: 'blue.200', textDecor: 'underline', onClick: () => handleLinkClick(content.url), children: content.text }, cIndex))) }, pIndex)))] }));
    };
    return (_jsxs(Stack, { direction: props.isRowLayout ? 'row' : 'column', w: '100%', alignItems: 'flex-start', children: [_jsx(AccordionDisplay, {}), _jsx(ContentDisplay, {})] }));
}
export default ArticleDisplay;
