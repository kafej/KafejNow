<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>KafejNow</title>
	<meta name="description" content="Small project based on Google Now">
	<link rel="shortcut icon" href="">

	<link href="css/default.css" rel="stylesheet" type="text/css" />
	<link href="css/jquery-ui.min.css" rel="stylesheet" type="text/css"/>
</head>
<body>
	<div class="kafejnow">
		<div id="settings">
			<div class="cardtitle">Settings</div>
			<div title="Zamknij" class="close"></div>
			<form id="settingsmain">
				<label class="settingsoption">Flickr view tag: </label>
				<input type="text" id="flickrtags" class="settingsactive" size="10" />
				<label class="settingsoption">Flickr cards numbers: </label>
				<select id="flickrnumebrs" class="settingsactive">
					<option value="1">1</option>
					<option value="2" selected>2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
				<label class="settingsoption">Flickr refreshing interval: </label>
				<select id="flickrint" class="settingsactive">
					<option value="120000">2 min</option>
					<option value="300000" selected>5 min</option>
					<option value="600000">10 min</option>
					<option value="1200000">20 min</option>
					<option value="1800000">30 min</option>
				</select>
				<label>Weather city: </label>
				<input type="text" id="weatherLocation" name="weatherLocation" size="20" />
				<div id="weatherList"></div>
				<label class="settingsoption">Twitter User: </label>
				<input type="text" id="twitteruser" class="settingsactive" size="10" disabled>
				<input type="submit" id="settingsbutton" name="settingsubmit" value="Show cards" />
			</form>
		</div>
		<div class="card">
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
			    <input type="text" id="todoinput" size="30" />
			</form>
			<div id="todomain">
				<ul id="todoa"></ul>
			</div>
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
		<div id="cube">
			<div class="cardtitle">15 Puzzles</div>
			<div title="Zamknij" class="close"></div>
			<div class="puzzles"></div>
		</div>
		<div class="flickr" data-tags="funny" data-pages="2"></div>
		<div id="morecards" class="card">
			<div id="clickedmorecards">MORE CARDS</div>
		</div>
	</div>
	<!-- For faster experience -->
	<script src="js/jquery.js" type="text/javascript"></script>
	<script src="js/flickrfeed.js" type="text/javascript"></script>
	<script src="js/twitterfeed.js" type="text/javascript"></script>
	<script src="js/zweatherfeed.js" type="text/javascript"></script>
	<script src="js/jquery-ui.js" type="text/javascript"></script>
	<script src="js/cookie.js" type="text/javascript"></script>
	<script src="js/fifteengame.js" type="text/javascript"></script>
	<script src="js/init.js" type="text/javascript"></script>
</body>
<footer>
	<div class="setup" title="Settings">Settings</div>
	<a href="mailto:kafej666@gmail.com?subject=Mail from KafejNow" "KafejNow">KafejNow</a>
</footer>
</html>