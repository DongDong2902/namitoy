import React from "react";
import './App.css';
import {ThemeProvider} from "./theme/Provider";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {GlobalStyle} from "./styles/GlobalStyle";
import Footer from "./components/footer/footer";
import NavHeader from "./components/NavHeader";
import Main from "./components/main/Main";
import Providers from "./pages/Providers";

function App() {
    return (
        <ThemeProvider>
            <GlobalStyle/>
            <Providers>
                <NavHeader/>
                <Main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                    <Footer/>
                </Main>
            </Providers>
        </ThemeProvider>
    );
}

export default App;
