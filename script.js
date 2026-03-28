
const categoryDropdown = document.getElementById("category-dropdown");
const addBookmarkButton = document.getElementById("add-bookmark-button"); 
const viewCategoryButton = document.getElementById("view-category-button");
const formSection = document.getElementById(
"form-section"
); 
const mainSection = document.getElementById("main-section");
const categoryName = document.querySelectorAll(".category-name"); 
const closeFormButton = document.getElementById("close-form-button");
const nama = document.getElementById("name"); 
const url = document.getElementById("url");
const addBookmarkButtonForm = document.getElementById("add-bookmark-button-form");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const closeListButton = document.getElementById("close-list-button");
const categoryList = document.getElementById("category-list"); 
const deleteBookmarkButton = document.getElementById("delete-bookmark-button");



function getBookmarks(){
  let currentBookmarks = localStorage.getItem("bookmarks");
  if(!currentBookmarks){
    return [];
  }

  try {
    currentBookmarks = JSON.parse(currentBookmarks);
  } catch (e) {
    return [];
  }

  if (!Array.isArray(currentBookmarks)) {
    return [];
  }

  const isValid = currentBookmarks.every(
    (item) => item !== null && typeof item === "object" && !Array.isArray(item) &&
    typeof item.name === "string" &&
    typeof item.url === "string" &&
    typeof item.category === "string"
  );

  return isValid ? currentBookmarks : [];

}

function saveBookmarks(){
   if (!nama.value || !url.value) {
    alert("Tolong isi nama dan URL!");
    return;
  }
  let arrayBookmarks = getBookmarks(); 
  let bookmarkObject = {}; 
  bookmarkObject["name"] = nama.value; 
  bookmarkObject["category"] = categoryDropdown.value; 
  bookmarkObject["url"] = url.value;
   
  arrayBookmarks.push(bookmarkObject);
  localStorage.setItem("bookmarks", JSON. stringify(arrayBookmarks));
  nama.value = ''; 
  url.value = ''; 
   
  displayOrCloseForm(); 
  console.log(arrayBookmarks)

}

function render(){
    const firstLetter = categoryDropdown.value[0].toUpperCase(); 
  const letter = categoryDropdown.value.slice(1, categoryDropdown.value.length);
  categoryName.forEach(function(item){
    item.textContent = firstLetter + letter;
  })
  
  categoryList.innerHTML = '';
  let text = getBookmarks(); 
  text = text.filter(function(item){
    return item["category"] == categoryDropdown.value;
  })
  if(text.length > 0){text.forEach(function({name, category, url}){
    categoryList.innerHTML += `<div class="bookmark-item">
  <input type="radio" name="${category}" id="${name}" value="${name}">
  
  <label for="${name}">
    <a href="${url}" target="_blank">${name}</a>
  </label>
</div>`
  })}else if(text.length === 0){
    categoryList.innerHTML = "<p>No Bookmarks Found</p>"
  }}


function displayOrCloseForm(){
  formSection.classList.toggle("hidden");
  mainSection.classList.toggle("hidden");
  const firstLetter = categoryDropdown.value[0].toUpperCase(); 
  const letter = categoryDropdown.value.slice(1, categoryDropdown.value.length);
  categoryName.forEach(function(item){
    item.textContent = firstLetter + letter;
  })
}


function displayOrHideCategory(){
  bookmarkListSection.classList.toggle("hidden");
  mainSection.classList.toggle("hidden");
  render()
}

function deleteButton(){
  const selected = document.querySelector("input[type='radio']:checked");
  //find Index 
  let currentBookmarks = getBookmarks(); 
  let index = currentBookmarks.findIndex(function(item){
    return item["name"] === selected.id && item.category === categoryDropdown.value
  }); 
  currentBookmarks.splice(index,1);
  localStorage.setItem("bookmarks", JSON.stringify(currentBookmarks));
  render()

}; 


// Add event listener click 
addBookmarkButton.addEventListener("click", displayOrCloseForm);
closeFormButton.addEventListener("click", displayOrCloseForm); 
addBookmarkButtonForm.addEventListener("click", saveBookmarks);
viewCategoryButton.addEventListener("click", displayOrHideCategory);
closeListButton.addEventListener("click",displayOrHideCategory); 
deleteBookmarkButton.addEventListener("click", deleteButton);
