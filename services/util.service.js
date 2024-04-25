import fs from "fs";
import fr from "follow-redirects";
const { http, https } = fr;

export const utilService = {
  download,
  readJsonFile,
  makeId,
  makeLorem,
  getRandomInt,
};

function download(url, fileName) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(fileName);
    https.get(url, (content) => {
      content.pipe(file);
      file.on("error", reject);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    });
  });
}

function readJsonFile(path) {
  const str = fs.readFileSync(path, "utf8");
  const json = JSON.parse(str);
  return json;
}

function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(length = 100) {
  var words =
    "fly worm spider ant bee bug moth ladybug beetle butterfly dragonfly grasshopper cockroach mantis cicada aphid termite caterpillar centipede earwig silverfish hornet wasp yellowjacket fruitfly gnat flea louse tick mite spidermite tarantula scorpion blackwidow brownrecluse wolfspider jumping spider orbweaver hobo spider funnelweaver crabspider".split(
      " "
    );
  var txt = "";
  while (txt.length < length) {
    txt += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return txt;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
