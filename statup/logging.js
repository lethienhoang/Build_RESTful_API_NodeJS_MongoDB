const winston = require('../config/winston');
const morgan = require('morgan');

module.exports = function(app) {
    
app.use(morgan('combined', { stream: winston.stream }));

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
    // render the error page
    res.status(err.status || 500);
    // render error html here
    res.render('error');
});

}