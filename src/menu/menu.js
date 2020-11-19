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
  name: '首页',
  path: '/',
  icon: 'fa fa-tachometer',
};


/**
 * 字体图标
 * @type {{name: string, icon: string, children: {}}}
 */
//   menu.font_icon = {
//     name: '字体图标',
//     icon: 'fa fa-th',
//     children: {}
//   };
// let icon = menu.font_icon.children;

// icon.font_awesome = {
//   name: 'FontAwesome 4.7',
//   path: '/font_awesome',

// };
// icon.element_icon = {
//   name: 'ElementIcon',
//   path: '/element_icon',
// };

/**
 * 内容管理
 * @type {{name: string, icon: string, children: {}}}
 */
// menu.content_manage = {
//   name: '内容管理',
//   icon: 'fa fa-file-text-o',
//   children: {}
// };

// let ContentManage = menu.content_manage.children;

// ContentManage.post = {
//   name: '文章管理',
//   path: '/post_manage',
// };

/**
 * 用户管理
 * @type {{name: string, icon: string, children: {}}}
 */
// menu.user_manage = {
//   name: '用户管理',
//   icon: 'fa fa-user-circle-o',
//   children: {}
// };
// let UserManage = menu.user_manage;

// UserManage.user = {
//   name: '用户列表',
//   path: '/user_manage',
// };


/**
 * 分类管理
 * @type {{name: string, icon: string, children: {}}}
 */
// menu.category_manage = {
//   name: '分类管理',
//   icon: 'fa fa-sitemap',
//   children: {}
// };
// let CategoryManage = menu.category_manage.children;

// CategoryManage.category = {
//   name: '分类列表',
//   path: '/category_manage',
// };



// menu.permission_manage = {
//   name: '权限管理',
//   icon: 'fa fa-qrcode',
//   children: {}
// };
// let PermissionManage = menu.permission_manage.children;

// PermissionManage.role = {
//   name: '角色管理',
//   path: '/role_manage',
// };

// PermissionManage.permission = {
//   name: '权限列表',
//   path: '/permission_list',
// };

export default menu;



console.log(menu)