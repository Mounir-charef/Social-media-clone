import {Routes , Route, Navigate} from "react-router-dom";
import HomePage from "./scenes/home";
import LoginPage from "./scenes/login";
import ProfilePage from "./scenes/profil";
import { useMemo } from "react";
import {useSelector} from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material";
import {themeSettings} from "./theme.js";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => {
        return createTheme(themeSettings(mode));
    }, [mode]);

    const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path="/" element={!isAuth? <LoginPage /> : <Navigate to='/home' />} />
                <Route path="/home" element={isAuth? <HomePage /> : <Navigate to='/' />} />
                <Route path="/profile/:userId" element={isAuth? <ProfilePage /> : <Navigate to='/' />} />
            </Routes>
        </ThemeProvider>
    </div>
  )
}

export default App
