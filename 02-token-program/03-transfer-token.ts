const {
    clusterApiUrl,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey
} = require('@solana/web3.js');
const {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    transfer
} = require('@solana/spl-token');
const base58 = require("bs58");


(async () => {
    // Connect to cluster
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const publickey = new PublicKey("DPTmfmFH6nnzsae5Ny964rNDAyTsTty4URKzFhJRnoWB")
    const decoded = base58.decode("iohHY9MYDFcVereGpsvFDyu6ipt4gKDQzgHUPPFrxi87x8X8EkJKazjzPYtibYLogkhRqen1kNNJWJvQHx31zn7")
    const fromWallet = Keypair.fromSecretKey(decoded)
    
    const toWallet = new PublicKey("Agd2hRTJmoQkS4y6QXXfr9RV2nWrPWkKWJ2EJ83Zczej")

    // Create new token mint
    const mint = await createMint(
        connection,
        fromWallet, //keyPair
        fromWallet.publicKey, //mint Auth
        null, //freeze Auth
        9
    );

    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,             // signer
        mint,                   //mint public key
        fromWallet.publicKey    //owner of the token account
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet);

    // Mint 100 new token to the "fromTokenAccount" account we just created
    let signature = await mintTo(
        connection,
        fromWallet,                 // Sender's wallet
        mint,                       // Token Mint
        fromTokenAccount.address,   // Source token account's public key
        fromWallet.publicKey,       // Signer's public key
        100000000000                // number of tokens to mint and transfer
    );
    console.log('mint tx:', signature);

    // Transfer the new token to the "toTokenAccount" we just created
    signature = await transfer(
        connection,                 
        fromWallet,                 // Sender's wallet (with private key)
        fromTokenAccount.address,   // Source token account's public key
        toTokenAccount.address,     // Destination token account's public key
        fromWallet.publicKey,       // Signer's public key (typically the sender)
        100                         // Number of tokens to transfer
    );
})();