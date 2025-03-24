 // Sample Data
 let consignments = [];
 let destinations = [
     { name: 'Mumbai', volume: 0, capacity: 500 },
     { name: 'Delhi', volume: 0, capacity: 500 },
     { name: 'Hyderabad', volume: 0, capacity: 500},
     { name: 'Rourkela', volume: 0, capacity: 500}
 ];

 // Truck Status
 const trucks = Array(5).fill().map((_, i) => ({
     id: i+1,
     status: 'Available',
     location: 'Head Office',
     lastUsed: null
 }));

 function addConsignment() {
     const volume = parseFloat(document.getElementById('volume').value);
     const destination = document.getElementById('destination').value;
     
     // Update destination volume
     const dest = destinations.find(d => d.name.toLowerCase() === destination);
     dest.volume += volume;
     
     // Check if truck needs to be assigned
     if(dest.volume >= dest.capacity) {
         assignTruck(destination);
         dest.volume = 0;
     }
     
     updateUI();
 }

 function assignTruck(destination) {
     const availableTruck = trucks.find(t => t.status === 'Available');
     if(availableTruck) {
         availableTruck.status = 'In Transit';
         availableTruck.location = destination;
         availableTruck.lastUsed = new Date();
     }
 }

 function updateUI() {
     // Update truck status
     document.getElementById('truckStatus').innerHTML = trucks.map(truck => `
         <div class="truck-card">
             <h4>Truck ${truck.id}</h4>
             <p>Status: ${truck.status}</p>
             <p>Location: ${truck.location}</p>
         </div>
     `).join('');

     // Update destination progress
     document.getElementById('destinationProgress').innerHTML = destinations.map(dest => `
         <div class="progress-container">
             <h4>${dest.name}</h4>
             <div class="progress-bar">
                 <div class="progress-fill" style="width: ${(dest.volume/dest.capacity)*100}%"></div>
             </div>
             <p>${dest.volume}/${dest.capacity} m³</p>
         </div>
     `).join('');
 }

  

 // Initialize charts
 new Chart(document.getElementById('revenueChart'), {
     type: 'bar',
     data: {
         labels: destinations.map(d => d.name),
         datasets: [{
             label: 'Revenue',
             data: [120000, 85000]
         }]
     }
 });

 // Initial render
 updateUI();



 