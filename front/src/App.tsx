import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import { Login} from './pages/login';
import TestPage from './pages/test';
import PostPage from './pages/post';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<TestPage/>} />
      <Route path="/post/:id" element={<PostPage/>} />
    </Routes>
  )
}
