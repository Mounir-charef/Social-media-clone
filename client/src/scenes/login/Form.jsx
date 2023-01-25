import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material";

import {EditOutlined} from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index.js";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween.jsx";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref('password')], 'Your passwords do not match.'),
    location: yup.string(),
    occupation: yup.string(),
    picture: yup.string(),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}


function Form() {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        // send form data with an image to server
        const formData = new FormData();
        for( let value in values) {
            formData.append(value, values[value]);
        }
        if(values.picture) {
            formData.append('picturePath', values.picture.name);
        }
        const savedUserResponse = await fetch(
            "http://127.0.0.1:3001/auth/register",
            {
                method: "POST",
                body: formData,
            });
        const {savedUser, token} = await savedUserResponse.json();
        onSubmitProps.resetForm();
        if (savedUser) {
            dispatch(setLogin({
                user: savedUser,
                token: token,
            }));
            navigate("/home");
        }
    };

    const login = async (values, onSubmitProps) => {
        const response = await fetch("http://127.0.0.1:3001/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        const {user, token} = await response.json();
        if (user) {
            dispatch(setLogin({
                user: user,
                token: token,
            }));
            navigate("/home");
        }
        onSubmitProps.resetForm();
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            initialValues={isLogin? initialValuesLogin : initialValuesRegister}
            onSubmit={handleFormSubmit}
            validationSchema={isLogin? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box display='grid' gap='2rem'
                        gridTemplateColumns="repeat(2, 1fr)"
                        sx={{
                            "& > div" : {
                                gridColumn: isNonMobile? undefined : "span 2",
                            }
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    error={touched.firstName && Boolean(errors.firstName)}
                                    helperText={touched.firstName && Boolean(errors.firstName)}
                                    sx={{gridColumn: "span 1"}}
                                />
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    helperText={touched.lastName && Boolean(errors.lastName)}
                                    sx={{gridColumn: "span 1"}}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && Boolean(errors.location)}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={
                                        Boolean(touched.occupation) && Boolean(errors.occupation)
                                    }
                                    helperText={touched.occupation && Boolean(errors.occupation)}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <Box
                                    sx={{ gridColumn: "span 2" }}
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p='1rem'
                                                sx={{
                                                    '&:hover': {
                                                        cursor: 'pointer',
                                                    }
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p> Add Picture Here</p>
                                                ) : (
                                                  <FlexBetween>
                                                    <Typography>{values.picture.name}</Typography>
                                                    <EditOutlined />
                                                  </FlexBetween>
                                                )}

                                            </Box>
                                        )}

                                    </Dropzone>
                                </Box>
                            </>
                        )}
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && Boolean(errors.email)}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && Boolean(errors.password)}
                            sx={{ gridColumn: "span 2" }}
                        />
                        {isRegister && (
                            <TextField
                                label="Confirm Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.confirmPassword}
                                name="confirmPassword"
                                error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                sx={{ gridColumn: "span 2" }}
                            />
                        )}
                    </Box>

                    {/*BUTTONS*/}
                    <Box>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                m: "1rem 0",
                                backgroundColor: palette.primary.main,
                                padding: "1rem",
                                fontSize: "16px",
                                fontWeight: "bold",
                                "&:hover": {
                                    color: palette.primary.main,
                                    backgroundColor: palette.neutral.light,
                                }
                            }}
                        >
                            {isLogin ? "Login" : "Register"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                '&:hover': {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                }
                            }}
                        >
                            {isLogin
                                ? "Don't have a Loli account? Sign up here."
                                : "Already got a Loli account? Login here."}
                        </Typography>
                    </Box>

                </form>
            )}
        </Formik>
    );
}

export default Form;