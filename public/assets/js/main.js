$(document).ready(function() {

	var body = $("body");
	var searchBox = $(".search-box");
	var searchBar = $(".search-bar");
	var view = $(".view");
	var viewList = $(".view__list");
	var prevLength = searchBar.val().length;
	var viewHeight = view.height();
	var info = $(".info");
	var clearBtn = $(".clear-btn");
	var ranBtn = $(".ran-btn");

	clearBtn.on("click", function() {
		searchBar.val("");
		view.stop();
		view.slideUp(500, function() {
			info.show();
		});
		searchBox.css("transform", "translate(0,0)");
		$(this).hide(200);
		searchBar.focus();
	})

	ranBtn.on('click', randomSearch);

	searchBar.keyup(function() {
		var currentLength = $(this).val().length;
		if (currentLength < 1) {
			view.stop();
			view.slideUp(500, function() {
				info.show();
			});
			searchBox.css("transform", "translate(0,0)");

			clearBtn.hide();
		} else if (currentLength !== prevLength) {
			query()
			prevLength = currentLength;
			clearBtn.show(500);

		}
	});

	function randomSearch () {
		$.ajax({
			url: 'http://en.wikipedia.org/w/api.php',
			dataType: 'jsonp',
			data: {action: 'query', list: 'random', rnlimit: '10', rnnamespace: 0, format: 'json'},
			success: function (json) {
				console.log(json);
				searchBox.css("transform", "translate(0," + (viewHeight / 2) + "px)");
				info.hide();
				viewList.html("");
				clearBtn.show(500);
				var randomList = json.query.random;
				for (var i = 0; i < randomList.length; i++) {
					viewList.append('<a href="https://en.wikipedia.org/wiki/' + randomList[i].title + '" target="_blank"><li class="list-item"><span class="text--special">' + randomList[i].title + '</span></li></a>');				
				};
				view.stop();
				view.slideDown(100, function() {
					body.scrollTop(searchBox.offset().top);
				})
				searchBar.focus();
			}
		});

	}

	function query() {
		$.ajax({
			url: 'http://en.wikipedia.org/w/api.php',
			data: {
				action: 'query',
				list: "search",
				srsearch: searchBar.val(),
				format: 'json'
			},
			dataType: 'jsonp',
			success: function(json) {
				searchBox.css("transform", "translate(0," + (viewHeight / 2) + "px)");
				info.hide();
				viewList.html("");
				var result = json.query.search;
				for (var i = 0; i < result.length; i++) {
					viewList.append('<a href="https://en.wikipedia.org/wiki/' + result[i].title + '" target="_blank"><li class="list-item"><span class="text--special">' + result[i].title + '</span><p>' + result[i].snippet + '</p></li></a>');
				};
				if (searchBar.val().length < 1) {
					view.stop();
					view.slideUp(500, function() {
						info.show();
					});
					searchBox.css("transform", "translate(0,0)");

					return;
				}

				view.stop();
				view.slideDown(100, function() {
					body.scrollTop(searchBox.offset().top);
				})

			}
		});
	}

});