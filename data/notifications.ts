export interface NotificationProps {
  label: string;
  items: {
    icon: string;
    title: string;
    message: string;
    read?: boolean;
  }[];
}

export const notifications: NotificationProps[] = [
  {
    label: "Today",
    items: [
      {
        icon: "calendar-tick",
        title: "Car booked successfully",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        read: false,
      },
      {
        icon: "clock",
        title: "2 hours remain",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        read: false,
      },
      {
        icon: "crown",
        title: "Request accepted",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        read: false,
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      {
        icon: "crown",
        title: "Request accepted",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        read: true,
      },
  
    ],
  },
];
