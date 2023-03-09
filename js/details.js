// DETAILS

let paramLocation = location.search;
let params = new URLSearchParams(paramLocation);
let id = params.get("id");


let events = data.events.find(event => event._id == id);
let asistenciaPast = "";

let currentDate = new Date(data.currentDate);
let eventDate = new Date(events.date);
if (eventDate < currentDate) {
    asistenciaPast = `<p class="detail-card card-text text-center">Assistance: ${events.assistance}</p>`;
}



let detailContainer = document.getElementById("details-container")
let detailCardOpen=  `
    <div class="card m-4" style="width: 50rem;">
            <img src="${events.image}" class="card-img-top h-img" alt="Image card of ${events.name}" title="${events.name}">
            <div class="card-body detail-card flex flex-wrap text-center">
                <h3 class="card-title text-center">${events.name}</h3>
                <p class="detail-card card-text text-center">${events.description}</p>
                <div class="price-card d-flex justify-content-between">
                    <h4 class="">$ ${events.price}</h4>
                    ${asistenciaPast}
                </div>
            </div>
        </div>
        `;
        
detailContainer.innerHTML += detailCardOpen;
    


