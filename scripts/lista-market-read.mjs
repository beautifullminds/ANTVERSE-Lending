// Read-only verification of Lista's documented market contract and any known market ID.
import {JsonRpcProvider,Contract} from 'ethers';
import fs from 'node:fs';
const c=JSON.parse(fs.readFileSync('config/lista.example.json','utf8'));
if(!process.env.BSC_RPC_URL) throw Error('Set BSC_RPC_URL');
const p=new JsonRpcProvider(process.env.BSC_RPC_URL);
if((await p.getNetwork()).chainId!==56n) throw Error('Wrong chain');
console.log('Lista contract code bytes:',(await p.getCode(c.marketContract)).length/2-1);
if(!c.marketId){console.log('No ANTV/USDT market ID configured; market not verified.');process.exit(0)}
const m=new Contract(c.marketContract,['function market(bytes32 id) view returns (uint128 totalSupplyAssets,uint128 totalSupplyShares,uint128 totalBorrowAssets,uint128 totalBorrowShares,uint128 lastUpdate,uint128 fee)'],p);
try {const x=await m.market(c.marketId);console.log('Market state:',x.map(v=>v.toString()));}
catch(e){console.error('Market ABI not confirmed against this deployment:',e.shortMessage??e.message);process.exitCode=1}
