const express = require('express');
const InvoiceController = require("../../controller/invoice");
const expressValidator = require('express-validator');
const check = expressValidator.check;
const InvoiceService = require("../../service/invoice");

const invoiceRouter = express.Router();
const controller = new InvoiceController();

invoiceRouter.get('/', controller.viewAll);

invoiceRouter.post('/', controller.validateCreateData(), controller.create);

invoiceRouter.put('/:id', [
    check(InvoiceService.Keys.status, 'Please include a status field').isAlphanumeric()
], controller.update)

module.exports = invoiceRouter;
