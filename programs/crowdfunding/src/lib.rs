use anchor_lang::prelude::*;

declare_id!("22uAKeDnMuVs2T5HAem9jJxTSnpTf5bMGbgrCfsTFwpC");

#[program]
pub mod crowdfunding {
    use super::*;

    pub fn create(ctx: Context<Create>, init_message: String) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);

        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 48)]
    pub calculator: Account<'info, Calculator>,

    #[account(mut)]
    pub user: Signer<'info>, //pub greeting: String,

    pub system_program: Program<'info, System>,
}
#[account]
pub struct Calculator {
    greeting: String,
}
