import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop("0x9cEDD47aBe6A856d30E6d9500D99d5E82a8A8131");

(async () => {
  try {
    const claimConditions = [{
      // Quando as pessoas vão poder reivindicar seus NFTs
      startTime: new Date(),
      // Número máximo de NFTs
      maxQuantity: 50_000,
      // O preço do NFT (grátis)
      price: 0,
      // Quantos NFTs podem ser reivindicados por transação
      quantityLimitPerTransaction: 1,
      // Tempo de espera entre transações infinito significa que cada
      // pessoa só pode solicitar um único NFT
      waitInSeconds: MaxUint256,
    }]

    // 0 porque nosso NFT de filiação tem um tokenId de 0, visto que é 
    // o primeiro token no nosso contrato ERC-1155
    await editionDrop.claimConditions.set("0", claimConditions);

    console.log("✅ Condições de reinvidicação configuradas com sucesso!");
  } catch (error) {
    console.error("Falha ao definir condições de reinvidicação", error);
  }
})()
