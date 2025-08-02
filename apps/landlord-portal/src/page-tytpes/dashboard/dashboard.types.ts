// Dashboard Types for React Application

// Property count by type
export interface PropertyCountByType {
  typeId: string;
  displayText: string;
  count: number;
}

// Monthly series data
export interface MonthlySeries {
  month: number;              // 1–12
  year: number;               // calendar year
  count: number;              // count for that month/year
  changeIndicator: 'positive' | 'negative' | 'neutral';
}

// Difference result for comparisons
export interface DiffResult {
  percentChange: number;
  changeIndicator: 'positive' | 'negative' | 'neutral';
}

// Revenue series data
export interface RevenueSeries {
  year: number;
  month: number;
  revenue: number;
  pctChange: number;
  changeIndicator: 'positive' | 'negative' | 'neutral';
}

// Occupancy series data
export interface OccupancySeries {
  period: string;             // e.g. '2025-07'
  rate: number;
  pctChange: number;
  changeIndicator: 'positive' | 'negative' | 'neutral';
}

// Total window difference data
export interface TotalWindowDiff {
  totalCurrent: number;
  totalPrev: number;
  percentChange: number;
  changeIndicator: 'positive' | 'negative' | 'neutral';
}

// Revenue series with window data
export interface RevenueSeriesWithWindow {
  series: RevenueSeries[];
  window: TotalWindowDiff;
}

// Comparative metrics data
export interface ComparativeMetrics {
  propertyCreation: DiffResult;
  activeTenants: DiffResult;
  activeLeases: DiffResult;
  revenue: DiffResult;
  occupancyRate: DiffResult;
}

// Organization metrics data
export interface OrganizationMetrics {
  // Rent overdue
  totalRentOverdue: number;
  overdueRentCount: number;

  // Properties
  totalProperties: number;
  propertiesCreatedDiffPercent: number;
  propertiesCreatedChangeIndicator: 'positive' | 'negative' | 'neutral';
  monthlyPropertiesSeries: MonthlySeries[];
  propertyCountByType: PropertyCountByType[];

  // Units
  totalUnits: number;
  vacantUnits: number;
  occupiedUnits: number;

  // Occupancy
  occupancyRate: number;
  occupancyRateDiffPercent: number;
  occupancyRateChangeIndicator: 'positive' | 'negative' | 'neutral';

  // Leases
  activeLeasesCount: number;
  leasesExpiringSoonCount: number;
  activeLeasesTenantsCount: number;

  // Revenue
  monthlyRevenueSeries: RevenueSeries[];
  totalRevenueWindow: TotalWindowDiff;
}

// Dashboard API response types
export interface DashboardMetricsResponse {
  organizationMetrics: OrganizationMetrics;
  comparativeMetrics: ComparativeMetrics;
  propertyCountByType: PropertyCountByType[];
}

// Dashboard store state types
export interface DashboardState {
  metrics: DashboardMetricsResponse | null;
  isLoading: boolean;
  error: string | null;
}

// Dashboard hook return types
export interface UseDashboardReturn {
  metrics: DashboardMetricsResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

// Component prop types
export interface DashboardMetricsProps {
  metrics: OrganizationMetrics;
  loading?: boolean;
}

export interface ComparativeMetricsProps {
  metrics: ComparativeMetrics;
  loading?: boolean;
}

export interface PropertyCountByTypeProps {
  data: PropertyCountByType[];
  loading?: boolean;
}

export interface RevenueSeriesProps {
  data: RevenueSeries[];
  window: TotalWindowDiff;
  loading?: boolean;
}

export interface OccupancySeriesProps {
  data: OccupancySeries[];
  loading?: boolean;
}

// Utility types for change indicators
export type ChangeIndicator = 'positive' | 'negative' | 'neutral';

// Type guards for runtime type checking
export const isPositiveChange = (indicator: ChangeIndicator): boolean => 
  indicator === 'positive';

export const isNegativeChange = (indicator: ChangeIndicator): boolean => 
  indicator === 'negative';

export const isNeutralChange = (indicator: ChangeIndicator): boolean => 
  indicator === 'neutral';

// Helper function to get change indicator color
export const getChangeIndicatorColor = (indicator: ChangeIndicator): string => {
  switch (indicator) { 
    case 'positive':
      return '#4caf50'; // Green
    case 'negative':
      return '#f44336'; // Red
    case 'neutral':
      return '#9e9e9e'; // Gray
    default:
      return '#9e9e9e';
  }
};

export interface PropertyCountByType {
  typeId: string;
  displayText: string;
  count: number;
}

// Helper function to format percentage change
export const formatPercentageChange = (percentChange: number): string => {
  const sign = percentChange >= 0 ? '+' : '';
  return `${sign}${percentChange.toFixed(1)}%`;
};

// Helper function to format currency
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Helper function to format month/year
export const formatMonthYear = (month: number, year: number): string => {
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  });
}; 