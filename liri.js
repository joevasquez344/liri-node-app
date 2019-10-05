var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require('inquirer');
var Spotify = require('node-spotify-api');
var axios = require('axios')
var fs = require('fs')

var command = process.argv[2];
var value = process.argv[3];

var movieGenerator = function () {
    axios.get('http://www.omdbapi.com/?t=' + value + '&y=&plot=short&apikey=trilogy')
        .then(function (response) {
            var movieDivider = '\n--------------------------------------------\n\n'
            // process.argv[3] = response.data;

            console.log(
                movieDivider +
                'Movie Title: ' + response.data.Title + '\n\n' +
                'Release Year: ' + response.data.Year + '\n\n' +
                'IMDB Rating: ' + response.data.imdbRating + '\n\n' +
                'Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value + '\n\n' +
                'Country of Production: ' + response.data.Country + '\n\n' +
                'Language of Movie: ' + response.data.Language + '\n\n' +
                'Plot: ' + response.data.Plot + '\n\n' +
                'Actors: ' + response.data.Actors + '\n\n' +
                movieDivider

            )
        })
}

var spotify = new Spotify(keys.spotify);




var spotify = new Spotify({
    id: 'dc8931026e204a2890b57ef4b1a672b2',
    secret: '47bc7efaa01b436a98eff4243142b977'
});



var songGenerator = function () {
    spotify.search({ type: 'track', query: value, limit: 3 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var divider = '\n---------------\n';
        console.log(
            divider +
            'Artist: ' + data.tracks.items[0].artists[0].name + '\n' +
            'Track: ' + data.tracks.items[0].name + '\n' +
            'Song Preview: ' + data.tracks.items[0].external_urls.spotify + '\n' +
            'Album: ' + data.tracks.items[0].album.name +
            divider

        )


    });
}







if (command === 'spotify-this-song') {
    if (!value) {
        value = 'The Sign'
        songGenerator();
    } else {
        songGenerator();
    }



}

if (!value) {
    fs.readFile('./random.txt', 'UTF8', function (err, data) {
        if (err) throw err;
        var randFile = data.split(',');
        command = randFile[0];
        value = randFile[1];
        songGenerator();

    })



}


// for(var a = 0; a < data.tracks.items.length; a++){
//     console.log(data.tracks.items[a].album)


// }
// ---------------------



// console.log(
// data.tracks.items[0].artists[0].name + divider +
// data.tracks.items[0].name + divider +
// data.tracks.items[0].artists[0].external_urls.spotify


// )



// console.log(data.tracks.items.length)

// for(var i = 0; i < data.tracks.items.length; i++){
//     console.log(data.tracks.items[i].artists)
// }

// for(var j = 0; i < data.tracks.items[i].artists.length; j++){
//     console.log(data.tracks.items[i].artists[j])
// }





// movie api key: 25f92cb7



if (command === 'movie-this') {
    if (!value) {
        value = 'Mr Nobody'
        movieGenerator()
    } else {
        movieGenerator();
    }

}
// if(process.argv[2] === 'movie-this' && process.argv[3] == false) {
//     axios.get('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy')
//         .then(function (response) {
//             console.log(response.data.Title)
//         })
// }

// if (process.argv[3] == 'hello') {
//     axios.get('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy')
//         .then(function (response) {
//             console.log(response)
//         })
// }



// 















