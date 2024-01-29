import './styles/app.scss'
import Toolbar from "./components/Toolbar.jsx";
import SettingBar from "./components/SettingBar.jsx";
import Canvas from "./components/Canvas.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route
                        path="/:id"
                        element={
                            <>
                                <Toolbar/>
                                <SettingBar/>
                                <Canvas/>
                            </>
                        }
                    />
                    <Route
                        path="/*"
                        element={<Navigate to={`f${(+new Date()).toString(16)}`}/>}
                    />
                </Routes>
            </div>
        </BrowserRouter>
        // <BrowserRouter>
        //   <div className="app">
        //         <Routes>
        //             <Route path='/:id'>
        //                 <Toolbar />
        //                 <SettingBar />
        //                 <Canvas />
        //             </Route>
        //             <Route path={'/'} to={'`f${(+new Date).toString(16)}`'} />
        //         </Routes>
        //
        //
        //
        //   </div>
        // </BrowserRouter>
    );

}

export default App
