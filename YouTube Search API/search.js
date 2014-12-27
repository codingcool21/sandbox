var searchResults = {};

function SearchResult() {
    //return searchResults;
    this.setVideoID = function (video_id) {
        this.VideoID = video_id;
    }
    this.setVideoName = function (video_name) {
        this.VideoName = video_name;
    }
    this.objectAsHTML = function () {
        var htmlstring = '<div class="search-result" data-youtube-video-id="' + this.VideoID + '">' + '<a href="#" data-link="../YouTube%20in%20JWPlayer/index.html?video_id=' + this.VideoID + '" onclick="openLinkInNewTab(this)">' + this.VideoName + '</a></div>';
        return htmlstring;
    }
}

function googleApiClientReady() {
    // Ask fro the API Key
    var key = prompt("Enter the Google API Key");
    // Set the Google API Client with an API key
    gapi.client.setApiKey(key);
    // Load the Javascript API (v3)
    gapi.client.load("youtube", "v3").then(handleAPILoaded(), function (e) {
        alert("Error: " + e);
    });
}
// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet',
        maxResults: 15
    });
    $("#search-container").html("&nbsp;");
    request.execute(function (response) {
        //$('<p>' + JSON.stringify(response) + '</p>').appendTo("body");
        for (var i = 0; i < response.items.length; i++) {
            searchResults["video_" + i] = new SearchResult();
            searchResults["video_" + i].setVideoID(response.items[i].id.videoId);
            searchResults["video_" + i].setVideoName(response.items[i].snippet.title);
            $(searchResults["video_" + i].objectAsHTML()).appendTo("#search-container");
            //$().appendTo("body");
        }
    });
    window.result = request;
}
//window.setTimeout(googleApiClientReady(), 1500);
function openLinkInNewTab(object) {
    window.open($(object).attr("data-link"));
}