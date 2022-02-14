const mongoose =require( 'mongoose');
const InvoiceService =require( "../../service/invoice");

const invoiceSchema = new mongoose.Schema({
   hours: {
       type: Number,
       required: true
   },
    rate:{
       type:Number,
        required: true
    },
    expenses:{
        type:Number,
        required: true
    },
    labor:{
        type:Number,
        required: true
    },

    total_amount: {
        type:Number,
        required: true
    },

    notes:{
        type:String,
        required: true
    },
    payment_mode:{
        type:String,
        required: true
    },
    payment_destination:{
        type:String,
        required: true
    },
    due:{
        type:Number,
        required: true
    },
    status:{
        type:String,
        required: true,
    },
    recipient_email:{
        type:String,
        required: true
    },
    due_alert_sent:{
       type:Boolean,
        default: false,
    }
})

invoiceSchema.statics.build = (attr) => {
    return new Invoice(attr);
}

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);

module.exports =  Invoice;
