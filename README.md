#Creator
- Vikas Surera
- IIT Kharagpur
#Planning
![alt text](./Invoice%20api.png)

##Features in the project
### 1. Create Invoices
Create an invoice using the post request
```
POST http://localhost:3000/invoice/
```
### 2. Update Invoice Status
Update an invoice status as 'OutStanding', 'Payed' or 'Pending'
```
PUT http://localhost:3000/invoice/
```
### 3. View Invoices
View all invoices in the database
```
GET http://localhost:3000/invoice/
```
### 4. Send Emails
Send email to the recipient of the invoice on invoice creation and update.
### 5. Unit Testing
Automated tests for each api end points.
```
jest tests
```
### 6. OverDue Invoice Alerts
Automated email alerts for Overdue Invoices
```
node-cron jobs
```

### 7. Data validation
All data is validated to counter the user error while posting and updating the api requests

#Installation
Install all dependencies
```
run npm i
```

###Dependencies
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

#Scripts
Run the server
```
npm run start
```
Run the tests
```
npm run job
```
Run the job
```
npm run job
```
