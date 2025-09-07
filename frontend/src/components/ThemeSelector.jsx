import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore"
import { THEMES } from "../constants";

export default function ThemeSelector() {
  const {theme,setTheme} = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 bg-base-200 backdrop-blur-lg rounded-2xl w-56 border-base-content/10 max-h-80 overflow-y-auto shadow-2xl"
      >
        <div className="space-y-1">
          {THEMES.map((THEME) => (
            <button
              className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-colors ${
                theme === THEME.name
                  ? "bg-primary/10 text-primary"
                  : "hover: bg-base-content/5"
              }`}
              onClick={() => setTheme(THEME.name)}
              key={THEME.name}
            >
              <PaletteIcon className="size-4" />
              <span className="text-sm font-medium">{THEME.label}</span>
              <div className="flex gap-3 ml-auto">
                {THEME.colors.map((color,i) => (
                  <span
                    className="size-2 rounded-full"
                    style={{ background: color }}
                   key={i}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}