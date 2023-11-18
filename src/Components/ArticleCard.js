import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardBody, CardFooter, Heading, HStack, Image, Skeleton, SkeletonText, VStack, Button, AspectRatio } from "@chakra-ui/react";
const wikipediaImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Wikipedia_logo_puzzle_globe_spins_horizontally_and_vertically%2C_revealing_the_contents_of_all_of_its_puzzle_pieces_%284K_resolution%29_%28VP9%29.webm/2160px--Wikipedia_logo_puzzle_globe_spins_horizontally_and_vertically%2C_revealing_the_contents_of_all_of_its_puzzle_pieces_%284K_resolution%29_%28VP9%29.webm.jpg';
function ArticleCard(props) {
    const truncate = (text, length) => {
        if (text.length <= length) {
            return text;
        }
        return text.substring(0, length) + '...';
    };
    return (_jsxs(Card, { size: 'sm', width: '225px', bg: 'white', boxShadow: 'md', borderRadius: 'lg', display: 'inline-block', flexShrink: 0, children: [_jsx(AspectRatio, { ratio: 1, children: _jsx(Image, { p: 2, src: wikipediaImage, alt: 'Wiki Logo', objectFit: 'cover', borderRadius: 'xl', filter: props.isLoading ? 'blur(4px)' : 'none' }) }), _jsx(CardBody, { mt: 0, p: 3, children: _jsx(VStack, { spacing: 2, alignItems: 'flex-start', children: props.isLoading ? (_jsxs(_Fragment, { children: [_jsx(Skeleton, { height: '20px', width: '70%' }), _jsx(SkeletonText, { mt: 4, noOfLines: 2, skeletonHeight: 2 }), _jsx(Skeleton, { height: '20px', width: '100%' })] })) : (_jsx(_Fragment, { children: _jsx(Heading, { size: 'sm', textDecor: 'underline', cursor: 'pointer', onClick: () => props.article && window.open(props.article.url, '_blank'), children: props.article ? truncate(props.article.title, 20) : 'Loading...' }) })) }) }), !props.isLoading && props.article && (_jsx(_Fragment, { children: _jsx(CardFooter, { py: 2, children: _jsxs(HStack, { w: '100%', spacing: 2, children: [_jsx(Button, { bg: 'green.50', onClick: () => props.article && props.handleRootTail('Root', true, props.article.url), children: "Start" }), _jsx(Button, { bg: 'green.50', onClick: () => props.article && props.handleRootTail('Tail', true, props.article.url), children: "End" })] }) }) }))] }));
}
export default ArticleCard;
