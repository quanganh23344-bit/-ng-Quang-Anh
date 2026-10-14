import React from 'react';
import { School } from '../types/school';

interface TrendChartProps {
  schools: School[];
  compact?: boolean;
}

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626'];

export const TrendChart: React.FC<TrendChartProps> = ({ schools, compact = false }) => {
  if (!schools || schools.length === 0) return null;

  const years = ['2023', '2024', '2025', '2026'];

  // Collect all score values to determine min/max
  const allScores = schools.flatMap(s => [
    s.scores.year2023,
    s.scores.year2024,
    s.scores.year2025,
    s.scores.year2026
  ]);

  const rawMin = Math.min(...allScores);
  const rawMax = Math.max(...allScores);
  const padding = (rawMax - rawMin) * 0.15 || 2;
  const minVal = Math.floor(Math.max(0, rawMin - padding));
  const maxVal = Math.ceil(rawMax + padding);

  const height = compact ? 80 : 240;
  const width = compact ? 180 : 500;
  const margin = compact 
    ? { top: 10, right: 12, bottom: 20, left: 12 }
    : { top: 25, right: 35, bottom: 35, left: 45 };

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const getX = (index: number) => margin.left + (index / (years.length - 1)) * chartWidth;
  const getY = (val: number) => margin.top + chartHeight - ((val - minVal) / (maxVal - minVal || 1)) * chartHeight;

  return (
    <div className="w-full select-none overflow-hidden">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-auto overflow-visible"
      >
        {/* Background Grid Lines (only in non-compact mode) */}
        {!compact && (
          <g className="opacity-20 text-slate-400">
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const y = margin.top + chartHeight * (1 - pct);
              const scoreLabel = (minVal + pct * (maxVal - minVal)).toFixed(1);
              return (
                <g key={idx}>
                  <line
                    x1={margin.left}
                    y1={y}
                    x2={width - margin.right}
                    y2={y}
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <text
                    x={margin.left - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="text-[11px] font-medium fill-slate-500"
                  >
                    {scoreLabel}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* X-Axis labels */}
        {years.map((year, idx) => {
          const x = getX(idx);
          return (
            <g key={year}>
              {!compact && (
                <line
                  x1={x}
                  y1={margin.top}
                  x2={x}
                  y2={margin.top + chartHeight}
                  stroke="#cbd5e1"
                  strokeOpacity="0.4"
                  strokeDasharray="2 2"
                />
              )}
              <text
                x={x}
                y={height - (compact ? 4 : 10)}
                textAnchor="middle"
                className={`font-semibold fill-slate-600 ${compact ? 'text-[10px]' : 'text-[12px]'}`}
              >
                {year}
              </text>
            </g>
          );
        })}

        {/* Render each school's line */}
        {schools.map((school, sIdx) => {
          const color = COLORS[sIdx % COLORS.length];
          const points = [
            { year: '2023', score: school.scores.year2023 },
            { year: '2024', score: school.scores.year2024 },
            { year: '2025', score: school.scores.year2025 },
            { year: '2026', score: school.scores.year2026 },
          ].map((pt, idx) => ({
            ...pt,
            x: getX(idx),
            y: getY(pt.score),
          }));

          const pathD = points.reduce(
            (acc, curr, idx) => (idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`),
            ''
          );

          return (
            <g key={school.id}>
              {/* Line shadow */}
              <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={compact ? "2.5" : "3.5"}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Data points */}
              {points.map((pt, pIdx) => (
                <g key={pIdx} className="group cursor-pointer">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={compact ? (pIdx === 3 ? 4 : 3) : 5}
                    fill={pIdx === 3 ? color : '#ffffff'}
                    stroke={color}
                    strokeWidth={compact ? 2 : 2.5}
                    className="transition-transform hover:scale-125"
                  />
                  {!compact && (
                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      textAnchor="middle"
                      className="text-[11px] font-bold fill-slate-800"
                    >
                      {pt.score.toFixed(2)}
                    </text>
                  )}
                </g>
              ))}
            </g>
          );
        })}
      </svg>

      {/* Legend for multiple schools */}
      {!compact && schools.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-3 pt-3 border-t border-slate-100">
          {schools.map((s, idx) => (
            <div key={s.id} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <span 
                className="w-3 h-3 rounded-full inline-block" 
                style={{ backgroundColor: COLORS[idx % COLORS.length] }} 
              />
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
