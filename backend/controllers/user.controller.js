import User from '../models/user.model.js';
import lodash from 'lodash';
import errorHandler from '../error-handling/dbErrorHandler.js';

const create = async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try{
        var users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const userByID = async (req, res, next, id) => {
    try {
        var user = await User.findById(id)
        if (!user) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user
        next()
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve user"
        })
    }
}

const read = async (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = async (req, res) => {
    try {
        var user = req.profile
        user = lodash.extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        var user = req.profile
        var deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default {
    create,
    userByID,
    read,
    list,
    update,
    remove
}