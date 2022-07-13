/* eslint-disable */
import "./App.css";
import { useState } from "react";
import { Button } from "@mui/material";
import pomd from "./assets/images/pomd.png";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import fraised from "./assets/images/fraised.png";
import pomr from "./assets/images/pomr.png";
import fraiser from "./assets/images/fraiser.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const theme = createTheme({
  status: {
    primary: orange[500],
  },
});

function App() {
  const [selectedFruit, setSelectedFruit] = useState("pm");
  const [selectedWord, setSelectedWord] = useState("d");
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

  function changeBottle(fruit) {
    document
      .querySelectorAll(".active")
      .forEach((el) => el.classList.remove("active"));

    document
      .querySelectorAll(`.${fruit}`)
      .forEach((el) => el.classList.add("active"));
  }

  const handleSelectedFruit = (fruit) => {
    setSelectedFruit(fruit);
    setBackground(fruit);
    setShadow(fruit);
    changeBottle(`${fruit}${selectedWord}`);
  };

  function handleSelectWord(word) {
    setSelectedWord(word);
    changeBottle(`${selectedFruit}${word}`);
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
            <img
              className="pmd image active"
              style={{ opacity: 0.5 }}
              src={pomd}
            />
            <img className="pmd image blend active" src={pomd} />
            <img
              className="fraised image"
              style={{ opacity: 0.5 }}
              src={fraised}
            />
            <img className="fraised image blend" src={fraised} />
            <img
              className="fraiser image"
              style={{ opacity: 0.5 }}
              src={fraiser}
            />
            <img className="fraiser image blend" src={fraiser} />
            <img className="pmr image" style={{ opacity: 0.5 }} src={pomr} />
            <img className="pmr image blend" src={pomr} />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
