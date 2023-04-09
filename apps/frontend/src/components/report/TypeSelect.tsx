import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { ReportLabel } from "@/utils/createDropdownData";

export type IReportDropdown = {
  name: string;
  value: string;
  onClick?: () => void;
};

interface ITypeSelectProps {
  dropdownChildren: IReportDropdown[];
  defaultValue?: ReportLabel;
}

const TypeSelect = (props: ITypeSelectProps) => {
  const { dropdownChildren, defaultValue } = props;
  const [reportType, setReportType] = useState<ReportLabel | "">(
    defaultValue || ""
  );

  const handleChange = (event: SelectChangeEvent<ReportLabel>) => {
    setReportType(event.target.value as ReportLabel);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Report Type</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={reportType}
        label="Report Type"
        onChange={handleChange}
      >
        {dropdownChildren.map((data) => {
          return (
            <MenuItem key={data.name} value={data.value}>
              {data.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default TypeSelect;
