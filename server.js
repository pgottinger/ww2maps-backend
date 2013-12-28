var restify = require('restify');

function respond(req, res, next) {
  var body={'Easy': {'name':'Easy Company','co':'Dick Winters','lat':49.4596, 'lng':6.8147},'Fox': {'name':'Fox Company','co':'Another','lat':49.4596, 'lng':6.8347}};
  
  res.status(200);
  res.contentType="json";
  res.send(body);
  return next();
}

var server = restify.createServer();
server.get('/ww2maps/:date/:minlat/:maxlat/:minlng/:maxlng', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

