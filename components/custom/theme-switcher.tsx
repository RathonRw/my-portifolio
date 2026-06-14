"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import type { JSX } from "react";
import { useCallback, useEffect, useSyncExternalStore } from "react";

function ThemeOption({
  icon,
  value,
  isActive,
  onClick,
}: {
  icon: JSX.Element;
  value: string;
  isActive?: boolean;
  onClick: (value: string) => void;
}) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: <explanation
    <button
      aria-checked={isActive}
      aria-label={`Switch to ${value} theme`}
      className="relative flex size-8 items-center justify-center rounded-full text-muted-foreground transition-[color] hover:text-foreground data-[active=true]:text-foreground [&_svg]:size-4"
      data-active={isActive}
      onClick={() => onClick(value)}
      role="radio"
      type="button"
    >
      {icon}

      {isActive && (
        <motion.span
          className="absolute inset-0 rounded-full border"
          layoutId="theme-option"
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
        />
      )}
    </button>
  );
}

const THEME_OPTIONS = [
  {
    icon: <MonitorIcon />,
    value: "system",
  },
  {
    icon: <SunIcon />,
    value: "light",
  },
  {
    icon: <MoonIcon />,
    value: "dark",
  },
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const isMounted = useSyncExternalStore(
    () => () => {
      //
    },
    () => true,
    () => false
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "d" || e.key === "D") && !e.metaKey && !e.ctrlKey) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        toggleTheme();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleTheme]);

  if (!isMounted) {
    return <div className="flex h-8 w-24" />;
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="inset-ring-1 inset-ring-border inline-flex items-center overflow-clip rounded-full bg-background"
      initial={{ opacity: 0 }}
      key={String(isMounted)}
      role="radiogroup"
      transition={{ duration: 0.3 }}
    >
      {THEME_OPTIONS.map((option) => (
        <ThemeOption
          icon={option.icon}
          isActive={theme === option.value}
          key={option.value}
          onClick={setTheme}
          value={option.value}
        />
      ))}
    </motion.div>
  );
}

export { ThemeSwitcher };

// "use client";
// import { useControllableState } from "@radix-ui/react-use-controllable-state";
// import { Monitor, Moon, Sun } from "lucide-react";
// import { motion } from "motion/react";
// import { useCallback, useEffect, useState } from "react";
// import { cn } from "@/lib/utils";

// const themes = [
//   {
//     key: "system",
//     icon: Monitor,
//     label: "System",
//   },
//   {
//     key: "light",
//     icon: Sun,
//     label: "Light theme",
//   },
//   {
//     key: "dark",
//     icon: Moon,
//     label: "Dark theme",
//   },
// ];

// export interface ThemeSwitcherProps {
//   className?: string;
//   defaultValue?: "light" | "dark" | "system";
//   onChange?: (theme: "light" | "dark" | "system") => void;
//   value?: "light" | "dark" | "system";
// }

// export const ThemeSwitcher = ({
//   value,
//   onChange,
//   defaultValue = "system",
//   className,
// }: ThemeSwitcherProps) => {
//   const [theme, setTheme] = useControllableState({
//     defaultProp: defaultValue,
//     prop: value,
//     onChange,
//   });

//   const [mounted, setMounted] = useState(false);

//   const handleThemeClick = useCallback(
//     (themeKey: "light" | "dark" | "system") => {
//       setTheme(themeKey);
//     },
//     [setTheme]
//   );

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <div
//         className={cn(
//           "h-8 w-26 rounded-full bg-background ring-1 ring-border",
//           className
//         )}
//       />
//     );
//   }

//   return (
//     <div
//       className={cn(
//         "relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border",
//         className
//       )}
//     >
//       {themes.map(({ key, icon: Icon, label }) => {
//         const isActive = theme === key;
//         return (
//           <button
//             aria-label={label}
//             className="group relative h-6 w-7.5 rounded-full transition-colors hover:text-foreground"
//             key={key}
//             onClick={() => handleThemeClick(key as "light" | "dark" | "system")}
//             type="button"
//           >
//             {isActive && (
//               <motion.div
//                 className="absolute inset-0 rounded-full bg-muted"
//                 layoutId="activeTheme"
//                 transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
//               />
//             )}
//             <Icon
//               className={cn(
//                 "relative z-10 m-auto h-3.5 w-3.5 transition-colors",
//                 isActive
//                   ? "font-bold text-foreground"
//                   : "text-muted-foreground group-hover:text-foreground"
//               )}
//             />
//           </button>
//         );
//       })}
//     </div>
//   );
// };
