import { hexlify, hexZeroPad } from "@ethersproject/bytes";
import { toUtf8Bytes } from "@ethersproject/strings";
import { Umbra, SendOverrides } from "@umbracash/umbra-js";

import { ethers } from "ethers";
import { GANACHE_RPC_URL } from "../config.ts";
//import { signer } from "the/users/connected/wallet"; // assume user previously connected wallet and has signer


const goerli_provider = new  ethers.providers.JsonRpcProvider(GANACHE_RPC_URL);
const signer = goerli_provider.getSigner(1)
const address_signer = await signer.getAddress()
const balance = await goerli_provider.getBalance(address_signer)
console.log(balance)
// Define the special address the Umbra contract uses to represent ETH
const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

// Define the send parameters
const recipientId = "0x7282A3D5D516d86EEE4841623DF111E478c8Ab93";
const amount = ethers.utils.parseUnits("1", 18); // sending 1 ETH
const tokenAddress = ETH_ADDRESS; // we're sending ETh

// Get token approvals if necessary
if (tokenAddress !== ETH_ADDRESS) {
  // check allowance, and if allowance is insufficient, request approval transaction
}

// Define an optional payload extension. If you don't want to provide one, either leave out the
// overrides parameter or simply leave the `payloadExtension` out of the overrides object.
// Here we convert a string to hex and pad it to ensure it's 16 bytes
const payloadExtension = hexZeroPad(hexlify(toUtf8Bytes("Hello world!")), 16);


// Define our overrides
const overrides = { payloadExtension /* gasPrice, gasLimit */ } as SendOverrides ;

// Send the transaction
const provider = signer.provider;
console.log(await provider.getNetwork())
const umbra = new Umbra(goerli_provider, goerli_provider.network.chainId);
console.log("Sending funds to Umbra...");
const { tx, stealthKeyPair } = await umbra.send(
  signer,
  tokenAddress,
  amount,
  recipientId,
  overrides
);
await tx.wait(); // transaction mined
console.log("Transaction hash:", tx.hash);
// stealthKeyPair.address gives the address funds were sent to