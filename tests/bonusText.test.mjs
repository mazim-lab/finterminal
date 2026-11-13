// Unit tests for the display-time welcome-bonus formatter.
// Run with: npm test   (node --test; Node strips the TypeScript types itself)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatBonusText } from '../src/lib/bonusText.ts';

const REAL_NUMBERS = [
  '70,000', '$1,550', '3x', '1.25%', '0.99%', '22.99%', '$3,000', '100,000', '5%', '2X',
  '$7,500', '13', '6', '$99.99', '2027', '1,000,000', 'Scene+', 'Q3', 'A380', 'G8', 'B650M',
];

test('never alters a real number, alone or in a sentence', () => {
  for (const n of REAL_NUMBERS) {
    assert.equal(formatBonusText(n), n, `bare ${n}`);
    const s = `Earn ${n} points after you spend $1,500 in 3 months.`;
    assert.equal(formatBonusText(s), s, `in sentence: ${n}`);
    const t = `Get ${n}`;
    assert.equal(formatBonusText(t), t, `at end: ${n}`);
  }
});

test('keeps months, day counts and rates that follow a space', () => {
  const s = 'plus 10,000 points after spending $1,000 in month 13';
  assert.equal(formatBonusText(s), s);
  const r = 'a 0.99% intro rate for 9 months (2% transfer fee, 22.99% after that).';
  assert.equal(formatBonusText(r), r);
});

test('strips a footnote digit glued to a word', () => {
  assert.equal(
    formatBonusText('Earn up to 15,000 Welcome Bonus Membership Rewards® points1 \u2013 that’s up to $150 in value11.'),
    'Earn up to 15,000 Welcome Bonus Membership Rewards® points - that’s up to $150 in value.',
  );
  assert.equal(formatBonusText('Earn up to 60,000 points1 \u2013 that’s up to $600 in value.12'),
    'Earn up to 60,000 points - that’s up to $600 in value.');
});

test('strips a footnote marker glued to a trademark sign', () => {
  assert.equal(formatBonusText('Membership Rewards®1 points'), 'Membership Rewards® points');
});

test('strips asterisks, daggers and superscripts', () => {
  assert.equal(formatBonusText('Earn up to $3,000* in value'), 'Earn up to $3,000 in value');
  assert.equal(formatBonusText('Aeroplan®* points'), 'Aeroplan® points');
  assert.equal(formatBonusText('50,000 points\u2020'), '50,000 points');
  assert.equal(formatBonusText('50,000 points\u00b2'), '50,000 points');
});

test('dashes between numbers read "to"', () => {
  assert.equal(formatBonusText('$500\u2013$1,000 in value'), '$500 to $1,000 in value');
  assert.equal(formatBonusText('2027\u20132028 LEAPS'), '2027 to 2028 LEAPS');
  assert.equal(formatBonusText('5 \u2013 10 business days'), '5 to 10 business days');
});

test('other dashes become a plain hyphen', () => {
  assert.equal(formatBonusText('70,000 points \u2014 terms apply'), '70,000 points - terms apply');
  assert.equal(formatBonusText('Earn 3x \u2013 dining'), 'Earn 3x - dining');
  assert.ok(!/[\u2013\u2014\u2212]/.test(formatBonusText('a \u2013 b \u2014 c \u2212 d')));
});

test('empty input stays empty', () => {
  assert.equal(formatBonusText(''), '');
  assert.equal(formatBonusText(null), '');
  assert.equal(formatBonusText(undefined), '');
});
