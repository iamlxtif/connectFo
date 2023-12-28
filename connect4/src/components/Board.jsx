import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";

function Board(props) {
  const [hoveredColumn, setHoveredColumn] = useState(null);

  const handleColumnHover = (cellValue, colIndex) => {
    setHoveredColumn(colIndex);
  };

  const renderCell = (cellValue, colIndex) => {
    const discColor =
      cellValue === "X"
        ? "#AB2328"
        : cellValue === "O"
        ? "#23395d"
        : "#FFFFFF10";

    return (
      <Paper
        elevation={3}
        sx={{
          height: { xs: 30, sm: 50, md: 60 },
          width: { xs: 30, sm: 50, md: 60 },
          backgroundColor: discColor,
          borderRadius: "50%",
          margin: "auto",
          ...((colIndex === hoveredColumn && cellValue !== "X" && cellValue !== "O") && {
            backgroundColor: "#C3073F30", // Change to the desired column hover color
          }),
        }}
        onMouseEnter={() => handleColumnHover(cellValue, colIndex)}
        onMouseLeave={() => setHoveredColumn(null)}
      />
    );
  };

  const renderBoard = () => (
    <Grid container spacing={1} justifyContent="center">
      {props.board.map((row, rowIndex) => (
        <Grid key={rowIndex} item container spacing={1} justifyContent="center">
          {row.map((cellValue, colIndex) => (
            <Grid key={colIndex} onClick={() => props.onClick(colIndex)} item>
              {renderCell(cellValue, colIndex)}
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );

  return <div style={{ padding: "20px" }}>{renderBoard()}</div>;
}

export default Board;
