# Vendored fonts

Geist Sans and Geist Mono, self-hosted so the production build never talks to
`fonts.googleapis.com` / `fonts.gstatic.com`. Licensed under the SIL Open Font
License 1.1 — see `LICENSE.txt`.

Both files are the **variable** faces (weight axis 100–900), subset to the
characters this course actually uses: the standard Google `latin` range plus
Greek, math operators, arrows, fractions and sub/superscripts — so `Ω`, `π`,
`→`, `≈`, `√`, `₂` and friends render in Geist instead of falling back to a
system font, which is what happened when these came from `next/font/google`
with `subsets: ['latin']`.

Glyphs Geist simply does not have (`Δ`, `Σ`, `α`, `β`, `τ`, `φ`, `✓`, `✗`, `⚡`
and the emoji) still fall back to system fonts. That is unchanged.

## Regenerating

Source: the official [`geist`](https://www.npmjs.com/package/geist) npm package
by Vercel (v1.7.2). Requires `pip install fonttools brotli`.

```bash
npm pack geist@1.7.2 && tar xzf geist-1.7.2.tgz

RANGES="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,\
U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+FEFF,U+FFFD,U+0370-03FF,\
U+2070-209F,U+2100-214F,U+2150-218F,U+2190-21FF,U+2200-22FF,U+2300-23FF,\
U+25A0-25FF,U+2600-26FF,U+2713,U+2717,U+27F0-27FF,U+2B00-2BFF,U+3030"

for f in "geist-sans/Geist-Variable:Geist-Variable" \
         "geist-mono/GeistMono-Variable:GeistMono-Variable"; do
  python3 -m fontTools.subset "package/dist/fonts/${f%%:*}.woff2" \
    --output-file="${f##*:}.woff2" \
    --flavor=woff2 --unicodes="$RANGES" \
    --ignore-missing-glyphs --layout-features='*' --name-IDs='*'
done
```
