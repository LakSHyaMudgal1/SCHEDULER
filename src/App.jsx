import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Homepage = lazy(() => import("./pages/Homepage"));
const About = lazy(() => import("./pages/About"));
const Schedule = lazy(() => import("./pages/Schedule"));

function App() {
  return (
    <div className="w-screen h-screen overflow-y-scroll overflow-x-hidden md:overflow-hidden p-4 md:p-8 bg-slate-50">
      <BrowserRouter>
        <Suspense fallback={<div className="flex items-center justify-center h-full text-stone-400">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Schedule />} />
            <Route path="/algorithms" element={<Schedule />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
