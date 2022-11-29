---
title: Creating my portfolio site
date: 2022-11-21
order: 0
readTime: 2 min.
headerImage: /assets/img/device_mashups.jpg
description: Personal portfolio site to showcase my projects. The site is self-hosted using a Linode VPS, eleventy for the static site generation and GitHub actions for automatic deployment.
---

The goal was to create a self-hosted website that can be used as a portfolio to showcase some of my projects. In the past, I hosted through Squarespace, but I wanted more control over the site and also used it to learn more about server setups.

The site is hosted on a Linode VPS running Linux. Content, such as posts and potential blog posts, are written in Markdown and then converted into static HTML pages. I've settled on [eleventy (11ty)](https://github.com/11ty/eleventy) as the static site generator due to its speed and the fact that I'm already familiar with JavaScript and Node.js. In addition, eleventy seems pretty solid and supports various templating formats, such as Markdown and Nunjucks.

![](../../../assets/img/device_mashups.jpg)

## Deployment

Automatic deployment is handled with GitHub actions. This allows new content or changes to be automatically built and deployed when pushing to my main branch. If interested, I use the GitHub workflow below to build and deploy to my server.

```yaml
name: github-deploy
on:
  push:
    branches:
      - main
jobs:
  write-to-console:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x]
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies & build
        run: |
          npm ci
          npm run build
      - name: Install SSH Key
        uses: shimataro/ssh-key-action@v2
        with:
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          known_hosts: "placeholder"
      - name: Adding Known Hosts
        run: ssh-keyscan -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts
      - name: Deploy with rsync
        run: rsync -avz ./public/* ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:/var/www/stauffersimon.com
```

## Design

The design of the site was inspired by wired.com and nike.com. I was striving for a clean but sophisticated look. No framework was used, and the CSS was written from scratch. Low-fidelity wireframes were used to explore the basic layout before jumping into Figma to work out spacing and typography.

![](../../../assets/img/wireframes.jpg)

Regarding typography, I'm using [Inter](https://github.com/rsms/inter) for the body text. Inter was explicitly designed with screens in mind and featured a tall x-height to increase readability. The headings are set in [Roboto](https://fonts.google.com/specimen/Roboto) to add a little more weight to them. Again, I wanted to keep it simple but decided to add some interest in drop caps.
