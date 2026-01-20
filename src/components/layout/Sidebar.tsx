import { useState } from "react";
import { 
  LayoutDashboard, 
  FileWarning, 
  HeadphonesIcon, 
  Calendar, 
  Bell, 
  Users, 
  User,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import LogoutModal from "@/components/modals/LogoutModal";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "complaints", label: "Complaints", icon: FileWarning },
  { id: "helpdesk", label: "Helpdesk", icon: HeadphonesIcon },
  { id: "events", label: "Events", icon: Calendar },
  { id: "notices", label: "Notices", icon: Bell },
  { id: "students", label: "Students", icon: Users },
];

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <aside 
        className={`fixed left-0 top-0 h-screen flex flex-col transition-all duration-300 z-50 ${
          isCollapsed ? "w-[70px]" : "w-[250px]"
        }`}
        style={{ 
          backgroundColor: "#2B1E14",
          borderRight: "1px solid #4B2E1A"
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b" style={{ borderColor: "#4B2E1A" }}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#1D4ED8" }}
              >
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-lg font-semibold" style={{ color: "#FFF7ED" }}>Faculty Panel</span>
            </div>
          )}
          {isCollapsed && (
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto"
              style={{ backgroundColor: "#1D4ED8" }}
            >
              <span className="text-white font-bold text-lg">F</span>
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
          style={{ 
            backgroundColor: "#4B2E1A",
            color: "#FFF7ED"
          }}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                style={{
                  backgroundColor: isActive ? "#1D4ED8" : "transparent",
                  color: isActive ? "#FFFFFF" : "#FFF7ED",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#3A2618";
                    e.currentTarget.style.color = "#BFDBFE";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#FFF7ED";
                  }
                }}
              >
                <Icon 
                  className="w-5 h-5 flex-shrink-0" 
                  style={{ color: isActive ? "#FFFFFF" : "#93C5FD" }}
                />
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 space-y-1 border-t" style={{ borderColor: "#4B2E1A" }}>
          <button
            onClick={() => onTabChange("profile")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
              isCollapsed ? "justify-center" : ""
            }`}
            style={{
              backgroundColor: activeTab === "profile" ? "#1D4ED8" : "transparent",
              color: activeTab === "profile" ? "#FFFFFF" : "#FFF7ED",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== "profile") {
                e.currentTarget.style.backgroundColor = "#3A2618";
                e.currentTarget.style.color = "#BFDBFE";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== "profile") {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#FFF7ED";
              }
            }}
          >
            <User 
              className="w-5 h-5 flex-shrink-0" 
              style={{ color: activeTab === "profile" ? "#FFFFFF" : "#93C5FD" }}
            />
            {!isCollapsed && <span className="font-medium text-sm">Profile</span>}
          </button>

          <button
            onClick={() => setShowLogoutModal(true)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
              isCollapsed ? "justify-center" : ""
            }`}
            style={{ color: "#FFF7ED" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#3A2618";
              e.currentTarget.style.color = "#BFDBFE";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#FFF7ED";
            }}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" style={{ color: "#93C5FD" }} />
            {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
      />
    </>
  );
};

export default Sidebar;
