import fs from 'fs';

const d = JSON.parse(fs.readFileSync('scripts/extracted_articles.json', 'utf8'));

const EMOJI_RANGE = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{1F600}-\u{1F64F}\u{2702}-\u{27B0}\u{1F680}-\u{1F6FF}\u{24C2}-\u{1F251}]/u;

d.forEach((a, i) => {
  const c = a.content;
  const emojiMatches = c.match(EMOJI_RANGE) || [];
  const starPairs = (c.match(/\*\*/g) || []).length / 2;
  const lines = c.split('\n');
  
  // Count long paragraphs (>3 non-empty lines in a row)
  const paragraphs = c.split('\n\n');
  const longParas = paragraphs.filter(p => {
    const nonEmpty = p.split('\n').filter(l => l.trim().length > 0);
    return nonEmpty.length > 3;
  });
  
  // Count CTA blocks
  const ctaCount = (c.match(/CTA/g) || []).length;
  
  console.log(`${i+1}. ${a.slug}`);
  console.log(`   emojis:${emojiMatches.length} (${emojiMatches.join('')}) negritas:${starPairs} long-paras:${longParas.length} CTAs:${ctaCount} lines:${lines.length}`);
});