import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { expect } from "chai";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token"
import { AnchorMovieRev } from "../target/types/anchor_movie_rev";
import idl from "../target/idl/anchor_movie_rev.json";


describe("anchor-movie-rev", () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorMovieRev as Program<AnchorMovieRev>;

  const movie = {
    title: "Just a test movie",
    description: "Wow what a good movie unbelievable",
    rating: 5,
  }

  const [moviePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(movie.title), provider.wallet.publicKey.toBuffer()],
    program.programId
  )

  const [mint] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("mint")],
    program.programId
  )

  it("Initializes the reward token", async () => {
    const tx = await program.methods.initializeTokenMint().rpc()
  });

  it("Movie rev added with token mint", async () => {
    const tokenAccount = await getAssociatedTokenAddress(
      mint,
      provider.wallet.publicKey
    )

    const tx = await program.methods
      .addMovieReview(movie.title, movie.description, movie.rating)
      .accounts({
        tokenAccount: tokenAccount,
      })
      .rpc()

    const account = await program.account.movieAccountState.fetch(moviePda)
    expect(movie.title === account.title)
    expect(movie.rating === account.rating)
    expect(movie.description === account.description)
    expect(account.reviewer === provider.wallet.publicKey)
  });

  it("Movie rev updated", async () => {
    const newDescription = "Wow this is new"
    const newRating = 4

    const tx = await program.methods
      .updateMovieReview(movie.title, newDescription, newRating)
      .rpc()

    const account = await program.account.movieAccountState.fetch(moviePda)
    expect(movie.title === account.title)
    expect(newRating === account.rating)
    expect(newDescription === account.description)
    expect(account.reviewer === provider.wallet.publicKey)
  });

  it("Movie rev deleted", async () => {
    const tx = await program.methods
      .deleteMovieReview(movie.title)
      .rpc()
  });
});
