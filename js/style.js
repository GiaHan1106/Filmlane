//XỬ LÝ DOM
window.addEventListener("scroll", function () {
    var header = document.querySelector(".header");
    if (window.pageYOffset > 100) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
});
let bar = document.querySelector(".header .icon");
let menu = document.querySelector(".header .menu");
bar.addEventListener("click", function () {
    menu.classList.toggle("active");
});
//khai bao dinh dang API
const API_KEY = "e9e9d8da18ae29fc430845952232787c";
const API_LINK = "https://api.themoviedb.org/3/";

//Ham render danh sach movie
function renderListmovie(dataResult, boxResult) {
    dataResult.forEach((element) => {
        boxResult.innerHTML += ` <a href="detail.html?id=${element.id}" class="cardmovie">
        <div class="thumb">
            <img src=" https://image.tmdb.org/t/p/w300${element.poster_path}" alt="" />
        </div>
        <h3>${element.original_title ? element.original_title : element.original_name}</h3>
        <div class="number align-item">
            <p class="day">${element.release_date ? element.release_date : element.first_air_date}</p>
            <p class="rate">
                <i class="fa-solid fa-star"></i>
                ${element.vote_average}
            </p>
        </div>
    </a>`;
    });
}

//Fetch data form URL()
async function getData(url) {
    let promise = await fetch(url);
    let data = await promise.json();
    return data;
}

//List danh sach movie theo tung API Link
async function startHome() {
    //NowPlayingMovie
    const apiLinkPlayingMovie = `${API_LINK}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
    let listNowPlayingMovie = document.querySelector("#nowplay");
    let dataPlayingMovie = await getData(apiLinkPlayingMovie);
    renderListmovie(dataPlayingMovie.results, listNowPlayingMovie);
    //UpcomingMovie
    const apilinkUpcoming = `${API_LINK}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1 `;
    let listUpComingMovie = document.querySelector("#upcoming");
    let dataUpcomingMovie = await getData(apilinkUpcoming);
    renderListmovie(dataUpcomingMovie.results, listUpComingMovie);
    //TopRatedMovie
    const apiTopRated = ` ${API_LINK}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
    let listTopRate = document.querySelector("#toprated");
    let dataTopRated = await getData(apiTopRated);
    renderListmovie(dataTopRated.results, listTopRate);

    //tv series
    const apiTvSeri = ` ${API_LINK}tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
    let tvSeries = document.querySelector("#tvseries");
    let dataTvSeri = await getData(apiTvSeri);
    console.log(dataTvSeri);
    renderListmovie(dataTvSeri.results, tvSeries);
}
startHome();

//search
let search = document.querySelector(".header .search i ");
let input = document.querySelector(".header .search input ");
search.addEventListener("click", function () {
    window.location.href = `search.html?query=${input.value}`;
});
input.addEventListener("keydown", function (e) {
    if (e.keyCode == "13") {
        window.location.href = `search.html?query=${input.value}`;
    }
});
