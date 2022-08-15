import { useAddress, useMetamask } from '@thirdweb-dev/react';

const App = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("👋 Address:", address);

  // Esse é o caso em que o usuário ainda não conectou sua carteira
  // ao nosso site.
  if (!address) {
    return (
      <div className="landing">
        <h1>Bem-vind@s ao CartolaDAO - a DAO dos cartoleiros de plantão</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Conecte sua carteira
        </button>
      </div>
    );
  }

  // Esse é o caso em que temos o endereço do usuário,
  // o que significa que ele conectou sua carteira ao nosso site.
  return (
    <div className="landing">
      <h1>👀 carteira conectada, e agora?!</h1>
    </div>
  );
};

export default App;
