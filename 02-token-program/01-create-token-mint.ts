const base58 = require("bs58");
import * as Web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"

const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));

const publickey = new Web3.PublicKey('DPTmfmFH6nnzsae5Ny964rNDAyTsTty4URKzFhJRnoWB');
const decoded = base58.decode('iohHY9MYDFcVereGpsvFDyu6ipt4gKDQzgHUPPFrxi87x8X8EkJKazjzPYtibYLogkhRqen1kNNJWJvQHx31zn7');
const keyPair = Web3.Keypair.fromSecretKey(decoded);

async function main(){
    const tokenMint = await token.createMint(
        connection,
        keyPair,
        publickey, // mint auth
        publickey, // freeze auth
        9 //decimals
    )
    console.log(tokenMint.toBase58());
}

main();