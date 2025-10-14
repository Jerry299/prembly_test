import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getCovidStats } from "../services/apiServices";
import type { CellContext } from "@tanstack/react-table";
import { Text } from "@chakra-ui/react";
import BaseTable from "../components/table/Table";
import { formatNumber } from "../../shopping-cart-ts/utils/utils";
interface covidStatsDataType {
  date: number;
  dateChecked: string;
  death: number;
  deathIncrease: number;
  hash: string;
  hospitalized: number;
  hospitalizedCumulative: number;
  hospitalizedCurrently: number;
  hospitalizedIncrease: number;
  inIcuCumulative: number;
  inIcuCurrently: number;
  lastModified: string;
  negative: number;
  negativeIncrease: number;
  onVentilatorCumulative: number;
  onVentilatorCurrently: number;
  pending: number;
  posNeg: number;
  positive: number;
  positiveIncrease: number;
  recovered?: null;
  states: number;
  total: number;
  totalTestResults: number;
  totalTestResultsIncrease: number;
}

export const CovidStatsTab = () => {
  const [pageDetails, setPageDetails] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);
  const { isPending, data } = useQuery({
    queryKey: ["quotes", { page: pageDetails.pageIndex + 1 }],
    queryFn: useCallback(async () => {
      const res = await getCovidStats();
      //console.log(res?.data, "res");
      return res.data;
    }, []),
    retry: 3,
  });

  const columns = [
    {
      accessorKey: "date",
      header: () => "Date",
      cell: (info: CellContext<covidStatsDataType, unknown>) => {
        return (
          <Text
            fontWeight={400}
            truncate
            color={"#000000"}
            textTransform={"capitalize"}
          >
            {info?.row?.original?.date}
          </Text>
        );
      },
    },
    {
      accessorKey: "death",
      header: () => "Deaths",
      cell: (info: CellContext<covidStatsDataType, unknown>) => {
        return (
          <Text
            fontWeight={400}
            truncate
            color={"#000000"}
            textTransform={"capitalize"}
          >
            {formatNumber(info?.row?.original?.death)}
          </Text>
        );
      },
    },
    {
      accessorKey: "hospitalized",
      header: () => "Number of People Hospitalized",
      cell: (info: CellContext<covidStatsDataType, unknown>) => {
        return (
          <Text
            fontWeight={400}
            truncate
            color={"#000000"}
            textTransform={"capitalize"}
          >
            {formatNumber(info?.row?.original?.hospitalized)}
          </Text>
        );
      },
    },
    {
      accessorKey: "onVentilatorCumulative",
      header: () => "People on Ventilator Cumulative",
      cell: (info: CellContext<covidStatsDataType, unknown>) => {
        return (
          <Text
            fontWeight={400}
            truncate
            color={"#000000"}
            textTransform={"capitalize"}
          >
            {formatNumber(info?.row?.original?.onVentilatorCumulative)}
          </Text>
        );
      },
    },
    {
      accessorKey: "positive",
      header: () => "Count of Positive Patients",
      cell: (info: CellContext<covidStatsDataType, unknown>) => {
        return (
          <Text
            fontWeight={400}
            truncate
            color={"#000000"}
            textTransform={"capitalize"}
          >
            {formatNumber(info?.row?.original?.positive)}
          </Text>
        );
      },
    },
    {
      accessorKey: "negative",
      header: () => "Count of Negative Patients",
      cell: (info: CellContext<covidStatsDataType, unknown>) => {
        return (
          <Text
            fontWeight={400}
            truncate
            color={"#000000"}
            textTransform={"capitalize"}
          >
            {formatNumber(info?.row?.original?.negative)}
          </Text>
        );
      },
    },
    {
      accessorKey: "inIcuCurrently",
      header: () => "Count of Patients In ICU",
      cell: (info: CellContext<covidStatsDataType, unknown>) => {
        return (
          <Text
            fontWeight={400}
            truncate
            color={"#000000"}
            textTransform={"capitalize"}
          >
            {formatNumber(info?.row?.original?.inIcuCurrently)}
          </Text>
        );
      },
    },
    {
      accessorKey: "totalTestResults",
      header: () => "Count of Total Test Results",
      cell: (info: CellContext<covidStatsDataType, unknown>) => {
        return (
          <Text
            fontWeight={400}
            truncate
            color={"#000000"}
            textTransform={"capitalize"}
          >
            {formatNumber(info?.row?.original?.totalTestResults)}
          </Text>
        );
      },
    },
  ];

  return (
    <div className="pl-4 pr-4 fade-in">
      <BaseTable
        columns={columns}
        data={data}
        isLoading={isPending}
        pageCount={pageCount}
        hasPagination={false}
        setPagination={setPageDetails}
        pageIndex={pageDetails?.pageIndex}
        pageSize={pageDetails?.pageSize}
      />
    </div>
  );
};
