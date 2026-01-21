import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopHeader from "@/components/layout/TopHeader";
import Dashboard from "@/pages/Dashboard";
import Complaints from "@/pages/Complaints";
import Helpdesk from "@/pages/Helpdesk";
import Events from "@/pages/Events";
import Notices from "@/pages/Notices";
import Students from "@/pages/Students";
import Profile from "@/pages/Profile";

export type Theme = "dark" | "light" | "fancy";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [theme, setTheme] = useState<Theme>("dark");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard theme={theme} />;
      case "complaints":
        return <Complaints theme={theme} />;
      case "helpdesk":
        return <Helpdesk theme={theme} />;
      case "events":
        return <Events theme={theme} />;
      case "notices":
        return <Notices theme={theme} />;
      case "students":
        return <Students theme={theme} />;
      case "profile":
        return <Profile theme={theme} />;
      default:
        return <Dashboard theme={theme} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        theme={theme}
      />
      <div className="flex-1 ml-[250px] transition-all duration-300" style={{ marginLeft: "250px" }}>
        <TopHeader theme={theme} onThemeChange={setTheme} />
        <main className="p-6 bg-white min-h-[calc(100vh-64px)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;