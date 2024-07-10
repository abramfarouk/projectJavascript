
document.addEventListener('DOMContentLoaded', async () => {
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('productId');
    return productId ;

  }
  console.log(window.location)
  let searchIn = getQueryParams()
  console.log(searchIn)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmEwNzYzZmE3MWEwZjNhZjA0NWFhNDcxZWYxNDUzMCIsInN1YiI6IjY2NmQ3NDZmMGY2Zjc2MzFlYmE4N2RlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.klgdn-HkLV4l8eWSwpaCX7SzAVEyeX5kVweEaSG20rM'
    }
  };
  
  

  fetch(`https://api.themoviedb.org/3/search/movie?query=${searchIn}&include_adult=false&language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => {
    console.log(response) 
    const cars = document.getElementById('sr4');
    response.results.forEach((movie, index) => {
      const isActive = index === 0 ? 'active' : '';
      const movieCard = `
        <div class="card mb-3">
                    <button onclick="mvPage(${movie.id},'movie')" style="background:none; border:none"> 
                      <div class="row no-gutters">
                          <div class="col-md-3" style="height:200px">
                              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img" alt="..." style="height:100%; width:100%">
                          </div>
                          <div class="col-md-9">
                              <div class="card-body">
                                  <h5 class="card-title">${movie.title}</h5>
                                  <p class="card-text"><small class="text-muted"> ${movie.overview}</small></p>
                                  <p class="card-text"></p>
                              </div>
                          </div>
                      </div>
                    </button>  
          </div>`;
      cars.insertAdjacentHTML('beforeend', movieCard);
    });
  
    
  })
  .catch(err => console.error(err))

})

function mvPage(id , type){
  window.location.href = `Details.html?productId=${id}&type=${type}`;
}
