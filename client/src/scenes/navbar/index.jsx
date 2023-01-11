import {useState} from "react";
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
    const
        [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false),
        dispatch = useDispatch(),
        navigate = useNavigate(),
        user = useSelector((state) => state.user),
        isNonMobile = useMediaQuery("(min-width: 780px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primary = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `hamid gader`;
    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight='bold'
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color='primary'
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                            color: {primary}
                        }
                    }}
                >
                    SociaLoli
                </Typography>
                {isNonMobile && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search.." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
                {/*DESKTOP NAV*/}
                {isNonMobile ? (
                    <FlexBetween gap="2rem">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{fontSize: "25px"}} />
                            ): (
                                <LightMode sx={{color: dark, fontSize: "25px"}} />
                            )}
                        </IconButton>
                        <Message sx={{fontSize: "25px"}} />
                        <Notifications sx={{fontSize: "25px"}} />
                        <Help sx={{fontSize: "25px"}} />
                        <FormControl variant="standard" value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    background: neutralLight,
                                    width: '150px',
                                    borderRadius: '0.25rem',
                                    p: '0.25rem 1rem',
                                    "& .MuiSvgIcon-root": {
                                        pr: '0.25rem',
                                        width: '3rem',
                                    },
                                    "& .MuiSelect-select": {
                                        background: neutralLight,
                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>
                                        {fullName}
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>) :
                (
                    <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Menu />
                    </IconButton>
                )}
                {/*mobile nav*/}
                {isMobileMenuToggled && isMobileMenuToggled && (
                    <Box
                        position="fixed"
                        right="0"
                        top="0"
                        zIndex="10"
                        maxWidth="500px"
                        minwidth="300px"
                        backgroundColor={background}
                    >
                        {/*Close Icon*/}
                        <Box display='flex' justifyContent='flex-end' p='1rem'>
                            <IconButton
                                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                            >
                                <Close/>
                            </IconButton>
                        </Box>
                        {/*Menu Items*/}
                        <FlexBetween
                            display='flex'
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='center'
                            gap='3rem'
                        >
                            <IconButton onClick={() => dispatch(setMode())}>
                                {theme.palette.mode === "dark" ? (
                                    <DarkMode sx={{fontSize: "25px"}} />
                                ): (
                                    <LightMode sx={{color: dark, fontSize: "25px"}} />
                                )}
                            </IconButton>
                            <Message sx={{fontSize: "25px"}} />
                            <Notifications sx={{fontSize: "25px"}} />
                            <Help sx={{fontSize: "25px"}} />
                            <FormControl variant="standard" value={fullName}>
                                <Select
                                    value={fullName}
                                    sx={{
                                        background: neutralLight,
                                        width: '150px',
                                        borderRadius: '0.25rem',
                                        p: '0.25rem 1rem',
                                        "& .MuiSvgIcon-root": {
                                            pr: '0.25rem',
                                            width: '3rem',
                                        },
                                        "& .MuiSelect-select": {
                                            background: neutralLight,
                                        }
                                    }}
                                    input={<InputBase />}
                                >
                                    <MenuItem value={fullName}>
                                        <Typography>
                                            {fullName}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => dispatch(setLogout())}>
                                        Log Out
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </FlexBetween>
                    </Box>
                )
                }
            </FlexBetween>
        </FlexBetween>
    );
}

export default NavBar;