import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import NoticeBoard from './pages/NoticeBoard';
import PrepRoadmap from './pages/PrepRoadmap';
import ReadingRoadmap from './pages/ReadingRoadmap';
import TopicChecklist from './pages/TopicChecklist';

export default function App() {
  return (
    <HashRouter>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<NoticeBoard />} />
          <Route path="/prep" element={<PrepRoadmap />} />
          <Route path="/reading" element={<ReadingRoadmap />} />
          <Route path="/topics" element={<TopicChecklist />} />
        </Routes>
      </main>
      <BackToTop />
    </HashRouter>
  );
}
