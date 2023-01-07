import User from "../models/User.js";

/* READ USER */

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch (error) {
        res.status(404).json({ error: error.message });
    }
}


export const getUserFriends = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(({
            _id,
            firstName,
            lastName,
            picturePath,
            occupation,
            location
        }) => {
            return {
                _id,
                firstName,
                lastName,
                picturePath,
                occupation,
                location
            };
        })
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

/* UPDATE USER */

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if(user.friends.includes(friendId)){
            await user.updateOne({ $pull: { friends: friendId } });
            await friend.updateOne({ $pull: { friends: id } });
        }else{
            await user.updateOne({ $push: { friends: friendId } });
            await friend.updateOne({ $push: { friends: id } });
        }

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(({
            _id,
            firstName,
            lastName,
            picturePath,
            occupation,
            location
        }) => {
            return {
                _id,
                firstName,
                lastName,
                picturePath,
                occupation,
                location
            };
        })
        res.status(201).json(formattedFriends);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }}