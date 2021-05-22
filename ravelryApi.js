/* API Documentation: https://www.ravelry.com/api
 */
//  *-----Access the DOM-----
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const nav = document.querySelector("nav");

//  *-----Initial Variables-----
let page = 1;
let authUsername3 = "b047c350991e823b4b0a5e44f1957bee";

let authPassword3 = "mFqEQWo6VXaNQ-o9vJrvJLP6C9yl5BtrPlUxwv_Y";
let username = "phebesue75";

let url = `https://api.ravelry.com/people/${username}/library/search.json?page=${page}`;
console.log(url);
console.log(page);


let rApiGet = async (url) => {
  const headers = new Headers();
  const debugFunction = this.debugFunction;
  // This is the HTTP header that you need add in order to access api.ravelry.com with a read only API key
  // `btoa` will base 64 encode a string: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding

  headers.append(
    "Authorization",
    "Basic " + btoa(authUsername3 + ":" + authPassword3)
  );
  const response = await fetch(url, { method: "GET", headers: headers });
  const json = await response.json();
  // console.log(json);
  
  if (debugFunction) debugFunction(json);
  return json;
};

let r = rApiGet(url).then((res) => {
  displayData(res);
});

function displayData(passedData) {
  console.log(passedData);
  let libraryDiv = document.getElementById("library");
  let pageWrapper = document.querySelector(".pages");

  pageWrapper.textContent = `${passedData.paginator.page} of ${passedData.paginator.last_page} pages`;

  while (libraryDiv.firstChild) {
    libraryDiv.removeChild(libraryDiv.firstChild);
  }

  let items = passedData.volumes;
  let i = 0;

  items.forEach((element) => {
    i++;
    // console.log(i, element);

    let box = document.createElement("div");
    let inner = document.createElement("div"); /*Flip-card*/
    let front = document.createElement("div"); /*Flip-card*/
    let img = document.createElement("img");
    let body = document.createElement("div");
    let title = document.createElement("h5");
    let author = document.createElement("p");
    // let dateAdd = document.createElement("p");
    libraryDiv.appendChild(box);
    body.append(title);
    body.append(author);
    box.classList.add("library-item");
    box.classList.add(i);
    img.src = element.square_image_url;

    // -----  Flip Card-----
    libraryDiv.appendChild(box);
    box.appendChild(inner);
    inner.appendChild(front);
    front.appendChild(img);
    inner.appendChild(body);

    box.classList.add("flip-card");
    inner.classList.add("flip-card-inner");
    front.classList.add("flip-card-front");
    body.classList.add("flip-card-back");
    title.classList.add("title");
    // Assigning src to img
    img.src = element.square_image_url;
    // styling img
    img.style.borderRadius = "25px";
    img.alt = "Project Image is Missing";
    // assigning content to elements
    title.innerText = element.title;
    author.textContent = `by:  ${element.author_name}`;
  });

  if (page <= 1) { // tests if pageNumber is 1
    previousBtn.style.display = "none"; //if pageNumber is 1, hide the prevBtn
    if (items.length <= 100) { //tests if there are 100 or less articles
      nav.style.display = "block";
    } else {
      nav.style.display = "none"; //hide nav if there are 100 or less results
    }
  }  else{
      previousBtn.style.display = "block";
    }
}

let nextPage = (e) => {
  page++;
  rApiGet();
  console.log("Page Number:", page);
};

let previousPage = (e) => {
  if (page > 1) {
    page--;
    console.log("Page Number:", page);
  } else {
    return;
  }
  rApiGet();
};
nextBtn.addEventListener("click", nextPage);
previousBtn.addEventListener("click", previousPage);
