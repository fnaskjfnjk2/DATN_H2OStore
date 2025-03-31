

const AppRoute = (isAuth, accountType) => {
  const route = [
    {
      path: "/",
      element: <LayoutUser />,
      children: [
        { index: true, element: <Main /> },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUpUser />,
        },
        {
          path: "/home",
          element: <Main />,
        },
        {
          path: "/info-user",
          element: <InfoUser />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/productDetail/:trademark/:id",
          element: <ProductDetail />,
        },
        {
          path: "/trademarkUser/:trademark",
          element: <TrademarkUser />,
        },
        {
          path: "/otherTrademark",
          element: <OtherTrademark />,
        },
        {
          path: "/order-user",
          element: <OrderUser />,
        },
      ],
    },
    isAuth && accountType === "admin"
      ? {
          path: "/admin",
          element: <LayoutWeb />,
          children: [
            { index: true, element: <User /> },
            { path: "users", element: <User /> },
            { path: "accountAdmin", element: <SignUp /> },
            { path: "product", element: <Product /> },
            { path: "order", element: <Order /> },
            { path: "statistical", element: <Statistical /> },
            { path: "discount", element: <DiscountCode /> },
          ],
        }
      : {
          path: "*",
          element: <ErrorPage />,
        },
  ];

  return createBrowserRouter(route);
};
export default AppRoute;
