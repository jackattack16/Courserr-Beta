import '../Styles/Chart.css';

interface CustomTooltipProps {
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      gradeLabel?: string;
      min?: number;
      max?: number;
      median?: number;
      q1?: number;
      q3?: number;
      count?: number;
    };
  }>;
  label?: string;
  active?: boolean;
}

function CustomTooltip({ payload, active }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  // Get the main data from the payload
  const data = payload[0]?.payload;
  
  if (!data?.gradeLabel) {
    return null;
  }


  return (
    <div className="chart-tooltip grainy-bg-blur">
      <div className="tooltip-row" style={{ fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '4px', marginBottom: '4px' }}>
        <span className="tooltip-label">Grade:</span>
        <span className="tooltip-value" style={{ fontSize: '1rem' }}>{data.gradeLabel}</span>
      </div>
      
      {data.count !== undefined && (
        <div className="tooltip-row">
          <span className="tooltip-label">Students:</span>
          <span className="tooltip-value">{data.count} people</span>
        </div>
      )}
      
      {data.median !== undefined && (
        <div className="tooltip-row">
          <span className="tooltip-label">Median:</span>
          <span className="tooltip-value">{data.median} hrs/week</span>
        </div>
      )}
      
      {data.min !== undefined && data.max !== undefined && (
        <div className="tooltip-row">
          <span className="tooltip-label">Range:</span>
          <span className="tooltip-value">{(data.min === data.max) ? data.min : (data.min + "-"  + data.max)} hrs</span>
        </div>
      )}
      
      {data.q1 !== undefined && data.q3 !== undefined && (
        <div className="tooltip-row">
          <span className="tooltip-label">Most students:</span>
          <span className="tooltip-value">{(data.q1 === data.q3) ? data.q1 : (data.q1 + "-"  + data.q3)} hrs</span>
        </div>
      )}
    </div>
  );
}

export default CustomTooltip;
