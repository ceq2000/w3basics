// Vercel serverless function: emails the contact form to the inbox via Resend.
// Env vars (Vercel > Project > Settings > Environment Variables):
//   RESEND_API_KEY  required
//   CONTACT_TO      optional, defaults to ceq@me.com (the Resend test sender only delivers to the account owner)
//   CONTACT_FROM    optional, defaults to Resend's onboarding sender
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ success: false });
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  if (b._honey) return res.status(200).json({ success: true });
  const first = String(b.first_name || '').trim().slice(0, 100);
  const last = String(b.last_name || '').trim().slice(0, 100);
  const name = (first + ' ' + last).trim();
  const company = String(b.company || '').trim().slice(0, 200);
  const focus = String(b.focus || '').trim().slice(0, 100);
  const email = String(b.email || '').trim().slice(0, 200);
  const message = String(b.message || '').trim().slice(0, 5000);
  if (!first || !last || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false });
  if (!process.env.RESEND_API_KEY) return res.status(500).json({ success: false });
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'GDS <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || 'ceq@me.com'],
      reply_to: email,
      subject: 'GDS contact form: ' + name + (company ? ' (' + company + ')' : ''),
      html: '<p><b>Name:</b> ' + esc(name) + '</p><p><b>Email:</b> ' + esc(email) + '</p><p><b>Company:</b> ' + esc(company) + '</p><p><b>Focus area:</b> ' + esc(focus) + '</p><p><b>What they want to solve:</b></p><p>' + esc(message).replace(/\n/g, '<br>') + '</p>',
    }),
  });
  return res.status(r.ok ? 200 : 502).json({ success: r.ok });
};
