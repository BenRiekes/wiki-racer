import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Modal, ModalOverlay, ModalContent, ModalHeader, Text, ModalFooter,ModalBody, useDisclosure, Heading, Button} from '@chakra-ui/react'

interface EndModalProps {
    winner: 'Player' | 'Opp' | null;
    handlePlayingStatus: (value: boolean) => void;
}

//----------------------------

function EndModal (props: EndModalProps) {

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure(); 

    useEffect(() => {

        if (props.winner !== null) {
            onOpen();
        }

    }, [props.winner, onOpen]);

    function handleClick () {
        props.handlePlayingStatus(false);
        navigate('/');
    }

    return (

        <Modal size={'md'}  isOpen={isOpen} onClose={onClose} isCentered={true} motionPreset='slideInBottom'>

            <ModalOverlay 
                bg='none'
                backdropFilter='auto'
                backdropInvert='80%'
                backdropBlur='2px'
            />

            <ModalContent w='100%' bg={props.winner === 'Player' ? 'green.100' : 'red.100'}>

                <ModalHeader >
                    <Heading size = 'lg' color='white'>
                        {props.winner === 'Player' ? 'You won!' : 'You lost!'}
                    </Heading> 
                </ModalHeader>

                <ModalBody>
                    <Text fontSize='lg' fontWeight='bold' color='white'>
                        {props.winner === 'Player' ? 
                            ('Fantastic work! Youve navigated the winding paths of knowledge and emerged as a champion of the Wiki Game. Your quick thinking and sharp skills have triumphed – celebrate your well-deserved victory!') : 
                            ('Game over, but dont be discouraged! Each step in the Wiki Game is a learning opportunity. Brush off, regroup, and jump back in – your next win is just around the corner')
                        }
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button w='100%' backgroundColor='white' color='black' onClick={() => handleClick()}>
                        Play again!
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default EndModal;