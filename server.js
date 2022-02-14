const express = require('express');
const bodyParser = require('body-parser');

// route imports
const InvoiceRouter = require( './src/routes/invoice');
const MongoDb = require('./src/Util/mongodb');

const TAG = '[server]';

const app = express();
app.use(bodyParser.json());

// Custom Routes
app.use('/invoice', InvoiceRouter);

// The 404 Route (Always keep as the last route)
app.get('*', (req, res) => {
    res.status(500)
        .json({
            status: 500,
            error: 'invalid route',
            message: 'this route is not configured',
        });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(TAG, `server is listening on port ${PORT}`);
})
