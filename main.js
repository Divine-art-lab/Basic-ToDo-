//create and initialize variables 
const form = document.querySelector('form');
const formBtn = form.querySelector('button[type="submit"]');
let formInput = document.getElementById('input')
const ul = document.querySelector('ul');
const filterInput = document.getElementById('filterItem');
const clearBtn = document.getElementById('clearItem');
let isEditMode = false;


//display items from localStorage if there's any; after page loads.
function displayItems() {
  const items = getItemsFromStorage();
  items.forEach(item => createAndAddItem(item));
  
  checkUI();
}

//Get input value and display item or task
function addAndDisplayItem(e) {
  e.preventDefault();
  
  if (formInput.value === '') {
    alert('Please input an item or task');
    return;
  }
  
  //check if it's in editMode
  if (isEditMode) {
    const item = ul.querySelector('.editMode');
    deleteItemFromStorage(item);
    item.remove();
    formBtn.style.backgroundColor = '#333';
    formBtn.value = 'Add Item';
    isEditMode = false;
  } else {
    const items = getItemsFromStorage();
    const result = items.some(word => word.trim().toLowerCase() === formInput.value.trim().toLowerCase()); 
    if (result) {
      alert(`item ${formInput.value} already exist`);
      return;
    }
  }
  createAndAddItem(formInput.value.trim());
  
  //get the input value and save it to localStorage
  saveItemToStorage(formInput.value.trim())
  
  formInput.value = ''
  
  checkUI();
}

//create item
function createAndAddItem(item) {
  const p = ul.querySelector('p');
  if (p) p.remove();
  
  const li = document.createElement('li');
  const text = document.createTextNode(item);
  const btn = createBtn()
  li.appendChild(text);
  li.appendChild(btn)
  ul.appendChild(li);
}

//create button
function createBtn() {
  const btn = document.createElement('button');
  btn.className = 'close';
  const icon = createIcon('fa fa-trash');
  btn.appendChild(icon);
  
  return btn;
}

//create delete icon
function createIcon(classes) {
  const icon = document.createElement('i');
  
  icon.className = classes;
  return icon
}

//clicking item
function onClickItem(e) {
  if (e.target.parentElement.className === 'close') {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteItem(e.target.parentElement.parentElement)
      //deleteItemFromStorage(e.target.parentElement.parentElement);
      
    }
  } else {
    if (e.target.tagName === 'LI') {
      setItemToEdit(e.target);
    }
  }
}

function setItemToEdit(item) {
  isEditMode = true;
  ul.querySelectorAll('li').forEach(itemL => itemL.classList.remove('editMode'));
  
    item.classList.add('editMode');
    formBtn.style.backgroundColor = 'green';
    formBtn.innerHTML = '<i class="fa fa-pen"></i>Update';
    formInput.value = item.textContent;
}

//delete item
function deleteItem(item) {
    item.remove();
    deleteItemFromStorage(item);
    checkUI();
  }
  
//remove item from storage
function deleteItemFromStorage(element) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter(item => item !== element.textContent)
  
  //console.log(itemsFromStorage)
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

//clear all items using the clear button
function  clearAllItem() {
  const p = ul.querySelector('p');
  if (p) {
    console.log('No item')
  } else {
    if (confirm('All items will be cleared')) {
      ul.querySelectorAll('li').forEach(item => item.remove())
      localStorage.removeItem('items');
      checkUI();
    }
  }
  
}

//remove the clear button and filter input if there's no item/task
function checkUI() {
  const p = ul.querySelector('p');
  if (ul.firstElementChild === p /*|| ul.firstElementChild === null*/) {
    clearBtn.style.display = 'none';
    filterInput.style.display = 'none';
    p.style.display = 'block';
  } else {
    clearBtn.style.display = 'block';
    filterInput.style.display = 'grid';
  }
  
  formBtn.innerHTML = '<i class="fa fa-plus icon" style="color: white"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
}

function saveItemToStorage(item) {
  //initialize the items array based on the condition of the localStorage
  let items = getItemsFromStorage();
  
  //Add new item
  items.push(item);
  
  //save uitems back to local storage(with the new item added)
  localStorage.setItem('items', JSON.stringify(items));
}

function getItemsFromStorage() {
  //create variable 'items'
  let items;
  //check localStorage is empty 
  if (localStorage.getItem('items') === null) {
    //i it's empty then initialize items to be an empty array
    items = [];
  } else {
    //else if there's content in it, then initialize items to be a collection of those content 
    items = JSON.parse(localStorage.getItem('items'));
  }
  
  
  return items;
}

//filter items
function filterItems(e) {
  //e.preventDefault();
    ul.querySelectorAll('li').forEach((item) => {
      item.style.display = item.firstChild.textContent.trim().toLowerCase().includes(e.target.value.trim().toLowerCase()) ? 'flex': 'none';
    })

  checkUI();
}

//Add all the event listeners 
function init() {
  form.addEventListener('submit', addAndDisplayItem);
  ul.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearAllItem);
  document.addEventListener('DOMContentLoaded', displayItems);
  filterInput.addEventListener('input', filterItems);
  checkUI();
}

init();