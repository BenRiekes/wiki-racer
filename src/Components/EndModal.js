import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalOverlay, ModalContent, ModalHeader, Text, ModalFooter, ModalBody, useDisclosure, Heading, Button } from '@chakra-ui/react';
//----------------------------
function EndModal(props) {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        if (props.winner !== null) {
            onOpen();
        }
    }, [props.winner, onOpen]);
    function handleClick() {
        props.handlePlayingStatus(false);
        navigate('/');
    }
    return (_jsxs(Modal, { size: 'md', isOpen: isOpen, onClose: onClose, isCentered: true, motionPreset: 'slideInBottom', children: [_jsx(ModalOverlay, { bg: 'none', backdropFilter: 'auto', backdropInvert: '80%', backdropBlur: '2px' }), _jsxs(ModalContent, { w: '100%', bg: props.winner === 'Player' ? 'green.100' : 'red.100', children: [_jsx(ModalHeader, { children: _jsx(Heading, { size: 'lg', color: 'white', children: props.winner === 'Player' ? 'You won!' : 'You lost!' }) }), _jsx(ModalBody, { children: _jsx(Text, { fontSize: 'lg', fontWeight: 'bold', color: 'white', children: props.winner === 'Player' ?
                                ('Fantastic work! Youve navigated the winding paths of knowledge and emerged as a champion of the Wiki Game. Your quick thinking and sharp skills have triumphed – celebrate your well-deserved victory!') :
                                ('Game over, but dont be discouraged! Each step in the Wiki Game is a learning opportunity. Brush off, regroup, and jump back in – your next win is just around the corner') }) }), _jsx(ModalFooter, { children: _jsx(Button, { w: '100%', backgroundColor: 'white', color: 'black', onClick: () => handleClick(), children: "Play again!" }) })] })] }));
}
export default EndModal;
