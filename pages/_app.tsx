import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {QueryClient, QueryClientProvider} from "react-query";
import store, {persistor} from "../redux/store";
import Routes from "../routes";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
import "../styles/_app.scss";
import {AppProps} from "next/app";
import validatorOptions from "../utils/validation";
import {ValidatorProvider} from "../utils/class-validator";
import Config from "../config";
import {ModalPortal} from "@app/utils/hooks/modal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: Config.NETWORK_CONFIG.RETRY,
      refetchOnWindowFocus: false,
    },
  },
});

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element {
  if (typeof window !== "undefined") {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ValidatorProvider options={validatorOptions}>
              <Routes
                Component={Component}
                pageProps={pageProps}
                router={router}
              />
              <ModalPortal />
            </ValidatorProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ValidatorProvider options={validatorOptions}>
          <Routes Component={Component} pageProps={pageProps} router={router} />
        </ValidatorProvider>
      </QueryClientProvider>
    </Provider>
  );
}
