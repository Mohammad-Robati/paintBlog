var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    path     = require('path'),
    fileUpload = require('express-fileupload'),
    seedDB = require('./seed'),
    middlewares = require('./middlewares/index'),
    methodOverride = require('method-override');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(session({secret: "Your secret key"}));
app.use(methodOverride('_method'));

var indexRouter = require('./routes/index/index');
var dashboardRouter = require('./routes/dashboard/dashboard');
var adminRouter = require('./routes/admin/admin');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

seedDB();

app.use('/dashboard',middlewares.isAuthenticated ,dashboardRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter);



/*app.listen(process.env.PORT,process.env.IP,function () {
    console.log("Server Started");
});*/

app.listen(3000);
