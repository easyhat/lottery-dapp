import abi from './lottery.json'
export const ADDRESS = '0xfce5C131c995bd91d005CFdb30472e21c9ED4470'
export const CONTRACT_API = abi

export const shortenAddress = (address) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}
