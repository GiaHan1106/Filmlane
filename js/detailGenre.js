const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const genreTitle = url.searchParams.get("genre");
let page = 1;
async function renderListGen(page) {
    const API_LIST = `${API_LINK}/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page}`;
    let dataListGen = await getData(API_LIST);
    console.log(dataListGen);
    let listGenre = document.querySelector(".listmovie .list");
    renderListmovie(dataListGen.results, listGenre);
}
renderListGen();
let show = document.querySelector(".show .show-more ");
show.addEventListener("click", async function () {
    page += 1;
    await renderListGen(page);
});

document.querySelector(".banner-2 h1").innerHTML = genreTitle;
