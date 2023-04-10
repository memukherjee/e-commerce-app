const getSellerDashboardOptions = (sellerData) => [
    {
        title: 'Products',
        path: '/seller/products',
        icon: 'fas fa-boxes',
        accentColor: '#029df0',
        subHeading: 'Manage your products',
        subOptions: [
            {
                title: 'Total Products',
                value: sellerData?.totalProduct ?? 0,
            },
            {
                title: 'Total Categories',
                value: sellerData?.totalCategory ?? 0,
            },
            {
                title: 'Total Brands',
                value: sellerData?.totalCompany ?? 0,
            },
        ],
    },
    {
        title: 'Orders',
        path: '/seller/orders',
        icon: 'fas fa-shopping-cart',
        accentColor: '#f08502',
        subHeading: 'Manage your orders',
        subOptions: [
            {
                title: 'Total Orders',
                value: sellerData.totalOrderCount ?? 0,
            },
            {
                title: 'Total Sales',
                value: (sellerData.totalSoldItems ?? 0),
            },
        ],
    },
    {
        title: 'Reviews',
        path: '/seller/reviews',
        icon: 'fas fa-star',
        accentColor: '#ffc60d',
        subHeading: 'Manage your reviews',
        subOptions: [
            {
                title: 'Total Reviews',
                value: sellerData.totalReviews ?? 0,
            },
        ],
    },
    {
        title: 'Account',
        path: '/seller/account',
        icon: 'fas fa-user',
        accentColor: '#02a171',
        subHeading: 'Manage your profile',
    },
                

]





export default getSellerDashboardOptions;