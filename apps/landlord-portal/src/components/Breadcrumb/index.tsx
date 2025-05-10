import { FC, useContext, useMemo } from 'react';
import {
	BreadcrumbContext,
	BreadcrumbItem,
} from '../../context/BreadcrumbContext/BreadcrumbContext';
import { useDynamicBreadcrumbs } from '../../hooks/useDynamicBreadcrumbs'; // adjust path as needed
import { useNavigate } from 'react-router-dom';
import { Typography, Breadcrumbs, Link, Icon } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import { styles } from './style';

export const Breadcrumb: FC = () => {
	const navigate = useNavigate();
	const { breadcrumbs } = useDynamicBreadcrumbs();
	const { breadcrumbLabels } = useContext(BreadcrumbContext);

	const enrichedBreadcrumbs = useMemo(
		() =>
			breadcrumbs.map((item) => ({
				...item,
				label: breadcrumbLabels[item.path]?.label || item.label,
			})),
		[breadcrumbs, breadcrumbLabels],
	);

	const renderPathWithIcon = (item: BreadcrumbItem, idx: number) => {
		return (
			<Link
				key={`${item.path}-${idx}`}
				color='inherit'
				underline='hover'
				onClick={() => navigate(item.path || '/')}
				sx={{ cursor: 'pointer' }}
				aria-label={item.label}
			>
				{item.showIcon && item.icon}
				{item.label}
			</Link>
		);
	};

	// Pass the enrichedBreadcrumbs to your shared component
	try {
		const bread_crumbs = enrichedBreadcrumbs.map((item, idx) => {
			const isLast = idx === enrichedBreadcrumbs.length - 1;
			if (item.isHome) {
				return (
					<HomeIcon
						key={`${item.path}-${idx}`}
						sx={{ ...styles.iconStyle, cursor: 'pointer' }}
						onClick={() => navigate('/')}
						aria-label='Home'
					/>
				);
			} else if (item.isSectionRoot) {
				return <Icon key={`${item.path}-${idx}`} sx={{ cursor: 'pointer' }}>{item.icon}</Icon>;
			} else if (isLast) {
				return (
					<Typography
						sx={styles.textStyle}
						key={`${item.path}-${idx}`}
						fontWeight={700}
					>
						{item.label}
					</Typography>
				);
			} else {
				return renderPathWithIcon(item, idx);
			}
		});
		return (
			<Breadcrumbs
				separator={
					<ArrowForwardIosIcon
						sx={{ ...styles.iconStyle, ...styles.arrowIconStyle }}
					/>
				}
				aria-label='breadcrumb'
				sx={styles.breadCrumbStyle}
			>
				{bread_crumbs}
			</Breadcrumbs>
		);
	} catch (error) {
		console.error('Breadcrumb render error:', error);
		return <div>Breadcrumb failed to render</div>;
	}
};
