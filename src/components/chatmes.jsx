
import { useEffect } from 'react';

const FacebookMessengerChat = () => {
  useEffect(() => {
    // Configura el SDK de Facebook
    window.fbAsyncInit = function() {
      // eslint-disable-next-line no-undef
      FB.init({
        appId: '100133298391116',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v17.0'
      });
    };

    // Carga el SDK de Facebook
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/es_LA/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <div>
      {/* Contenido de tu aplicación */}
      <h1>Mi Aplicación</h1>
      
      {/* Chat de Facebook Messenger */}
      <div id="fb-root"></div>
      <div
        className="fb-customerchat"
        attribution="setup_tool"
        page_id="100133298391116"
      ></div>
    </div>
  );
};

export default FacebookMessengerChat;

