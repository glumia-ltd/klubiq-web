import { Theme } from "@mui/material";

export const contentCardSx = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    p: 2,
    minHeight: '90vh',
    height: '90%',
    borderRadius: 2,
};
export const tabSx = (theme: Theme) => ({
    mb: 3,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    minHeight: 40,
    '&.Mui-selected': {
        backgroundColor: theme.palette.secondary.light,
        color: 'white',
    },
    '&.MuiTab-root:hover': {
        backgroundColor: theme.palette.secondary.light,
        cursor: 'pointer',
        color: 'white',
    },
});