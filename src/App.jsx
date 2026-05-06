import { AppRouter } from './routes/AppRouter'
import { useEffect } from "react";
import { uploadData } from "./uploadData.js";

function App() {
  // useEffect(() => {
  //   uploadData();
  // }, []);
  return <AppRouter />
}

export default App
