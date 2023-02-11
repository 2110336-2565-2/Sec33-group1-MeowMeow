import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import { PRIVACY_POLICIES } from "@/constants/RegisterPage";

interface ITermsConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  border: "none",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  rowGap: "16px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: "12px",
    marginRight: "12px",
    padding: "32px 32px 12px 12px",
  },

  [theme.breakpoints.up("md")]: {
    width: "500px",
    padding: "32px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "700px",
    padding: "32px",
  },
}));

const TermsConditionsModal = ({
  isOpen,
  onClose,
}: ITermsConditionModalProps) => {
  const theme = useTheme();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        border: "none",
      }}
    >
      <Fade in={isOpen}>
        <ModalContainer>
          <Typography variant="h6" fontWeight="500" textAlign="center">
            Privacy Policy
          </Typography>
          <Stack
            direction="column"
            rowGap="16px"
            marginBottom="16px"
            sx={{ overflowY: "scroll" }}
            maxHeight={{ xs: "350px", md: "450px" }}
          >
            {PRIVACY_POLICIES.map((data) => {
              const { title, description } = data;
              return (
                <Stack
                  key={title}
                  display="flex"
                  flexDirection="column"
                  rowGap="8px"
                >
                  <Typography fontWeight="600">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Stack>
              );
            })}
          </Stack>
          <Box display="flex" justifyContent="end" alignItems="center">
            <Button variant="contained" color="primary" onClick={onClose}>
              <Typography color="white" variant="body2" fontWeight="500">
                UNDERSTAND
              </Typography>
            </Button>
          </Box>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default TermsConditionsModal;
