import words from "../components/wordlebank";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];



export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
  
    try {
      const wordArr = words;
      const randomIndex = Math.floor(Math.random() * wordArr.length);
      todaysWord = wordArr[randomIndex];
      wordSet = new Set(wordArr);
    } catch (error) {
      console.error("Error loading word bank:", error);
      // Puedes manejar el error según tu lógica de la aplicación
      wordSet = new Set();
      todaysWord = "";
    }
  
    return { wordSet, todaysWord };
  };
