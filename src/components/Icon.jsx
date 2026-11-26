import React from 'react';
import {
  Sparkles,
  Scissors,
  Flower2,
  Crown,
  Compass,
  Award,
  Clock,
  ShieldCheck,
  CalendarX,
  Leaf,
  Users,
  CreditCard,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X,
  Menu,
  ArrowRight,
  ArrowUp,
  Check,
  ExternalLink
} from 'lucide-react';

const iconMap = {
  Sparkles,
  Scissors,
  Flower2,
  Crown,
  Compass,
  Award,
  Clock,
  ShieldCheck,
  CalendarX,
  Leaf,
  Users,
  CreditCard,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X,
  Menu,
  ArrowRight,
  ArrowUp,
  Check,
  ExternalLink
};

export function Icon({ name, size = 20, className = '', ...props }) {
  const IconComponent = iconMap[name] || Sparkles;
  return <IconComponent size={size} className={className} aria-hidden="true" {...props} />;
}
