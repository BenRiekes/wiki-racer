import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepSeparator, Card, CardBody, Heading, Text, Stack, useBreakpointValue } from "@chakra-ui/react";
function StepCard(props) {
    return (_jsx(Card, { size: 'sm', _hover: { boxShadow: 'xl' }, direction: { base: 'column', lg: 'row' }, overflow: 'hidden', variant: 'outline', alignItems: 'flex-start', children: _jsx(Stack, { children: _jsxs(CardBody, { children: [_jsx(Heading, { size: 'md', cursor: 'pointer', textDecoration: 'underline', onClick: () => window.open(props.href, '_blank'), children: props.title }), _jsx(Text, { py: '2', children: props.desc })] }) }) }));
}
function Steps({ props, heading }) {
    const stepperWidth = useBreakpointValue({ base: '100%', md: '45%', lg: '45%' });
    return (_jsxs(Stepper, { index: 1, orientation: 'vertical', size: 'md', height: 'auto', width: stepperWidth, gap: '5', mb: 2, children: [_jsx(Heading, { size: 'xl', color: 'white', alignSelf: 'flex-start', mb: 2, children: heading }), props.map((step, index) => (_jsxs(Step, { children: [_jsx(StepIndicator, { children: _jsx(StepStatus, { complete: _jsx(StepIcon, {}), incomplete: _jsx(StepNumber, {}), active: _jsx(StepNumber, {}) }) }), _jsx(StepCard, { ...step }), _jsx(StepSeparator, {})] }, index)))] }));
}
export default Steps;
