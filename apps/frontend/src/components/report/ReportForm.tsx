import Stack from "@mui/material/Stack";
import StyleTextField from "../LoginPage/StyledTextField";
import TypeSelect from "./TypeSelect";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import createDropdownData, { ReportLabel } from "@/utils/createDropdownData";
import useReportQuery from "@/hooks/useReportQuery";
import useReport from "@/hooks/useReport";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import AppSnackbar from "../common/AppSnackbar";

const ReportForm = () => {
  const { guideId, tripId, isQueryValid } = useReportQuery();
  const { reportType, reportEntrance, onChange, onSubmit } =
    useReport(isQueryValid);
  const snackbarProps = useCustomSnackbar();
  return (
    <Stack
      component="form"
      maxWidth={{ lg: "750px", width: "100%" }}
      padding="16px"
      spacing="16px"
      onSubmit={onSubmit}
    >
      <TypeSelect
        reportType={reportType}
        onChange={onChange}
        dropdownChildren={createDropdownData(reportEntrance)}
      />
      {reportType === ReportLabel.GUIDE && (
        <StyleTextField
          disabled
          defaultValue={guideId}
          id="guideId"
          label="Guide ID"
        />
      )}
      {reportType === ReportLabel.TRIP && (
        <StyleTextField
          disabled
          defaultValue={tripId}
          id="tripId"
          label="Trip ID"
          inputProps={{ "aria-label": "description" }}
        />
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
      <AppSnackbar {...snackbarProps} />
    </Stack>
  );
};

export default ReportForm;
