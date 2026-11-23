// Read-only Morpho V2 dead-deposit calculator and verifier; DOES NOT execute mint.
import { JsonRpcProvider, Contract } from 'ethers';
const decimals=Number(process.env.ASSET_DECIMALS ?? 18);
if(!Number.isInteger(decimals)||decimals<0||decimals>36) throw new Error('Invalid decimals');
const virtualShares=10n**BigInt(Math.max(0,18-decimals));
const targetShares=10n**9n > 10n**6n*virtualShares ? 10n**9n : 10n**6n*virtualShares;
console.log('Target dead shares:',targetShares.toString());
console.log('Recipient: 0x000000000000000000000000000000000000dEaD');
if(process.env.VAULT_ADDRESS && process.env.RPC_URL){
 const p=new JsonRpcProvider(process.env.RPC_URL);
 const v=new Contract(process.env.VAULT_ADDRESS,['function totalSupply() view returns(uint256)','function convertToAssets(uint256) view returns(uint256)','function asset() view returns(address)'],p);
 const [s,a,c]=await Promise.all([v.totalSupply(),v.asset(),v.convertToAssets(10n**18n)]);
 console.log(JSON.stringify({vault:process.env.VAULT_ADDRESS,asset:a,totalSupply:s.toString(),assetsPerOneShare:c.toString()},null,2));
 if(s!==0n) console.warn('Vault is not empty; first-mint dead deposit cannot be assumed safe.');
}
console.log('Do not mint without checking underlying market dead deposits and factory authenticity.');
