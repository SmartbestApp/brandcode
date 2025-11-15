import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "All Products",
    newTab: false,
    path: "/shop-with-sidebar",
  },
  {
    id: 6,
    title: "Smartwatches",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "Waterproof Smartwatches",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 62,
        title: "Standard Smartwatches",
        newTab: false,
        path: "/shop-without-sidebar",
      },
    ],
  },

  {
    id: 7,
    title: "Powebanks",
    newTab: false,
    path: "/",
  },
  
  {
    id: 3,
    title: "Contact",
    newTab: false,
    path: "/contact",
  }
];
