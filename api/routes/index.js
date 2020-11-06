import express from 'express';
import authRoutes from './auth'
import axios from 'axios'
import searchController from '../controllers/search.controller'

const router = express.Router();

router.use("/auth", authRoutes);

router.get('/search', (req, res) => {
    if(!req.session.userId){
        return res.status(401).json({ message: 'Not authenticated' })
    }
    console.log(req.query)

    let query = req.query.query ? req.query.query : '';
    let language = req.query.language ? req.query.language : '';
    let topic = req.query.topic ? req.query.topic : '';
    let page = req.query.page ? req.query.page : 1;
    let itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 1;

    query = query.replace(/\s+/g, '+');
    topic = topic.replace(/\s+/g, '+');

    console.log(query, language, topic);

    const opts = { headers: { 
        accept: 'application/json, application/vnd.github.mercy-preview+json',
        Authorization: `token ${req.session.token}`
    } };

    const url = `https://api.github.com/search/repositories?q=${query}+language:${language}+topic:${topic}&sort=stars&order=desc&per_page=${itemsPerPage}&page=${page}`

    axios.get(url, opts)
    .then(result => {
        searchController.saveSearchQuery(req.session.userId, query, language, topic, url, page, itemsPerPage, result.data.items)
        return res.status(result.status).send(result.data);
    })
    .catch(err => { res.status(500).send({ error: err})});

})

router.get('/search/history', (req, res) => {
    if(!req.session.userId){
        return res.status(401).json({ message: 'Not authenticated' })
    }

    let page = req.query.page ? req.query.page : 1;
    let itemsPerPage = req.query.itemsPerPage ? req.query.itemsPerPage : 1;

    searchController.getSearchHistories(req.session.userId, page, itemsPerPage)
    .then(result => {
        return res.status(200).send(result);
    })
    .catch(err => { res.status(500).send({ error: err})});
    })


export default router;