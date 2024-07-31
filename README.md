# Nuxt SSR Firebase

This repository is created as a sample of using nuxt3 SSR with native firebase functions + hosting + storage.

**DEMO**: https://nuxt3-ssr-firebase.web.app/

|                                                                                                                                                                                                                                            |                                                                                                                                                                                                                                             |
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|      <img width="1604" alt="Home Dark" src="https://firebasestorage.googleapis.com/v0/b/nuxt3-ssr-firebase.appspot.com/o/github%2FScreenshot%202024-07-25%20at%2023.15.50.png?alt=media&token=85819e34-cf10-4c48-9522-e2cd18fb2028">       |      <img width="1604" alt="Home Light" src="https://firebasestorage.googleapis.com/v0/b/nuxt3-ssr-firebase.appspot.com/o/github%2FScreenshot%202024-07-25%20at%2023.42.18.png?alt=media&token=48fceae9-258d-4591-9da6-a87671967ea3">       |
|     <img width="1604" alt="Profile Dark" src="https://firebasestorage.googleapis.com/v0/b/nuxt3-ssr-firebase.appspot.com/o/github%2FScreenshot%202024-07-25%20at%2023.16.11.png?alt=media&token=5fbda20a-23b8-4ad5-b8f9-94c9b8f42160">     |     <img width="1604" alt="Profile Light" src="https://firebasestorage.googleapis.com/v0/b/nuxt3-ssr-firebase.appspot.com/o/github%2FScreenshot%202024-07-25%20at%2023.42.29.png?alt=media&token=8fcf18e1-374f-473f-b187-8f23daf4398f">     |
|  <img width="1604" alt="Settings Top Dark" src="https://firebasestorage.googleapis.com/v0/b/nuxt3-ssr-firebase.appspot.com/o/github%2FScreenshot%202024-07-25%20at%2023.17.16.png?alt=media&token=aa215b79-e30d-409d-877b-70183d334cda">   |  <img width="1604" alt="Settings Top Light" src="https://firebasestorage.googleapis.com/v0/b/nuxt3-ssr-firebase.appspot.com/o/github%2FScreenshot%202024-07-25%20at%2023.42.38.png?alt=media&token=55f5578d-e3c0-4ebb-9c33-f530dd024344">   |
| <img width="1604" alt="Settings Bottom Dark" src="https://firebasestorage.googleapis.com/v0/b/nuxt3-ssr-firebase.appspot.com/o/github%2FScreenshot%202024-07-25%20at%2023.17.37.png?alt=media&token=1105a5c1-3993-4902-9009-9727bafaeb97"> | <img width="1604" alt="Settings Bottom Light" src="https://firebasestorage.googleapis.com/v0/b/nuxt3-ssr-firebase.appspot.com/o/github%2FScreenshot%202024-07-25%20at%2023.42.51.png?alt=media&token=3ed3d859-545d-46c5-9a5b-366eea767850"> |
|      <img width="1604" alt="Login Dark" src="https://firebasestorage.googleapis.com/v0/b/nuxt3-ssr-firebase.appspot.com/o/github%2FScreenshot%202024-07-25%20at%2023.15.35.png?alt=media&token=d0cb45cc-b20f-4a79-8a30-584aa48db485">      |      <img width="1604" alt="Login Light" src="https://firebasestorage.googleapis.com/v0/b/nuxt3-ssr-firebase.appspot.com/o/github%2FScreenshot%202024-07-25%20at%2023.43.24.png?alt=media&token=c672660e-35ae-46f8-99ae-df6644be1dff">      | 
|    <img width="1604" alt="Register Dark" src="https://firebasestorage.googleapis.com/v0/b/nuxt3-ssr-firebase.appspot.com/o/github%2FScreenshot%202024-07-25%20at%2023.15.25.png?alt=media&token=c9c6b59e-bfbb-4ac7-aecc-c7b185c60567">     |    <img width="1604" alt="Register Light" src="https://firebasestorage.googleapis.com/v0/b/nuxt3-ssr-firebase.appspot.com/o/github%2FScreenshot%202024-07-25%20at%2023.43.37.png?alt=media&token=0c56fc63-2a30-4678-a6cc-fa1a374db06c">     | 

## Stack

Hosting:

* SSR
* gen 2
* node 20

Firebase authentication:

* register
* login
* forget password
* reset password
* google authentication
* twitter authentication
* facebook authentication

Firebase storage:

* upload file

Other:

* Dark Mode
* SEO
* NuxtUI
* NuxtUI-pro
* tailwindcss
* iconify
* i18n
* sitemap
* gtag
* eslint + stylistic

## Setup

### .env configuration

- copy `.env.example` file as `.env`

```shell
cp .env.example .env
```

- update `.env` file content with your firebase configuration

> GOOGLE_APPLICATION_CREDENTIALS must be the single line of the service account file
> content [Admin-SDK](https://vuefire.vuejs.org/nuxt/environment-variables.html#Admin-SDK)

### Run

```shell
# install the npm modules
npm install
```

```shell
# run the app
npm run dev

```

## Command shortcuts

* `dev`: start the app on local
* `clear`: delete .nuxt .output .firebase folders
* `clear-all`: node_modules .nuxt .output .firebase folders and package-lock.json file
* `emulator`: run the app in firebase emulators
* `deploy`: deploy the app to the firebase prod
* `upgrade`: upgrade all npm modules and install all
* `lint:fix`: fixing eslint and stylistic issues if possible