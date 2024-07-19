import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { expect } from "chai";
import { AnchorStudentIntro } from "../target/types/anchor_student_intro";

describe("anchor-student-intro", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorStudentIntro as Program<AnchorStudentIntro>;

  const student = {
    name: "Alex Johnson",
    message: "Hi, I'm Alex! I'm currently a computer science major with a passion for AI and machine learning.",
  }

  const [studentPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(student.name), provider.wallet.publicKey.toBuffer()],
    program.programId
  )

  it("Student added", async () => {
    const tx = await program.methods
      .addStudentIntro(student.name, student.message)
      .rpc()
    
    const account = await program.account.studentIntroState.fetch(studentPda)
    expect(student.name === account.name)
    expect(student.message === account.message)
    expect(account.student === provider.wallet.publicKey)
  })

  it("Student Updated", async () => {
    const newMessage = "Oh, and I also love tacos and burritos"
    
    const tx = await program.methods
      .updateStudentIntro(student.name, newMessage)
      .rpc()
    
    const account = await program.account.studentIntroState.fetch(studentPda)
    expect(student.name === account.name)
    expect(newMessage === account.message)
    expect(account.student === provider.wallet.publicKey)
  })

  it("Deletes student account", async () => {
    const tx = await program.methods
      .deleteStudentIntro(student.name)
      .rpc()
  })

});
