import { useState } from "react";
import { Plus, Search, MessageSquare, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Ticket {
  id: string;
  issueType: string;
  subject: string;
  createdDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  lastReply: string;
}

const tickets: Ticket[] = [
  { id: "TKT-001", issueType: "Technical", subject: "Unable to access faculty portal", createdDate: "2024-01-15", priority: "High", status: "Open", lastReply: "2 hours ago" },
  { id: "TKT-002", issueType: "Administrative", subject: "Leave application not reflecting", createdDate: "2024-01-14", priority: "Medium", status: "In Progress", lastReply: "1 day ago" },
  { id: "TKT-003", issueType: "Technical", subject: "Email sync issues", createdDate: "2024-01-13", priority: "Low", status: "Resolved", lastReply: "2 days ago" },
  { id: "TKT-004", issueType: "Resource", subject: "Projector not working in Room 301", createdDate: "2024-01-12", priority: "Medium", status: "In Progress", lastReply: "3 days ago" },
  { id: "TKT-005", issueType: "Administrative", subject: "Salary slip discrepancy", createdDate: "2024-01-10", priority: "High", status: "Closed", lastReply: "5 days ago" },
];

const statusStyles = {
  Open: "badge-status-pending",
  "In Progress": "badge-status-progress",
  Resolved: "badge-status-resolved",
  Closed: "bg-muted/50 text-muted-foreground border-muted",
};

const priorityStyles = {
  Low: "badge-priority-low",
  Medium: "badge-priority-medium",
  High: "badge-priority-high",
};

const Helpdesk = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateTicket = () => {
    toast({
      title: "Ticket Created",
      description: "Your support ticket has been submitted successfully.",
    });
    setIsNewTicketOpen(false);
  };

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Helpdesk Tickets</h1>
          <p className="text-muted-foreground mt-1">Faculty technical and administrative support</p>
        </div>
        <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-border/50 modal-enter">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create Support Ticket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Issue Type</label>
                <Select>
                  <SelectTrigger className="bg-secondary/50 border-border/50">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-border/50">
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                    <SelectItem value="resource">Resource</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Priority</label>
                <Select>
                  <SelectTrigger className="bg-secondary/50 border-border/50">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-border/50">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Subject</label>
                <Input placeholder="Brief description of the issue" className="bg-secondary/50 border-border/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Description</label>
                <Textarea 
                  placeholder="Provide detailed information about your issue..."
                  className="bg-secondary/50 border-border/50 min-h-[120px] resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="ghost" className="flex-1 border border-border/50" onClick={() => setIsNewTicketOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={handleCreateTicket}>
                  Submit Ticket
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="glass-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket, index) => (
          <div 
            key={ticket.id}
            className="glass-card-hover p-5 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-primary">{ticket.id}</span>
                  <Badge variant="outline" className={priorityStyles[ticket.priority]}>
                    {ticket.priority}
                  </Badge>
                  <Badge variant="outline" className={statusStyles[ticket.status]}>
                    {ticket.status}
                  </Badge>
                </div>
                <h3 className="font-medium text-foreground mb-1">{ticket.subject}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-secondary/50">{ticket.issueType}</span>
                  </span>
                  <span>Created: {ticket.createdDate}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {ticket.lastReply}
                </div>
                <Button size="sm" variant="ghost" className="hover:bg-primary/20">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Helpdesk;
