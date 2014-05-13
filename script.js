// http://feeds.reuters.com/reuters/oddlyEnoughNews
$(document).ready(function () {
	
var stopParsing = false;
	
	//parseRSS('http://kickass.to/documentarie/?rss=1');
	
	parseRSS('http://kickass.to/movies/?rss=1','movies');
	//parseRSS('http://kickass.to/usearch/category%3Adocumentary/?rss=1','documentaries');
	//formatAllLists();
	
	function parseRSS(url,className) {
	$class = '.'+className;
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=20&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      parseFeed(data.responseData.feed,$class);
    }
  });
		
	function callback(){
		if(stopParsing === false){
			parseRSS('http://kickass.to/usearch/category%3Adocumentary/?rss=1','documentaries');
			stopParsing = true;
		}
	}
		
	function parseFeed(data,setClass){
		$classNameOnly = replaceAll('.','',setClass);
		$catName = $classNameOnly.charAt(0).toUpperCase() + $classNameOnly.slice(1);		
		$('#feeds').append('<ul id="feedList" class="'+$classNameOnly+'"></ul>');
		$(setClass).before('<h1>'+$catName+'</h1>');
		for(i=0;i<data.entries.length;i++){
			$content = data.entries[i].contentSnippet;
			$content = replaceAll('_', '', $content);
			// /[(?:.|\n)*?]/gm
			//$content = replaceAll('[center]', 'REPALCED', $content);
			//$content = $content.replace(/[(?:.|\n)*?]/gm,'--#--');
			//console.log(data.entries[i].contentSnippet);
			$content = removeBrackets($content);
			//$content = formatFeed($content);
			console.log(data);
			$li = '<li data-id="123"><label>'+data.entries[i].title+'</label><span></span></li>';
			$(setClass).append($li);
		}
		
		callback();
		
	}
		

	
 function formatFeed(feed){
  return feed
			.replace('PLOT:........','<h2>Plot</h2>')
			.replace('ACTORS:........','<h2>Actors</h2>')
			.replace('RELEASED:........','<h2>Released</h2>')
			.replace('IMDB:........','<h2>IMDB</h2>')
			.replace('SIZE:........','<h2>Size</h2>')
			.replace('DURATION:............','<h2>Duration</h2>')
			.replace('AVG-BITRATE:.........','<h2>Avg-Bitrate</h2>')
			.replace('AUDIO:.......','<h2>Audio</h2>')
			.replace('VIDEO:.......','<h2>Video</h2>');
 }
	
	function removeBrackets(input) {
    return input
        .replace(/{.*?}/gm, "")
        .replace(/\[.*?\]/gm, "")
        .replace(/<.*?>/gm, "")
        .replace(/\(.*?\)/gm, "");
	}
		
	function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
		
	function replaceAll(find, replace, str) {
  	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}
		
	
}
	
});