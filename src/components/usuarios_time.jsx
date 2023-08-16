import { useState, useEffect } from 'react';

const Usuario = () => {
  const [usuario, setUsuario] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [horaIngreso, setHoraIngreso] = useState('');
  const [tiempoPermanencia, setTiempoPermanencia] = useState('');
  const ruta = window.location.pathname;


  useEffect(() => {
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

    // Función para calcular el tiempo de permanencia
    const calcularTiempoPermanencia = () => {
  const horaInicio = new Date();

  // Actualizar el tiempo de permanencia cada segundo
  const intervalo = setInterval(() => {
    const horaActual = new Date();
    const diferencia = horaActual - horaInicio;

    const segundos = Math.floor((diferencia / 1000) % 60);
    const minutos = Math.floor((diferencia / 1000 / 60) % 60);
    const horas = Math.floor(diferencia / 1000 / 60 / 60);

    const tiempoFormateado = `${horas}:${minutos}:${segundos}`;
    setTiempoPermanencia(tiempoFormateado);
  }, 1000);

  return intervalo;
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

    // Calcular y establecer el tiempo de permanencia
    const intervaloTiempo = calcularTiempoPermanencia();
    
    return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    clearInterval(intervaloTiempo);
    };
  
    
  }, []);

  const objetoDataUsuario2 = {
    
    tiempo: tiempoPermanencia,
    ruta: ruta,
    hora_ingreso: horaIngreso,
    hora_salida: tiempoPermanencia,
    fecha_salida: fechaIngreso,
    id: usuario,
    fecha_ingreso: fechaIngreso
};

console.log(JSON.stringify(objetoDataUsuario2));
    // Función para enviar los datos mediante fetch
    const enviarDatos = async () => {
        try {
          const response = await fetch('https://backendusuariostime.onrender.com/estadisticas/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(objetoDataUsuario2)
          });
  
          if (response.ok) {
            console.log('Datos enviados exitosamente');
            // Aquí puedes realizar cualquier acción adicional después de enviar los datos
          } else {
            console.error('Error al enviar los datos');
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      };
  
      // Manejar el evento beforeunload
      const handleBeforeUnload = (event) => {
        event.preventDefault();
  
        // Llamar a la función enviarDatos cuando el usuario decide quedarse en la página
        enviarDatos();
      };
  
      // Agregar el listener para el evento beforeunload
      window.addEventListener('beforeunload', handleBeforeUnload);
  

  return (
    
    <div>
      Hola soy usuario: {usuario}
      <br />
      Ruta: {ruta}
      <br />
      Fecha de ingreso: {fechaIngreso}
      <br />
      Hora de ingreso: {horaIngreso}
      <br />
      Tiempo de permanencia: {tiempoPermanencia}
      <br/>
      {/* {objetoDataUsuario2} */}
    </div>
  );
};

export default Usuario;