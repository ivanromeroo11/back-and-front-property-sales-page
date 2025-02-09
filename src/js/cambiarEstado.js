(function(){
    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado');
    cambiarEstadoBotones.forEach(boton => {
        boton.addEventListener('click', cambiarEstadoPropiedad)
    });

    async function cambiarEstadoPropiedad(e) {
        const { propiedadId: id } = e.target.dataset

       try {

        const url = `/propiedades/${id}`

        const respuesta = await fetch(url, {
            method: 'PUT'
        })

        console.log(respuesta)
        
       } catch (error) {
              console.log(error)
        
       }
    }
    
})()