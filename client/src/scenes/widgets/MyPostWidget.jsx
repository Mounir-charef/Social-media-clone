import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";

import {
    Box,
    Button,
    IconButton,
    InputBase,
    Divider,
    Typography,
    useMediaQuery, useTheme, Avatar
} from "@mui/material";

import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween.jsx";
import WidgetWrapper from "../../components/WidgetWrapper.jsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index.js";

function MyPostWidget({picturePath}) {

    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector(state => state.user);
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const token = useSelector(state => state.token);
    console.log(token)
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;


    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({posts}));
        setImage(null);
        setPost("");
    }


    return (
        <WidgetWrapper>
            <FlexBetween gap='1rem'>
                <Avatar src={picturePath} />
                <InputBase
                    placeholder="What's happening?"
                    onChange={e => setPost(e.target.value)}
                    value={post}
                    sx={{
                        flexBasis: '100%',
                        backgroundColor: palette.neutral.light,
                        borderRadius: '2rem',
                        padding: '.5em 1em',
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} aria-label='image dropzone'/>
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        aria-label='delete'
                                        onClick={() => setImage(null)}
                                        sx={{ width: "3rem", height: "3rem", ml:".5em"}}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobile ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                )}

                <Button
                    disabled={!post}
                    variant='outlined'
                    onClick={handlePost}
                    aria-label='post'
                    sx={{
                        borderRadius: '2rem',
                    }}
                >
                    POST
                </Button>
            </FlexBetween>

        </WidgetWrapper>
    );
}

export default MyPostWidget;