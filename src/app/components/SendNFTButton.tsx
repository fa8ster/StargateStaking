"use client";
import React from "react";
import { transferV1 } from "@metaplex-foundation/mpl-token-metadata";
// import { PublicKey } from "@solana/web3.js";
import { publicKey } from "@metaplex-foundation/umi";
import {
  publicKey as publicKeySerializer,
  string,
} from "@metaplex-foundation/umi/serializers";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUmi } from "./useUmi";

const SendNFTButton = () => {
  const umi = useUmi();
  const wallet = useWallet();

  // Use tokenStandard: 4 for pNFTs and 0 for NFTs
  // Our collection is pNFTs but we should make a cross check. If "4" throws an error we should try "0"
  const sendNFT = async (
    mint: publicKey,
    tokenOwner: publicKey,
    destinationOwner: publicKey
  ): Promise<void> => {
    await transferV1(umi, {
      mint,
      tokenOwner: tokenOwner,
      destinationOwner: destinationOwner,
      tokenStandard: 4,
    }).sendAndConfirm(umi);
  };

  const handleSendNFT = async () => {
    if (!wallet.publicKey) {
      console.log("No Wallet");
      throw new WalletNotConnectedError();
    }

    // Replace these with the actual mint, currentOwner, and newOwner values
    // The Mint is the Token Address of the NFT you want to send to the Stargate Mission
    // The destinationOwner is the Wallet where we want to send the NFT
    const mint = publicKey("GNhs45pcHrBRk7vCWm3Dj637YsBPvE2a6oyoRWZmeiqX");
    const tokenOwner = publicKey(wallet.publicKey);
    const destinationOwner = publicKey(
      "CieRzEn1nwbqoA48qKTsTjAxjyThAGE4Su7CY4nW86Yc"
    );

    const tokenMetadataProgramId = publicKey(
      "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
    );
    const metadata = umi.eddsa.findPda(tokenMetadataProgramId, [
      string({ size: "variable" }).serialize("metadata"),
      publicKeySerializer().serialize(tokenMetadataProgramId),
      publicKeySerializer().serialize(mint),
    ]);

    sendNFT(mint, tokenOwner, destinationOwner);
  };

  return (
    <button type="button" onClick={handleSendNFT}>
      Send NFT
    </button>
  );
};
export default SendNFTButton;
