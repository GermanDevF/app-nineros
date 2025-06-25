import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

export const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

type Props = {
  onUpload: (data: typeof INITIAL_IMPORT_RESULTS) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({
        getRootProps,
      }: {
        getRootProps: () => React.ButtonHTMLAttributes<HTMLButtonElement>;
      }) => (
        <div className="w-full">
          <Button {...getRootProps()} size="sm" className="w-full lg:w-auto">
            <Upload className="size-4" />
            Import CSV
          </Button>
        </div>
      )}
    </CSVReader>
  );
};
