// get search text from url
var matches = location.href.match(/search=([^&]+)/);
var search_text = matches ? matches[1] : "";

// store dom
var $searchOutter = $(".search-list");
var $list = $(".search-list li");

// collect all links to Array
var links = $list.map(function(i){
	return {
		idx : i,
		title : $(this).find("a").text(),
		categories : $(this).find(".categories").text(),
		tags : $(this).find(".tags").text()
	}
});

var options = {
	keys : ['title'],
	id : 'idx'
};

$("#searchForm .menu-search-field").on('keyup', function(){
	var search_text = $(this).val();
	filterLinks(search_text);
});

$("#searchForm").submit(function(event){
	if($(this).find(":text[name=search]").val() == "") {
		event.preventDefault();
	}
});

// fill input with search text
$("#searchForm").find(":text[name=search]").val(search_text);

// first filter
filterLinks(search_text);

function filterLinks (text){
	if (text == ''){
		$list.show();
		return;
	}
	var f = new Fuse(links, options);
	var result = f.search(text);
	$list.detach().hide();
	for (var i = 0, len = result.length; i<len; i++){
		$list.eq(result[i]).show();
	}
	$list.appendTo($searchOutter)
}