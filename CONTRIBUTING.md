# Contributing

This document presents a new user tutorial to contribute and proper workflow.

To develop, follow the workflow :

**First Time**
1. Fork this repository
2. Configure your github user / email (skip this if already done) :
`git config --global user.name "Your Name"`,
`git config --global user.email "your_email@address.com"`

3. Also, set this option to avoid unintentional remote branch update : `git config --global push.default upstream`

4. Git clone your own Fork
5. Add upstream repository to local git :
`git remote add upstream https://github.com/iemdatagroup/newsclassifier-node.git`

**Every time**

1. Pull the changes of the original repository to your local machine : `git fetch upstream` and then merge it with your local repository `git merge upstream/master`
2. Create & checkout a new branch to code : `git checkout -b <new_branch>`
3. Code the changes and add the changed files :
`git add .` or `git add <file_names>`
4. Commit using a proper commit message : `git commit -m <your_commit_msg>`
5. Push to your fork : `git push origin <branch>`
6. Now head over to Github page of your fork, and click *Compare and Pull Request* to file a PR. 
