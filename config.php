<?php
	session_start();
	require_once("twitteroauth/twitteroauth.php"); //Path to twitteroauth library
	 
	$twitteruser = "kafej666";
	$notweets = 30;
	$consumerkey = "8jewDtfYRGUTjuEmw6SmBA";
	$consumersecret = "cSWn0F8nHUrIULyzjtdf3O6eBiVmfolO0iRALdqtpc";
	$accesstoken = "344763706-UToM2i6iCwNRb4AWCiOYLJhqeIO31WQ43tfO1hcm";
	$accesstokensecret = "bhojL1JstOzHrdvrpw4LrQDrC4frOymxrEVNa5lBu28ws";
	 
	function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
	  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
	  return $connection;
	}
	 
	$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
	 
	$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);
	 
	echo json_encode($tweets);
?>