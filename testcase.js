	<script type="text/javascript">
		var reviewsPerYearSave = 0;
		var corrPerYearSave = 0;

		$(document).ready(function() {
			
			$('.input').keyup(function(){ CalculateROI(); return false; });

			CalculateROI();

		});
		
		function CalculateROI()
		{
			var numberOfDevelopers = GetValue("numDevs");
			var avgYearlyPay = GetValue("avgYearlyPay");
			var avgHourlyPay = Math.round(avgYearlyPay / 2000);
			$('#avgHourlyPay').text(avgHourlyPay.toFixed(2));
			
			var numReviews = GetValue("numReviews");
			var avgReviewLen = GetValue("avgReviewLen");
			var reviewsPerMonth = Math.round(numReviews * avgReviewLen * avgHourlyPay * numberOfDevelopers);
			$('#reviewsPerMonth1').text("$" + (reviewsPerMonth > 0 ? addCommas(reviewsPerMonth.toFixed(0)) : ""));
			reviewsPerMonth = reviewsPerMonth * 4;
			$('#reviewsPerMonth2').text("$" + (reviewsPerMonth > 0 ? addCommas(reviewsPerMonth.toFixed(0)) : ""));
			var reviewsPerYear = reviewsPerMonth * 12;
			$('#reviewsPerYear').text("$" + (reviewsPerYear > 0 ? addCommas(reviewsPerYear.toFixed(0)): ""));
			
			if (reviewsPerYear > 0) {
				$('#cart_item_ar').css({'display':'block'});
				$('#cart_ar_subtotal').text(addCommas(reviewsPerYear.toFixed(0)));
			} else {
				$('#cart_item_ar').css({'display':'none'});
			}
			var fixPerIssue = GetValue("fixPerIssue");
			var issuesPerWeek = GetValue("issuesPerWeek");
			var corrPerMonth = Math.round(fixPerIssue * issuesPerWeek * avgHourlyPay * numberOfDevelopers);
			$('#corrPerMonth1').text("$" + (corrPerMonth > 0 ? addCommas(corrPerMonth.toFixed(0)) : ""));
			corrPerMonth = corrPerMonth * 4;
			$('#corrPerMonth2').text("$" + (corrPerMonth > 0 ? addCommas(corrPerMonth.toFixed(0)) : ""));
			var corrPerYear = corrPerMonth * 12;
			$('#corrPerYear').text("$" + (corrPerYear > 0 ? addCommas(corrPerYear.toFixed(0)) : ""));

			if (corrPerYear > 0) {
				$('#cart_item_ac').css({'display':'block'});
				$('#cart_ac_subtotal').text(addCommas(corrPerYear.toFixed(0)));
			} else {
				$('#cart_item_ac').css({'display':'none'});
			}
			
			var savingsPerMonth = reviewsPerMonth + corrPerMonth;
			//$('#savingsPerMonth').text("$" + (savingsPerMonth > 0 ? addCommas(savingsPerMonth.toFixed(0)) : ""));
			var savingsPerYear = savingsPerMonth * 12;
			//$('#savingsPerYear').text("$" + (savingsPerYear > 0 ? addCommas(savingsPerYear.toFixed(0)) : ""));
			
			if(savingsPerMonth > 0) {
				$('#items_none').css({'display':'none'});
				$('#cart_sav_item_total').css({'display':'block'});
			} else {
				$('#items_none').css({'display':'block'});
				$('#cart_sav_item_total').css({'display':'none'});
			}
			
			$('#cart_sav_total').text(addCommas(savingsPerYear.toFixed(0)));

			if (reviewsPerYearSave != reviewsPerYear)
			{
				$('#cart_ar_info').glow('#FFFFCC');
				reviewsPerYearSave = reviewsPerYear;
			}
			
			if (corrPerYearSave != corrPerYear)
			{
				$('#cart_ac_info').glow('#FFFFCC');
				corrPerYearSave = corrPerYear;
			}
			

			var strProductCode = "cirse";
			var intSubtotal = 0;

			if (numberOfDevelopers > 4) {
				strProductCode = "ciree";
				$('#cart_item_ciree').css({'display':'block'});
				$('#cart_item_cirse').css({'display':'none'});
			} else if (numberOfDevelopers > 0) {
				strProductCode = "cirse";
				$('#cart_item_ciree').css({'display':'none'});
				$('#cart_item_cirse').css({'display':'block'});
			} else {
				$('#cart_item_ciree').css({'display':'none'});
				$('#cart_item_cirse').css({'display':'none'});
			}

			$('#cart_' + strProductCode + '_qty').text(numberOfDevelopers);
			intSubtotal = GetLabelValue("cart_" + strProductCode + "_base") * numberOfDevelopers;
			$('#cart_' + strProductCode + '_subtotal').text(addCommas(intSubtotal.toFixed(0)));

			if(intSubtotal > 0) {
				$('#cart_items_none').css({'display':'none'});
				$('#cart_item_total').css({'display':'block'});
				$('#cart_buy_now').css({'display':'block'});
			} else {
				$('#cart_items_none').css({'display':'block'});
				$('#cart_item_total').css({'display':'none'});
				$('#cart_buy_now').css({'display':'none'});
			}
			
			$('#cart_total').text(addCommas(intSubtotal.toFixed(0)));

			if (numberOfDevelopers >= 10) {
				$('#cart_custom_quote').css({'display':'block'});
			} else {
				$('#cart_custom_quote').css({'display':'none'});
			}

		}
		
		function GetValue(id)
		{
			var res = 0;
			var number = $('#' + id).attr("value");
			if (number != null && !isNaN(number) && number >= 0) {
				res = number;
			}
			return res;
		}
		
		function GetLabelValue(id)
		{
			var res = 0;
			var number = $('#' + id).text();
			if (number != null && !isNaN(number) && number >= 0) {
				res = number;
			}
			return res;
		}
		
		function addCommas(nStr) {
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		}

	</script>

