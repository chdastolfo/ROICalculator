var _ = $.getScript('./js/underscore.min.js');

function monthlyPrice(monthlyActivations){
	switch(monthlyActivations) {
		case _.range(30000):
			price = 5000;
			break;
		case _.range(30001, 40000):
			price = 7500;
			break;
		case _.range(40001, 50000):
			price = 10000;
			break
		case _.range(50001, 60000):
			price = 12500;
			break;
		case _.range(60001, 75000):
			price = 13750;
			break;
		case _.range(75001, 80000):
			price = 10000;
			break;
		case _.range(80001, 90000):
			price = 11000;
			break;
		case _.range(90001, 95000):
			price = 12000;
			break;
		default:
			price = 5000;
			break;
	} return price;
};

$('.submit').on('click', function calculate() {	  
	var signupRate =  .35;
	var socialPostMultiplier = .30;
	var engagementRate = 3;
	var clickRate = 4;
	var conversionRate = 0.03;

	var signups = parseInt($("#audience_size").val()) * parseInt($("#click_through").val()) * signupRate;

	var totalSocialPosts = signups * .3;
	var engagementOnPosts = totalSocialPosts * engagementRate;
	var clicksOnPosts = clickRate * totalSocialPosts;
	var conversions = clicksOnPosts * conversionRate;
	var activations = signupRate * .5;
	
	var purchaseRevenue = parseInt($("#average_price").val()) * conversions;

	var monthlyContractCost = monthlyPrice(parseInt($("#monthlyActivations").val())) * 0.5;
	var monthlyIncentiveCost = totalSocialPosts * 0.5;
	var monthlyRevenue = $("#average_price").val()*conversions;
						 
	var engagements = engagementOnPosts * 12;
	var monthlyConversions = conversions * 12;
	var communityMembers = signups * 12;

	var contractCost = monthlyContractCost * 12;
	var estIncentiveBudget = monthlyIncentiveCost * 12;
	var revenue = monthlyRevenue * 12;
	var roi = (revenue/(contractCost+estIncentiveBudget)) * 100;
	
	
	//if(isNaN(audience_size)) {alert("Your response for number of audience size contains a non-numeric character. Please re-enter your response.");}
	//if(isNaN(click_through)) {alert("Your response for number of click through contains a non-numeric character. Please re-enter your response.");}
	//if(isNaN(conversion_rate)) {alert("Your response for the conversion rate contains a non-numeric character. Please re-enter your response.");}
	//if(isNaN(average_price)) {alert("Your response for average price contains a non-numeric character. Please re-enter your response.");}
	

	console.log(contractCost);
	console.log(estIncentiveBudget);
	console.log(revenue);
	console.log(roi);
	console.log(communityMembers);
	console.log(totalSocialPosts);
	console.log(engagements);
	console.log(conversions);

});
