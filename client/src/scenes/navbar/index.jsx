import {useState} from "@types/react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";

import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import { setMode, setLogout } from "../../state/index.js";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../styles/FlexBetween.jsx";


function NavBar() {
    return (
        <div>
            Nav Bar
        </div>
    );
}

export default NavBar;