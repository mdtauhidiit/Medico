import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Router from "../routes/Router";

const Layout = () => {
  return (
    <>
     

      <div className=" h-full w-full bg-slate-900">
        <div className=" bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">
        <Header />
          <main>
            <Router />
          </main>
          <Footer />
        </div>
      </div>

      
    </>
  );
};

export default Layout;
