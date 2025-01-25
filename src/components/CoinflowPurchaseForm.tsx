import {useIframeDynamicHeight} from "../hooks/useIframeDynamicHeight.ts";
import {LoadingSpinner} from "../App.tsx";
import {useCoinflowUrl} from "../hooks/useCoinflowUrl.ts";

export function CoinflowPurchaseForm({sellerId, args, headers}: {sellerId: string, args: object, headers: object}) {
  const height = useIframeDynamicHeight();
  const url = useCoinflowUrl({sellerId, args, headers});

  if (!url) {
    return (
      <div className={"h-full flex-1 w-full relative"}>
        <div
          className={"absolute w-full min-h-96 flex items-center justify-center"}
        >
          <LoadingSpinner className={"!text-gray-900/20 !fill-gray-900"}/>
        </div>
      </div>
    );
  }

  return (
    <div className={"h-full flex-1 w-full relative"}>
      <div style={{height: `${height}px`, minHeight: `${height}px`}}
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
