import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './routes/PrivateRoute';
import { AdminRoute } from './routes/AdminRoute';
import { Layout } from './layout/Layout';

// Auth Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Book Pages
import { BooksList } from './components/layout/Books/BookList';

// Cart Pages
import { CartPage } from './components/layout/Books/Cart/CartPage';

// Borrow Pages
import { MyRequests } from './pages/MyRequests';
import { BorrowedBooks } from './pages/borrow/BorrowedBooks';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageRequests } from './pages/admin/ManagementRequests';
import { ManageBooks } from './pages/admin/ManageBooks';
import { ManageUsers } from './pages/admin/ManageUsers';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <PrivateRoute>
            <Layout>
              <Navigate to="/books" replace />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/books" element={
          <PrivateRoute>
            <Layout>
              <BooksList />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/cart" element={
          <PrivateRoute>
            <Layout>
              <CartPage />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/my-requests" element={
          <PrivateRoute>
            <Layout>
              <MyRequests />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/borrowed-books" element={
          <PrivateRoute>
            <Layout>
              <BorrowedBooks />
            </Layout>
          </PrivateRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <Layout>
              <AdminDashboard />
            </Layout>
          </AdminRoute>
        } />

        <Route path="/admin/books" element={
          <AdminRoute>
            <Layout>
              <ManageBooks />
            </Layout>
          </AdminRoute>
        } />

        <Route path="/admin/users" element={
          <AdminRoute>
            <Layout>
              <ManageUsers />
            </Layout>
          </AdminRoute>
        } />

        <Route path="/admin/requests" element={
          <AdminRoute>
            <Layout>
              <ManageRequests />
            </Layout>
          </AdminRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/books" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;