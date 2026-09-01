import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { EVENTS } from '../src/data/events';
import { getEventMapUrl } from '../src/lib/eventMap';
import type { EventDef } from '../src/types/domain';

/**
 * Runs on a daily Vercel Cron schedule (see vercel.json). For any event
 * happening "today" (Africa/Nairobi time), emails everyone registered for
 * it with the same details shown on the Events page, plus a map link.
 *
 * Protected by CRON_SECRET so only Vercel's own cron invocation (or someone
 * who has that secret) can trigger it - this sends real email to real people.
 *
 * Manual testing: GET this endpoint with ?dryRun=true (and, off-schedule,
 * ?date=YYYY-MM-DD to simulate a specific day) with the same bearer token
 * Vercel Cron uses, to see who *would* be emailed without actually sending.
 */

function todayInNairobi(): string {
  // en-CA formats as YYYY-MM-DD, which matches EventDef.dateISO exactly.
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Nairobi' }).format(new Date());
}

function buildEmail(event: EventDef, fullName: string, mapUrl: string | null) {
  const subject = `Reminder: ${event.name} is today!`;
  const html = `
    <p>Hi ${fullName || 'there'},</p>
    <p>Just a reminder that <strong>${event.name}${event.subtitle ? `: ${event.subtitle}` : ''}</strong> is happening today. We can't wait to see you!</p>
    <ul>
      <li><strong>Date:</strong> ${event.dateLabel}</li>
      ${event.venue ? `<li><strong>Venue:</strong> ${event.venue}</li>` : ''}
      ${event.time ? `<li><strong>Time:</strong> ${event.time}</li>` : ''}
      ${event.feeAmount ? `<li><strong>Charges:</strong> Ksh ${event.feeAmount.toLocaleString()}</li>` : ''}
    </ul>
    ${mapUrl ? `<p><a href="${mapUrl}">Open the venue in Google Maps</a></p>` : ''}
    <p>See you there!<br>KAG East Assembly Youth Ministry</p>
  `;
  return { subject, html };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Missing Supabase server credentials' });
  }
  if (!gmailUser || !gmailPass) {
    return res.status(500).json({ error: 'Missing Gmail SMTP credentials' });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailPass },
  });

  const dryRun = req.query.dryRun === 'true';
  const dateParam = Array.isArray(req.query.date) ? req.query.date[0] : req.query.date;
  const targetDate = dateParam || todayInNairobi();

  const todaysEvents = EVENTS.filter((e) => e.dateISO === targetDate);
  if (todaysEvents.length === 0) {
    return res.status(200).json({ date: targetDate, message: 'No events today.' });
  }

  const results = [];

  for (const event of todaysEvents) {
    const mapUrl = getEventMapUrl(event);
    let sent = 0;
    let skipped = 0;
    let failed = 0;

    const { data: registrations, error } = await supabase
      .from('event_registrations')
      .select('user_id, full_name')
      .eq('event_slug', event.slug)
      .not('user_id', 'is', null);

    if (error) {
      results.push({ event: event.slug, error: error.message });
      continue;
    }

    const seenUserIds = new Set<string>();

    await Promise.allSettled(
      (registrations ?? []).map(async (registration) => {
        const userId = registration.user_id as string;
        if (seenUserIds.has(userId)) return;
        seenUserIds.add(userId);

        const { data: userData } = await supabase.auth.admin.getUserById(userId);
        const email = userData?.user?.email;
        if (!email) {
          skipped++;
          return;
        }

        const { subject, html } = buildEmail(event, registration.full_name ?? '', mapUrl);

        if (dryRun) {
          sent++;
          return;
        }

        try {
          await transporter.sendMail({
            from: `KAG East Assembly Youth Ministry <${gmailUser}>`,
            to: email,
            subject,
            html,
          });
          sent++;
        } catch (sendError) {
          console.error(`Failed to send reminder for ${event.slug} to ${email}:`, sendError);
          failed++;
        }
      }),
    );

    results.push({ event: event.slug, sent, skipped, failed });
  }

  return res.status(200).json({ date: targetDate, dryRun, results });
}
