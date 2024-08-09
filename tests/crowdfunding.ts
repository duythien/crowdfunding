import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Crowdfunding } from "../target/types/crowdfunding";
import assert from "assert";

describe("crowdfunding", () => {
  // Configure the client to use the local cluster.

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.crowdfunding as Program<crowdfunding>;

  const calculator = anchor.web3.Keypair.generate();

  const systemProgram = anchor.web3.SystemProgram;
  it("Is initialized!", async () => {
    // Add your test here.
    await program.rpc.create("Hello solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: systemProgram.programId,
      },
      signers: [calculator]
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);

    assert.ok(account.greeting === "Hello solana")
  });
});
