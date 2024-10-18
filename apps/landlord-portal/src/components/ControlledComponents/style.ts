import { typography } from "@mui/system";
import ControlledNumberField from "./ControlledNumberField";

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
    }
    
    
}