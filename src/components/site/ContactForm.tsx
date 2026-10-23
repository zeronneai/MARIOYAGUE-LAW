import { useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { trackFormSubmit } from '../../lib/analytics';

/** El formulario de consulta (mismo Formspree de siempre). Lo usan la home y el panel lateral. */
export function ContactForm({ source }: { source: string }) {
  const { language, t } = useLanguage();
  const es = language === 'es';
  const options: string[] = t.contact.form.options;
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', phone: '', email: '', caseType: options[0], message: '' });

  const set = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/xvzwyvjd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, source, language }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackFormSubmit(source, { case_type: form.caseType });
      setStatus('success');
      setForm({ name: '', phone: '', email: '', caseType: options[0], message: '' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-toro" />
        <h3 className="poster mt-4 text-5xl text-guinda">{es ? '¡Listo!' : 'Got it!'}</h3>
        <p className="mt-3 max-w-sm text-ink/70">
          {es ? 'El Toro revisa tu caso personalmente y te contactamos muy pronto.' : 'El Toro will review your case personally and we will contact you shortly.'}
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-6 font-bold text-guinda underline">
          {es ? 'Enviar otro mensaje' : 'Send another message'}
        </button>
      </div>
    );
  }

  const field = 'w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-[16px] outline-none transition focus:border-toro focus:bg-white';
  const label = 'mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-ink/60';
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className={label}>{t.contact.form.name}</span>
        <input name="name" required autoComplete="name" value={form.name} onChange={set} className={field} />
      </label>
      <label className="block">
        <span className={label}>{t.contact.form.phone}</span>
        <input name="phone" type="tel" required autoComplete="tel" value={form.phone} onChange={set} className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>{t.contact.form.email}</span>
        <input name="email" type="email" required autoComplete="email" value={form.email} onChange={set} className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>{t.contact.form.caseType}</span>
        <select name="caseType" value={form.caseType} onChange={set} className={field}>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>{t.contact.form.message}</span>
        <textarea name="message" required rows={4} value={form.message} onChange={set} className={field} placeholder={t.contact.form.placeholderMessage} />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === 'loading'} className="btn-toro w-full !py-4 !text-base disabled:opacity-60">
          {status === 'loading' ? (es ? 'Enviando...' : 'Sending...') : t.contact.form.submit}
          <ArrowRight className="h-5 w-5" />
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink/50">
          <Lock className="h-3 w-3" /> {t.contact.form.privacy}
        </p>
        {status === 'error' ? (
          <p className="mt-2 text-center text-sm font-semibold text-toro">
            {es ? 'No se pudo enviar. Intenta de nuevo o llámanos.' : 'It did not go through. Try again or give us a call.'}
          </p>
        ) : null}
      </div>
    </form>
  );
}
