const { Connection, Keypair, LAMPORTS_PER_SOL, Transaction,sendAndConfirmTransaction } = require('@solana/web3.js');
const base58 = require('bs58');

const { Token, TOKEN_PROGRAM_ID,createMint,getOrCreateAssociatedTokenAccount, mintTo, createBurnInstruction } = require('@solana/spl-token');
const connection = new Connection('https://api.devnet.solana.com');
//const connection = new Connection('https://api.mainnet-beta.solana.com');

const secretKey = new Uint8Array([26, 62, 51, 43, 93, 209, 77, 77, 74, 244, 1, 26, 166, 17, 30, 156, 168, 12, 28, 165, 15, 2, 123, 114, 92, 249, 63, 201, 36, 69, 43, 39, 173, 222, 203, 175, 155, 228, 242, 27, 130, 40, 59, 40, 167, 21, 47, 243, 174, 190, 108, 207, 86, 28, 197, 171, 50, 71, 41, 125, 99, 224, 147, 216]);
const wallet = Keypair.fromSecretKey(base58.decode("33P59riDwoPNu6FgLf8dBAFzu14bFyKLhfdBKnyrm29hwz2Ms3UbzdSSac4WeR9eYa3xGWT1mofAxMMF4RhDYep9"))
console.log(wallet)
async function createWalletAndAirdrop() {
  
  // Request airdrop
  console.log("airdrop");
  //const airdropSignature = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL);
  //await connection.confirmTransaction(airdropSignature);

  return wallet;
}

async function createNFT() {
  const wallet = await createWalletAndAirdrop();
  const nftAccount = Keypair.generate();

  // Create a new mint
  const mint = await createMint(
    connection,
    wallet,
    wallet.publicKey,
    wallet.publicKey,
    1,
    Keypair.generate(),
    true
  );
  console.log("mint:",mint);
  // Create associated token account
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    wallet.publicKey
  )  
  console.log("tokenaccount:",tokenAccount.address.toBase58());
  // Mint 1 token to the associated account
  await mintTo(connection,wallet,mint,tokenAccount.address,wallet,10);
    
  return { wallet, nftAccount, mint, tokenAccount };
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function burnNFT() {
  const { wallet, nftAccount, mint, tokenAccount } = await createNFT();
  sleep(60000)
  // Create a burn transaction
  // const transaction = new Transaction().add(createBurnInstruction(tokenAccount.address,mint,wallet.publicKey,1),);
  // console.log(wallet);
  // Send and confirm the burn transaction
  // await sendAndConfirmTransaction(connection,transaction, [wallet]);
}
// Run the burnNFT function
burnNFT();
