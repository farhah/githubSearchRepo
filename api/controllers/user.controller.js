import userService from '../services/user.services'

exports.saveUser = (userName, userId) => {
    try{
        return userService.createUser(userName, userId)
    }
    catch (e) {
        throw new Error(e)
    }
    
}

exports.getUser = async (userId) => {
    try{
        return await userService.getUser(userId)
        
    }
    catch (e){
        throw new Error(e)
    }
}