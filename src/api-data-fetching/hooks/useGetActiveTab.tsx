import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const TAB = "tab";

const useGetActiveTab = ({ tabName }: Partial<{ tabName?: string }> = {}) => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<string | null>("quotes");
  useEffect(() => {
    const currentTab = searchParams.get(tabName || TAB);
    setTab(currentTab);
  }, [searchParams, tabName]);
  return { tab };
};

export default useGetActiveTab;
