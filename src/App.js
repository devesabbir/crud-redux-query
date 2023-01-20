import { Route, Routes } from "react-router-dom";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";

import Home from "./pages/Home";
import Single from "./pages/Single";

function App() {
  return (
    <Routes>
        <Route index element={<Home/>} />
        <Route path="/add" element={<AddForm/>} />
        <Route path="/view/:id" element={<Single/>} />
        <Route path="/edit/:id" element={<EditForm/>} />
    </Routes>

  );
}

export default App;