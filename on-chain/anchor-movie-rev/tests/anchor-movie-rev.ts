import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { expect } from "chai";
import { AnchorMovieRev } from "../target/types/anchor_movie_rev";

describe("anchor-movie-rev", () => {
  // Configure the client to use the local cluster.
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

  it("Movie rev added", async () => {
    const tx = await program.methods
      .addMovieReview(movie.title, movie.description, movie.rating)
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
