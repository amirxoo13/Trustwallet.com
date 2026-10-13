import { cn } from "@/lib/utils";
import { useSite } from "@/lib/site-store";

export function LogoMark({ className, size = 28 }: { className?: string; size?: number }) {
  const logo = useSite((s) => s.logo);
  if (logo) {
    return (
      <img
        src={logo}
        alt=""
        width={size}
        height={size}
        className={cn("shrink-0 rounded-md object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <img
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      className={cn("shrink-0 rounded-md object-cover", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function LogoWord({ className }: { className?: string }) {
  const brandName = useSite((s) => s.brandName);
  return (
    <span className={cn("flex items-center gap-2 font-display text-[15px] font-semibold tracking-tight", className)}>
      <LogoMark />
      {brandName}
    </span>
  );
}
