import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

type Props = {
  onUpload: (data: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
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
