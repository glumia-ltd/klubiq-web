import { typography } from "@mui/system";

export const styles = {
    container: {
        justifyContent: 'center',
		m: 0.2,
		minWidth: 230,
		// ...sx,
    },
    formcontrol: {
        m: 1, 
        minWidth: 230 
    },
    typography: {
        fontWeight: 500, 
        fontSize: '16px'
    },
    checkboxcontainer:{
        m: 0,
		minWidth: 230,
		flexDirection: 'row',
		// ...sx,
    },
    formControlLabel: { 
        mr: 5, 
        mb: 0 
    },
    formHelperText:{
         marginLeft: '1.2rem' 

    },
    controlledNumberFieldContainer: {
        justifyContent: 'center',
		minWidth: 150,
		m: 0.3,
		flexDirection: 'column',
		// ...sx,
    },
    controlledNumberFieldTypography: {
        fontWeight: 500,
        fontSize: '16px',
        // color: {color}
    },
    controlledPhoneInputContainer: {
        justifyContent: 'center',
		minWidth: 230,
		m: 0.1,
		flexDirection: 'column',
		// ...sx,
    },
    controlledPhoneInputTypography: {
        fontWeight: 500, 
        fontSize: '16px'
    },
    controlledPinFieldContainer: {
        
            justifyContent: 'center',
            minWidth: 4,
            m: 0.1,
            // ...sx,      
    },
    controlledPinFieldTextField: {
        fontSize: '16px'

    }
    
}