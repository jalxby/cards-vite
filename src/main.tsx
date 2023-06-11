import { ButtonStylesParams, MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./app/App.tsx";
import { store } from "./app/store.ts";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        components: {
          Button: {
            // Subscribe to theme and component params
            styles: (theme, params: ButtonStylesParams, { variant }) => ({
              root: {
                boxShadow:
                  "0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 0.5px 0px rgba(255, 255, 255, 0.3)",
                borderRadius: "30px",
              },
            }),
          },
        },
        colors: {
          theme: [
            "#D6DDEE",
            "#B4C2E7",
            "#8FA8E7",
            "#668CEE",
            "#366EFF",
            "#2E62E8",
            "#2D5ACD",
            "#3757AA",
            "#3C538F",
            "#3D4E79",
          ],
        },
        primaryShade: 4,
        primaryColor: "theme",
        // components: {
        //   Button: {
        //     // Subscribe to theme and component params
        //     styles: (theme, params: ButtonStylesParams, { variant }) => ({
        //       root: {
        //         backgroundColor: variant === "filled" ? "#366EFF" : undefined,
        //       },
        //     }),
        //   },
        // },
        fontFamily: "Montserrat",
      }}
    >
      <App />
    </MantineProvider>
  </Provider>
);
