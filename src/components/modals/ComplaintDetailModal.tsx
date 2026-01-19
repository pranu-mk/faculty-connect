import { useState } from "react";
import { X, User, Building, Mail, Phone, FileText, Image, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Complaint {
  id: string;
  studentName: string;
  department: string;
  type: string;
  priority: "Low" | "Medium" | "High";
  date: string;
  status: "Pending" | "In Progress" | "Resolved" | "Rejected";
}

interface ComplaintDetailModalProps {
  complaint: Complaint | null;
  isOpen: boolean;
  onClose: () => void;
}

const ComplaintDetailModal = ({ complaint, isOpen, onClose }: ComplaintDetailModalProps) => {
  const [status, setStatus] = useState<string>(complaint?.status || "Pending");
  const [facultyResponse, setFacultyResponse] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const { toast } = useToast();

  if (!complaint) return null;

  const handleSubmit = () => {
    toast({
      title: "Response Submitted",
      description: `Complaint ${complaint.id} has been updated successfully.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/50 max-w-5xl max-h-[90vh] overflow-hidden p-0 modal-enter">
        <DialogHeader className="p-6 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-xl font-bold text-foreground">
                Complaint {complaint.id}
              </DialogTitle>
              <Badge variant="outline" className={
                complaint.priority === "High" ? "badge-priority-high" :
                complaint.priority === "Medium" ? "badge-priority-medium" : "badge-priority-low"
              }>
                {complaint.priority} Priority
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 max-h-[calc(90vh-120px)] overflow-auto">
          {/* Left Panel - Student Info */}
          <div className="p-6 border-r border-border/30 space-y-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Student Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-medium text-foreground">{complaint.studentName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/20">
                  <Building className="w-4 h-4 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium text-foreground">{complaint.department}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/20">
                  <Mail className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">student@college.edu</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/20">
                  <Phone className="w-4 h-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium text-foreground">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Complaint Details */}
          <div className="p-6 border-r border-border/30 space-y-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Complaint Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Type</p>
                <p className="font-medium text-foreground">{complaint.type}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date Submitted</p>
                <p className="font-medium text-foreground">{complaint.date}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <div className="p-4 rounded-lg bg-secondary/50 text-sm text-foreground/90 leading-relaxed">
                  The lab equipment in Room 204 has been malfunctioning for the past week. 
                  The oscilloscope displays incorrect readings and the function generator 
                  produces distorted waveforms. This is affecting our practical sessions 
                  and project work significantly.
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Attachments</p>
                <div className="flex gap-2">
                  <div className="p-3 rounded-lg bg-secondary/50 flex items-center gap-2 hover:bg-secondary/70 transition-colors cursor-pointer">
                    <Image className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">photo1.jpg</span>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 flex items-center gap-2 hover:bg-secondary/70 transition-colors cursor-pointer">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">report.pdf</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Actions */}
          <div className="p-6 space-y-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Action Panel
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Update Status</p>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-secondary/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-border/50">
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Faculty Response</p>
                <Textarea
                  placeholder="Enter your response to the student..."
                  value={facultyResponse}
                  onChange={(e) => setFacultyResponse(e.target.value)}
                  className="bg-secondary/50 border-border/50 min-h-[100px] resize-none"
                />
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Internal Note (Faculty/Admin only)</p>
                <Textarea
                  placeholder="Add internal notes..."
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  className="bg-secondary/50 border-border/50 min-h-[80px] resize-none"
                />
              </div>
              
              {status === "Resolved" && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Resolution Comment (Required)</p>
                  <Textarea
                    placeholder="Describe how the issue was resolved..."
                    className="bg-secondary/50 border-border/50 min-h-[80px] resize-none"
                  />
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="ghost" 
                  className="flex-1 border border-border/50"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleSubmit}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComplaintDetailModal;
