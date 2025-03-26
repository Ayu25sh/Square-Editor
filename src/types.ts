export interface SquareProperties {
  color: string;
  size: number;
}

export interface BreakpointProperties {
  sm?: SquareProperties;
  md?: SquareProperties;
  lg: SquareProperties;
}

export type Breakpoint = 'sm' | 'md' | 'lg';

export const breakpointRanges = {
  sm: { min: 320, max: 640 },
  md: { min: 641, max: 1024 },
  lg: { min: 1025, max: Infinity }
};