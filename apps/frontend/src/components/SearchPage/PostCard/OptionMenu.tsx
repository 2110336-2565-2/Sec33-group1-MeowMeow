import { Delete, Edit, MoreHoriz, Report } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { deletePost } from "./OptionsMethods";
import Router from "next/router";
import { NotificationContext } from "@/context/NotificationContext";
import Link from "next/link";

interface IOptionMenu {
  postId: number;
  isOwner: boolean;
}

const OptionMenu = (props: IOptionMenu) => {
  const { isOwner, postId } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { addNotification } = useContext(NotificationContext);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deletePost(postId)
      .then(() => {
        addNotification("Post deleted successfully", "success");
        setTimeout(() => {
          Router.reload();
        }, 2000);
      })
      .catch((err) => {
        addNotification("Cannot delete post", "error");
        console.log(err);
      });
  };

  const handleEdit = () => {
    Router.push(`/guide-post/edit/${postId}`);
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
        <Link
          target="_blank"
          rel="noreferer"
          href={{
            pathname: "/report",
            query: { tripId: postId },
          }}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <MenuItem onClick={handleClose} sx={{ gap: 1 }}>
            <Report />
            Report
          </MenuItem>
        </Link>

        {isOwner && (
          <Box>
            <MenuItem onClick={handleEdit} sx={{ gap: 1 }}>
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
