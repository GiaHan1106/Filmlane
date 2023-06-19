////xu li du lieu
const url = new URL(window.location.href);
const type = url.searchParams.get("page");
let page = 1;
async function renderPeople(page) {
    const API_PEOPLE = `${API_LINK}/person/popular?api_key=${API_KEY}&page=${[page]}`;
    let listPeople = document.querySelector(".listPeople .list ");
    let dataPeople = await getData(API_PEOPLE);
    dataPeople.results.forEach((element) => {
        listPeople.innerHTML += `<a href="detail-people.html?id=${element.id}" class="actor">
                                        <img src="https://image.tmdb.org/t/p/w500/${element.profile_path}" alt="" />
                                        <h1> ${element.name}</h1>
                                        <p class="popularity"><i class="fa-solid fa-star"></i> Popularity :${element.popularity}</p>
                                  </a>`;
    });
}
renderPeople();
let show = document.querySelector(".show .show-more ");
show.addEventListener("click", async function () {
    page += 1;
    await renderPeople(page);
});
