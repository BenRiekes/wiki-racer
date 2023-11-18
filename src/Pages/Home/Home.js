import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Steps from '../../Components/Steps';
import SmallCard from '../../Components/SmallCard';
import { Box, VStack, Flex, Heading } from '@chakra-ui/react';
import { HeaderCardData, ExampleCardData1, ExampleCardData2 } from '../../Data/CardData';
function Home() {
    return (_jsx(Flex, { width: '100%', h: 'auto', justifyContent: 'center', bg: 'blue.100', children: _jsxs(VStack, { w: '90%', mt: 5, spacing: 10, alignItems: 'center', children: [_jsx(Heading, { size: '2xl', color: 'white', alignSelf: 'flex-start', children: "Wiki Racer." }), _jsx(Flex, { w: '100%', h: 'auto', direction: { base: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-evenly', gap: 5, children: HeaderCardData.map((card, index) => (_jsx(SmallCard, { ...card }, index))) }), _jsx(Box, { width: '100%', p: 2, borderTop: '1px', borderTopColor: 'white', borderBottom: '1px', borderBottomColor: 'white', children: _jsx(Heading, { size: 'lg', color: 'white', children: "Embark on a Wikipedia adventure in 'Wiki Racer.' Race against others or AI, navigating through links to reach a target article first. Employ strategy and speed to traverse the knowledge web. Each round is a unique journey across Wikipedia's vast universe. Dive in, discover, and outsmart your way to victory!" }) }), _jsxs(Flex, { w: '100%', h: 'auto', direction: ["column", "column", "row"], alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, children: [_jsx(Steps, { props: ExampleCardData1, heading: 'Example #1' }), _jsx(Steps, { props: ExampleCardData2, heading: 'Example #2' })] })] }) }));
}
export default Home;
