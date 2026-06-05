export const getContentSections = (contentInfo) => [
  {
    id: 1,
    title: "Header",
    description: "Navigation, Logos & Search",
    type: "Global",
    totalItems: contentInfo?.header?.navLinks?.length || 0,
    location: "Header",
    key: "header",
  },

  {
    id: 2,
    title: "Homepage Banners",
    description: "Homepage Hero Banners",
    type: "Banner",
    totalItems: contentInfo?.homepage?.banners?.length || 0,
    location: "Homepage",
    key: "homepage.banners",
  },

  {
    id: 3,
    title: "Explore Categories",
    description: "Homepage Explore Tabs",
    type: "Categories",
    totalItems: contentInfo?.homepage?.explore?.length || 0,
    location: "Homepage",
    key: "homepage.explore",
  },

  {
    id: 4,
    title: "Features Section",
    description: "Homepage Features",
    type: "Features",
    totalItems: contentInfo?.homepage?.features?.length || 0,
    location: "Homepage",
    key: "homepage.features",
  },

  {
    id: 5,
    title: "New Arrivals",
    description: "Homepage Products",
    type: "Products",
    totalItems: contentInfo?.homepage?.newArrivals?.length || 0,
    location: "Homepage",
    key: "homepage.newArrivals",
  },

  {
    id: 6,
    title: "Footer",
    description: "Footer Links & Socials",
    type: "Navigation",
    totalItems: contentInfo?.footer?.sections?.length || 0,
    location: "Footer",
    key: "footer",
  },

  {
    id: 7,
    title: "About Page",
    description: "Founders, Facts & Testimonials",
    type: "Page",
    totalItems: contentInfo?.aboutpage?.foundersData?.length || 0,
    location: "About",
    key: "aboutpage",
  },

  {
    id: 8,
    title: "Checkout Form",
    description: "Shipping & Payment Fields",
    type: "Form",
    totalItems:
      (contentInfo?.checkoutForm?.shipping?.fields?.length || 0) +
      (contentInfo?.checkoutForm?.payment?.fields?.length || 0),
    location: "Checkout",
    key: "checkoutForm",
  },
];
