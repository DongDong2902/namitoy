import React from 'react';
import {AuthProvider} from "../context/auth";

const Providers:React.FC = ({children}) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};

export default Providers;