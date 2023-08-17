import {  useEffect } from 'react';
import { enviarDatos } from '../../db/db.jsx';

const Usuario = () => {

  useEffect(() => {

// ----------Función Usuario aleatorio---------------
     //Función Usuarios aleatorios:
    const generarNombreUsuarioAleatorio = () => {
      const nombre = 'Usuario';
      const numero = Math.floor(Math.random() * 1000001);
      
      return `${nombre}${numero}`;
    };
    // Generar y establecer el nombre de usuario aleatorio
    const nombreUsuarioAleatorio = generarNombreUsuarioAleatorio();
// ---------Función Usuario aleatorio------------------

//------Función de Fecha de ingreso ------------
    const obtenerFechaIngreso = () => {
      const fecha = new Date();
      const dia = fecha.getDate(); // Asegura que el día tenga 2 dígitos
      const mes = fecha.getMonth()+1; // Asegura que el mes tenga 2 dígitos
      const año = fecha.getFullYear();
      
      return `${mes}/${dia}/${año}`;
    };

    const fechaIngresoActual = obtenerFechaIngreso();

//------Función de Fecha de ingreso ------------

//---------Objeto de registrar datos ----------
    const objetoDataUsuario = {
    "tiempo": "00:16:00",
    "ruta": "/planosdelapaz",
    "hora_ingreso": "18:10:00",
    "hora_salida": "18:20:00",
    "fecha_salida": "09/08/2023",
    "id": nombreUsuarioAleatorio,
    "fecha_ingreso": fechaIngresoActual
    };

    console.log(nombreUsuarioAleatorio)

  //---------Objeto de registrar datos ----------

  //--------función evento página --------------

  const beforeUnloadHandler = () => {
    enviarDatos(objetoDataUsuario)
  }
  // Agregar el oyente del evento beforeunload
  window.addEventListener('beforeunload', beforeUnloadHandler);

  //--------función evento página --------------

  //--------Resetear----------------
  return () => {
    window.removeEventListener('beforeunload', beforeUnloadHandler);
  };
   //--------Resetear----------------
  }, []); 
};

export default Usuario;