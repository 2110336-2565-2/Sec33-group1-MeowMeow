import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ChipPostData } from "./formEdit";

interface ILocationChipProps {
  id: string;
  label: string;
  data: readonly string[];
  onArray: (name: string, value: string[]) => void;
  value: string[];
}

interface IChip {
  key: number;
  label: string;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({
  id,
  label,
  data,
  onArray,
}: ILocationChipProps) {
  const [customTag, setCustomTag] = React.useState("");
  const [chipData, setChipData] = React.useState<readonly IChip[]>(
    data.map((location, index) => {
      return {
        key: index,
        label: location,
      };
    })
  );

  const handleDelete = (chipToDelete: IChip) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    onArray(
      id,
      chipData
        .filter((chip) => chip.key !== chipToDelete.key)
        .map((chip) => chip.label)
    );
  };

  const handleAdd = () => {
    if (customTag.trim().length === 0) {
      return;
    }
    setChipData((chips) => [
      ...chips,
      {
        key: chipData.length === 0 ? 1 : chipData[chipData.length - 1].key + 1,
        label: customTag.trim()!,
      },
    ]);
    onArray(id, [...chipData.map((chip) => chip.label), customTag.trim()]);
    setCustomTag("");
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

          return (
            <ListItem key={data.key} id={id} value={data.label}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={handleDelete(data)}
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
            id="outlined-basic"
            label="Add more"
            size="small"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
          />

          <Button
            disabled={customTag === ""}
            variant="contained"
            color="primary"
            sx={{ color: "white", marginLeft: "10px" }}
            type="button"
            onClick={handleAdd}
          >
            +
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
