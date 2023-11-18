import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { RANDOM_URL } from '../Utils/Functions';
import Icon from '@mdi/react';
import { mdiClose, mdiRefresh } from '@mdi/js';
import { Button, ButtonGroup, Heading, IconButton, Spinner, VStack } from '@chakra-ui/react';
function BtnGroup(props) {
    const isLoading = props.rootTailLoading[props.action];
    async function handler(add) {
        if (isLoading)
            return;
        props.handleRootTail(props.action, add, RANDOM_URL);
    }
    return (_jsxs(VStack, { w: '100%', spacing: 3, children: [_jsxs(Heading, { size: 'lg', color: 'white', alignSelf: 'flex-start', children: [props.action === 'Root' ? 'Start' : 'End', ":"] }), props.article !== null ? (_jsxs(ButtonGroup, { w: '100%', alignItems: 'center', isAttached: true, children: [_jsx(Button, { w: '100%', size: 'md', justifyContent: 'flex-start', isTruncated: true, onClick: () => window.open(props.article?.url, '_blank'), children: isLoading ? _jsx(Spinner, {}) : props.article.title }), _jsx(IconButton, { "aria-label": 'Refresh', backgroundColor: 'green.50', icon: _jsx(Icon, { path: mdiRefresh, size: 1 }), onClick: () => handler(true) }), _jsx(IconButton, { "aria-label": 'Remove', backgroundColor: 'red.50', icon: _jsx(Icon, { path: mdiClose, size: 1 }), onClick: () => handler(false) })] })) : (_jsxs(ButtonGroup, { w: '100%', alignItems: 'center', isAttached: true, children: [_jsx(Button, { w: '100%', size: 'md', justifyContent: 'flex-start', isTruncated: true, children: isLoading ? _jsx(Spinner, {}) : 'Select an article' }), _jsx(IconButton, { "aria-label": 'Refresh', backgroundColor: 'green.50', icon: _jsx(Icon, { path: mdiRefresh, size: 1 }), onClick: () => handler(true) })] }))] }));
}
export default BtnGroup;
