import { ReactNode, useEffect, useState } from "react";
import { TestCardsModal } from "./modals/TestCardsModal.tsx";
import logo from './assets/logo.png';
import {MERCHANT_ID} from "./constants.ts";

export function Header() {
  const [showHeader, setShowHeader] = useState<boolean>(false);
  const [testCardsOpen, setTestCardsOpen] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    const scrollTop = window.scrollY;
    if (scrollTop > 50) {
      setShowHeader(true);
    } else if (scrollTop <= 50) {
      setShowHeader(false);
    }
  }

  return (
    <div
      className={
        "flex-col flex space-y-2 border-b border-black/10 sticky bg-white/60 backdrop-blur-2xl z-40 top-0 right-0 left-0 items-center px-8"
      }
    >
      <div
        className={`py-2 flex w-full items-center space-x-3 mx-auto z-50 max-w-3xl`}
      >
        <img
          src={logo}
          alt={"Artisan Square"}
          className={"w-10 object-contain"}
        />
        <span
          className={"hidden lg:flex font-extrabold text-slate-900 text-sm"}
        >
          Artisan Square
        </span>
        <div className={"flex-1"} />

        <div className={"flex flex-row space-x-4 joyride-step-5"}>
          <OutlineButton onClick={() => setTestCardsOpen(true)}>
            <span className={"font-normal text-xs whitespace-nowrap"}>
              Test Cards
            </span>
          </OutlineButton>
          <OutlineButton onClick={() => window.open('https://sandbox-merchant.coinflow.cash/seller/login', '_blank')}>
            <span className={"font-normal text-xs whitespace-nowrap"}>
              Login
            </span>
          </OutlineButton>
          <OutlineButton onClick={() => window.open(`https://sandbox-merchant.coinflow.cash/seller/register?sellerId=${crypto.randomUUID()}&country=US&parentId=${MERCHANT_ID}&kycType=person`, '_blank')}>
            <span className={"font-normal text-xs whitespace-nowrap"}>
              Sign Up
            </span>
          </OutlineButton>
        </div>
      </div>

      <div
        className={`${
          showHeader ? "opacity-100" : "opacity-0  -translate-y-10"
        } fixed top-24 bg-slate-100/90 shadow-xl transition-all duration-500 fade-in backdrop-blur-2xl flex items-center space-x-2 p-2 z-40 rounded-full`}
      >
        <img
          src={'https://i.etsystatic.com/37287876/r/il/8506d4/6468826734/il_fullxfull.6468826734_1ntu.jpg'}
          alt={"nft"}
          className={"w-7 h-7 rounded-full"}
        />
        <span className={"text-sm font-bold text-slate-900"}>$20.00</span>
      </div>
      <TestCardsModal isOpen={testCardsOpen} setIsOpen={setTestCardsOpen} />
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
