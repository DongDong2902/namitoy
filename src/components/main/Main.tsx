import React from 'react';
import {MainStyle} from "../../styles/MainStyle";

const Main:React.FC = ({children}) => {
    return (
        <MainStyle className='container'>
            {children}
        </MainStyle>
    );
};

export default Main;