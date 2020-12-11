const express = require('express');
const app = express();
const morgan = require('morgan');


app.set('port',3000);

app.use(morgan('dev'));
app.use(express.json());


//routers

app.use(require('./routes/mascotas'));

app.listen(app.get('port'), ()=> {
console.log('server on port $(3000) ');
});