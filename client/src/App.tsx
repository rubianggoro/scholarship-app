import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Toaster } from "./components/ui/toaster";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";

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
