const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;



const apiRoutes = require('./routes/apiRoutes.js')(app, fs);
const htmlRoutes = require('./routes/htmlRoutes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.static('images'));



app.use('/', htmlRoutes);
app.get('/api', function(req, res){
    res.json(data); 
});


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));