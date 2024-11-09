import { Dropzone } from 'dropzone'

Dropzone.options.imagen = {
    dictDefaultMessage: 'Arrastra tu imagen aquí',
    acceptedFiles: '.png,.jpg,.jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Eliminar Imagen',
    dictMaxFilesExceeded: 'Solo puedes subir una imagen',
    


}