import { useState } from "react";
import { User, Building, Mail, Phone, BadgeCheck, Camera, Lock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface FacultyProfile {
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  email: string;
  mobile: string;
  joinDate: string;
  qualification: string;
}

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<FacultyProfile>({
    name: "Dr. Rajesh Kumar",
    employeeId: "FAC-2018-001",
    department: "Computer Science",
    designation: "Associate Professor",
    email: "rajesh.kumar@college.edu",
    mobile: "+91 98765 43210",
    joinDate: "August 2018",
    qualification: "Ph.D. in Computer Science",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handlePasswordChange = () => {
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
  };

  return (
    <div className="page-enter max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Faculty Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your profile information</p>
      </div>

      {/* Profile Card */}
      <div className="glass-card p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-primary/30">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/20 text-primary text-3xl font-bold">DR</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-success" />
              <span className="text-sm text-success">Verified Faculty</span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <Input 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="bg-secondary/50 border-border/50"
                  />
                ) : (
                  <p className="text-lg font-medium text-foreground">{profile.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" />
                  Employee ID
                </label>
                <p className="text-lg font-mono text-primary">{profile.employeeId}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Department
                </label>
                <p className="text-lg font-medium text-foreground">{profile.department}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Designation</label>
                <p className="text-lg font-medium text-foreground">{profile.designation}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                {isEditing ? (
                  <Input 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="bg-secondary/50 border-border/50"
                  />
                ) : (
                  <p className="text-lg font-medium text-foreground">{profile.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number
                </label>
                {isEditing ? (
                  <Input 
                    value={profile.mobile}
                    onChange={(e) => setProfile({...profile, mobile: e.target.value})}
                    className="bg-secondary/50 border-border/50"
                  />
                ) : (
                  <p className="text-lg font-medium text-foreground">{profile.mobile}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Join Date</label>
                <p className="text-lg font-medium text-foreground">{profile.joinDate}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Qualification</label>
                <p className="text-lg font-medium text-foreground">{profile.qualification}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border/30">
          {isEditing ? (
            <>
              <Button 
                variant="ghost" 
                className="border border-border/50"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={handleSave}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost" 
              className="border border-border/50"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="border border-border/50">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-border/50 modal-enter">
              <DialogHeader>
                <DialogTitle className="text-foreground">Change Password</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Current Password</label>
                  <Input type="password" className="bg-secondary/50 border-border/50" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">New Password</label>
                  <Input type="password" className="bg-secondary/50 border-border/50" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Confirm New Password</label>
                  <Input type="password" className="bg-secondary/50 border-border/50" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={handlePasswordChange}>
                  Update Password
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Card */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Activity Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Complaints Resolved", value: 82, color: "text-success" },
            { label: "Pending Review", value: 12, color: "text-warning" },
            { label: "Avg. Resolution Time", value: "2.5 days", color: "text-info" },
            { label: "Rating", value: "4.8/5", color: "text-primary" },
          ].map((stat, index) => (
            <div key={index} className="p-4 rounded-lg bg-secondary/30 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
