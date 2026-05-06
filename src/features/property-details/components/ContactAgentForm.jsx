import React from 'react';

const ContactAgentForm = ({ agent }) => {
  return (
    <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-soft transition-colors duration-300">
      {/* Agent Info */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
          <img
            src={agent.image}
            alt="Agent"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg leading-tight text-text">
            {agent.name}
          </h3>
          <p className="text-text-muted text-xs">{agent.role}</p>
        </div>
      </div>

      {/* Contact Form */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1 font-bold">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full bg-surface border border-border rounded-xl p-3 text-sm text-text focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1 font-bold">
            Email Address
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full bg-surface border border-border rounded-xl p-3 text-sm text-text focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1 font-bold">
            Your Message
          </label>
          <textarea
            rows="4"
            placeholder="I am interested in a private showing..."
            className="w-full bg-surface border border-border rounded-xl p-3 text-sm text-text focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50 resize-none"></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-all active:scale-[0.98] mt-2 shadow-lg shadow-primary/20">
          CONTACT AGENT
        </button>
      </form>
    </div>
  );
};

export default ContactAgentForm;
