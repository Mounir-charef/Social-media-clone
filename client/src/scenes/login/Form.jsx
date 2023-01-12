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
import FlexBetween from "../../styles/FlexBetween.jsx";

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
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery('(min-width:1000px)');
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const handleFormSubmit = async (values, onSubmitProps) => {

    }

    return (
        <Formik
            initialValues={isLogin? initialValuesLogin : initialValuesRegister}
            onSubmit={handleFormSubmit}
            validationSchema={isLogin? loginSchema : registerSchema}
            validateOnBlur='true'
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
                                    border={`1px solid ${theme.neutral.medium}`}
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
                                                border={`2px dashed ${theme.primary.main}`}
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
                    </Box>

                    {/*BUTTONS*/}
                    <Box>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                m: "1rem 0",
                                backgroundColor: theme.primary.main,
                                padding: "1rem",
                                color: theme.background.alt,
                                '&:hover': {
                                    backgroundColor: theme.background.main,
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
                                color: theme.primary.main,
                                '&:hover': {
                                    cursor: "pointer",
                                    color: theme.primary.light,
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