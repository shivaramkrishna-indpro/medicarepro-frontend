import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Calendar,
  Clock,
  User,
  Phone,
  CalendarPlus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface AppointmentListProps {
  onPageChange: (page: string) => void;
  userRole: 'admin' | 'doctor' | 'receptionist';
}

export const AppointmentList: React.FC<AppointmentListProps> = ({ onPageChange, userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  // Mock appointment data
  const appointments = [
    {
      id: 1,
      patientName: 'Sarah Johnson',
      doctorName: 'Dr. Smith',
      date: '2024-01-25',
      time: '09:00 AM',
      type: 'Regular Checkup',
      status: 'confirmed',
      duration: '30 minutes',
      notes: 'Annual physical examination',
      patientPhone: '(555) 123-4567'
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      doctorName: 'Dr. Rodriguez',
      date: '2024-01-25',
      time: '10:30 AM',
      type: 'Follow-up',
      status: 'pending',
      duration: '15 minutes',
      notes: 'Post-surgery follow-up',
      patientPhone: '(555) 234-5678'
    },
    {
      id: 3,
      patientName: 'Emily Davis',
      doctorName: 'Dr. Smith',
      date: '2024-01-25',
      time: '02:00 PM',
      type: 'Consultation',
      status: 'confirmed',
      duration: '45 minutes',
      notes: 'Initial consultation for back pain',
      patientPhone: '(555) 345-6789'
    },
    {
      id: 4,
      patientName: 'James Wilson',
      doctorName: 'Dr. Johnson',
      date: '2024-01-26',
      time: '03:30 PM',
      type: 'Treatment',
      status: 'confirmed',
      duration: '60 minutes',
      notes: 'Physical therapy session',
      patientPhone: '(555) 456-7890'
    },
    {
      id: 5,
      patientName: 'Lisa Anderson',
      doctorName: 'Dr. Rodriguez',
      date: '2024-01-26',
      time: '11:00 AM',
      type: 'Emergency',
      status: 'cancelled',
      duration: '30 minutes',
      notes: 'Patient cancelled due to recovery',
      patientPhone: '(555) 567-8901'
    }
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const today = new Date().toISOString().split('T')[0];
    const appointmentDate = appointment.date;
    const matchesDate = filterDate === 'all' || 
                       (filterDate === 'today' && appointmentDate === today) ||
                       (filterDate === 'upcoming' && appointmentDate >= today);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: 'bg-secondary text-secondary-foreground',
      pending: 'bg-warning text-warning-foreground',
      cancelled: 'bg-destructive text-destructive-foreground',
      completed: 'bg-muted text-muted-foreground'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Regular Checkup': 'text-primary',
      'Follow-up': 'text-secondary',
      'Consultation': 'text-accent-foreground',
      'Treatment': 'text-warning',
      'Emergency': 'text-destructive'
    };
    return colors[type as keyof typeof colors] || 'text-foreground';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointment Management</h1>
          <p className="text-muted-foreground">
            View and manage all scheduled appointments
          </p>
        </div>
        {(userRole === 'admin' || userRole === 'receptionist') && (
          <Button 
            onClick={() => onPageChange('schedule-appointment')}
            className="bg-gradient-primary hover:shadow-medical transition-medical"
          >
            <CalendarPlus className="w-4 h-4 mr-2" />
            Schedule Appointment
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by patient, doctor, or appointment type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-medical focus:shadow-medical"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring transition-medical"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring transition-medical"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <Button variant="outline" className="hover:shadow-medical transition-medical">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment List */}
      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="bg-gradient-card shadow-card hover:shadow-elevated transition-medical">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{appointment.patientName}</h3>
                      <p className="text-sm text-muted-foreground">
                        with {appointment.doctorName}
                      </p>
                    </div>
                    <Badge className={getStatusBadge(appointment.status)}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        {appointment.time} ({appointment.duration})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{appointment.patientPhone}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <span className={`text-sm font-medium ${getTypeColor(appointment.type)}`}>
                        {appointment.type}
                      </span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Notes: </span>
                      <span className="text-foreground">{appointment.notes}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-row lg:flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 lg:flex-none hover:shadow-medical transition-medical"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {(userRole === 'admin' || userRole === 'receptionist') && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 lg:flex-none hover:shadow-medical transition-medical"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 lg:flex-none text-destructive hover:bg-destructive/10 hover:shadow-medical transition-medical"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-12 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No appointments found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search criteria' : 'No appointments have been scheduled yet.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};