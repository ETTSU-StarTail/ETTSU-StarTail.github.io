class GeneralHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: "closed"
    });

    const header = document.createElement("header");

    const siteTitle = document.createElement("h1");
    siteTitle.textContent = "ettsu-log（工事中）";

    // navigation
    const menuItemList = [];

    function setMenuItem(href, menuText, description, isDisabled) {
      const menuItem = document.createElement("li");
      menuItem.setAttribute("class", "global-navigation--item");
      menuItem.setAttribute("title", description)

      const anchor = document.createElement("a");
      anchor.textContent = menuText;
      anchor.setAttribute("class", "global-navigation--link");

      if (!isDisabled) {
        anchor.href = href;
      } else {
        anchor.classList.add("is-disabled")
      }

      const selectedCheckText = href === "./index.html" ? "/" : href.substring(1);
      if (location.href.endsWith(selectedCheckText)) {
        anchor.classList.add("is-selected")
        siteTitle.textContent += `@ ${menuText}`
      }

      menuItem.appendChild(anchor);

      return menuItem;
    }

    menuItemList.push(setMenuItem("./", "Home", "トップページです。", false));
    menuItemList.push(setMenuItem("./log.html", "Log", "趣味に関する記事を載せています。", false));
    menuItemList.push(setMenuItem("./work.html", "Work", "なんか作ったものを雑多に置く場所です。", true));
    menuItemList.push(setMenuItem("./lab.html", "Lab", "試したいものを実際に試している場所です。", true));

    const siteNavigation = document.createElement("nav");
    siteNavigation.setAttribute("class", "global-navigation");

    const navigationMenu = document.createElement("menu");
    navigationMenu.setAttribute("class", "global-navigation--menu");

    menuItemList.forEach(m => {
      navigationMenu.appendChild(m);
    })
    siteNavigation.appendChild(navigationMenu);

    const style = document.createElement("style");
    style.textContent = `
    .global-navigation--menu {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0;
      margin: 0;
    }

    .global-navigation--item {
      list-style: none;
      width: 4rem;
      height: 2rem;
    }

    .global-navigation--link {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      text-decoration-line: none;
    }

    .global-navigation--link.is-selected {
      background-color: skyblue;
    }

    .global-navigation--link.is-disabled {
      text-decoration: line-through;
    }
    `

    shadow.appendChild(style);
    shadow.appendChild(header);

    header.appendChild(siteTitle);
    header.appendChild(siteNavigation);
  }
}

customElements.define("g-header", GeneralHeader)