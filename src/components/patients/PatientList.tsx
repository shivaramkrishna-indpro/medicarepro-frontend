import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Phone, 
  Mail, 
  Calendar,
  MapPin,
  UserPlus
} from 'lucide-react';

interface PatientListProps {
  onPageChange: (page: string, patientId?: number) => void;
  userRole: 'admin' | 'doctor' | 'receptionist';
}

export const PatientList: React.FC<PatientListProps> = ({ onPageChange, userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('all');

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 34,
      gender: 'Female',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      address: '123 Main St, City, State',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-01-25',
      status: 'Active',
      medicalConditions: ['Diabetes', 'Hypertension']
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 28,
      gender: 'Male',
      email: 'michael.chen@email.com',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, City, State',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-01-30',
      status: 'Active',
      medicalConditions: ['Asthma']
    },
    {
      id: 3,
      name: 'Emily Davis',
      age: 45,
      gender: 'Female',
      email: 'emily.davis@email.com',
      phone: '(555) 345-6789',
      address: '789 Pine St, City, State',
      lastVisit: '2024-01-08',
      nextAppointment: null,
      status: 'Inactive',
      medicalConditions: ['Arthritis']
    },
    {
      id: 4,
      name: 'James Wilson',
      age: 52,
      gender: 'Male',
      email: 'james.wilson@email.com',
      phone: '(555) 456-7890',
      address: '321 Elm Dr, City, State',
      lastVisit: '2024-01-12',
      nextAppointment: '2024-01-28',
      status: 'Active',
      medicalConditions: ['Heart Disease', 'Diabetes']
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      age: 39,
      gender: 'Female',
      email: 'lisa.anderson@email.com',
      phone: '(555) 567-8901',
      address: '654 Maple Ln, City, State',
      lastVisit: '2024-01-14',
      nextAppointment: '2024-02-01',
      status: 'Active',
      medicalConditions: ['Migraines']
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesGender = filterGender === 'all' || patient.gender.toLowerCase() === filterGender;
    return matchesSearch && matchesGender;
  });

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? 'bg-secondary text-secondary-foreground' 
      : 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Management</h1>
          <p className="text-muted-foreground">
            Manage and view all patient records
          </p>
        </div>
        {(userRole === 'admin' || userRole === 'receptionist') && (
          <Button 
            onClick={() => onPageChange('add-patient')}
            className="bg-gradient-primary hover:shadow-medical transition-medical"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add New Patient
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-medical focus:shadow-medical"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring transition-medical"
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <Button variant="outline" className="hover:shadow-medical transition-medical">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="bg-gradient-card shadow-card hover:shadow-elevated transition-medical">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} years old • {patient.gender}
                      </p>
                    </div>
                    <Badge className={getStatusBadge(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{patient.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{patient.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{patient.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {patient.medicalConditions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {patient.medicalConditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {patient.nextAppointment && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Next appointment: </span>
                      <span className="text-primary font-medium">
                        {new Date(patient.nextAppointment).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-row lg:flex-col gap-2">
                  <Button
                    onClick={() => onPageChange('patient-profile', patient.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1 lg:flex-none hover:shadow-medical transition-medical"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                  {(userRole === 'admin' || userRole === 'receptionist') && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 lg:flex-none hover:shadow-medical transition-medical"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No patients found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search criteria' : 'No patients have been added yet.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};