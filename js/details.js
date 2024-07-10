
var productId ;
var type;
document.addEventListener('DOMContentLoaded', async () => {
    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('productId');
        return productId ;
    }
    function gettypeParams() {
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type');
        return type ;
    }
    type = gettypeParams()
    productId  = getQueryParams();
    console.log(productId)
    const imagePoster = document.getElementById('image-poster');
    
    const API_URL = `https://api.themoviedb.org/3/${type}/${productId}?api_key=f1aca93e54807386df3f6972a5c33b50`;
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const movieData = await response.json();
        displayMovieDetails(movieData);
    } catch (error) {
        console.error('There was an error fetching the movie data:', error);
    }
    
    function displayMovieDetails(movie) {
        const movieRating = document.createElement('p');
        movieRating.textContent = `Rating: ${movie.vote_average}`;
        

        imagePoster.src=`https://image.tmdb.org/t/p/w500${movie.poster_path}`
        document.getElementById('title').innerHTML = `${movie.title} <span class="tag release_date">${movie.release_date}</span>`;
        document.getElementById('tagline').innerHTML = movie.tagline;
        document.getElementById('genres')
        document.getElementById('overview').innerHTML = `<p>${movie.overview}</p>`
        document.getElementById("runtime").innerHTML=convertMinutesToHoursAndMinutes(movie.runtime)
        document.getElementById("percentage").innerHTML=convertRatingValueToPercent(movie.vote_average)
        document.getElementById("header_poster").style.cssText = `background-image: url(https://image.tmdb.org/t/p/w500${movie.backdrop_path});width: 100%;background-repeat: no-repeat;background-size: cover;`;


        var cartoon ='';
        movie.production_companies.forEach(company => {
            if(company.logo_path != null){
                cartoon +=`<div class="m-2">
                <img src="https://image.tmdb.org/t/p/w500${company.logo_path}" alt="${company.origin_country}" style="width:80px; height: 80px; border-radius: 50%;">
                <p>${company.name}</p>
                <p class="character">${company.origin_country}</p>
            </div>`
            }else{
                cartoon +=`<div class="m-2">
                <p>${company.name}</p>
                <p class="character">${company.origin_country}</p>
            </div>`
            }
        });    
        document.getElementById('company').innerHTML = cartoon;
    }
});

function convertRatingValueToPercent(rate){
    const avarage = Math.trunc(rate * 10);
    return avarage
}

function convertMinutesToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} h ${remainingMinutes} m`;
}

// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjdlMmU1N2EyYjhjYzhiNGY0NmI1NDkzOWRkNzM3MCIsInN1YiI6IjY2NjVmOWU5ZGFjYTQzZjFiNmJlNWM4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eyWgBsdYuNFsq7a75vKANHpk6cMV63a71vWv7gZp6WA'
        }
    };

    fetch(`https://api.themoviedb.org/3/${type}/${productId}/reviews?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => displayReviews(response))
        .catch(err => console.error(err));


    function displayReviews(response){
    var cartoon='';
    console.log(response.results.length)
    if(response.results.length == 0){
        document.getElementById("reviewHidden").style.cssText="display:none";
    }
    else{
        response.results.forEach(review => {
            const date = new Date(review.created_at);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

            if(!cartoon){
                cartoon+=`
                <div class="carousel-item active" >
                    <div class="card">
                        <div class="grouped d-flex">
                            <div class="avatar p-3">
                            <a href="${review.url}">
                                <img loading="lazy" class="avatar" src="https://media.themoviedb.org/t/p/w45_and_h45_face/${review.author_details.avatar_path}" alt="CinemaSerf">
                            </a>
                            </div>
                            <div class="info">
                                <h3>A review by ${review.author}</h3>
                                <div class="d-flex">
                                    <div class="rating_border rating"><span class="glyphicons_v2 star invert svg"></span>${review.author_details.rating}0<span class="percent pe-2">%</span></div>
                                    <h5>Written by ${review.author} on ${formattedDate}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="teaser">
                        <p>${review.content}</p>
                    </div>
                </div>   
                `;
            }else{
                cartoon+=`
                <div class="carousel-item" >
                    <div class="card">
                        <div class="grouped d-flex">
                            <div class="avatar p-3">
                                <img loading="lazy" class="avatar" src="https://media.themoviedb.org/t/p/w45_and_h45_face/${review.author_details.avatar_path}" alt="CinemaSerf">
                            </div>
                            <div class="info">
                                <h3>A review by ${review.author}</h3>
                                <div class="d-flex">
                                    <div class="rating_border rating"><span class="glyphicons_v2 star invert svg"></span>${review.author_details.rating}0<span class="percent pe-2">%</span></div>
                                    <h5>Written by ${review.author} on ${formattedDate}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="teaser">
                        <p>${review.content}</p>
                    </div>
                </div>  
                `
            }
        })
    }
    document.getElementById("inner").innerHTML=cartoon;

    }
    
});

// -----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const productId = urlParams.get('productId');

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjdlMmU1N2EyYjhjYzhiNGY0NmI1NDkzOWRkNzM3MCIsInN1YiI6IjY2NjVmOWU5ZGFjYTQzZjFiNmJlNWM4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eyWgBsdYuNFsq7a75vKANHpk6cMV63a71vWv7gZp6WA'
        }
    };
    
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${productId}/videos?language=en-US`, options);
        const data = await response.json();
        displayVideo(data);
    } catch (error) {
        console.error('Error fetching video data:', error);
    }

    function displayVideo(response) {
        let cartoon = '';
        if (response.results.length === 0) {
            document.getElementById("media_panel").style.display = "none";
        } else {
            response.results.forEach(video => {
                cartoon += `
                    <div class="video card no_border">
                        <iframe src="https://www.youtube.com/embed/${video.key}" allowfullscreen></iframe>
                    </div>
                `;
            });
            document.getElementById("media").innerHTML = cartoon;
        }
    }
});



// ---------------------------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjdlMmU1N2EyYjhjYzhiNGY0NmI1NDkzOWRkNzM3MCIsInN1YiI6IjY2NjVmOWU5ZGFjYTQzZjFiNmJlNWM4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eyWgBsdYuNFsq7a75vKANHpk6cMV63a71vWv7gZp6WA'
        }
    };

    fetch(`https://api.themoviedb.org/3/${type}/${productId}/recommendations?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => displayrecommendation(response))
        .catch(err => console.error(err));


    function displayrecommendation(response){
    var cartoon='';
    if(response.results.length == 0){
        document.getElementById("media_panel").style.cssText="display:none";
    }
    else{
        response.results.forEach(recommend => {
            cartoon+=`
            <div class="video card no_border">
                <button onclick="sendData(${recommend.id},'${type}')">
                    <img src="https://image.tmdb.org/t/p/w500${recommend.backdrop_path}" alt="${recommend.title}" style="width:100%;height:100%;">
                </button>
            </div>
            `
        })
        document.getElementById("recommendation_scroller").innerHTML=cartoon
    }

    }
});

function sendData(id,type){
    window.location.href = `details.html?productId=${id}&type=${type}`;

}