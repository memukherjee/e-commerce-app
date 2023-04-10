const getFooterOptions = (moduleName) => {
  if (moduleName === "user") {
    return {
      left: {
        heading: "Contact Us",
        items: [
          {
            type: "text",
            content: "Elegant Apparels",
          },
          {
            type: "text",
            content: "007/S.B. Gorai Road",
          },
          {
            type: "text",
            content: "Asansol, India 713303",
          },
          {
            type: "link",
            content: "Email Us",
            link: "/contact-us",
          },
        ],
      },
      right: {
        heading: "Quick Links",
        items: [
          {
            type: "link",
            content: "Your Favorites",
            link: "/account/wishlist",
          },
          {
            type: "link",
            content: "Men's Clothing",
            link: "/products/men",
          },
          {
            type: "link",
            content: "Women's Clothing",
            link: "/products/women",
          },
          {
            type: "link",
            content: "Kids Clothing",
            link: "/products/kids",
          },
          {
            type: "link",
            content: "Are you a seller?",
            link: "/seller",
          },
        ],
      },
    };
  } else if (moduleName === "seller") {
    return {
      left: {
        heading: "Contact Us",
        items: [
          {
            type: "text",
            content: "Elegant Apparels",
          },
          {
            type: "text",
            content: "007/S.B. Gorai Road",
          },
          {
            type: "text",
            content: "Asansol, India 713303",
          },
          {
            type: "link",
            content: "Email Us",
            link: "/contact-us",
          },
        ],
      },
      right: {
        heading: "Quick Links",
        items: [
          {
            type: "link",
            content: "Your orders",
            link: "/seller/orders",
          },
          {
            type: "link",
            content: "Your Products",
            link: "/seller/products",
          },
        ],
      },
    };
  } else if (moduleName === "admin") {
    return {
      left: {
        heading: "Our Address",
        items: [
          {
            type: "text",
            content: "Elegant Apparels",
          },
          {
            type: "text",
            content: "007/S.B. Gorai Road",
          },
          {
            type: "text",
            content: "Asansol, India 713303",
          },
        ],
      },
      right: {
        heading: "Quick Links",
        items: [],
      },
    };
  }
};

export { getFooterOptions };
