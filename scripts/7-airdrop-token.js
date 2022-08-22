import sdk from "./1-initialize-sdk.js";

// Endereço do nosso contrato ERC-1155 do NFT de filiação
const editionDrop = sdk.getEditionDrop("0x9cEDD47aBe6A856d30E6d9500D99d5E82a8A8131");

// Endereço do nosso contrato ERC-20 do nosso token
const token = sdk.getToken("0x7615632B9B4dd67EEcD0EC09E0Ad7a43B7Ec5CD8");

(async () => {
  try {
    // Pegue o endereço de todas as pessoas que possuem o nosso NFT de filiação, que tem
    // o tokenId 0.
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log(
        "Ninguém mintou o NFT ainda, peça para alguns amigos fazerem isso e ganhar um NFT de graça!",
      );
      process.exit(0);
    }

    // faça um loop no array de endereços.
    const airdropTargets = walletAddresses.map((address) => {
      // Escolha um # aleatório entre 1000 e 10000.
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("✅ Vai enviar", randomAmount, "tokens para ", address);
      
      // Configure o alvo
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };
  
      return airdropTarget;
    });
    
    // Chame transferBatch em todos os alvos do airdrop
    console.log("🌈 Começando o airdrop...")
    await token.transferBatch(airdropTargets);
    console.log("✅ Feito o airdrop de tokens para todos os donos de NFT!");
  } catch (err) {
    console.error("O airdrop de tokens falhou", err);
  }
})();
