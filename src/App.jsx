import Button from "@mui/material/Button";
import "./App.css";
import ChangeCoind from "./components/ChangeCoind";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/material";

// const currencies = [
//   { name: "جنية", image: "src/components/Egypt.jpg", type: "Egp" },
//   { name: "يورو", image: "src/components/Eruo.jpg", type: "Ero" },
//   { name: "دولار", image: "src/components/doller.jpg", type: "Doll" },
// ];
function App() {
  const { t, i18n } = useTranslation();
  function translate() {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  }

  return (
    <>
      <Container
        sx={{
          fontSize: {
            xs: "12px",
            md: "16px",
            lg: "20px",
          },
          display:"flex",
          flexDirection:"column",
          gap:3
        }}
      >
        <ChangeCoind t={t} />

        <Button
          onClick={translate}
          variant="contained"
          disableRipple
          sx={{
            "&:hover": {
              backgroundColor: "",
            },
          }}
        >
          {t("switch_language")}
        </Button>
      </Container>
    </>
  );
}

export default App;
