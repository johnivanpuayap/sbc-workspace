import * as Web3 from '@solana/web3.js';
import * as base58 from 'bs58';

async function main() {
    const decoded = base58.decode('iohHY9MYDFcVereGpsvFDyu6ipt4gKDQzgHUPPFrxi87x8X8EkJKazjzPYtibYLogkhRqen1kNNJWJvQHx31zn7')
    const keyPair = Web3.Keypair.fromSecretKey(decoded)

    const publicKeyFrom = new Web3.PublicKey('DPTmfmFH6nnzsae5Ny964rNDAyTsTty4URKzFhJRnoWB');
    const publicKeyTo = new Web3.PublicKey('Agd2hRTJmoQkS4y6QXXfr9RV2nWrPWkKWJ2EJ83Zczej');

    const instruction = Web3.SystemProgram.transfer({
        fromPubkey: publicKeyFrom,
        toPubkey: publicKeyTo,
        lamports: 1,
    });
    const transaction = new Web3.Transaction();
    transaction.add(instruction);

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const txSignature = await Web3.sendAndConfirmTransaction(connection, transaction, [keyPair]);

    console.log('txHash', txSignature)
}

main();