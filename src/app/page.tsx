"use client";
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { UmiProvider } from "./components/UmiProvider";
import SendNFTButton from "./components/SendNFTButton";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const network = WalletAdapterNetwork.Mainnet;
const endpoint =
  "https://burned-broken-pool.solana-mainnet.quiknode.pro/c8ef94e3d7ab0fb93d9d86f0179c1451f3d0ac5c/";

export default function Home() {
  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <UmiProvider endpoint={endpoint}>
              <WalletModalProvider>
                <WalletMultiButton />
                <WalletDisconnectButton />

                <SendNFTButton />
              </WalletModalProvider>
            </UmiProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </main>
  );
}
