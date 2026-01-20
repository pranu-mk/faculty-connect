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

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [theme, setTheme] = useState<"dark" | "light" | "fancy">("dark");
  const [sidebarWidth, setSidebarWidth] = useState(250);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard theme={theme} />;
      case "complaints":
        return <Complaints />;
      case "helpdesk":
        return <Helpdesk />;
      case "events":
        return <Events />;
      case "notices":
        return <Notices />;
      case "students":
        return <Students />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard theme={theme} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
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
