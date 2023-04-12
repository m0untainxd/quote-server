import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name of quote is required'
    },
    total: {
        type: mongoose.Types.Decimal128,
        required: 'Total price is required'
    },
    people: [{
            name: {
                type: String,
                required: "Name of person required"
            },
            cost: {
                type: mongoose.Types.Decimal128,
                required: "Cost of person required"
            }
    }],
    resources: [{
        name: {
            type: String,
            required: "Name of physical resource required"
        },
        res_type: {
            type: String,
            required: "Type of cost for physical resource required"
        },
        number: Number,
        cost: {
            type: mongoose.Types.Decimal128,
            required: "Cost of physical resource required"
        }
    }],
    user: {
        type: String,
        required: "User email required"
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now()
    }
})