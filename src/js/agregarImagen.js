import { Dropzone } from 'dropzone'


const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')



Dropzone.options.imagen = {
    dictDefaultMessage: 'Arrastra tu imagen aquí',
    acceptedFiles: '.png,.jpg,.jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: true,
    addRemoveLinks: true,
    dictRemoveFile: 'Eliminar Imagen',
    dictMaxFilesExceeded: 'Solo puedes subir una imagen',
    headers: {
        'CSRF-TOKEN': token
    },
    


}