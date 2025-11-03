export interface ActivityCardProps {
  id?: number;
  icon: string;
  label: string;
  value?: string | number;
}

export const activityCards = [
  { id: 1, icon: "profile-2user-dark", label: "Customers" },
  { id: 2, icon: "star-dark", label: "Rating" },
  { id: 3, icon: "car-dark", label: "Cars" },
  { id: 4, icon: "messages-dark", label: "Reviews" },
];
