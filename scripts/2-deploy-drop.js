import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      // O nome da coleção, ex. CryptoPunks
      name: "Membro da CartolaDAO",
      // Uma descrição para a coleção
      description: "A DAO dos cartoleiros de plantão",
      // Uma imagem para a coleção que vai aparecer no OpenSea
      image: readFileSync("scripts/assets/top-hat.png"),
      // Nós precisamos passar o endereço da pessoa que vai estar recebendo 
      // os rendimentos das vendas dos nfts do módulo. Nós estamos planejando 
      // não cobrar as pessoas pelo drop, então passaremos o endereço 0x0.
      // Você pode configurar isso para sua própria carteira se você quiser 
      // cobrar pelo drop.
      primary_sale_recipient: AddressZero,
    });

    // Essa inicialização retorna o endereço do nosso contrato.
    // Usamos para inicializar o contrato no sdk
    const editionDrop = sdk.getEditionDrop(editionDropAddress);

    // Com isso, temos os metadados do nosso contrato
    const metadata = await editionDrop.metadata.get();
    
    console.log(
      "✅ Contrato editionDrop implantado com sucesso, endereço:",
      editionDropAddress,
    );
    console.log(
      "✅ bundleDrop metadados:",
      metadata,
    );
  } catch (error) {
    console.log("Falha ao implantar contrato editionDrop", error);
  }
})()
