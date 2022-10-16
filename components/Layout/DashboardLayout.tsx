import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Content from "./Content/Content";
import BottomNavigator from "./BottomNavigator/BottomNavigator";
import Main from "./Main/Main";
import Config from "../../config";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): JSX.Element {
  const {useSidebar, useNavbar, useFooter, useBottomNavigator} =
    Config.LAYOUT_CONFIG;
  return (
    <div className="wrapper">
      {useSidebar && <Sidebar />}
      <Main>
        {useNavbar && <Navbar />}
        <Content>
          {children}
          {useBottomNavigator && <BottomNavigator />}
          {useFooter && <Footer />}
        </Content>
      </Main>
    </div>
  );
}
