import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import { AddTask } from "./pages/AddTask";
import { Task } from './pages/Task';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/addtask" element={<AddTask/>}/>
          <Route path="/:task" element={<Task />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
