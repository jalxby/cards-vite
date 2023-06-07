import { routes } from "@/common/routes.tsx";
import { RouterProvider } from "react-router-dom";

export function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}
