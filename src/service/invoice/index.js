const Invoice = require("../../model/Invoice");
const moment = require('moment');

class InvoiceService {

    static InvoiceStatus = {
        outstanding: 'Outstanding',
        late: 'Late',
        payed: 'Payed'
    }

    static Keys = {
        hours: 'hours',
        rate: 'rate',
        expenses: 'expenses',
        labor: 'labor',

        total_amount: 'total_amount',

        notes: 'notes',
        payment_mode: 'payment_mode',
        payment_destination: 'payment_destination',
        due: 'due',
        status: 'status',
        recipient_email: 'recipient_email',
        due_alert_sent: 'due_alert_sent'
    }

    static viewAll = async () => {
        const invoices = await Invoice.find();
        return invoices;
    }

    static create = async (params) => {
        console.log('saving invoice');
        const invoice = Invoice.build(params);
        await invoice.save();
        return invoice;
    }

    static update = async (invoiceId, newStatus) => {
        const invoice = await Invoice.findById(invoiceId);

        if (!invoice) throw new Error('Invoice not found');
        invoice.status = newStatus;

        await invoice.save();
        return invoice;
    }

    getOverDueInvoices = async () => {
        const currentUnixValue = moment().unix();
        const invoices = await Invoice.find({due: {$lt: currentUnixValue} , due_alert_send: false});
        return invoices;
    }

    updateDueAlert = async (invoices) => {
        for(let i=0; i<invoices.length; i++) {
            invoices[i].due_alert_sent = true;
            await invoices[i].save();
        }

        return invoices;
    }
}

module.exports = InvoiceService;
