const winston = require('./config/winston');
const config = require('config');
const express = require('express');
const app = express();

require('./statup/router')(app);
require('./statup/db')();
require('./statup/logging')(app);

if (!config.get('jwtPrivateKey')){
    throw new Error('Private Key is not defined');
}


const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}`));