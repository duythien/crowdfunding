
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Crowdfunding } from "../target/types/crowdfunding";
import assert from "assert";
import { Keypair, PublicKey } from '@solana/web3.js';
describe("crowdfunding", () => {
  // Configure the client to use the local cluster.

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.crowdfunding as Program<crowdfunding>;


  const user = provider.wallet as anchor.Wallet;

  const systemProgram = anchor.web3.SystemProgram;
  it("Created an Campaign!", async () => {
    const CAMPAIGN_NAME = "Campaign Name";
    const CAMPAIGN_DESC = "Campaign Description"

    const [PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("data"), user.publicKey.toBuffer()],
      program.programId,
    );
    const transactionSignature = await program.methods
      .create(CAMPAIGN_NAME, CAMPAIGN_DESC)
      .accounts({
        campaign: PDA,
        user: user.publicKey,
        systemProgram: systemProgram.programId,
      })
      .rpc();

   
    //console.log(`   Mint Address: ${mintKeypair.publicKey}`);
    console.log(`   Transaction Signature: ${transactionSignature}`);

    const account = await program.account.campaign.fetch(PDA);

    //console.log(`   Transaction Signature: ${JSON.stringify(account)}`);

    assert.ok(account.name === CAMPAIGN_NAME)
    assert.ok(account.description === CAMPAIGN_DESC)

  });

  it("Withdraw an Campaign!", async () => {
   

    const [PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("data"), user.publicKey.toBuffer()],
      program.programId,
    );
    try {

      const transactionSignature = await program.methods
      .withdraw(new anchor.BN(1000000))
      .accounts({
        campaign: PDA,
        user: user.publicKey,
        systemProgram: systemProgram.programId,
      })
      .rpc();
    } catch(err) {

      const errMsg ="Insufficient funds";
      assert.strictEqual(err.error.errorMessage, errMsg);
      console.log("Error number:", err.error.errorCode.number);
    }
  });

});
