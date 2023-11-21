import { getUserByQuery } from '../services/user.service.js';

export const getUser = async (req, res) => {
    try {
        const { email } = req.body;
        const users = await getUserByQuery({ 'email': email });
        res.json(users[0])
    } catch (e) {
        console.log(e);
        res.status(404).send(`Apologies, we were not able to find this user.`);
    }
}