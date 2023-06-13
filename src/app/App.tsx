import { routes } from "@/routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
import { ButtonStylesParams, MantineProvider } from "@mantine/core";

export function App() {
  return (
    <div className="App">
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          components: {
            Button: {
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
          fontFamily: "Montserrat",
        }}
      >
        <RouterProvider router={routes} />
      </MantineProvider>
    </div>
  );
}
