const key = "21197675-89d89b676cd181b5296b4c273";
const url = `https://pixabay.com/api/?key=${key}`;
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
let page = 1;
let currentSearch;
let fetchLink;
const more = document.querySelector(".more");
// event listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);
// functions
function updateInput(e){
    searchValue = e.target.value;
}
function clear(){
    gallery.innerHTML = "";
    searchInput.value = "";
    currentSearch = searchValue;
}
// get data from pixabay api
async function fetchApi(url){
    const fetchData = await fetch(url);
    const data = await fetchData.json();
    return data;
};
// add images to html gallery
function generatePhotos(data){
    data.hits.forEach(photo=>{
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("gallery-img");
        imgContainer.innerHTML = `
        <div class="gallery-info">
        <p>Photo by: ${photo.user}</p>
        <a href="${photo.largeImageURL}" target="blank">Download</a>
        </div>
        <img src = ${photo.largeImageURL}></img>
        `;
        gallery.appendChild(imgContainer);
    });
};
// display images in home page
async function getPhotos(){
    fetchLink = url;
    const data = await fetchApi(fetchLink);
    generatePhotos(data);
};
// display searched images
async function searchPhotos(query){
    clear();
    fetchLink = `${url}&q=${query}`;
    const data = await fetchApi(fetchLink);
    generatePhotos(data);
};

async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `${url}&q=${currentSearch}&page=${page}`;
    }else{
        fetchLink = `${url}&page=${page}`
    }
    const data = await fetchApi(fetchLink);
    generatePhotos(data);
}
getPhotos();
