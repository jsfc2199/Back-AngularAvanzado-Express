const getMenuFrontEnd = (role = 'USER_ROLE') => {
  const menu = [
    {
      titulo: "Dashboard!!!",
      icono: "mdi mdi-gauge",
      submenu: [
        { titulo: "Main", url: "/" },
        { titulo: "ProgressBar", url: "progress" },
        { titulo: "Gráficas", url: "grafica1" },
        { titulo: "Promesas", url: "promesas" },
        { titulo: "RxJs", url: "rxjs" },
      ],
    },
    {
      titulo: "Mantenimiento",
      icono: "mdi mdi-folder-lock-open",
      submenu: [
        // { titulo: "Usuarios", url: "usuarios" },
        { titulo: "Hospitales", url: "hospitales" },
        { titulo: "Medicos", url: "medicos" },
      ],
    },
  ];

  if(role==='ADMIN_ROLE'){
    menu[1].submenu.unshift({ titulo: "Usuarios", url: "usuarios" }) //lo añadimos a la primera posición 
  }
  return menu
};

module.exports = {
    getMenuFrontEnd
}