import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../config.js'

const signin = async (req, res) => {
    try {
        var user = await User.findOne({
            "email": req.body.email
        })

        if (!user) {
            return res.status(401).json({
                error: "User not found"
            })
        }

        if (!user.authenticate(req.body.password)) {
            return res.status(401).json({
                error: "Email and password don't match"
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, config.secret)

        res.cookie("t", token, {
            expire: new Date() + 9999
        })

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        return res.status(401).json({
            error: "Could not sign in"
        })
    }
}

const signout = async (req, res) => {
    res.clearCookie("t")
    return res.status(200).json({
        message: "Signed out"
    })
}

const requireSignin = expressJwt.expressjwt({
    secret: config.secret,
    userProperty: 'auth',
    algorithms: ['HS256']
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id

    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next()
}

export default {
    signin,
    signout,
    requireSignin,
    hasAuthorization
}