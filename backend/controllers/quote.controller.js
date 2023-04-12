import Quote from '../models/quote.model.js';
import lodash from 'lodash';
import errorHandler from '../error-handling/dbErrorHandler.js';

const create = async (req, res) => {
    const quote = new Quote(req.body)

    try {
        await quote.save()
        return res.status(200).json({
            message: "Successfully saved quote!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const update = async (req, res) => {
    try {
        var quote = req.profile
        quote = lodash.extend(quote, req.body)
        quote.updated = Date.now()
        await quote.save()
        res.json(quote)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        var quote = req.profile
        var deletedQuote = await quote.remove()
        res.json(deletedQuote)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const findQuotes = async (req, res) => {
    try {
        var email = req.body.email
        var quotes = await Quote.find({user: email})
        res.json(quotes)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const quoteByID = async (req, res, next, id) => {
    try {
        var quote = await Quote.findById(id)
        if (!quote) {
            return res.status(400).json({
                error: "Quote not found"
            })
        }
        req.profile = quote
        next()
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve the quote"
        })
    }
}

export default {
    create,
    update,
    remove,
    findQuotes,
    quoteByID
}