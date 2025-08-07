import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    document.body.setAttribute("data-theme", theme); // for custom css
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  return (
    <button
      className=" border-0 bg-transparent"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <i class="bi bi-moon-stars text-white"></i>
      ) : (
        <i class="bi bi-brightness-high text-white"></i>
      )}
    </button>
  );
};

export default ThemeToggle;
