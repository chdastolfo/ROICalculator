//Loading underscore library to access the range method
var _ = $.getScript('./js/underscore.min.js');

//var requirejs = require('require.js');

// //node Mailer
// var nodemailer = require('nodemailer');
// var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

// var mailOptions = {
//     from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
//     to: $("#email").val(), // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world 🐴', // plaintext body
//     html: '<b>Hello world 🐴</b>' // html body
// };

// $('.mail').on('click', function sendMail() {

// 	transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });


// var callback = function(error, success){
//     if(error){
//         console.log('Error occured');
//         console.log(error.message);
//         return;
//     }
//     if(success){
//         console.log('Message sent successfully!');
//     }else{
//         console.log('Message failed, reschedule!');
//     }
// }

// console.log('Sending Mail')

// // Catch uncaught errors
// process.on('uncaughtException', function(e){
//     console.log('Uncaught Exception', e.stack);
// });

// // Send the e-mail
// var mail;
// try{
//     mail = nodemailer.send_mail(message, callback);
// }catch(e) {
//     console.log('Caught Exception',e);
// }

// var oldemit = mail.emit;
// mail.emit = function(){
//     console.log('Mail.emit', arguments);
//     oldemit.apply(mail, arguments);
// }
// });

// rate = document.getElemenById('industry').value
// var industryRate = new Array();
// 	industryRate["agency"] = 2.69;
// 	industryRate["beauty"] = 2.1;
// 	industryRate["cpg"] = 2.1;
// 	industryRate["entertainment"] = 2.87;
// 	industryRate["fashion"] = 2.53;
// 	industryRate["gaming"] = 3.45;
// 	industryRate["publication"] = 4.66;
// 	industryRate["qsr"] = 1.33;
// 	industryRate["retail"] = 2.53;
// 	industryRate["travel"] = 2.26;
// 	industryRate["other"] = 2.65;

//function clickThroughRate() {
//	document.getElementById('industryRate').value = ;
//	document.getElementById('industry')=;
//});

function monthlyPrice(activations){
	switch(activations) {
		case _.range(30000):
			monthlyPrice = 5000;
			break;
		case _.range(30001, 40000):
			monthlyPrice = 7500;
			break;
		case _.range(40001, 50000):
			monthlyPrice = 10000;
			break
		case _.range(50001, 60000):
			monthlyPrice = 12500;
			break;
		case _.range(60001, 75000):
			monthlyPrice = 13750;
			break;
		case _.range(75001, 80000):
			monthlyPrice = 10000;
			break;
		case _.range(80001, 90000):
			monthlyPrice = 11000;
			break;
		case _.range(90001, 95000):
			monthlyPrice = 12000;
			break;
		default:
			monthlyPrice = 5000;
			break;
	} return monthlyPrice;
};

$('.submit').on('click', function calculate() {	  
	var signupRate =  .35;
	var socialPostMultiplier = .30;
	var engagementRate = 3;
	var clickRate = 4;
	var conversionRate = $("#conversion_rate").val()/100;

	var signups = $("#audience_size").val() * $("#click_through").val()/100 * signupRate;

	var socialPosts = signups * socialPostMultiplier;
	var engagementOnPosts = socialPosts * engagementRate;
	var clicksOnPosts = clickRate * socialPosts;
	var conversions = clicksOnPosts * conversionRate;
	var activations = signups * .5;
	var engagements = engagementOnPosts * 2.33333; //Couldn't figure out how this was calculated on ROI spreadsheet. Engagements only goes into engagements on posts 2 1/3 times.
	
	var purchaseRevenue = $("#average_price").val() * conversions;

	var monthlyContractCost = monthlyPrice(activations);
	var monthlyIncentiveCost = socialPosts * 0.5;
	var monthlyRevenue = $("#average_price").val()*conversions;
						 
	var totalEngagements = engagements * 12;
	var monthlyConversions = conversions * 12;
	var communityMembers = signups * 12;
	var totalSocialPosts = socialPosts * 12;

	var contractCost = monthlyContractCost * 12;
	var estIncentiveBudget = monthlyIncentiveCost * 12;
	var revenue = monthlyRevenue * 12;
	var roi = (revenue/(contractCost+estIncentiveBudget)) * 100;
	
	
	//if(isNaN(audience_size)) {alert("Your response for number of audience size contains a non-numeric character. Please re-enter your response.");}
	//if(isNaN(click_through)) {alert("Your response for number of click through contains a non-numeric character. Please re-enter your response.");}
	//if(isNaN(conversion_rate)) {alert("Your response for the conversion rate contains a non-numeric character. Please re-enter your response.");}
	//if(isNaN(average_price)) {alert("Your response for average price contains a non-numeric character. Please re-enter your response.");}
	

	console.log(roi);
	console.log(contractCost);
	console.log(estIncentiveBudget);
	console.log(revenue);
	console.log(communityMembers);
	console.log(totalSocialPosts);
	console.log(totalEngagements);
	console.log(conversions);
	


});
