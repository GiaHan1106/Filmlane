//xu li du lieu
const url = new URL(window.location.href);
const type = url.searchParams.get("type");
const title = document.querySelector(".banner-2 h1");
title.innerHTML = type == "movie" ? "Movie" : "TV Show";
let page = 1;
async function renderList(page) {
    const API_LIST = `${API_LINK}discover/${type}?api_key=${API_KEY}&page=${page}`;
    let dataList = await getData(API_LIST);
    let listmovie = document.querySelector(".listmovie .list");
    renderListmovie(dataList.results, listmovie);
}
renderList();
let show = document.querySelector(".show .show-more ");
show.addEventListener("click", async function () {
    page += 1;
    await renderList(page);
});
