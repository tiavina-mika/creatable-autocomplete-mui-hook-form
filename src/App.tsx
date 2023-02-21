import { Box, Container, Stack, Typography } from "@mui/material";

import ArticleForm from "./containers/articles/ArticleForm";

const App = () => {
  return (
    <Container>
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          py: 2
        }}
      >
        <div>
          <Stack spacing={3}>
            <Typography variant="h5">
              Creatable Autocomplete with MUI and React Hook Form
            </Typography>
            <ArticleForm />
          </Stack>
        </div>
        <div>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <a href="https://www.linkedin.com/in/tiavina-michael-ralainirina/">
              <Typography>By Tiavina Michael Ralainirina</Typography>
            </a>
          </Box>
        </div>
      </Box>
    </Container>
  );
};

export default App;
