import {CoinflowCardPurchaseForm} from "./components/CoinflowCardPurchaseForm.tsx";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import {CoinflowCreditsPurchaseForm} from "./components/CoinflowCreditsPurchaseForm.tsx";

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
      <TabGroup>
        <TabList className={'bg-amber-50 p-2 rounded-full mb-2'}>
          <Tab className="data-[selected]:bg-amber-300 rounded-full bg-amber-50 text-slate-900 data-[hover]:bg-amber-100">Cards</Tab>
          <Tab className="data-[selected]:bg-amber-300 rounded-full bg-amber-50 text-slate-900 data-[hover]:bg-amber-100">Credits</Tab>
        </TabList>
        <TabPanels>
          <TabPanel><CoinflowCardPurchaseForm sellerId={sellerId} args={args} headers={headers} /></TabPanel>
          <TabPanel><CoinflowCreditsPurchaseForm sellerId={sellerId} subtotal={args.subtotal}/></TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
