use anchor_lang::prelude::*;

declare_id!("4XGJSRMVbasbbezWHop5HYHWAfbKgWUr785g8vzHj2Yq");

#[program]
pub mod anchor_iterate {
    use super::*;

    pub fn say_hello(ctx: Context<Initialize>) -> Result<()> {
        msg!("hello world!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub user: Signer<'info>
}
