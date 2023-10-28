import "dotenv/config"
const base58 = require("bs58");
import * as Web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"

const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"))
const publickey = new Web3.PublicKey("Agd2hRTJmoQkS4y6QXXfr9RV2nWrPWkKWJ2EJ83Zczej")
const decoded = base58.decode("iohHY9MYDFcVereGpsvFDyu6ipt4gKDQzgHUPPFrxi87x8X8EkJKazjzPYtibYLogkhRqen1kNNJWJvQHx31zn7")
const keyPair = Web3.Keypair.fromSecretKey(decoded)
const tokenMint = "FZa3eF1v9Rd33AqHqPQG3oyUfuJN8GgakkYBLYzZoam3"

async function main(){
    const tokenAccount  = await token.createAccount(
        connection, // connection
        keyPair, // signer
        new Web3.PublicKey(tokenMint), // mint public key
        publickey, // owner of the token-account
    );
    console.log(tokenAccount.toBase58());
}

main();