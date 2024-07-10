
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjdlMmU1N2EyYjhjYzhiNGY0NmI1NDkzOWRkNzM3MCIsInN1YiI6IjY2NjVmOWU5ZGFjYTQzZjFiNmJlNWM4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eyWgBsdYuNFsq7a75vKANHpk6cMV63a71vWv7gZp6WA'
    }
  };
  
  ////////// MOVIE CARDS redirection \\\\\\\\\\\
  function mvPage(id , type){
    window.location.href = `details.html?productId=${id}&type=${type}`;
    console.log(id)
  }
  

  /////// display movie cards \\\\\\\
  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => {
      const cars = document.getElementById('cars');
      response.results.forEach((movie, index) => {
        const isActive = index === 0 ? 'active' : '';
        const movieCard = `
        
          <div class="carousel-item ${isActive}" >
          
            <div class="col-md-2" >
              <button onclick="mvPage(${movie.id},'movie')" style="background:none; border:none" >
              <div class="card card-body" style="height:400px">
                <div>
                  <img class="img-fluid crd-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.name}">
                  <h5 class="card-title">${movie.title}</h5> 
                </div>

                 <div style="margin-top:10px">
                    <i class="fa-solid fa-star fa-fade" style="color: #FFD43B;"></i>
                    <span> Rating: ${movie.vote_average} </span>
                    <p class="card-text" >${new Date(movie.release_date).toLocaleDateString(undefined,{year:'numeric',month:'long'})}</p>
                 </div>
                
              </div>
              </button>
            </div>
        </div>
        `;
        cars.insertAdjacentHTML('beforeend', movieCard);
      });
      
     

      // Clone items for multi-item per slide carousel
      const items = document.querySelectorAll('.carousel .carousel-item');
      items.forEach((el) => {
        const minPerSlide = 6;
        let next = el.nextElementSibling;
        for (let i = 1; i < minPerSlide; i++) {
          if (!next) {
            next = items[0];
          }
          const cloneChild = next.cloneNode(true).children[0];
          el.appendChild(cloneChild);
          next = next.nextElementSibling;
        }
      });
      
      //////////// initialize Bootstrap Carousel \\\\\\\\\\\\\\
      new bootstrap.Carousel(document.querySelector('#myCarousel'), {
        interval: 5000
      });
    })
    .catch(err => console.error(err))



    /////////// TV SHOWS CARDS \\\\\\\\\\
    fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      const cars2 = document.getElementById('cars2');
      response.results.forEach((movie, index) => {
        const isActive = index === 0 ? 'active' : '';
        const movieCard2 = `
          <div id="curs2" class="carousel-item ${isActive}">
            <div class="col-md-2">
              <button onclick="mvPage(${movie.id},'tv')" style="background:none; border:none" >
              <div class="card card-body" style="height:400px;">
                <div>
                   <img class="img-fluid crd-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.name}">
                   <h5 class="card-title" style="">${movie.name}</h5>
                </div>
                <div style="margin-top:10px">
                    <i class="fa-solid fa-star fa-fade" style="color: #FFD43B;"></i>
                    <span> Rating: ${movie.vote_average} </span>
                    <p class="card-text" >${new Date(movie.first_air_date).toLocaleDateString(undefined,{year:'numeric',month:'long'})}</p>                 </div>

                </div>
              </button>
            </div>
          </div>`;
        cars2.insertAdjacentHTML('beforeend', movieCard2);
      });

      // Clone items for multi-item per slide carousel
      const items2 = document.querySelectorAll('.carousel #curs2');
      items2.forEach((el2) => {
        const minPerSlide2 = 6;
        let next2 = el2.nextElementSibling;
        for (let i = 1; i < minPerSlide2; i++) {
          if (!next2) {
            next2 = items2[0];
          }
          const cloneChild = next2.cloneNode(true).children[0];
          el2.appendChild(cloneChild);
          next2 = next2.nextElementSibling;
        }
      });
      
      /////////////// initialize Bootstrap Carousel \\\\\\\\\\\\\\\
      new bootstrap2.Carousel(document.querySelector('#myCarousel2'), {
        interval: 5000
      });
    })
    .catch(err => console.error(err))
    


    ////////////////////////// Search input \\\\\\\\\\\\\\\\\\\\\
    document.getElementById('searchForm').addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission

      const query = document.getElementById('search-input').value;

      if (query.length > 1) { // Start searching after 2 characters


          // Redirect to another page with the query
          window.location.href = `search.html?productId=${query}`;
      } else {
          document.getElementById('results').innerHTML = '';
      }
  });
 