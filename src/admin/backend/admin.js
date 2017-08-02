var express = 		require('express');
var low = 				require('lowdb');
var cors = 				require('cors');
var multer = 			require('multer');
var services = 		require('./services');
var argsv = 			require('yargs').default('port', 3101).argv;
var passport = 		require('passport');
var BasicStrategy = require('./passport-basic-extended').BasicExtendedStrategy;
var db = 					require('./db');
var forceAuth = 	passport.authenticate('basic', { session: false });
var path = 				require('path');
var crypto = 			require('crypto');
var fs = 					require('fs');


// Configure the local strategy for use by Passport.
passport.use(new BasicStrategy(
	function (username, password, cb) {
		db.users.findByUsername(username, function (err, user) {
			if (err) { return cb(err); }
			if (!user) { return cb(null, false); }
			if (user.password !== crypto.createHash('md5').update(password).digest('hex')) {
				return cb(null, false);
			}
			return cb(null, user);
		});
	}));

// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
	db.users.findById(id, function (err, user) {
		if (err) { return cb(err); }
		cb(null, user);
	});
});

var upload = multer();
var app = express();

app.use(cors());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/login', forceAuth, function (req, res) {
	res.send(req.user);
});

app.get('/api/configs/:id', forceAuth, function (req, res) {
	res.type('application/json');
	var api = services.getApiById(parseInt(req.params.id));
	res.send(api);
});

app.get('/api/configs', forceAuth, function (req, res) {
	var configs = services.getAllApis();
	res.type('application/json');
	res.send(configs);
});

app.post('/api/configs', forceAuth, function (req, res) {
	var api = services.createApi(req.body);
	res.send(api);
});

app.put('/api/configs', forceAuth, function (req, res) {
	var api = services.updateApi(req.body);
	res.send(api);
});

app.delete('/api/configs/:id', forceAuth, function (req, res) {
	services.deleteApiById(parseInt(req.params.id));
	res.send(200);
});

app.get('/export', forceAuth, (req, res) => {
	res.download('./restconf.json');
});

app.post('/import', forceAuth, upload.single('importfile'), (req, res) => {
	if (req.file.mimetype != 'application/json') {
		res.status(500);
		res.send('File type is not acceptable!');
		return;
	}
	fs.writeFile('./resressd.json', req.file.buffer.toString(), function (err) {
		if (err) {
			res.status(500);
			res.send(err.message);
			return;
		}
		res.send('OK');
	});
});

app.listen(argsv.port, function () {
	console.log(`Admin rest api provider app listening on port ${argsv.port}!`);
});


