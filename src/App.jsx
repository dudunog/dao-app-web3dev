import { useEffect, useState } from 'react';
import { useAddress, useEditionDrop, useMetamask } from '@thirdweb-dev/react';

const App = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("👋 Address:", address);

  // Inicializa o contrato editionDrop
  const editionDrop = useEditionDrop("0x9cEDD47aBe6A856d30E6d9500D99d5E82a8A8131");
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    // Para se o usuário não tiver uma carteira conectada
    if (!address) {
      return;
    }
    
    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        // Se o saldo for maior do que 0, ele tem nosso NFT
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 Esse usuário tem o NFT de membro!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 Esse usuário NÃO tem o NFT de membro.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Falha ao ler saldo", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim(0, 1);
      console.log(`🌊 Cunhado com sucesso! Olhe na OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Falha ao cunhar NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

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

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🎩 Página dos membros da DAO</h1>
        <p>Parabéns por fazer parte do melhor clube de cartoleiros!</p>
      </div>
    )
  };

  // Esse é o caso em que temos o endereço do usuário,
  // o que significa que ele conectou sua carteira ao nosso site.
  return (
    <div className="mint-nft">
      <h1>Cunhe gratuitamente seu NFT de membro 🎩 da CartolaDAO</h1>
      <button
        disabled={isClaiming}
        onClick={mintNft}
      >
        {isClaiming ? "Cunhando..." : "Cunhe seu NFT"}
      </button>
    </div>
  );
};

export default App;
