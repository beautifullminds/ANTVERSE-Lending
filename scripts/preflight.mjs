// Node 20+, npm install ethers; read-only checks. No private key required.
import { JsonRpcProvider, Contract, formatUnits } from 'ethers';
const rpc=process.env.BSC_RPC_URL;
if(!rpc) throw new Error('Set BSC_RPC_URL');
const provider=new JsonRpcProvider(rpc);
const network=await provider.getNetwork();
if(network.chainId!==56n) throw new Error(`Expected BNB Chain 56, got ${network.chainId}`);
const token='0xf9FA938a18D73246298ef99C7d6D75DCA7Eb2A48';
const erc20=new Contract(token,['function decimals() view returns(uint8)','function totalSupply() view returns(uint256)','function symbol() view returns(string)','function balanceOf(address) view returns(uint256)'],provider);
const [decimals,supply,symbol,code]=await Promise.all([erc20.decimals(),erc20.totalSupply(),erc20.symbol(),provider.getCode(token)]);
if(code==='0x') throw new Error('No token contract at configured address');
console.log(JSON.stringify({chainId:56,token,symbol,decimals:Number(decimals),totalSupply:formatUnits(supply,decimals),codePresent:true},null,2));
if(process.env.HOLDER) console.log('Holder balance:',formatUnits(await erc20.balanceOf(process.env.HOLDER),decimals));
console.log('STOP: No oracle, funded lender, audited market, or Morpho BNB deployment verified.');
