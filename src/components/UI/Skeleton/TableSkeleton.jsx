import React from "react";
import { Skeleton } from "@/components/UI";

const TableSkeleton = ({ rows = 5, cols = 8 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className="border-b border-slate-100 dark:border-slate-800"
        >
          {Array.from({ length: cols }).map((_, colIndex) => (
            <td key={colIndex} className="px-6 py-5">
              <Skeleton className="h-4 w-full rounded-md" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
