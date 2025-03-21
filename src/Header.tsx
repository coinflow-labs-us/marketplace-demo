import { ReactNode, useState } from "react";
import { TestCardsModal } from "./modals/TestCardsModal.tsx";
import logo from './assets/logo.png';
import {MERCHANT_ID} from "./constants.ts";
import {BuyCreditsModal} from "./modals/BuyCreditsModal.tsx";

export function Header({setSellerId}: {setSellerId: (sellerId: string) => void}) {
  const [testCardsOpen, setTestCardsOpen] = useState<boolean>(false);
  const [buyCreditsOpen, setBuyCreditsOpen] = useState<boolean>(false);

  return (
    <div
      className={
        "flex-col flex space-y-2 border-b border-black/10 sticky bg-white/60 backdrop-blur-2xl z-40 top-0 right-0 left-0 items-center px-8"
      }
    >
      <div
        className={`py-2 flex w-full items-center space-x-3 mx-auto z-50 max-w-3xl cursor-pointer`}
        onClick={() => setSellerId('')}
      >
        <img
          src={logo}
          alt={"Artisan Square"}
          className={"w-20 object-contain"}
        />
        <div className={"flex-1"} />

        <div className={"flex flex-row space-x-4 joyride-step-5"}>
          <OutlineButton onClick={() => setBuyCreditsOpen(true)}>
            <span className={"font-normal text-xs whitespace-nowrap"}>
              Buy Credits
            </span>
          </OutlineButton>
          <OutlineButton onClick={() => setTestCardsOpen(true)}>
            <span className={"font-normal text-xs whitespace-nowrap"}>
              Test Cards
            </span>
          </OutlineButton>
          <OutlineButton onClick={() => window.open(`${import.meta.env.VITE_MERCHANT_URL}/seller/login`, '_blank')}>
            <span className={"font-normal text-xs whitespace-nowrap"}>
              Login
            </span>
          </OutlineButton>
          <OutlineButton onClick={() => window.open(`${import.meta.env.VITE_MERCHANT_URL}/seller/register?sellerId=${crypto.randomUUID()}&country=US&parentId=${MERCHANT_ID}&kycType=person`, '_blank')}>
            <span className={"font-normal text-xs whitespace-nowrap"}>
              Sign Up
            </span>
          </OutlineButton>
        </div>
      </div>

      <TestCardsModal isOpen={testCardsOpen} setIsOpen={setTestCardsOpen} />
      <BuyCreditsModal isOpen={buyCreditsOpen} setIsOpen={setBuyCreditsOpen}/>
    </div>
  );
}

function OutlineButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={
        "cursor-pointer font-normal text-xs flex items-center text-slate-700 hover:text-slate-900 transition py-3"
      }
    >
      {children}
    </div>
  );
}
