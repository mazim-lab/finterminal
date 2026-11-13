// Display-time cleanup for scraped welcome-bonus copy.
//
// Issuer marketing text arrives with footnote markers glued to words
// ("points1", "value11.", "$3,000*", "Aeroplan®*") and typographic dashes.
// The stored data stays exactly as scraped; this formatter only tidies what a
// reader sees. It is deliberately conservative:
//   * it never edits a digit that belongs to a number. A footnote marker is
//     only removed when it is glued to the END of a lowercase word (3+ letters),
//     to a trademark sign, or to a sentence-ending period, so "70,000",
//     "$1,550", "3x", "1.25%", "Q3", "A380" and "Scene+" pass through untouched;
//   * en dashes, em dashes and minus signs become "to" between two numbers
//     ("5\u201310" reads "5 to 10") and a plain hyphen everywhere else;
//   * asterisks, daggers and superscript digits used as footnote marks go.
// Pure string in, string out, no imports, so it runs in the browser bundle
// and under `node --test` alike.

const DASHES = /[\u2012\u2013\u2014\u2015\u2212]/;

export function formatBonusText(input: string | null | undefined): string {
  if (!input) return '';
  let t = String(input);

  // Footnote symbols: asterisks, daggers, and superscript digits.
  t = t.replace(/[*\u2020\u2021\u00b9\u00b2\u00b3\u2070\u2074-\u2079]+/g, '');

  // A 1 or 2 digit marker glued to a trademark sign: "Rewards®1 points".
  t = t.replace(/([®™])\d{1,2}(?![\d.,%x])/g, '$1');

  // A 1 or 2 digit marker glued to the end of a lowercase word of 3+ letters:
  // "points1 that", "value11." Never touches a token that starts with a digit
  // or ends in a capital letter, and never a digit followed by more digits,
  // a decimal point plus digit, a percent sign or an "x" multiplier.
  t = t.replace(/(\b[A-Za-z]*[a-z]{3})\d{1,2}(?=$|[\s,;:!?)\]]|\.(?!\d))/g, '$1');

  // A marker glued after a sentence period at the end of the text or before a
  // space: "in value.12" or "in value.12 Terms apply". "1.25" is safe because
  // the character before the period must be a letter.
  t = t.replace(/([a-z])\.\d{1,2}(?=$|\s)/g, '$1.');

  // Dashes. Between two numbers (optionally with $, %, or k) read "to".
  t = t.replace(/(\d[\d,.]*%?)\s*[\u2012\u2013\u2014\u2015\u2212]\s*(?=\$?\d)/g, '$1 to ');
  // Anything left becomes a plain hyphen, keeping the spacing around it.
  if (DASHES.test(t)) t = t.replace(/[\u2012\u2013\u2014\u2015\u2212]/g, '-');

  // Tidy whitespace the removals may have left behind.
  t = t.replace(/[ \t]{2,}/g, ' ').replace(/[ \t]+([,.;:!?])(?!\d)/g, '$1').trim();
  return t;
}
