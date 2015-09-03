# newsclassifier-node
Node command line app to classify news based on headlines [WIP]

## Introduction

This is a POC on Bayes Classification of News articles. We use a node module [Natural Node](https://github.com/NaturalNode/natural) to perform classification on news articles based on their headlines. Our primary goal is to scrape the news sources of Kolkata, India using [KimonoLab Scraper API](https://www.kimonolabs.com) and gather news tweets, and then classify them into two distinct categories : *Crime* and *Non Crime*. Finally, after classification we will extract the data from the crime articles, regarding the type of crime, place of occurrence etc and build our own database, upon which we can further perform learning tasks.

## How to use

Before using, make sure you have the latest [Node.js](https://nodejs.org/) installed in your computer.

First, clone this repository.

`git clone https://github.com/iemdatagroup/newsclassifier-node.git`

Then, cd into **newsclassifier-node** and run :

`npm install`

This will install the necessary dependencies. Next, proceed with training or classifying :

Training :

`node index.js --t <file_name.json | file_name.csv>`

Classifying :

`node index.js --c <file_name.json | file_name.csv>`

## Inputs

The program accepts only file inputs of type **JSON** and **csv**. JSON files should be the output of KimonoLab scraper, and CSV files should be the output of Twitter scraper

## Training

Since this is a POC, train a subset of scraper data / twitter data with choices as *crime* and *nocrime*, and then evaluate the performance in classifier.

The trained classifier is saved in */data* folder at `data/knowledge.json`

## Dependencies

This training / classification system is based on the Naive Bayes Classifier provided by open source project [Natural Node](https://github.com/NaturalNode/natural). To better understand its API, head over to the repo.

## Contributing

All bugs should be reported in Github [issues](https://github.com/iemdatagroup/newsclassifier-node/issues). Create a new issue and then it will be assigned / or addressed in a PR.

Head over to [Contributing](CONTRIBUTING.md) page for more info about how to file PR and preferred workflow.

## Roadmap

* Complete training and automate classification
* Achieve > 95% success in classification
* Extract crime details data from crime document (will be a separate repo)

## About

*"DataMaestro"*, Data Mining / Machine Learning Research Group of [Institute of Engineering & Management, Kolkata](http://iem.edu.in) under the guidance of **Prof. Saptarsi Goswami**

[MIT](LICENSE) License

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
