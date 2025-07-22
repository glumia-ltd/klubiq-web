import { Avatar, AvatarGroup, AvatarProps, Box } from '@mui/material'

interface GroupedAvatarProps {
  avatars: {
    src?: string
    alt: string
    sx?: AvatarProps['sx']
  }[]
  max?: number
  size?: 'small' | 'medium' | 'large'
  spacing?: number
  variant?: 'circular' | 'square'
}

const GroupedAvatar = ({
  avatars,
  max = 4,
  size = 'medium',
  spacing = -0.5,
  variant = 'circular',
}: GroupedAvatarProps) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 24
      case 'medium':
        return 32
      case 'large':
        return 40
      default:
        return 32
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AvatarGroup
        max={max}
        spacing={spacing}
        sx={{
          '& .MuiAvatar-root': {
            width: getSize(),
            height: getSize(),
            fontSize: size === 'small' ? '0.75rem' : '1rem',
          },
        }}
      >
        {avatars.map((avatar, index) => (
          <Avatar
            key={index}
            src={avatar.src}
            alt={avatar.alt}
            variant={variant}
            sx={avatar.sx}
          />
        ))}
      </AvatarGroup>
    </Box>
  )
}

export default GroupedAvatar 