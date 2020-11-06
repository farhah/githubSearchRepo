import express from 'express'
import axios from 'axios'
import userController from '../controllers/user.controller'

const router = express.Router();
let token = null;

router.get('/login', (req, res) => {
    const stateValue = Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
    req.session.stateValue = stateValue;
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&state=${stateValue}`);
}
);

router.get('/oauth-callback', (req, res) => {
    const stateFromServer = req.query.state;

    if(stateFromServer !== req.session.stateValue){
        res.redirect(302, '/'); // state doesn't match
        return;
    }

    const body = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        redirect_uri: process.env.REDIRECT_URI,
        state: stateFromServer
    };
    const opts = { headers: { accept: 'application/json' } };

    axios.post(`https://github.com/login/oauth/access_token`, body, opts).
    then(result => {
        token = result.data.access_token;
        req.session.token = token;
        console.log(token);
        res.redirect(process.env.FRONTEND_URI);
    }).
    catch(err => res.status(500).send({ error: err.message }));
});

router.get('/user', (req, res) => {
    const token = req.session.token;

    if(!token){
        return res.status(401).send({ error: 'Not authenticated' })
    }

    const opts = { headers: { 
        accept: 'application/json',
        Authorization: `token ${token}`
    } };

    const getUser = async () => {
        try{
            const response = await axios.get('https://api.github.com/user', opts)
            const user = response.data
            const saveUser = await userController.saveUser(user.login, user.id)
            req.session.userName = saveUser.userName;
            req.session.userId = saveUser._id
            return res.status(200).send({ userId: saveUser._id, userName: saveUser.userName})
        }
        catch (e){
            return res.status(500).send({error: err.message });
        }
    }

    getUser()
    
});

router.get('/logout', (req, res) => {
    req.session = undefined
    res.redirect(process.env.FRONTEND_URI)
})

export default router;