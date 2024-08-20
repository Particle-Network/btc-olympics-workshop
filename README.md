<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/P391e8h.png" />
  </a>
</div>

# Particle Network x BTC Olympics Hackathon — BTC Connect Workshop (React)

⚡️ This workshop demonstrates how to implement Particle Network's BTC Connect, enabling ERC-4337 Account Abstraction through native Bitcoin wallets on the [BEVM](https://documents.bevm.io/) network. BEVM is a Bitcoin Layer-2 network built on Substrate, fully compatible with the Ethereum Virtual Machine (EVM).

## Project Description

This repository serves as the starter template for the workshop. The completed application allows users to connect their native Bitcoin wallet to the app and transfer BTC to an address via both the BEVM and Bitcoin networks, using the native Bitcoin wallet as the sole interaction point.

Find the [BEVM Faucet](https://documents.bevm.io/build-decentralized-apps/faucet/get-faucet-on-bevm-testnet) on the BEVM docs.

> This repository provides the foundation for the workshop, where participants will learn how to build and enhance the app using BTC Connect.

This project is built using the following: 

- React native using `npx create-react-app`
- JavaScript
- Tailwind CSS
- Particle Network's [BTC Connect](https://developers.particle.network/docs/btc-connect)
- ethers.js V6.x.x

> Note that the project is inside the `btc-connect-start` directory.

Follow the [Quickstart](#quickstart) instructions to spin up the project, or follow the [project setup instructions](#create-a-react-project-from-scratch) to configure the React project from scratch. 

## ₿ BTC Connect
BTC Connect takes advantage of ERC-4337 alongside (Bitcoin) Layer-2 EVM-compatible blockchains to leverage a Smart Account, Paymaster, and Bundler natively within Bitcoin wallets (connected to through a Bitcoin-specific modal also provided by BTC Connect). At its core, BTC Connect enables existing BTC wallets to control smart accounts on Layer-2s.

![](https://i.imgur.com/7bZ3dGw.png)

## Quickstart

### Clone this repository
```
git clone https://github.com/soos3d/btc-connect-B2-react-app.git
```

### Access the React app project

```sh
cd btc-connect-start
```

### Install dependencies
```sh
yarn install
```
Or

```sh
npm install
```

### Set environment variables
This project requires several keys from Particle Network to be defined in `.env`. The following should be defined:
- `REACT_APP_APP_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_PROJECT_ID`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_CLIENT_KEY`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).

### Start the project
```
npm run start
```
OR
```
yarn start
```

## Create a React project from scratch

You can follow these instructions if you want to configure the React project from zero.

### Create a React project

```sh
npx create-react-app particle-network-project
```

```sh
cd particle-network-project
```

## Install Tailwind CSS

This step is optional; follow it only if you want to use Tailwind CSS for the styling.

Follow the instructions in the [Tailwind CSS docs](https://tailwindcss.com/docs/guides/create-react-app).

## Fix Node JS polyfills issues

You will run into issues when building when using `create-react-app` versions 5 and above. This is because the latest versions of `create-react-app` do not include NodeJS polyfills.

Use `react-app-rewired` and install the missing modules to fix this.

If you are using Yarn

```sh
yarn add --dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process vm-browserify browserify-zlib
```

If you are using NPM

```sh
npm install --save-dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process vm-browserify browserify-zlib
```

Then Create a `config-overrides.js` in the root of your project directory and add the following:

```js
const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        "vm": require.resolve("vm-browserify")
    })
    config.resolve.fallback = fallback;
    config.ignoreWarnings = [/Failed to parse source map/];
    config.module.rules.unshift({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false, // disable the behavior
        },
      });
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    return config;
}
```

In `package.json` replace the starting scripts with the following:

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
```

Opional, add this to `config-overrides.js` if you want to hide the warnings created by the console:

```js
config.ignoreWarnings = [/Failed to parse source map/];
```

## Install Particle Network's BTC Connect and ethers

Now you can install BTC Connect and ethers.js:

```sh 
yarn add @particle-network/btc-connectkit ethers @particle-network/chains
```

or

```sh
npm install @particle-network/btc-connectkit ethers @particle-network/chains
```

> Learn more about the [BTC Connect SDK](https://developers.particle.network/reference/btc-connect-web) on the Particle Network's docs.
