'use client';

import { useState } from 'react';
import { z } from 'zod';
import { leadSchema } from '@/schemas/lead.schema';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

type FormData = z.infer<typeof leadSchema>;

export default function MultiStepLeadForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackEvent } = useAnalytics();

  const [formData, setFormData] = useState<Partial<FormData>>({
    url: '',
    name: '',
    email: '',
    goal: undefined,
    budget: undefined,
    honeypot: '',
  });

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      if (!formData.goal) {
        setError('Please select a goal to continue.');
        return;
      }
      trackEvent('form_start', { metadata: { goal: formData.goal } });
    }
    if (step === 2) {
      if (!formData.budget) {
        setError('Please select a budget range to continue.');
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Client-side validation
      const validData = leadSchema.parse(formData);

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors?.[0]?.message || 'Failed to submit proposal request.');
      }

      setIsSuccess(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-12 text-center shadow-glossy dark:border-gray-800 dark:bg-gray-900">
        <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
        <h3 className="mb-2 text-2xl font-bold">Proposal Requested</h3>
        <p className="text-gray-500 dark:text-gray-400">
          We&apos;ve received your information. A senior strategist will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 shadow-glossy dark:border-gray-800 dark:bg-gray-900" id="contact">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Get Your Strategy</h3>
        <span className="text-sm font-medium text-gray-500">Step {step} of 3</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Invisible honeypot */}
        <input
          type="text"
          name="honeypot"
          className="hidden"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* STEP 1: LOW INTENT (GOAL) */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <label className="block text-lg font-medium">What is your primary goal?</label>
            <div className="grid gap-3">
              {[
                { id: 'leads', label: 'Generate More Leads' },
                { id: 'sales', label: 'Increase Online Sales' },
                { id: 'traffic', label: 'Drive Organic Traffic' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, goal: option.id as FormData['goal'] });
                    setError(null);
                  }}
                  className={`rounded-lg border p-4 text-left font-medium transition-all ${
                    formData.goal === option.id
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                      : 'border-gray-200 hover:border-black dark:border-gray-700 dark:hover:border-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-black p-4 font-bold text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-black"
            >
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}

        {/* STEP 2: QUALIFICATION (BUDGET) */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <label className="block text-lg font-medium">What is your monthly marketing budget?</label>
            <div className="grid gap-3">
              {[
                { id: 'under_5k', label: 'Under $5,000' },
                { id: '5k_10k', label: '$5,000 - $10,000' },
                { id: '10k_plus', label: '$10,000+' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, budget: option.id as FormData['budget'] });
                    setError(null);
                  }}
                  className={`rounded-lg border p-4 text-left font-medium transition-all ${
                    formData.budget === option.id
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                      : 'border-gray-200 hover:border-black dark:border-gray-700 dark:hover:border-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-lg border border-gray-200 px-6 py-4 font-medium transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex flex-1 items-center justify-center rounded-lg bg-black p-4 font-bold text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-black"
              >
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: HIGH INTENT (CONTACT INFO) */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <label className="block text-lg font-medium">Where should we send your strategy?</label>
            
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-lg border border-gray-200 bg-transparent p-4 outline-none focus:border-black dark:border-gray-700 dark:focus:border-white"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Work Email"
                  className="w-full rounded-lg border border-gray-200 bg-transparent p-4 outline-none focus:border-black dark:border-gray-700 dark:focus:border-white"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="url"
                  placeholder="Website URL (Optional)"
                  className="w-full rounded-lg border border-gray-200 bg-transparent p-4 outline-none focus:border-black dark:border-gray-700 dark:focus:border-white"
                  value={formData.url || ''}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-lg border border-gray-200 px-6 py-4 font-medium transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex flex-1 items-center justify-center rounded-lg bg-black p-4 font-bold text-white transition-opacity hover:opacity-80 disabled:opacity-50 dark:bg-white dark:text-black"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  'Request Proposal'
                )}
              </button>
            </div>
            <p className="text-center text-xs text-gray-500">
              Your data is encrypted. We do not do high-pressure sales calls.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
