import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  UserCheck, 
  TrendingUp, 
  Clock,
  MapPin,
  Phone,
  Eye,
  FileText
} from 'lucide-react';

interface DashboardProps {
  userRole: 'admin' | 'doctor' | 'receptionist';
  onPageChange: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole, onPageChange }) => {
  // Mock data
  const stats = {
    totalPatients: 1847,
    totalAppointments: 342,
    totalUsers: userRole === 'admin' ? 28 : undefined,
    todaysAppointments: 12
  };

  const todayAppointments = [
    {
      id: 1,
      time: '09:00 AM',
      patient: 'Sarah Johnson',
      doctor: 'Dr. Smith',
      type: 'Checkup',
      status: 'confirmed'
    },
    {
      id: 2,
      time: '10:30 AM',
      patient: 'Michael Chen',
      doctor: 'Dr. Rodriguez',
      type: 'Follow-up',
      status: 'pending'
    },
    {
      id: 3,
      time: '02:00 PM',
      patient: 'Emily Davis',
      doctor: 'Dr. Smith',
      type: 'Consultation',
      status: 'confirmed'
    },
    {
      id: 4,
      time: '03:30 PM',
      patient: 'James Wilson',
      doctor: 'Dr. Johnson',
      type: 'Treatment',
      status: 'confirmed'
    }
  ];

  const StatCard: React.FC<{ 
    title: string; 
    value: number; 
    icon: React.ElementType; 
    trend?: string;
    onClick?: () => void;
  }> = ({ title, value, icon: Icon, trend, onClick }) => (
    <Card 
      className={`bg-gradient-card shadow-card hover:shadow-elevated transition-medical ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value.toLocaleString()}</div>
        {trend && (
          <p className="text-xs text-secondary flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: 'bg-secondary text-secondary-foreground',
      pending: 'bg-warning text-warning-foreground',
      cancelled: 'bg-destructive text-destructive-foreground'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening in your healthcare system today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          trend="+12% from last month"
          onClick={() => onPageChange('patients')}
        />
        <StatCard
          title="Total Appointments"
          value={stats.totalAppointments}
          icon={Calendar}
          trend="+8% from last week"
          onClick={() => onPageChange('appointments')}
        />
        {stats.totalUsers && (
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={UserCheck}
            trend="+2 new this week"
          />
        )}
        <StatCard
          title="Today's Appointments"
          value={stats.todaysAppointments}
          icon={Clock}
          trend="4 confirmed, 8 pending"
        />
      </div>

      {/* Today's Appointments */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Today's Appointments</CardTitle>
              <CardDescription>
                {todayAppointments.length} appointments scheduled for today
              </CardDescription>
            </div>
            <Button 
              onClick={() => onPageChange('appointments')}
              variant="outline"
              className="hover:shadow-medical transition-medical"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-background/50 hover:shadow-card transition-medical"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">{appointment.time}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusBadge(appointment.status)}>
                    {appointment.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{appointment.type}</span>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for your role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {(userRole === 'admin' || userRole === 'receptionist') && (
              <Button 
                onClick={() => onPageChange('add-patient')}
                className="bg-gradient-primary hover:shadow-medical transition-medical"
              >
                <Users className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            )}
            {(userRole === 'admin' || userRole === 'receptionist') && (
              <Button 
                onClick={() => onPageChange('schedule-appointment')}
                variant="outline"
                className="hover:shadow-medical transition-medical"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
            )}
            <Button 
              onClick={() => onPageChange('patients')}
              variant="outline"
              className="hover:shadow-medical transition-medical"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Patients
            </Button>
            {(userRole === 'admin' || userRole === 'doctor') && (
              <Button 
                onClick={() => onPageChange('medical-records')}
                variant="outline"
                className="hover:shadow-medical transition-medical"
              >
                <FileText className="w-4 h-4 mr-2" />
                Medical Records
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};