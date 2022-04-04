import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import {unspentBoxesFor} from '../src/services/ergo'

const SearchPage: NextPage = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [data, setData]= useState();

    const onWalletAddressChange = (event:  React.FormEvent<HTMLInputElement>) => {
        setWalletAddress(event.currentTarget.value);
    }

    const onSearch = async () => {
        try {
            const res = await unspentBoxesFor(walletAddress);
            console.log(res);
        } catch(e) {
            console.log('e', e);
        }
    }

  return (
    <div>
      <Head>
        <title>Search Wallet</title>
        <meta name="description" content="Search Ergo Wallet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <input type="text" onChange={onWalletAddressChange}/>
        <button type='button' onClick={onSearch}>Search</button>
      </main>
    </div>
  )
}

export default SearchPage;
