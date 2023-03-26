import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { client } from "./utils/apolloClient";

export const App = () => {

  return (
    <div className="App h-full">
      <ApolloProvider client={client}>
      <Router>
        <AppRouter />
      </Router>
      </ApolloProvider>
    </div>
  )
}
