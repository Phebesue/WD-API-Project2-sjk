/* API Documentation: https://www.ravelry.com/api
*/

let authUsername3 = "b047c350991e823b4b0a5e44f1957bee";

let authPassword3 = "mFqEQWo6VXaNQ-o9vJrvJLP6C9yl5BtrPlUxwv_Y";
let username = "phebesue75";

let url = `https://api.ravelry.com/people/${username}/library/search.json`;
// console.log(url);
let rApiGet = async function (url) {
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

  if (debugFunction) debugFunction(json);
  return json;
  displayData(json);
};
let r = rApiGet(url).then((res) => {
  displayData(res);
});

function displayData(passedData) {
  console.log(passedData);
  let libraryDiv = document.getElementById("library");

  let pageWrapper = document.createElement("div");

  let items = passedData.volumes;

  items.forEach((element) => {
    // console.log(element);

    let box = document.createElement("div");
    let inner = document.createElement("div"); /*Flip-card*/
    let front = document.createElement("div"); /*Flip-card*/
    let img = document.createElement("img");
    let body = document.createElement("div");
    let title = document.createElement("h5");
    let author = document.createElement("p");
    let dateAdd = document.createElement("p");
    libraryDiv.appendChild(box);
        body.append(title);
    body.append(author);
        box.classList.add("library-item");
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
}
