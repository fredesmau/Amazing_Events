const checkBoxContainer = document.getElementById('checkbox')
const searchContainer = document.getElementById('search')
const arrayEvents = data.events

const checkFilter = arrayEvents.map(event => event.category).filter((category, index, array) => array.indexOf(category) === index)

//Renderizo cada checkbox
let renderCheckBox = (array, where)=>{
    where.innerHTML = ''

    for(let check of array){
        where.innerHTML +=`
            <div class="form-check form-check-inline mt-2">
                <input class="form-check-input" type="checkbox" value="${check}">
                <label class="form-check-label text-secondary">${check}</label>
            </div>
        `;
    }
}

let returnValueCheckBox = (array)=>{
    let checkbox = document.querySelectorAll('input[type="checkbox"]:checked')
    
    let cardsCheckBoxFilter = []

    checkbox.forEach(check=> cardsCheckBoxFilter.push(array.filter(event => event.category === check.value)))
   
    let cardsFinal = cardsCheckBoxFilter.flat()

    if(cardsCheckBoxFilter.length > 0){
        return cardsFinal
    } 
}

let returnValueSearch = () => {
    let cardsFilter = arrayEvents.filter(event => event.name.toLowerCase().includes(searchContainer.value.toLowerCase()))

    if(document.querySelectorAll('input[type="checkbox"]:checked').length == 0){
       render(renderCardsSearch(cardsFilter), "cardEvents")
    }else{
        return cardsFilter
    }
}

let renderCardsSearch = (array)=>{
    let template = []

    array.forEach(card => {
        template.push(`<div class="card m-4" style="width: 23rem;">
            <img src="${card.image}" class="card-img-top h-img" alt="Image card of ${card.name}" title="${card.name}"></img>
            <div class="card-body detail-card flex flex-wrap text-center">
                <h3 class="card-title text-center">${card.name}</h3>
                <p class="detail-card card-text text-center">${card.description}</p>
                <div class="price-card d-flex justify-content-between">
                    <h4>$ ${card.price}</h4>
                    <a href="../pages/details.html?id=${card._id}" class="vermas-button rounded text-white border-0 p-2">Ver más..</a>
                </div>
            </div>
        </div>`);
    });


    if(array.length > 0){
        // template.forEach(card =>  setTimeout(()=> {console.log(card)}, 2000))
        return template
    }else{
        return `<h2 class="fs-3">There's no matches</h2>`;
    }

    
}

let render = (template, where)=> document.getElementById(where).innerHTML = template


let renderBoth = ()=>{
    let search = returnValueSearch()
    let checkbox = returnValueCheckBox(search)

    render(renderCardsSearch(checkbox), "cardEvents")
    
}

renderCheckBox(checkFilter, checkBoxContainer)
searchContainer.addEventListener('input', renderBoth)
checkBoxContainer.addEventListener('change', renderBoth)