let menu = {};

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
// let userMenu = JSON.parse(sessionStorage.permission_list)

// for(let i =0;i<userMenu.length;i++){
//     menu[userMenu[i].name] = userMenu[i]
//     if(userMenu[i].childrens.length>0){
//        menu[userMenu[i].name]['children'] =  userMenu[i].childrens
//     }
// }

menu.home = {
  name: 'dashboard',
  path: '/',
  icon: 'fa fa-tachometer',
};
menu.sourcing = {
  name: 'Sourcing',
  path: '/sourcing',
  icon: 'fa fa-shopping-bag',
};

/**
 * Manager products
 * @type {{name: string, icon: string, children: {}}}
 */
  menu.ManagerProducts = {
    name: 'Manager products',
    icon: 'fa fa-th',
    children: {}
  };
  let ManagerProducts = menu.ManagerProducts.children;

  ManagerProducts.Marketplace = {
    name: 'Marketplace',
    path: '/marketplace',

  };
  ManagerProducts.Sellingproducts = {
    name: 'Import List',
    path: '/sellingproducts',
  };

  ManagerProducts.Myproducts = {
    name: 'My products',
    path: '/myproducts',
  };

/**
 * Manage Inventory
 * @type {{name: string, icon: string, children: {}}}
 */
menu.ManagerInventory = {
  name: 'Manage Inventory',
  icon: 'fa  fa-list-alt',
  children: {}
};
let ManagerInventory = menu.ManagerInventory.children;

ManagerInventory.PurchaseList = {
  name: 'Purchase List',
  path: '/purchaseList',

};
ManagerInventory.MyInventory = {
  name: 'My Inventory',
  path: '/myInventory',
};

  
/**
 * Manager orders
 * @type {{name: string, icon: string, children: {}}}
 */
menu.Manager = {
  name: 'Manager orders',
  icon: 'fa fa-list-ul',
  children: {}
};
let Manager = menu.Manager.children;

Manager.Regular = {
  name: 'Regular orders',
  path: '/orders',

};
Manager.orders = {
  name: 'after-sales orders',
  path: '/aftersalesorders',
};


/**
 * Member
 * @type {{name: string, icon: string, children: {}}}
 */
menu.Member = {
  name: 'Member',
  icon: 'fa fa-users',
  children: {}
};
let Member = menu.Member.children;

Member.Regular = {
  name: 'All member',
  path: '/allmember',

};

/**
 * Account center
 * @type {{name: string, icon: string, children: {}}}
 */
menu.Account = {
  name: 'Account center',
  icon: 'fa fa-user-circle',
  children: {}
};
let Account = menu.Account.children;

Account.shop = {
  name: 'My shop',
  path: '/myshop',
};
Account.Regular = {
  name: 'Account Info',
  path: '/accountinformation',

};




export default menu;



console.log(menu)