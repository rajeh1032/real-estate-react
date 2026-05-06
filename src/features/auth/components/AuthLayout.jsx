export function AuthLayout({ children, imageUrl, stats }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Panel - Image */}
      <div className="relative flex-[1.1] overflow-hidden bg-[#0d1117]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `
              linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%),
              url('${imageUrl}')
            `,
          }}
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-9">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
            The Architectural Editorial
          </span>
          
          <div>
            {children}
            
            {stats && (
              <div className="mt-8 flex gap-8">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="font-serif text-3xl font-bold text-green-400">{stat.value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <span className="text-[10px] tracking-wide text-white/25">
            © 2024 Beaumont Architectural Editorial. All rights reserved.
          </span>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-[440px] shrink-0 items-center justify-center overflow-y-auto bg-white px-11 py-8 shadow-[-20px_0_60px_rgba(0,0,0,0.06)]">
        {children}
      </div>
    </div>
  )
}

export function AuthHero({ title, subtitle }) {
  return (
    <>
      <h1 className="mb-5 font-serif text-5xl font-extrabold leading-tight text-white">
        {title.split('<br />').map((line, index) => (
          <span key={index}>
            {line}
            {index < title.split('<br />').length - 1 && <br />}
          </span>
        ))}
      </h1>
      <p className="max-w-xs text-sm font-light leading-relaxed text-white/60">
        {subtitle}
      </p>
    </>
  )
}
