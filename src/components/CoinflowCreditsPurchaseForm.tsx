export function CoinflowCreditsPurchaseForm({sellerId}: {sellerId: string, subtotal: {cents: number}}) {
  const url = new URL(`${import.meta.env.VITE_MARKETPLACE_URL}/checkout-credits`);
  url.searchParams.set('cents', '100');
  url.searchParams.set('sellerId', sellerId);
  url.searchParams.set('feePercentage', '10');
  url.searchParams.set('fixedFee', '30');
  url.searchParams.set('webhookInfo', Buffer.from(JSON.stringify({a: 1})).toString('base64'));
  url.searchParams.set('chargebackProtectionData', Buffer.from(JSON.stringify({
    productName: 'Coinflow Test',
    productType: 'topUp',
    quantity: 1,
    rawProductData: {
      coinflowTest: 'coinflowTest',
      raw: 1,
      raw2: true,
      raw3: {
        raw4: 'raw4',
      },
    },
  })).toString('base64'));

  return (
    <div className={"h-full flex-1 w-full relative"}>
      <div style={{height: `${450}px`, width: '350px'}}
           className={
             "flex-col h-full flex mx-auto relative overflow-hidden rounded-none md:rounded-xl md:border border-black/5"
           }
      >
        <iframe
          allow={'payment'}
          scrolling="no"
          style={{height: '100%', width: '100%'}}
          src={url.toString()}
        />
      </div>
    </div>
  );
}
