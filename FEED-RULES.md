# W3 Basics Feed: rules for updating

The Feed is the "The W3 Basics Feed" section (`#feed`) of the W3 Basics site. It holds six cards, all outside stories at the moment. Follow these rules each time the Feed changes.

## 1. What goes in the Feed
- **Outside story**: news or research about AI automation, Claude, or how mid-sized companies adopt AI. It must come from the original publisher or a reputable outlet and must link to that source.
- **W3 Basics perspective**: our own point of view. It is labeled "W3 Basics perspective" and shows "Full article coming soon" until the article exists. Once it exists, replace that line with a "Read more..." link.
- Never include client names, client results or numbers we cannot prove. No invented quotes, statistics or case studies.

## 2. Accuracy checks before adding a card
1. Open the source and confirm every fact on the card appears there. Figures are copied exactly, with the report or article date.
2. Name the source in the card (tag line or last sentence of the summary).
3. Describe what the source says, not what we wish it said. No claim that W3 Basics or Claude guarantees results.
4. If the source is a vendor announcement, keep the wording neutral ("launches", "reports"), not promotional.

## 3. Card format
- **Tag**: publisher or series, plus month and year, for example `Anthropic · May 2026`.
- **Headline**: one sentence, about 80 characters or fewer.
- **Summary**: about 160 characters or fewer, plain language.
- **Link**: `target="_blank" rel="noopener"` to the original source.
- **Image**: a simple illustration in the site style. If it shows numbers, they must match the source.

```html
<article class="post"><svg viewBox="0 0 320 200" aria-hidden="true">...</svg>
<div class="b"><span class="tg">Publisher · Mon YYYY</span><h3>Headline</h3><p>Summary. Source: Name.</p>
<a href="https://..." target="_blank" rel="noopener">Read more…</a></div></article>
```

## 4. Order, size and freshness
- Newest outside story first, then older ones, then W3 Basics perspective pieces. Keep the card count at six (two full rows of three).
- Review the Feed on the first working day of each month. Replace any outside story older than 12 months, or earlier if it is superseded.
- A W3 Basics perspective piece that still says "coming soon" after 90 days is either written or removed.

## 5. English and Spanish
- Every new text string needs an entry in the Spanish dictionary (`var D`), keyed by the exact English text.
- Keep publisher names, report titles and product names in their original form. Translate the headline and summary only.
- Check both languages before publishing, because the Spanish text is longer and the cards must not overflow.

## 6. Publish checklist
1. Verify facts against the source (section 2).
2. Add or replace the card and its Spanish text.
3. Check at 1280px and 390px wide, in English and Spanish: no overflow, links open the right pages.
4. Push to the deploy branch; Vercel deploys automatically.
5. Note the change (date, card, source) in the commit message.

## 7. Ownership
One person owns the monthly review (default: CEQ). If a source turns out to be wrong or is removed, pull the card the same day.
