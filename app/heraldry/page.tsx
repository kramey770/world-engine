export default function HeraldryPage() {
  return (
    <div className="h-screen w-full overflow-hidden">
      <iframe
        src="/armoria/index.html"
        className="h-full w-full border-0"
        title="Armoria Heraldry Generator"
      />
    </div>
  );
}