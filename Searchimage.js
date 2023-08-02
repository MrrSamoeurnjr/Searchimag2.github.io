const imageWrapper = document.querySelector(".images");
const loadmoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightbox = document.querySelector(".lightbox");
console.log(lightbox )
const apiKey = "YYxsQsCkR6NBVrTcOXbAmBO62vKClJXMN73PuBHBIfsmbmiDa7MYlILu" ;
const perPage = 15;
let currenPage = 1;
let searchTerm = null;
const downloadImg = (imgURL) => {
    fetch(imgURL).then(res => res.blob()).then(fill => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(fill);
        a.download  = new Date().getTime();
        a.click();
        console.log(fill)
    }).catch(()=> alert("Fialed to download image!"))
    console.log(imgURL);
}
const showLightbox = () => {
    lightbox.classList.add("show")
}
const generateHTML = (images ) => {
    imageWrapper.innerHTML+=images.map(img => 
        `<li class="card" onclick="showLightbox()">
        <img src="${img.src.large2x}" alt="img">
        <div class="details">
            <div class="photographer">
                <i class="uil uil-camera"></i>
                <span>${img.photographer}</span>
            </div>
            <button onclick="downloadImg('${img.src.large2x}')">
                <i class="uil uil-import"></i>
            </button>
        </div>
        </li> `
    ).join("");
}
const getImages = (apiURL) => {
    // Fetching images by API call with authorization header
    loadmoreBtn.innerText = "Loading...";
    loadmoreBtn.classList.add("disabled");
    fetch(apiURL , {
        headers:{Authorization:apiKey}
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos)
        loadmoreBtn.innerText = "Loading...";
        loadmoreBtn.classList.remove("disabled");
        // console.log(data);
    }).catch(()=> alert("Failed to load images!"));
}
const loadMoreImage = () => {
    currenPage++;
    let apiURL = `https://api.pexels.com/v1/curated?page=${currenPage}per_page=${perPage}`;
    apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currenPage}&per_page=${perPage}`: apiKey ;
    getImages(apiURL);
}
const loadSearchInput = (e) => {
    if(e.target.value === "") {
        return searchTerm = null;
    }
    if(e.key === "s") {
        currenPage = 1;
        searchTerm = e.target.value;
        imageWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currenPage}&per_page=${perPage}`);
        console.log("Enter key pressed")
    }
}
loadmoreBtn.addEventListener("click",loadMoreImage);
searchInput.addEventListener("keyup",loadSearchInput);
getImages(`https://api.pexels.com/v1/curated?page=${currenPage}per_page=${perPage}`);