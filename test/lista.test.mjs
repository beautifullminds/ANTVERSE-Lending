import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync('config/lista.example.json','utf8'));
test('Lista configuration targets BNB',()=>assert.equal(c.chainId,56));
test('ANTV contract matches canonical project contract',()=>assert.equal(c.collateralToken.toLowerCase(),'0xf9fa938a18d73246298ef99c7d6d75dca7eb2a48'));
test('USDT is BNB Binance-Peg USDT',()=>assert.equal(c.loanToken.toLowerCase(),'0x55d398326f99059ff775485246999027b3197955'));
test('unsafe market cannot be created by default',()=>{for(const key of ['oracle','irm','lltv','marketId','vault'])assert.equal(c[key],null);for(const key of ['borrowingEnabled','marketCreationApproved','oracleVerified','liquidationVerified','independentAuditCompleted','lenderFundingConfirmed'])assert.equal(c[key],false)});
