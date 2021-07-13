#!/usr/bin/env node
const path = require("path");
const inquirer = require("inquirer");
const { writeFile, readdir, readFile } = require("fs/promises");
const main = async () => {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      message: `Which 'tsconfig.json' do you want to create for?\n`,
      choices: ["react", "node", "react-native", "next"],
      default: "node",
      name: "choice",
    },
  ]);

  const { confirm } = await inquirer.prompt([
    {
      name: "confirm",
      choices: ["yes", "no"],
      type: "checkbox",
      default: "yes",
      message: `Are you sure you want to create tsconfig.js?\nFor:  ${choice}\nDirectory: ${process.cwd()}\n`,
    },
  ]);
  if (confirm[0] === "no") {
    return;
  } else {
    const tsconfigPath = path.resolve(process.cwd(), "tsconfig.json");
    let config = "";
    if (choice === "node") {
      config = await readFile(
        path.resolve(__dirname, "configs/ts-node.json"),
        "utf8"
      );
    } else if (choice === "next") {
      config = await readFile(
        path.resolve(__dirname, "configs/ts-next.json"),
        "utf8"
      );
    } else if (choice === "react") {
      config = await readFile(
        path.resolve(__dirname, "configs/ts-react.json"),
        "utf8"
      );
    } else {
      config = await readFile(
        path.resolve(__dirname, "configs/ts-react-native.json"),
        "utf8"
      );
    }
    await writeFile(
      tsconfigPath,
      JSON.stringify(JSON.parse(config), null, 2)
    ).then(() =>
      console.log(`Created tsconfig.json with ${choice} configurations.`)
    );
  }
};
main();
