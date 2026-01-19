import { useState } from "react";
import TopNavigation from "@/components/layout/TopNavigation";
import Dashboard from "@/pages/Dashboard";
import Complaints from "@/pages/Complaints";
import Helpdesk from "@/pages/Helpdesk";
import Events from "@/pages/Events";
import Notices from "@/pages/Notices";
import Students from "@/pages/Students";
import Profile from "@/pages/Profile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
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
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onProfileClick={() => setActiveTab("profile")}
      />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
