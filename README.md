This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Relevant Code and Info

The `src/app/page.tsx` and `src/app/components` contain the relevant code.
`src/app/componentsSendNFTButton.tsx` is the main code for sending a pNFT on the Stargate Mission.

## pNFT vs NFT

All our collections should be pNFTs. But since the tech is new and buggy you should implement a fallback from `4` which is pNFTs to `0` which is a regular NFT for the `tokenStandard` in the `transferV1` method.

## Wallet Provider

This is what makes it a little complex. We probably have to change the wrapping Wallet Provider in the base.ageofsam.io with the new UMI Wallet Adapter.
I created some helpers to make this easier for you to understand and try.
