## Quiz: NYT Implementation

1. Load Google Street View
1. Load NYT Articles

### Quiz: Loading Streetview
Google Streetview image requests must include the **size and location** parameters.

In the video, Cameron adds the concatenated **streetStr and cityStr** values to the string: ```http://maps.googleapis.com/maps/api/streetview?size=600x300&location=```
to create a complete image request that includes the required parameters.


Learn how to collect **<input>** values with jQuery [here](http://api.jquery.com/val/).

Interested in diving into the Google Street View API? Check out its [documentation](https://developers.google.com/maps/documentation/streetview/).

### Quiz: NYT API Key

[Request a NY Times API Key](http://developer.nytimes.com/)

[The NYT article search API](http://developer.nytimes.com/article_search_v2.json)

---
### Load google streetview
```
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


```
---
### NYT API
```
// Built by LucyBot. www.lucybot.com
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
    'sort': "newest",
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

    //load NYTimes articles
    $.getJSON(url, function(data){
    $nytHeaderElem.text('New York Times Article About'+cityStr);
    articles = data.response.docs;
    for (var i=0; i < articles.length; i++){
        var article = articles[i];
        $nytElem.append('<li class = "article">'+'<a href="'+ article.web_url+'">'+article.headline.main+'</a>'+
        '<p>' + article.snippet + '</p>'+
        '</li>');
    }
});
```
---
### Wikipedia API
```
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
});
```
---
### Error Handling With JSON P
```
var wikiFail = setTimeout(function(){
    $wikiElem.text("Failed to get Wikipedia resources");
}, 8000);

//stop timeout from happening
clearTimeout(wikiFail);
```
---
### Debugging
```

```
