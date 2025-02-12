export function CoinflowCreditsPurchaseForm({sellerId, subtotal}: {sellerId: string, subtotal: {cents: number}}) {
  const url = `${import.meta.env.VITE_MARKETPLACE_URL}/checkout-credits?cents=${subtotal.cents}&sellerId=${sellerId}&feePercentage=10`;

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
          src={url}
        />
      </div>
    </div>
  );
}
