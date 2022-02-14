const nodemailer = require("nodemailer");
const moment = require('moment');

class MailUtil {
    async _getMailConfig(){
        let mailConfig;
        if (process.env.NODE_ENV === 'production' ){
            mailConfig = {
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EAMIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            };
        } else {
            let testAccount = await nodemailer.createTestAccount();
            mailConfig = {
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            };
        }
        return mailConfig;
    }

    _getInvoiceMailBody(invoice){
        return `<div>
        <div>Hours: ${invoice.hours}</div>
        <div>Rate: ${invoice.rate}</div>
        <div>Expenses: ${invoice.expenses}</div>
        <div>Labor: ${invoice.labor}</div>
        <div>Total Amount: ${invoice.total_amount}</div>
        <div>Notes: ${invoice.notes}</div>
        <div>Payment Mode: ${invoice.payment_mode}</div>
        <div>Where to Pay: ${invoice.payment_destination}</div>
        <div>Due: ${moment(invoice.due,'X').format('LLL')}</div>
        <div>Status: ${invoice.status}</div>
        </div>`;
    }

    _getInvoiceAlertBody(invoice){
        const dueDAte = moment(invoice.due,'X').format('LLL');

        return `<div>
        <div>Your invoice is overdue</div>
        <div>Due Date: ${dueDAte}</div>
        </div>`;
    }

    async sendInvoiceMail(invoice) {

        const mailConfig = await this._getMailConfig();
        let transporter = nodemailer.createTransport(mailConfig);

        let info = await transporter.sendMail({
            from: '"Dummy" <dummy@example.com>',
            to: `${invoice.recipient_email}`,
            subject: "Invoice",
            text: "Invoice Data",
            html: this._getInvoiceMailBody(invoice),
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    async sendAlertMail(invoice) {
        const mailConfig = await this._getMailConfig();
        let transporter = nodemailer.createTransport(mailConfig);

        let info = await transporter.sendMail({
            from: '"Dummy" <dummy@example.com>',
            to: `${invoice.recipient_email}`,
            subject: "Invoice",
            text: "Invoice Data",
            html: this._getInvoiceAlertBody(invoice),
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}

module.exports = MailUtil;
