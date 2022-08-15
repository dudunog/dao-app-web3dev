import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    // Deploy de um contrcto ERC-20
    const tokenAddress = await sdk.deployer.deployToken({
      // O nome do seu token, ex. "Ethereum"
      name: "Token de Governança da CartolaDAO",
      // Símbolo do seu token, ex. "ETH"
      symbol: "CAL",
      // Isso é para o caso de querermos vender o token.
      // Nesse caso não queremos, por isso AddressZero de novo
      primary_sale_recipient: AddressZero,
    });
    console.log(
      "✅ Módulo de token implantado com sucesso. Endereço:",
      tokenAddress,
    );
  } catch (error) {
    console.error("Falha ao implantar módulo do token", error);
  }
})();
