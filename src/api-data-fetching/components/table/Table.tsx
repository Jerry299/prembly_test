import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  HeaderGroup,
  RowModel,
  TableState,
  PaginationState,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import type { JSX } from "react";
import "./table.css";
// import LoadingSpinner from '@/components/loaders/spinner/LoadingSpinner';
import { Flex } from "@chakra-ui/react";
import Loader from "../../../shopping-cart-ts/components/loadingComponent/loader";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IPaginationState extends PaginationState {}

interface IBaseTableProp<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onRowClick?: (_e: any) => void;
  visibleColumns?: Record<string, boolean>;
  noDataComponent?: JSX.Element;
  hasPagination?: boolean;
  hasCheckboxColumn?: boolean;
  onCheckboxClick?: (_e: any) => void;
  // eslint-disable-next-line no-unused-vars
  onClick?: (data: TData) => string | undefined;
  currentItemToDelete?: any;
}

interface ITablePaginationProps {
  pageIndex?: number;
  pageSize?: number;
  pageCount?: number;
  setPagination?: React.Dispatch<React.SetStateAction<IPaginationState>>;
}

const BaseTable = ({
  columns,
  hasPagination,
  data = [],
  visibleColumns,
  onRowClick,
  noDataComponent,
  hasCheckboxColumn,
  onCheckboxClick,
  currentItemToDelete,
  ...pageProps
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
IBaseTableProp<any> & ITablePaginationProps & { isLoading?: boolean }) => {
  const { pageIndex, isLoading, pageSize, pageCount, setPagination } =
    pageProps;
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const instance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      columnVisibility: visibleColumns,
    },
    state: {
      pagination: pagination as IPaginationState,
    },
    manualPagination: true,
    pageCount: pageCount,
    onPaginationChange: setPagination,
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    previousPage,
    getCanNextPage,
    nextPage,
    getState,
  } = instance;

  const paginationLinks = useMemo(
    () => generatePaginationLinks(pageIndex, pageCount),
    [pageIndex, pageCount]
  );

  return (
    <Flex
      overflowX="auto"
      w="full"
      borderRadius="xl"
      flexDirection="column"
      border="1px solid"
      borderColor="#f0f2f4"
      padding="0px"
      marginTop="22px"
    >
      <div className="table-container overflow-x-auto">
        <table className="table-wrapper">
          <>
            <TableHeaders
              getHeaderGroups={getHeaderGroups()}
              hasCheckboxColumn={hasCheckboxColumn}
            />
            {isLoading ? (
              <tbody>
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
                    <Loader />
                  </td>
                </tr>
              </tbody>
            ) : data.length === 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{
                      textAlign: "center",
                      padding: "1rem",
                      color: "#5D6676",
                    }}
                  >
                    No data available.
                  </td>
                </tr>
              </tbody>
            ) : (
              <TableBody
                getRowModel={getRowModel()}
                onRowClick={onRowClick}
                hasCheckboxColumn={hasCheckboxColumn}
                onCheckboxClick={onCheckboxClick}
                currentItemToDelete={currentItemToDelete}
              />
            )}
          </>
        </table>
      </div>
      {!(getRowModel()?.rows.length > 0) && !isLoading ? noDataComponent : null}
      {hasPagination && (
        <TablePagination
          previousPage={previousPage}
          nextPage={nextPage}
          paginationLinks={paginationLinks}
          getCanNextPage={getCanNextPage}
          getCanPreviousPage={getCanPreviousPage}
          getState={getState}
          setPagination={setPagination}
        />
      )}
    </Flex>
  );
};

const TableHeaders = ({
  getHeaderGroups,
  hasCheckboxColumn,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getHeaderGroups: HeaderGroup<any>[];
  hasCheckboxColumn?: boolean;
}) => {
  return (
    <thead>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {getHeaderGroups.map((headerGroup: Record<string, any>, idx) => (
        <tr className="table-header-row" key={idx}>
          {hasCheckboxColumn && <th className="table-header-cell"></th>}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {headerGroup.headers.map(
            (header: Record<string, any>, idx: number) => (
              <th key={idx} className="table-header-cell">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            )
          )}
        </tr>
      ))}
    </thead>
  );
};

