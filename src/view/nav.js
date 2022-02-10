export default () => {
  const templateNav = `
    <nav>
        <img src="../img/home_icon.png">
        <img src="../img/profile_icon.png">
        <img src="../img/setting_icon.png">
        <img src="../img/group_icon.png">
        <img src="../img/logout_icon.png"> 
    </nav>`;

  const labelNav = document.createElement('nav');
  labelNav.setAttribute('class', 'nav');
  labelNav.innerHTML = templateNav;
  return labelNav;
};
