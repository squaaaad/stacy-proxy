const express = require('express')
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

// see: https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf
const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
}

app.get('/restaurants/:id', function(req, res){
  let components = renderComponents(services, {itemid: req.params.id});
  res.end(Layout(
    'SDC Demo',
    App(...components),
    Scripts(Object.keys(services))
  ));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});



/*
app.get('/', (req, res) => {
  res.redirect('/restaurants/1/');
});

app.use('/restaurants/:id', express.static(path.join(__dirname, 'public')));

// app.get('/api/restaurants/:id/gallery', (req, res) => {
//   res.redirect(`http://13.57.148.57/api/restaurants/${req.params.id}/gallery`)
// });
app.get('/api/restaurants/:id/overview', (req, res) => {
  // res.redirect(`http://13.57.37.239:3002/api/restaurants/${req.params.id}/overview`)
  res.redirect(`http://load-balancer-131821345.us-west-1.elb.amazonaws.com/api/restaurants/${req.params.id}/overview`)
});
// app.get('/api/restaurants/:id/sidebar', (req, res) => {
//   res.redirect(`http://54.177.233.239/api/restaurants/${req.params.id}/sidebar`)
// });
// app.get('/api/restaurants/:id/recommendations', (req, res) => {
//   res.redirect(`http://52.89.102.101/api/restaurants/${req.params.id}/recommendations`)
// });
// app.get('/api/restaurants/:id/reviews', (req, res) => {
//   res.redirect(`http://54.153.115.227/api/restaurants/${req.params.id}/reviews`)
// });

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});
*/