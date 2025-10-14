import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getAllQoutes } from "../services/apiServices";

export const QuotesTab = () => {
  const [pageDetails, setPageDetails] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);
  const {} = useQuery({
    queryKey: ["quotes", { page: pageDetails.pageIndex + 1 }],
    queryFn: useCallback(async () => {
      const res = await getAllQoutes({ page: pageDetails.pageIndex + 1 });
    }, []),
    retry: 3,
  });

  return (
    <div className="fade-in">
      <div>No data as API was not working</div>
    </div>
  );
};
