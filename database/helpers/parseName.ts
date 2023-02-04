const discRegex = /\(Dis[ck] ([0-9]+)\)/;
const revRegex = /\(Rev \w+\)/;
const altRegex = /\(Alt\)/;
const langRegex = /\(([A-Z][a-z](?:[,+][A-Z][a-z])*)\)/;
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
  'Israel',
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
  'Turkey',
  'UK',
  'USA',
  'United Arab Emirates',
  'United Kingdom',
  'Unknown',
  'World',
];

const regionRegex = new RegExp(`\\(((?:${allRegions.join('|')}|, )+)\\)`);

function remapRegion(region?: string) {
  switch (region) {
    case 'United Kingdom':
      return 'UK';
    default:
      return region;
  }
}

/**
 * Parse Redump game name and get region, language, disc number and regular game title.
 *
 * Sims 2, The -> The Sims 2
 */
export default function parseName(name: string) {
  const regionMatch = name.match(regionRegex);

  if (!regionMatch) {
    console.log('No region found in', name);
  }

  const region = remapRegion(regionMatch?.[1]);
  const langMatch = name.match(langRegex);
  const language = langMatch?.[1];
  const discMatch = name.match(discRegex);
  const disc = discMatch ? parseInt(discMatch[1]) : 1;

  const mainName = name
    .replace(revRegex, '') // remove (Rev 1)
    .replace(altRegex, '') // remove (Alt)
    .replace(discRegex, '(Disc 1)') // change (Disc 2) to (Disc 1)
    .replace('(Virtual Console)', '') // See https://en.wikipedia.org/wiki/Virtual_Console
    .replace(/\s+/g, ' ') // combine spaces
    .trim();

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

  let displayName = title;

  if (regionMatch) {
    displayName = `${title} (${region})`;
  }

  return {
    title,
    displayName,
    mainName,
    disc,
    region,
    language,
  };
}
