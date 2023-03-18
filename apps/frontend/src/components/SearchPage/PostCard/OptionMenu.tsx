import { Delete, Edit, MoreHoriz, Report } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";

interface IOptionMenu {
  isOwner: boolean;
}

const OptionMenu = (props: IOptionMenu) => {
  const { isOwner } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    alert("Delete post");
    // TODO : delete post
    handleClose();
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