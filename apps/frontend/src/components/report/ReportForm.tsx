import Stack from "@mui/material/Stack";
import StyleTextField from "../LoginPage/StyledTextField";
import TypeSelect from "./TypeSelect";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import createDropdownData, { ReportLabel } from "@/utils/createDropdownData";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

const ReportForm = () => {
  const [reportType, setReportType] = useState<ReportLabel | "">("");
  const onChange = (event: SelectChangeEvent<ReportLabel>) => {
    setReportType(event.target.value as ReportLabel);
  };
  return (
    <Stack
      component="form"
      maxWidth={{ lg: "750px", width: "100%" }}
      padding="16px"
      spacing="16px"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <TypeSelect
        reportType={reportType}
        onChange={onChange}
        dropdownChildren={createDropdownData()}
      />
      {reportType === ReportLabel.GUIDE && (
        <StyleTextField id="guideId" label="Guide ID" />
      )}
      {reportType === ReportLabel.TRIP && (
        <StyleTextField id="tripId" label="Trip ID" />
      )}
      <StyleTextField
        id="detail"
        label="Report Detail"
        multiline
        minRows={4}
        maxRows={8}
      />
      <Button type="submit" variant="contained">
        <Typography fontWeight="600" color="white" textTransform="none">
          Submit
        </Typography>
      </Button>
    </Stack>
  );
};

export default ReportForm;
