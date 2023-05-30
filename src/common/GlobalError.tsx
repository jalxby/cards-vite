import { setError } from "@/app/app.slice.ts";
import { useAppDispatch, useAppSelector } from "@/common/hooks/hooks.ts";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export const GlobalError = () => {
  const error = useAppSelector((state) => state.app.error);
  const dispatch = useAppDispatch();

  if (error !== null) {
    toast.error(error);
  }

  // Данный код необходим для того, чтобы занулять ошибку в стейте
  // после того как ошибка установилась.
  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch(setError({ error: null }));
      }, 1000);
    }
  }, [dispatch, error]);

  return (
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};
