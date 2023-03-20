fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then((response)=>{

    let callEvents = (data)=>{

        let cardEvents = document.querySelector("section.section-cards")


        cardEvents.innerHTML = ''

        
        for (let event of data.events){
                cardEvents.innerHTML += `
                <div class="card m-4" style="width: 20rem;">
                    <img src="${event.image}" class="card-img-top h-img" alt="Image card of ${event.name}" title="${event.name}">
                    <div class="card-body detail-card flex flex-wrap text-center">
                        <h3 class="card-title text-center">${event.name}</h3>
                        <p class="detail-card card-text text-center">${event.description}</p>
                        <div class="d-flex justify-content-between">
                            <h4 class="">$ ${event.price}</h4>
                            <a href="../pages/details.html?id=${event._id}" class="vermas-button rounded text-white border-0 p-2">Ver más..</a>
                        </div>
                    </div>
                </div>
                `;
            }
    }

    callEvents(response) 

})
