import './App.css';
import AddPost from './Components/AddPost';
import BottomNav from './Components/BottomNav';
import Feed from './Components/Feed';
import Messages from './Components/Messages';
import Profile from './Components/Profile';
import Search from './Components/Search';
import Comments from './Components/Comments';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={<Feed/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/home' element={<Feed/>}/>
          <Route path='/add' element={<AddPost/>}/>
          <Route path='/chat' element={<Messages/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/home/:id/comments' element={<Comments/>}/>
        </Routes>
        <BottomNav/>
      </div>
    </Router>
  );
}

export default App;
