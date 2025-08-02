import { Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import HomePage from './pages/Home/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<div>Вход</div>} />
        <Route path="register" element={<div>Регистрация</div>} />
      </Route>
    </Routes>
  );
};

export default App;