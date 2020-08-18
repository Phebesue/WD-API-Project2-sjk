/* API Documentation: https://www.ravelry.com/api

https://www.ravelry.com/pro/sjk-designs/apps

Basic Auth, read only	
Username:	read-2f06b24845ed13cb0af829b2874b237c	
Password:	L58H6mGz5AN2y/qozzwXYVNls2AlKrSy/9sdJd/U
----------------------
Basic Auth, read only	
Username:	read-e8e5ddc0623eff9799657eeee776c596	
Password:	gG/JEc/9GIZbW2XSGomyOZ/Q7AsV1QwbvioCDCJD	

Basic Auth, personal	
Username:	b047c350991e823b4b0a5e44f1957bee	 
full access to phebesue75	mFqEQWo6VXaNQ-o9vJrvJLP6C9yl5BtrPlUxwv_Y	
*/

/* globals RavelryApi */
/* Not really sure about this code block...
RavelryApi = function(base, authUsername, authPassword) {
    this.base = base;
    this.authUsername2 = authUsername;
    this.authPassword2 = authPassword;
    this.debugFunction = null;
  };*/
let authUsername1 = "read-2f06b24845ed13cb0af829b2874b237c";
let authUsername2 = "read-e8e5ddc0623eff9799657eeee776c596";
let authUsername3 = "b047c350991e823b4b0a5e44f1957bee";
let authPassword1 = "L58H6mGz5AN2y/qozzwXYVNls2AlKrSy/9sdJd/U";
let authPassword2 = "gG/JEc/9GIZbW2XSGomyOZ/Q7AsV1QwbvioCDCJD";
let authPassword3 = "mFqEQWo6VXaNQ-o9vJrvJLP6C9yl5BtrPlUxwv_Y";

// let url = "https://api.ravelry.com/color_families.json"
let url = "https://api.ravelry.com/people/phebesue75/library/search.json";
let username = "phebesue75";

let rApiGet = async function (url) {
  const headers = new Headers();
  const debugFunction = this.debugFunction;
  // This is the HTTP header that you need add in order to access api.ravelry.com with a read only API key
  // `btoa` will base 64 encode a string: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding

  // headers.append('Authorization', 'Basic ' + btoa(this.authUsername + ":" + this.authPassword));

  headers.append(
    "Authorization",
    "Basic " + btoa(authUsername3 + ":" + authPassword3)
  );
  // console.log(headers);

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
  let libraryDiv = document.getElementById("library");
  // let Heading = document.getElementById("library");
  let pageWrapper = document.createElement("div");
  // let libraryCount = document.createElement("h2");
  // let pages = passedData.paginator;
  let items = passedData.volumes;
  // libraryCount.innerText = pages.page_count;
  // console.log(libraryCount);
  // libraryDiv.appendChild(pageWrapper);
  // pageWrapper.appendChild(libraryCount);
  // libraryCount.textContent = `Page Count:  ${pages.page_count}`;
  
  items.forEach((element) => {
    console.log(element);
    
    let box = document.createElement("div");
    let img = document.createElement("img");
    let title = document.createElement("h5");
    let dateAdd = document.createElement("p");
    libraryDiv.appendChild(box);
    box.append(img);
    box.append(title);
    box.append(dateAdd);
    box.classList.add("library-item");
    box.classList.add("card");
    // pageWrapper.classList.add("pageWrapper");
    dateAdd.classList.add("library-added");
    dateAdd.classList.add("card-text");
    img.classList.add("library-img");
    img.classList.add("card-img-top");
    title.classList.add("item-title");
    title.classList.add("card-title");
    img.src = element.square_image_url;
    title.innerText= element.title;
    dateAdd.innerText = element.created_at;
  });
}

// 1: {created_at: "2019/12/13 10:28:45 -0500", id: 307217190, pattern_id: 987222, pattern_source_id: null, updated_at: "2019/12/13 10:28:45 -0500", …}

//   RavelryApi.prototype.get = function(url) {
// RavelryApi.prototype.get = async function(url)

// Retrieve a list of projects for a user: https://www.ravelry.com/api#projects_list
// Pagination is optional, default is no pagination

// RavelryApi.prototype.projectsList = function(username, page) {
//   rApiGet.prototype.projectsList = function(username, page) {
//   const pageSize = 25;
//   const url = this.base + '/projects/' + username + '/list.json?page=' + page + '&page_size=' + pageSize;
//   return this.get(url);
// };
