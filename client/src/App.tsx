import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Toaster } from "./components/ui/toaster";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import Logout from "./pages/Logout";
import ScholarshipDetail from "./pages/scholarship/ScholarshipDetail";
import ScholarshipUpload from "./pages/scholarship/ScholarshipUpload";
import ScholarshipPage from "./pages/dashboard-sponsorship/scholarship/ScholarshipPage";
import ScholarshipDetailDashboard from "./pages/dashboard-sponsorship/scholarship/ScholarshipDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <Page404 />,
    children: [],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Page404 />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <Page404 />,
  },
  {
    path: "/logout",
    element: <Logout />,
    errorElement: <Page404 />,
  },
  {
    path: "/:user_id/dashboard",
    element: <ScholarshipDetail />,
    errorElement: <Page404 />,
  },
  {
    path: "/:user_id/dashboard-sponsorship",
    element: <ScholarshipPage />,
    errorElement: <Page404 />,
  },
  {
    path: "/:user_id/dashboard-sponsorship/scholarship/:scholarship_id",
    element: <ScholarshipDetailDashboard />,
    errorElement: <Page404 />,
  },
  {
    path: "/scholarship/:id",
    element: <ScholarshipDetail />,
    errorElement: <Page404 />,
  },
  {
    path: "/scholarship/upload",
    element: <ScholarshipUpload />,
    errorElement: <Page404 />,
  },
]);

function App() {
  const client = new ApolloClient({
    uri: `${process.env.REACT_APP_BASE_URL_API}/graphql`,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
      <Toaster />
    </ApolloProvider>
  );
}

export default App;
