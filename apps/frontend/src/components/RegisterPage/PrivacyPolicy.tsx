import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import TermsConditionsModal from "./TermsConditionModal";

const PrivacyPolicy = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Typography variant="body2" component="span" marginTop="20px">
        By clicking Register you accept{" "}
        <Typography
          sx={{ cursor: "pointer" }}
          variant="body2"
          color="secondary"
          component="span"
          onClick={onOpen}
        >
          Terms of Use and acknowledge the Privacy Policy and Cookie Policy.
        </Typography>
      </Typography>
      {isOpen && <TermsConditionsModal isOpen={isOpen} onClose={onClose} />}
    </Fragment>
  );
};

export default PrivacyPolicy;
