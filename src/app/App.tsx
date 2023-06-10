import { routes } from "@/common/routes.tsx";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import BasicTable from "@/features/packs/TableMUI.tsx";

export function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}
