// 
//TO-DO
/*

[DONE]1.Check how to recive response 
list of queried complete request
-- just use above link

*/

$(document).ready(function (){

// var url = "//en.wikipedia.org/w/api.php?action=opensearch&search=";
var body =$("body");
// var searchBox = $(".search-bar");
var searchBar = $(".search-bar");
var view=$(".view");
var viewList=$(".view__list");
var prevLength = searchBar.val().length;
var viewHeight = view.height();
var info = $(".info");

searchBar.keyup(function() {
	var currentLength = $(this).val().length;
		if (currentLength<1)
		{
			view.stop();
			view.slideUp(500);
		searchBar.css("transform","translate(0,0)");
		info.css("transform","translate(0,0)");
		}
		else if (currentLength!==prevLength)
		{		
			query()
			prevLength = currentLength;
		}
	});

function query() {
	$.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      data: { action: 'opensearch', search: searchBar.val(), format: 'json' },
      dataType: 'jsonp',
      success: function(json){
      	// console.log(json);
      	// console.log(viewHeight);
		searchBar.css("transform","translate(0,"+(viewHeight/2)+"px)");
		info.css("transform","translate(0,"+(viewHeight/2)+"px)");
		// searchBar.css({position:"relative",
		// 	margin: "1rem auto"});
		viewList.html("");
		var dataDescriptions = json[2];
		var dataUrls = json[3];
		for (var i = 0; i < dataDescriptions.length; i++) {
			if (dataDescriptions[i]=="")
			viewList.append('<a href="'+dataUrls[i]+'" target="_blank"><li class="list-item">'+dataUrls[i]+"</li></a>")
				else
			viewList.append('<a href="'+dataUrls[i]+'" target="_blank"><li class="list-item">'+dataDescriptions[i]+"</li></a>")
		};
		if (searchBar.val().length<1){
					view.stop();
					view.slideUp(500);
		searchBar.css("transform","translate(0,0)");
		info.css("transform","translate(0,0)");

					return;
				}

		view.stop();
		view.slideDown(100,function() {
			body.scrollTop(searchBar.offset().top);
		})

		}
});
}

});


