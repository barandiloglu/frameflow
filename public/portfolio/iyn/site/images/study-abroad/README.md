# Study Abroad — Image Asset Spec

This folder feeds the country pages at `/[lang]/study-abroad/[country]`.

## Layout

```
public/images/study-abroad/
├── [country-slug].png          # Hero banner (already populated for all 9)
├── cities/
│   └── [country-slug]/
│       ├── [city-slug-1].jpg
│       ├── [city-slug-2].jpg
│       ├── [city-slug-3].jpg
│       └── [city-slug-4].jpg
├── university-logos/
│   └── [logo-slug].svg
└── README.md                   # This file
```

## Country slugs

`england`, `netherlands`, `germany`, `belgium`, `switzerland`, `spain`, `italy`, `canada`, `america`

## City photos — 4 per country

Aspect: square or 4:3, **800×600 minimum** (1200×900 ideal). JPG or WebP.

| Country | City slugs |
| --- | --- |
| england | `london`, `oxford`, `cambridge`, `manchester` |
| netherlands | `amsterdam`, `rotterdam`, `eindhoven`, `maastricht` |
| germany | `munich`, `berlin`, `heidelberg`, `frankfurt` |
| belgium | `brussels`, `leuven`, `ghent`, `antwerp` |
| switzerland | `zurich`, `lausanne`, `geneva`, `st-gallen` |
| spain | `madrid`, `barcelona`, `valencia`, `granada` |
| italy | `milan`, `rome`, `bologna`, `turin` |
| canada | `toronto`, `vancouver`, `montreal`, `waterloo` |
| america | `new-york`, `boston`, `los-angeles`, `san-francisco` |

Example: `cities/england/london.jpg`

## University logos

Square or near-square SVGs (color or monochrome). Loaded on top of a letter
placeholder, so missing files degrade gracefully.

The complete list of `logoSlug` values is the source of truth in
`src/components/study-abroad/country-data.ts`. Highlights:

- **England**: oxford, cambridge, imperial, ucl, kings, manchester, warwick
- **Netherlands**: amsterdam, erasmus, tilburg, maastricht, leiden, tu-delft, tue
- **Germany**: tum, lmu, heidelberg, rwth, kit, mannheim, frankfurt-school
- **Belgium**: ku-leuven, ghent, vub, antwerp, uclouvain, ulb
- **Switzerland**: eth, epfl, st-gallen, zurich, geneva, ehl, glion
- **Spain**: ie, esade, barcelona, pompeu-fabra, carlos-iii, navarra, eu-business
- **Italy**: polimi, polito, bocconi, bologna, sapienza, pavia, humanitas
- **Canada**: toronto, ubc, mcgill, waterloo, mcmaster, york, george-brown, seneca
- **America**: harvard, stanford, mit, yale, nyu, berkeley, ucla, michigan

Example: `university-logos/oxford.svg`

## Priority drop order (high visual impact first)

1. **Hero banners** are already in place for all 9 countries.
2. **City photos** — 4 per country = 36 photos. These have the biggest
   single visual upgrade because the cities strip is a brand-new section
   of full-bleed imagery.
3. **Featured-card university logos** — only 1-3 per country (≈18 total).
   These appear at oversized 84×84 in the wide cards and have the most
   visible payoff per asset.
4. **Standard-card university logos** — the remaining ~46 logos, used at
   44×44. Lower priority since the letter placeholder still reads as
   intentional.
