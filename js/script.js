
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val(); //get the values of form elements such as input, select and textarea
    var fullAddress = street + city;
    // YOUR CODE GOES HERE!
    $greeting.text('Hey, what about living in ' + fullAddress);
    var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + fullAddress + '';
    console.log(streetViewURL);
    $body.append('<img class="bgimg" src="' + streetViewURL + '">');

    // Built by LucyBot. www.lucybot.com
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "252de198f7f04703bb5911d0bb9dc8e7"
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      console.log(result);
    }).fail(function(err) {
      throw err;
    });

    $.getJSON(url, function(data) {
    // do stuff here
        $nytHeaderElem.text('New York Times Articles About' + city);
        articles = data.response.docs;
        for (var i=0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class = "article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+ article.snippet +'</p>'+
            '<li>');
        }

    }).fail(function(err) {
      $nytHeaderElem.text('New York Times Articles could not be loaded');
    });

    //this is for error handling
    var wikiFail = setTimeout(function(){
        $wikiElem.text("Failed to get Wikipedia resources");
    }, 8000);

    //load wiki links
    var wikiLink='http://en.wikipasdedia.org/w/api.php?action=opensearch&search='+city+'&format=json';
    console.log("wikiLink: "+ wikiLink);

    $.ajax({
    url: wikiLink,
    dataType: "jsonp",
    //jsonp: "callback",
    }).done(function(response) {
        var articleList = response[1];

        for (var i = 0 ; i < articleList.length; i++) {
            articleStr = articleList[i];
            var url = "http://en.wikipedia.org/wiki/" + articleStr;
            $wikiElem.append('<li><a href="' + url + '">' + articleStr + "</a></li>");
        }
        //stop timeout from happening
        clearTimeout(wikiFail);
    });

    return false;
}

$('#form-container').submit(loadData);
