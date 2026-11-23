import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const config=JSON.parse(fs.readFileSync('config/market.example.json','utf8'));
test('BNB chain is the selected chain',()=>assert.equal(config.chainId,56));
test('ANTVERSE address matches project token',()=>assert.equal(config.collateralToken.toLowerCase(),'0xf9fa938a18d73246298ef99c7d6d75dca7eb2a48'));
test('borrow and mainnet approval remain off',()=>{
 assert.equal(config.borrowingEnabled,false);
 assert.equal(config.mainnetDeploymentApproved,false);
 assert.equal(config.maxLtvBps,0);
});
test('unknown oracle and market are not fabricated',()=>{
 assert.equal(config.oracleAddress,null);
 assert.equal(config.morphoMarketAddress,null);
});
test('dashboard cannot solicit deposits',()=>{
 const html=fs.readFileSync('web/index.html','utf8');
 assert.match(html,/Borrow USDT — Unavailable/);
 assert.match(html,/<button disabled>/);
 assert.doesNotMatch(html,/eth_sendTransaction|wallet_sendCalls/);
});
