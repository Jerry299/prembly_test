import { Suspense } from "react";
import useGetActiveTab from "../hooks/useGetActiveTab";
import { QuotesTab } from "./QuotesTab";
import Loader from "../../shopping-cart-ts/components/loadingComponent/loader";
import LocalTab from "../components/tab/Tab";
import { CovidStatsTab } from "./CovidTab";
import RandomUsers from "./RandomUsers";

const Quotes = () => {
  const { tab: currentTab } = useGetActiveTab();

  const tabs = [
    { name: `Quotes`, path: `?tab=quotes`, value: `quotes` },
    { name: `COVID 19 Stats`, path: `?tab=covid`, value: `covid` },
    { name: `Random Users`, path: `?tab=random`, value: `random` },
  ];

  const render = () => {
    switch (currentTab) {
      case "quotes":
        return <QuotesTab />;
      case "covid":
        return <CovidStatsTab />;
      case "random":
        return <RandomUsers />;
      default:
        return <QuotesTab />;
    }
  };
  return (
    <div className="" style={{ paddingLeft: "1.5rem", paddingRight: "1.2rem" }}>
      <Suspense fallback={<Loader />}>
        <LocalTab tabs={tabs} />
      </Suspense>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "1.5rem 0",
        }}
      >
        <div style={{ borderRadius: "0 10px 10px 0" }}>{render()}</div>
      </div>
    </div>
  );
};

export default Quotes;
