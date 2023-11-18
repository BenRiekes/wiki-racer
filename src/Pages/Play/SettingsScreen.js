import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { RANDOM_URL, fetchArticle } from '../../Utils/Functions';
import BtnGroup from "../../Components/BtnGroup";
import InptGroup from "../../Components/InptGroup";
import ArticleCard from "../../Components/ArticleCard";
import { Flex, VStack, HStack, Heading, Button, Divider, Box, useBreakpointValue } from "@chakra-ui/react";
function SettingsScreen(props) {
    const hasRequestedRootTail = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [exploreArticles, setExploreArticles] = useState([]);
    useEffect(() => {
        if (hasRequestedRootTail.current) {
            return;
        }
        hasRequestedRootTail.current = true;
        props.handleRootTail('Root', true, RANDOM_URL);
        props.handleRootTail('Tail', true, RANDOM_URL);
        async function fetchExploreArticles() {
            try {
                const articlePromises = Array.from({ length: 10 }, () => fetchArticle('URL', RANDOM_URL, false));
                const articles = await Promise.all(articlePromises);
                setExploreArticles(articles);
                setIsLoading(false);
            }
            catch (error) {
                console.error('Failed to fetch articles: ', error);
            }
        }
        fetchExploreArticles();
    }, []);
    //----------------------------------------
    return (_jsx(Flex, { width: '100%', h: 'auto', justifyContent: 'center', bg: 'blue.100', children: _jsxs(VStack, { w: '90%', mt: 5, spacing: 10, alignItems: 'center', children: [_jsxs(Flex, { w: '100%', gap: 5, direction: { base: 'column', md: 'row' }, boxShadow: 'md', borderRadius: 'lg', children: [_jsxs(VStack, { h: '100%', w: useBreakpointValue({ base: '100%', md: 'auto' }), p: 2, spacing: 5, alignSelf: useBreakpointValue({ base: 'center', md: 'flex-start' }), alignItems: 'flex-start', children: [_jsx(Heading, { size: '2xl', color: 'white', children: "Configure" }), _jsx(Button, { size: 'lg', w: '100%', onClick: () => props.handlePlayingStatus(true), children: "Play" })] }), _jsx(Divider, { orientation: useBreakpointValue({ base: 'horizontal', md: 'vertical' }), borderColor: 'white' }), _jsxs(VStack, { h: '100%', w: useBreakpointValue({ base: '100%', md: '100%' }), p: 2, spacing: 5, alignSelf: 'flex-start', alignItems: 'flex-start', justifyContent: 'space-evenly', children: [_jsx(BtnGroup, { action: 'Root', article: props.rootArticle, rootTailLoading: props.rootTailLoading, handleRootTail: props.handleRootTail }), _jsx(BtnGroup, { action: 'Tail', article: props.tailArticle, rootTailLoading: props.rootTailLoading, handleRootTail: props.handleRootTail })] })] }), _jsx(Flex, { gap: 5, p: 5, w: '100%', h: 'auto', direction: { base: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'flex-start', boxShadow: 'md', borderRadius: 'lg', children: _jsxs(VStack, { spacing: 5, w: '100%', alignSelf: 'flex-start', wrap: 'wrap', children: [_jsx(Heading, { size: 'xl', color: 'white', alignSelf: 'flex-start', children: "Custom" }), _jsx(InptGroup, { action: 'Root', placeholder: 'Start Link:', rootTailLoading: props.rootTailLoading, handleRootTail: props.handleRootTail }), _jsx(InptGroup, { action: 'Tail', placeholder: 'End Link:', rootTailLoading: props.rootTailLoading, handleRootTail: props.handleRootTail })] }) }), _jsxs(VStack, { p: 5, mb: 5, spacing: 2, width: '100%', borderRadius: 'lg', boxShadow: 'md', children: [_jsx(Heading, { alignSelf: 'flex-start', size: 'xl', color: 'white', children: "Explore" }), _jsx(Box, { width: '100%', overflowX: 'scroll', css: {
                                '&::-webkit-scrollbar': {
                                    width: '0.6em',
                                    height: '0.6em',
                                    backgroundColor: '#E2E8F0',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#CBD5E0',
                                },
                            }, children: _jsx(HStack, { spacing: 5, paddingY: '15px', children: isLoading ? (Array.from({ length: 10 }).map((_, index) => (_jsx(ArticleCard, { article: null, isLoading: true, handleRootTail: props.handleRootTail }, index)))) : (exploreArticles.map((article, index) => (_jsx(ArticleCard, { article: article, isLoading: false, handleRootTail: props.handleRootTail }, index)))) }) })] })] }) }));
}
export default SettingsScreen;
