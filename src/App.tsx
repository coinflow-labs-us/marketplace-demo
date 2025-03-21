import {ReactNode, useEffect, useState} from "react";
import "./App.css";
import {BrowserRouter} from "react-router-dom";
import { CoinflowForm } from "./CoinflowForm";
import { Header } from "./Header";
import {DirectPurchaseForm} from "./DirectPurchaseForm.tsx";
import {API_KEY, BASE_URL} from "./constants.ts";
import { faker } from "@faker-js/faker";

function App() {
  return (
    <ContextWrapper>
      <AppContent />
    </ContextWrapper>
  );
}

function AppContent() {
  const [sellerId, setSellerId] = useState("");

  const [sellers, setSellers] = useState<string[]>([]);

  useEffect(() => {
    const url = `${BASE_URL}/api/merchant/sellers?page=1&limit=100&search=&since=1737266400000&sortDirection=-1&sortBy=sales`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: API_KEY,
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .then(arr => {
        console.dir(arr, {depth: null, maxArrayLength: null});
        return arr;
      })
      .then((arr: {merchantId: string, status: string}[]) => setSellers(arr.filter(a => a.status === 'approved').map(({merchantId}) => merchantId)))
      .catch(err => console.error(err));
  }, []);

  return (
      <div
        className={
          "w-screen flex flex-col flex-1 relative  h-full min-h-screen"
        }
      >
        <Header setSellerId={setSellerId} />
        <div className={'max-w-3xl mx-auto'}>
          {sellerId ? (
            <div
              className={
                "grid grid-cols-1 pt-10 md:grid-cols-2 gap-0 md:gap-12 w-full h-full"
              }
            >
              <DirectPurchaseForm/>
              <CoinflowContent sellerId={sellerId}/>
            </div>
          ) : (
            <div className={'grid grid-cols-4 text-black w-full justify-center gap-4'}>
              {sellers.reverse().map((seller) => (
                <Seller sellerId={seller} setSellerId={setSellerId} />
              ))}
            </div>
          )}
        </div>
      </div>
  );
}

function Seller({sellerId, setSellerId}: {sellerId: string, setSellerId: (sellerId: string) => void}) {
  return (
    <div className={'flex flex-col p-4 bg-[#ecfaff] rounded-2xl cursor-pointer'} key={sellerId} onClick={() => setSellerId(sellerId)}>
      <img className={'h-25 rounded-xl'} src={faker.image.url({width: 200, height: 200})}  alt={sellerId}/>
      <span className={'font-semibold text-lg'}>{faker.person.firstName()}{'\'s Stream'}</span>
      <span className={'text-slate-400 text-[10px]'}>{sellerId}</span>
    </div>
  );
}

function CoinflowContent({sellerId}: { sellerId: string }) {
  return <CoinflowForm sellerId={sellerId}/>;
}

export function LoadingSpinner({className }: { className?: string }) {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className={`h-4 w-4 animate-spin fill-white text-white/20 ${className}`}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function ContextWrapper({ children }: { children: ReactNode }) {
  return (
      <BrowserRouter>{children}</BrowserRouter>
  );
}

export default App;
