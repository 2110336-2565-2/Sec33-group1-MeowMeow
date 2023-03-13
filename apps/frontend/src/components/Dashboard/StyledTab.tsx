import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
const StyledTab = styled(Tab)({
  textTransform: "none",
  "&:hover": {
    borderRadius: "6px",
    backgroundColor: "rgba(244,109,33,0.9)",
    transition: "all 300ms",
    color: "white",
  },
});

export default StyledTab;
