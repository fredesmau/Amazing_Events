async function getData () {    
    await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then((response)=>{
        const tableContainer = document.getElementById("table-stats");
        const eventsArr = response.events

        let upcomingStats = eventsArr.filter(card => card.date > response.currentDate)
        let pastStats = eventsArr.filter(card => card.date < response.currentDate)

        let createTable = ()=>{
            tableContainer.innerHTML = `
                <table class="table table-hover table-striped-columns m-3">
                    <tr>
                        <th colspan="3" class="stats-title rounded-2 text-white fs-4">Events Statistics</th>
                    </tr>
                
                    <tbody>

                        <tr>
                            <td><b>Events with the highest percentage of attendance</b></td>
                            <td><b>Events with the lowest percentage of attendance</b></td>
                            <td><b>Events with larger capacity</b></td>
                        </tr>
                        ${returnMaxAttendance(returnStats(pastStats))}
                        ${returnMinAttendance(returnStats(pastStats))}
                        ${returnMaxCapacity(eventsArr)}
                        

                        <tr>
                            <th colspan="3" class="stats-title rounded-2 text-white fs-4">Upcoming events statistics by category</th>
                        </tr>
                        <tr>
                            <td><b>Categories</b></td>
                            <td><b>Revenues (estimated)</b></td>
                            <td><b>Percentage of attendance (estimated)</b></td>
                        </tr>
                        ${renderStats(returnStats(upcomingStats))}
                        

                        <tr>
                            <th colspan="3" class="stats-title rounded-2 text-white fs-4">Past events statistics by category</th>
                        </tr>
                        <tr>
                            <td><b>Categories</b></td>
                            <td><b>Revenues</b></td>
                            <td><b>Percentage of attendance</b></td>
                        </tr>
                        ${renderStats(returnStats(pastStats))}

                    </tbody>
                </table>
            `
        }

        let returnMaxAttendance = (eventsList)=>{
            let maxAttendance = Math.max(...eventsList.map(event => event.attendance))
            let event = eventsList.find(event => event.attendance.includes(maxAttendance))
            return event ? `<td>${event.name} with % ${maxAttendance}</td>` : ''
        }


        // let returnMinAttendance = (eventsList)=>{
        //     let minAttendance = Math.min(...eventsList.map(event => event.attendance))
        //     let event = eventsList.find(event => event.attendance.includes(minAttendance))
        //     return event ? `<td>${event.name} %${minAttendance}</td>` : ''
        // }

        let returnMinAttendance = (eventsList)=>{
            let minAttendance = Math.min(...eventsList.map(event => event.attendance))
            let event = eventsList.find(event => event.attendance == minAttendance)
            return event ? `<td>${event.name} with % ${minAttendance}</td>` : ''
        }

        let returnMaxCapacity = (eventsList)=>{
            let maxCapacity = Math.max(...eventsList.map(event => event.capacity));
            let foundEvent = eventsList.find(event => event.capacity === maxCapacity);
            return `<td>${foundEvent.name} ${maxCapacity}</td>`;
        }

        let renderStats = (eventsStats)=>{
            let tableTr = "";
            let categories = {};
            
            eventsStats.forEach(event => {
                if (!categories[event.category]) { 
                    categories[event.category] = true;
                    tableTr += `
                        <tr>
                            <td>${event.category}</td>
                            <td>$ ${event.revenues}</td>
                            <td>${event.attendance} %</td>
                        </tr>`
                }
            })

            return tableTr
        }

        let returnStats = (eventsData)=>{    
            let arrayStats = [];
            eventsData.forEach(event => {
                arrayStats.push({ 
                            name: event.name,
                            category: event.category,
                            revenues: event.estimate ? event.estimate * event.price : event.assistance * event.price,
                            attendance: event.estimate ? (event.estimate * 100 / event.capacity).toFixed(2) : (event.assistance / event.capacity * 100).toFixed(2)
                })
            })

            return arrayStats
        }

        createTable()
    })
}
getData()
