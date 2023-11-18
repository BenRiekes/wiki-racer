import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import BreadCrumbs from "../../Components/BreadCrumbs";
import ArticleDisplay from "../../Components/ArticleDisplay";
import StopWatch from "../../Components/StopWatch";
import EndModal from "../../Components/EndModal";
import { fetchArticle, fetchAssistant } from '../../Utils/Functions';
import { Flex, VStack, HStack, Heading, Divider } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/react";
function GameScreen(props) {
    const isRowLayout = useBreakpointValue({ base: false, md: true });
    const requestInProgress = useRef(false);
    const threadId = useRef(undefined);
    useEffect(() => {
        async function fetchAssistantResponse() {
            if (!requestInProgress.current &&
                props.rootArticle && props.tailArticle &&
                props.opponentState?.currentArticle && props.opponentState?.history) {
                requestInProgress.current = true;
                try {
                    const assistantRes = await fetchAssistant(props.rootArticle, props.tailArticle, props.opponentState.currentArticle, props.opponentState.history, threadId.current);
                    if (!threadId.current) {
                        threadId.current = assistantRes.threadId;
                    }
                    if (assistantRes.action === 'continue') {
                        if (!props.opponentState.currentArticle.links) {
                            throw new Error('No links found for current article');
                        }
                        const selectionURL = props.opponentState.currentArticle.links[assistantRes.index].url;
                        const selectionArticle = await fetchArticle('URL', selectionURL, true);
                        props.handlePlayerState(selectionArticle, 'Opp');
                    }
                    else if (assistantRes.action === 'back') {
                        if (!props.opponentState.history) {
                            throw new Error('No history found for opponent');
                        }
                        props.playerStateHistoryRemoveAfterIndex(assistantRes.index, 'Opp');
                    }
                    else {
                        throw new Error('Invalid action returned from assistant');
                    }
                }
                catch (error) {
                    console.error(error);
                }
                finally {
                    requestInProgress.current = false;
                }
            }
        }
        if (props.winner === null) {
            setTimeout(fetchAssistantResponse, 10000);
        }
        //Possibly change to playerState.currentArticle
        //To have the ai only trigger when the player goes
    }, [props.opponentState?.currentArticle]);
    //----------------------------------------
    return (_jsxs(_Fragment, { children: [_jsx(Flex, { width: '100%', h: 'auto', minHeight: '100vh', justifyContent: 'center', bg: 'blue.100', children: _jsx(VStack, { w: '90%', mt: 5, spacing: 0, alignItems: 'center', boxShadow: 'xl', bg: 'white', borderRadius: 'sm', children: _jsx(Flex, { w: '100%', gap: 3, p: 2, flexDirection: isRowLayout ? 'row' : 'column', alignItems: 'center', justifyContent: 'flex-start', children: _jsxs(VStack, { w: '100%', spacing: 5, alignItems: 'flex-start', children: [isRowLayout ? (_jsxs(HStack, { spacing: 5, w: '100%', alignSelf: 'flex-start', justifyContent: 'flex-start', children: [_jsxs(Heading, { size: 'md', p: 2, borderRadius: 'md', backgroundColor: 'gray.200', isTruncated: true, children: ["Start: ", props.rootArticle?.title] }), _jsxs(Heading, { size: 'md', p: 2, borderRadius: 'md', backgroundColor: 'gray.200', isTruncated: true, children: ["End: ", props.tailArticle?.title] })] })) : (_jsxs(VStack, { w: '100%', alignSelf: 'flex-start', alignItems: 'flex-start', children: [_jsxs(Heading, { w: '100%', maxW: '100%', size: 'md', p: 2, borderRadius: 'md', backgroundColor: 'gray.200', isTruncated: true, children: ["Start: ", props.rootArticle?.title] }), _jsxs(Heading, { w: '100%', maxW: '100%', size: 'md', p: 2, borderRadius: 'md', backgroundColor: 'gray.200', isTruncated: true, children: ["End: ", props.tailArticle?.title] })] })), isRowLayout ? (_jsxs(HStack, { spacing: 5, w: '100%', children: [_jsx(StopWatch, { isRunning: props.isPlaying, isRowLayout: true }), _jsx(BreadCrumbs, { playerState: props.playerState, playerStateHistoryRemoveAfterIndex: props.playerStateHistoryRemoveAfterIndex })] })) : (_jsxs(VStack, { spacing: 5, w: '100%', children: [_jsx(StopWatch, { isRunning: props.isPlaying, isRowLayout: false }), _jsx(BreadCrumbs, { playerState: props.playerState, playerStateHistoryRemoveAfterIndex: props.playerStateHistoryRemoveAfterIndex })] })), _jsx(Divider, { orientation: 'horizontal', borderColor: 'black' }), _jsx(ArticleDisplay, { isRowLayout: isRowLayout, playerState: props.playerState, handlePlayerState: props.handlePlayerState })] }) }) }) }), _jsx(EndModal, { winner: props.winner, handlePlayingStatus: props.handlePlayingStatus })] }));
}
export default GameScreen;
