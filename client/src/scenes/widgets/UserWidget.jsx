import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    Twitter,
    LinkedIn

} from "@mui/icons-material";
import {Box, Typography, Divider, useTheme, Avatar} from "@mui/material";
import FlexBetween from "../../components/FlexBetween.jsx";
import WidgetWrapper from "../../components/WidgetWrapper.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = () => {
    const user = useSelector(state => state.user),
     {palette} = useTheme(),
     navigate = useNavigate();

    const dark = palette.neutral.dark,
     medium = palette.neutral.medium,
     main = palette.neutral.main;

    return (
        <WidgetWrapper>
            <FlexBetween gap='0.5rem' pb='1.1rem' onclick={() => navigate(`/profile/${user.userId}`)}>
                {/*4rows*/}
                <FlexBetween gap='1rem'>
                    <Avatar alt={user.firstName} src={`http://localhost:3001/assets/${user.picturePath}`} />
                    <Box>
                        <Typography
                            variant='h4'
                            color={dark}
                            fontWeight='500'
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                }
                            }}>
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant='body2' color={medium}>
                            {user.friends.length} friends
                        </Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

                <Box p='1rem 0'>
                    <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                        <LocationOnOutlined fontSize="large" sx={{color: main}}/>
                        <Typography color={medium}>{user.location}</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                        <WorkOutlineOutlined fontSize="large" sx={{color: main}}/>
                        <Typography color={medium}>{user.occupation}</Typography>
                    </Box>
                </Box>
                <Divider />

                <Box p='1rem 0'>
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Who's viewed your profile</Typography>
                        <Typography color={main} fontWeight='500'>
                            {user.viewedProfile}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Impressions of your post</Typography>
                        <Typography color={main} fontWeight='500'>
                            {user.impressions}
                        </Typography>
                    </FlexBetween>
                </Box>
            <Divider />

                <Box p="1rem 0">
                    <Typography fontWeight='500' fontSize='1rem' color={main} mb='1rem'>
                        Social Profile
                    </Typography>
                    <FlexBetween gap='1rem' mb="0.5rem">
                        <FlexBetween gap='1rem'>
                            {/*<img src={twitter} alt="twitter"/>*/}
                            <Twitter sx={{color: main}} fontSize='large'/>
                            <Box>
                                <Typography color={main} fontWeight='500'>Twitter</Typography>
                                <Typography color={medium} fontWeight='500'>Social Network</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}} />
                    </FlexBetween>

                    <FlexBetween gap='1rem'>
                        <FlexBetween gap='1rem'>
                            {/*<img src={linkedin} alt="linkedin"/>*/}
                            <LinkedIn sx={{color: main}} fontSize='large'/>
                            <Box>
                                <Typography color={main} fontWeight='500'>Linkedin</Typography>
                                <Typography color={medium} fontWeight='500'>Network Platform</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}} />
                    </FlexBetween>
                </Box>
        </WidgetWrapper>
    )
};

export default UserWidget;