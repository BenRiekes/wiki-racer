import { Article } from '../Utils/Functions';
import useDelayedLoading from '../Hooks/useDelayedLoading';

import Icon from '@mdi/react';
import { mdiClose, mdiRefresh } from '@mdi/js';
import { Button, ButtonGroup, Heading, IconButton, Spinner, VStack } from '@chakra-ui/react';

interface BtnGroupProps {
    action : 'Root' | 'Tail';
    article: Article | null;
    rootTailLoading: {[key: string]: boolean};
    handleRootTail: (action: 'Root' | 'Tail', add: boolean) => void;
}

function BtnGroup(props: BtnGroupProps) {
    const isLoading = props.rootTailLoading[props.action]; 

    async function handler (add: boolean) {
        if (isLoading) return;
        props.handleRootTail(props.action, add);
    } 


    return (
        
        <VStack w='100%' spacing={3}>

            <Heading size='lg' color='white' alignSelf='flex-start'>
                {props.action === 'Root' ? 'Start' : 'End'}:
            </Heading>

            {props.article ? (

                <ButtonGroup w='100%' alignItems='center' isAttached>

                    <Button w='100%' size='md' justifyContent='flex-start' isTruncated
                        onClick={() => window.open(props.article?.url, '_blank')}
                    >
                        {isLoading ? <Spinner /> : props.article?.title}
                    </Button>

                    <IconButton
                        aria-label='Refresh'
                        backgroundColor='green.50'
                        icon={<Icon path={mdiRefresh} size={1}/>}
                        onClick={() => handler(true)}
                    />

                    <IconButton 
                        aria-label='Remove'
                        backgroundColor='red.50'
                        icon={<Icon path={mdiClose} size={1}/>}
                        onClick={() => handler(false)}
                    />
                </ButtonGroup> 
            ) : (
                <ButtonGroup w='100%' alignItems='center' isAttached>

                    <Button w='100%' size='md' justifyContent='flex-start' isTruncated>
                        {isLoading ? <Spinner /> : 'Select an article'}
                    </Button>

                    <IconButton
                        aria-label='Refresh'
                        backgroundColor='green.50'
                        icon={<Icon path={mdiRefresh} size={1}/>}
                        onClick={() => handler(true)}
                    />
                </ButtonGroup>
            )}
        </VStack>
    );
}

export default BtnGroup;