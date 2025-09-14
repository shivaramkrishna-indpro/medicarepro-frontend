import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Heart, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  UserPlus, 
  CalendarPlus,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  userRole: 'admin' | 'doctor' | 'receptionist';
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  onPageChange, 
  userRole, 
  onLogout 
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'doctor', 'receptionist'] },
    { id: 'patients', label: 'Patients', icon: Users, roles: ['admin', 'doctor', 'receptionist'] },
    { id: 'add-patient', label: 'Add Patient', icon: UserPlus, roles: ['admin', 'receptionist'] },
    { id: 'appointments', label: 'Appointments', icon: Calendar, roles: ['admin', 'doctor', 'receptionist'] },
    { id: 'schedule-appointment', label: 'Schedule', icon: CalendarPlus, roles: ['admin', 'receptionist'] },
    { id: 'medical-records', label: 'Medical Records', icon: FileText, roles: ['admin', 'doctor'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  const NavButton: React.FC<{ item: any; mobile?: boolean }> = ({ item, mobile = false }) => (
    <li className={`${mobile ? 'w-full' : ''}`}>
      <button
        onClick={() => {
          onPageChange(item.id);
          if (mobile) setIsMenuOpen(false);
        }}
        className={`${mobile ? 'w-full' : 'w-full'} flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-medical ${
          currentPage === item.id 
            ? 'bg-gradient-primary text-white shadow-medical font-medium' 
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        }`}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        <span className="font-medium">{item.label}</span>
      </button>
    </li>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <Card className="hidden md:block fixed left-4 top-4 bottom-4 w-64 bg-gradient-card shadow-elevated z-40">
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-medical">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                MediCare Pro
              </h1>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {filteredMenuItems.map((item) => (
                <NavButton key={item.id} item={item} />
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="border-t border-border pt-4">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg text-destructive hover:bg-destructive/10 transition-medical"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <Card className="rounded-none bg-gradient-header shadow-card">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-bold text-white">MediCare Pro</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/20"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </Card>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <Card className="absolute top-full left-0 right-0 bg-card shadow-elevated animate-slide-in">
            <div className="p-4">
              <ul className="space-y-2">
                {filteredMenuItems.map((item) => (
                  <NavButton key={item.id} item={item} mobile />
                ))}
              </ul>
              <div className="border-t border-border mt-4 pt-4">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg text-destructive hover:bg-destructive/10 transition-medical"
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};