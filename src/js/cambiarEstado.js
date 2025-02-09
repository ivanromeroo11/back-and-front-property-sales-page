(function(){
    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado');
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    cambiarEstadoBotones.forEach( boton => {
        boton.addEventListener('click', cambiarEstadoPropiedad)
    });

    async function cambiarEstadoPropiedad(e) {

       const { propiedadId: id } = e.target.dataset

       try {

        const url = `/propiedades/${id}`

        const respuesta = await fetch(url, {
            method: 'PUT',
            headers: { 
                'CSRF-Token': token
            }
        })

        console.log(respuesta)
        
       } catch (error) {
              console.log(error)
        
       }
    }
    
})()