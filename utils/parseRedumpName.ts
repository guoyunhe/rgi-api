const discRegex = /\(Disc ([0-9]+)\)/;
const langRegex = /\(([A-Z][a-z](?:,[A-Z][a-z])*)\)/;
const allRegions = [
  'Asia',
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'China',
  'Croatia',
  'Denmark',
  'Europe',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'India',
  'Ireland',
  'Italy',
  'Japan',
  'Korea',
  'Latin America',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Poland',
  'Portugal',
  'Russia',
  'Scandinavia',
  'South Africa',
  'Spain',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'UK',
  'USA',
];

const regionRegex = new RegExp(`\\(((?:${allRegions.join('|')}|, )+)\\)`);

let count = 0;

/**
 * Parse Redump game name and get regions, languages, disc number and regular game title.
 *
 * Sims 2, The -> The Sims 2
 */
export default function parseRedumpName(name: string) {
  const regionMatch = name.match(regionRegex);
  const regions = regionMatch ? regionMatch[1].split(', ') : [];
  const langMatch = name.match(langRegex);
  const languages = langMatch ? langMatch[1].split(',') : [];
  const discMatch = name.match(discRegex);
  const disc = discMatch ? parseInt(discMatch[1]) : 1;

  let title = name.substring(0, regionMatch?.index);

  [
    'The',
    'An',
    'Das',
    'Der',
    'Die',
    'El',
    'I',
    'Il',
    'La',
    'Las',
    'Le',
    'Les',
    "L'",
    'Les',
  ].forEach((the) => {
    if (title.includes(', ' + the + ' ')) {
      title = the + ' ' + title.replace(', ' + the + ' ', '');
    }
  });

  title = title.trim();

  return {
    title,
    disc,
    regions,
    languages,
  };
}
