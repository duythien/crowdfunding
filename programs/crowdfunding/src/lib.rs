use anchor_lang::prelude::*;

declare_id!("22uAKeDnMuVs2T5HAem9jJxTSnpTf5bMGbgrCfsTFwpC");

#[program]
pub mod crowdfunding {
    use super::*;

    pub fn create(ctx: Context<Create>, name: String, description: String) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);

        let campaign = &mut ctx.accounts.campaign;
        campaign.name = name;
        campaign.description = description;
        campaign.amount_donated = 0;
        campaign.user = *ctx.accounts.user.key;
        campaign.bump = ctx.bumps.campaign;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    // #[account(init, payer = user, space = 9000, seeds = [b"CAMPAIGN_DOG", user.key().as_ref()], bump)]
    #[account(init, seeds = [b"data", user.key().as_ref()], bump, payer = user, space = 9000)]
    pub campaign: Account<'info, Campaign>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}
#[account]
pub struct Campaign {
    name: String,
    description: String,
    amount_donated: u64,
    user: Pubkey,
    bump: u8,
}
