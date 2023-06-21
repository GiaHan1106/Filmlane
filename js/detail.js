const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const type = url.searchParams.get("type");

//xu li detail phim
async function renderDetailFilm() {
    const API_DETAIL = `${API_LINK}/${type}/${id}?api_key=${API_KEY}`;
    let dataDetail = await getData(API_DETAIL);
    let banner = document.querySelector(".detail");
    let findTralier = await renderTralier();
    banner.style.backgroundImage = `linear-gradient(to top, rgba(17, 29, 29, 0.93), rgba(17, 29, 29, 0.93)) ,url(https://image.tmdb.org/t/p/w500/${dataDetail.backdrop_path})`;
    banner.innerHTML = ` <div class="container align-item">
                              <div class="left-banner">
                                   <img src="https://image.tmdb.org/t/p/w500/${dataDetail.poster_path}" alt="" />
                              </div>
                              <div class="right-banner">
                                   <h1>${dataDetail.title ? dataDetail.title : dataDetail.original_name}</h1>
                                   <div class="yearPro align-item">
                                         <p class="year">${dataDetail.release_date ? dataDetail.release_date : dataDetail.first_air_date}</p>
                                         <p class="kind">${dataDetail.genres.map((genre) => genre.name).join(",")}</p>
                                         <p class="time"><i class="fa-regular fa-clock"></i> ${dataDetail.runtime ? dataDetail.runtime : dataDetail.number_of_episodes} min</p>
                                   </div>
                                   <div class="rate align-item">
                                         <p class="number-rate">${dataDetail.vote_average}%</p>
                                         <p class="user">user score</p>
                                         ${findTralier ? `<p onclick="displayPopup()" class="playtrailer"><i class="fa-solid fa-play"></i> Play trailer</p>` : ""}
                                   </div>
                                   <h3>${dataDetail.tagline}</h3>
                                  ${dataDetail.overview ? ` <h2>Overview</h2>` : ""}
                                   <p class="overview">${dataDetail.overview}</p>
                              </div>
                         </div>`;
}
renderDetailFilm();

// actor
async function displayActor() {
    const API_ACTOR = `${API_LINK}/${type}/${id}/credits?api_key=${API_KEY}`;
    let dataActor = await getData(API_ACTOR);

    let actor = document.querySelector(".listactors .thumb-actor");
    dataActor.cast.forEach((element) => {
        actor.innerHTML += `<a href="detail-people.html?id=${element.id}" class="actor">
                                        <img src="https://image.tmdb.org/t/p/w500/${element.profile_path}" alt="" />
                                        <h1>${element.original_name}</h1>
                                        <p class="name-actors">${element.character}</p>
                                  </a>`;
    });
}
displayActor();

//popup tralier
let traliervideo = document.querySelector(".traliervideo");
let popup = document.querySelector(".popup");
let closeX = document.querySelector(".faX ");
let backgroundBlack = document.querySelector("body ");
async function displayPopup() {
    popup.classList.add("active");
    let findTralier = await renderTralier();
    traliervideo.innerHTML = ` <iframe
    width="100%"
    height="500px"
    src="https://www.youtube.com/embed/${findTralier.key}?autoplay=1"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
></iframe>`;
}
closeX.addEventListener("click", function () {
    popup.classList.remove("active");
    traliervideo.innerHTML = "";
});
popup.addEventListener("click", function (e) {
    if (e.target == e.currentTarget) {
        popup.classList.remove("active");
        traliervideo.innerHTML = "";
    }
});

//Tralier
async function renderTralier() {
    const API_TRALIER = `${API_LINK}/${type}/${id}/videos?api_key=${API_KEY} `;
    let dataTralier = await getData(API_TRALIER);
    let findTralier = dataTralier.results.find((element) => element.type === "Trailer");
    return findTralier;
}
//review
async function renderReView() {
    const API_REVIEW = `${API_LINK}/${type}/${id}/reviews?api_key=${API_KEY}`;
    let dataReview = await getData(API_REVIEW);
    let listReview = document.querySelector(".review  ");
    let review = document.querySelector(".review .reviewer ");
    if (dataReview.results == "") {
        listReview.innerHTML = "";
    }
    dataReview.results.forEach((rev) => {
        review.innerHTML += `
        <div class="feedpeople"> 
        <div class="picture">
        <img src="${rev.author_details.avatar_path.substr(1)}" alt="" />
    </div>
    <div class="text-review">
        <h2>A review by  ${rev.author}</h2>
        <p class="date-written">Written by ${rev.author_details.username} on ${rev.updated_at} </p>
        <p class="text-feed">
        ${rev.content}
        </p>
        <span onclick="showMore(event)" class="showmore" >Show more</span>
    </div>
        </div>
        `;
    });
}
renderReView();
//function showmore
function showMore(event) {
    let parent = event.target.parentElement;
    parent.querySelector(".text-feed").classList.toggle("active");
    event.target.innerHTML = event.target.innerHTML == "Show more" ? "hide" : "Show more";
}
