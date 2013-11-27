<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
	<meta name="description" content="">
	<link rel="shortcut icon" href="">

	<link href="css/default.css" rel="stylesheet" type="text/css" />
	<link href="css/jquery-ui.min.css" rel="stylesheet" type="text/css"/>

	<script src="js/jquery.js" type="text/javascript"></script>
	<script src="js/flickrfeed.js" type="text/javascript"></script>
	<script src="js/twitterfeed.js" type="text/javascript"></script>
	<script src="js/zweatherfeed.js" type="text/javascript"></script>
	<script src="js/jquery-ui.js" type="text/javascript"></script>
	<script src="js/cookie.js" type="text/javascript"></script>
	<script>
	$(document).ready(function() {
		// Variable for main flickr
		var tag = $('.flickr').data('tags');
		var page = $('.flickr').data('pages');
		// Variable for changed flickr
		$('#flickrtags').val(tag);
		$('#flickrnumebrs').val(page);


		// // set cookie
		// $.cookie('my_cookie_name', 'value inside of it');

		// // get cookie
		// alert($.cookie('my_cookie_name'));

		var searchterm = "kafej666";
		$('#twitteruser').val(searchterm);

		// $("#submit").click(function(){
		// 	 $.ajax(
		// 	    {
		// 	    url: "config.php",
		// 	    type: "GET",

		// 	    data: { searchterm2: "engadget"},
		// 	    success: function (result) {
		// 	    	function gettwitterjson() {};
		// 	    }
		// 	});
		// }); 
   		
		//Set refreshing
	    setInterval(function() {
			// Get user tag and run flickr function
			$('.flickr').each(function(index) {
				$(this).attr({
					tags: 'tag',
					pages: 'page'
				})
				.flickr({
					limit: page,
					options: {
						tags: tag
					}
				});
			});
	    }, 200000);
		// More cards
		$('#morecards').click(function (e) {
			$('#clickedmorecards').html('Soon...');
			e.preventDefault();
		});
		// Settings card
		$('.setup').click(function (e) {
			$('.kafejnow').prepend( $( "#settings" ) );
			$('#settings').css({
				display: 'block'
			});
			e.preventDefault();
		});
		// Settings option changing
		$('#settingsmain').submit( function(e) {
			weatherGeocode('weatherLocation','weatherList');
			e.preventDefault();

			// Variable for changed flickr
			var tag2 = $('#flickrtags').val();
			var page2 = $('#flickrnumebrs').val();

			// if (tag !== tag2 && page !== page2) {
				$('.flickr').each(function(index) {
					$('#flickrtags').val(tag2);
					$('#flickrnumebrs').val(page2);

					$(this).attr({
						tags: 'tag',
						pages: 'page'
					})
					.flickr({
						limit: page2,
						options: {
							tags: tag2
						}
					});
				});
			// } else{
				// return false;
			// };
		});
		function showLocation(address,woeid) {
			$('#weatherReport').empty();

			$('#weatherReport').weatherfeed([woeid],{
				woeid: true
			});
		}
		function weatherGeocode(search,output) {
			var status;
			var results;
			var html = '';
			var msg = '';

			// Set document elements
			var search = document.getElementById(search).value;
			var output = document.getElementById(output);

			if (search) {

				output.innerHTML = '';

				// Cache results for an hour to prevent overuse
				now = new Date();

				// Create Yahoo Weather feed API address
				var query = 'select * from geo.places where text="'+ search +'"';
				var api = 'http://query.yahooapis.com/v1/public/yql?q='+ encodeURIComponent(query) +'&rnd='+ now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() +'&format=json&callback=?';

				// Send request
				$.ajax({
					type: 'GET',
					url: api,
					dataType: 'json',
					success: function(data) {

						if (data.query.count > 0 ) {						

							html = '<span>'+ data.query.count +' location';

							if (data.query.count > 1) html = html + 's';
							html = html + ' found:</span><ul>';

							// List multiple returns
							if (data.query.count > 1) {
								for (var i=0; i<data.query.count; i++) {
									html = html + '<li>'+ _getWeatherAddress(data.query.results.place[i]) +'</li>';
								}
							} else {
								html = html + '<li>'+ _getWeatherAddress(data.query.results.place) +'</li>';
							}
		  	
							html = html + '</ul>';

							output.innerHTML = html;

							// Bind callback links
							$("a.weatherAddress").unbind('click');
							$("a.weatherAddress").click(function(e) {
								e.preventDefault();

								var address = $(this).text();
								var weoid = $(this).attr('rel');

								showLocation(address,weoid);
							}); 

						} else {
							output.innerHTML = 'The location could not be found';
						}
					},
					error: function(data) {
						output.innerHTML = 'An error. Please write an email to <a href="mailto:kafej666@gmail.com?subject=Mail from KafejNow" "KafejNow">KafejNow</a>';
					}
				});

			} else {

				// No search given
				// output.innerHTML = 'Please enter a location or partial address';
			}
		}

		function _getWeatherAddress(data) {
			// Get address
			var address = data.name;
			if (data.admin2) address += ', ' + data.admin2.content;
			if (data.admin1) address += ', ' + data.admin1.content;
			address += ', ' + data.country.content;

			// Get WEOID
			var woeid = data.woeid;

			return '<a class="weatherAddress" href="#" rel="'+ woeid +'" title="Click for to see a weather report">'+ address +'</a> <small>('+ woeid +')</small>';
		}
		// Set up refreshing for clock
		window.onload = function(){date()}, setInterval(function(){date()}, 1000);
		// Clock function
		function date() {
		    var now = new Date(),
		        now = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
		    $('#time').html(now);
		}
		// Showing flickr cards
		$('.card, #settings').each(function(index) {
			$(this).slideUp(500);
			$(this).delay(1500);
			$(this).fadeIn(500);
		});
		// deleting permanently clicked card
		$('.close').click(function(e){
		    $(this).parent().fadeOut(2500).remove();
		});
		// deleting clicked card
		$('.close2').click(function(e){
		    $(this).parent().css({
		    	display: 'none'
		    });
		});
		$('#todo').submit( function(e) {
			e.preventDefault();
		    if ($('#todoinput').val() !== '') {
		        var input_value = $('#todoinput').val();
		        $('ul').append('<li>' + input_value + '<div title="Zamknij" id="special" class="close"></div></li>');
		    };
		    $('#todoinput').val('');
		});
		$(document).on('click', '#special', function (e) {
		    e.preventDefault();
		    $(this).parent().remove();
		});
	})
	</script>
