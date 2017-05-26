
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
    });

    return false;
}

$('#form-container').submit(loadData);
