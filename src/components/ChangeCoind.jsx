// Notes
//تقوم بالغاء الوضع الافتراضي  disableRipple-1
//  array الي object تقوم بتحويل ال  Object.values()-2
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { useReducer, useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import IconButton from "@mui/material/IconButton";
import FunReducer from "./Reducer";
import axios from "axios";
import { useEffect } from "react";
export default function ChangeCoind({ t, i18n }) {
  const [input, setInput] = useState("");
  const [dropdownFrom, setDropdownFrom] = useState(false);
  const [dropdownTo, setDropdownTo] = useState(false);

  // نخزن type فقط
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const [rotate, setRotate] = useState(false);
  const [result, dispatch] = useReducer(FunReducer, 0);
  const [apiCurrencies, setApiCurrencies] = useState([]);
  const [rates, setRates] = useState({});

  const disable = !fromCurrency || !toCurrency || !input;

  // ربط type بمفتاح الترجمة
  // const currencyMap = {
  //   Egp: "currency_egp",
  //   Ero: "currency_ero",
  //   Doll: "currency_doll",
  // };
  const API_KEY = "5539e4e2c7-df6e681a52-t7zngz";
  function convert(from, to) {
    dispatch({
      type: "CONVERT",
      payload: {
        amount: input,
        from,
        to,
        rates,
      },
    });
  }
  // خاصة بالاعلام
  const currencyToCountry = {
    AED: "ae",
    AFN: "af",
    ALL: "al",
    AMD: "am",
    ANG: "cw", // Netherlands Antilles (Curaçao)
    AOA: "ao",
    ARS: "ar",
    AUD: "au",
    AWG: "aw",
    AZN: "az",

    BAM: "ba",
    BBD: "bb",
    BDT: "bd",
    BGN: "bg",
    BHD: "bh",
    BIF: "bi",
    BMD: "bm",
    BND: "bn",
    BOB: "bo",
    BRL: "br",
    BRX: "br",
    BSD: "bs",
    BWP: "bw",
    BYN: "by",
    BZD: "bz",

    CAD: "ca",
    CDF: "cd",
    CHF: "ch",
    CLF: "cl",
    CLP: "cl",
    CNH: "cn",
    CNY: "cn",
    COP: "co",
    COU: "co",
    CRC: "cr",
    CUP: "cu",
    CVE: "cv",
    CZK: "cz",

    DJF: "dj",
    DKK: "dk",
    DOP: "do",
    DZD: "dz",

    EGP: "eg",
    ERN: "er",
    ETB: "et",
    EUR: "eu",

    FJD: "fj",
    FKP: "fk",

    GBP: "gb",
    GEL: "ge",
    GHS: "gh",
    GIP: "gi",
    GMD: "gm",
    GNF: "gn",
    GTQ: "gt",
    GYD: "gy",

    HKD: "hk",
    HNL: "hn",
    HTG: "ht",
    HUF: "hu",
    HUX: "hu",

    IDR: "id",
    ILS: "il",
    INR: "in",
    IQD: "iq",
    IRR: "ir",
    ISK: "is",

    JMD: "jm",
    JOD: "jo",
    JPY: "jp",

    KES: "ke",
    KGS: "kg",
    KHR: "kh",
    KMF: "km",
    KPW: "kp",
    KRW: "kr",
    KWD: "kw",
    KYD: "ky",
    KZT: "kz",

    LAK: "la",
    LBP: "lb",
    LKR: "lk",
    LRD: "lr",
    LSL: "ls",
    LYD: "ly",

    MAD: "ma",
    MDL: "md",
    MGA: "mg",
    MKD: "mk",
    MMK: "mm",
    MNT: "mn",
    MOP: "mo",
    MRU: "mr",
    MUR: "mu",
    MVR: "mv",
    MWK: "mw",
    MXN: "mx",
    MXV: "mx",
    MYR: "my",
    MZN: "mz",

    NAD: "na",
    NGN: "ng",
    NIO: "ni",
    NOK: "no",
    NPR: "np",
    NZD: "nz",

    OMR: "om",

    PAB: "pa",
    PEN: "pe",
    PGK: "pg",
    PHP: "ph",
    PKR: "pk",
    PLN: "pl",
    PYG: "py",

    QAR: "qa",

    RON: "ro",
    RSD: "rs",
    RUB: "ru",
    RWF: "rw",

    SAR: "sa",
    SBD: "sb",
    SCR: "sc",
    SDG: "sd",
    SEK: "se",
    SGD: "sg",
    SHP: "sh",
    SLL: "sl",
    SOS: "so",
    SRD: "sr",
    SSP: "ss",
    STN: "st",
    SVC: "sv",
    SYP: "sy",
    SZL: "sz",

    THB: "th",
    TJS: "tj",
    TMT: "tm",
    TND: "tn",
    TOP: "to",
    TRY: "tr",
    TTD: "tt",
    TWD: "tw",
    TZS: "tz",

    UAH: "ua",
    UGX: "ug",
    USD: "us",
    UYU: "uy",
    UZS: "uz",

    VES: "ve",
    VND: "vn",
    VUV: "vu",

    WST: "ws",

    XAF: "cm", // Central Africa
    XCD: "ag", // East Caribbean
    XDR: "un",
    XOF: "sn", // West Africa
    XPF: "pf",

    YER: "ye",

    ZAR: "za",
    ZMW: "zm",
  };

  function swapCurrencies() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    convert(toCurrency, fromCurrency);
  }
  //APIالاولي لجب بيانات من ال  useEffect  ال
  useEffect(() => {
    axios
      .get(`https://api.fastforex.io/fetch-all?api_key=${API_KEY}&from=EGP`)
      .then(function (response) {
        console.log(response.data.results);
        setRates(response.data.results);
        const generatedCurrencies = Object.keys(response.data.results).map(
          (key) => ({
            type: key,
            name: key,
            flag: currencyToCountry[key]
              ? `https://flagcdn.com/w40/${currencyToCountry[key]}.png`
              : null,
          })
        );
        setApiCurrencies(generatedCurrencies);
      })
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);
  //   new AbortController(); ولكن هنا من خلال  cancel token  الثانية لعمل التحديث التلقائي من خلال ال  useEffect  ال
  useEffect(() => {
    if (!input || !fromCurrency || !toCurrency) return;
    const controller = new AbortController();
    dispatch({
      type: "CONVERT",
      payload: {
        amount: input,
        from: fromCurrency,
        to: toCurrency,
        rates,
      },
    });
    return () => {
      controller.abort();
    };
  }, [input, fromCurrency, toCurrency, rates]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        boxShadow: "1px 1px 5px rgba(39, 2, 87, 1)",
      }}
    >
      {/* INPUT */}
      <TextField
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        variant="outlined"
        placeholder="0"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            convert(fromCurrency, toCurrency);
          }
        }}
      />
      <div className="dropdown">
        {/* FROM */}
        <div className="Sellect1">
          <div
            style={{
              direction: (i18n?.language || "en") === "en" ? "ltr" : "rtl",
              textAlign: "center",
              fontSize: "15px",
            }}
            className="dropDownTo"
            onClick={() => {
              setDropdownTo(!dropdownTo);
              setDropdownFrom(false);
            }}
          >
            {fromCurrency ? t(fromCurrency) : t("choose_currency")}

            {apiCurrencies.map((item, index) => {
              if (item.type === fromCurrency) {
                return (
                  <img
                    key={index}
                    src={item.flag}
                    width="28"
                    height="20"
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    alt={item.type}
                  />
                );
              }
            })}
          </div>
          <div
            className="containSpan"
            style={{
              maxHeight: "300px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {dropdownTo &&
              apiCurrencies.map((item, index) => (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    width: "90%",
                    padding: "8px 12px",
                    marginBottom: "6px",
                    borderRadius: "8px",
                    backgroundColor: "#00ffff",
                    cursor: "pointer",
                    fontSize: "15px",
                    direction:
                      (i18n?.language || "en") === "en" ? "rtl" : "ltr",
                    textAlign: "center",
                  }}
                  key={index}
                  onClick={() => {
                    setFromCurrency(item.type);
                    setDropdownTo(false);
                    if (toCurrency) convert(item.type, toCurrency);
                  }}
                >
                  {t(item.name)}
                  <img
                    src={item.flag}
                    width="28"
                    height="20"
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    alt={item.type}
                  />
                </span>
              ))}
          </div>
        </div>

        {/* SWAP */}
        <h1>
          <IconButton
            className={rotate ? "rotate" : ""}
            onClick={() => {
              if (disable) return;
              swapCurrencies();
              setRotate(true);
              setTimeout(() => setRotate(false), 500);
            }}
            disabled={disable}
            disableRipple
            sx={{
              color: "#0b0b0b",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              "&:hover": { backgroundColor: "#00bcd4" },
              "&.Mui-disabled": {
                backgroundColor: "#b2ebf2",
                color: "#666",
                boxShadow: "none",
              },
            }}
          >
            <SwapHorizIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </h1>
        {/* TO */}
        <div className="Sellect2">
          <div
            style={{
              direction: (i18n?.language || "en") === "en" ? "ltr" : "rtl",
              fontSize: "15px",
            }}
            className="dropDownFrom"
            onClick={() => {
              setDropdownFrom(!dropdownFrom);
              setDropdownTo(false);
            }}
          >
            {toCurrency ? t(toCurrency) : t("choose_currency")}
            {apiCurrencies.map((item, index) => {
              if (item.type === toCurrency) {
                return (
                  <img
                    key={index}
                    src={item.flag}
                    width="28"
                    height="20"
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    alt={item.type}
                  />
                );
              }
            })}
          </div>
          <div
            style={{
              maxHeight: "300px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {dropdownFrom &&
              apiCurrencies.map((item, index) => (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    width: "90%",
                    padding: "8px 12px",
                    marginBottom: "6px",
                    borderRadius: "8px",
                    backgroundColor: "#00ffff",
                    cursor: "pointer",
                    fontSize: "15px",
                    direction:
                      (i18n?.language || "en") === "en" ? "rtl" : "ltr",
                    textAlign: "center",
                  }}
                  key={index}
                  onClick={() => {
                    setToCurrency(item.type);
                    setDropdownFrom(false);
                    if (fromCurrency) convert(fromCurrency, item.type);
                  }}
                >
                  {t(item.name)}
                  <img src={item.flag} width="30" />
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* RESULT */}
      <div>
        {result ? `${t("result")} : ${result}` : t("Result appeare here")}
      </div>
    </Card>
  );
}
