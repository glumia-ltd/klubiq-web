import { Box } from '@mui/material';

interface DynamicGridProps {
    columns?: number;
    rows?: number;
    children: React.ReactNode;
    spacing?: number;
}

const DynamicGrid = ({ columns = 1, children, spacing = 2 }: DynamicGridProps) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridAutoRows: 'auto',
                gap: spacing,
                width: '100%',
                '& > *': {
                    minWidth: 0, // Allows items to shrink below their minimum content size
                }
            }}
        >
            {children}
        </Box>
    );
};
// For more complex layouts with responsive columns:
const ResponsiveDynamicGrid = ({ children, spacing = 2 }: DynamicGridProps) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',                    // 1 column on mobile
                    sm: 'repeat(2, 1fr)',         // 2 columns on tablet
                    md: 'repeat(3, 1fr)',         // 3 columns on desktop
                    lg: 'repeat(4, 1fr)',         // 4 columns on large screens
                },
                gap: spacing,
                width: '100%',
                '& > *': {
                    minWidth: 0,
                }
            }}
        >
            {children}
        </Box>
    );
};

// For a flex-based approach:
const FlexGrid = ({ columns = 1, children, spacing = 2 }: DynamicGridProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: spacing,
                width: '100%',
                '& > *': {
                    flex: {
                        xs: `1 1 100%`,                           // Full width on mobile
                        sm: `1 1 calc(50% - ${spacing * 4}px)`,  // 2 columns on tablet
                        md: `1 1 calc(${100 / columns}% - ${spacing * 4}px)`, // Specified columns
                    },
                    minWidth: 0,
                }
            }}
        >
            {children}
        </Box>
    );
};


export { DynamicGrid, ResponsiveDynamicGrid, FlexGrid };