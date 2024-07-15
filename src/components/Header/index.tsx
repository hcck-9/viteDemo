import { useEffect, useRef } from "react";
import "./index.scss";

const Header = () => {
  const themeStatus = useRef("light");

  const changeTheme = () => {
    themeStatus.current = themeStatus.current === "light" ? "dark" : "light";
    const root = document.documentElement;
    root.setAttribute("data-theme", themeStatus.current);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", "light");
  }, []);

  return (
    <div className="header">
      <div className="left">header</div>
      <div className="right">
        <button onClick={changeTheme}>change</button>
      </div>
    </div>
  );
};

export default Header;
