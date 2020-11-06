import mongoose from 'mongoose'

const QueryModel = mongoose.model(
    "Query",
    new mongoose.Schema({
        url: String,
        query: String,
        language: String,
        topic: String,
        result: Object, // json
        page: Number,
        itemsPerPage: Number,
        user: {
            type: String,
            ref: "User",
            required: true
        }
    }, { timestamps: true })
);

module.exports = QueryModel;