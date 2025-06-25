import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ImportTable } from "./import-table";
import { convertAmountToMiliunits } from "@/lib/utils";
import { format, parse } from "date-fns";
import { transactions } from "@/db/schema";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputDateFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectedColumnState {
  [key: string]: string | null;
}

type Props = {
  data: string[][];
  onSubmit: (data: (typeof transactions.$inferInsert)[]) => void;
  onCancel: () => void;
};

export const ImportCard = ({ data, onSubmit, onCancel }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>(
    {}
  );

  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (key === columnIndex.toString()) {
          newSelectedColumns[key] = value;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[columnIndex] = value;

      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const onContinue = () => {
    const getColumnIndex = (columnName: string | null) => {
      return columnName === "skip" ? null : columnName;
    };

    const mappedDate = {
      headers: headers.map((header, index) => {
        return getColumnIndex(selectedColumns[index] ?? null);
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(selectedColumns[index] ?? null);

            return columnIndex ? cell : null;
          });

          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedDate.body.map((row) => {
      return row.reduce((acc: Record<string, string>, curr, index) => {
        const header = mappedDate.headers[index];
        if (header !== null) {
          acc[header] = curr ?? "";
        }

        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => {
      return {
        ...item,
        amount: convertAmountToMiliunits(parseFloat(item.amount)),
        date: format(
          parse(item.date, dateFormat, new Date()),
          outputDateFormat
        ),
      };
    });

    onSubmit(formattedData as unknown as (typeof transactions.$inferInsert)[]);
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transactions
          </CardTitle>
          <div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-2 items-center w-full lg:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="w-full lg:w-auto"
              onClick={onCancel}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="w-full lg:w-auto"
              onClick={onContinue}
              disabled={progress < requiredOptions.length}>
              Continue ({progress}/{requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
