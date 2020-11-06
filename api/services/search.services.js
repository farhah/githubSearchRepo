import UserModel from '../models/UserModel'
import userController from '../controllers/user.controller'
import QueryModel from '../models/QueryModel'
import userService from '../services/user.services'
import mongoose from 'mongoose'


exports.saveSearchQuery = (userId, query, language, topic, url, page, itemsPerPage, result) => {
    userService.getUser(userId)
    .then(result => saveQuery(result))
    .catch(e => {throw e})

    const saveQuery = (user) => {
        const savedQuery = new QueryModel({ query: query, url: url, language: language, topic: topic, result: result, user: user._id, page: page, itemsPerPage: itemsPerPage})
        savedQuery.save( (err, cratedQuery) => {
            if (err){ throw new Error(`Error while saving search query => ${err}`)}
            return cratedQuery
        })
    }
}

exports.getSearchHistories = (userId, page, itemsPerPage) => {
    return new Promise( (resolve, reject) => {
        QueryModel.find({user: userId}).lean()
        .sort( '-createdAt' )
        .skip(page * itemsPerPage)
        .limit(itemsPerPage)
        .exec((err, result) => {
            if (err) { reject(`Error while searching for queries => ${err}`)}
            QueryModel.countDocuments(result).exec( (count_error, count) => {
                if (err){ reject(count_error)}
                const mod = { total_count: count, history: result}
                return resolve(mod)
            })
        })

        }
    )}
    