<h1>Calculate the ROI of Code Quality Analysis with CodeIt.Right</h1>

<p>Everyone agrees that code analysis finds bugs, code issue, makes code faster, more secure and maintainable. But how much time does it take? Are the savings worth the expense? 

<p><B>Use this ROI calculator to see the business case for CodeIt.Right.</B> </p>

<p>For the calculations below, the default numbers come from industry-standard sources, including some of our own customer data.</p>

<div id="ROIcontainer">
	<div class="calcBox">
		<h4>Development Team</h4>
		<table class="calcBox">
			<col style="width:150px" /><col style="width:15px" /><col style="width:150px" />
			<tr>
				<td>Team size</td><td>&nbsp;</td><td><input class="input" id="numDevs" maxlength="6" name="numDevs" size="6" value="4" type="text" />developers</td><td>&nbsp;</td>
			</tr>
			<tr>
				<td>avg team member pay</td><td>$</td><td><input class="input" id="avgYearlyPay" maxlength="6" name="avgYearlyPay" size="6" value="60000" type="text" />per year</td><td>&nbsp;</td>
			</tr>
			<tr>
				<td>avg team member pay</td><td>&nbsp;</td><td class="sum2">$<span id="avgHourlyPay"></span>&nbsp;per hour</td><td>&nbsp;</td>
			</tr>
		</table>
	</div>
	<div class="calcBox">
		<h4>Savings from Automated Reviews</h4>
		<table class="calcBox">
			<col style="width:150px" /><col style="width:15px" /><col style="width:150px" />
			<tr>
				<td># reviews per week</td><td>&nbsp;</td><td><input class="input" id="numReviews" maxlength="6" name="numReviews" size="6" value="2" type="text" /></td><td>&nbsp;</td>
			</tr>
			<tr>
				<td>avg review length</td><td>&nbsp;</td><td><input class="input" id="avgReviewLen" maxlength="6" name="avgReviewLen" size="6" value="1" type="text" />hrs</td><td>&nbsp;</td>
			</tr>
			<tr><td colspan="4" class="line">&nbsp;</td></tr>
			<tr>
				<td colspan="3" class="sum">Savings per week&nbsp;=&nbsp;<span class="subtotal" id="reviewsPerMonth1">$</span></td><td>&nbsp;</td>
			</tr>
			<tr>
				<td colspan="3" class="sum">Savings per month&nbsp;=&nbsp;<span class="subtotal" id="reviewsPerMonth2">$</span></td><td class="sum1">=&nbsp;<span class="sum" id="reviewsPerYear">$</span>&nbsp;(per Year)</td>
			</tr>
		</table>
	</div>
	<div class="calcBox">
		<h4>Savings from Auto-Correction</h4>
		<table class="calcBox">
			<col style="width:150px" /><col style="width:15px" /><col style="width:150px" />
			<tr>
				<td>time to fix per issue</td><td>&nbsp;</td><td><input class="input" id="fixPerIssue" maxlength="6" name="fixPerIssue" size="6" value="2" type="text" />hrs</td><td>&nbsp;</td>
			</tr>
			<tr>
				<td>issues fixed per week</td><td>&nbsp;</td><td><input class="input" id="issuesPerWeek" maxlength="6" name="issuesPerWeek" size="6" value="3" type="text" /></td><td>&nbsp;</td>
			</tr>
			<tr><td colspan="4" class="line">&nbsp;</td></tr>
			<tr>
				<td colspan="3" class="sum">Savings per week&nbsp;=&nbsp;<span class="subtotal" id="corrPerMonth1">$</span></td><td>&nbsp;</td>
			</tr>
			<tr>
				<td colspan="3" class="sum">Savings per month&nbsp;=&nbsp;<span class="subtotal" id="corrPerMonth2">$</span></td><td class="sum1">=&nbsp;<span class="sum" id="corrPerYear">$</span>&nbsp;(per Year)</td>
			</tr>
		</table>
	</div>
