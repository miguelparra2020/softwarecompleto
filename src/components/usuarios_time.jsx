import {  useEffect,useState } from 'react';
import { enviarDatos } from '../../db/db.jsx';

const Usuario = () => {
  const [tiempoPermanencia, setTiempoPermanencia] = useState('00:00:00');
  const [tiempoInicio] = useState(new Date());
  const [miIP, setDataIPS] = useState('');
  const [dataMiIP, setDataMiIP] = useState('');
  const [miPais, setMiPais] = useState('');
  const [miCiudad, setMiCiudad] = useState('');

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

//------Función de hora de ingreso -----------
    const obtenerHoraIngreso = () => {
      const fecha = new Date();
      const opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
      const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
        
      return `${horaFormateada}`;
    };

    const horaIngresoActual = obtenerHoraIngreso();
//------Función de hora de ingreso -----------

//------Función ruta --------------
    const ruta = window.location.pathname;

//------Función ruta --------------

//----Función tiempo de permanencia------
      const intervaloTiempo = setInterval(() => {
        const horaActual = new Date();
        const diferencia = horaActual - tiempoInicio;

        const segundos = Math.floor((diferencia / 1000) % 60);
        const minutos = Math.floor((diferencia / 1000 / 60) % 60);
        const horas = Math.floor(diferencia / 1000 / 60 / 60);

        const tiempoFormateado = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
        setTiempoPermanencia(tiempoFormateado);
      }, 1000);
//----Función tiempo de permanencia------

//---Función mi Ip -------------
    async function obtenerMiIp() {
        try {
          const response = await fetch('https://api.ipify.org/?format=json');
          const dataIP = await response.json();
          setDataIPS(dataIP.ip)
          return 
        } catch (error) {
          console.error(error);
        }
      }
      obtenerMiIp();
//---Función mi Ip -------------

//---- Función data de mi IP ------

      async function datosDeMiIP(){
        try {
          const response = await fetch(`https://api.geoiplookup.net/?query=${miIP}&json=true`);
          const datosIP = await response.json();
          setDataMiIP(datosIP);
          setMiPais(datosIP.countryname);
          setMiCiudad(datosIP.city ? datosIP.city : "Ciudad no registrada");
        } catch (error) {
          console.error(error);
          setMiPais("Colombia")
          setMiCiudad("Pereira");
        }
      }
      datosDeMiIP();
      console.log(dataMiIP);
      console.log(miPais);
      console.log(miCiudad);

//---- Función data de mi IP ------



//---------Objeto de registrar datos ----------
    const objetoDataUsuario = {
    "tiempo": tiempoPermanencia,
    "ruta": ruta,
    "hora_ingreso": horaIngresoActual,
    "hora_salida": miCiudad,
    "fecha_salida": miPais,
    "id": nombreUsuarioAleatorio,
    "fecha_ingreso": fechaIngresoActual
    };

    console.log(objetoDataUsuario)

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
    clearInterval(intervaloTiempo);
  };
   //--------Resetear----------------
  }, [tiempoPermanencia]); 
};

export default Usuario;