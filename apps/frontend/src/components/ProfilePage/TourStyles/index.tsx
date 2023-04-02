import { Chip, Stack, Typography } from "@mui/material";

interface ITourStyles {
  tourStyles: string[];
}

const TourStyles = ({ tourStyles }: ITourStyles) => {
  return (
    <Stack
      direction="row"
      justifyItems="start"
      alignItems="center"
      spacing="16px"
    >
      <Typography>Tour Styles:</Typography>
      <Stack direction="row" spacing={1}>
        {tourStyles.map((tourStyle) => {
          return (
            <Chip
              label={tourStyle}
              key={tourStyle}
              variant="outlined"
              color="primary"
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default TourStyles;
