import { Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "../fonts/fonts.css";
import { CustomButton } from "../components/Theme";

function Home() {
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
              fontFamily: "Robus, sans-serif",
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
              marginRight: { xs: "2rem" },
              marginLeft: { xs: "2rem" },
            }}
          >
            a classic strategy game in which two players go head-to-head in a
            battle to own the grid!
          </Typography>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: -30, lg: -70 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
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
            <CustomButton
              component={Link}
              to='/human'
              sx={{
                fontSize: { xs: "0.8rem", md: "1.2rem" },
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              Human vs. AI bot
            </CustomButton>
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
            <CustomButton
              component={Link}
              to='/bots'
              sx={{
                fontSize: { xs: "0.8rem", md: "1.2rem" },
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              AI bot 1 vs. AI bot 2
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
