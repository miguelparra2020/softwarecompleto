//el envío de datos de El registro de usuarios

export async function enviarDatos(dataObject) {
    const response = await fetch('https://sistemas-backend-analitica-django-mongo.onrender.com/insertar_usuario/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
    });
  
    const data = await response.json();
    return data;
  }


  export async function enviarDatosTiempo(dataObjectTiempo) {
    const response = await fetch('https://sistemas-backend-analitica-django-mongo.onrender.com/insertar_usuario/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObjectTiempo),
    });
  
    const data = await response.json();
    return data;
  }