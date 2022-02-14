# Creator
- Vikas Surera
- IIT Kharagpur
# Planning
Image Link: https://www.figma.com/file/joTcNg3vlOVQ0jLc2rKui8/Invoice-api
![alt text](./Invoice%20api.png)

## Features in the project
### 1. Create Invoices
Create an invoice using the post request
```
POST http://localhost:3000/invoice/
```
Body
```
{
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
    "recipient_email": "vikassurera@gmail.com"
}
```
Response
```
{
    "hours": 5,
    "rate": 5,
    "expenses": 5,
    "labor": 5,
    "total_amount": 5,
    "notes": "notes",
    "payment_mode": "mode",
    "payment_destination": "dest",
    "due": 1644774133,
    "status": "pending",
    "recipient_email": "gandu@gmail.com",
    "_id": "62094550190015de04177ba6",
    "__v": 0
}
```
### 2. Update Invoice Status
Update an invoice status
#### Valid Invoice Status
- Outstanding
- Payed
- Pending
Provide invoiceId
```
PUT http://localhost:3000/invoice/:id/
```
Body
```
{
    status: 'Payed'
}
```
Response
```
{
    "_id": "62094550190015de04177ba6",
    "hours": 5,
    "rate": 5,
    "expenses": 5,
    "labor": 5,
    "total_amount": 5,
    "notes": "notes",
    "payment_mode": "mode",
    "payment_destination": "dest",
    "due": 1644774133,
    "status": "payed",
    "recipient_email": "gandu@gmail.com",
    "__v": 0
}
```
### 3. View Invoices
View all invoices in the database
```
GET http://localhost:3000/invoice/
```
Response
```
[
    {
        "_id": "62094550190015de04177ba6",
        "hours": 5,
        "rate": 5,
        "expenses": 5,
        "labor": 5,
        "total_amount": 5,
        "notes": "notes",
        "payment_mode": "mode",
        "payment_destination": "dest",
        "due": 1644774133,
        "status": "payed",
        "recipient_email": "gandu@gmail.com",
        "__v": 0
    }
]
```
### 4. Send Emails
Send email to the recipient of the invoice on invoice creation and update.
### 5. Unit Testing
Automated tests for each api end points.
```
jest tests
```
### 6. OverDue Invoice Alerts
Automated email alerts for Overdue Invoices. Checks if the invoices are overdue every minute and sends alert emails to overdue invoices (unsent previously).
```
node-cron jobs
```

### 7. Data validation
All data is validated to counter the user error while posting and updating the api requests

# Installation
Install all dependencies
```
run npm i
```

### Dependencies
```
body-parser
express
express-validator
jest
moment
mongoose
node-cron
nodemailer
```

# Scripts
Run the server
```
npm run start
```
Run the tests
```
npm run test
```
Run the job
```
npm run job
```
