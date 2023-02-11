import { Fragment } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";

const BrandLogo = () => {
  return (
    <Fragment>
      <Image
        src="/images/loginPage/guideKai-logo.svg"
        alt="guideKai logo"
        width={57}
        height={60}
      />
      <Typography
        variant="h5"
        fontWeight="600"
        sx={{ marginTop: "12px", marginBottom: "24px" }}
      >
        GuideKai
      </Typography>
    </Fragment>
  );
};

export default BrandLogo;
