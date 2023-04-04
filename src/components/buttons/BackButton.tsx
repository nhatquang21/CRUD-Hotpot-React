import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function BackButton() {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<ArrowBackIosIcon />}
      onClick={() => window.history.back()}
    >
      Back
    </Button>
  );
}
