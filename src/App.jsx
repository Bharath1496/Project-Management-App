import { 
  BrowserRouter, 
  Routes, 
  Route ,
  Navigate 
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      {/* <Layout> */}
        <Routes>

          {/* <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/projects" element={<Projects />} />

          <Route path="/tasks" element={<Tasks />} /> */}
         <Route path="/" element={<Layout />}>

          <Route
            index
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="projects"
            element={<Projects />}
          />

          <Route
            path="tasks"
            element={<Tasks />}
          />

        </Route>
        
        </Routes>
      {/* </Layout> */}
    </BrowserRouter>
  );
}

export default App;