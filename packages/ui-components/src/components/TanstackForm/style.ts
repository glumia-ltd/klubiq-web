export const style = {
	container: {
		width: '100%',
		height: '100%',
		position: 'relative',
	},
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    formGroupRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
    },
    fieldStack: {
        justifyContent: 'center',
        m: 0.3,
        flexDirection: 'column',
        spacing: 1.2,
    },  
    
};



export const gridStyle = (columns: number, rows: number) => {
	return {
        container: {
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, auto)`,
            gap: 2,
            width: '100%',
            '& > *': {
                minWidth: `calc((100% - ${(columns - 1) * 16}px) / ${columns})`,
            }
        }
	};
};