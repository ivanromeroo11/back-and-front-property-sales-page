(function(){
    const lat = 36.9208667;
    const lng = -5.5388264;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 16);

    let markers = new L.FeatureGroup().addTo(mapa);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const obtenerPropiedades = async () => {
        try {
            const url = '/api/propiedades';
            const respuesta = await fetch(url);
            const propiedades = await respuesta.json();

            mostrarPropiedades(propiedades);
           
            
        } catch (error) {
            console.log(error)
            
        }

    };

    const mostrarPropiedades = propiedades  => {
        propiedades.forEach(propiedad => {
            //Agregar los pines 
            const marker = new L.marker([propiedad?.lat, propiedad?.lng],{
                autoPan: true
            })
            .addTo(mapa)
            .bindPopup(`
                <p class="text-indigo-600 font-bold">${propiedad.categoria.nombre}</p>
                <h1 class="text-xl font-extrabold uppercase my-2">${propiedad?.titulo}</h1>            
                <img src="/uploads/${propiedad?.imagen}" alt="imagen propiedad">
                <p class="text-gray-600 font-bold">${propiedad.precio.precio}</p>
                <a href="/propiedad/${propiedad.id}" class="bg-green-400 block p-2 text-center font-bold uppercase text-white">Ver propiedad</a>
                `)
                console.log(propiedad)

            markers.addLayer(marker);

        })


    }

    obtenerPropiedades();

})();