interface CarProps {
  id: number;
  src: string;
  title: string;
  price: string;
  rating: number;
  fuel: string;
  transmission: string;
  capacity: string;
}

export const vehicle: CarProps = {
  id: 1,
  src: "1",
  title: "GLE AMG 63S",
  price: "456k/",
  rating: 4.5,
  fuel: "90L",
  transmission: "Manual",
  capacity: "4 Persons",
};

// export const cars: CarProps[] = [
//   {
//     id: 1,
//     src: "1",
//     title: "GLE AMG 63S",
//     price: "456k/",
//     rating: 4.5,
//     fuel: "90L",
//     transmission: "Manual",
//     capacity: "4 Persons",
//   },
//   {
//     id: 2,
//     src: "2",
//     title: "GLE AMG 63S",
//     price: "456k/",
//     rating: 4.5,
//     fuel: "90L",
//     transmission: "Manual",
//     capacity: "4 Persons",
//   },
//   {
//     id: 3,
//     src: "3",
//     title: "GLE AMG 63S",
//     price: "456k/",
//     rating: 4.5,
//     fuel: "90L",
//     transmission: "Manual",
//     capacity: "4 Persons",
//   },
//   {
//     id: 4,
//     src: "4",
//     title: "GLE AMG 63S",
//     price: "456k/",
//     rating: 4.5,
//     fuel: "90L",
//     transmission: "Manual",
//     capacity: "4 Persons",
//   },
// ];

export const cars: CarProps[] = [
  {
    id: 1,
    src: "lexus-es350",
    title: "Lexus ES 350",
    price: "200k/",
    rating: 4.5,
    fuel: "66L",
    transmission: "Automatic",
    capacity: "4 Persons",
  },
  {
    id: 2,
    src: "gle-53",
    title: "Mercedes-AMG GLE 53",
    price: "450k/",
    rating: 4.9,
    fuel: "66L",
    transmission: "Automatic",
    capacity: "4 Persons",
  },
  {
    id: 3,
    src: "rx-330",
    title: "Lexus RX 330",
    price: "120k/",
    rating: 4.5,
    fuel: "70L",
    transmission: "Automatic",
    capacity: "4 Persons",
  },
  {
    id: 4,
    src: "hyundai-sonata",
    title: "Hyundai Sonata",
    price: "150k/",
    rating: 4.3,
    fuel: "60L",
    transmission: "Automatic",
    capacity: "4 Persons",
  },
];
