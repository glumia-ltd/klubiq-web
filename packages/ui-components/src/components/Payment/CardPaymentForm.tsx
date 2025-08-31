import React, {
	useState,
	useEffect,
	useImperativeHandle,
	forwardRef,
} from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import {
	Box,
	Stack,
	Typography,
	TextField,
	FormControl,
	Select,
	MenuItem,
	FormHelperText,
	Checkbox,
	FormControlLabel,
	useTheme,
	useMediaQuery,
	SxProps,
	Theme,
} from '@mui/material';
import { CreditCard } from '@mui/icons-material';

// Card type detection and validation
export const CARD_TYPES = {
	visa: { pattern: /^4/, name: 'Visa', icon: '💳' },
	mastercard: { pattern: /^5[1-5]/, name: 'Mastercard', icon: '💳' },
	amex: { pattern: /^3[47]/, name: 'American Express', icon: '💳' },
	discover: { pattern: /^6(?:011|5)/, name: 'Discover', icon: '💳' },
	jcb: { pattern: /^(?:2131|1800|35\d{3})/, name: 'JCB', icon: '💳' },
	diners: { pattern: /^3(?:0[0-5]|[68])/, name: 'Diners Club', icon: '💳' },
} as const;

export type CardType = keyof typeof CARD_TYPES;

// Zod schema for form validation
export const cardPaymentSchema = z.object({
	cardNumber: z
		.string()
		.min(13, 'Card number must be at least 13 digits')
		.max(19, 'Card number must not exceed 19 digits'),
	cardholderName: z.string().min(1, 'Cardholder name is required'),
	expiryMonth: z.string().min(1, 'Expiry month is required'),
	expiryYear: z.string().min(1, 'Expiry year is required'),
	cvv: z
		.string()
		.min(3, 'CVV must be at least 3 digits')
		.max(4, 'CVV must not exceed 4 digits'),
	saveCard: z.boolean().optional(),
});

export type CardPaymentFormData = z.infer<typeof cardPaymentSchema>;

export interface CardPaymentFormProps {
	initialValues?: Partial<CardPaymentFormData>;
	showSaveCardOption?: boolean;
	onFormChange?: (data: CardPaymentFormData, isValid: boolean) => void;
	sx?: SxProps<Theme>;
	header?: React.ReactNode;
	subHeader?: React.ReactNode;
	showPinOption?: boolean;
}

export interface CardPaymentFormRef {
	getFormData: () => CardPaymentFormData;
	validateForm: () => Promise<boolean>;
	resetForm: () => void;
	setFormData: (data: Partial<CardPaymentFormData>) => void;
}

export const CardPaymentForm = forwardRef<
	CardPaymentFormRef,
	CardPaymentFormProps
