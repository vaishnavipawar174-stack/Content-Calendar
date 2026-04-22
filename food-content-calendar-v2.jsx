import { useState, useRef } from "react";

const initialData = [
  { day: 1, label: "Mon", week: 1, date: "", contentType: "Street Food", topic: "Best ₹100 meal in Mumbai", hook: "You won't believe what ₹100 gets you in Mumbai 👀", location: "", status: "Planned", notes: "", format: "Static Post", icon: "🛺" },
  { day: 2, label: "Wed", week: 1, date: "", contentType: "Cafe Review", topic: "Cafe review — honest + aesthetic shots", hook: "Is this cafe actually worth the hype?", location: "", status: "Planned", notes: "", format: "Carousel", icon: "☕" },
  { day: 3, label: "Fri", week: 1, date: "", contentType: "Trend Reel", topic: "Trend reel + food (trending audio)", hook: "POV: You found Mumbai's best kept secret 🔥", location: "", status: "Planned", notes: "", format: "Reel", icon: "🎵" },
  { day: 4, label: "Sat", week: 1, date: "", contentType: "Mini Vlog", topic: "Spent ₹500 eating all day", hook: "I spent ₹500 on food today — here's everything I ate", location: "", status: "Planned", notes: "", format: "Vlog", icon: "🎬" },
  { day: 5, label: "Sun", week: 1, date: "", contentType: "Top List", topic: "Top 3 must-try dishes at [place]", hook: "Top 3 dishes you CANNOT leave without trying", location: "", status: "Planned", notes: "", format: "Carousel", icon: "🏆" },
  { day: 6, label: "Mon", week: 2, date: "", contentType: "Hidden Gem", topic: "Hidden street food spot in Mumbai", hook: "This hidden spot in Mumbai will change your life 🗺️", location: "", status: "Planned", notes: "", format: "Static Post", icon: "🗺️" },
  { day: 7, label: "Wed", week: 2, date: "", contentType: "Cafe Review", topic: "Is this overrated cafe worth it?", hook: "Everyone's talking about this cafe. My honest verdict 👇", location: "", status: "Planned", notes: "", format: "Carousel", icon: "🤔" },
  { day: 8, label: "Fri", week: 2, date: "", contentType: "Trend Reel", topic: "Trend reel — funny/relatable food struggle", hook: "Every foodie in Mumbai can relate to this 😂", location: "", status: "Planned", notes: "", format: "Reel", icon: "😂" },
  { day: 9, label: "Sat", week: 2, date: "", contentType: "Vlog", topic: "Trying viral food places", hook: "I tried every viral food spot so you don't have to", location: "", status: "Planned", notes: "", format: "Vlog", icon: "🎬" },
  { day: 10, label: "Sun", week: 2, date: "", contentType: "Educational", topic: "3 mistakes people make while ordering food", hook: "Stop making these 3 mistakes when you order street food", location: "", status: "Planned", notes: "", format: "Carousel", icon: "💡" },
  { day: 11, label: "Mon", week: 3, date: "", contentType: "Challenge", topic: "Full meal under ₹200 challenge", hook: "Can I eat a full meal for under ₹200? Watch to find out", location: "", status: "Planned", notes: "", format: "Reel", icon: "💪" },
  { day: 12, label: "Wed", week: 3, date: "", contentType: "Comparison", topic: "Cafe vs street food comparison", hook: "Cafe food vs street food — which actually wins? 👇", location: "", status: "Planned", notes: "", format: "Carousel", icon: "⚖️" },
  { day: 13, label: "Fri", week: 3, date: "", contentType: "Trend Reel", topic: "Trend reel — reaction-based", hook: "My reaction when I tasted this for the first time 😮", location: "", status: "Planned", notes: "", format: "Reel", icon: "😮" },
  { day: 14, label: "Sat", week: 3, date: "", contentType: "Vlog", topic: "1 day food tour in Mumbai", hook: "I did a 1-day food tour of Mumbai. Here's EVERYTHING", location: "", status: "Planned", notes: "", format: "Vlog", icon: "🗺️" },
  { day: 15, label: "Sun", week: 3, date: "", contentType: "Top List", topic: "Top 5 budget eats in Mumbai", hook: "5 places in Mumbai where your wallet will thank you", location: "", status: "Planned", notes: "", format: "Carousel", icon: "🏆" },
  { day: 16, label: "Mon", week: 4, date: "", contentType: "Night Out", topic: "Best late-night food spots", hook: "Hungry at midnight in Mumbai? I got you 🌙", location: "", status: "Planned", notes: "", format: "Static Post", icon: "🌙" },
  { day: 17, label: "Wed", week: 4, date: "", contentType: "Community", topic: "Trying followers' recommended food", hook: "You told me where to eat. Here's what happened ❤️", location: "", status: "Planned", notes: "", format: "Vlog", icon: "❤️" },
  { day: 18, label: "Fri", week: 4, date: "", contentType: "Trend Reel", topic: "Trend reel — hook-based", hook: "Stop scrolling. You need to see this 🪝", location: "", status: "Planned", notes: "", format: "Reel", icon: "🪝" },
  { day: 19, label: "Sat", week: 4, date: "", contentType: "Vlog", topic: "Street food marathon", hook: "I did a street food marathon in Mumbai. Here's the chaos", location: "", status: "Planned", notes: "", format: "Vlog", icon: "🏃" },
  { day: 20, label: "Sun", week: 4, date: "", contentType: "Must Try", topic: "Things you MUST try at this place", hook: "Don't leave this place without trying these 3 things 🌟", location: "", status: "Planned", notes: "", format: "Carousel", icon: "🌟" },
];

