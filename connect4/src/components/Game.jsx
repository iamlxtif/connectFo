import React, { useState } from "react";
import { useRef, useEffect } from "react";
import Board from "./Board";
import { Grid, Box, Typography, Modal, Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { CustomButton } from "../components/Theme";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function Game(props) {
  //const [board, setBoard] = useState(Array(6).fill(Array(7).fill(0)));
  const [player, setPlayer] = useState(props.player);
  const [timeLeft, setTimeLeft] = useState(30);
  const [Running, setRunning] = useState(false);
  const mode = props.mode;
  //const [gameState, setGameState] = useState(0);
  const [err, setErr] = useState(0);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [tie, setTie] = useState(false);
  const [response, setResponse] = useState({
    gameState: 0,
    board: Array(6).fill(Array(7).fill(0)),
    returned: false,
  });
  const [showStart, setshowStart] = useState(true);

  useEffect(() => {
    if (response.returned) {
      props.socket.on("response", (data) => {
        const newResponse = {
          gameState: data.GameState,
          board: data.board,
          returned: true,
        };
        setResponse(newResponse);
        console.log("response : ");
      });
    }
  }, [props.socket]);

  useEffect(() => {
    if (response.returned) {
      console.log("Updated gameState:", response.gameState);
      if (response.gameState === player) {
        setWinner(player === 1 ? "red" : "blue");
        setTie(false);
        setShowWinnerModal(true); // Display the modal
        stopTimer();
        return;
      } else if (response.gameState === 2) {
        setTie(true);
        setShowWinnerModal(true); // Display the modal
        stopTimer();
        return;
      }
      //console.log("Updated board:", response.board);
      setPlayer(player*-1);
    }
  }, [response]);

  useEffect(() => {
    if (response.returned) {
      console.log(player, "s turn");
      setTimeLeft(30);
    }
  }, [player]);

  useEffect(() => {
    if (response.returned) {
      const newResponse = {
        gameState: response.gameState,
        board: response.board,
        returned: false,
      };
      setResponse(newResponse);
      if ((mode === 2 || (mode === 1 && player === -1 )) && Running) {
        handleAiMove();
      }
    }
  }, [timeLeft]);

  const handleMove = (col) => {
    if (mode === 1 && player === 1 && props.socket && Running) {
      console.log("you use board:", response.board);
      props.socket.emit("play_event", {
        board: response.board,
        turn: player, // 1 or -1
        mode: mode, // 1 or 2
        play_col: col, // -1 if AI turn else humen selection
      });
      // if err affichage and return
    }
  };

  const handleAiMove = async () => {
    if (props.socket) {
      await delay(1000);
      console.log("bot use board:", response.board);
      props.socket.emit("play_event", {
        board: response.board,
        turn: player, // 1 or -1
        mode: mode, // 1 or 2
        play_col: -1, // -1 if AI turn else humen selection
      });
    }
  };
  const Start = () =>{
    if (mode === 2) {
      handleAiMove();
    } else if (player === -1) handleAiMove();
      setshowStart(false);
      setRunning(true);
  }
  const delay = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };
  const restart = () => {
    const newResponse = {
      gameState: 0,
      board: Array(6).fill(Array(7).fill(0)),
      returned: false,
    };
    setResponse(newResponse);
    setPlayer(props.player);
    setTimeLeft(30);
    setRunning(false);
    setshowStart(true);
  };
  const stopTimer = () => {
    setRunning(false);
  };
  const startTimer = () => {
    setRunning(true);
  };
  useEffect(() => { // Timer inc and time out
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
    if (props.socket) {
      props.socket.emit("timeout_event", {
        board: response.board,
        turn: player, // 1 or -1
        mode: mode, // 1 or 2
        play_col: -1, // -1 if AI turn else humen selection
      });
    }
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
        {showStart && (
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
              onClick={() => {Start()}}
            >
              <PlayArrowIcon fontSize="medium" />
              <Typography
                sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" } }}
              >
                Start
              </Typography>
            </CustomButton>
          </Grid>
        )}
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
      <Board board={response.board} turn={player} onClick={handleMove} />
      <Modal
        open={showWinnerModal}
        onClose={() => {
          setShowWinnerModal(false);
          restart();
        }}
        aria-labelledby="winner-modal"
        aria-describedby="winner-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Black background with transparency
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)", // Shadow effect
          borderRadius: "8px", // Optional: Adds rounded corners
          outline: "none", // Optional: Remove default outline
          maxWidth: { xs: "50%", md: "25%" }, // Optional: Limit maximum width
          maxHeight: "25%", // Optional: Limit maximum height
          margin: "auto", // Center horizontally and vertically
          padding: "20px", // Optional: Add padding
          overflow: "auto", // Enable scrolling if content overflows
        }}
      >
        <div className="winner-modal">
          {!tie && <h2 id="winner-modal">Player {winner} wins!</h2>}
          {tie && <h2 id="winner-modal">It's a tie!</h2>}
        </div>
      </Modal>
    </Box>
  );
}

export default Game;
