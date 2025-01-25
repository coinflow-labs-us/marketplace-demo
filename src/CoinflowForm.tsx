import {CoinflowPurchaseForm} from "./components/CoinflowPurchaseForm.tsx";

const args = {
  subtotal: {currency: 'USD', cents: 5000},
  blockchain: 'solana',
  settlementType: 'USDC',
  feePercentage: 10
};

const headers = {
  'x-coinflow-auth-user-id': crypto.randomUUID(),
};

export function CoinflowForm({sellerId}: {sellerId: string}) {
  return (
    <div className={"w-full flex-1"}>
      <CoinflowPurchaseForm sellerId={sellerId} args={args} headers={headers} />
    </div>
  );
}
