# newsclassifier-node
Node command line app to classify news based on headlines

## Introduction

This is a POC on Bayes Classification of News articles. We use a node module [Natural Node](https://github.com/NaturalNode/natural) to perform classification on news articles based on their headlines. Our primary goal is to scrape the news sources of Kolkata, India using [KimonoLab Scraper API](https://www.kimonolabs.com), and then classify them into two distinct categories : *Crime* and *Non Crime*. Finally, after classification we will extract the data from the crime articles, regarding the type of crime, place of occurrence etc and build our own database, upon which we can further perform learning tasks.

## How to use

Before using, make sure you have the latest [Node.js](https://nodejs.org/) installed in your computer.

First, clone this repository.

`git clone https://github.com/iemdatagroup/newsclassifier-node.git`

Then, cd into **newsclassifier-node** and run :

`npm install`

This will install the necessary dependencies. Next, proceed with training or classifying :

`npm start`

## Inputs

Currently, the api's only support [KimonoLab's API](https://www.kimonolabs.com). When prompted, you should enter a valid api such as :

`https://www.kimonolabs.com/api/<api_id>?apikey=<api_key>`

You should also run the scraper before hand having the following properties in the scraper api :
* `headlines`
* `url`

## Training

Since this is a POC, train a subset of scraper data with choices as *crime* and *nocrime*, and then evaluate the performance in classifier. Also, if the classifier outputs wrong class, then provide necessary feedback in the program.

The trained classifiers are saved in */data* folder. When prompted to save / load file, **only** provide the file name, not the path or extension.

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
