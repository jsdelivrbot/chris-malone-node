const express = require('express')
const session = require('express-session')
const path = require('path')
// const { Pool, Client } = require('pg')
// const connectString = 'postgresql://PGPASSWORD=efe03326103c047d7cb6980a2f007957273f1f660c126e498619e4429a49b72f@ec2-23-23-110-26.compute-1.amazonaws.com:5432/d2n47671k9ffee'
// const pool = new Pool({
//   connectString: connectString,
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// const client = new Client({
//   connectString: connectString,
// })
// //client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end();
// })

const Pool = require('pg').Pool;

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  })

const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))

  .use(bodyParser.json())

  .use(bodyParser.urlencoded({
    extended: true
  }))

  .use(session({
    secret: 'superSecret'
  }))

  .set('views', path.join(__dirname, 'views'))

  .set('view engine', 'ejs')

  ///////////////////////////////////////////////////////////////////

  .get('/', (req, res) => res.render('pages/index'))

  .get('/readingguide', function(req, res) {
    if (!req.session.loggedIn) {
      req.session.loggedIn = false;
      req.session.username = "";
    }

    var currentUser = req.session.username;

    res.render('pages/bomguide/home', {user: currentUser})
  })
  

  .get('/postage', (req, res) => res.render('pages/postage'))

  .get('/postageTotal', function(req, res){
  	var weight = req.param('weight');
  	var ptype = req.param('ptype');

  	var total = 0;

  	switch(ptype) {
  		case "Letters (Stamped)":
  			if (weight <= 1)
  				total = .50;
  			if (weight > 1 && weight <= 2)
  				total = .71;
  			if (weight > 2 && weight <= 3)
  				total = .92;
  			if (weight >= 3.5)
  				total = 1.13;
  			break;
  		case "Letters (Metered)":
  			if (weight <= 1)
  				total = .47;
  			if (weight > 1 && weight <= 2)
  				total = .68;
  			if (weight > 2 && weight <= 3)
  				total = .89;
  			if (weight >= 3.5)
  				total = 1.10;
  			break;
  		case "Large Envelopes (Flats)":
  			if (weight <= 1)
  				total = 1.00;
  			if (weight > 1 && weight <= 2)
  				total = 1.21;
  			if (weight > 2 && weight <= 3)
  				total = 1.42;
  			if (weight > 3 && weight <= 4)
  				total = 1.63;
  			if (weight > 4 && weight <= 5)
  				total = 1.84;
  			if (weight > 5 && weight <= 6)
  				total = 2.05;
  			if (weight > 6 && weight <= 7)
  				total = 2.26;
  			if (weight > 7 && weight <= 8)
  				total = 2.47;
  			if (weight > 8 && weight <= 9)
  				total = 2.68;
  			if (weight > 9 && weight <= 10)
  				total = 2.89;
  			if (weight > 10 && weight <= 11)
  				total = 3.10;
  			if (weight > 11 && weight <= 12)
  				total = 3.31;
  			if (weight >= 13)
  				total = 3.52;
  			break;
  		case "First-Class Package Service - Retail":
  			if (weight <= 1)
  				total = 3.50;
  			if (weight > 1 && weight <= 2)
  				total = 3.50;
  			if (weight > 2 && weight <= 3)
  				total = 3.50;
  			if (weight > 3 && weight <= 4)
  				total = 3.50;
  			if (weight > 4 && weight <= 5)
  				total = 3.75;
  			if (weight > 5 && weight <= 6)
  				total = 3.75;
  			if (weight > 6 && weight <= 7)
  				total = 3.75;
  			if (weight > 7 && weight <= 8)
  				total = 3.75;
  			if (weight > 8 && weight <= 9)
  				total = 4.10;
  			if (weight > 9 && weight <= 10)
  				total = 4.45;
  			if (weight > 10 && weight <= 11)
  				total = 4.80;
  			if (weight > 11 && weight <= 12)
  				total = 5.15;
  			if (weight >= 13)
  				total = 5.50;
  			break;
  	}

  	res.render("pages/postageTotal", {totalCost: total, weight: weight, ptype: ptype});
  })

  .post('/createUser', function(req, res) {
    var username = req.body.usernameReg;
    var password = req.body.passwordReg;
    var hashedPassword = bcrypt.hashSync(password, 8);
    db.query('INSERT INTO users (username, password) VALUES ($username, $hashedPassword)')
    res.send(username + hashedPassword);
  })
 
  
  .listen(PORT, '0.0.0.0', () => console.log(`Listening on ${ PORT }`))
