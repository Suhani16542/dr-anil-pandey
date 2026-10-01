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

export interface VideoItem {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category?: string;
  duration?: string;
  publishedAt?: string;
  featured?: boolean;
}

export interface BlogPost {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  status: "Draft" | "Published" | "Archived";
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
}

