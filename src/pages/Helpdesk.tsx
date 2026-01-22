import { useState } from "react";
import { Plus, Search, MessageSquare, Clock, Send } from "lucide-react";
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
import type { Theme } from "@/pages/Index";

interface Reply {
  id: string;
  sender: "faculty" | "admin";
  message: string;
  time: string;
}

interface Ticket {
  id: string;
  issueType: string;
  subject: string;
  createdDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  lastReply: string;
  replies: Reply[];
}

interface HelpdeskProps {
  theme?: Theme;
}

const initialTickets: Ticket[] = [
  { 
    id: "TKT-001", 
    issueType: "Technical", 
    subject: "Unable to access faculty portal", 
    createdDate: "2024-01-15", 
    priority: "High", 
    status: "Open", 
    lastReply: "2 hours ago",
    replies: [
      { id: "1", sender: "faculty", message: "I cannot log into the faculty portal. It shows an error message.", time: "Jan 15, 2024 9:00 AM" },
      { id: "2", sender: "admin", message: "We are investigating the issue. Can you please share a screenshot?", time: "Jan 15, 2024 10:30 AM" },
    ]
  },
  { 
    id: "TKT-002", 
    issueType: "Administrative", 
    subject: "Leave application not reflecting", 
    createdDate: "2024-01-14", 
    priority: "Medium", 
    status: "In Progress", 
    lastReply: "1 day ago",
    replies: [
      { id: "1", sender: "faculty", message: "My leave application submitted last week is not showing in the system.", time: "Jan 14, 2024 11:00 AM" },
    ]
  },
  { 
    id: "TKT-003", 
    issueType: "Technical", 
    subject: "Email sync issues", 
    createdDate: "2024-01-13", 
    priority: "Low", 
    status: "Resolved", 
    lastReply: "2 days ago",
    replies: []
  },
  { 
    id: "TKT-004", 
    issueType: "Resource", 
    subject: "Projector not working in Room 301", 
    createdDate: "2024-01-12", 
    priority: "Medium", 
    status: "In Progress", 
    lastReply: "3 days ago",
    replies: []
  },
  { 
    id: "TKT-005", 
    issueType: "Administrative", 
    subject: "Salary slip discrepancy", 
    createdDate: "2024-01-10", 
    priority: "High", 
    status: "Closed", 
    lastReply: "5 days ago",
    replies: []
  },
];

// Softer badge colors
const statusColors = {
  Open: { bg: "#FFFBEB", text: "#D97706", border: "#FCD34D" },
  "In Progress": { bg: "#EFF6FF", text: "#2563EB", border: "#93C5FD" },
  Resolved: { bg: "#ECFDF5", text: "#059669", border: "#6EE7B7" },
  Closed: { bg: "#F3F4F6", text: "#6B7280", border: "#D1D5DB" },
};

const priorityColors = {
  Low: { bg: "#ECFDF5", text: "#059669", border: "#6EE7B7" },
  Medium: { bg: "#FFFBEB", text: "#D97706", border: "#FCD34D" },
  High: { bg: "#FEF2F2", text: "#DC2626", border: "#FCA5A5" },
};

const Helpdesk = ({ theme = "dark" }: HelpdeskProps) => {
  const [tickets, setTickets] = useState(initialTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [replyTicket, setReplyTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const { toast } = useToast();

  const handleCreateTicket = () => {
    toast({
      title: "Ticket Created",
      description: "Your support ticket has been submitted successfully.",
    });
    setIsNewTicketOpen(false);
  };

  const handleSendReply = () => {
    if (!replyMessage.trim() || !replyTicket) return;
    
    const newReply: Reply = {
      id: Date.now().toString(),
      sender: "faculty",
      message: replyMessage,
      time: new Date().toLocaleString(),
    };
    
    setTickets(prev => 
      prev.map(t => 
        t.id === replyTicket.id 
          ? { ...t, replies: [...t.replies, newReply], lastReply: "Just now" } 
          : t
      )
    );
    
    toast({
      title: "Reply Sent",
      description: "Your reply has been submitted successfully.",
    });
    
    setReplyMessage("");
    setReplyTicket(null);
  };

  const filteredTickets = tickets.filter(t => 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Helpdesk Tickets</h1>
          <p className="text-gray-500 mt-1">Faculty technical and administrative support</p>
        </div>
        <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-gray-800">Create Support Ticket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Issue Type</label>
                <Select>
                  <SelectTrigger className="bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                    <SelectItem value="resource">Resource</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Priority</label>
                <Select>
                  <SelectTrigger className="bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Subject</label>
                <Input placeholder="Brief description of the issue" className="bg-gray-50 border-gray-200" />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Description</label>
                <Textarea 
                  placeholder="Provide detailed information about your issue..."
                  className="bg-gray-50 border-gray-200 min-h-[120px] resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 border-gray-200" onClick={() => setIsNewTicketOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreateTicket}>
                  Submit Ticket
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket, index) => (
          <div 
            key={ticket.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:border-blue-300 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-blue-600">{ticket.id}</span>
                  <Badge 
                    variant="outline" 
                    style={{
                      backgroundColor: priorityColors[ticket.priority].bg,
                      color: priorityColors[ticket.priority].text,
                      borderColor: priorityColors[ticket.priority].border,
                    }}
                  >
                    {ticket.priority}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    style={{
                      backgroundColor: statusColors[ticket.status].bg,
                      color: statusColors[ticket.status].text,
                      borderColor: statusColors[ticket.status].border,
                    }}
                  >
                    {ticket.status}
                  </Badge>
                </div>
                <h3 className="font-medium text-gray-800 mb-1">{ticket.subject}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="px-2 py-0.5 rounded bg-gray-100">{ticket.issueType}</span>
                  <span>Created: {ticket.createdDate}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {ticket.lastReply}
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50/50"
                  onClick={() => setReplyTicket(ticket)}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      <Dialog open={!!replyTicket} onOpenChange={() => setReplyTicket(null)}>
        <DialogContent className="bg-white border-gray-200 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-800">
              Reply to {replyTicket?.id}: {replyTicket?.subject}
            </DialogTitle>
          </DialogHeader>
          {replyTicket && (
            <div className="space-y-4 pt-4">
              {/* Existing Replies */}
              <div className="max-h-60 overflow-y-auto space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
                {replyTicket.replies.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">No previous replies</p>
                ) : (
                  replyTicket.replies.map((reply) => (
                    <div 
                      key={reply.id} 
                      className={`p-3 rounded-lg ${
                        reply.sender === "faculty" ? "bg-blue-50 ml-8" : "bg-gray-100 mr-8"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium ${
                          reply.sender === "faculty" ? "text-blue-600" : "text-gray-600"
                        }`}>
                          {reply.sender === "faculty" ? "You" : "Admin"}
                        </span>
                        <span className="text-xs text-gray-400">{reply.time}</span>
                      </div>
                      <p className="text-sm text-gray-700">{reply.message}</p>
                    </div>
                  ))
                )}
              </div>
              
              {/* New Reply */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Your Reply</label>
                <Textarea 
                  placeholder="Type your reply here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="bg-gray-50 border-gray-200 min-h-[100px] resize-none"
                />
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-200"
                  onClick={() => setReplyTicket(null)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleSendReply}
                  disabled={!replyMessage.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Helpdesk;
