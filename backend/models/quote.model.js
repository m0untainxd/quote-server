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
            hours: {
                type: mongoose.Types.Decimal128,
                required: "number of hours required"
            }
    }],
    resources: [{
        name: {
            type: String,
            required: "Name of physical resource required"
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

export default QuoteSchema;