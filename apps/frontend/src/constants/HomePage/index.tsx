import { ReactNode } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FlagIcon from "@mui/icons-material/Flag";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Chip from "@mui/material/Chip";

interface IFeature {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  decorationLabel?: ReactNode;
}

const NewLabel = () => (
  <Chip
    component="div"
    label="NEW"
    color="primary"
    variant="filled"
    sx={{ color: "white", fontWeight: 600 }}
  />
);

export const BASIC_FEATURES: IFeature[] = [
  {
    icon: <FlagIcon fontSize="small" color="primary" />,
    title: "Report System",
    description: "Report system's problems to our admin to improve the system",
    href: "/report",
    decorationLabel: <NewLabel />,
  },
  {
    icon: <SearchIcon fontSize="small" color="primary" />,
    title: "Search Posts",
    description: "Search your posts from our database.",
    href: "/search",
    decorationLabel: <NewLabel />,
  },
  {
    icon: <AppRegistrationIcon fontSize="small" color="primary" />,
    title: "Register Guide",
    description: "Our system supports new user to be a guide.",
    href: "/guide-register",
  },
  {
    icon: <TableRowsIcon fontSize="small" color="primary" />,
    title: "View Traveller Record",
    description: "Check your records' status after you book a new guide trip.",
    href: "/traveller-record",
  },
  {
    icon: <AccountCircleIcon fontSize="small" color="primary" />,
    title: "View Profile",
    description: "Show your profile and share with your friend.",
    href: "/profile",
  },
];

export const GUIDE_FEATURES: IFeature[] = [
  {
    icon: <FlagIcon fontSize="small" color="primary" />,
    title: "Report System",
    description: "Report system's problems to our admin to improve the system",
    href: "/report",
    decorationLabel: <NewLabel />,
  },
  {
    icon: <AddCircleIcon fontSize="small" color="primary" />,
    title: "Create Post",
    description: "Create a new post to display with your customer.",
    href: "/guide-post/create",
    decorationLabel: <NewLabel />,
  },
  {
    icon: <AddCircleIcon fontSize="small" color="primary" />,
    title: "Manage Trip",
    description: "Manage your trip status.",
    href: "/guide-post/create",
    decorationLabel: <NewLabel />,
  },
  {
    icon: <SearchIcon fontSize="small" color="primary" />,
    title: "Search Posts",
    description: "Search your posts from our database.",
    href: "/search",
  },
  {
    icon: <TableRowsIcon fontSize="small" color="primary" />,
    title: "View Traveller Record",
    description: "Check your records' status after you book a new guide trip.",
    href: "/traveller-record",
  },
  {
    icon: <AccountCircleIcon fontSize="small" color="primary" />,
    title: "View Profile",
    description: "Show your guide profile and share with your friend.",
    href: "/profile",
  },
];
