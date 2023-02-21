import { Box, Typography } from "@mui/material";
import Form from "./Form";

const App = () => {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>
        <Box mb={1.2}>
          <Typography>
            Multi choice checkbox with MUI and React Hook Form
          </Typography>
        </Box>
        <Form />
      </div>
      <div>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <a href="https://www.linkedin.com/in/tiavina-michael-ralainirina/">
            <Typography>By Tiavina Michael Ralainirina</Typography>
          </a>
        </Box>
      </div>
    </Box>
  );
};

export default App;
