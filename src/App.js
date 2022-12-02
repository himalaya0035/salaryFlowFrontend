import HomePage from "./Screens/HomePage/HomePage";
import LoginPage from "./Screens/LoginPage/LoginPage";
import AttendancePage from './Screens/AttendancePage/AttendancePage'
import Layout from "./Layout";
import ManageEmployee from "./Screens/ManageEmployee/ManageEmployee";

function App() {
  return (
    <>
    {/* <LoginPage/> */}
    {/* <Layout>
      <HomePage />
    </Layout> */}
    <Layout>
      <ManageEmployee />
    </Layout>
    {/* <Layout>
      <AttendancePage />
    </Layout> */}
    </>
  );
}

export default App;
