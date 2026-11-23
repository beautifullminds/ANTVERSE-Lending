# ANTVERSE Lending — Safety-Gated Starter Project

**Not deployed on-chain, not audited, not funded, and not a complete Morpho integration.** Borrowing is disabled. The included custody prototype is NOT safe for production and is NOT a loan contract.

## Verified design constraints
- Morpho Vault V2 uses adapters, caps, separated owner/curator/allocator/sentinel roles, and dead deposits.
- Morpho's public Read API supported-chain list does not include BNB Chain as of the checked documentation. A custom deployment is a separate integration, not an official Morpho BNB deployment.
- The dead deposit must be the first vault mint. Its formula is `max(1e9, 10^(6 + max(0, 18 - decimals)))` shares.
- Each enabled underlying Morpho variable-rate market also needs 1e9 dead supply shares.

## Static dashboard
A non-transactional, read-only public information page is in `web/index.html`. GitHub Pages workflow is in `.github/workflows/pages.yml`.

## Start locally
```bash
npm install
BSC_RPC_URL=https://YOUR_TRUSTED_BSC_RPC npm run preflight
ASSET_DECIMALS=18 npm run dead-deposit
python3 -m http.server 8080 --directory web
```
Open http://localhost:8080. All scripts are read-only.

## Production implementation checklist
1. Verify network, token code, token transfer behavior, owner permissions, token supply and custody.
2. Confirm officially supported Morpho deployments; if unsupported on BSC, obtain an independently audited alternative design.
3. Source manipulation-resistant ANTV oracle with stale-data, price-band, and circuit-breaker safeguards; prohibit borrowing until reliable.
4. Determine lender-approved liquidation threshold, borrowing cap, and market interest model.
5. Deploy authenticated factory, vault, adapters, registry, and market; use real multisig roles and timelocks.
6. First mint dead shares and seed underlying markets; verify all balances and share conversions on chain.
7. Test collateral deposits, borrows, repayments, liquidations, lender withdrawals, insolvency, oracle failure, reentrancy and pausing.
8. Independent audits and deployment rehearsals; secure actual USDT liquidity and approvals.
9. Publish verified contract addresses and real-time monitoring; only then consider enabling borrowing.

## References
- https://docs.morpho.org/curate/tutorials-v2/dead-deposit/
- https://docs.morpho.org/curate/tutorials-v2/vault-creation/
- https://docs.morpho.org/learn/concepts/vault-v2/
- https://github.com/morpho-org/vault-v2
