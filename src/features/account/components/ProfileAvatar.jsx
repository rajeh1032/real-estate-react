function getInitials(name, email) {
  const source = name || email || 'Member'
  const parts = source.trim().split(/\s+/).slice(0, 2)
  return parts.map((part) => part.charAt(0).toUpperCase()).join('')
}

export function ProfileAvatar({ profile }) {
  const initials = getInitials(profile.name, profile.email)

  if (profile.avatar) {
    return (
      <img
        src={profile.avatar}
        alt={profile.name}
        className="h-40 w-40 rounded-lg object-cover shadow-soft ring-1 ring-border sm:h-48 sm:w-48"
      />
    )
  }

  return (
    <img
      src="/assets/images/user_image.png"
      alt={profile.name}
      className="h-40 w-40 rounded-lg object-cover shadow-soft ring-1 ring-border sm:h-48 sm:w-48"
    />
  )
}
