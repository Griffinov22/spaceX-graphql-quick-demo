import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import LaunchList from "./components/LaunchList";
import { BrowserRouter, Route, Routes } from "react-router";
import LaunchProfile from "./components/LaunchProfile";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route
            index
            element={<LaunchList />}
          />
          <Route
            path="launches/:launchId"
            element={<LaunchProfile />}
          />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
