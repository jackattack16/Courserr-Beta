import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type Class from "../assets/Class";

import CustomTooltip from './ChartTooltip.tsx';

interface chartProps {
  course: Class;
  subjectClass: string;
}

export type AxisTicksControlsType = {
  scale: "linear" | "symlog";
};

const gradeToNumber: Record<string, number> = {
  F: 0,
  "D-": 1,
  D: 2,
  "D+": 3,
  "C-": 4,
  C: 5,
  "C+": 6,
  "B-": 7,
  B: 8,
  "B+": 9,
  "A-": 10,
  A: 11,
  "A+": 12,
};

// Calculate stats for each grade
function calculateGradeStats(data: { grade: number; hours: number }[]) {
  const gradeMap = new Map<number, number[]>();
  
  for (const point of data) {
    const existing = gradeMap.get(point.grade);
    if (existing) {
      existing.push(point.hours);
    } else {
      gradeMap.set(point.grade, [point.hours]);
    }
  }

  const result: { 
    grade: number; 
    gradeLabel: string;
    min: number; 
    q1: number; 
    median: number; 
    q3: number; 
    max: number;
    count: number;
  }[] = [];

  for (const [gradeNum, hoursList] of gradeMap) {
    hoursList.sort((a, b) => a - b);
    const n = hoursList.length;
    
    const q1Index = Math.floor(n * 0.25);
    const medianIndex = Math.floor(n * 0.5);
    const q3Index = Math.floor(n * 0.75);

    const gradeLabel = Object.entries(gradeToNumber).find(([, v]) => v === gradeNum)?.[0] || '';

    result.push({
      grade: gradeNum,
      gradeLabel,
      min: hoursList[0],
      q1: hoursList[q1Index],
      median: hoursList[medianIndex],
      q3: hoursList[q3Index],
      max: hoursList[n - 1],
      count: n,
    });
  }

  return result.sort((a, b) => a.grade - b.grade);
}

function Chart({ course, subjectClass }: chartProps) {
  const grades: string[] = course.getAllGrades();
  const hours: number[] = course.getTimePerWeekLog();

  const data = grades.map((g, i) => ({
    grade: gradeToNumber[g],
    hours: hours[i],
  }));

  const gradeStats = calculateGradeStats(data);
  
  // Calculate actual max for Y-axis
  const allHours = hours.filter(h => h !== undefined && h !== null);
  const maxHours = Math.max(...allHours);
  
  // Dynamic Y-axis - no hardcoded max
  const yDomain = [0, maxHours + 2];

  // Get colors based on subject class
  const chartColors: Record<string, { data: string; line: string; grid: string }> = {
    agriculture: { data: '#4A5D3F', line: '#333A28', grid: 'rgba(74, 93, 63, 0.25)' },
    cte: { data: '#37474F', line: '#263238', grid: 'rgba(55, 71, 79, 0.25)' },
    arts: { data: '#5D4037', line: '#3E2723', grid: 'rgba(93, 64, 55, 0.25)' },
    business: { data: '#5D4037', line: '#3E2723', grid: 'rgba(93, 64, 55, 0.25)' },
    career: { data: '#4E342E', line: '#3E2723', grid: 'rgba(78, 52, 46, 0.25)' },
    english: { data: '#558B2F', line: '#33691E', grid: 'rgba(85, 139, 47, 0.25)' },
    health: { data: '#C62828', line: '#B71C1C', grid: 'rgba(198, 40, 40, 0.25)' },
    humanservices: { data: '#6A1B9A', line: '#4A148C', grid: 'rgba(106, 27, 154, 0.25)' },
    informationsolutions: { data: '#00838F', line: '#006064', grid: 'rgba(0, 131, 143, 0.25)' },
    mathematics: { data: '#283593', line: '#1A237E', grid: 'rgba(40, 53, 147, 0.25)' },
    music: { data: '#EF6C00', line: '#E65100', grid: 'rgba(239, 108, 0, 0.25)' },
    physical: { data: '#2E7D32', line: '#1B5E20', grid: 'rgba(46, 125, 50, 0.25)' },
    science: { data: '#33691E', line: '#1B5E20', grid: 'rgba(51, 105, 30, 0.25)' },
    socialstudies: { data: '#B71C1C', line: '#880E4F', grid: 'rgba(183, 28, 28, 0.25)' },
    language: { data: '#00695C', line: '#004D40', grid: 'rgba(0, 105, 92, 0.25)' },
    misc: { data: '#37474F', line: '#263238', grid: 'rgba(55, 71, 79, 0.25)' },
  };

  const colors = chartColors[subjectClass] || chartColors.misc;
  
  const hasData = data.length > 0 && data.some(d => d.hours !== null && d.hours !== undefined);

  if (!hasData) {
    return (
      <div className={`chart-container ${subjectClass}`}>
        <div className="chart-area">
          <div className="no-data-message">
            <p>No data to show yet.</p>
            <p>Leave a review to add some!</p>
          </div>
        </div>
      </div>
    );
  }

  // Transform data for stacked bars - each segment is positioned at the right height
  const stackedData = gradeStats.map(entry => ({
    gradeLabel: entry.gradeLabel,
    // First segment: 0 to min (transparent spacer)
    spacer: entry.min,
    // Second segment: min to median
    belowMedian: entry.median - entry.min,
    // Third segment: median to max
    aboveMedian: entry.max - entry.median,
    // Store full stats for tooltip
    min: entry.min,
    median: entry.median,
    max: entry.max,
    q1: entry.q1,
    q3: entry.q3,
    count: entry.count,
  }));

  return (
    <div className={`chart-container ${subjectClass}`}>
      <h3 className="chart-title">Grade vs. Hours per Week</h3>
      <div className="chart-legend">
        <div className="chart-legend-item">
          <div className="chart-legend-dot" style={{ backgroundColor: colors.data }}></div>
          <span>Time Distribution</span>
        </div>
      </div>
      <div className={`chart-area ${subjectClass}`}>
        <ResponsiveContainer width="100%" height="100%" style={{background: "none"}}>
        <BarChart
          data={stackedData}
          style={{background: "none"}}
          margin={{ top: 10, right: 10, left: -40, bottom: 0 }}
          stackOffset="sign"
        >
          <CartesianGrid stroke={colors.grid} strokeDasharray="3 3" />
          <XAxis
            dataKey="gradeLabel"
            type="category"
            ticks={["F", "D", "C", "B", "A"]}
            stroke="var(--text-color, #333)"
            tick={{ fill: 'var(--text-color, #333)', fontSize: 11 }}
            interval={0}
          />
          <YAxis 
            stroke="var(--text-color, #333)"
            tick={{ fill: 'var(--text-color, #333)', fontSize: 11 }}
            domain={yDomain}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--light-lifted-bg)' }} animationDuration={100} />
          
          {/* Transparent spacer from 0 to min */}
          <Bar dataKey="spacer" stackId="a" fill="transparent" barSize={50} />
          
          {/* Colored bar from min to median */}
          <Bar dataKey="belowMedian" stackId="a" fill={colors.line} stroke={colors.line} strokeWidth={2} barSize={50} />
          
          {/* Colored bar from median to max */}
          <Bar dataKey="aboveMedian" stackId="a" fill={colors.data} stroke={colors.line} strokeWidth={2} barSize={50} />
          
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;
