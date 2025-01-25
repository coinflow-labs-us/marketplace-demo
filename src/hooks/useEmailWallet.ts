import {useEffect, useState} from "react";
import {API_KEY} from "../constants.ts";

export function useEmailWallet(email: string) {
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    // const url = 'https://api-sandbox.coinflow.cash/api/marketplace/wallet';
    const url = 'http://localhost:5000/api/marketplace/wallet';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: API_KEY,
      },
      body: JSON.stringify({email})
    };

    fetch(url, options)
      .then(res => res.json())
      .then(({wallet}) => setWallet(wallet))
      .catch(err => console.error(err));
  }, [email]);

  return wallet;
}
