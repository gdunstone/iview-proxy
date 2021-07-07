var express = require('express');

const { createProxyMiddleware } = require('http-proxy-middleware');

var path = require('path');
var routes = require('./routes');

var app = express();

app.set('port', process.env.PORT || 1984);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(routes);
app.use(express.static(__dirname + '/static/'));


app.use('/iviewapi', createProxyMiddleware({
    logLevel: 'debug', 
    target: 'https://api.iview.abc.net.au', 
    changeOrigin: true ,
    pathRewrite: {'^/iviewapi' : ''}
}));


app.use('/iviewbase', createProxyMiddleware({ 
    logLevel: 'debug',
    target: 'https://iview.abc.net.au', 
    changeOrigin: true ,
    pathRewrite: {'^/iviewbase' : ''}
}));

app.listen(app.get('port'), function() {
    console.log('iview-proxy started on port ' + app.get('port'));
});