export type IconProps = {
	color?: string;
	width?: number;
	height?: number;
	/** Whether to scale icon according to font-size. Sets width and height to 1em. */
	autoSize?: boolean;
	/** Props to pass directly to svg element */
	svgProps?: React.SVGProps<SVGSVGElement>;
} & Omit<React.HTMLProps<HTMLSpanElement>, 'color' | 'size'>;

export const IconWrapper: React.FC<{ icon: React.ReactNode } & IconProps> = ({
	icon,
	color: colorProp,
	width: widthProp,
	height: heightProp,
	autoSize,
	...restProps
}) => {
	const color = colorProp ? colorProp : 'currentColor';
	const width = widthProp ? `${widthProp}px` : autoSize ? '28px' : '28px';
	const height = heightProp ? `${heightProp}px` : autoSize ? '28px' : '28px';

	return (
		<span
			role='img'
			aria-hidden='true'
			style={{
				color: color,
				width,
				height,
				display: 'inline-flex',
				fontSize: 'inherit',
			}}
			{...restProps}
		>
			{icon}
		</span>
	);
};
