var bodyParser = require('body-parser');
var express = require('express');

var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', function(request,response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.post('/mail', function(request, response) {
  
  var body =  "Your ROI IS AMAAAAZING OMG and it is " + request.body.roi + "%!\n";
  body += "Your contract cost for the year would be " + request.body.contractCost + ".\n";
  body += "Your estimated incentive budget is " + request.body.estIncentiveBudget + ".\n";
  body += "Your revenue would be " + request.body.revenue + ".\n";
  body += "Your community members would number " + request.body.communityMembers + ".\n";
  body += "Your total social posts generated would number " + request.body.totalSocialPosts + ".\n";
  body += "Your total number of engagements would be " + request.body.totalEngagements + ".\n";
  body += "Your total number of conversions will be " + request.body.conversions + ".\n";


  var email = {
    from: "MAVRCK <mavrck@mavrck.co>",
    to: "chdastolfo@gmail.com",
    subject: "You are looking great today. Here's your ROI",
    text: data
  };

  mailgun.messages().send(email, function(error, body) {
    console.log(error.sendStatus);
    console.log(body);
    response.sendStatus(200);
  });


});

app.listen(8080);