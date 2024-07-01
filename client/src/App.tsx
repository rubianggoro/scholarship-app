import React from "react";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import CreateUserPage from "./pages/CreateUser";
import { Toaster } from "./components/ui/toaster";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="bg-white">
        <CreateUserPage />
      </div>
      <Toaster />
    </ApolloProvider>
  );
}

export default App;