</head>
<body>
	<div class="kafejnow">
		<div id="settings">
			<div class="cardtitle">Settings</div>
			<div title="Zamknij" class="close2"></div>
			<form id="settingsmain">
				<label class="settingsoption">Flickr view tag: </label>
				<input type="text" id="flickrtags" class="settingsactive" size="10" />
				<label class="settingsoption">Flickr cards numbers: </label>
				<select id="flickrnumebrs" class="settingsactive">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
				<label class="settingsoption">Flickr refreshing interval: </label>
				<input type="text" id="flickrrefresh" class="settingsactive" size="2" disabled />
				<label>Weather city: </label>
				<input type="text" id="weatherLocation" name="weatherLocation" size="20" />
				<div id="weatherList"></div>
				<label class="settingsoption">Twitter User: </label>
				<input type="text" id="twitteruser" class="settingsactive" size="10" disabled>
				<input type="submit" id="settingsbutton" name="settingsubmit" value="Show cards" />
			</form>
		</div>
		<div class="card" id="zuoo">
			<div class="cardtitle">Example</div>
			<div title="Zamknij" class="close"></div>
			<div class="example">We set up some examples !!</div>
		</div>
		<div class="card">
			<div class="cardtitle">Time</div>
			<div title="Zamknij" class="close"></div>
			<div id="time"></div>
		</div>
		<div class="card">
			<div class="cardtitle">ToDo List</div>
			<div title="Zamknij" class="close"></div>
			<form id="todo">
			    <label>New Task: </label>
			    <input type="text" id="todoinput" />
			</form>
			<ul id="todoa"></ul>
		</div>
		<div class="card">
			<div class="cardtitle">Weather</div>
			<div title="Zamknij" class="close"></div>
			<div id="weatherReport"></div>
		</div>
		<div class="card">
			<div class="cardtitle">Twitter</div>
			<div title="Zamknij" class="close"></div>
			<div id="twitter-feed"></div>
		</div>
		<div class="flickr" data-tags="funny" data-pages="2"></div>
		<div id="morecards" class="card">
			<div id="clickedmorecards">MORE CARDS</div>
		</div>
	</div>
</body>
<footer>
	<div class="setup" title="Settings">Settings</div>
	<a href="mailto:kafej666@gmail.com?subject=Mail from KafejNow" "KafejNow">KafejNow</a>
</footer>
</html>