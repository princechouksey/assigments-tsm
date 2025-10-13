import React from "react";
import Sidebar from "./components/layouts/Sidebar";
import Topbar from "./components/layouts/Topbar";
import StatsCard from "./components/carts/StatsCard";
import AddMember from "./components/forms/AddMember";
import { Route, Routes } from "react-router-dom";
import AddBook from "./components/forms/AddBook";
import IssueBook from "./components/forms/IssueBook";
import Bookpage from "./pages/Bookpage";
import MembersPage from "./pages/MembersPage";
import MemberDetails from "./pages/MemberDetails";
import BookDetails from "./pages/BookDetails";
import Settings from "./components/common/Settings";
import AdminLogin from "./pages/Login";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-50 to-cyan-50 ">
      <Routes>
        <Route path="/admin/dashboard" element={<Sidebar />} />
        <Route path="/student/dashboard" element = {<Sidebar />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/issue-book" element={<IssueBook />} />
        <Route path="/books" element={<Bookpage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/member/:memberId" element={<MemberDetails />} />
        <Route path="/books/:bookId" element= {  <BookDetails />} />
        <Route path="/settings" element = { <Settings />} />
        <Route path="/" element = {<Login />} />

      </Routes>
    
      
    </div>
  );
};

export default App;
