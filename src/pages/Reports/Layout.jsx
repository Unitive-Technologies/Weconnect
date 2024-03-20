// For Reports Module
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7367f0d9",
    },
  },
});

useEffect(() => {
  toast.error("ok");
}, []);

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <ToastContainer />
    </ThemeProvider>
  );
}
