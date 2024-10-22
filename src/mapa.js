
(function() {
  
    const lat = 36.9208667;
    const lng = -5.5388264;
    const mapa = L.map('mapa').setView([lat, lng ], 16);
    let marker;

    //Utilizar Provider y Geocoder

    const geocodeService = L.esri.Geocoding.geocodeService();
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //el pin
    marker = new L.marker([lat, lng],{
        draggable: true,
        autoPan: true
    })
    .addTo(mapa)

    //Detectar el movimiento del pin 

    marker.on('moveend', function(e){
        marker = e.target
        const posicion = marker.getLatLng();
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));

        // Obtener la información de la ubicación
        geocodeService.reverse().latlng(posicion, 16).run(function(error, result) {
            console.log(result);

            marker.bindPopup(result.address.LongLabel);

            // Llenar los campos de dirección

            document.querySelector('.calle').textContent = result?.address?.Address ?? '';
            document.querySelector('#calle').value = result?.address?.Address ?? '';
            document.querySelector('#lat').value = result?.latlng?.lat ?? '';
            document.querySelector('#lng').value = result?.latlng?.lng ?? '';
        })
           
    })

})()