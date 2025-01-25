import {useEffect, useState} from "react";
import {API_KEY, BASE_URL, MERCHANT_ID} from "../constants.ts";

export function useCreditBalance(wallet: string): {cents: number} {
  const [balance, setBalance] = useState({cents: 0});

  useEffect(() => {
    if (!wallet) return;

    const url = `${BASE_URL}/api/customer/balances/${MERCHANT_ID}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: API_KEY,
        'x-coinflow-auth-wallet': wallet,
        'x-coinflow-auth-blockchain': 'solana'
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .then(({credits}) => setBalance(credits))
      .catch(err => console.error(err));
  }, [wallet]);

  return balance;
}
