import { Chip, Stack, Typography } from "@mui/material";

interface ILocationProps {
  locations: string[];
}

const Location = ({ locations }: ILocationProps) => {
  return (
    <Stack
      direction="row"
      justifyItems="start"
      alignItems="center"
      spacing="16px"
    >
      <Typography>Locations:</Typography>
      <Stack direction="row" spacing={1}>
        {locations.map((location) => {
          return (
            <Chip
              label={location}
              key={location}
              variant="outlined"
              color="primary"
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Location;
