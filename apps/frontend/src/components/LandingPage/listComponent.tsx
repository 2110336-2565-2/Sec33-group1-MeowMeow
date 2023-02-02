import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import React from "react";
import theme from "@/config/theme";

interface listInterface {
  text: string;
}

export default function ListComponent({ text }: listInterface) {
  return (
    <ListItem style={{ padding: "0px" }}>
      <ListItemIcon>
        <RadioButtonCheckedIcon style={{ color: theme.palette.primary.main }} />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}
