import { useState } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import './fonts/fonts.css';
// test
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1A1A1D",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "3rem", md: "5rem" },
              marginBottom: "0.3rem",
              color: "#C3073F",
              fontFamily: 'Robus, sans-serif',
            }}
          >
            Connect Four Game
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              marginBottom: "1.5rem",
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              fontWeight: "400",
              color: "white",
              textAlign: 'center',
              marginRight: {xs:'2rem'},
              marginLeft: {xs:'2rem'}
            }}
          >
            a classic strategy game in which two players go head-to-head in a battle to own the grid!
          </Typography>
        </Box>
        <Grid
          container
          spacing={{xs:2, md:-30,lg:-70}}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width:'100vw'
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                background: "none",
                padding: "1.2rem 1rem",
                color: "#fff",
                border: "1px solid #C3073F",
                borderRadius: "3rem",
                fontSize: { xs: "0.8rem", md: "1.2rem" },
                cursor: "pointer",
                "&:hover": {
                  transition: "all 0.5s ease-in-out",
                  transform: "scale(1.1)",
                  background: "linear-gradient(135deg, #950740, #C3073F)",
                  border: "none",
                },
              }}
            >
              Human vs. AI bot
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                background: "none",
                padding: "1.2rem 1rem",
                color: "#fff",
                border: "1px solid #C3073F",
                borderRadius: "3rem",
                fontSize: { xs: "0.8rem", md: "1.2rem" },
                cursor: "pointer",
                "&:hover": {
                  transition: "all 0.3s ease-in-out",
                  transform: "scale(1.1)",
                  background: "linear-gradient(135deg, #950740, #C3073F)",
                  border: "none",
                },
              }}
            >
              AI bot 1 vs. AI bot 2
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
