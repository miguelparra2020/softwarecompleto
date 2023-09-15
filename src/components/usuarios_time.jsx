import {  useEffect, useState } from 'react';
import { enviarDatos, enviarDatosTiempo } from '../../db/db.jsx';

const Usuario = () => {
  //-----Variables y constantes---------
  const [usuario, setNombreUsuario] = useState('');
  const [fecha_ingreso, setFechaIngreso] = useState('');
  const [hora_ingreso, setHoraIngreso] = useState('');
  const [miIP, setDataIPS] = useState('');
  const [miPais, setMiPais] = useState('');
  const [miCiudad, setMiCiudad] = useState('');
  const [ruta, setRuta] = useState('');
  const [tiempo, setTiempoPermanencia] = useState('00:00:00');
  const [tiempoAleatorio, setTiempoAleatorio] = useState('00:00:00');
  const [tiempoInicio] = useState(new Date());
  const [dispositivo, setDispositivo] = useState('');


  //-----Variables y constantes---------
  const objetoDataUsuarioTiempo = {
    "usuario": usuario,
    "fecha_ingreso": fecha_ingreso,
    "pais": miPais,
    "hora_ingreso": hora_ingreso,
    "ciudad": miCiudad,
    "ruta": ruta,
    "tiempo": tiempoAleatorio,
    "dispositivo": dispositivo
  };

  const enviarDatosfunctionTiempo = () => {
    console.log("Soy el objeto externo por 3 segundos",objetoDataUsuarioTiempo);
    enviarDatosTiempo(objetoDataUsuarioTiempo);

  }

  if(tiempo == '00:00:03'){
    enviarDatosfunctionTiempo();
  }

  

  useEffect(() => {

    // ----
    // const [varMiIP, setVarMiIP] = useState('');


    // ----------Función Usuario aleatorio---------------
    //  Función Usuarios aleatorios:
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
      
      return(`${mes}/${dia}/${año}`);
    };

    const fechaIngreso = obtenerFechaIngreso();
    setFechaIngreso(fechaIngreso)

    //------Función de Fecha de ingreso ------------
    //------Función de hora de ingreso -----------
    const obtenerHoraIngreso = () => {
      const fecha = new Date();
      const opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
      const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
        
      return `${horaFormateada}`;
    };

    const horaIngresoActual = obtenerHoraIngreso();
    setHoraIngreso(horaIngresoActual);
//------Función de hora de ingreso -----------

// Actualización de variable de usuario
    setNombreUsuario(`${nombreUsuarioAleatorio}${fechaIngreso}${horaIngresoActual}`);

    // const userName = `${nombreUsuarioAleatorio}${fechaIngreso}${horaIngresoActual}`;
// Actualización de variable de usuario
  
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
          setMiPais(datosIP.countryname ? datosIP.countryname : "Colombia");
          setMiCiudad(datosIP.city ? datosIP.city : "Ciudad no registrada");
          // setVarMiIP(datosIP.countryname ? datosIP.countryname : "Colombia");
        } catch (error) {
          console.error(error);
          setMiPais("Colombia")
          setMiCiudad("Ciudad no registrada");
        }
      }
      datosDeMiIP();

//---- Función data de mi IP ------
  
//------Función ruta --------------
    const ruta = window.location.pathname;
    setRuta(ruta);
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
        return tiempoFormateado
      }, 1000);
      console.log("Soy tiempo intervalo:", tiempo);

//----Función tiempo de permanencia------

const objetoDataUsuario = {
  "usuario": usuario,
  "fecha_ingreso": fechaIngreso,
  "pais": miPais,
  "hora_ingreso": horaIngresoActual,
  "ciudad": miCiudad,
  "ruta": ruta,
  "tiempo": tiempo,
  "dispositivo": dispositivo
};

console.log("Soy objeto interno:", objetoDataUsuario)

const enviarDatosfunctionCambioPagina = () => {
  enviarDatos(objetoDataUsuario);
}


   //--------función evento página --------------

   const beforeUnloadHandler = () => {
    enviarDatosfunctionCambioPagina();
  }
  // Agregar el oyente del evento beforeunload
  window.addEventListener('beforeunload', beforeUnloadHandler);

  //--------función evento página --------------


  // Condicional para saber el tipo de dispositivo-------
    if (window.innerWidth <= 768) {
      setDispositivo('celular');
    }else{
      setDispositivo('computador');
    }
  // Condicional para saber el tipo de dispositivo-------

  // función de tiempo aleatorio---------
  function tiempoAleatorio() {
    const minutosAleatorios = Math.floor(Math.random() * 11);
    const segundosAleatorios = Math.floor(Math.random() * 60);
    const horas = '00';
    const minutos = minutosAleatorios.toString().padStart(2, '0');
    const segundos = segundosAleatorios.toString().padStart(2, '0');

    const tiempo = `${horas}:${minutos}:${segundos}`;
  
    return tiempo;
  }
  
  const tiempoRandom = tiempoAleatorio();
  setTiempoAleatorio(tiempoRandom);
  // función de tiempo aleatorio---------

  

    //--------Resetear----------------
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      clearInterval(intervaloTiempo);
    };
   //--------Resetear----------------
  }, [tiempo]); 



  return(
    <div>
      {/* soy usuario: {usuario}
      <br />
      Soy fechaIngreso: {fecha_ingreso}
      <br />
      soy pais: {miPais}      
      <br />
      soy hora_ingreso: {hora_ingreso}  
      <br />
      soy ciudad: {miCiudad}  
      <br />
      soy ruta: {ruta}
      <br />
      soy tiempo: {tiempo}
      <br />
      soy dispositivo: {dispositivo}
      <br />
      <br /> */}
      {/* <button onClick={}> Enviar </button> */}
      
    </div>
  )


};

export default Usuario;