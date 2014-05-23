$(document).ready(function () {
	 
var stopParsing = false,
$allFeelings = [],
$allSentences = [],
$feelingsArr = [],
feelingsObj = {};

parseWeFeelFine('all');
	
function parseWeFeelFine(feeling){
$class = '.' + feeling;
$.getJSON( "http://127.0.0.1:55744/wefeelfine.xml", function( data ) {
var items = [];
for(i=0;i<data.length;i++){
  var feeling = JSON.parse(data[i]);
  var tempObj = {};
  tempObj.id = i,
  tempObj.feeling = feeling.feeling.charAt(0).toUpperCase() +feeling.feeling.slice(1),
  tempObj.gender = feeling.gender,
  tempObj.country = feeling.country,
  tempObj.city = feeling.city,
  tempObj.sentence = feeling.sentence;
  items.push(tempObj);
}
  parseFeelings(items,feeling);
});
}

function parseFeelings(JSON,setClass){
$classNameOnly = setClass;
$catName = $classNameOnly;		
for(i=0;i<JSON.length;i++){
  feeling = JSON[i].feeling;
  $allSentences.push(JSON[i].sentence);
  $allFeelings.push(JSON[i].feeling);
  $feelingsArr.push(1);
  $fontSize = feelingsObj[feeling];
}
		
$matchCount = [];
$uniqueFeelings = unique($allFeelings);
console.log($uniqueFeelings.length);
for(i=0;i<$uniqueFeelings.length;i++){
  $feeling = $uniqueFeelings[i];
  count = 0;
  for(x=0;x<$allFeelings.length;x++){
    if($allFeelings[x] == $feeling){
      count++;	
    }
  }
  $matchCount.push($feeling+':'+count);
}
		
console.log($matchCount);

for(i=0;i<$matchCount.length;i++){
$feelingName = $matchCount[i].split(':');
if($feelingName[0] != ''){
  $currentFeeling = $feelingName[0];
  feelingsObj[$currentFeeling] = $feelingName[1];
}
}
		
	
for(i=0;i<$uniqueFeelings.length;i++){
  currentFeeling = $uniqueFeelings[i];
}
		
$fontTypes = [
"'Indie Flower', cursive",
"'Droid Sans', sans-serif",
"'Shadows Into Light', cursive",
"'Inconsolata'",
"'Permanent Marker', cursive",
"'Crafty Girls', cursive",
"'Josefin Sans', sans-serif",
"'Noticia Text', serif",
"'Chewy', cursive"
];
		
$uniqueFeelings = shuffle($uniqueFeelings);

for(i=0;i<$uniqueFeelings.length;i++){
$feeling = $uniqueFeelings[i];
if($feeling != ''){
  $matches = feelingsObj[$feeling];
  $fontSize = (1 + (parseInt($matches) * 0.5));
  if($fontSize > 7){
    $fontSize = (parseInt($fontSize) * 0.4);
  }
}

$fontTypeIndex = Math.floor( Math.random() * ( 0 + $fontTypes.length - 0 ) ) + 0;
//console.log('['+$fontTypeIndex+']'+$fontTypes[$fontTypeIndex]);
$text = '<div id="feeling" class="'+$feeling+'" style="font-size:'+$fontSize+'em; float: left; margin: 5px; font-family:'+$fontTypes[$fontTypeIndex]+' !important;">'+$feeling+'</div>';
          //$randFadeInInt = getRandomInt(500, 5000);
$('#textfeedList').append($text).hide().fadeIn(1500);

}
		
$("#textfeedList>#feeling").hover(function() {
$originalFontSize = $(this).css('font-size');
$fontSize = $originalFontSize.split('px');
$newFontSize = (parseInt($fontSize[0]) + 20) + 'px';
  
$(this).animate({
  fontSize: $newFontSize
}, 100, function() {
  // Animation complete.
});
},function() {
  $(this).animate({
    fontSize: $originalFontSize
  }, 100, function() {
    // Animation complete.
  });
});					
}
	
});

/****************************
       Util Functions
****************************/

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeNewPosition(){
// Get viewport dimensions (remove the dimension of the div)
var h = $(window).height() - 500;
var w = $(window).width() - 1000;

var nh = Math.floor(Math.random() * h);
var nw = Math.floor(Math.random() * w);

  return [nh,nw];
}

function shuffle(array) {
var currentIndex = array.length
  ,temporaryValue
  ,randomIndex;

// While there remain elements to shuffle...
while (0 !== currentIndex) {

  // Pick a remaining element...
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;

  // And swap it with the current element.
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
}
  return array;
}
	
function unique(list) {
var result = [];
$.each(list, function(i, e) {
  if ($.inArray(e, result) == -1) result.push(e);
});
  return result;
}