/* eslint-disable */
import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import IconButton from "@mui/material/IconButton";

import * as images from "./assets/images";

const theme = createTheme({
  status: {
    primary: orange[500],
  },
});

function App() {
  const [selectedFruit, setSelectedFruit] = useState("pm");
  const [selectedWord, setSelectedWord] = useState("d");
  const [url, setUrl] = useState(images.pmd1);
  const [count, setCount] = useState(1);
  function handleCount() {
    let newCount = count + 1;
    setCount((newCount % 3) + 1);
  }
  const img = useRef(null);
  const blend = useRef(null);

  function setBackground(fruit) {
    document.querySelector("body").className = fruit;
  }

  function setShadow(fruit) {
    document.querySelectorAll(".blend").forEach((el) => {
      el.classList.remove("fraise");
      el.classList.remove("pm");
      el.classList.add(fruit);
    });
  }

  function changeBottle(fruit = selectedFruit, word = selectedWord) {
    handleCount();
    [img.current, blend.current].forEach((el) => el.classList.remove("active"));
    setTimeout(() => {
      setUrl(images[`${fruit}${word}${count}`]);
      console.log(fruit);
      img.current.src = url;
      blend.current.src = url;
      [img.current, blend.current].forEach((el) => el.classList.add("active"));
    }, 700);
  }

  const handleSelectedFruit = (fruit) => {
    setSelectedFruit(fruit);
    setBackground(fruit);
    setShadow(fruit);
    changeBottle(fruit, selectedWord);
  };

  function handleSelectWord(word) {
    setSelectedWord(word);
    changeBottle(selectedFruit, word);
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header className="App-header"></header>
        <div className="container">
          <div className="select-container">
            <div className="select-box">
              <h2>Vous êtes plutôt :</h2>
              <div className="button-select">
                <Button
                  onClick={() => handleSelectedFruit("pm")}
                  variant={selectedFruit === "pm" ? "contained" : "outlined"}
                >
                  Pomme
                </Button>
                <Button
                  onClick={() => handleSelectedFruit("fraise")}
                  variant={
                    selectedFruit === "fraise" ? "contained" : "outlined"
                  }
                >
                  Fraise
                </Button>
              </div>
              <h2>Vous me voulez :</h2>
              <div className="button-select">
                <Button
                  variant={selectedWord === "d" ? "contained" : "outlined"}
                  onClick={() => handleSelectWord("d")}
                >
                  Désirable
                </Button>
                <Button
                  variant={selectedWord === "r" ? "contained" : "outlined"}
                  onClick={() => handleSelectWord("r")}
                >
                  Révolté
                </Button>
              </div>
            </div>
            <Button
              style={{
                maxWidth: "400px",
                mixBlendMode: "overlay",
                marginTop: "20px",
              }}
              endIcon={<PlayArrowIcon />}
              variant="contained"
            >
              Découvrez la nouvelle collection
            </Button>
          </div>
          <div className="image-container">
            <IconButton
              onClick={() => changeBottle()}
              style={{ transform: "translateX(-20vw)" }}
              size="large"
            >
              <ReplayIcon fontSize="large"></ReplayIcon>
            </IconButton>
            <img
              className="pmd image active"
              style={{ opacity: 0.5 }}
              src={url}
              ref={img}
            />
            <img ref={blend} className="pmd image blend active" src={url} />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
