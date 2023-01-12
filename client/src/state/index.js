import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: {
        firstName: "Mounir",
        lastName: "Charef",
    },
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state, action) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user){
                state.user.friends = action.payload;
            }else{
                console.error("No user");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setPost: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
        }
    }
})

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost}
    = authSlice.actions;

export default authSlice.reducer;