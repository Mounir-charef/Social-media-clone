import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        FirstName: {
            type: String,
            required: true,
        },
        LastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picture: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean,
            default: {}
        },
        comments: {
            type: Array,
            default: [],
        }
    }, {timestamps: true}
)

const Post = mongoose.model("Post", postSchema);
export default Post;