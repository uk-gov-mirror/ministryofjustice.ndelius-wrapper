const express = require('express')
const path = require('path')
const hbs = require('hbs')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const sassMiddleware = require('node-sass-middleware')

const index = require('./routes/index')
const search = require('./routes/search')
const featureSwitch = require('./routes/featureSwitch')
const sfpsr = require('./routes/sfpsr')
const sfpsrList = require('./routes/sfpsr_list')
const sfpsrUpdate = require('./routes/sfpsr_update')
const sfpsrDelete = require('./routes/sfpsr_delete')
const oralReport = require('./routes/oralReport')
const oralReportList = require('./routes/oralReport_list')
const oralReportUpdate = require('./routes/oralReport_update')
const oralReportDelete = require('./routes/oralReport_delete')
const paroleParom1Report = require('./routes/paroleParom1Report')
const paroleParom1ReportList = require('./routes/paroleParom1Report_list')
const paroleParom1ReportUpdate = require('./routes/paroleParom1Report_update')
const paroleParom1ReportDelete = require('./routes/paroleParom1Report_delete')
const documentList = require('./routes/document_list')
const pdf = require('./routes/pdf')
const viewPdf = require('./routes/view_pdf')
const legacySearch = require('./routes/legacy_search')
const addOffender = require('./routes/add_offender')
const addContact = require('./routes/add_contact')
const offenderAliases = require('./routes/offender_aliases')
const offenderAddresses = require('./routes/offender_addresses')
const offenderPersonalCircumstances = require('./routes/offender_personal_circumstances')
const offenderRegistrations = require('./routes/offender_registrations')
const transferInactiveOffender = require('./routes/transfer_inactive_offender')
const offenderEvent = require('./routes/offender_event')
const offenderDetails = require('./routes/offender_details')
const searchAnalytics = require('./routes/search_analytics')
const nationalSearchFeedback = require('./routes/national_search_feedback')
const sfpsrFeedback = require('./routes/sfpsr_feedback')
const healthcheck = require('./routes/healthcheck')
const analytics = require('./routes/analytics')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/search', search);
app.use('/featureSwitch', featureSwitch);
app.use('/sfpsr', sfpsr);
app.use('/sfpsr_list', sfpsrList);
app.use('/sfpsr_update', sfpsrUpdate);
app.use('/sfpsr_delete', sfpsrDelete);
app.use('/oralReport', oralReport);
app.use('/oralReport_list', oralReportList);
app.use('/oralReport_update', oralReportUpdate);
app.use('/oralReport_delete', oralReportDelete);
app.use('/paroleParom1Report', paroleParom1Report);
app.use('/paroleParom1Report_list', paroleParom1ReportList);
app.use('/paroleParom1Report_update', paroleParom1ReportUpdate);
app.use('/paroleParom1Report_delete', paroleParom1ReportDelete);
app.use('/document_list', documentList);
app.use('/pdf', pdf);
app.use('/view_pdf', viewPdf);
app.use('/legacy_search', legacySearch);
app.use('/add_offender', addOffender);
app.use('/add_contact', addContact);
app.use('/offender_aliases', offenderAliases);
app.use('/offender_addresses', offenderAddresses);
app.use('/offender_details', offenderDetails)
app.use('/offender_personal_circumstances', offenderPersonalCircumstances)
app.use('/offender_registrations', offenderRegistrations)
app.use('/offender_event', offenderEvent)
app.use('/transfer_inactive_offender', transferInactiveOffender)
app.use('/search_analytics', searchAnalytics)
app.use('/national_search_feedback', nationalSearchFeedback)
app.use('/sfpsr_feedback', sfpsrFeedback)
app.use('/healthcheck', healthcheck)
app.use('/analytics', analytics)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
