import {useContext} from 'react';
import {ThemeContext as StyledThemeContext} from 'styled-components'
import {ThemeContext} from './Provider'

const useTheme = () => {
    const {isDark, toggleTheme} = useContext(ThemeContext)
    const theme = useContext(StyledThemeContext)
    return {isDark, toggleTheme, theme}
}

export default useTheme;