<!--	<div class="calcBox">
		<h4>Total Savings</h4>
		<table class="calcBox">
			<tr>
				<td class="total">Total savings per month&nbsp;=&nbsp;<span id="savingsPerMonth">$</span></td>
			</tr>
			<tr>
				<td class="total">Total savings per year, every year&nbsp;=&nbsp;<span id="savingsPerYear">$</span></td>
			</tr>
		</table>
	</div>-->
</div>

<p>Cost of the code analysis tool is not included in this calculation. Use our <a href="order/">Pricing Page </a>to get this cost depending on tool choice, the number of developers, and licensing scheme. </p>

<!-- ROI Calculator: End -->

<!-- Sidebar -->

<td class="pagecenter_right">&nbsp;</td>

<td width="213" align="left" valign="top" bgcolor="#FFFFFF">

	<table border="0" width="100%" cellspacing="0" cellpadding="2"><tr><td>

	<div id="bluebox2_container">
		<div class="bluebox2_header">
			<div class="padding_top10">Savings per Year</div>
		</div>
		<div class="bluebox2_body">
			<div class="bluebox2_body_padding">
				<div class="order_list">
				<ul class="order_items">
					<li id="cart_item_ar" class="order_item" style="display: none;">
						<span id="cart_ciree_description" class="order_item_description">Automated Reviews</span>
						<table width="185" cellspacing="0"><tr id="cart_ar_info">
							<td class="order_item_col1" style="width:50%">=</td>
							<td class="order_item_subtotal">$<span id="cart_ar_subtotal">0.00</span></td>
						</tr></table>
					</li>
					<li id="cart_item_ac" class="order_item" style="display: none;">
						<span id="cart_cirse_description" class="order_item_description">Auto-Correction</span>
						<table width="185" cellspacing="0"><tr id="cart_ac_info">
							<td class="order_item_col1" style="width:50%">=</td>
							<td class="order_item_subtotal">$<span id="cart_ac_subtotal">0.00</span></td>
						</tr></table>
					</li>
					<li id="cart_sav_item_total" class="order_item_total" style="display: none;">
						<span id="cart_total_description" class="order_total_description">Total</span>
						<table width="185" cellspacing="0"><tr id="cart_total_info">
							<td class="order_total_col1" nowrap>&nbsp;</td>
							<td class="order_total_col2">=</td>
							<td class="order_total">$<span id="cart_sav_total">0.00</span></td>
						</tr></table>
					</li>
				</ul>
					<span id="items_none" class="items_none" style="display:block;">Change input parameters.</span>
				</div>
			</div>
		</div>
		<div class="bluebox2_footer">
		&nbsp;
		</div>
	</div>
	&nbsp;
	<div id="bluebox2_container">
		<div class="bluebox2_header">
			<div class="padding_top10">License Cost</div>
		</div>
		<div class="bluebox2_body">
			<div class="bluebox2_body_padding">
				<div class="order_list">
				<ul class="order_items">
					<li id="cart_item_ciree" class="order_item" style="display: none;">
						<span id="cart_ciree_description" class="order_item_description">CodeIt.Right Enterprise w/ Subscription</span>
						<table width="185" cellspacing="0"><tr id="cart_ciree_info">
							<td class="order_item_col1" nowrap><span id="cart_ciree_qty">0</span>&nbsp;x $<span id="cart_ciree_base">750.00</span> </td>
							<td class="order_item_col2">=</td>
							<td class="order_item_subtotal">$<span id="cart_ciree_subtotal">0.00</span></td>
						</tr></table>
					</li>
					<li id="cart_item_cirse" class="order_item" style="display: none;">
						<span id="cart_cirse_description" class="order_item_description">CodeIt.Right Standard w/ Subscription</span>
						<table width="185" cellspacing="0"><tr id="cart_cirse_info">
							<td class="order_item_col1" nowrap><span id="cart_cirse_qty">0</span>&nbsp;x $<span id="cart_cirse_base">450.00</span> </td>
							<td class="order_item_col2">=</td>
							<td class="order_item_subtotal">$<span id="cart_cirse_subtotal">0.00</span></td>
						</tr></table>
					</li>
					<li id="cart_item_total" class="order_item_total" style="display: none;">
						<span id="cart_total_description" class="order_total_description">Total</span>
						<table width="185" cellspacing="0"><tr id="cart_total_info">
							<td class="order_total_col1" nowrap>&nbsp;</td>
							<td class="order_total_col2">=</td>
							<td class="order_total">$<span id="cart_total">0.00</span></td>
						</tr></table>
					</li>
				</ul>
					<span id="cart_items_none" class="items_none" style="display:block;">Change input parameters.</span>
				</div>
				<center><span id="cart_buy_now" style="display:none;"><a href="order/"><img src="images/button_BuyNow.gif" width="132" height="35" border="0" alt="Buy Now!" /></a></span></center>
				<center><span id="cart_custom_quote" style="display:none;"><a href="mailto:sales@submain.com?subject=Custom Quote Request">Request custom quote</a></span></center>
			</div>
		</div>
		<div class="bluebox2_footer">
		&nbsp;
		</div>
	</div>

	<div class="sidebar_block">
		<div class="sidebar_header">
			Questions?
		</div>

		<img src="images/news_header_back.gif" id="MainContent_Img2" border="0" width="204" height="25" />

		<div class="sidebar_text">
			Call <b>1 (800) 936-2134</b> (toll free) or email <a href="mailto:sales@submain.com"><b>sales@submain.com</b></a>
		</div>
		<div class="sidebar_text">
			&nbsp;
		</div>
	</div>

	<div class="sidebar_block">
		<img src="images/news_header_back.gif" id="MainContent_Img3" border="0" width="204" height="25" />

		<div class="sidebar_text">
			All products come with an unconditional 60-day money back guarantee.
		</div>
		<center><img src="images/submain_60day.png" id="MainContent_Img4" align="center" width="149" height="171" border="0" alt="60 day Money Back Guarantee" /></center>
		<div class="sidebar_text">
			&nbsp;
		</div>
	</div>

		<img src="images/news_header_back.gif" id="MainContent_Img5" border="0" width="204" height="25" />

	<img src="images/blank.gif" id="MainContent_Img7" width="15" height="1" />

	<!-- /sidebar -->
	</td></tr></table>

