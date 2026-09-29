import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./component/Home/Home";
import Navbar from "./component/Navbar";
import About from "./component/About/About";
import ProductService from "./component/ProductService/ProductService";
import Careers from "./component/Careers/Careers";
import Contact from "./component/Contact/Contact";

import { useTranslation } from "react-i18next";
import "./i18n";
import OnsiteService from "./component/Oss/OnsiteService";
import Languageinterpretation from "./component/Language interpretation/Languageinterpretation";
import Trading from "./component/Trading/Trading";
import Language from "./component/Launguage";
import Dashboard from "../dashboard/Dashboard";
import translations from "./translation.json";

const App = () => {
  const validNavbar = ["/"];
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <>
      {validNavbar.includes(location.pathname) && <Navbar t={t} />}
      {/* <Language /> */}

      {/* <nav className="fixed md:top-8 right-0 md:right-1/2 bg-transparent p-1 z-[9999]">
        <div className="flex gap-4">
          <Link to="/">{t("home.head")}</Link>
          <Link to="/about">{t("about.head")}</Link>
          <Link to="/contact">{t("contact")}</Link>
        </div>
        <h1 className="text-white">{t("contactText")}</h1>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="zh">Chinese</option>
          <option value="ru">Russian</option>
          <option value="ko">Korean</option>
        </select>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home t={t} />} />
        <Route path="/about" element={<About t={t} />} />
        <Route path="/service" element={<ProductService t={t} />} />
        <Route path="/oss" element={<OnsiteService t={t} />} />
        <Route path="/contact" element={<Contact t={t} />} />
        <Route path="/careers" element={<Careers t={t} />} />
        <Route path="/language" element={<Languageinterpretation t={t} />} />
        <Route path="/trading" element={<Trading t={t} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
