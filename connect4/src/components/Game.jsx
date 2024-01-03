import React, { useState } from "react";
import { useEffect } from "react";
import Board from "./Board";
import { Grid, Box, Typography } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { CustomButton } from "../components/Theme";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function Game() {
  const [board, setBoard] = useState(Array(6).fill(Array(7).fill(null)));
  const [player, setPlayer] = useState("X");
  const [timeLeft, setTimeLeft] = useState(30);
  const [Running, setRunning] = useState(true);

  const handleMove = (col) => {
    const newBoard = board.map((row) => [...row]);
    let i = newBoard.length - 1;
    while (newBoard[i][col] !== null) {
      i--;
      console.log(i);
    }
    if (i < 0) {
      return;
    }
    newBoard[i][col] = player;
    console.log(newBoard);
    setBoard(newBoard);
    setPlayer(player === "X" ? "O" : "X");
    setTimeLeft(30);
  };
  const restart = () => {
    const newBoard = Array(6).fill(Array(7).fill(null));
    setBoard(newBoard);
    setPlayer("X");
    setTimeLeft(30);
    setRunning(true);
  };
  const stopTimer = () => {
    setRunning(false);
  };
  const startTimer = () => {
    setRunning(true);
  };
  useEffect(() => {
    if (Running) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        handleTurnEnd();
      }
    }
  }, [Running, timeLeft]);

  const handleTurnEnd = () => {
    const messages = ["Time's up!", "Out of time!"];
    alert(messages[Math.floor(Math.random() * messages.length)]);
    setPlayer(player === "X" ? "O" : "X");
  };
  return (
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
      <p className="text-light">Time left: {timeLeft} seconds</p>
      <Grid
        container
        spacing={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item>
          {Running ? (
            <CustomButton
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: { md: "9rem", sm: "8rem", xs: "6rem" },
                height: { md: "3.5rem", sm: "3rem", xs: "2.6rem" },
              }}
              onClick={stopTimer}
            >
              <PauseIcon fontSize="medium" />
              <Typography
                sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" } }}
              >
                Pause
              </Typography>
            </CustomButton>
          ) : (
            <CustomButton
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: { md: "9rem", sm: "8rem", xs: "6rem" },
                height: { md: "3.5rem", sm: "3rem", xs: "2.6rem" },
              }}
              onClick={startTimer}
            >
              <PlayArrowIcon fontSize="medium" />
              <Typography
                sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" } }}
              >
                Back
              </Typography>
            </CustomButton>
          )}
        </Grid>
        <Grid item>
          <CustomButton
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: { md: "9rem", sm: "8rem", xs: "6rem" },
              height: { md: "3.5rem", sm: "3rem", xs: "2.6rem" },
            }}
            onClick={restart}
          >
            <RestartAltIcon fontSize="medium" />
            <Typography
              sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" } }}
            >
              restart
            </Typography>
          </CustomButton>
        </Grid>
      </Grid>
      <Board board={board} turn={player} onClick={handleMove} />
    </Box>
  );
}

export default Game;
