function BigText({ text,className }: { text: string; className?: string }) {
  return <p className={`text-3xl uppercase font-extrabold ${className || "text-accent"}`}>{text}</p>;
}

export default BigText;
