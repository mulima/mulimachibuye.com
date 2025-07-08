import Link from "next/link";

interface NavMenuProps {
  orientation?: "horizontal" | "vertical";
  onLinkClick?: () => void;
  className?: string;
}

const menuItems = [
  {
    href: "/",
    label: "Home",
    className:
      "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors",
  },
  {
    href: "/about",
    label: "About",
    className:
      "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors",
  },
  {
    href: "/academics",
    label: "Academics",
    className: "text-slate-900 dark:text-white font-medium",
  },
  {
    href: "/archive",
    label: "Archive",
    className:
      "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors",
  },
];

export default function NavMenu({
  orientation = "horizontal",
  onLinkClick,
  className = "",
}: NavMenuProps) {
  return (
    <nav
      className={
        orientation === "horizontal"
          ? `space-x-8 ${className}`
          : `flex flex-col space-y-2 px-4 py-4 ${className}`
      }
    >
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            orientation === "horizontal"
              ? item.className
              : "text-slate-900 dark:text-white py-2"
          }
          onClick={onLinkClick}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
