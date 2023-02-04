import Typography from "@mui/material/Typography";

const PrivacyPolicy = () => {
  return (
    <Typography variant="body2" component="span" marginTop="20px">
      By clicking Register you accept{" "}
      <Typography variant="body2" color="secondary" component="span">
        Terms of Use and acknowledge the Privacy Policy and Cookie Policy.
      </Typography>
    </Typography>
  );
};

export default PrivacyPolicy;
