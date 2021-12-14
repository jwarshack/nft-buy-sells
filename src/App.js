import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useMoralis } from 'react-moralis';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'

import Navbar from './components/Navbar';

function App() {

  const [transfers, setTransfers] = useState([])


  const { Moralis, user } = useMoralis();

  useEffect(() => {
    if (user) {
      getNFTs()
    }
  }, [])

  async function getNFTs() {


    const txs = await Moralis.Web3API.account.getNFTTransfers({ chain: "mainnet", address: user.attributes.ethAddress })
    console.log(txs)

    let nfts = []

    txs.result.map(async (nft) => {

      const price = await Moralis.Web3API.token.getTokenPrice({ chain: "mainnet", address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', to_block: nft.block_number })

      let data = {
        tokenAddress: nft.token_address,
        price: price.usdPrice,
      }

      if (nft.to_address === user.attributes.ethAddress.toLowerCase()) {
        data["transaction"] = "Buy"
      } else {
        data["transaction"] = "Sell"

      }

      nfts.push(data)

    })

    console.log(nfts)
    

    setTransfers(nfts)

  }

  return (
    <>
    <Navbar/>
    <Table>
      <Thead>
        <Tr>
          <Th>Token Address</Th>
          <Th>Transaction</Th>
          <Th>Price (USD)</Th>
        </Tr>
      </Thead>
      {
        transfers.map((tx, key) => (
          <Tbody>
            <Tr key={key}>
              <Td>{tx.tokenAddress}</Td>
              <Td>{tx.transaction}</Td>
              <Td>${tx.price.toFixed(2)}</Td>
            </Tr>
          </Tbody>
    
        ))
      }
    </Table>
    </>
  )

}

export default App;
