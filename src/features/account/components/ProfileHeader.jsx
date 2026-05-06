import { ProfileAvatar } from './ProfileAvatar'

export function ProfileHeader({ profile, propertyCount }) {
  const propertyCountLabel = propertyCount === 1 ? '1 property' : `${propertyCount} properties`

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-soft">
      <div className="absolute inset-x-0 top-0 h-36 bg-accent" />
      <div className="relative px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end">
          <ProfileAvatar profile={profile} />

          <div className="min-w-0 flex-1 pb-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-foreground/80 lg:text-text-muted">
              Verified Profile
            </p>
            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <h1 className="break-words text-4xl font-semibold tracking-tight text-white lg:text-6xl lg:text-text">
                  {profile.name}
                </h1>
                <p className="mt-2 text-sm font-medium text-white/75 lg:text-text-muted">
                  {profile.email}
                </p>
              </div>
              <div className="inline-flex w-fit rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                {propertyCountLabel}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem label="Name" value={profile.name} />
          <InfoItem label="Email" value={profile.email} />
          <InfoItem label="Phone" value={profile.phone} />
          <InfoItem label="Address" value={profile.address} />
        </div>
      </div>
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-lg border border-border/80 bg-card/80 px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">
        {label}
      </p>
      <p className="mt-1 min-h-6 text-sm font-semibold text-text">
        {value || 'Not provided'}
      </p>
    </div>
  )
}
