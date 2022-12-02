import HomePage from "./Screens/HomePage/HomePage";
import LoginPage from "./Screens/LoginPage/LoginPage";
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
    </>
  );
}

export default App;
