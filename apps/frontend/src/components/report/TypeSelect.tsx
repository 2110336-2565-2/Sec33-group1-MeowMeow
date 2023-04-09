import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { ReportLabel } from "@/utils/createDropdownData";
import { styled } from "@mui/material";

export type IReportDropdown = {
  name: string;
  value: string;
  onClick?: () => void;
};

interface ITypeSelectProps {
  dropdownChildren: IReportDropdown[];
  reportType: ReportLabel | "";
  onChange: (event: SelectChangeEvent<ReportLabel>) => void;
}

const StyledFormControl = styled(FormControl)({
  borderRadius: "4px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.42)",
    },
    "&:hover fieldset": {
      border: "2px solid #F46D21",
    },
  },
});

const TypeSelect = (props: ITypeSelectProps) => {
  const { dropdownChildren, reportType, onChange } = props;

  return (
    <StyledFormControl
      sx={{
        ":hover": {
          borderColor: "red",
          borderRadius: "4px",
        },
      }}
    >
      <InputLabel id="demo-simple-select-helper-label">Report Type</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={reportType}
        label="Report Type"
        onChange={onChange}
      >
        {dropdownChildren.map((data) => {
          return (
            <MenuItem key={data.name} value={data.value}>
              {data.name}
            </MenuItem>
          );
        })}
      </Select>
    </StyledFormControl>
  );
};

export default TypeSelect;
