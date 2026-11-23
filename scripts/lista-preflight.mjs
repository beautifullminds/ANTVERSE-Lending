import {JsonRpcProvider,Contract,getAddress,formatUnits} from 'ethers';
import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync('config/lista.example.json','utf8'));
const rpc=process.env.BSC_RPC_URL;
if(!rpc) throw Error('BSC_RPC_URL required. Read-only check, no wallet key.');
const p=new JsonRpcProvider(rpc);
if((await p.getNetwork()).chainId!==56n) throw Error('Wrong chain');
const abi=['function decimals() view returns (uint8)','function symbol() view returns (string)','function totalSupply() view returns (uint256)'];
const result={chainId:56,contracts:{}};
for(const [name,address] of Object.entries({lista:c.marketContract,antv:c.collateralToken,usdt:c.loanToken})){
 const a=getAddress(address),code=await p.getCode(a);
 result.contracts[name]={address:a,codePresent:code!=='0x'};
 if(code==='0x') throw Error('No code: '+name);
 if(name!=='lista'){
   const t=new Contract(a,abi,p);
   const [decimals,symbol,totalSupply]=await Promise.all([t.decimals(),t.symbol(),t.totalSupply()]);
   result.contracts[name]={...result.contracts[name],decimals:Number(decimals),symbol,totalSupply:formatUnits(totalSupply,decimals)};
 }
}
result.marketCreationReady=Boolean(c.oracle&&c.irm&&c.lltv&&c.marketCreationApproved&&c.oracleVerified&&c.liquidationVerified&&c.independentAuditCompleted&&c.lenderFundingConfirmed);
result.borrowingEnabled=c.borrowingEnabled;
console.log(JSON.stringify(result,null,2));
if(!result.marketCreationReady) console.log('NOT READY: no mainnet market creation or funding authorized.');
