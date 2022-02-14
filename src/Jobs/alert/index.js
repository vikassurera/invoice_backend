const cron = require('node-cron');
const InvoiceService = require('../../service/invoice');
const MongoDb = require('../../Util/mongodb');
const MailUtil = require('../../Util/mailer');

cron.schedule('* * * * *', async () => {
   try{
       const service = new InvoiceService();
       const invoices = await service.getOverDueInvoices();

       console.log('unsent overdue invoices: ', invoices.length);

       const mailer = new MailUtil();
       for(let i=0; i<invoices.length; i++){
           await mailer.sendAlertMail(invoices[i]);
       }

       await service.updateDueAlert(invoices);
   }catch (error) {
       console.log(error);
   }
});
