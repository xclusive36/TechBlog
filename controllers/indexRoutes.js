const router = require('express').Router();
const path = require('path');

router.get('/dashboard', function (req, res) {
  // get dshboard path from client side and send dashboard.html
  res.sendFile(path.join(__dirname, '../public/dashboard.html')); // send dashboard.html to client
});

router.get('/login', function (req, res) {
  // get dshboard path from client side and send dashboard.html
  res.sendFile(path.join(__dirname, '../public/login.html')); // send dashboard.html to client
});

router.get('/logout', function (req, res) {
  // get dshboard path from client side and send dashboard.html
  res.sendFile(path.join(__dirname, '../public/logout.html')); // send dashboard.html to client
});

router.get('*', function (req, res) {
  // get all other paths from client side and send index.html
  res.sendFile(path.join(__dirname, '../public/index.html')); // send index.html to client
});

module.exports = router;