import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      {/* Header / Navbar */}
      {/* <Header /> */}

      <main>
        <Outlet />
      </main>

      {/* Optional global footer */}
    </>
  );
}
