# ANTVERSE / USDT Lista implementation

## Status
**Read-only integration and deployment planning only.** No market, vault, oracle or loan has been deployed. No lender has committed 50,000 USDT. The public UI must not accept approvals or deposits.

## Official resources
- Market creation: https://docs.bsc.lista.org/user-guide/lista-lending/how-to-create-a-market
- Vault creation: https://docs.bsc.lista.org/user-guide/lista-lending/how-to-create-a-vault
- Oracle: https://docs.bsc.lista.org/introduction/lista-lending/oracle
- Market API: https://docs.bsc.lista.org/for-developer/services/lending-api/market

## On-chain market creation
Official guide identifies BNB Chain market contract: `0x8F73b65B4caAf64FBA2aF91cC5D4a2A1318E5D8C`. Confirm verified contract, implementation, ownership and ABI on BscScan before using. The createMarket parameters are loanToken, collateralToken, oracle, irm, lltv. IRM and LLTV must be enabled by the manager. Do not assume the documentation's example 80% LLTV is safe for ANTV.

## Oracle gate
Lista expects `peek(address)` returning 8-decimal USD prices. ANTV oracle requires independently verified executable market depth, multiple resistant sources, stale-data rejection, conservative fallback behavior, monitoring, and a liquidation simulation. Do NOT use an owner-set price, a thin-pool spot quote, or the wallet screenshot price. The oracle address is immutable in a market.

## Vault and lenders
A separate USDT vault may be created only after market risk review. A curator must explicitly set market caps and allocator queues, with an independent guardian and multisig. The existence of a vault does not mean it holds USDT. Lenders must actually deposit USDT and accept the risk.

## Required actions before funding
1. Verify BSC token code, total supply, permissions, and transfer behavior.
2. Obtain audited oracle and independent liquidator review.
3. Confirm enabled IRM and LLTV directly from verified Lista contract.
4. Complete fork-based integration tests and third-party smart-contract audit.
5. Confirm real USDT funding and signed commercial terms.
6. Require human approval of exact on-chain transaction data and addresses.
7. Create market, capture marketId, and independently verify on BscScan.
8. Create vault, configure multisig roles, supply caps and queues.
9. Verify deposits, borrow, repay, withdrawal, liquidation and emergency operations.
10. Activate only after external risk sign-off.

## Read-only commands
```bash
npm install
BSC_RPC_URL=https://your-trusted-bsc-rpc npm run lista:preflight
BSC_RPC_URL=https://your-trusted-bsc-rpc npm run lista:market
npm test
```

## Funding proposal
Seeking 50,000 USDT from an independent lender for a proposed isolated ANTV/USDT market. Token collateral and loan-to-value will be negotiated from independently realizable collateral value. No guaranteed returns or repayment are represented.
