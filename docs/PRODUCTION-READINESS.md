# ANTVERSE Lending — production readiness

**Current status: NOT PRODUCTION READY. Do not send tokens or approve spending.**

## Unresolved external dependencies
- $50,000 USDT lender funding: **not committed**.
- BNB Chain Morpho Vault V2 factory, adapter, and market support: **not verified**.
- Reliable ANTV price oracle: **not available**.
- Market depth sufficient for forced liquidation: **not demonstrated**.
- Independent audit: **not commissioned or completed**.
- Multisig signers and custody policy: **not configured**.
- Mainnet deployment and explorer verification: **not performed**.

## Before any production deployment
1. Choose a lending architecture supported on the intended chain; verify canonical factory addresses.
2. Audit the ANTV token and its admin privileges, transfer taxes, blacklist, pause, and upgrade behavior.
3. Obtain an independently calculated executable-price oracle and liquidator simulation.
4. Implement isolated lending market using vetted protocol contracts; do not use sample custody contract as lending collateral.
5. Implement ERC-4626 vault and adapters if officially supported, plus rate model, liquidation thresholds, withdrawal caps, timelocks, multisig and emergency pause.
6. Run fork tests, fuzz tests, invariant tests, oracle-manipulation tests, insolvency tests, and full liquidation/withdrawal tests.
7. Have an independent auditor review deployed bytecode, upgrade paths, permissions and economic assumptions.
8. Obtain written lender commitments and on-chain funded USDT reserves.
9. Deploy to testnet first; review before mainnet.
10. Independently verify every contract and dead-deposit transaction on chain.

## Deployment policy
The GitHub Pages frontend is read-only. CI verifies prelaunch safeguards only and does not certify security. No production deployment script is included because prerequisite protocol addresses and audits are not established.
