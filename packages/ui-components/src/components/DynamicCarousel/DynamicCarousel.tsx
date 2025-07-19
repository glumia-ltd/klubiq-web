import React, { useState, useEffect, useRef } from 'react';
import {
	Box,
	Card,
	CardMedia,
	Typography,
	IconButton,
	Skeleton,
	Stack,
	useTheme,
	useMediaQuery,
	ButtonBase,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

export type CarouselImage = {
	src: string;
	caption?: string;
	alt?: string;
};

export type DynamicCarouselProps = {
	images: CarouselImage[];
	variant?: 'dots' | 'bars' | 'arrows';
	loading?: boolean;
	height?: number | string;
	autoPlay?: boolean;
	interval?: number;
	sx?: object;
	showThumbnails?: boolean;
};

const DOT_SIZE = 10;
const BAR_WIDTH = 24;
const BAR_HEIGHT = 4;
const THUMB_SIZE = 48;

export const DynamicCarousel: React.FC<DynamicCarouselProps> = ({
	images,
	variant = 'dots',
	loading = false,
	height = 320,
	autoPlay = false,
	interval = 4000,
	sx = {},
	showThumbnails = true,
}) => {
	const [current, setCurrent] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const total = images.length;

	// Looping logic
	const goTo = (idx: number) => setCurrent((idx + total) % total);
	const handlePrev = () => goTo(current - 1);
	const handleNext = () => goTo(current + 1);

	// AutoPlay logic
	useEffect(() => {
		if (autoPlay && !isHovered && !loading && total > 1) {
			timerRef.current = setTimeout(() => handleNext(), interval);
			return () => clearTimeout(timerRef.current!);
		}
		return () => timerRef.current && clearTimeout(timerRef.current);
	}, [autoPlay, isHovered, current, loading, interval, total]);

	// Keyboard navigation
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				handlePrev();
			}
			if (e.key === 'ArrowRight') {
				handleNext();
			}
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	});

	// Render navigator
	const renderNavigator = () => {
		if (variant === 'dots') {
			return (
				<Stack direction='row' spacing={1} justifyContent='center' mt={2}>
					{images.map((_, idx) => (
						<ButtonBase
							key={idx}
							onClick={() => goTo(idx)}
							aria-label={`Go to slide ${idx + 1}`}
							sx={{
								width: DOT_SIZE,
								height: DOT_SIZE,
								borderRadius: '50%',
								bgcolor: idx === current ? 'primary.main' : 'grey.400',
								transition: 'background 0.2s',
							}}
							tabIndex={0}
						/>
					))}
				</Stack>
			);
		}
		if (variant === 'bars') {
			return (
				<Stack direction='row' spacing={1} justifyContent='center' mt={2}>
					{images.map((_, idx) => (
						<ButtonBase
							key={idx}
							onClick={() => goTo(idx)}
							aria-label={`Go to slide ${idx + 1}`}
							sx={{
								width: BAR_WIDTH,
								height: BAR_HEIGHT,
								borderRadius: 2,
								bgcolor: idx === current ? 'primary.main' : 'grey.400',
								transition: 'background 0.2s',
							}}
							tabIndex={0}
						/>
					))}
				</Stack>
			);
		}
		if (variant === 'arrows') {
			return (
				<Stack
					direction='row'
					spacing={2}
					justifyContent='center'
					alignItems='center'
					mt={2}
				>
					<IconButton
						onClick={handlePrev}
						aria-label='Previous image'
						size='large'
					>
						<ArrowBackIos />
					</IconButton>
					<Typography variant='body2' color='text.secondary'>
						{current + 1} / {total}
					</Typography>
					<IconButton onClick={handleNext} aria-label='Next image' size='large'>
						<ArrowForwardIos />
					</IconButton>
				</Stack>
			);
		}
		return null;
	};

	// Render thumbnails
	const renderThumbnails = () => {
		if (!showThumbnails || total <= 1) {
			return null;
		}
		return (
			<Stack direction='row' spacing={1} justifyContent='center' mt={2}>
				{images.map((img, idx) => (
					<ButtonBase
						key={idx}
						onClick={() => goTo(idx)}
						sx={{
							border:
								idx === current
									? `2px solid ${theme.palette.primary.main}`
									: '2px solid transparent',
							borderRadius: 2,
							overflow: 'hidden',
							width: THUMB_SIZE,
							height: THUMB_SIZE,
							opacity: idx === current ? 1 : 0.6,
							transition: 'border 0.2s, opacity 0.2s',
						}}
						aria-label={`Thumbnail for slide ${idx + 1}`}
						tabIndex={0}
					>
						<CardMedia
							component='img'
							src={img.src}
							alt={img.alt || img.caption || `carousel image ${idx + 1}`}
							sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
						/>
					</ButtonBase>
				))}
			</Stack>
		);
	};

	// Main render
	return (
		<Card
			sx={{
				width: '100%',
				maxWidth: 600,
				mx: 'auto',
				p: 0,
				borderRadius: 3,
				boxShadow: 2,
				...sx,
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Box
				sx={{
					position: 'relative',
					width: '100%',
					height: height,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					bgcolor: 'grey.100',
					overflow: 'hidden',
				}}
			>
				{loading ? (
					<Skeleton variant='rectangular' width='100%' height={height} />
				) : (
					<CardMedia
						component='img'
						src={images[current]?.src}
						alt={
							images[current]?.alt ||
							images[current]?.caption ||
							`carousel image ${current + 1}`
						}
						sx={{
							width: '100%',
							height: height,
							objectFit: 'cover',
							transition: 'opacity 0.3s',
						}}
					/>
				)}
				{/* Arrows overlay for all variants if more than 1 image */}
				{total > 1 && (
					<>
						<IconButton
							onClick={handlePrev}
							aria-label='Previous image'
							sx={{
								position: 'absolute',
								left: 8,
								top: '50%',
								transform: 'translateY(-50%)',
								bgcolor: 'rgba(255,255,255,0.7)',
								'&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
								display: { xs: 'none', sm: 'flex' },
							}}
							size='large'
						>
							<ArrowBackIos />
						</IconButton>
						<IconButton
							onClick={handleNext}
							aria-label='Next image'
							sx={{
								position: 'absolute',
								right: 8,
								top: '50%',
								transform: 'translateY(-50%)',
								bgcolor: 'rgba(255,255,255,0.7)',
								'&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
								display: { xs: 'none', sm: 'flex' },
							}}
							size='large'
						>
							<ArrowForwardIos />
						</IconButton>
					</>
				)}
			</Box>
			{/* Caption */}
			<Box
				sx={{
					p: 2,
					minHeight: 48,
					bgcolor: 'background.paper',
					textAlign: 'center',
				}}
			>
				{loading ? (
					<Skeleton variant='text' width='60%' sx={{ mx: 'auto' }} />
				) : (
					<Typography variant='body1' color='text.secondary'>
						{images[current]?.caption}
					</Typography>
				)}
			</Box>
			{/* Navigator */}
			{total > 1 && renderNavigator()}
			{/* Thumbnails */}
			{showThumbnails && renderThumbnails()}
		</Card>
	);
};

export default DynamicCarousel;
