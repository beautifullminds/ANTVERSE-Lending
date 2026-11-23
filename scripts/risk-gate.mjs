// Fail closed: this is a local deployment preflight, NOT an audit.
import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync('config/market.example.json','utf8'));
const required=['loanAssetAddress','oracleAddress','morphoMarketAddress','vaultFactoryAddress','ownerMultisig','curatorMultisig','allocator','sentinel'];
const missing=required.filter(k=>!c[k]);
const reasons=[];
if(c.chainId!==56) reasons.push('Unexpected chain');
if(missing.length) reasons.push('Missing addresses: '+missing.join(', '));
if(c.borrowingEnabled!==false) reasons.push('Borrowing must stay disabled until audited');
if(c.mainnetDeploymentApproved!==false) reasons.push('Mainnet approval must stay false');
if(Number(c.maxLtvBps)!==0) reasons.push('LTV must stay zero until oracle/liquidation review');
if(reasons.length){console.error('SAFETY GATE FAILED\n'+reasons.join('\n'));process.exitCode=1}
else console.log('Safe prelaunch configuration confirmed. Borrowing disabled.');
