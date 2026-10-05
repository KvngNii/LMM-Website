export default function ProductCover({ title }: { title: string }) {
  return (
    <div className="relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-[4px] bg-charcoal p-5 text-ivory">
      <img src="/logos/icon-orange.png" alt="" className="h-9 w-9 object-contain object-left" />
      <p className="serif text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.05] text-orange">{title}</p>
    </div>
  );
}
