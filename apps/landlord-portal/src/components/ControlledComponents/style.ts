import { typography, useMediaQuery } from "@mui/system";
const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
);

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

    },
    controlledSelectContainer: {
        justifyContent: 'center',
		m: 0.1,
		minWidth: 230,
		// ...sx,
    },
    controlledSelectStack: {
        direction: 'row',
        alignItems:'end', 
        gap:1
    }, 
    controlledSelectTypography: {
        fontWeight: 500, 
        fontSize:'16px', 
        // color: color
    },
    secondControlledSelectTypography: {
        fontWeight: 100,
        fontSize: '12px'
    },
    controlledSelectFormControl: {
        minWidth: 230 
    },
    controlledSelectSx: {
        maxHeight: 'calc(100% - 200px)',
    },
    controlledSnackBarSx: {
        width: '100%',
        fontFamily: 'Maven Pro, sans-serif',
        fontSize: '16px',
        
    },
    controlledTextAreaSx:{
        justifyContent: 'center',
        minWidth: 150,
        m: 0.1,
        flexDirection: 'column',
        // ...sx,     
    },
    controlledTextAreaTypography:{
        fontWeight: 500,
        fontSize: '16px' 
        // color: color
    },
    secondControlledTextAreaTypography: {
        fontWeight:500,
        fontSize:'16px', 
        // color={color}
    },
    controlledTextFieldSx: {
        justifyContent: 'center',
        minWidth: 150,
        // m: 0.1,
        m: 0.3,
        flexDirection: 'column',
        // ...sx,
        
    },
    controlledTextFieldStack: {
        direction: 'row', 
        alignItems:'end', 
        gap:1
    },
    controlledTextFieldTypography: {
        fontWeight:500, 
        fontSize:'16px' 
        // color={color}
    },
    secondControlledTextFeldTypography: {
        fontWeight:100,
        fontSize:'12px'
    },
    otpInputFieldBox:{
        display: 'flex', 
        gap: 1, 
        alignItems: 'center' 
    },
    secondOtpInputField: {
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2 
    },
    textFieldWithModalSx: {
        width: { xs: '50px', sm: '250px', md: '320px' },
        height: '45px',
        padding: '0 4 0 4',
        border: { xs: 'none' },
            '& fieldset': {
        border: isSmallScreen ? 'none' : undefined,
        }, 
    },
    textFieldWithModalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
         p: 4,
    },
    textFieldWithModalTypography: {
         id:'modal-title', 
         variant:'h6', 
         component:'h2'
    },
    textFieldWithModalButton: {
        mt: 2 
    }
    
}