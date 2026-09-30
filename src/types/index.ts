export interface NavItem {
  label: string;
  href: string;
}

export interface HighlightItem {
  id: string;
  category: string;
  title: string;
  description: string;
  metric?: string;
  iconName: string;
}

export interface ApproachItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ConsultationOption {
  id: string;
  title: string;
  description: string;
  duration: string;
  badge?: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: string;
  message: string;
}
