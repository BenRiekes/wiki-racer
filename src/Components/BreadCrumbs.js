import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import Icon from "@mdi/react";
import { mdiArrowRightThin } from '@mdi/js';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
function BreadCrumbs(props) {
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [props.playerState?.history]);
    //Set the current article to the clicked article
    //Pop all articles after the clicked article from history
    const handleClick = async (index, article) => {
        if (props.playerState === null) {
            return;
        }
        if (article.url === props.playerState.currentArticle.url) {
            return;
        }
        props.playerStateHistoryRemoveAfterIndex(index, 'Player');
    };
    const backgroundColor = (index) => {
        if (props.playerState === null)
            return;
        if (index === props.playerState?.history?.length - 1) {
            return 'blue.50';
        }
        return 'gray.200';
    };
    return (_jsx(Box, { ref: scrollRef, w: '100%', pb: '10px', overflowX: 'scroll', css: {
            '&::-webkit-scrollbar': {
                width: '0.6em',
                height: '0.6em',
                backgroundColor: '#E2E8F0',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#CBD5E0',
            },
        }, children: _jsx(Breadcrumb, { spacing: '8px', separator: _jsx(Icon, { path: mdiArrowRightThin, size: 1 }), children: props.playerState?.history?.map((article, index) => (_jsx(BreadcrumbItem, { p: 2, mr: 2, w: 'auto', backgroundColor: backgroundColor(index), color: 'black', fontSize: 'md', fontWeight: 'bold', whiteSpace: 'nowrap', borderRadius: 'md', cursor: 'pointer', onClick: () => handleClick(index, article), children: _jsx(BreadcrumbLink, { textDecoration: 'none', whiteSpace: 'nowrap', children: article.title }) }, index))) }) }));
}
export default BreadCrumbs;
