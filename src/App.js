import HomePage from "./Screens/HomePage/HomePage";
import LoginPage from "./Screens/LoginPage/LoginPage";
import AttendancePage from "./Screens/AttendancePage/AttendancePage";
import Layout from "./Layout";
import ManageEmployee from "./Screens/ManageEmployee/ManageEmployee";
import ReimbursementsPage from "./Screens/ReimbursementsPage/ReimbursementsPage";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import TopBar from "./Components/TopBar/TopBar";
import React from "react";
import NotFoundPage from "./Screens/NotFoundPage/NotFoundPage";
import PaySalaryPage from './Screens/PaySalaryPage/PaySalaryPage'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/employees"
        element={
          <Layout>
            <ManageEmployee />
          </Layout>
        }
      />
      <Route
        path="/reimbursements"
        element={
          <Layout>
            <ReimbursementsPage />
          </Layout>
        }
      />
      <Route
        path="/salary"
        element={
          <Layout>
            <PaySalaryPage/>
          </Layout>
        }  
      />
      <Route
        path="/attendance"
        element={
          <Layout>
            <AttendancePage />
          </Layout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
