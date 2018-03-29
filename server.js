const express = require('express')
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');

app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/restaurants/1/');
});

app.use('/restaurants/:id', express.static(path.join(__dirname, 'public')));

app.get('/api/restaurants/:id/gallery', (req, res) => {
  res.redirect(`http://13.56.14.51:3001/api/restaurants/${req.params.id}/gallery`)
});
app.get('/api/restaurants/:id/overview', (req, res) => {
  res.redirect(`http://load-balancer-131821345.us-west-1.elb.amazonaws.com/api/restaurants/${req.params.id}/overview`)
});
app.get('/api/restaurants/:id/sidebar', (req, res) => {
  res.redirect(`http://54.241.52.144/api/restaurants/${req.params.id}/sidebar`)
});
app.get('/api/restaurants/:id/reviews', (req, res) => {
  res.redirect(`http://18.188.156.194:3001/api/restaurants/${req.params.id}/reviews`)
});
app.get('/api/restaurants/:id/recommendations', (req, res) => {
  res.redirect(`http://sdc-loader-1447561723.us-west-1.elb.amazonaws.com/api/restaurants/${req.params.id}/recommendations`)
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});
