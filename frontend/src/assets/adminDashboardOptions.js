export default function getAdminDashboardOptions(admin) {
  return [
    {
      title: "Customers",
      path: "/admin/customers",
      icon: "fas fa-users",
      accentColor: "#029df0",
      subHeading: "Manage your customers details",
      subOptions: [
        {
          title: "Total Customers",
          value: admin?.totalUser ?? 0,
        },
      ],
    },
    {
      title: "Sellers",
      path: "/admin/sellers",
      icon: "fas fa-shop",
      accentColor: "#089e44",
      subHeading: "Manage your sellers details",
      subOptions: [
        {
          title: "Total Sellers",
          value: admin?.totalSeller ?? 0,
        },
      ],
    },
    {
      title: "Seller Requests",
      path: "/admin/seller-requests",
      icon: "fas fa-shield-alt",
      accentColor: "#d44204",
      subHeading: "Validate new seller requests",
      subOptions: [
        {
          title: "Pending Requests",
          value: admin?.totalPendingReq ?? 0,
        },
      ],
    },
  ];
}
