import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
    background-color: ${({theme}) => theme.colors.background}!important;
    * {
        color: ${({theme}) => theme.colors.text};
    }
}
    
.main-color {
    color: ${({theme}) => theme.colors.main};
}
`