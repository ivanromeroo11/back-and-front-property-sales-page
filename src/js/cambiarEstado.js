(function(){
    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado');
    cambiarEstadoBotones.forEach(boton => {
        boton.addEventListener('click', cambiarEstadoPropiedad)
    });

    function cambiarEstadoPropiedad(e) {
        const { propiedadId: id } = e.target.dataset 
        console.log(id)
    }
    
})()