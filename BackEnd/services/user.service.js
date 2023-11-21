import User from '../models/user.model.js';

export const getUserByQuery = async (query) => {
    try {
        return await User.find(query);
    } catch (e) {
        throw e;
    }
}