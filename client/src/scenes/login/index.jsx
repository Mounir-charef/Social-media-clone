import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from './Form.jsx'
function LoginPage() {
    const theme = useTheme()
    // const isNonMobile = useMediaQuery(theme.breakpoints.up('sm'))
    const isNonMobile = useMediaQuery("(min-width:1000px)");

    return (
        <Box>
            <Box
                width='100%'
                backgroundColor={theme.palette.background.alt}
                padding='1rem 6%'
                textAlign='center'
            >
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                >
                    SociaLoli
                </Typography>

            </Box>

            <Box
                width={isNonMobile ? '50%' : '93%'}
                p='2rem'
                m='2rem auto'
                borderRadius='1.5rem'
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight='500' variant='h4' sx={{mb: '1.5rem'}}>
                    Welcome to SociaLoli, the social media for lolis!
                </Typography>
                <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
                    Please login to continue.
                </Typography>

            </Box>
        </Box>
    );
}

export default LoginPage;