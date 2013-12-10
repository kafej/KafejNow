$(document).ready(function() {
  // Variable for main flickr
  var tag = $('.flickr').data('tags');
  var page = $('.flickr').data('pages');

  // var searchterm = "kafej666";
  // $('#twitteruser').val(searchterm);

    // $("#submit").click(function(){
    //   $.ajax(
    //      {
    //      url: "config.php",
    //      type: "GET",

    //      data: { searchterm2: "engadget"},
    //      success: function (result) {
    //        function gettwitterjson() {};
    //      }
    //  });
    // });
    
  // Get Cookies
  var cookieFlickrtags = $.cookie('flickrtags'),
  cookieFlickrnumbers = $.cookie('flickrnumebrs'),
  cookieFlickrref = $.cookie('flickrref'),
  todolistul = $.cookie('todolist'),
  puzzlesnumber = $.cookie('puzlesgameform');
  $('#todomain').html(todolistul);

  // Set Cookies values to element
  if (cookieFlickrtags == '') {
    $('#flickrtags').val(cookieFlickrtags);
  } else if (cookieFlickrnumbers == '') {
    $('#flickrnumebrs').val(cookieFlickrnumbers);
  } else {
    // Variable for changed flickr
    $('#flickrtags').val(tag);
    $('#flickrnumebrs').val(page);
  }
    
  //Set refreshing
  function flickrrefreshing() {
    var flickrref = $('#flickrint').val();
    // set cookie
    $.cookie('flickrref', flickrref, { expires: 365 });
    // Main refreshing F
    setInterval(function(flickrref) {
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
    }, flickrref);
  }
  flickrrefreshing();

  // $('#morecards').one('click', function(event) {
    $('.puzzles').cube({puzzles: puzzlesnumber});
  // });
  // More cards
  $('#morecards').click(function (e) {
    if( $('#cube').css('display') == 'none' )  { 
        $('.kafejnow').prepend($("#cube"));
        $('#cube').fadeIn(500);
    } 
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
    e.preventDefault();
    weatherGeocode('weatherLocation','weatherList');

      // Variable for flickr refreshing intercal
      // var flickrint = $('#flickrrefresh').val();
      // if (flickrint = "2 min") {
      //  expression
      // } else {
      //  second expression
      // }

    // Variable for changed flickr
    var tag2 = $('#flickrtags').val();
    var page2 = $('#flickrnumebrs').val();

    // Variable for puzzle game
    var puzzlesnumbersubmit = $('#puzlesgameform').val();

    // set cookie
    $.cookie('flickrtags', tag2, { expires: 365 });
    $.cookie('flickrnumebrs', page2, { expires: 365 });
    $.cookie('puzlesgameform', puzzlesnumbersubmit, { expires: 365 });

    flickrrefreshing();
    if (puzzlesnumber != puzzlesnumbersubmit) {
      puzzlesnumber = puzzlesnumbersubmit;
      $('#cubetable, #CubeVictoryMSG').remove();
      $('.puzzles').cube({puzzles: puzzlesnumber});
    }
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
    $(this).delay(1500);
    $(this).fadeIn(500);
  });
  // deleting permanently clicked card
  $('.close').click(function(e){
      $(this).parent().fadeOut(500);
  });
  $('#todo').submit( function(e) {
    e.preventDefault();
      if ($('#todoinput').val() !== '') {
          var input_value = $('#todoinput').val();
          $('ul').append('<li>' + input_value + '<div title="Zamknij" id="special" class="close"></div></li>');
          // set cookie
      $.cookie('todolist', $('#todomain').html(), 365);
      };
      $('#todoinput').val('');
  });
  $(document).on('click', '#special', function (e) {
      e.preventDefault();
      $(this).parent().remove();
      $.cookie('todolist', $('#todomain').html(), 365);
  });
})