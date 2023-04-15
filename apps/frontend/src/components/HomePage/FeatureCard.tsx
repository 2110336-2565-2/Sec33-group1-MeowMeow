import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ReactNode } from "react";

interface IFeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  decorationLabel?: ReactNode;
}

const FeatureCard = ({
  icon,
  href,
  title,
  description,
  decorationLabel,
}: IFeatureCardProps) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Paper
        elevation={1}
        sx={{
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          rowGap: "12px",
          height: "100%",
          ":hover": {
            transition: "box-shadow",
            transitionDuration: "500ms",
            boxShadow:
              "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing="12px">
            {icon}
            <Typography sx={{ fontSize: { xs: "20px" }, fontWeight: 600 }}>
              {title}
            </Typography>
          </Stack>
          {decorationLabel}
        </Stack>

        <Typography>{description}</Typography>
      </Paper>
    </Link>
  );
};

export default FeatureCard;
