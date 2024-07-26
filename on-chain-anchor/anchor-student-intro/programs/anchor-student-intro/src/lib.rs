use anchor_lang::prelude::*;
use anchor_spl::token::{mint_to, MintTo, Mint, TokenAccount, Token};
use anchor_spl::associated_token::AssociatedToken;

const ANCHOR_DISCRIMINATOR: usize = 8;
const PUBKEY_SIZE: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4;

declare_id!("Aq5DdP8DnpVF6wpvd3uQZzzCBzcT5MG8gLEFkwhAXYfW");

#[program]
pub mod anchor_student_intro {
    use super::*;

    pub fn add_student_intro(
        ctx: Context<AddStudentIntro>,
        name: String,
        message: String,
    ) -> Result<()> {
        msg!("Student Account Created");
        msg!("Name: {}", name);
        msg!("Message: {}", message);

        require!(name != "" && message != "", StudentIntroError::InvalidIntro);

        let student_intro = &mut ctx.accounts.student_intro;
        student_intro.student = ctx.accounts.initializer.key();
        student_intro.name = name;
        student_intro.message = message;
        
        mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                MintTo {
                    authority: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.token_account.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                },
                &[&[
                    "mint".as_bytes(),
                    &[ctx.bumps.mint]
                ]]
            ),
            10*10^6
        )?;
        
        msg!("Minted tokens");
        
        Ok(())     
    }

    pub fn update_student_intro(
        ctx: Context<UpdateStudentIntro>,
        name: String,
        message: String,
    ) -> Result<()> {
        msg!("Studen account space reallocated");
        msg!("Name: {}", name);
        msg!("Message: {}", message);

        require!(name != "" && message != "", StudentIntroError::InvalidIntro);

        let student_intro = &mut ctx.accounts.student_intro;
        student_intro.message = message;
        
        Ok(())
    }

    pub fn delete_student_intro(
        _ctx: Context<DeleteStudentIntro>,
        name: String,
    ) -> Result<()> {
        msg!("Student entry for {} has been deleted", name);
        Ok(())
    }

    pub fn initialize_token_mint(_ctx: Context<InitializeMint>) -> Result <()> {
        msg!("Token mint initialized");
        Ok(())
    }
    
}

#[account]
pub struct StudentIntroState {
    pub student: Pubkey,
    pub name: String,
    pub message: String,
}

impl Space for StudentIntroState {
    const INIT_SPACE: usize = ANCHOR_DISCRIMINATOR + PUBKEY_SIZE + STRING_LENGTH_PREFIX + STRING_LENGTH_PREFIX;
}

#[derive(Accounts)]
#[instruction(name:String, message:String)]
pub struct AddStudentIntro<'info> {
    #[account(
        init,
        seeds = [name.as_bytes(), initializer.key().as_ref()],
        bump, 
        payer = initializer,
        space = StudentIntroState::INIT_SPACE + name.len() + message.len()
    )]
    pub student_intro: Account<'info, StudentIntroState>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
    
    //added
    pub token_program: Program<'info, Token>,
    #[account(
        seeds = ["mint".as_bytes()],
        bump,
        mut
    )]
    pub mint: Account<'info, Mint>,
    #[account(
        init_if_needed,
        payer = initializer,
        associated_token::mint = mint,
        associated_token::authority = initializer
    )]
    pub token_account: Account<'info, TokenAccount>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>
}

#[derive(Accounts)]
#[instruction(name:String, message:String)]
pub struct UpdateStudentIntro<'info> {
    #[account(
        mut, 
        seeds = [name.as_bytes(), initializer.key().as_ref()],
        bump, 
        realloc = StudentIntroState::INIT_SPACE + name.len() + message.len(),
        realloc::payer = initializer,
        realloc::zero = true, 
    )]
    pub student_intro: Account<'info, StudentIntroState>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct DeleteStudentIntro<'info> {
    #[account(
        mut, 
        seeds=[name.as_bytes(), initializer.key().as_ref()],
        bump,
        close=initializer
    )]
    pub student_intro: Account<'info, StudentIntroState>,
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>
}



#[derive(Accounts)]
pub struct InitializeMint<'info> {
    #[account(
        init, 
        seeds = ["mint".as_bytes()],
        bump,
        payer = user,
        mint::decimals = 6,
        mint::authority = mint,
    )]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>
}

#[error_code]
enum StudentIntroError {
    #[msg("Rating must be between 1 and 5")]
    InvalidIntro
}

//CONT FROM - Disecting update_movie_review