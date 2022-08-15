import sdk from "./1-initialize-sdk.js";

// Esse é o endereço do nosso contrato ERC-20
const token = sdk.getToken("0x7615632B9B4dd67EEcD0EC09E0Ad7a43B7Ec5CD8");

(async () => {
  try {
    // Fornecimento máximo do token
    const amount = 1_000_000;
    // Interaje com contrato ERC-20 e cunha os tokens
    await token.mintToSelf(amount);
    const totalSupply = await token.totalSupply();
    
    // Mostra quantos dos seus tokens existem agora
    console.log("✅ Agora temos", totalSupply.displayValue, "$CAL em circulação");
  } catch (error) {
    console.error("Falha ao imprimir o dinheiro", error);
  }
})();
