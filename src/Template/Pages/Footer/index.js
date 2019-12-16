import React from "react";
import "./footer.scss";
import FooterNavItem from "./FooterNavItem";
import footerNav from "./footerNav";

const Footer = () => {
  const _renderFooterNav = () =>
    footerNav.map((item, idx) => <FooterNavItem {...item} key={idx} />);

  return (
    <footer className="footer">
      <div className="footer__content" style={{ maxWidth: "1012px" }}>
        <nav className="footer__content--nav">
          <div className="nav__content">{_renderFooterNav()}</div>
        </nav>
        <span class="footer__content--copy-right">© 2019 The Wind Blows</span>
      </div>
    </footer>
  );
};

export default Footer;
