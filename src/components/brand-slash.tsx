export const Icons = () => "/";

export const Slash = ({ className }: { className?: string }) => {
  return (
    <p
      className={`text-brand opacity-0  transition-all group-hover:opacity-100 ${className}`}
    >
      <Icons />
    </p>
  );
};
