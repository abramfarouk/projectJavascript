
let cardIcon= document.getElementById("card-body-icon");

let search =document.getElementById("btnsearch")


function sendData(id,type){
  window.location.href = `details.html?productId=${id}&type=${type}`;

}

let btn = document.getElementById('btn');

window.onscroll = function(){
  if(window.scrollY >=600){
    btn.style.display ="block";
  }else{
    btn.style.display="none";
  }
}

btn.onclick = function(){
  window.scrollTo({
    top:0,
    left:0,
    behavior:"smooth"
  })
}



const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjdlMmU1N2EyYjhjYzhiNGY0NmI1NDkzOWRkNzM3MCIsInN1YiI6IjY2NjVmOWU5ZGFjYTQzZjFiNmJlNWM4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eyWgBsdYuNFsq7a75vKANHpk6cMV63a71vWv7gZp6WA'
  }
};
let currentPage = 5;
let currentSortBy = 'popularity.desc';


async function fetchData(page, sortBy, query = '') {
   let url ;
  if (query) {
    url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`;
  }else{
  url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=${sortBy}`;

  }
  const response = await fetch(url, options);
  const data = await response.json();
  return data.results;
}


function DisplayCards(results,bool) {

  console.log(results)

  const rowcard = document.getElementById("cardRow");
  if(bool==true){
    rowcard.innerHTML =""

  }
  results.forEach(result => {
    rowcard.innerHTML+= `
      <div class="col mb-4">
      <div class="card box" style="width: 195.66px; height:420px">
      <button onclick="sendData(${result.id},'tv')" style="border:none ; background:none;">
          <a href="#"><img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="card-img-top" alt="${result.id}"></a>
          <a href="#" class="ellips"><i class="fa-solid fa-ellipsis text-white"></i></a>
          <div class="progress-circle">
            <div class="progress-value">${Math.round(result.vote_average * 10)}%</div>
          </div>
          <div class="card-body">
            <h5 class="card-title">${result.name}</h5>
            <time datetime="${result.first_air_date}" class="card-text">${result.first_air_date}</time>
          </div>
          </button>
        </div>
      </div>
    `;
  });
}

 async function fetchDataSearch(query) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTgwMGVmYTUxOTVmNzdmY2Y2M2YwZGE3ZTNlZDU2ZiIsInN1YiI6IjY2NmQ2OGU4MWY0Nzk4N2VlMWE3Y2ViNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHATH9fLcb4mxaCF8yWmlrmXVp1zEkpURykfQMzNEgk'
    }
  };

  const url =`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {

    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}



 document.getElementById('submitForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from submitting the traditional way
  const query2 = document.getElementById('searchQuery').value;

  // Uncomment these lines if you have defined fetchDataSearch and DisplayCards functions
  var bool = true ; 

  const results = await fetchDataSearch(query2);
  console.log(results)
  DisplayCards(results,bool);
  
  console.log(query2);
});

// load web Movies 

async function loadInitialData() {
  var bool = false ; 

  const results = await fetchData(currentPage, currentSortBy);
  document.getElementById("cardRow").innerHTML = ''; // Clear previous results
  DisplayCards(results,bool);
}

document.addEventListener("DOMContentLoaded", loadInitialData);

document.getElementById("loadMore").addEventListener("click", async () => {
  currentPage++;
   results = await fetchData(currentPage, currentSortBy);
  DisplayCards(results);
});

// sort movie 

document.getElementById("sortSelect").addEventListener("change", async (event) => {
    currentSortBy = event.target.value;
    currentPage = 1; // Reset to first page
 
  await loadInitialData();
});








