import { useCallback, useMemo } from 'react';
import * as Popover from "@radix-ui/react-popover";
import '../Styles/TextIconButton.css'
import '../Styles/Dialouge.css'
import Icon from "./Icon";
import FilterChip from "./FilterChip";
import filters, { type FilterCategory } from "../assets/filters";
import type { FilterState } from '../assets/filterTypes';
import { filtersCount } from '../assets/filterTypes';

interface filterDialougeProps {
  isMobile: boolean;
  activeFilters: FilterState;
  setActiveFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

function FilterDialouge({ isMobile, activeFilters, setActiveFilters }: filterDialougeProps) {
  const count = useMemo(() => filtersCount(activeFilters), [activeFilters]);

  const toggleFilter = useCallback((category: FilterCategory, value: string) => {
    setActiveFilters(prev => {
      const current = prev[category];
      if (category === "DualCredit") {
        const updated = current.includes(value)
          ? current.filter(v => v !== value)
          : [value];
        return { ...prev, [category]: updated};
      }
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  }, [setActiveFilters]);

  const resetFilters = useCallback(() => {
    setActiveFilters({ Subject: [], ClassType: [], Duration: [], DualCredit: [], GradeLevel: [] });
  }, [setActiveFilters]);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className='text-icon-button'>
          {isMobile ? "" : "Filters"}
          {count > 0 && <span className="filter-badge">{count}</span>}
          <Icon name='tune'></Icon>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={8} align="end" role="dialog" aria-label="Filters">
          <div className="filter-dialouge-header">
            <h1 className="DialogTitle">Filters</h1>
            <Popover.Close asChild>
              <button className="IconButton" aria-label="Close">
                <Icon name="close"></Icon>
              </button>
            </Popover.Close>
          </div>
          <hr />
          <div className="filter-dialouge-content">
            <div className="filter-dialouge-filter-holder">
              <h2>Subject</h2>
              <div className="filter-chip-holder">
                {filters.Subject.map((text, index) => (
                  <FilterChip
                    text={text}
                    key={index}
                    selected={activeFilters.Subject.includes(text)}
                    onToggle={(v) => toggleFilter('Subject', v)}
                  />
                ))}
              </div>
            </div>
            <div className="filter-dialouge-filter-holder">
              <h2>Class Type</h2>
              <div className="filter-chip-holder">
                {filters.ClassType.map((text, index) => (
                  <FilterChip
                    text={text}
                    key={index}
                    selected={activeFilters.ClassType.includes(text)}
                    onToggle={(v) => toggleFilter('ClassType', v)}
                  />
                ))}
              </div>
            </div>
            <div className="filter-dialouge-filter-holder">
              <h2>Duration</h2>
              <div className="filter-chip-holder">
                {filters.Duration.map((text, index) => (
                  <FilterChip
                    text={text}
                    key={index}
                    selected={activeFilters.Duration.includes(text)}
                    onToggle={(v) => toggleFilter('Duration', v)}
                  />
                ))}
              </div>
            </div>
            <div className="filter-dialouge-filter-holder">
              <h2>Dual Credit</h2>
              <div className="filter-chip-holder">
                {filters.DualCredit.map((text, index) => (
                  <FilterChip
                    text={text}
                    key={index}
                    selected={activeFilters.DualCredit.includes(text)}
                    onToggle={(v) => toggleFilter('DualCredit', v)}
                  />
                ))}
              </div>
            </div>
            <div className="filter-dialouge-filter-holder">
              <h2>Grade Level</h2>
              <div className="filter-chip-holder">
                {filters.GradeLevel.map((text, index) => (
                  <FilterChip
                    text={text}
                    key={index}
                    selected={activeFilters.GradeLevel.includes(text)}
                    onToggle={(v) => toggleFilter('GradeLevel', v)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="filter-dialouge-footer">
            {count > 0 && <button className="Button reset-button" onClick={resetFilters}>Reset all</button>}
            <Popover.Close asChild>
              <button className="Button green">Done</button>
            </Popover.Close>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default FilterDialouge;
