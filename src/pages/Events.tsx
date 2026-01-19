import { useState } from "react";
import { Calendar, MapPin, User, Clock, Check, X, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  coordinator: string;
  department: string;
  status: "Pending Approval" | "Approved" | "Rejected" | "Completed";
  attendees: number;
}

const events: Event[] = [
  { id: "EVT-001", title: "Technical Symposium 2024", date: "2024-01-25", time: "09:00 AM", venue: "Main Auditorium", coordinator: "Dr. Priya Sharma", department: "Computer Science", status: "Pending Approval", attendees: 250 },
  { id: "EVT-002", title: "Guest Lecture: AI in Healthcare", date: "2024-01-22", time: "02:00 PM", venue: "Seminar Hall A", coordinator: "Prof. Amit Kumar", department: "IT", status: "Approved", attendees: 80 },
  { id: "EVT-003", title: "Workshop: Cloud Computing", date: "2024-01-20", time: "10:00 AM", venue: "Lab 204", coordinator: "Dr. Sneha Gupta", department: "Computer Science", status: "Completed", attendees: 45 },
  { id: "EVT-004", title: "Cultural Fest Planning", date: "2024-02-01", time: "11:00 AM", venue: "Conference Room", coordinator: "Prof. Rahul Singh", department: "Student Affairs", status: "Pending Approval", attendees: 20 },
  { id: "EVT-005", title: "Industry Connect Session", date: "2024-01-28", time: "03:00 PM", venue: "Virtual", coordinator: "Dr. Meera Joshi", department: "Placement Cell", status: "Approved", attendees: 150 },
];

const statusStyles = {
  "Pending Approval": "bg-warning/20 text-warning border-warning/30",
  Approved: "bg-success/20 text-success border-success/30",
  Rejected: "bg-destructive/20 text-destructive border-destructive/30",
  Completed: "bg-muted/50 text-muted-foreground border-muted",
};

const Events = () => {
  const { toast } = useToast();
  const [eventList, setEventList] = useState(events);

  const handleApprove = (eventId: string) => {
    setEventList(prev => prev.map(evt => 
      evt.id === eventId ? { ...evt, status: "Approved" as const } : evt
    ));
    toast({
      title: "Event Approved",
      description: "The event has been approved successfully.",
    });
  };

  const handleReject = (eventId: string) => {
    setEventList(prev => prev.map(evt => 
      evt.id === eventId ? { ...evt, status: "Rejected" as const } : evt
    ));
    toast({
      title: "Event Rejected",
      description: "The event has been rejected.",
      variant: "destructive",
    });
  };

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Event Management</h1>
          <p className="text-muted-foreground mt-1">Manage and approve college events</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Pending Approval", count: eventList.filter(e => e.status === "Pending Approval").length, color: "text-warning" },
          { label: "Approved", count: eventList.filter(e => e.status === "Approved").length, color: "text-success" },
          { label: "Completed", count: eventList.filter(e => e.status === "Completed").length, color: "text-muted-foreground" },
          { label: "This Month", count: eventList.length, color: "text-primary" },
        ].map((stat, index) => (
          <div key={index} className="glass-card p-4 text-center">
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.count}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {eventList.map((event, index) => (
          <div 
            key={event.id}
            className="glass-card-hover p-6 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                  <Badge variant="outline" className={statusStyles[event.status]}>
                    {event.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3 text-sm">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Coordinator:</span>
                  <span className="text-foreground">{event.coordinator}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{event.department}</span>
                </div>
              </div>
              
              {event.status === "Pending Approval" && (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-success hover:bg-success/90"
                    onClick={() => handleApprove(event.id)}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="border border-destructive/50 text-destructive hover:bg-destructive/20"
                    onClick={() => handleReject(event.id)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
