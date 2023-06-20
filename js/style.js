//khai bao dinh dang API
const API_KEY = "e9e9d8da18ae29fc430845952232787c";
const API_LINK = "https://api.themoviedb.org/3/";

//RENDER HEADER
function renderHeader() {
    const header = document.querySelector(".header");
    header.innerHTML = `<div class="container align-item">
    <a class="logo" href="index.html"> <img src="img/logo.svg" alt="" /></a>
    <div class="menu">
        <ul>
            <li><a href="index.html">HOME</a></li>
            <li><a href="list-movie.html?type=movie" id="movie">MOVIES</a></li>
            <li><a href="list-movie.html?type=tv" id="tvshow">TV SHOWS</a></li>
            <li><a href="people.html?page=1">PEOPLE</a></li>
            <li>
                <a href="javascript:;">GENRE</a>
                <ul class="submenu"></ul>
            </li>
        </ul>
    </div>
    <div class="search">
        <input type="text" placeholder="Search for a movie, tv show" />
        <i class="fa-solid fa-magnifying-glass"></i>
    </div>
    <div class="icon"><i class="fa-solid fa-bars-staggered"></i></div>
</div>`;
}
renderHeader();
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

let genreLi = document.querySelector(".header .menu ul li:last-child ");
let submenu = document.querySelector(".header .menu ul li ul ");
genreLi.addEventListener("click", function () {
    submenu.classList.toggle("active");
});
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
//genre
let genre = document.querySelector(".header .menu ul li ul");
async function renderGenre() {
    let API_GENRE = `${API_LINK}/genre/movie/list?api_key=${API_KEY}`;
    let promise = await fetch(API_GENRE);
    let dataGenre = await promise.json();
    dataGenre.genres.forEach((element) => {
        genre.innerHTML += `<li><a href="detailGenre.html?genre=${element.name}&id=${element.id}"> ${element.name}</a></li>`;
    });
}
renderGenre();
