import { useEffect } from 'react';

const FacebookMessengerChat = () => {
  useEffect(() => {
    // Cargar el SDK de Facebook
    window.fbAsyncInit = function() {
      // eslint-disable-next-line no-undef
      FB.init({
        xfbml: true,
        version: 'v13.0'
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <div>
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
