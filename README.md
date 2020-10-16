
# note-taker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub top language](https://img.shields.io/github/languages/top/kev-luo/note-taker)

## Description
This is a note taking application that allows users to easily save and delete notes. Instead of using an actual database, I wrote all the POST request bodies to a JSON file on my local machine. While this limits the applicability of the application, I still learned a lot about creating basic server applications using Express. Express essentially made creating, and maintaining a web server easier compared to using Node's HTTP package. 
When making the DELETE route handler, I realized the importance of making unique keys to keep track of data inside your database. I also noticed that the order of your route handlers is important if you are making the same request method to similar URL's. 

## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Questions](#questions)

## Installation
    npm install

## Usage
To use this application, simply visit the deployed link below.

[Note-Taker](https://stark-escarpment-94046.herokuapp.com/)

## License
Licensed under the [MIT](https://opensource.org/licenses/MIT) License.

## Contributing
Feel free to clone a copy of the repository to your local machine add additional functionalities.

## Questions
* [kvn.luo@gmail.com](kvn.luo@gmail.com)