const statusOptions = ["Planned", "In Progress", "Filmed", "Edited", "Posted"];
const formatOptions = ["Reel", "Carousel", "Static Post", "Vlog"];
const contentTypeOptions = ["Street Food", "Cafe Review", "Trend Reel", "Mini Vlog", "Top List", "Hidden Gem", "Educational", "Challenge", "Comparison", "Night Out", "Community", "Must Try", "Vlog", "Other"];

const weekColors = { 1: "#FF6B35", 2: "#E63946", 3: "#2EC4B6", 4: "#9B5DE5" };

const statusColors = {
  "Planned":     { bg: "#1E1E1E", text: "#666", border: "#333" },
  "In Progress": { bg: "#1A2A1A", text: "#4ADE80", border: "#2D4A2D" },
  "Filmed":      { bg: "#1A1A2A", text: "#818CF8", border: "#2D2D4A" },
  "Edited":      { bg: "#2A1A2A", text: "#E879F9", border: "#4A2D4A" },
  "Posted":      { bg: "#1A2A1A", text: "#4ADE80", border: "#2D4A2D" },
};

const formatColors = {
  "Reel":        "#FF6B35",
  "Carousel":    "#2EC4B6",
  "Static Post": "#E63946",
  "Vlog":        "#9B5DE5",
};

function EditableField({ value, onChange, type = "text", options, placeholder, style = {} }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();

  if (type === "select") {
    return (
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          background: "#111",
          border: "1px solid #333",
          color: "#E8E4DF",
          borderRadius: 6,
          padding: "3px 6px",
          fontSize: 11,
          fontFamily: "'DM Mono', monospace",
          cursor: "pointer",
          outline: "none",
          ...style,
        }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        autoFocus
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        onKeyDown={e => e.key === "Enter" && setEditing(false)}
        placeholder={placeholder}
        style={{
          background: "#111",
          border: "1px solid #555",
          color: "#F0EDE8",
          borderRadius: 6,
          padding: "3px 8px",
          fontSize: 12,
          fontFamily: "'DM Mono', monospace",
          outline: "none",
          width: "100%",
          ...style,
        }}
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      title="Click to edit"
      style={{
        cursor: "text",
        color: value ? "#E8E4DF" : "#444",
        fontSize: 12,
        borderBottom: "1px dashed #333",
        paddingBottom: 1,
        display: "inline-block",
        minWidth: 40,
        ...style,
      }}
    >
      {value || placeholder}
    </span>
  );
}

