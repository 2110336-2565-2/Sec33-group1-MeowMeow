import Stack from "@mui/material/Stack";
import StyleTextField from "../LoginPage/StyledTextField";
import TypeSelect from "./TypeSelect";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import createDropdownData from "@/utils/createDropdownData";

const ReportForm = () => {
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
      <StyleTextField label="Guide name" />
      <StyleTextField label="Trip name" />
      <StyleTextField label="Report Detail" multiline minRows={4} maxRows={8} />
      <TypeSelect dropdownChildren={createDropdownData()} />
      <Button type="submit" variant="contained">
        <Typography fontWeight="600" color="white" textTransform="none">
          Submit
        </Typography>
      </Button>
    </Stack>
  );
};

export default ReportForm;
