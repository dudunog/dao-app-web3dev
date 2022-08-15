import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x9cEDD47aBe6A856d30E6d9500D99d5E82a8A8131");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Cartola Pass",
        description: "Esse NFT te da acesso à CartolaDAO!",
        image: readFileSync("scripts/assets/top-hat.png"),
      },
    ]);
    console.log("✅ Novo NFT criado com sucesso no drop!");
  } catch (error) {
    console.error("Falha ao criar o novo NFT", error);
  }
})()
