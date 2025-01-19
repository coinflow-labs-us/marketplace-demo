import { useCallback, useState } from "react";
import { NftSuccessModal } from "./modals/NftSuccessModal";
import { LoadingSpinner } from "./App.tsx";

export function CoinflowForm() {
  const [nftSuccessOpen, setNftSuccessOpen] = useState<boolean>(false);

  return (
    <div className={"w-full flex-1 "}>
      <CoinflowPurchaseWrapper
        onSuccess={() => setNftSuccessOpen(true)}
        subtotal={{cents: 20_00}}
      />
      <NftSuccessModal isOpen={nftSuccessOpen} setIsOpen={setNftSuccessOpen} />
    </div>
  );
}

function CoinflowPurchaseWrapper({
  onSuccess,
  subtotal,
}: {
  onSuccess: () => void;
  subtotal: {cents: number;};
}) {
  const [height, setHeight] = useState<number>(0);
  const handleHeight = useCallback((newHeight: string) => {
    setHeight(Number(newHeight));
  }, []);

  console.log({
    onSuccess,
    subtotal,
    handleHeight
  })

  return (
    <div className={"h-full flex-1 w-full relative pb-20"}>
      <div
        className={"absolute w-full min-h-96 flex items-center justify-center"}
      >
        <LoadingSpinner className={"!text-gray-900/20 !fill-gray-900"} />
      </div>
      <div
        style={{ height: `${height}px`, minHeight: `${height}px` }}
        className={
          "flex-col h-full flex mx-auto relative overflow-hidden rounded-none md:rounded-xl md:border border-black/5"
        }
      >
        CARD FORM GOES HERE
      </div>
    </div>
  );
}
