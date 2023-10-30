use anchor_lang::prelude::*;

declare_id!("463GgDpBgQDQ68CwEth4bAFpYmFS79vkpoQ61YBTG1pj");

#[program]
pub mod simple_solana_game {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
