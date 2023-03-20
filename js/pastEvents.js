const wherePast = document.querySelector('section.section-cards');
const checkBoxContainer = document.getElementById('checkbox');
const searchContainer = document.getElementById('search');
const arrayEvents = data.events;

let cardPastFiltradas = data.events.filter(card => card.date < data.currentDate);

let checkFilter = cardPastFiltradas.map(event => event.category).filter((category, index, array) => array.indexOf(category) === index);

//Renderizo cada checkbox
let renderCheckBox = (array, where)=>{
    where.innerHTML = '';

    for(let check of array){
        where.innerHTML +=`
            <div class="form-check form-check-inline mt-2">
                <input class="form-check-input" type="checkbox" value="${check}">
                <label class="form-check-label text-secondary">${check}</label>
            </div>
        `;
    }
}

let getSearchValue = () => searchContainer.value.toLowerCase();

let getCheckedCategories = () => {
    let categories = [];
    let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

    checkedBoxes.forEach(box => categories.push(box.value));

    return categories;
}

let filterCards = (array, searchValue, checkedCategories) => {
    let filteredCards = array.filter(event => {
        let name = event.name.toLowerCase();
        let description = event.description.toLowerCase();
        let category = event.category;

        let isNameMatch = name.includes(searchValue);
        let isDescriptionMatch = description.includes(searchValue);
        let isCategoryMatch = checkedCategories.includes(category);

        if(searchValue && checkedCategories.length) {
            return isNameMatch && isDescriptionMatch && isCategoryMatch;
        } else if(searchValue) {
            return isNameMatch || isDescriptionMatch;
        } else if(checkedCategories.length) {
            return isCategoryMatch;
        } else {
            return true;
        }
    });

    return filteredCards;
}

let renderCards = (data, where)=>{
    where.innerHTML = '';
    
    for (let event of data){
        where.innerHTML += `
            <div class="card m-4 " style="width: 20rem;">
                <img src="${event.image}" class="card-img-top h-img" alt="${event.name}" title="${event.name}">
                <div class="card-body">
                    <h5 class="card-title text-center">${event.name}</h5>
                    <p class="card-text text-center">${event.description}</p>
                    <div class="d-flex justify-content-between">
                        <h4>$ ${event.price}</h4>
                        <a href="./details.html?id=${event._id}" class="vermas-button rounded text-white border-0 p-2">Ver más..</a>
                    </div>
                </div>
            </div>
        `     
    }
}

renderCards(cardPastFiltradas,wherePast)

let render = (template, where) => document.getElementById(where).innerHTML = template;

let renderBoth = () => {
    let searchValue = getSearchValue();
    let checkedCategories = getCheckedCategories();
    let filteredCards = filterCards(cardPastFiltradas, searchValue, checkedCategories);
    renderCards(filteredCards, wherePast);
}

let form = document.getElementById('search-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
});

renderCheckBox(checkFilter, checkBoxContainer);

searchContainer.addEventListener('input', renderBoth);
checkBoxContainer.addEventListener('change', renderBoth);

function busqueda(){
    renderBoth();
}