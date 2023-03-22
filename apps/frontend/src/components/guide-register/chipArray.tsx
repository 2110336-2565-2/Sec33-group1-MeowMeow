import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { ChipData } from "./form";
import { Button, Grid, TextField, Typography } from "@mui/material";

interface ILocationChipProps {
  id: string;
  label: string;
  chipData: readonly ChipData[];
  setChipData: React.Dispatch<React.SetStateAction<readonly ChipData[]>>;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({
  label,
  chipData,
  setChipData,
}: ILocationChipProps) {
  const valueRef = React.createRef<HTMLInputElement>();

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleAdd = () => {
    setChipData((chips) => [
      ...chips,
      {
        key: chipData[chipData.length - 1].key + 1,
        label: valueRef.current?.value!,
      },
    ]);
    valueRef.current!.value = "";
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            sx={{ textAlign: "center" }}
          >
            {label}
          </Typography>
        </Grid>

        {chipData.map((data) => {
          let icon;

          if (data.label === "React") {
            icon = <TagFacesIcon />;
          }

          return (
            <ListItem key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={
                  data.label === "React" ? undefined : handleDelete(data)
                }
                sx={{ margin: "10px" }}
              />
            </ListItem>
          );
        })}

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ margin: "10px" }}
        >
          <TextField
            label="Add more"
            id="outlined-size-small"
            size="small"
            inputRef={valueRef}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            sx={{ color: "white", marginLeft: "10px" }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