</td>
<!-- /Sidebar -->


	</div>
	<!-- /body -->
	</td></tr></table>

</td>
<!-- /Content -->


  
</tr></table>

</td>



<!-- Footer -->
</tr>
</table>

	<img src="images/blank.gif" width="0" height="8" />

	</td><td class="container_right">&nbsp;</td>
</tr>
<tr>
	<td class="container_left_bott">&nbsp;</td>
	<td class="container_bottom">&nbsp;</td>
	<td class="container_right_bott">&nbsp;</td>
</tr>
<tr>
	<td style="width:10px;">&nbsp;</td>
	<td>
		<table border="0" style="width:968px;" cellspacing="0" cellpadding="0"><tr>
			<td align="left" valign="top">
				<a href="./" class="menu_footer">Home</a>&nbsp;|&nbsp;
				<a href="products/" class="menu_footer">Products</a>&nbsp;|&nbsp;
				<a href="download/" class="menu_footer">Download</a>&nbsp;|&nbsp;
				<a href="order/" class="menu_footer">Purchase</a>&nbsp;|&nbsp;
				<a href="support/" class="menu_footer">Support</a>&nbsp;|&nbsp;
				<a href="privacy.aspx" class="menu_footer">Privacy</a>&nbsp;|&nbsp;
				<a href="terms.aspx" class="menu_footer">Terms</a>&nbsp;|&nbsp;
				<a href="contact.aspx" class="menu_footer">About&nbsp;Us</a>&nbsp;|&nbsp;
				<a href="sitemap/" class="menu_sitemap"></a>
			</td>
			<td align="right" valign="top" class="footer_text">
				&copy;&nbsp;1998-2016&nbsp;SubMain.&nbsp;&nbsp;All rights reserved.<br />
				Designated trademarks and brands are the property of their respective owners.<br />
				<img src="images/bottom_logo.gif" width="110" height="33" border="0" />
			</td>
		</tr></table>
	</td>
	<td style="width:10px;">&nbsp;</td>
</tr>
</table>
<!-- /Footer -->

</center>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-52755-2', 'auto');
  ga('send', 'pageview');

</script>

<script>
  function smarterTrackWhosOn_TrackPage(a) {
    a.TrackPage();
  }
</script>
<script type='text/javascript' src='http://support.submain.com/ST.ashx?scriptonly=true'></script>

<!-- Drip -->
<script type="text/javascript">
  var _dcq = _dcq || [];
  var _dcs = _dcs || {}; 
  _dcs.account = '2693368';
  
  (function() {
    var dc = document.createElement('script');
    dc.type = 'text/javascript'; dc.async = true; 
    dc.src = '//tag.getdrip.com/2693368.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(dc, s);
  })();
</script>

</body>
</html>