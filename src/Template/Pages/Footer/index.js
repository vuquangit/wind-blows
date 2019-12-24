import React from "react";
import "./footer.scss";
import FooterNavItem from "./FooterNavItem";
import footerNav from "./footerNav";
import classNames from "classnames";

const Footer = ({ isHomePage = false }) => {
  const _renderFooterNav = () =>
    footerNav.map((item, idx) => (
      <FooterNavItem {...item} key={idx} isHomePage={isHomePage} />
    ));
  const footerClass = classNames("footer", { homepage__footer: isHomePage });
  const FCCClass = classNames("footer__content", {
    "homepage__footer--content": isHomePage
  });
  const FCCNavClass = classNames("footer__content--nav", {
    HPFCNAV: isHomePage
  });

  return (
    <footer className={footerClass}>
      <div className={FCCClass} style={{ maxWidth: "1012px" }}>
        <nav className={FCCNavClass}>
          <div className="nav__content">{_renderFooterNav()}</div>
        </nav>
        <span className="footer__content--copy-right">
          © 2019 The Wind Blows
        </span>
      </div>
    </footer>
  );
};

export default Footer;
