import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    Avatar,
} from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Close,
    Person
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {setMode, setLogout} from "../../state/index.js";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween.jsx";
import StyledBadge from "../../styles/StyledBadge.jsx";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const alt = theme.palette.background.alt;
    const user = useSelector(state => state.user);
    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            opacity: 0.6,
                            cursor: "pointer",
                        },
                    }}
                >
                    SociaLoli
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* DESKTOP NAV */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <IconButton disabled>
                        <Message sx={{ fontSize: "25px" }} />
                    </IconButton>
                    <IconButton disabled>
                        <Notifications sx={{ fontSize: "25px" }} />
                    </IconButton>
                    <IconButton disabled>
                        <Help sx={{ fontSize: "25px" }} />
                    </IconButton>

                    <Box display='flex' gap='1rem' alignItems='center'>
                        <FormControl variant="standard" value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                            </Select>
                        </FormControl>
                        {/*<PersonOutline sx={{ fontSize: '35px'}}/>*/}

                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            {!user.picturePath ? (
                                <Avatar>
                                    <Person sx={{
                                        width: '1.2em',
                                        height: '1.2em'
                                    }} />
                                </Avatar>
                            ): (
                                <Avatar alt={fullName} src={`/assets/${user.picturePath}`} />
                            )}
                        </StyledBadge>
                    </Box>
                </FlexBetween>
            ) :
                // MOBILE NAV
                (
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        {!user.picturePath ? (
                            <Avatar>
                                <Person sx={{
                                    width: '1.2em',
                                    height: '1.2em'
                                }} />
                            </Avatar>
                        ): (
                            <Avatar alt={fullName} src={`http://localhost:3001/assets/${user.picturePath}`} />
                        )}
                    </StyledBadge>
                </IconButton>
            )}

            {/* MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    position="fixed"
                    right="0"
                    top="0"
                    zIndex="10"
                    backgroundColor={background}
                    p='1em 4em 2em'
                >
                    {/* CLOSE ICON */}

                    <IconButton
                        sx={{alignSelf: 'flex-end', marginBottom: '1em', transform: 'translateX(2rem)'}}
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Close sx={{fontSize: '1.75em'}}/>
                    </IconButton>


                    {/* MENU ITEMS */}
                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        alignItems="center"
                        gap="2rem"
                    >
                        <IconButton
                            onClick={() => dispatch(setMode())}
                            sx={{ fontSize: "40px" }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "40px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "40px" }} />
                            )}
                        </IconButton>
                        <IconButton disabled>
                            <Message sx={{ fontSize: "40px" }} />
                        </IconButton>
                        <IconButton disabled>
                            <Notifications sx={{ fontSize: "40px" }} />
                        </IconButton>
                        <IconButton disabled>
                            <Help sx={{ fontSize: "40px" }} />
                        </IconButton>
                        <FormControl variant="standard" value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;