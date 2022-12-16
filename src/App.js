import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import BestStories from './components/BestStories/BestStories';
import SavedNews from './components/SavedNews/SavedNews';
import TopStories from './components/TopStories/TopStories';
import NewStories from './components/NewStories/NewStories';

function App() {
  const [show, setShow] = useState(true);
  const [savedNews, setSavedNews] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem('myNews');
    if(data !== null) {
      setShow(JSON.parse(data));
    }
  }, []); 

  useEffect(() => {
    window.localStorage.setItem('myNews', JSON.stringify(show));
  }, [show])

  const saveNews = (news) => {
    // if (savedNews.indexOf(record) !== -1) return;
    setSavedNews([...savedNews, news]);
  }

  const handleChange = (item, d) => {
    const ind = savedNews.indexOf(item);
    const arr = savedNews;
    arr[ind].amount += d;
    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setSavedNews([...arr]);
  };

  return (
    <div className="App">
      <Router>
      <Navbar setShow={setShow} />
      <Routes>
        <Route path='/beststories' element={<BestStories handleClick={saveNews} />} />
        <Route path='/savedstories' element={<SavedNews savedNews={savedNews} setSavedNews={setSavedNews} handleChange={handleChange} />} />
        <Route path='/topstories' element={<TopStories handleClick={saveNews} />} />
        <Route path='/newstories' element={<NewStories handleClick={saveNews} />} />
      </Routes>

</Router>
    </div>
  );
}

export default App;
