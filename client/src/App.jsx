import { BrowserRouter, Route, Routes }  from "react-router-dom";
import Home from "./pages/Home";
import ResetPage from "./pages/ResetPage";
import LinePage from "./components/LineChart";
import BarPage from "./components/BarChart";
import PiePage from "./components/PieChart";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/reset_password" element={<ResetPage/>}/>
        <Route path="/linechart" element={<LinePage/>}/>
        <Route path="/barchart" element={<BarPage/>}/>
        <Route path="/piechart" element={<PiePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}