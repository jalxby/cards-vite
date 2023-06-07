// const PrivateRoutes = () => {
//     const isLogin = useAppSelector(state => state.auth.isLogin)
//
//     return isLogin ? <Outlet/> : <Navigate to={'/login'} />
// }
//
// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Layout/>,
//         children: [
//             {
//                 path: "/login",
//                 element: <Login />

//             },
//             {
//                 path: "/register",
//                 element: <Register />
//             },
//             {
//                 path: "/check-email",
//                 element: <CheckEmail />
//             },
//             {
//                 path: "/set-new-password/:token",
//                 element: <CreateNewPassword />
//             },
//             {
//                 path: "/forgot-password",
//                 element: <ForgotPassword />
//             },
//             {
//                 path: "/cards",
//                 element: <div>Card's</div>
//             },
//             {
//                 path: "/learn",
//                 element: <div>Learn</div>
//             },
//             {
//                 path: "/register",
//                 element: <Register />
//             },
//             {
//                 path: "/packs",
//                 element: <h1>Packs</h1>
//             },
//             {
//                 element: <PrivateRoutes />,
//                 children: [
//                     {
//                         path: "/profile",
//                         element: <h1>Profile <Logout/></h1>
//                     },
//                 ]
//             }
//         ]
//     },
// ]);
