import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginForm } from "./components/auth/LoginForm";
import { Navigation } from "./components/layout/Navigation";
import { Dashboard } from "./components/dashboard/Dashboard";
import { PatientList } from "./components/patients/PatientList";
import { AddPatient } from "./components/patients/AddPatient";
import { AppointmentList } from "./components/appointments/AppointmentList";
import { ScheduleAppointment } from "./components/appointments/ScheduleAppointment";

const queryClient = new QueryClient();

type UserRole = 'admin' | 'doctor' | 'receptionist';
type PageType = 'dashboard' | 'patients' | 'add-patient' | 'patient-profile' | 'appointments' | 'schedule-appointment' | 'medical-records';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('doctor');
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('doctor');
    setCurrentPage('dashboard');
    setSelectedPatientId(null);
  };

  const handlePageChange = (page: string, patientId?: number) => {
    setCurrentPage(page as PageType);
    if (patientId) {
      setSelectedPatientId(patientId);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userRole={userRole} onPageChange={handlePageChange} />;
      case 'patients':
        return <PatientList userRole={userRole} onPageChange={handlePageChange} />;
      case 'add-patient':
        return <AddPatient onPageChange={handlePageChange} />;
      case 'appointments':
        return <AppointmentList userRole={userRole} onPageChange={handlePageChange} />;
      case 'schedule-appointment':
        return <ScheduleAppointment onPageChange={handlePageChange} />;
      case 'medical-records':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Medical Records</h2>
            <p className="text-muted-foreground">Medical records management coming soon...</p>
          </div>
        );
      case 'patient-profile':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Patient Profile</h2>
            <p className="text-muted-foreground">Patient profile view for ID: {selectedPatientId}</p>
          </div>
        );
      default:
        return <Dashboard userRole={userRole} onPageChange={handlePageChange} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LoginForm onLogin={handleLogin} />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navigation
            currentPage={currentPage}
            onPageChange={handlePageChange}
            userRole={userRole}
            onLogout={handleLogout}
          />
          
          {/* Main Content */}
          <main className="md:ml-72 p-4 md:p-6 pt-20 md:pt-6">
            {renderCurrentPage()}
          </main>
        </div>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;