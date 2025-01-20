import {useCallback, useEffect, useState} from "react";
import { NftSuccessModal } from "./modals/NftSuccessModal";
import { LoadingSpinner } from "./App.tsx";
import {API_KEY} from "./constants.ts";
import {useSearchParams} from "react-router-dom";

export function CoinflowForm() {
  const [nftSuccessOpen, setNftSuccessOpen] = useState<boolean>(false);

  return (
    <div className={"w-full flex-1 "}>
      <CoinflowPurchaseWrapper/>
      <NftSuccessModal isOpen={nftSuccessOpen} setIsOpen={setNftSuccessOpen} />
    </div>
  );
}

function CoinflowPurchaseWrapper() {
  const [height, setHeight] = useState<string>('500');

  const handleIframeMessages = useCallback(
    ({data, origin}: {data: string; origin: string}) => {
      if (!origin.includes('coinflow.cash')) return;

      try {
        const message = JSON.parse(data);
        if (message.method !== 'heightChange') return;
        setHeight(message.data);
      } catch (e) {
        console.error(e);
      }
    },
    []
  );

  useEffect(() => {
    if (!window) throw new Error('Window not defined');
    window.addEventListener('message', handleIframeMessages);
    return () => {
      window.removeEventListener('message', handleIframeMessages);
    };
  }, [handleIframeMessages]);

  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const url = 'https://api-sandbox.coinflow.cash/api/checkout/link';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-coinflow-auth-user-id': crypto.randomUUID(),
        Authorization: API_KEY,
        'x-coinflow-submerchant-id': searchParams.get('sellerId')!,
      },
      body: JSON.stringify({
        subtotal: {currency: 'USD', cents: 5000},
        blockchain: 'solana',
        settlementType: 'USDC',
        feePercentage: 10
      })
    };

    fetch(url, options)
      .then(res => res.json())
      .then(({link}) => setUrl(link))
      .catch(err => console.error(err));
  }, [searchParams]);

  if (!url) {
    return (
      <div
        className={"absolute w-full min-h-96 flex items-center justify-center"}
      >
        <LoadingSpinner className={"!text-gray-900/20 !fill-gray-900"}/>
      </div>
    );
  }

  return (
    <div className={"h-full flex-1 w-full relative pb-20"}>
      <div
        style={{height: `${height}px`, minHeight: `${height}px`}}
        className={
          "flex-col h-full flex mx-auto relative overflow-hidden rounded-none md:rounded-xl md:border border-black/5"
        }
      >
        <iframe
          allow={'payment'}
          scrolling="no"
          style={{height: '100%', width: '100%'}}
          src={url + '&useHeightChange=true'}
        />
      </div>
    </div>
  );
}
