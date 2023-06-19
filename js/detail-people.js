const url = new URL(window.location.href);
const id = url.searchParams.get("id");
let detailPeople = document.querySelector(".peopledetail .left-people");
async function renderDetailPeople() {
    let API_DETAILPEOPLE = `${API_LINK}/person/${id}?api_key=${API_KEY}`;
    let promise = await fetch(API_DETAILPEOPLE);
    let dataDetailPeople = await promise.json();
    detailPeople.innerHTML = ` 
        <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${dataDetailPeople.profile_path}" alt="" />
        <div class="infor-people">
            <h1>Personal Infor</h1>
            <div class="infortext">
                <div class="text">
                    <h2 class="title">Known For :</h2>
                    <p class="titletext">- ${dataDetailPeople.known_for_department}</p>
                </div>
                <div class="text">
                    <h2 class="title">Popularity:</h2>
                    <p class="titletext">- ${dataDetailPeople.popularity}</p>
                </div>
                <div class="text">
                    <h2 class="title">Gender :</h2>
                    <p class="titletext">- ${dataDetailPeople.gender == 1 ? "Nữ" : "Nam"}</p>
                </div>
                <div class="text">
                    <h2 class="title">Birthday :</h2>
                    <p class="titletext">-${dataDetailPeople.birthday} </p>
                </div>
                <div class="text">
                    <h2 class="title">Place of birth :</h2>
                    <p class="titletext">- ${dataDetailPeople.place_of_birth}</p>
                </div>
                <div class="text">
                <h2 class="title">Also Known As:</h2>
                <p class="titletext">- ${dataDetailPeople.also_known_as}</p>
            </div>
            </div>
        </div>`;
    document.querySelector(".peopledetail .list .right-people h1").innerHTML = dataDetailPeople.name;
    document.querySelector(".peopledetail .list .right-people p").innerHTML = dataDetailPeople.biography;
}
renderDetailPeople();

async function renderMovie() {
    let API_MOVIEPEOEPLE = `${API_LINK}/person/${id}/movie_credits?api_key=${API_KEY}`;
    let promise = await fetch(API_MOVIEPEOEPLE);
    let dataMoviePeople = await promise.json();
    let box = document.querySelector(".peopledetail .list .right-people .box");
    console.log(dataMoviePeople);
    renderListmovie(dataMoviePeople.cast, box);
}
renderMovie();
