import { useState, useEffect } from 'react';

const Usuario = () => {
  const [usuario, setUsuario] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [horaIngreso, setHoraIngreso] = useState('');
  const [tiempoPermanencia, setTiempoPermanencia] = useState('00:00:00');
  const [tiempoInicio] = useState(new Date());
  const ruta = window.location.pathname;
  const [miIp, setMiIp] = useState('');
  const [dataMiIp, setDataMiIp] = useState('');

  async function obtenerMiIp() {
    try {
      const response = await fetch('https://api.ipify.org/?format=json');
      const data = await response.json();
      const ipString = data.ip.toString();
      setMiIp(ipString);
    } catch (error) {
      console.error(error);
    }
  }

  async function obtenerDataMiIp() {
    try {
      const response = await fetch(`http://ip-api.com/json/${miIp}`);
      const data = await response.json();
      setDataMiIp(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  

  useEffect(() => {
    obtenerMiIp();
    console.log(miIp);
    obtenerDataMiIp();
    console.log(dataMiIp.country);
    console.log(dataMiIp.city);

  
    // Función para obtener la dirección IP
   
    // Función para generar un nombre de usuario aleatorio
    const generarNombreUsuarioAleatorio = () => {
      const nombre = 'Usuario';
      const numero = Math.floor(Math.random() * 1000001);
      
      return `${nombre}${numero}`;
    };

    // Función para obtener la fecha de ingreso en formato deseado
    const obtenerFechaIngreso = () => {
        const fecha = new Date();
        const dia = fecha.getDate(); // Asegura que el día tenga 2 dígitos
        const mes = fecha.getMonth()+1; // Asegura que el mes tenga 2 dígitos
        const año = fecha.getFullYear();
        
        return `${mes}/${dia}/${año}`;
    };

    // Función para obtener la hora de ingreso actual en formato deseado
    const obtenerHoraIngreso = () => {
      const fecha = new Date();
      const opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
      const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
        
      return `${horaFormateada}`;
    };

    
    // Generar y establecer el nombre de usuario aleatorio
    const nombreUsuarioAleatorio = generarNombreUsuarioAleatorio();
    setUsuario(nombreUsuarioAleatorio);
    
    // Obtener y establecer la fecha de ingreso
    const fechaIngresoActual = obtenerFechaIngreso();
    setFechaIngreso(fechaIngresoActual);

    // Obtener y establecer la hora de ingreso
    const horaIngresoActual = obtenerHoraIngreso();
    setHoraIngreso(horaIngresoActual);

    
    // Calcular el tiempo de permanencia en cada renderizado
    const intervaloTiempo = setInterval(() => {
      const horaActual = new Date();
      const diferencia = horaActual - tiempoInicio;

      const segundos = Math.floor((diferencia / 1000) % 60);
      const minutos = Math.floor((diferencia / 1000 / 60) % 60);
      const horas = Math.floor(diferencia / 1000 / 60 / 60);

      const tiempoFormateado = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
      setTiempoPermanencia(tiempoFormateado);
    }, 1000);

    // Manejar el evento beforeunload
    const beforeUnloadHandler = () => {
      // Calcular el tiempo de permanencia
      const horaActual = new Date();
      const diferencia = horaActual - tiempoInicio;

      const segundos = Math.floor((diferencia / 1000) % 60);
      const minutos = Math.floor((diferencia / 1000 / 60) % 60);
      const horas = Math.floor(diferencia / 1000 / 60 / 60);

      const tiempoFormateado = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

      // Preparar los datos para enviar
      const objetoDataUsuario2 = {
        tiempo: tiempoFormateado,
        ruta: ruta,
        hora_ingreso: horaIngresoActual,
        hora_salida: dataMiIp.city,
        fecha_salida: dataMiIp.country,
        id: nombreUsuarioAleatorio,
        fecha_ingreso: fechaIngresoActual
      };
      const dataObject = JSON.stringify(objetoDataUsuario2);

      enviarDatos(dataObject);
      datos(dataObject);
      // Enviar los datos
      
      
    };


    // Agregar el oyente del evento beforeunload
    window.addEventListener('beforeunload', beforeUnloadHandler);


    // Devolver una función de limpieza para eliminar el oyente cuando el componente se desmonte
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      clearInterval(intervaloTiempo);
    };
  }, [miIp, dataMiIp]);

  const datos = (dataObject) => {
    console.log(dataObject)
  }
  
  
  const enviarDatos = async (dataObject) => {
    try {
      const response = await fetch('https://backendusuariostime.onrender.com/estadisticas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: dataObject
      });

      if (response.ok) {
        console.log('Datos enviados exitosamente');
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };



  
  return (
    <div style={{color: "white"}}>
     id: {usuario}&nbsp;fecha:{fechaIngreso}&nbsp;hora:{horaIngreso}&nbsp;tiempo:{tiempoPermanencia}
    </div>
  )
  
};

export default Usuario;
