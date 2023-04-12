import express from 'express'
import quoteCtrl from '../controllers/quote.controller.js'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router();

router.route('api/quotes')
    .post(quoteCtrl.create)

router.route('/api/quotes/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.findQuotes)

router.route('/api/quotes/:quoteId')
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, quoteCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('quoteId', quoteCtrl.quoteByID)

