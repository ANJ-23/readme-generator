const inquirer = require("inquirer");
const fs = require("fs");

// dynamic string that compiles README data
let readMe = "";

// Forms the README file in order
async function formReadMe() {
    await titleDesc();
    await promptTable();
    await stepUseCredLicense();
    await promptBadFeatContTests();
    
    await createReadMe();
}


// first, obtain Title & Description
async function titleDesc() {
    await inquirer.prompt([
        {
            type: 'input',
            message: "Title of your project?",
            name: 'title',
        },
        {
            type: 'input',
            message: 'Write a description:',
            name: 'description',
        }
      ])
    .then((data) => {
        readMe += 
`# ${data.title}

## Description

${data.description}
`
        /* fs.writeFile("README.md", readMe, (err) => 
            err ? console.error(err) : console.log("File written successfully!")
        ) */
    });
}


async function promptTable() {
    // ask if Table of Contents is needed. If yes, create a Table of Contents
    const prompt = await inquirer.prompt([
        {
            type: 'confirm',
            message: 'Do you need a Table of Contents?',
            name: 'tablePrompt',
        }
    ]);
    // .then((data) => {
    if (prompt.tablePrompt === true) {
        await writeTableOfContents();
    }
    // });
}

// writes Table of Contents
async function writeTableOfContents() {
    await inquirer.prompt([
        {
            type: 'input',
            message: 'Insert Table of Contents:',
            name: 'table',
        }
    ])
    .then((data) => {
        readMe += `
## Table of Contents

${data.table}
`
    });
}


// write Installation steps, Usage, Credits, and License
async function stepUseCredLicense() {
    await inquirer.prompt([
        {
            type: 'input',
            message: 'Steps to install the project:',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'What usage is there for the project, and how do you use it?',
            name: 'usage',
        },
        {
            type: 'input',
            message: 'Credits:',
            name: 'credits',
        },
        {
            type: 'input',
            message: 'License:',
            name: 'license',
        }
    ])
    .then((data) => {
        readMe += `
## Installation

${data.installation}

## Usage

${data.usage}

## Credits

${data.credits}

## License

${data.license}
`
    });
}


// ask if badges, features, contribute instructions, and tests are needed. If yes to any of them, create respective contents.
async function promptBadFeatContTests() {
    const prompts = await inquirer.prompt([
        {
            type: 'confirm',
            message: 'Do you have badges?',
            name: 'badgesPrompt',
        },
        {
            type: 'confirm',
            message: 'Does the project have a lot of features?',
            name: 'featurePrompt',
        },
        {
            type: 'confirm',
            message: 'Would you like others to actively contribute?',
            name: 'contributePrompt',
        },
        {
            type: 'confirm',
            message: 'Are there test runs for the application?',
            name: 'testsPrompt',
        }
    ])

    if (prompts.badgesPrompt === true) {
        await writeBadges();
    }
    if (prompts.featurePrompt === true) {
        await writeFeatures();
    }
    if (prompts.contributePrompt === true) {
        await writeHowToContribute();
    }
    if (prompts.testsPrompt === true) {
        await writeTests();
    }
}

// writes Badges
async function writeBadges() {
    await inquirer.prompt([
        {
            type: 'input',
            message: 'Insert your badges:',
            name: 'badges',
        }
    ])
    .then((data) => {
        readMe += `
## Badges

${data.badges}
`
    });
}

// writes Features
async function writeFeatures() {
    await inquirer.prompt([
        {
            type: 'input',
            message: 'Insert features:',
            name: 'features',
        }
    ])
    .then((data) => {
        readMe += `
## Features

${data.features}
`
    });
}

// writes How to Contribute
async function writeHowToContribute() {
    await inquirer.prompt([
        {
            type: 'input',
            message: 'Describe how you would like others to contribute:',
            name: 'contribute',
        }
    ])
    .then((data) => {
        readMe += `
## How to Contribute

${data.contribute}
`
    });
}

// writes Tests
async function writeTests() {
    await inquirer.prompt([
        {
            type: 'input',
            message: 'Describe your tests:',
            name: 'tests',
        }
    ])
    .then((data) => {
        readMe += `
## Tests

${data.tests}
`
    });
}


// writes the README contents to a file (README.md)
async function createReadMe() {
    fs.writeFile("README.md", readMe, (err) => 
        err ? console.error(err) : console.log("File written successfully!")
    )
}


formReadMe();