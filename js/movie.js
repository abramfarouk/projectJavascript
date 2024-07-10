
// aside toggle
let ImgIcon =document.getElementById("imgIcon");
let cardIcon= document.getElementById("card-body-icon");
// window scroll
let btn = document.getElementById('btn');
// search
let search =document.getElementById("btnsearch")


// aside sort 
ImgIcon.addEventListener("click",function(){
  cardIcon.classList.toggle("d-none")

});



function sendData(id,type){
  window.location.href = `details.html?productId=${id}&type=${type}`;

}

// up scroll

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
let currentPage = 1;
let currentSortBy = 'popularity.desc';

// Get Data
async function fetchData(page, sortBy) {
   let url ;

  url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=${sortBy}`;

  const response = await fetch(url, options);
  const data = await response.json();
  return data.results;
}

// Display movie card 
function DisplayCards(results,bool) {

  console.log(results)

  const rowcard = document.getElementById("cardRow");
  if(bool==true){
    rowcard.innerHTML =""

  }
  results.forEach(result => {
    if(result.poster_path != null && result.name !=undefined && result.first_air_date !=null ){
    rowcard.innerHTML+= `
      <div class="col mb-4">
      <button onclick="sendData(${result.id},'movie')" style="border:none ; background:none;">
        <div class="card box" style="width: 195.66px; height:420px">
          <a href="#"><img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="card-img-top" alt="${result.id}"></a>
          <a href="#" class="ellips"><i class="fa-solid fa-ellipsis text-white"></i></a>
          <div class="progress-circle">
            <div class="progress-value">${Math.round(result.vote_average * 10)}%</div>
          </div>
          <div class="card-body">
            <h5 class="card-title">${result.name}</h5>
            <time datetime="${result.first_air_date}" class="card-text">${result.first_air_date}</time>
          </div>
        </div>
        </button>
      </div>
    `;
    }
  });
}


// Search by movie 
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
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

 document.getElementById('submitForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const query2 = document.getElementById('searchQuery').value;

  var bool = true ; 

  const results = await fetchDataSearch(query2);
  console.log(results)
  DisplayCards(results,bool);
  
  console.log(query2);
});

//Load movie initialData

async function loadInitialData() {
  var bool = false ; 

  const results = await fetchData(currentPage, currentSortBy);
  document.getElementById("cardRow").innerHTML = ''; 
  DisplayCards(results,bool);
}

document.addEventListener("DOMContentLoaded", loadInitialData);



// Load more movie 
document.getElementById("loadMore").addEventListener("click", async () => {
  currentPage++;
   results = await fetchData(currentPage, currentSortBy);
  DisplayCards(results);
});


// sort movie 
document.getElementById("sortSelect").addEventListener("change", async (event) => {
    currentSortBy = event.target.value;
    currentPage = 1;
 
  await loadInitialData();
});
