import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./routers/AppRouter";
import store from "./stores";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Provider>
  );
}

export default App;
