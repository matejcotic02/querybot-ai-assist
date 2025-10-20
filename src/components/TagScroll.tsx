export const TagScroll = () => {
  const tagRows = [
    ["AI analysis", "Call scoring", "8+ languages", "Screen new hires", "Custom AI prospects", "Low latency voice", "Human-like AI", "Faster ramp time"],
    ["Custom AI prospects", "Low latency voice", "Human-like AI", "Faster ramp time", "AI analysis", "Call scoring", "8+ languages", "Screen new hires"],
  ];

  return (
    <section className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="space-y-6">
        {tagRows.map((tags, rowIndex) => (
          <div key={rowIndex} className="relative">
            <div className="flex gap-4 animate-scroll-left pause-animation">
              {/* Duplicate the tags multiple times for seamless loop */}
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-4 shrink-0">
                  {tags.map((tag, tagIndex) => (
                    <span
                      key={`${setIndex}-${tagIndex}`}
                      className="px-6 py-3 text-base font-normal whitespace-nowrap"
                      style={{ color: '#1D1D1F' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
