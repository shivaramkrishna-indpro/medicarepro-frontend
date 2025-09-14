import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, UserPlus, Loader2 } from 'lucide-react';

interface AddPatientProps {
  onPageChange: (page: string) => void;
}

export const AddPatient: React.FC<AddPatientProps> = ({ onPageChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: '',
    insuranceProvider: '',
    insuranceNumber: ''
  });

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
      toast({
        title: "Patient Added Successfully",
        description: `${formData.firstName} ${formData.lastName} has been added to the system.`,
      });
      setIsLoading(false);
      onPageChange('patients');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => onPageChange('patients')}
          className="hover:shadow-medical transition-medical"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Patients
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Patient</h1>
          <p className="text-muted-foreground">Enter patient information to create a new record</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="w-5 h-5 text-primary" />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription>Basic patient details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring transition-medical"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
            <CardDescription>Patient's residential address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="transition-medical focus:shadow-medical"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
            <CardDescription>Emergency contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  name="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
            <CardDescription>Medical history and current health status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                placeholder="Previous conditions, surgeries, significant medical events..."
                className="min-h-[100px] transition-medical focus:shadow-medical"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                placeholder="Drug allergies, food allergies, environmental allergies..."
                className="min-h-[80px] transition-medical focus:shadow-medical"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentMedications">Current Medications</Label>
              <Textarea
                id="currentMedications"
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleInputChange}
                placeholder="Current medications with dosages..."
                className="min-h-[80px] transition-medical focus:shadow-medical"
              />
            </div>
          </CardContent>
        </Card>

        {/* Insurance Information */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Insurance Information</CardTitle>
            <CardDescription>Health insurance details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insuranceNumber">Insurance Number</Label>
                <Input
                  id="insuranceNumber"
                  name="insuranceNumber"
                  value={formData.insuranceNumber}
                  onChange={handleInputChange}
                  className="transition-medical focus:shadow-medical"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onPageChange('patients')}
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
                Adding Patient...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Add Patient
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};