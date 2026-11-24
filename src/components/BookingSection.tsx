import { useEffect, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import {
  DIRECT_EMAIL,
  DIRECT_PHONE,
  DIRECT_TELEGRAM,
  DIRECT_TELEGRAM_URL,
  PROFILE_INFO,
} from '../data/portfolioData';

interface BookingSectionProps {
  preselectedProjectType?: string;
}

interface FormState {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const PROJECT_TYPES = [
  'TikTok & Short-Form Social',
  'Commercial & Branded Video',
  'Educational & Instructional Video',
  'Interior & Product Showcase',
  'Color Grading & Graphic Design',
];

const BUDGET_RANGES = [
  'Single Project / Short-Form Pack',
  'Monthly Part-Time Retainer',
  'Commercial Campaign Production',
  'Let’s Discuss Scope & Timeline',
];

export function BookingSection({ preselectedProjectType }: BookingSectionProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    projectType: preselectedProjectType || PROJECT_TYPES[0],
    budget: BUDGET_RANGES[0],
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | 'telegram' | null>(null);

  useEffect(() => {
    if (preselectedProjectType && PROJECT_TYPES.includes(preselectedProjectType)) {
      setForm((prev) => ({ ...prev, projectType: preselectedProjectType }));
      setSubmittedRef(null);
    }
  }, [preselectedProjectType]);

  const handleCopy = async (value: string, field: 'email' | 'phone' | 'telegram') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2400);
    } catch {
      setCopiedField(null);
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.message.trim().length < 12) {
      nextErrors.message = 'Share a few details about your footage, project goals, or timeline.';
    }
    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const code = `KT-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setSubmittedRef(code);
  };

  const mailtoHref = `mailto:${DIRECT_EMAIL}?subject=${encodeURIComponent(
    `Project Inquiry: ${form.projectType} (${form.name || 'New Client'})`
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nProject Type: ${form.projectType}\nEngagement / Budget: ${form.budget}\n\nProject Details:\n${form.message}`
  )}`;

  return (
    <section id="contact" className="border-t border-[#242424] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact & Social Channels */}
          <div className="lg:col-span-5 space-y-9">
            <div>
              <p className="text-sm font-medium text-[#FF3B30] mb-3">
                Book a Project
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Let’s bring your next TikTok or brand video to life.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                Available for freelance and part-time video editing, videography, motion graphics, and graphic design—on-site in Addis Ababa and remotely worldwide.
              </p>
            </div>

            {/* Direct Contact Details */}
            <div className="space-y-5 border-t border-[#242424] pt-8">
              {/* Email */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-zinc-400">Direct Email</span>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${DIRECT_EMAIL}`}
                    className="inline-flex items-center gap-2.5 font-display text-lg font-semibold text-white hover:text-[#FF3B30] transition-colors"
                  >
                    <Mail className="h-4 w-4 text-[#FF3B30]" aria-hidden="true" />
                    <span>{DIRECT_EMAIL}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(DIRECT_EMAIL, 'email')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#242424] bg-[#141414] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-zinc-400">Phone</span>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${DIRECT_PHONE}`}
                    className="inline-flex items-center gap-2.5 font-mono text-base font-medium tabular-nums text-white hover:text-[#FF3B30] transition-colors"
                  >
                    <Phone className="h-4 w-4 text-[#FF3B30]" aria-hidden="true" />
                    <span>{DIRECT_PHONE}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(DIRECT_PHONE, 'phone')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#242424] bg-[#141414] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Telegram */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-zinc-400">Telegram</span>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={DIRECT_TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 font-mono text-base font-medium text-white hover:text-[#FF3B30] transition-colors"
                  >
                    <Send className="h-4 w-4 text-[#FF3B30]" aria-hidden="true" />
                    <span>{DIRECT_TELEGRAM}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(DIRECT_TELEGRAM, 'telegram')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#242424] bg-[#141414] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]"
                  >
                    {copiedField === 'telegram' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2.5 text-sm text-zinc-300 pt-1">
                <MapPin className="h-4 w-4 text-[#FF3B30] shrink-0" aria-hidden="true" />
                <span>{PROFILE_INFO.location} · Available for part-time &amp; freelance</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Validated Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#242424] bg-[#141414] p-6 sm:p-8 lg:p-10">
              {submittedRef ? (
                <div className="py-6 space-y-6" role="status" aria-live="polite">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <CheckCircle2 className="h-7 w-7 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-display text-2xl font-bold text-white">
                        Project Brief Received
                      </p>
                      <p className="text-xs font-mono tabular-nums text-zinc-400 mt-0.5">
                        Reference {submittedRef}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                    Thanks, <span className="text-white font-medium">{form.name}</span>. Your brief for{' '}
                    <span className="text-white font-medium">{form.projectType}</span> ({form.budget}) is ready. Kalkidan will follow up at{' '}
                    <span className="text-white font-medium">{form.email}</span> within one business day.
                  </p>

                  <div className="border-y border-[#242424] py-4 space-y-2 text-sm text-zinc-400">
                    <div className="flex justify-between gap-4">
                      <span>Project Scope</span>
                      <span className="text-zinc-100 text-right">{form.projectType}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Estimated Budget</span>
                      <span className="font-mono tabular-nums text-zinc-100 text-right">{form.budget}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#FF3B30] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E02E24] transition-colors whitespace-nowrap shrink-0"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>Open in Email App</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedRef(null);
                        setForm({
                          name: '',
                          email: '',
                          projectType: PROJECT_TYPES[0],
                          budget: BUDGET_RANGES[1],
                          message: '',
                        });
                      }}
                      className="inline-flex items-center rounded-lg border border-[#242424] bg-[#0A0A0A] px-5 py-2.5 text-sm font-medium text-zinc-200 hover:border-zinc-500 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-sm font-medium text-zinc-200 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, name: e.target.value }));
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Alex Rivera"
                        aria-invalid={Boolean(errors.name)}
                        className="w-full rounded-lg border border-[#242424] bg-[#0A0A0A] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#FF3B30] focus:outline-none focus:ring-1 focus:ring-[#FF3B30]"
                      />
                      {errors.name && (
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-[#FF3B30]" role="alert">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-email"
                        className="block text-sm font-medium text-zinc-200 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="alex@brand.com"
                        aria-invalid={Boolean(errors.email)}
                        className="w-full rounded-lg border border-[#242424] bg-[#0A0A0A] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#FF3B30] focus:outline-none focus:ring-1 focus:ring-[#FF3B30]"
                      />
                      {errors.email && (
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-[#FF3B30]" role="alert">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="booking-type"
                        className="block text-sm font-medium text-zinc-200 mb-2"
                      >
                        Project Type
                      </label>
                      <select
                        id="booking-type"
                        value={form.projectType}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, projectType: e.target.value }))
                        }
                        className="w-full rounded-lg border border-[#242424] bg-[#0A0A0A] px-4 py-3 text-sm text-white focus:border-[#FF3B30] focus:outline-none focus:ring-1 focus:ring-[#FF3B30]"
                      >
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type} className="bg-[#141414] text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="booking-budget"
                        className="block text-sm font-medium text-zinc-200 mb-2"
                      >
                        Budget Range
                      </label>
                      <select
                        id="booking-budget"
                        value={form.budget}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, budget: e.target.value }))
                        }
                        className="w-full rounded-lg border border-[#242424] bg-[#0A0A0A] px-4 py-3 text-sm text-white focus:border-[#FF3B30] focus:outline-none focus:ring-1 focus:ring-[#FF3B30]"
                      >
                        {BUDGET_RANGES.map((range) => (
                          <option key={range} value={range} className="bg-[#141414] text-white">
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-message"
                      className="block text-sm font-medium text-zinc-200 mb-2"
                    >
                      Project Details & Links
                    </label>
                    <textarea
                      id="booking-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, message: e.target.value }));
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Share your TikTok handle, number of videos per month, style references, and target launch date..."
                      aria-invalid={Boolean(errors.message)}
                      className="w-full rounded-lg border border-[#242424] bg-[#0A0A0A] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#FF3B30] focus:outline-none focus:ring-1 focus:ring-[#FF3B30] resize-y"
                    />
                    {errors.message && (
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-[#FF3B30]" role="alert">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                    <span className="text-xs text-zinc-400">
                      No commitment required · Free 15-minute creative intro call
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF3B30] px-6 py-3 text-sm font-semibold text-white hover:bg-[#E02E24] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span>Send Project Inquiry</span>
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
