import UserModel from '../models/UserModel'

exports.createUser = (userName, userId) => {
    return new Promise( (resolve, reject) => {
        console.log(userName, userId)
        if (!userName) { return reject(`Error while creating user => userName is undefined`) }
        if (!userId) { return reject(`Error while creating user => userId is undefined`) }

        const user = {
            userName: userName,
            _id: userId
        }

        UserModel.findOneAndUpdate({
            _id: userId,
        }, user, { upsert: true }, (err, result) => {
            if (err){ return reject(`Error while creating user => ${err}`)}
            return resolve(result)
        });
    })
};

exports.getUser = (userId) => {
    return new Promise( (resolve, reject) => {
        if (!userId) { return reject(`Error while searching user => userId is undefined`) }

        UserModel.findOne({_id: userId}, (err, result) => {
            if (err) { return reject(`Error while searching a user ${userId} => ${err}`)}
            return resolve(result)
        })

    })
}