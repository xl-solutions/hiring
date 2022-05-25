import { Routes, Route } from "react-router-dom";
import { Home } from "./../pages/Home";
import { About } from "./../pages/About";
import { Quote } from "../pages/Quote";
import { History } from "../pages/History";
import { Compare } from "../pages/Compare";
import { Gains } from "../pages/Gains";
import { Portfolio } from "../pages/Portfolio";
import { NotFound } from "../pages/NotFound";

export function MainRouters () {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="quote" element={<Quote />} />
            <Route path="history" element={<History />} />
            <Route path="compare" element={<Compare />} />
            <Route path="gains" element={<Gains />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
