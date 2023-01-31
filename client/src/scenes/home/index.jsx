import {Box, useMediaQuery} from "@mui/material";
import Navbar from "../navbar";
import {useSelector} from "react-redux";
import UserWidget from "../widgets/UserWidget.jsx";
import MyPostWidget from "../widgets/MyPostWidget.jsx";

function HomePage() {
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const {_id, picturePath} = useSelector(state => state.user);
    return (
        <Box>
            <Navbar />
            <Box
                width='100%'
                padding='2rem 6%'
                display={isNonMobile ? "flex" : "block"}
                gap='0.5rem'
                justifyContent='space-between'
            >
                <Box flexBasis={isNonMobile ? '26%' : undefined}>
                    <UserWidget />
                </Box>
                <Box flexBasis={isNonMobile ? '42%' : undefined} mt={isNonMobile ? undefined : '2rem'}>
                    <MyPostWidget picturePath={picturePath}/>
                </Box>
                {isNonMobile && (
                    <Box flexBasis='26%'>

                    </Box>
                )}
            </Box>
        </Box>

    );
}

export default HomePage;