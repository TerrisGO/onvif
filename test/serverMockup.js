// Generated by CoffeeScript 1.7.1
(function() {
  var Buffer, fs, http, listener, reBody, reCommand;

  http = require('http');

  fs = require('fs');

  Buffer = (require('buffer')).Buffer;

  reBody = /<s:Body xmlns:xsi="http:\/\/www.w3.org\/2001\/XMLSchema-instance" xmlns:xsd="http:\/\/www.w3.org\/2001\/XMLSchema">(.*)<\/s:Body>/;

  reCommand = /<(\S*) /;

  listener = function(req, res) {
    var buf;
    req.setEncoding('utf8');
    buf = [];
    req.on('data', function(chunk) {
      return buf.push(chunk);
    });
    return req.on('end', function() {
      var body, command, request;
      request = Buffer.concat(buf);
      body = reBody.exec(request)[1];
      if (!body) {
        return res.end();
      }
      command = reCommand.exec(body)[1];
      if (!command) {
        return res.end();
      }
      return fs.createReadStream(__dirname + '/serverMockup/' + command + '.xml').pipe(res);
    });
  };

  module.exports = http.createServer(listener).listen(10101);

}).call(this);

//# sourceMappingURL=serverMockup.map
