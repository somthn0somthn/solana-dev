use anchor_lang::prelude::*;

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

        let student_intro = &mut ctx.accounts.student_intro;
        student_intro.student = ctx.accounts.initializer.key();
        student_intro.name = name;
        student_intro.message = message;
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