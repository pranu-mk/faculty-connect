import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const handleLogout = () => {
    // In a real app, this would destroy the session and redirect
    console.log("Logging out...");
    onClose();
    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="glass-card border-border/50 modal-enter">
        <AlertDialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center mb-2">
            <LogOut className="w-6 h-6 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center text-foreground">
            Confirm Logout
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground">
            Are you sure you want to log out of the Faculty Panel? 
            You will need to sign in again to access your dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-3">
          <AlertDialogCancel className="bg-secondary border-border/50 text-foreground hover:bg-secondary/80">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleLogout}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
