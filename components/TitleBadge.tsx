interface TitleBadgeProps {
  title: string;
  className?: string;
}

export default function TitleBadge(props: TitleBadgeProps) {
  return (
    <div className={`text-sm uppercase text-royal-gold-400 bg-red-900 flex items-center justify-center px-2 py-0 text-center ${props.className}`}>
      {props.title}
    </div>
  );
}
