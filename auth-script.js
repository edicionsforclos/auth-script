// auth-script.js

// Verificar si estamos en el editor de Cargo
const isInCargoEditor = window.self !== window.top;

if (!isInCargoEditor && window.location.hostname === '9869072-copy2.cargo.site') {
  const currentUrl = window.location.href;
  const token = localStorage.getItem('access_token');

  if (!token && !currentUrl.includes('/auth-callback')) {
    // Redirigir al login de Cognito si no hay token
    window.location.href = 'https://canprosaprova3.auth.eu-west-3.amazoncognito.com/login?client_id=3cug2g9160r7a9ktdrp4hhvp8&response_type=code&scope=email+openid+profile&redirect_uri=https://9869072-copy1.cargo.site/auth-callback';
  } else if (currentUrl.includes('/auth-callback')) {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch('https://canprosaprova3.auth.eu-west-3.amazoncognito.com/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&client_id=3cug2g9160r7a9ktdrp4hhvp8&code=${code}&redirect_uri=https://9869072-copy1.cargo.site/auth-callback`
      })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          window.location.href = 'https://9869072-copy2.cargo.site/';
        } else {
          alert("Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
        }
      })
      .catch(error => {
        console.error('Error al obtener el token:', error);
        alert("Error al procesar el login. Por favor, inténtalo de nuevo.");
      });
    } else {
      alert("Código de autenticación no recibido. Redirigiendo al login.");
      window.location.href = 'https://canprosaprova3.auth.eu-west-3.amazoncognito.com/login?client_id=3cug2g9160r7a9ktdrp4hhvp8&response_type=code&scope=email+openid+profile&redirect_uri=https://9869072-copy1.cargo.site/auth-callback';
    }
  }
}
