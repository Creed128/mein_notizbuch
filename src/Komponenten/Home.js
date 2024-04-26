// Home.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom'; // pour la redirection après connexion

const Home = () => {
  let navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log(response);
    // Ici vous pouvez gérer la réponse et par exemple stocker le token dans le localStorage
    // et naviguer vers un autre composant si la connexion est réussie
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="col-12 col-md-6 col-lg-4">
          <h1 className="mb-4 text-center">Bienvenue sur Mein Notizbuch App</h1>
          <GoogleLogin
            clientId="YOUR_CLIENT_ID"
            buttonText="Se connecter avec Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="btn btn-danger w-100"
          />
          {/* Ajoutez ici d'autres éléments d'interface utilisateur si nécessaire */}
        </div>
      </div>
    </div>
  );
};

export default Home;
