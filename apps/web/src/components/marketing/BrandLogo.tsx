import Image from "next/image";

type Props = {
  className?: string;
  /** Use on LCP / header for faster paint */
  priority?: boolean;
  /**
   * `onDark` = light, high-luminance blues for translucent/dark bars (e.g. home hero header).
   * Default = deep royal blues for light backgrounds (footer, inner pages).
   */
  variant?: "default" | "onDark";
};

/**
 * Brand lockup: `/brand-logo.svg` (light surfaces) or `/brand-logo-on-dark.svg` (dark header).
 */
export function BrandLogo({ className = "", priority = false, variant = "default" }: Props) {
  const src = variant === "onDark" ? "/brand-logo-on-dark.svg" : "/brand-logo.svg";
  return (
    <Image
      src={src}
      alt="Earlsdwara Digital"
      width={280}
      height={56}
      priority={priority}
      className={`h-9 w-auto sm:h-10 md:h-11 ${className}`}
    />
  );
}
