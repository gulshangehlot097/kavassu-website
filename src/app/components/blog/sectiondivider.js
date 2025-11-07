export default function SectionDivider({ title }) {
  return (
    <div className="mt-8 flex items-center gap-4">
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{title}</h3>
      <div className="h-px flex-1 bg-slate-300" />
    </div>
  );
}
