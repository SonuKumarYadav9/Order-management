const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    customerId: 
    { type: ObjectId, required: true, ref: 'User' },
    name: 
    {type:String,required:true},
    totalPrice: 
    { type: Number, required: true },
    discount:
    { type: Number}
    
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)