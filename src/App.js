import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Pages/Home/Home';
import GameContainer from './Pages/Play/GameContainer';
function App() {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx("div", { children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Home, {}) }), _jsx(Route, { path: '/play', element: _jsx(GameContainer, {}) })] }) })] }));
}
export default App;
