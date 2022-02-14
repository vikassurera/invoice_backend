const InvoiceService =require( "../../service/invoice");
const InvoiceStatus = InvoiceService.InvoiceStatus;
const expressValidator = require('express-validator');
const { check, validationResult } = expressValidator;
const MailUtil = require('../../Util/mailer');

module.exports =  class InvoiceController {
    viewAll = async (req, res) => {
        try {
            const invoices = await InvoiceService.viewAll();
            return res.status(200).send(invoices);

        } catch (error) {
            let message;

            if (error instanceof Error) {
                message = error.message;
            } else {
                message = 'Server Error';
            }
            res.status(400).send({
                errors: [message],
            })
        }
    }

    validateCreateData = () => {
        console.log('validating data');
        return [
            check(InvoiceService.Keys.hours,'Please include a valid hours field').isNumeric(),
            check(InvoiceService.Keys.rate,'Please include a valid rate field').isNumeric(),
            check(InvoiceService.Keys.expenses,'Please include a expenses field').isNumeric(),
            check(InvoiceService.Keys.labor,'Please include a valid labor field').isNumeric(),

            check(InvoiceService.Keys.total_amount,'Please include a total amount field').isNumeric(),

            check(InvoiceService.Keys.notes,'Please include a notes field').isAlphanumeric(),
            check(InvoiceService.Keys.payment_mode,'Please include a payment mode field').isAlphanumeric(),
            check(InvoiceService.Keys.payment_destination,'Please include a payment destination field').isAlphanumeric(),

            check(InvoiceService.Keys.due,'Please include a due field').isNumeric(),

            check(InvoiceService.Keys.status,'Please include a status field').isAlphanumeric(),
            check(InvoiceService.Keys.recipient_email,'Please include a recipient email field').isEmail(),
        ]
    }

    create = async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {hours, rate, expenses, labor, total_amount,notes,payment_mode,payment_destination,due,status,recipient_email} = req.body;

        try {
            if(status !==InvoiceStatus.outstanding && status !== InvoiceStatus.late && status!==InvoiceStatus.payed){
                return res.status(400).json({errors:['Provice a valid status']});
            }

            const params = {
               hours,
                rate,
                expenses,
                labor,
                total_amount,
                notes,
                payment_mode,
                payment_destination,
                due,
                status,
                recipient_email
            }

            const invoice = await InvoiceService.create(params);

            // Send email
            await (new MailUtil()).sendInvoiceMail(invoice);
            return res.status(201).json(invoice);

        } catch (error) {
            console.log(error);
            let message;

            if (error instanceof Error) {
                message = error.message;
            } else {
                message = 'Server Error';
            }
            res.status(400).json({
                errors: [message],
            })
        }
    }

    update = async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {status} = req.body;
        const invoiceId = req.params.id;

        try {
            if(status !==InvoiceStatus.outstanding && status !== InvoiceStatus.late && status!==InvoiceStatus.payed){
                throw new Error('Provide a valid status');
            }

            const invoice = await InvoiceService.update(invoiceId,status);

            // Send email
            await (new MailUtil()).sendInvoiceMail(invoice);
            return res.status(201).send(invoice);

        } catch (error) {
            let message;

            if (error instanceof Error) {
                message = error.message;
            } else {
                message = 'Server Error';
            }
            res.status(400).send({
                errors: [message],
            })
        }
    }

}