export default function ContentCalendar() {
  const [data, setData] = useState(initialData);
  const [activeWeek, setActiveWeek] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);

  const update = (dayNum, field, val) => {
    setData(prev => prev.map(d => d.day === dayNum ? { ...d, [field]: val } : d));
  };

  const weeks = [1, 2, 3, 4];
  const visibleData = activeWeek ? data.filter(d => d.week === activeWeek) : data;
  const posted = data.filter(d => d.status === "Posted").length;
  const progress = (posted / 20) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D0D0D",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      paddingBottom: 80,
      color: "#F0EDE8",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; }

        .card {
          background: #141414;
          border: 1px solid #222;
          border-radius: 14px;
          transition: all 0.2s ease;
          overflow: hidden;
        }
        .card:hover { border-color: #333; }
        .card.expanded { border-color: #444; }

        .card-header {
          padding: 14px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .card-header:hover { background: rgba(255,255,255,0.02); }

        .expand-grid {
          padding: 0 16px 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          border-top: 1px solid #1E1E1E;
          padding-top: 14px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .field-label {
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #444;
          font-weight: 500;
        }

        .week-pill {
          padding: 7px 16px;
          border-radius: 999px;
          border: 1.5px solid #2A2A2A;
          background: transparent;
          color: #666;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.18s;
          font-weight: 500;
        }
        .week-pill:hover, .week-pill.active {
          color: #F0EDE8;
          border-color: #F0EDE8;
          background: #1A1A1A;
        }

        .progress-bar { height: 5px; background: #1A1A1A; border-radius: 999px; overflow: hidden; }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF6B35, #E63946, #9B5DE5);
          border-radius: 999px;
          transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .expand-grid { animation: fadeDown 0.2s ease; }

        select option { background: #1A1A1A; }

        .edit-hint {
          font-size: 9px;
          color: #333;
          letter-spacing: 1px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        textarea {
          background: #111;
          border: 1px solid #333;
          color: #E8E4DF;
          border-radius: 6px;
          padding: 5px 8px;
          font-size: 11px;
          font-family: 'DM Mono', monospace;
          resize: none;
          outline: none;
          width: 100%;
          min-height: 52px;
        }
        textarea:focus { border-color: #555; }
      `}</style>

      {/* HEADER */}
      <div style={{
        padding: "36px 20px 24px",
        borderBottom: "1px solid #1A1A1A",
        position: "sticky", top: 0, zIndex: 10,
        background: "#0D0D0D",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 5 }}>Mumbai Food Creator</div>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 5vw, 36px)",
                fontWeight: 900, margin: 0, lineHeight: 1.1,
                background: "linear-gradient(135deg, #FF6B35 0%, #E63946 50%, #9B5DE5 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Content Calendar</h1>
              <div style={{ fontSize: 10, color: "#444", marginTop: 4 }}>20 posts · 4 weeks · tap any card to edit</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 900, lineHeight: 1, color: posted === 20 ? "#4ADE80" : "#F0EDE8" }}>
                {posted}<span style={{ fontSize: 14, color: "#444", fontFamily: "'DM Mono', monospace" }}>/20</span>
              </div>
              <div style={{ fontSize: 9, color: "#444", letterSpacing: 1, textTransform: "uppercase" }}>posted</div>
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginBottom: 16 }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 9, color: "#333" }}>
              <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
            </div>
          </div>

          {/* Status summary */}
          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {statusOptions.map(s => {
              const count = data.filter(d => d.status === s).length;
              const sc = statusColors[s];
              return (
                <div key={s} style={{ padding: "4px 10px", borderRadius: 999, background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text, fontSize: 10 }}>
                  {count} {s}
                </div>
              );
            })}
          </div>

          {/* Week filter */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className={`week-pill ${activeWeek === null ? "active" : ""}`} onClick={() => setActiveWeek(null)}>All</button>
            {weeks.map(w => (
              <button key={w} className={`week-pill ${activeWeek === w ? "active" : ""}`} onClick={() => setActiveWeek(w)}>Week {w}</button>
            ))}
          </div>
        </div>
      </div>

      {/* CALENDAR */}
      <div style={{ maxWidth: 680, margin: "24px auto 0", padding: "0 20px" }}>

        {weeks.filter(w => !activeWeek || w === activeWeek).map(weekNum => {
          const weekItems = visibleData.filter(d => d.week === weekNum);
          const wColor = weekColors[weekNum];
          const weekDone = weekItems.filter(d => d.status === "Posted").length;

          return (
            <div key={weekNum} style={{ marginBottom: 32 }}>
              {/* Week header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: wColor, flexShrink: 0 }}>
                  ✦ Week {weekNum}
                </div>
                <div style={{ flex: 1, height: 1, background: "#1E1E1E" }} />
                <div style={{ fontSize: 9, color: "#333" }}>{weekDone}/{weekItems.length} posted</div>
              </div>

              {/* Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {weekItems.map(item => {
                  const isExpanded = expandedDay === item.day;
                  const sc = statusColors[item.status];
                  const fc = formatColors[item.format];

                  return (
                    <div key={item.day} className={`card ${isExpanded ? "expanded" : ""}`} style={{ borderLeft: `3px solid ${wColor}` }}>

                      {/* Card header row */}
                      <div className="card-header" onClick={() => setExpandedDay(isExpanded ? null : item.day)}>

                        {/* Icon + day */}
                        <div style={{
                          width: 44, height: 44, flexShrink: 0,
                          background: "#1A1A1A", borderRadius: 10,
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center",
                          border: "1px solid #222",
                        }}>
                          <div style={{ fontSize: 16, lineHeight: 1 }}>{item.icon}</div>
                          <div style={{ fontSize: 9, color: "#555", letterSpacing: 0.5, textTransform: "uppercase", marginTop: 2 }}>{item.label}</div>
                        </div>

                        {/* Main content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 5, flexWrap: "wrap" }}>
                            <span style={{ padding: "2px 8px", borderRadius: 5, background: fc + "22", color: fc, fontSize: 9, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
                              {item.format}
                            </span>
                            <span style={{ padding: "2px 8px", borderRadius: 999, background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text, fontSize: 9 }}>
                              {item.status}
                            </span>
                            {item.location && (
                              <span style={{ fontSize: 10, color: "#555" }}>📍 {item.location}</span>
                            )}
                          </div>
                          <div style={{ fontSize: 12, color: "#D0CAC4", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.topic}
                          </div>
                          {item.hook && (
                            <div style={{ fontSize: 10, color: "#555", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontStyle: "italic" }}>
                              "{item.hook}"
                            </div>
                          )}
                        </div>

                        {/* Expand arrow */}
                        <div style={{ color: "#444", fontSize: 14, transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>
                          ▾
                        </div>
                      </div>

                      {/* Expanded edit fields */}
                      {isExpanded && (
                        <div style={{ padding: "0 16px 18px" }}>
                          <div style={{ borderTop: "1px solid #1E1E1E", paddingTop: 16 }} />
                          <div className="edit-hint" style={{ marginBottom: 14 }}>
                            <span>✏</span> Click any field to edit
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

                            {/* Date */}
                            <div className="field-group">
                              <div className="field-label">Date</div>
                              <EditableField value={item.date} onChange={v => update(item.day, "date", v)} placeholder="e.g. 28 Apr" />
                            </div>

                            {/* Status */}
                            <div className="field-group">
                              <div className="field-label">Status</div>
                              <EditableField type="select" value={item.status} onChange={v => update(item.day, "status", v)} options={statusOptions} />
                            </div>

                            {/* Content Type */}
                            <div className="field-group">
                              <div className="field-label">Content Type</div>
                              <EditableField type="select" value={item.contentType} onChange={v => update(item.day, "contentType", v)} options={contentTypeOptions} />
                            </div>

                            {/* Format */}
                            <div className="field-group">
                              <div className="field-label">Format</div>
                              <EditableField type="select" value={item.format} onChange={v => update(item.day, "format", v)} options={formatOptions} />
                            </div>

                            {/* Location */}
                            <div className="field-group" style={{ gridColumn: "1 / -1" }}>
                              <div className="field-label">Location</div>
                              <EditableField value={item.location} onChange={v => update(item.day, "location", v)} placeholder="e.g. Juhu Beach, Bandra" />
                            </div>

                            {/* Idea/Topic */}
                            <div className="field-group" style={{ gridColumn: "1 / -1" }}>
                              <div className="field-label">Idea / Topic</div>
                              <EditableField value={item.topic} onChange={v => update(item.day, "topic", v)} placeholder="What's this post about?" />
                            </div>

                            {/* Hook Line */}
                            <div className="field-group" style={{ gridColumn: "1 / -1" }}>
                              <div className="field-label">Hook Line</div>
                              <EditableField value={item.hook} onChange={v => update(item.day, "hook", v)} placeholder="Opening line to stop the scroll..." />
                            </div>

                            {/* Notes */}
                            <div className="field-group" style={{ gridColumn: "1 / -1" }}>
                              <div className="field-label">Notes</div>
                              <textarea
                                value={item.notes}
                                onChange={e => update(item.day, "notes", e.target.value)}
                                placeholder="Filming tips, hashtags, equipment, reminders..."
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {posted === 20 && (
          <div style={{ textAlign: "center", padding: "28px 0", fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#4ADE80" }}>
            🎉 All 20 posted. You're a content machine.
          </div>
        )}

        <div style={{ textAlign: "center", padding: "20px 0 0", fontSize: 9, color: "#2A2A2A", letterSpacing: 2, textTransform: "uppercase" }}>
          Mumbai · Food Creator · 2025 ✦
        </div>
      </div>
    </div>
  );
}
