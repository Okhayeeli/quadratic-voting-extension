## 🗳️ 📊 Quadratic Voting Extension using EAS for Attestation

This project implements a quadratic voting system with Ethereum Attestation Service (EAS) integration for vote attestation. It serves as an extension for BuildGuild, enhancing the voting process with quadratic mechanics and on-chain attestations.


## How it works

In this quadratic voting system, users are allocated a certain number of credits which they can distribute among candidates. The number of votes a candidate receives is calculated as the square root of the credits allocated to them. This allows voters to express the intensity of their preferences more accurately than in traditional voting systems.

When a user casts a vote, the following happens:

1. The user specifies the candidate ID and the number of credits they want to allocate.
2. The contract calculates the square root of the credits to determine the number of votes.
3. The votes are added to the candidate's total.
4. The user's credit balance is reduced by the number of credits used.
5. A second transaction is initiated to create an attestation using EAS, recording the vote immutably on the blockchain.

### Attestation Process

- After the initial voting transaction, a second transaction is sent to create an on-chain attestation of the vote.
- Users have the option to decline this second transaction if they prefer not to have their vote attested on-chain.
- The VOTERS_UID for attestations is: `0x4dd00e683543520f2efe3ec546ae6f8e306e37460d4142000f23d7e8b75d68ee`
- Voters can check their on-chain attestations at [https://sepolia.easscan.org/](https://sepolia.easscan.org/) by inputting the VOTERS_UID 

The use of EAS ensures that each vote is securely recorded and can be verified, adding an extra layer of transparency and trust to the voting process.

## Key Features

- Quadratic voting mechanism
- EAS integration for vote attestation
- Dynamic candidate addition
- Real-time vote counting
- Credit-based voting system
- Optional on-chain attestation for privacy-conscious users

## Deployment

The contract is deployed to the [Insert Network Name] testnet and the frontend is deployed at [Insert Frontend URL]


🏗 Scaffold-ETH 2
🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.
⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.
Requirements
Before you begin, you need to install the following tools:

Node (v18 LTS)
Yarn (v1 or v2+)
Git


## Quickstart

To get started with the the Quadratic Voting Extension built off Scaffold-eth, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd quadratic-voting-extension
yarn install
```


2. On a same terminal, deploy the test contract:

```
yarn deploy --network sepolia  or network of choice
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

3. On a second terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `QuadraticVoting.sol` in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.