>(
	(
		{
			initialValues = {},
			showSaveCardOption = true,
			onFormChange,
			sx = {},
			header,
			subHeader,
			showPinOption = false,
		},
		ref,
	) => {
		const theme = useTheme();
		const [detectedCardType, setDetectedCardType] = useState<CardType | null>(
			null,
		);
		const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

		const form = useForm({
			defaultValues: {
				cardNumber: '',
				cardholderName: '',
				expiryMonth: '',
				expiryYear: '',
				cvv: '',
				saveCard: false,
				pin: '',
				...initialValues,
			},
			onSubmit: async ({ value }) => {
				// Form submission handled by parent
			},
		});

		// Expose form methods to parent via ref
		useImperativeHandle(ref, () => ({
			getFormData: () => ({
				cardNumber: form.getFieldValue('cardNumber'),
				cardholderName: form.getFieldValue('cardholderName'),
				expiryMonth: form.getFieldValue('expiryMonth'),
				expiryYear: form.getFieldValue('expiryYear'),
				cvv: form.getFieldValue('cvv'),
				saveCard: form.getFieldValue('saveCard'),
				pin: form.getFieldValue('pin'),
			}),
			validateForm: async () => {
				try {
					const formData = {
						cardNumber: form.getFieldValue('cardNumber'),
						cardholderName: form.getFieldValue('cardholderName'),
						expiryMonth: form.getFieldValue('expiryMonth'),
						expiryYear: form.getFieldValue('expiryYear'),
						cvv: form.getFieldValue('cvv'),
						saveCard: form.getFieldValue('saveCard'),
						pin: form.getFieldValue('pin'),
					};
					cardPaymentSchema.parse(formData);
					return true;
				} catch {
					return false;
				}
			},
			resetForm: () => form.reset(),
			setFormData: (data: Partial<CardPaymentFormData>) => {
				Object.entries(data).forEach(([key, value]) => {
					form.setFieldValue(key as keyof CardPaymentFormData, value);
				});
			},
		}));

		// Notify parent of form changes
		useEffect(() => {
			if (onFormChange) {
				const formData = {
					cardNumber: form.getFieldValue('cardNumber'),
					cardholderName: form.getFieldValue('cardholderName'),
					expiryMonth: form.getFieldValue('expiryMonth'),
					expiryYear: form.getFieldValue('expiryYear'),
					cvv: form.getFieldValue('cvv'),
					saveCard: form.getFieldValue('saveCard'),
					pin: form.getFieldValue('pin'),
				};
				const isValid = Object.keys(form.state.errors).length === 0;
				onFormChange(formData, isValid);
			}
		}, [form.state.errors, onFormChange]);

		// Update detected card type when card number changes
		useEffect(() => {
			const cardNumber = form.getFieldValue('cardNumber').replace(/\s/g, '');
			let detectedType: CardType | null = null;

			for (const [type, cardInfo] of Object.entries(CARD_TYPES)) {
				if (cardInfo.pattern.test(cardNumber)) {
					detectedType = type as CardType;
					break;
				}
			}

			setDetectedCardType(detectedType);
		}, [form.getFieldValue('cardNumber')]);

		// Format card number with spaces
		const formatCardNumber = (value: string) => {
			const digits = value.replace(/\D/g, '');
			const groups = digits.match(/.{1,4}/g);
			return groups ? groups.join(' ') : digits;
		};

		// Get card icon size based on screen size
		const getCardIconSize = () => {
			if (isMobile) {
				return 1.5;
			}
			if (useMediaQuery(theme.breakpoints.down('md'))) {
				return 2;
			}
			return 2.5;
		};

		// Helper function to get field error
		const getFieldError = (fieldName: string) => {
			const { errors } = form.state;
			if (Array.isArray(errors)) {
				return (
					(errors as any[]).find((error) => error?.field === fieldName)
						?.message || ''
				);
			}
			return errors?.[fieldName as keyof typeof errors] || '';
		};

		// Helper function to check if field has error
		const hasFieldError = (fieldName: string) => {
			const { errors } = form.state;
			if (Array.isArray(errors)) {
				return (errors as any[]).some((error) => error?.field === fieldName);
			}
			return !!errors?.[fieldName as keyof typeof errors];
		};

		return (
			<Box sx={{ width: '100%', ...sx }}>
				{header && (
					<Typography
						variant='h6'
						sx={{
							mb: 2,
						}}
					>
						{header}
					</Typography>
				)}

				{subHeader && (
					<Typography
						variant='body2'
						sx={{
							mb: 3,
							color: 'text.secondary',
							fontSize: isMobile ? '0.875rem' : '1rem',
						}}
					>
						{subHeader}
					</Typography>
				)}
				<Box>
					<Stack spacing={3} sx={{ width: '100%' }}>
						{/* Card Number Field */}
						<Box>
							<Typography
								variant='body2'
								sx={{
									mb: 1,
									fontWeight: 500,
									color: 'text.primary',
								}}
							>
								Card Number
							</Typography>
							<TextField
								fullWidth
								placeholder='1234 5678 9012 3456'
								value={form.getFieldValue('cardNumber')}
								onChange={(e) => {
									const formatted = formatCardNumber(e.target.value);
									form.setFieldValue('cardNumber', formatted);
								}}
								onBlur={() => form.validateField('cardNumber', 'blur')}
								error={hasFieldError('cardNumber')}
								helperText={getFieldError('cardNumber')}
								InputProps={{
									startAdornment: (
										<Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
											{detectedCardType ? (
												<Typography
													sx={{
														fontSize: getCardIconSize() * 8,
														mr: 1,
													}}
												>
													{CARD_TYPES[detectedCardType].icon}
												</Typography>
											) : (
												<CreditCard
													sx={{
														fontSize: getCardIconSize() * 8,
														color: 'text.secondary',
														mr: 1,
													}}
												/>
											)}
										</Box>
									),
								}}
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 2,
									},
								}}
							/>
						</Box>

						{/* Cardholder Name Field */}
						<Box>
							<Typography
								variant='body2'
								sx={{
									mb: 1,
									fontWeight: 500,
									color: 'text.primary',
								}}
							>
								Cardholder Name
							</Typography>
							<TextField
								fullWidth
								placeholder='John Doe'
								value={form.getFieldValue('cardholderName')}
								onChange={(e) => {
									form.setFieldValue('cardholderName', e.target.value);
								}}
								onBlur={() => form.validateField('cardholderName', 'blur')}
								error={hasFieldError('cardholderName')}
								helperText={getFieldError('cardholderName')}
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 2,
									},
								}}
							/>
						</Box>

						{/* Month, Year, and CVV Row - Responsive Stack */}
						<Stack
							direction={isMobile ? 'column' : 'row'}
							spacing={isMobile ? 1 : 2}
							sx={{ width: '100%' }}
						>
							{/* Month Field */}
							<Box sx={{ width: isMobile ? '100%' : showPinOption ? '25%' : '33.33%' }}>
								<Typography
									variant='body2'
									sx={{
										mb: 1,
										fontWeight: 500,
										color: 'text.primary',
									}}
								>
									Month
								</Typography>
								<FormControl fullWidth error={hasFieldError('expiryMonth')}>
									<Select
										value={form.getFieldValue('expiryMonth')}
										onChange={(e) => {
											form.setFieldValue('expiryMonth', e.target.value);
										}}
										onBlur={() => form.validateField('expiryMonth', 'blur')}
										displayEmpty
										sx={{
											borderRadius: 2,
										}}
									>
										<MenuItem value='' disabled>
											Month
										</MenuItem>
										{Array.from({ length: 12 }, (_, i) => i + 1).map(
											(month) => (
												<MenuItem
													key={month}
													value={month.toString().padStart(2, '0')}
												>
													{month.toString().padStart(2, '0')}
												</MenuItem>
											),
										)}
									</Select>
									{hasFieldError('expiryMonth') && (
										<FormHelperText>
											{getFieldError('expiryMonth')}
										</FormHelperText>
									)}
								</FormControl>
							</Box>

							{/* Year Field */}
							<Box sx={{ width: isMobile ? '100%' : showPinOption ? '25%' : '33.33%' }}>
								<Typography
									variant='body2'
									sx={{
										mb: 1,
										fontWeight: 500,
										color: 'text.primary',
									}}
								>
									Year
								</Typography>
								<FormControl fullWidth error={hasFieldError('expiryYear')}>
									<Select
										value={form.getFieldValue('expiryYear')}
										onChange={(e) => {
											form.setFieldValue('expiryYear', e.target.value);
										}}
										onBlur={() => form.validateField('expiryYear', 'blur')}
										displayEmpty
										sx={{
											borderRadius: 2,
										}}
									>
										<MenuItem value='' disabled>
											Year
										</MenuItem>
										{Array.from(
											{ length: 21 },
											(_, i) => new Date().getFullYear() + i,
										).map((year) => (
											<MenuItem key={year} value={year.toString()}>
												{year}
											</MenuItem>
										))}
									</Select>
									{hasFieldError('expiryYear') && (
										<FormHelperText>
											{getFieldError('expiryYear')}
										</FormHelperText>
									)}
								</FormControl>
							</Box>

							{/* CVV Field */}
							<Box sx={{ width: isMobile ? '100%' : showPinOption ? '25%' : '33.33%' }}>
								<Typography
									variant='body2'
									sx={{
										mb: 1,
										fontWeight: 500,
										color: 'text.primary',
									}}
								>
									CVV
								</Typography>
								<TextField
									fullWidth
									placeholder='123'
									value={form.getFieldValue('cvv')}
									onChange={(e) => {
										const value = e.target.value.replace(/\D/g, '');
										form.setFieldValue('cvv', value);
									}}
									onBlur={() => form.validateField('cvv', 'blur')}
									error={hasFieldError('cvv')}
									helperText={getFieldError('cvv')}
									inputProps={{
										minLength: 3,
										maxLength: 4,
									}}
									sx={{
										'& .MuiOutlinedInput-root': {
											borderRadius: 2,
										},
									}}
								/>
							</Box>
                            {/* Pin Field */}
							{showPinOption && <Box sx={{ width: isMobile ? '100%' : '25%' }}>
								<Typography
									variant='body2'
									sx={{
										mb: 1,
										fontWeight: 500,
										color: 'text.primary',
									}}
								>
									PIN
								</Typography>
								<TextField
									fullWidth
									placeholder='1234'
									value={form.getFieldValue('pin')}
									onChange={(e) => {
										const value = e.target.value.replace(/\D/g, '');
										form.setFieldValue('pin', value);
									}}
									onBlur={() => form.validateField('pin', 'blur')}
									error={hasFieldError('pin')}
									helperText={getFieldError('pin')}
									inputProps={{
										maxLength: 4,
                                        minLength: 4,
									}}
									sx={{
										'& .MuiOutlinedInput-root': {
											borderRadius: 2,
										},
									}}
								/>
							</Box>}
						</Stack>

						{/* Save Card Option */}
						{showSaveCardOption && (
							<Box>
								<FormControlLabel
									control={
										<Checkbox
											checked={form.getFieldValue('saveCard')}
											onChange={(e) => {
												form.setFieldValue('saveCard', e.target.checked);
											}}
											sx={{
												'&.Mui-checked': {
													color: theme.palette.primary.main,
												},
											}}
										/>
									}
									label={
										<Typography
											variant='body2'
											sx={{ color: 'text.secondary' }}
										>
											Save this card for future payments
										</Typography>
									}
								/>
							</Box>
						)}
					</Stack>
				</Box>
			</Box>
		);
	},
);
