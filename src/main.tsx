import { MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./app/App.tsx";
import { store } from "./app/store.ts";
import "./index.css";
import BasicTable from "@/features/packs/TableMUI.tsx";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <MantineProvider
      theme={{
        globalStyles: (theme) => ({
          button: {
            borderRadius: "30px",
          },
          // body: {
          //   ...theme.fn.fontStyles(),
          //   backgroundColor:
          //     theme.colorScheme === "dark"
          //       ? theme.colors.dark[7]
          //       : theme.white,
          //   color:
          //     theme.colorScheme === "dark"
          //       ? theme.colors.dark[0]
          //       : theme.black,
          //   lineHeight: theme.lineHeight,
          // },

          ".your-class": {
            backgroundColor: "red",
          },

          "#your-id > [data-active]": {
            backgroundColor: "pink",
          },
        }),
      }}
    >
      <App />
    </MantineProvider>
  </Provider>
);
