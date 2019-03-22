const prefix = "[index] -> ";
console.log(`${prefix}iniciando o programa principal`);
const sesc = require("./sesc-scrapper");

let artistas = ["Tom Zé", "Cidadão Instigado", "Metá Metá", "Zeze Mota"];
let promisses = [];
artistas.forEach(artista => promisses.push(sesc.scrap(artista)));
Promise.all(promisses).then(results => {
  results.forEach((result, index) => {
    console.log(
      `${prefix}encontramos, para o termo '${result.termo}', ${
        result.eventos.length
      } itens`
    );
  });
});
