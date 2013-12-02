(function($){
$.fn.flickr = function(settings){
	//standard plugin settings
	settings = $.extend(true, {
		flickrbase: 'http://api.flickr.com/services/feeds/',
		feedapi: 'photos_public.gne',
		limit: 10,
		options: {
			lang: 'en-us',
			format: 'json',
			jsoncallback: '?'
		},
	}, settings);
	
	var url = settings.flickrbase + settings.feedapi + '?';
	var first = true;
	var truelimit = settings.limit - 1;
	
	//adding options to url
	for(var key in settings.options){
		if(!first)
			url += '&';
		url += key + '=' + settings.options[key];
		first = false;
	}
	
	//getting images from flickr
	return $(this).each(function(){
		var $this = $(this);
		var template = "";
		$.getJSON( url, function(data){
			
			$.each( data.items, function( i, item ) {
				//images to thumbnails
				var thumbnails = (item.media.m);

			   	//closing card	
				$('.close').click(function(e){
				    $(this).parent().fadeOut(2500).remove();
				});

				// template of displayed images
				template += '<div class="card" style="display:block;"><div class="cardtitle">Flickr</div><div class="flickrtags">Tag: '+ settings.options.tags +'</div><div title="Zamknij" class="close"></div><a href="' + item.link + '" target="_blank">';
				template += '<img title="' + item.title + '" src="' + thumbnails;
				template += '" alt="'; template += item.title + '" />';
				template += '</a></div>';
				
				//displaying a fixed amount of pictures.
				if ( i === truelimit ) {
					$('.kafejnow').prepend(template);
				}
			});
		});
	});
};
})(jQuery);