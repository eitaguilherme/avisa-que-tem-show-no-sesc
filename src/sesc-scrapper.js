const fetch = require("node-fetch");
const cheerio = require("cheerio");
const striptags = require("striptags");
let date = require("date-and-time");

const prefix = "[sesc] -> ";

let scrap = termo => {
  return new Promise((resolve, reject) => {
    fetch(
      "https://www.sescsp.org.br/busca/busca.action?q=" +
        encodeURI(termo) +
        "#/content=programacao"
    )
      .then(res => res.text())
      .then(body => cheerio.load(body))
      .then($ => {
        let artistas = [];

        console.log(`${prefix}buscando pelo termo '${termo}'`);
        $(".block_content_21").each((index, element) => {
          let local = $(element)
            .find("header a")
            .eq(1)
            .html();

          let datas = [];
          let data = $(element)
            .find("p.data strong")
            .html();

          let agora = new Date();

          if (data.indexOf("a") > -1) {
            //tratar string quando ela vem da seguinte maneira
            //'16/03 a 14/04<br>'
            //Essa aqui é bem provisória taoquei?

            datas.push(
              date.parse(
                data.split("a")[0] + "/" + agora.getFullYear(),
                "D/MM/YYYY"
              )
            );
          } else {
            data = striptags(data, "<strong>");
            datas.push(
              date.parse(data + "/" + agora.getFullYear(), "D/MM/YYYY")
            );
          }

          let artista = $(element)
            .find("h3 a")
            .attr("title");

          if (artista == termo) {
            artistas.push({
              artista: artista,
              local: local,
              datas: datas
            });
          }
        });

        console.log(`${prefix}buscando pelo termo '${termo}'`);
        resolve({
          termo: termo,
          eventos: artistas
        });
      });
  });
};

module.exports = {
  scrap: scrap
};
