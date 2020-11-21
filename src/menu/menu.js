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


/**
 * Manager products
 * @type {{name: string, icon: string, children: {}}}
 */
  menu.font_icon = {
    name: 'Manager products',
    icon: 'fa fa-th',
    children: {}
  };
  let icon = menu.font_icon.children;

  icon.Marketplace = {
    name: 'Marketplace',
    path: '/marketplace',

  };
  icon.Sellingproducts = {
    name: 'Selling products',
    path: '/sellingproducts',
  };

  icon.Myproducts = {
    name: 'My products',
    path: '/myproducts',
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
  name: 'Account information',
  path: '/accountinformation',

};




export default menu;



console.log(menu)