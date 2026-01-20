import { useState, useRef } from "react";
import { User, Building, Mail, Phone, BadgeCheck, Camera, Lock, Save, Upload } from "lucide-react";
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
  fullName: string;
  officeMail: string;
  mobileNumber: string;
  facultyId: string;
  department: string;
  designation: string;
  username: string;
  photo: string;
}

const Profile = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<FacultyProfile>({
    fullName: "Dr. Rajesh Kumar",
    officeMail: "rajesh.kumar@college.edu",
    mobileNumber: "+91 98765 43210",
    facultyId: "FAC-2018-001",
    department: "Computer Science",
    designation: "Associate Professor",
    username: "rajesh.kumar",
    photo: "",
  });
  
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({ ...profile, photo: event.target?.result as string });
        toast({
          title: "Photo Uploaded",
          description: "Your profile photo has been updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }
    if (passwords.new.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    setPasswords({ current: "", new: "", confirm: "" });
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
  };

  return (
    <div className="page-enter max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Faculty Profile</h1>
        <p className="text-gray-500 mt-1">Manage your profile information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-purple-200">
                <AvatarImage src={profile.photo} />
                <AvatarFallback className="bg-purple-100 text-purple-600 text-3xl font-bold">
                  {profile.fullName.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-purple-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => fileInputRef.current?.click()}
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-500">Verified Faculty</span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <Input 
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    className="bg-gray-50 border-gray-200"
                  />
                ) : (
                  <p className="text-lg font-medium text-gray-800">{profile.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" />
                  Faculty ID
                </label>
                <p className="text-lg font-mono text-purple-600">{profile.facultyId}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Office Mail
                </label>
                {isEditing ? (
                  <Input 
                    value={profile.officeMail}
                    onChange={(e) => setProfile({...profile, officeMail: e.target.value})}
                    className="bg-gray-50 border-gray-200"
                  />
                ) : (
                  <p className="text-lg font-medium text-gray-800">{profile.officeMail}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number
                </label>
                {isEditing ? (
                  <Input 
                    value={profile.mobileNumber}
                    onChange={(e) => setProfile({...profile, mobileNumber: e.target.value})}
                    className="bg-gray-50 border-gray-200"
                  />
                ) : (
                  <p className="text-lg font-medium text-gray-800">{profile.mobileNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Department
                </label>
                {isEditing ? (
                  <Input 
                    value={profile.department}
                    onChange={(e) => setProfile({...profile, department: e.target.value})}
                    className="bg-gray-50 border-gray-200"
                  />
                ) : (
                  <p className="text-lg font-medium text-gray-800">{profile.department}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500">Designation</label>
                {isEditing ? (
                  <Input 
                    value={profile.designation}
                    onChange={(e) => setProfile({...profile, designation: e.target.value})}
                    className="bg-gray-50 border-gray-200"
                  />
                ) : (
                  <p className="text-lg font-medium text-gray-800">{profile.designation}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500">Username</label>
                {isEditing ? (
                  <Input 
                    value={profile.username}
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                    className="bg-gray-50 border-gray-200"
                  />
                ) : (
                  <p className="text-lg font-medium text-gray-800">{profile.username}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-700"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleSave}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              className="border-gray-200 text-gray-700"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-gray-200 text-gray-700">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-gray-200">
              <DialogHeader>
                <DialogTitle className="text-gray-800">Change Password</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Current Password</label>
                  <Input 
                    type="password" 
                    value={passwords.current}
                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                    className="bg-gray-50 border-gray-200" 
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">New Password</label>
                  <Input 
                    type="password" 
                    value={passwords.new}
                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                    className="bg-gray-50 border-gray-200" 
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Confirm New Password</label>
                  <Input 
                    type="password" 
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                    className="bg-gray-50 border-gray-200" 
                  />
                </div>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white" 
                  onClick={handlePasswordChange}
                >
                  Update Password
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Card */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Complaints Resolved", value: 82, color: "text-green-600", bg: "bg-green-50" },
            { label: "Pending Review", value: 12, color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "Avg. Resolution Time", value: "2.5 days", color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Rating", value: "4.8/5", color: "text-purple-600", bg: "bg-purple-50" },
          ].map((stat, index) => (
            <div key={index} className={`p-4 rounded-lg ${stat.bg} text-center`}>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
