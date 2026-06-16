//create and initialize variables 
const form = document.querySelector('form');
const ul = document.querySelector('ul');
const filterInput = document.getElementById('filterItem');
const clearBtn = document.getElementById('clearItem');

//display items from localStorage if there's any; after page loads.
function displayItems() {
  let items = getItemsFromStorage();
  items.forEach(item => createAndAddItem(item));
  
  checkUI();
}

//Get input value and display item or task
function addAndDisplayItem(e) {
  e.preventDefault();
  let inputElement = document.getElementById('input');
  
  if (inputElement.value === '') {
    alert('Please input an item or task');
    return;
  }
  
  createAndAddItem(inputElement.value.trim());
  
  checkUI();
  
  //get the input value and save it to localStorage
  saveItemToStorage(inputElement.value.trim())
  
  inputElement.value = '';
}

//create lit item
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
      deleteItemFromStorage(e.target.parentElement.parentElement);
      
    }
  }
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
    }
  }
  
  
  checkUI();
}

//remove the clear button and filter input if there's no item/task
function checkUI() {
  const p = ul.querySelector('p');
  if (ul.firstElementChild === p || ul.firstElementChild === null) {
    clearBtn.style.display = 'none';
    filterInput.style.display = 'none';
    //p.style.display = 'block';
  } else {
    clearBtn.style.display = 'block';
    filterInput.style.display = 'grid';
  }
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
      item.style.display = item.firstChild.textContent.toLowerCase().includes(e.target.value.toLowerCase()) ? 'flex': 'none';
      checkUI();
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