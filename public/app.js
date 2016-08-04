//Loading underscore library to access the range method
var _ = $.getScript('./js/underscore.min.js');
//var req = $.getScript('./js/require.js');
var clickThroughRate = 5;


//BEGIN AUTOPOPULATION OF CLICK-THROUGH RATE BY INDUSTRY 

var industryRate = {
	"agency": 2.69,
	"beauty": 2.1,
	"cpg": 2.1,
    "entertainment": 2.87,
	"fashion": 2.53,
	"gaming": 3.45,
	"publication": 4.66,
	"qsr": 1.33,
	"retail": 2.53,
	"travel": 2.26,
	"other": 2.65
};

//Function to store industry click through rate in a variable
$('.industry').on('change', function setRate(){
  clickThroughRate = industryRate[$("#industry").val()];
  	$("#page2").attr("href", "page2.html?clickThroughRate=" + clickThroughRate)
});

//BEGIN ROI CALCULATIONS

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

	var signups = $("#audience_size").val() * clickThroughRate/100 * signupRate;

	var socialPosts = signups * socialPostMultiplier;
	var engagementOnPosts = socialPosts * engagementRate;
	var clicksOnPosts = clickRate * socialPosts;
	var conversions = clicksOnPosts * conversionRate;
	var activations = signups * .5;
	var engagements = engagementOnPosts * 2.33333; //Couldn't figure out how this was calculated on Google ROI spreadsheet. Engagements only goes into engagements on posts 2 1/3 times.
	
	var purchaseRevenue = $("#average_price").val() * conversions;

	var monthlyContractCost = monthlyPrice(activations);
	var monthlyIncentiveCost = socialPosts * 0.5;
	var monthlyRevenue = $("#average_price").val() * conversions;
						 
	var totalEngagements = engagements * 12;
	var monthlyConversions = conversions * 12;
	var communityMembers = signups * 12;
	var totalSocialPosts = socialPosts * 12;

	var contractCost = monthlyContractCost * 12;
	var estIncentiveBudget = monthlyIncentiveCost * 12;
	var revenue = monthlyRevenue * 12;
	var roi = (revenue/(contractCost + estIncentiveBudget)) * 100;
	
	
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

	window.alert("Your ROI with MAVRCK would be " + roi + "%.");
	
	var data = {
		roi: roi,
		contractCost: contractCost,
		estIncentiveBudget: estIncentiveBudget,
		revenue: revenue,
		communityMembers: communityMembers,
		totalSocialPosts: totalSocialPosts,
		totalEngagements: totalEngagements,
		conversions: conversions
	};

		$.ajax({
		type: "POST",
		url: 'http://localhost:8080/mail',
		data: data,
		success: null,
		dataType: 'json',
		contentType: 'json'
	});


});
