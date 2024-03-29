import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Loader from "../components/Loader";
import Login from "../components/Login";
import { Provider } from "react-redux";
import store from "../store/store";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />;

  if (!user) return <Login />;

  return (
    <Provider store={store}>
      <Component {...pageProps} />

      <Toaster position="bottom-center" />
    </Provider>
  );
}

export default MyApp;
