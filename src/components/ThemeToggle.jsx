import { useEffect, useState } from "react";
import { BiSun, BiMoon } from "react-icons/bi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function changeTheme() {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  }

  return (
    <button onClick={() => changeTheme()}>
      {theme == "dark" ? <BiMoon size="1.5em" /> : <BiSun size="1.5em" />}
    </button>
  );
}
