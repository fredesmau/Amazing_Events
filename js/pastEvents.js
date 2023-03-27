let pastEvents = "";
for(let event of data.events){
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);

    if (eventDate < currentDate) {
        // console.log("evento pasado")
        pastEvents+=`<div class="card d-flex justify-content-center shadow p-3 mb-5 bg-body-tertiary rounded">
                    <div class="image-card m-3">
                        <img src="${event.image}" alt="Image card" class="image-card-2 rounded-3">
                    </div>
                    <div class="detail-card text-center m-3">
                        <h3>${event.name}</h3>
                        <p>${event.description}</p>
                    </div>
                    <div class="price-card d-flex justify-content-between m-4">
                        <h4>$ ${event.price}</h4>
                        <a href="../pages/details.html" class="vermas-button rounded text-white border-0 p-2">ver más...
                        </a>
                    </div>
                </div>`;
    } else {
        // console.log("evento futuro")
    }
    
}

document.querySelector('section.section-cards').innerHTML += pastEvents;

console.log(pastEvents);