import express, { Request } from "express";
import https from "https";
import { Response } from "node-fetch";

const app = express();
const port = 3005;

type PokemonName = string;
type Pokemon = { name: string, url: string }

const getPokemonNameList: (callback: ((pokemons: PokemonName[]) => any)) => void = (callback) => {
  https.get("https://pokeapi.co/api/v2/pokemon/", (res) => {
    if (res.statusCode !== 200) {
      console.error("request interupted");
      res.resume();
      return;
    }

    let data = "";
    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('close', () => {
      console.log("Finished");
      const dataJson = JSON.parse(data)
      const res: Pokemon[] = dataJson.results;
      const nameList: PokemonName[] = []
      res?.forEach(obj => {
        nameList.push(obj.name);
      });
      callback(nameList);
    });
  })
}

app.get("/", (req, res) => {
  getPokemonNameList((pokemonNames) => {
    res.send(pokemonNames)
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
