// DETAILS

let paramLocation = location.search;
let params = new URLSearchParams(paramLocation);
let id = params.get("id");


let events = data.events.find(event => event._id == id);
let asistenciaPast = "";

let currentDate = new Date(data.currentDate);
let eventDate = new Date(events.date);
if (eventDate < currentDate) {
    asistenciaPast = `<p class="detail-card card-text text-center"><b>Assistance:</b> ${events.assistance}</p>`;
}else if (eventDate > currentDate) {
    asistenciaPast = `<p class="detail-card card-text text-center"><b>Estimate:</b> ${events.estimate}</p>`;
}

let detailContainer = document.getElementById("details-container")
let detailCardOpen=  `
    <div class="card m-5" style="width: 70rem;border-radius: 2rem;">
            <img src="${events.image}" class="details-img card-img-top h-img" alt="Image card of ${events.name}" title="${events.name}">
            <div class="card-body detail-card flex flex-wrap text-center">
                <h3 class="card-title text-center fs-2">${events.name}</h3>
                <p class="detail-card card-text text-center">${events.description}</p>
                <p><b>Place:</b> ${events.place}</p>
                <p><b>Capacity:</b> ${events.capacity}</p>
                ${asistenciaPast}</p>
                <div class="price-card d-flex justify-content-around">
                    
                    <h4 class="fs-3">Date: ${events.date}</h4>
                    <h4 class="fs-3">Price: $ ${events.price}</h4>
                    
                </div>
            </div>
        </div>
        `;
        
detailContainer.innerHTML += detailCardOpen;
    


