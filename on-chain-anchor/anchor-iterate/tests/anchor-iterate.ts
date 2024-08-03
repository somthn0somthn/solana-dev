import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorIterate } from "../target/types/anchor_iterate";

describe("anchor-iterate", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AnchorIterate as Program<AnchorIterate>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.sayHello().rpc();
    console.log("Your transaction signature", tx);
  });
});
