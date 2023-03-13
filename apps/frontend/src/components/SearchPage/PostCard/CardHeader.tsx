import { MoreHoriz, Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import OptionMenu from "./OptionMenu";

interface ICardHeader {
  profile: string;
  name: string;
  isOwner: boolean;
}

export default function CardHeader(props: ICardHeader) {
  const { profile, name, isOwner } = props;

  return (
    <>
      <Box display="flex" gap={2} alignItems="center">
        <Avatar
          src={profile}
          sx={{
            width: 32,
            height: 32,
          }}
        />
        <Typography variant="h6">{name}</Typography>
      </Box>
      <OptionMenu isOwner={isOwner} />
    </>
  );
}
