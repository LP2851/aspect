import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/apolloClient.ts";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./auth/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ApolloProvider>,
);
