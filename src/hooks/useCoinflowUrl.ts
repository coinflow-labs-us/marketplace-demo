import {useEffect, useState} from "react";
import {API_KEY, BASE_URL} from "../constants.ts";

export function useCoinflowUrl({sellerId, args, headers}: {sellerId: string, args: object, headers: object}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const url = `${BASE_URL}/api/checkout/link`;
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: API_KEY,
        'x-coinflow-submerchant-id': sellerId,
        ...headers
      },
      body: JSON.stringify(args)
    };

    fetch(url, options)
      .then(res => res.json())
      .then(({link}) => setUrl(link))
      .catch(err => console.error(err));
  }, [args, sellerId, headers]);

  return url;
}
