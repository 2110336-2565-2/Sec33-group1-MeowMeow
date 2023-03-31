import apiClient from "@/utils/apiClient";
import { Delete, Edit, MoreHoriz, Report } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import { deletePost } from "./OptionsMethods";
import Router from "next/router";

interface IOptionMenu {
  post_id: number;
  isOwner: boolean;
}

const OptionMenu = (props: IOptionMenu) => {
  const { isOwner, post_id } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deletePost(post_id)
      .then(() => {
        handleClose();
        Router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHoriz />
        </IconButton>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: 160,
          },
        }}
      >
        <MenuItem onClick={handleClose} sx={{ gap: 1 }}>
          <Report />
          Report
        </MenuItem>
        {isOwner && (
          <Box>
            <MenuItem onClick={handleClose} sx={{ gap: 1 }}>
              <Edit />
              Edit
            </MenuItem>
            <MenuItem
              onClick={handleDelete}
              sx={{ gap: 1, color: "error.main" }}
            >
              <Delete /> Delete
            </MenuItem>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default OptionMenu;
