import "./App.css";
import { Routes, Route } from "react-router-dom";
import Head from "./pages/head";
import Subgroup from "./pages/subgroup";
import Test from "./pages/test";
import InsertTest from "./pages/insertTest";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className=" w-full h-full p-7">
      <Head />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Subgroup" element={<Subgroup />} />
        <Route path="/InsertTest" element={<InsertTest />} />
        <Route path="/test" element={<Test />} />
        {/* <Route path="/layout" element={<Layout />} />
        <Route path="/TestExamination" element={<TestExamination />} />
        <Route path="/InsertTest" element={<InsertTest />} /> */}
      </Routes>
    </div>
  );
}

export default App;
