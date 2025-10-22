import { JSX } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage, NotesPage } from '../routes/';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/notes" />} />
      </Routes>
    </div>
  );
}

export default App;
