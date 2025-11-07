const constant = {
  USER: "",
  EMAIL_ID: "",

  COOKIE: {
    HEADER: "@#$%^AZ##",
  },

  ROUTES: {
    INDEX: "/",
    // add more routes here
  },

   BASE_URL: "http://192.168.1.50:3000",

  //  SOFTWARE_URL: "https://insurance.digibima.com/",

  API: {
    USER: {
      SENDOTP: "/api/user/sendotp",
      VERIFYOTP: "/api/user/verifyotp",
      //  SENDOTP: "/api/sendotp",
      // VERIFYOTP: "/api/verifyotp",
       PINCODE: "/api/acpincode",
      USERINQUIRE: "/api/user/inquiry",
      USERLOGIN: "/api/motor/vehicle-type-select",
    },

    ADMIN: {
      ADMINLOGIN: "/api/admin/login",
      SENDOTP: "/api/user/sendotp",
      VERIFYOTP: "/api/user/verifyotp",
    },
    PRODUCTS: {
      HOMEPRODUCTS: "/api/user/product-details",
      ADDPRODUCTS: "/api/admin/product",
      VIEWPRODUCTS: "/api/user/product-view",
      SINGLEPRODUCTS: "/api/user/product-show",
    },
    NEWS: {
      ADDNEWS: "/api/admin/news",
      VIEWNEWS: "/api/user/news-show",
      SINGLEPRODUCTS: "/api/user/news-show",
    },
    BLOG:"/api/admin/blog",
    SINGLEBLOG:"/api/user/blog-show",
    DELETEBLOG:"/api/admin/delete",
    TRASHBLOG:"/api/admin/trash"
  },
};

export default constant;
