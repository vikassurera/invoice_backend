const supertest = require('supertest');
const request = supertest('http://localhost:3000');
const InvoiceService = require('../service/invoice');

describe('Invoices', () => {
    let invoiceId;

    test('View ALl Invoices',async () => {
        const response = await request
            .get('/invoice/')

        const data = response.body;
        expect(data).toBeDefined()

        const invoiceData = data;
        expect(Array.isArray(invoiceData)).toBe(true);
    });

    test('Create an Invoice',async () => {
        const body = {
            "hours": 5,
            "rate": 5,
            "expenses": 5,
            "labor": 5,
            "total_amount":5,
            "notes": "notes",
            "payment_mode": "mode",
            "payment_destination": "dest",
            "due": 1644774133,
            "status": "Outstanding",
            "recipient_email": "test@gmail.com"
        }

        const response = await request.post('/invoice/')
            .send(body);

        const data = response.body;
        expect(data).toBeDefined()

        const invoiceData = data;
        expect(invoiceData).toBeDefined();
        invoiceId = invoiceData._id;
    })

    test('Update an Invoice',async () => {
        const body = {
            status: InvoiceService.InvoiceStatus.payed
        }

        const response = await request.put(`/invoice/${invoiceId}`)
            .send(body);

        const data = response.body;
        expect(data).toBeDefined()

        const invoiceData = data;
        expect(invoiceData).toBeDefined();
    })

});
