import React from "react";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import CreateUserPage from "./pages/CreateUser";
import { Toaster } from "./components/ui/toaster";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    children: [],
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
