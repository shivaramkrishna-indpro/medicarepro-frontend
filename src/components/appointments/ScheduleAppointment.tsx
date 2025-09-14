import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, CalendarPlus, Loader2, User, Calendar, Clock } from 'lucide-react';

interface ScheduleAppointmentProps {
  onPageChange: (page: string) => void;
}

export const ScheduleAppointment: React.FC<ScheduleAppointmentProps> = ({ onPageChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: '',
    duration: '30',
    notes: '',
    priority: 'normal'
  });

  // Mock data for dropdowns
  const patients = [
    { id: '1', name: 'Sarah Johnson', phone: '(555) 123-4567' },
    { id: '2', name: 'Michael Chen', phone: '(555) 234-5678' },
    { id: '3', name: 'Emily Davis', phone: '(555) 345-6789' },
    { id: '4', name: 'James Wilson', phone: '(555) 456-7890' },
    { id: '5', name: 'Lisa Anderson', phone: '(555) 567-8901' }
  ];

  const doctors = [
    { id: '1', name: 'Dr. Smith', specialty: 'General Practice' },
    { id: '2', name: 'Dr. Rodriguez', specialty: 'Cardiology' },
    { id: '3', name: 'Dr. Johnson', specialty: 'Orthopedics' },
    { id: '4', name: 'Dr. Williams', specialty: 'Dermatology' },
    { id: '5', name: 'Dr. Brown', specialty: 'Pediatrics' }
  ];

  const appointmentTypes = [
    'Regular Checkup',
    'Follow-up',
    'Consultation',
    'Treatment',
    'Emergency',
    'Preventive Care',
    'Diagnostic'
  ];

  const timeSlots = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const selectedPatient = patients.find(p => p.id === formData.patientId);
      const selectedDoctor = doctors.find(d => d.id === formData.doctorId);
      
      toast({
        title: "Appointment Scheduled Successfully",
        description: `Appointment scheduled for ${selectedPatient?.name} with ${selectedDoctor?.name} on ${formData.appointmentDate} at ${formData.appointmentTime}.`,
      });
      setIsLoading(false);
      onPageChange('appointments');
    }, 2000);
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => onPageChange('appointments')}
          className="hover:shadow-medical transition-medical"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Appointments
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule New Appointment</h1>
          <p className="text-muted-foreground">Book a new appointment for a patient</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient and Doctor Selection */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Patient and Doctor</span>
            </CardTitle>
            <CardDescription>Select the patient and doctor for this appointment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient *</Label>
                <select
                  id="patientId"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring transition-medical"
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.phone}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctorId">Doctor *</Label>
                <select
                  id="doctorId"
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring transition-medical"
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date and Time */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Date and Time</span>
            </CardTitle>
            <CardDescription>Select the appointment date and time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointmentDate">Appointment Date *</Label>
                <Input
                  id="appointmentDate"
                  name="appointmentDate"
                  type="date"
                  min={today}
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointmentTime">Appointment Time *</Label>
                <select
                  id="appointmentTime"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring transition-medical"
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes) *</Label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring transition-medical"
                  required
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring transition-medical"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Appointment Details</span>
            </CardTitle>
            <CardDescription>Additional information about the appointment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appointmentType">Appointment Type *</Label>
              <select
                id="appointmentType"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring transition-medical"
                required
              >
                <option value="">Select appointment type</option>
                {appointmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Additional notes or special instructions for the appointment..."
                className="min-h-[100px] transition-medical focus:shadow-medical"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onPageChange('appointments')}
            className="hover:shadow-medical transition-medical"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-primary hover:shadow-medical transition-medical"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Schedule Appointment
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};