const TableBody = ({
  getRowModel,
  onRowClick,
  hasCheckboxColumn,
  onCheckboxClick,
  currentItemToDelete,
}: {
  getRowModel: RowModel<unknown>;
  // eslint-disable-next-line no-unused-vars
  onRowClick?: (rowData: unknown) => void;
  hasCheckboxColumn?: boolean;
  onCheckboxClick?: (_e: any) => void;
  currentItemToDelete?: any;
}) => {
  const handleSelect = (isChecked: boolean, row: any) => {
    console.log(currentItemToDelete, "isChecked, row");
    if (isChecked) {
      console.log(row, "row is checked");
      // const rowId = row.id;
      // If the clicked row is already selected, deselect it; otherwise, select it
      // This ensures only one row can be selected at a time
      // onCheckboxClick?.(row);
      //setSelectedRowId((prevSelected) => (prevSelected === rowId ? null : rowId));
      onCheckboxClick?.((prevSelected: any) =>
        prevSelected?._id === row._id ? null : row
      );
    } else {
      if (currentItemToDelete?.id === row.id) {
        onCheckboxClick?.(null);
      }
    }
  };
  return (
    <tbody>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {getRowModel?.rows.map((row: Record<string, any>) => (
        <tr
          className="table-body-row"
          key={row.id}
          onClick={() => onRowClick?.(row.original)}
        >
          {hasCheckboxColumn && (
            <td className="table-header-cell checkbox-column">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  // checked={currentItemToDelete?._id === row.original._id}
                  onChange={(e) => handleSelect(e.target.checked, row.original)}
                />
                <span className="checkmark"></span>
              </label>
            </td>
          )}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {row
            .getVisibleCells()
            .map((cell: Record<string, any>, idx: number) => (
              <td key={idx} className="table-body-cell">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
        </tr>
      ))}
    </tbody>
  );
};

const TablePagination = ({
  previousPage,
  nextPage,
  paginationLinks,
  getCanNextPage,
  getCanPreviousPage,
  getState,
  setPagination,
}: {
  previousPage: () => void;
  nextPage: () => void;
  paginationLinks: (string | number)[];
  getCanNextPage: () => boolean;
  getCanPreviousPage: () => boolean;
  getState: () => TableState;
  setPagination?: React.Dispatch<React.SetStateAction<IPaginationState>>;
}) => {
  return paginationLinks.length > 0 ? (
    <div className={`pagination-wrapper`}>
      <div
        className={`${
          !getCanPreviousPage() ? "disabled" : ""
        } pagination-button`}
        onClick={() => previousPage()}
      >
        <PreviousIcon />
      </div>
      <ul className="pagination-links">
        {paginationLinks.map((item, index) =>
          item === "..." ? (
            <li className="pagination-item" key={`${item}-${index}`}>
              {item}
            </li>
          ) : (
            <li
              className={`${
                getState().pagination.pageIndex + 1 === Number(item)
                  ? "active"
                  : ""
              } pagination-item`}
              key={`${item}-${index}`}
              onClick={() => {
                const pageIndex = Number(item) - 1;
                setPagination?.({ pageIndex, pageSize: 10 });
              }}
            >
              {item}
            </li>
          )
        )}
      </ul>
      <div
        className={`${!getCanNextPage() ? "disabled" : ""} pagination-button`}
        onClick={() => nextPage()}
      >
        <NextIcon />
      </div>
    </div>
  ) : null;
};

const generatePaginationLinks = (
  currentPageIndex = 0,
  pageCount: number = 1
) => {
  const siblingCount = 1;
  const totalPageNumbers = siblingCount + 5;
  const DOTS = "...";

  if (totalPageNumbers >= pageCount) {
    return range(1, pageCount);
  }
  const leftSiblingIndex = Math.max(currentPageIndex - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPageIndex + siblingCount,
    pageCount
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < pageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = pageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, pageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(pageCount - rightItemCount + 1, pageCount);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
  return [];
};

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const PreviousIcon: React.FC = () => {
  return (
    <>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_5033_12914)">
          <path
            d="M11.5575 5.5575L10.5 4.5L6 9L10.5 13.5L11.5575 12.4425L8.1225 9L11.5575 5.5575Z"
            fill="#84818A"
          />
        </g>
        <defs>
          <clipPath id="clip0_5033_12914">
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export const NextIcon: React.FC = () => {
  return (
    <>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_5033_12923)">
          <path
            d="M7.49988 4.5L6.44238 5.5575L9.87738 9L6.44238 12.4425L7.49988 13.5L11.9999 9L7.49988 4.5Z"
            fill="#84818A"
          />
        </g>
        <defs>
          <clipPath id="clip0_5033_12923">
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default BaseTable;
