const { Schema,model } = require("mongoose");

const TransactionSchema =new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    datetime:{
        type:Date,
        require: true
    }
})

const TransactionModel = model('transaction', TransactionSchema) 

module.exports = TransactionModel