import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContext, useMemo } from "react";
import { AuthContext } from "@/context/AuthContext";
import Grid from "@mui/material/Grid";
import FeatureCard from "./FeatureCard";
import Box from "@mui/material/Box";
import { BASIC_FEATURES, GUIDE_FEATURES } from "@/constants/HomePage";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const isGuide = useMemo(() => {
    return !!user?.roles?.includes("GUIDE");
  }, [user]);
  const features = isGuide ? GUIDE_FEATURES : BASIC_FEATURES;
  console.log("isGuide =", isGuide);
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Stack
        spacing="16px"
        direction="column"
        alignItems="center"
        width="100%"
        maxWidth="800px"
      >
        <Typography sx={{ fontSize: { xs: 24 }, fontWeight: 600 }}>
          New Feature in my dashboard
        </Typography>
        <Grid
          rowSpacing="32px"
          columnSpacing="16px"
          container
          justifyContent="stretch"
        >
          {features.map((data) => {
            return (
              <Grid key={data.title} item xs={6}>
                <FeatureCard {...data} />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Box>
  );
};

export default HomePage;
