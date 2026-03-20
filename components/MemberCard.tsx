import Image from "next/image";

export type MemberCardSize = "sm" | "md" | "lg";

export type MemberCardProps = {
  name: string;
  role?: string;
  profileImageUrl?: string | null;
  size?: MemberCardSize;
};

const sizeStyles: Record<
  MemberCardSize,
  {
    container: string;
    image: string;
    name: string;
    role: string;
  }
> = {
  sm: {
    container: "w-40 min-h-40 gap-3 p-4 text-center",
    image: "h-16 w-16",
    name: "text-sm",
    role: "inline-flex items-center rounded-full border border-border/60 bg-secondary/80 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/90",
  },
  md: {
    container: "w-52 min-h-52 gap-3 p-5 text-center",
    image: "h-20 w-20",
    name: "text-base",
    role: "inline-flex items-center rounded-full border border-border/60 bg-secondary/80 px-3 py-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground",
  },
  lg: {
    container: "w-64 min-h-64 gap-4 p-6 text-center",
    image: "h-24 w-24",
    name: "text-lg",
    role: "inline-flex items-center rounded-full border border-border/60 bg-secondary/80 px-3.5 py-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground",
  },
};

export function MemberCard({
  name,
  role,
  profileImageUrl,
  size = "md",
}: MemberCardProps) {
  const styles = sizeStyles[size];
  const src = profileImageUrl || "/sheep.jpg";

  return (
    <div
      className={`
        flex flex-col items-center rounded-2xl border backdrop-blur-xl
        ${styles.container}
      `}
    >
      <div className="relative shrink-0">
        <div
          className={`flex items-center justify-center rounded-full  bg-white/80 ${styles.image}`}
        >
          <Image
            src={src}
            alt={name}
            width={260}
            height={260}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Info below */}
      <div className="flex flex-col items-center gap-1">
        <h3
          className={`
            font-minion-bold tracking-[0.12em] uppercase text-royal-gold-400
            ${styles.name}
          `}
        >
          {name}
        </h3>
        {role && <span className={styles.role}>{role}</span>}
      </div>
    </div>
  );
}
