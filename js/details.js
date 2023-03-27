// DETAILS
async function getData () {
    await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then((response)=>{

        let paramLocation = location.search;
        let params = new URLSearchParams(paramLocation);
        let id = params.get("id");


        let events = response.events.find(event => event._id == id);
        let asistenciaPast = "";

        let currentDate = new Date(response.currentDate);
        let eventDate = new Date(events.date);
        if (eventDate < currentDate) {
            asistenciaPast = `<p><b>Assistance:</b> ${events.assistance}</p>`;
        }else if (eventDate > currentDate) {
            asistenciaPast = `<p><b>Estimate:</b> ${events.estimate}</p>`;
        }

        let detailContainer = document.getElementById("details-container")
        let detailCardOpen=  `
            <div class="details-img-container m-5 d-flex justify-content-around rounded">
                <img src="${events.image}" class="details-img card-img-top h-img rounded" alt="Image card of ${events.name}" title="${events.name}">
                <div class="card-text flex flex-wrap text-center">
                    <h3 class="card-title-details text-center fs-2">${events.name}</h3>
                    <p class="detail-card-desc card-text text-center">${events.description}</p>
                    <p><b>Place:</b> ${events.place}</p>
                    <p><b>Capacity:</b> ${events.capacity}</p>
                    ${asistenciaPast}</p>
                    <div class="price-card d-flex justify-content-around">
                        <h4 class="fs-6">Date: ${events.date}</h4>
                        <h4 class="fs-6">Price: $ ${events.price}</h4>
                    </div>
                </div>
            </div>
                `;
                
        detailContainer.innerHTML += detailCardOpen;
    
    })
}
getData()