import Link from "next/link";
import { styled } from "@mui/material/styles";

const StyledLink = styled(Link)((theme) => {
  return {
    textDecoration: "none",
    ":hover": {
      color: "primary",
      textDecoration: "underline",
      textDecorationColor: "rgb(25, 118, 210)",
    },
  };
});

export default StyledLink;
