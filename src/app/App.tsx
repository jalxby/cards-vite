import { routes } from "@/common/routes.tsx";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";

export function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}
