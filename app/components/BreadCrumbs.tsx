import Link from "next/link";

interface BreadcrumbItem {
  label: string | string[];
  href?: string;
}
interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb">
      <hr className="h-px my-4 border-0 dark:bg-[#C8C8C8]" />
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        const label = Array.isArray(item.label) ? item.label.join(' ') : item.label;

        return (
          <span
            key={index}
            className={`text-h-small ${
              isLastItem ? "font-bold text-black" : "text-[#787878]"
            }`}
          >
            {item.href && !isLastItem ? (
              <Link href={item.href}>
                {label}
              </Link>
            ) : (
              <span>{label}</span>
            )}
            {!isLastItem && " > "}
          </span>
        );
      })}
      <hr className="h-px my-4 border-0 dark:bg-[#C8C8C8]" />
    </nav>
  );
}