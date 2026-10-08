export default function EvidenceCard({
  evidence,
  visualEntities = [],
  onUploadNextBestView,
}) {
  if (!evidence && (!visualEntities || visualEntities.length === 0)) return null;

  return (
    <div className="p-3.5 rounded-xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-2xs space-y-3 my-2 text-xs">
      {/* VISUAL ENTITIES LIST */}
      {visualEntities.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neutral-500)] block">
            Identified Entities
          </span>
          <div className="flex flex-wrap gap-1.5">
            {visualEntities.map((entity, idx) => {
              const status = entity.status || 'OBSERVED';
              let badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
              if (status === 'INFERRED') badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
              if (status === 'UNCERTAIN') badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';

              return (
                <div
                  key={idx}
                  className={`px-2 py-0.5 rounded-full border text-[11px] font-medium flex items-center gap-1.5 ${badgeStyle}`}
                >
                  <span className="font-semibold">{entity.label}</span>
                  <span className="text-[9px] uppercase font-bold opacity-80">({status})</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EVIDENCE DETAILS */}
      {evidence && (
        <div className="space-y-2 pt-2 border-t border-[var(--color-neutral-200)]">
          {evidence.reasoning && (
            <div className="text-[var(--color-neutral-700)] leading-relaxed">
              <span className="font-semibold text-[var(--color-neutral-900)]">Visual Reasoning: </span>
              {evidence.reasoning}
            </div>
          )}

          {evidence.missingEvidence && (
            <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] space-y-1">
              <div className="font-bold flex items-center gap-1 text-amber-800">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>UNCERTAIN: Insufficient Visual Evidence</span>
              </div>
              <p>{evidence.missingEvidence}</p>

              {evidence.nextBestView && (
                <div className="pt-1 font-medium text-amber-950">
                  💡 <span className="font-semibold">Suggested Action: </span>
                  {evidence.nextBestView}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
