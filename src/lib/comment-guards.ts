// ---------------------------------------------------------------------------
// Server-side validation for anonymous comments.
//
// Everything here runs on the server and is the source of truth. The client
// mirrors the cheap length checks for fast feedback, but never the profanity
// or link rules (we don't ship the wordlist to the browser).
//
// Design goals: reject spam and abuse without punishing normal writing, and
// never leak to a bot *why* it was rejected on the honeypot path.
// ---------------------------------------------------------------------------

export type CommentInput = {
  path?: unknown;
  name?: unknown;
  body?: unknown;
  website?: unknown; // honeypot: real humans never fill this
};

export type GuardResult =
  | { ok: true; name: string; body: string }
  | { ok: false; status: number; error: string }
  // Honeypot tripped: pretend success so bots learn nothing, but store nothing.
  | { ok: false; silentDrop: true };

const MIN_BODY = 3;
const MAX_BODY = 1200;
const MAX_NAME = 40;

// Control chars (except newline/tab) have no place in a comment.
function stripControl(s: string): string {
  // eslint-disable-next-line no-control-regex
  return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

// --- link detection --------------------------------------------------------
// Reject explicit schemes, www., markdown links, and bare "domain.tld" tokens.
// The TLD list is deliberately broad-but-common so we catch spam without
// flagging ordinary prose. A token like "e.g" won't match (g is not a TLD);
// "3.5" won't match (numeric); "Inc." at a sentence end won't match.
const LINK_RE = new RegExp(
  [
    "https?:\\/\\/",
    "www\\.",
    "\\bt\\.me\\b",
    // bare domain: label(s) + dot + known tld, optionally with a path
    "\\b[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.(?:com|net|org|io|co|ru|cn|info|biz|xyz|top|club|online|site|shop|store|link|live|app|dev|gg|to|me|tv|us|uk|ca|de|fr|nl|in|ly|be|casino|bet|loan|vip)\\b(?:\\/[^\\s]*)?",
  ].join("|"),
  "i"
);

function hasLink(s: string): boolean {
  return LINK_RE.test(s);
}

// --- profanity filter ------------------------------------------------------
//
// Approach and decisions:
//  * Word-boundary matching, NOT substring, so we avoid the Scunthorpe problem
//    (place names, "assassin", "class", "cockpit", "Dickens" all pass).
//  * Before matching we normalize a copy of each *word* only:
//      - lowercase
//      - map common leetspeak: 0->o, 1->i, 3->e, 4->a, 5->s, 7->t, @->a, $->s
//      - collapse runs of the same letter to a single letter (so "shiiiit"
//        and "fuuuuck" normalize down), which is why the list stores the
//        already-collapsed forms (e.g. "ass" not "aass").
//      - drop non-alphanumerics inside the word (so "f.u.c.k" and "s h" that
//        got split are handled at the token level; "f*ck" -> "fck" would NOT
//        match "fuck", which is an accepted miss to stay conservative).
//  * The list targets genuine profanity and slurs only. No borderline-clean
//    words. We intentionally exclude mild words like "damn"/"hell"/"crap"
//    that are common in ordinary finance writing ("what the hell is a RRIF").
//  * Because collapsing repeats can also collapse *legit* words, matching is
//    still gated on word boundaries against a set, so false positives require
//    a normalized token to equal a listed term exactly.
//
// Stored lowercase, post-collapse (no doubled letters) so normalization lines up.
const PROFANITY: ReadonlySet<string> = new Set([
  // general profanity
  "fuck",
  "fuk",
  "fuc",
  "fucker",
  "fuckface",
  "motherfucker",
  "shit",
  "shite",
  "bulshit", // "bullshit" collapses ll -> l
  "bullshit",
  "ass",
  "asshole",
  "arse",
  "arsehole",
  "bastard",
  "bitch",
  "biatch",
  "bich",
  "cunt",
  "cock",
  "cocksucker",
  "dick",
  "dickhead",
  "prick",
  "pussy",
  "piss",
  "pisser",
  "wank",
  "wanker",
  "twat",
  "bollocks",
  "bugger",
  "slut",
  "slag",
  "whore",
  "hoe",
  "jackass",
  "dumbass",
  "dipshit",
  "horseshit",
  "shithead",
  "shithole",
  "douche",
  "douchebag",
  "jerkoff",
  "jizz",
  "cum",
  "boner",
  "dildo",
  "fap",
  "nutsack",
  "ballsack",
  // common inflections of the above (exact-match means we list them explicitly
  // rather than stemming, which keeps clean words like "class"/"bass" safe).
  "fucking",
  "fucked",
  "fucks",
  "fuckers",
  "fuckin",
  "shitty",
  "shits",
  "shitting",
  "assholes",
  "asses",
  "bitches",
  "bitching",
  "bitchy",
  "dicks",
  "dickheads",
  "pricks",
  "pussies",
  "cunts",
  "cocks",
  "wankers",
  "twats",
  "sluts",
  "whores",
  "bastards",
  "douchebags",
  "pissed",
  "pissing",
  "cocksuckers",
  // slurs (racial, ethnic, homophobic, ableist, transphobic): the worst of
  // it, matched conservatively on word boundaries so real words stay safe.
  "nigger",
  "niger", // collapse of "nigger" variant
  "nigga",
  "niga", // collapse of "nigga"
  "chink",
  "gook",
  "spic",
  "spick",
  "wetback",
  "kike",
  "kyke",
  "wop",
  "dago",
  "coon",
  "raghead",
  "towelhead",
  "sandnigger",
  "sandniger",
  "beaner",
  "gyppo",
  "paki",
  "faggot",
  "fagot", // collapse of "faggot"
  "fag",
  "dyke",
  "tranny",
  "shemale",
  "retard",
  "retarded",
  "retards",
  "spastic",
  "cripple",
  "mongoloid",
  "niggers",
  "niggas",
  "faggots",
  "fags",
  "chinks",
  "spics",
  "kikes",
  "coons",
  "trannies",
]);

const LEET: Record<string, string> = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "@": "a",
  $: "s",
};

