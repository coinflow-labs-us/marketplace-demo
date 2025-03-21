export function DirectPurchaseForm() {
  return (
    <div
      className={
        "flex flex-col max-w-full w-full overflow-hidden relative h-full"
      }
    >
      <div
        className={
          "bg-transparent flex flex-col items-center z-30 flex-1 h-full"
        }
      >
        <div className={"flex flex-col gap-8"}>
          <div
            className={
              "flex-col space-y-5 justify-center ring-1 ring-black/5 rounded-2xl align-center max-w-[350px]"
            }
          >
            <div
              className={
                "p-2 rounded-2xl bg-slate-50 backdrop-blur-2xl joyride-step-1"
              }
            >
              <img
                src={'https://i.ebayimg.com/images/g/ymkAAOSwjW5hrtft/s-l1200.jpg'}
                alt={"nft"}
                className={"w-full rounded-lg ring-1 ring-black/5"}
              />
            </div>
          </div>
          <div className={"flex flex-col"}>
            <SupplyIndicator />
            <Total />
          </div>
        </div>
      </div>
      <div className={"flex-1"} />
    </div>
  );
}

function Total() {
  return (
    <div className="flex flex-col mt-6 items-end flex-1 justify-end ">
      <span className="text-xs text-slate-500">Price</span>
      <span className="text-slate-900 font-extrabold text-xl lg:text-3xl joyride-step-2">
        $50.00
      </span>
    </div>
  );
}

function SupplyIndicator() {
  return (
    <>
      <span className="font-extrabold text-xl text-slate-900">Topps Yankees Deck</span>

      <div className={"flex space-x-4 items-center mt-3"}>
        <div
          className={
            "flex space-x-1 items-center rounded-xl p-2 bg-orange-50 ring-1 ring-orange-100"
          }
        >
          <span className={"text-xs text-white"}>🗓️.</span>
          <span className={"text-xs font-semibold text-slate-900"}>
            Year:{" "}
          </span>
          <span className={"text-xs font-bold text-orange-600"}>2008 </span>
        </div>
        <div
          className={
            "flex space-x-1 items-center rounded-xl p-2 bg-indigo-50 ring-1 ring-indigo-100"
          }
        >
          <span className={"text-xs text-white"}>📏</span>
          <span className={"text-xs font-semibold text-slate-900"}>
            Grade:{" "}
          </span>
          <span className={"text-xs font-bold text-indigo-600"}>7/10 </span>
        </div>
      </div>
    </>
  );
}
