import "./index.css";

import { ApolloProvider } from "@apollo/client/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { client } from "./graphql/apolloClient.ts";
import { ToastProvider } from "./providers/toast/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  </ApolloProvider>,
);
