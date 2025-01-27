import {Dialog, Field, Transition} from "@headlessui/react";
import {Fragment, useMemo, useState} from "react";
import {useEmailWallet} from "../hooks/useEmailWallet.ts";
import {CoinflowCardPurchaseForm} from "../components/CoinflowCardPurchaseForm.tsx";
import { Input } from '@headlessui/react'
import {useCreditBalance} from "../hooks/useCreditBalance.ts";

export function BuyCreditsModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
}) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-xl backdrop-filter" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="mx-auto backdrop-blur-xl flex flex-col items-start backdrop-filter w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-slate-900 font-semibold"
                  >
                    Buy Credits
                  </Dialog.Title>
                  <div className="mt-1">
                    <p className="text-sm text-slate-600">
                      Purchase Credits to be spent at your favorite sellers
                    </p>
                  </div>
                  <div className="mt-2 mb-6 w-full text-slate-900">
                    <BuyCreditsContent/>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const args = {
  subtotal: {currency: 'USD', cents: 55_00},
  blockchain: 'solana',
  settlementType: 'Credits',
  fixedFee: {cents: 5_00}
};

export function BuyCreditsContent() {
  const [ephemeralEmail, setEphemeralEmail] = useState("ben@coinflowlabs.app");
  const [email, setEmail] = useState("ben@coinflowlabs.app");
  const wallet = useEmailWallet(email);
  const balance = useCreditBalance(wallet);

  const headers = useMemo(
    () => ({'x-coinflow-auth-wallet': wallet, 'x-coinflow-auth-blockchain': 'solana'}),
    [wallet]
  );

  return (
    <>
    <Dialog.Title
      as="h3"
      className="text-md leading-6 text-slate-900 font-semibold"
    >
      Credit Balance ${balance.cents / 100}
    </Dialog.Title>
    <Field>
      <Dialog.Title
        as="h4"
        className="text-md leading-6 text-slate-900 font-semibold"
      >
        Email
      </Dialog.Title>
      <Input
        className={'text-slate-900 rounded-lg p-2 bg-zinc-50 outline outline-1 outline-zinc-100 data-[hover]:shadow data-[focus]:bg-slate-200'}
        name="email"
        value={ephemeralEmail}
        onChange={(e) => setEphemeralEmail(e.target.value)}
        onBlur={() => setEmail(ephemeralEmail)}
      />
    </Field>
      {wallet && <CoinflowCardPurchaseForm sellerId={''} args={args} headers={headers} />}
    </>
  );
}


