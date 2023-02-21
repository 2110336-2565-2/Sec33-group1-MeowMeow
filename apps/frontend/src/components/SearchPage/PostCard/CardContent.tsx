import { LocationOn } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface ICardContent {
  title: string;
  body: string;
  price: number;
  location: string;
  amount: number;
}

export default function CardContent(props: ICardContent) {
  const { title, body, price, location, amount } = props;
  return (
    <Box m={2} flexGrow={1}>
      <Box mb={2}>
        <Typography variant="h6">{title}</Typography>

        <Typography variant="subtitle2">
          <LocationOn fontSize="inherit" />
          {location}s
        </Typography>
      </Box>
      <Typography variant="body2">Amount : {amount} people</Typography>
      <Typography variant="body2">Rate : {price} ฿</Typography>
      <Typography variant="body2">{body}</Typography>
    </Box>
  );
}
