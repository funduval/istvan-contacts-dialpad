const express = require('express');
const fs = require('fs');

const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;



const apiRoutes = require('./routes/apiRoutes.js')(app, fs);
const htmlRoutes = require('./routes/htmlRoutes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', htmlRoutes);


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));