// Normalize a single token to its comparison form.
//
// We collapse only runs of 3+ identical letters down to one (so "fuuuck" ->
// "fuck" and "shiiit" -> "shit"), while leaving legitimate double letters
// intact (so "ass" stays "ass", "hell" stays "hell"). That is what lets the
// list store real spellings and still match exact whole words.
function normalizeToken(tok: string): string {
  let out = "";
  for (const ch of tok.toLowerCase()) {
    out += LEET[ch] ?? ch;
  }
  out = out.replace(/[^a-z]/g, ""); // comparison key is letters only
  out = out.replace(/([a-z])\1{2,}/g, "$1"); // 3+ repeats -> 1; keep doubles
  return out;
}

function hasProfanity(s: string): boolean {
  // Split on anything that is not a letter or leet-digit/symbol we care about.
  const tokens = s.split(/[^a-z0-9@$]+/i).filter(Boolean);
  for (const t of tokens) {
    const n = normalizeToken(t);
    // Exact whole-word match only (post-normalization). This is deliberate:
    // it sidesteps the Scunthorpe problem entirely because a listed term must
    // BE the whole token, never a substring of a clean word. The cost is we
    // must list common inflections (plurals, -ing, -er) explicitly, which we do.
    if (n.length >= 3 && PROFANITY.has(n)) return true;
  }
  return false;
}

// --- cheap spam tells ------------------------------------------------------

function isAllCapsShout(body: string): boolean {
  if (body.length <= 80) return false;
  const letters = body.replace(/[^a-z]/gi, "");
  if (letters.length < 20) return false;
  const upper = body.replace(/[^A-Z]/g, "").length;
  // >90% of letters are uppercase => shouting
  return upper / letters.length > 0.9;
}

function hasRepeatedLines(body: string): boolean {
  const lines = body
    .split("\n")
    .map((l) => l.trim().toLowerCase())
    .filter((l) => l.length > 0);
  if (lines.length <= 3) return false;
  const counts = new Map<string, number>();
  for (const l of lines) {
    const n = (counts.get(l) ?? 0) + 1;
    counts.set(l, n);
    if (n > 3) return true; // same line more than 3 times
  }
  return false;
}

// --- main entry ------------------------------------------------------------

export function validateComment(input: CommentInput): GuardResult {
  // 1. Honeypot: any non-empty value means a bot filled a hidden field.
  const website = typeof input.website === "string" ? input.website.trim() : "";
  if (website.length > 0) {
    return { ok: false, silentDrop: true };
  }

  // 2. Body
  const rawBody = typeof input.body === "string" ? input.body : "";
  const body = stripControl(rawBody).trim();
  if (body.length < MIN_BODY) {
    return { ok: false, status: 400, error: "say a little more (at least a few characters)" };
  }
  if (body.length > MAX_BODY) {
    return { ok: false, status: 400, error: `keep it under ${MAX_BODY} characters` };
  }

  // 3. Name (optional)
  let name = typeof input.name === "string" ? stripControl(input.name).trim() : "";
  if (name.length > MAX_NAME) {
    return { ok: false, status: 400, error: `names top out at ${MAX_NAME} characters` };
  }
  if (name.length === 0) name = "anon";

  // 4. No links, anywhere.
  if (hasLink(body) || hasLink(name)) {
    return { ok: false, status: 400, error: "links are not allowed in comments" };
  }

  // 5. Profanity / slurs.
  if (hasProfanity(body) || hasProfanity(name)) {
    return { ok: false, status: 400, error: "keep it kind; that language is not welcome here" };
  }

  // 6. Cheap spam tells.
  if (isAllCapsShout(body)) {
    return { ok: false, status: 400, error: "ease off the caps lock" };
  }
  if (hasRepeatedLines(body)) {
    return { ok: false, status: 400, error: "that looks like spam; trim the repeats" };
  }

  return { ok: true, name, body };
}
