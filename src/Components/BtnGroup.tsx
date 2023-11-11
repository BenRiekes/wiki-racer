import { Article } from '../Utils/Functions';
import useDelayedLoading from '../Hooks/useDelayedLoading';

import Icon from '@mdi/react';
import { mdiClose, mdiRefresh } from '@mdi/js';
import { Button, ButtonGroup, Heading, IconButton, Spinner, VStack } from '@chakra-ui/react';

interface BtnGroupProps {
    action : 'Root' | 'Tail';
    rootArticle: Article | null;
    tailArticle: Article | null;
    rootTailLoading: {[key: string]: boolean};
    handleRootTail: (action: 'Root' | 'Tail', add: boolean) => void;
}


function BtnGroup(props: BtnGroupProps) {
    const article: Article | null = props.action === 'Root' ? props.rootArticle : props.tailArticle;
    const isLoading = props.rootTailLoading[props.action]; // Use rootTailLoading from props

    const truncate = (text: string, length: number): string => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    const handler = async (add: boolean) => {

        if (isLoading) return;
        props.handleRootTail(props.action, add);
    }

    return (
        <VStack spacing={2} alignSelf='flex-start' wrap='wrap'>
            <Heading size='lg' color='white' alignSelf='flex-start'>
                {props.action === 'Root' ? 'Start' : 'End'}:
            </Heading>

            {article ? (
                <ButtonGroup size='lg' variant='solid' isAttached>
                    <Button onClick={() => window.open(article.url, '_blank')}>
                        {isLoading ? <Spinner /> : truncate(article.title, 8)}
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
                <ButtonGroup size='lg' variant='solid' isAttached>

                    <Button>
                        {isLoading ? <Spinner /> : 'None'}
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