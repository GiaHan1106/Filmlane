const url = new URL(window.location.href);
const query_string = url.searchParams.get("query");
console.log(query_string);
async function renderSearch() {
    const API_PEOPLE = `${API_LINK}/search/movie?api_key=${API_KEY}&query=${query_string}`;
    let listSearch = document.querySelector(".listmovie .list ");
    let dataSearch = await getData(API_PEOPLE);
    console.log(dataSearch);
    renderListmovie(dataSearch.results, listSearch);
}
renderSearch();
