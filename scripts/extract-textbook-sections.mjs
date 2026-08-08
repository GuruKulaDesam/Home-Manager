import fs from 'node:fs';
import path from 'node:path';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const root = path.resolve(import.meta.dirname, '..');
const books = {
  gegp1: { grade: 7, subject: 'Mathematics', titles: ['Large Numbers Around Us','Arithmetic Expressions','A Peek Beyond the Point','Expressions Using Letter-Numbers','Parallel and Intersecting Lines','Number Play','A Tale of Three Intersecting Lines','Working with Fractions'] },
  gegp2: { grade: 7, subject: 'Mathematics', titles: ['Geometric Twins','Operations with Integers','Finding Common Ground','Another Peek Beyond the Point','Connecting the Dots…','Constructions and Tilings','Finding the Unknown'] },
  gecu1: { grade: 7, subject: 'Science', titles: ['The Ever-Evolving World of Science','Exploring Substances: Acidic, Basic, and Neutral','Electricity: Circuits and Their Components','The World of Metals and Non-metals','Changes Around Us: Physical and Chemical','Adolescence: A Stage of Growth and Change','Heat Transfer in Nature','Measurement of Time and Motion','Life Processes in Animals','Life Processes in Plants','Light: Shadows and Reflections','Earth, Moon, and the Sun'] },
  gepr1: { grade: 7, subject: 'English', titles: ['Learning Together','Wit and Humour','Dreams and Discoveries','Travel and Adventure','Bravehearts'] },
  gees1: { grade: 7, subject: 'Social Science', titles: ['Geographical Diversity of India','Understanding the Weather','Climates of India','New Beginnings: Cities and States','The Rise of Empires','The Age of Reorganisation','The Gupta Era: An Age of Tireless Creativity','How the Land Becomes Sacred','From the Rulers to the Ruled: Types of Governments','The Constitution of India — An Introduction','From Barter to Money','Understanding Markets'] },
  gees2: { grade: 7, subject: 'Social Science', titles: ['The Story of Indian Farming','India and Her Neighbours','Empires and Kingdoms: 6th to 10th Centuries','Turning Tides: 11th and 12th Centuries','India, a Home to Many','The State, the Government, and You','Infrastructure: Engine of India’s Development','Banks and the Magic of Finance'] },
  ghml1: { grade: 7, subject: 'Hindi', titles: ['माँ, कह एक कहानी','तीन बुद्धिमान','फूल और काँटा','पानी रे पानी','नहीं होना बीमार','गिरिधर कविराय की कुंडलियाँ','वर्षा-बहार','बिरजू महाराज से साक्षात्कार','चिड़िया','मीरा के पद'] },
  gekb1: { grade: 7, subject: 'Kaushal Bodh', titles: ['Work with Life Forms — Part 1','School Habitat Garden','Work with Machines and Materials — Part 2','AI Assistant','Work in Human Services — Part 3','Family Health Handbook','Planning for Kaushal Mela'] },
  lemh1: { grade: 12, subject: 'Mathematics', titles: ['Relations and Functions','Inverse Trigonometric Functions','Matrices','Determinants','Continuity and Differentiability','Applications of Derivatives'] },
  lemh2: { grade: 12, subject: 'Mathematics', titles: ['Integrals','Applications of Integrals','Differential Equations','Vector Algebra','Three Dimensional Geometry','Linear Programming','Probability'] },
  leph1: { grade: 12, subject: 'Physics', titles: ['Electric Charges and Fields','Electrostatic Potential and Capacitance','Current Electricity','Moving Charges and Magnetism','Magnetism and Matter','Electromagnetic Induction','Alternating Current','Electromagnetic Waves'] },
  leph2: { grade: 12, subject: 'Physics', titles: ['Ray Optics and Optical Instruments','Wave Optics','Dual Nature of Radiation and Matter','Atoms','Nuclei','Semiconductor Electronics: Materials, Devices and Simple Circuits'] },
  lech1: { grade: 12, subject: 'Chemistry', titles: ['Solutions','Electrochemistry','Chemical Kinetics','The d- and f-Block Elements','Coordination Compounds'] },
  lech2: { grade: 12, subject: 'Chemistry', titles: ['Haloalkanes and Haloarenes','Alcohols, Phenols and Ethers','Aldehydes, Ketones and Carboxylic Acids','Amines','Biomolecules'] },
  lefl1: { grade: 12, subject: 'English Core', parts: ['01','02','03','04','05','06','07','08','11','12','13','14','15'], titles: ['The Last Lesson','Lost Spring','Deep Water','The Rattrap','Indigo','Poets and Pancakes','The Interview','Going Places','My Mother at Sixty-six','Keeping Quiet','A Thing of Beauty','A Roadside Stand','Aunt Jennifer’s Tigers'] },
  levt1: { grade: 12, subject: 'English Core', titles: ['The Third Level','The Tiger King','Journey to the End of the Earth','The Enemy','On the Face of It','Memories of Childhood'] },
  lecs1: { grade: 12, subject: 'Computer Science', titles: ['Exception Handling in Python','File Handling in Python','Stack','Queue','Sorting','Searching','Understanding Data','Database Concepts','Structured Query Language','Computer Networks','Data Communication','Security Aspects','Project Based Learning'] }
};

const ignored = /^(chapter|unit|summary|learning objectives?|introduction to the book|contents?|foreword|preface|acknowledgements?|exercise(?:s)?(?:\s+\d+(?:\.\d+)*)?|activity(?:\s+\d+(?:\.\d+)*)?|example(?:\s+\d+)?|solution|answers?|projects?|reprint|figure|fig\.?|table|let us (?:read|discuss|learn|listen|speak|write|explore|think and reflect|do)|transcripts?)$/i;
const numbered = /^(\d+(?:\.\d+){1,3})\s+(.{2,120})$/u;
const clean = value => String(value || '').replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
const keyOf = value => clean(value).toLocaleLowerCase('en').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

function linesFrom(items) {
  const groups = [];
  items.filter(item => clean(item.str)).forEach(item => {
    const y = item.transform[5];
    let line = groups.find(entry => Math.abs(entry.y - y) < 2.2);
    if (!line) { line = { y, items: [] }; groups.push(line); }
    if (!line.items.some(existing => existing.str === item.str && Math.abs(existing.transform[4] - item.transform[4]) < 1.5)) line.items.push(item);
  });
  return groups.sort((a, b) => b.y - a.y).map(group => {
    const positional = [];
    group.items.sort((a, b) => clean(a.str).length - clean(b.str).length).forEach(item => {
      if (!positional.some(existing => Math.abs(existing.transform[4] - item.transform[4]) < 1.5)) positional.push(item);
    });
    const parts = positional.sort((a, b) => a.transform[4] - b.transform[4]);
    return {
      text: clean(parts.map(item => item.str).join(' ')),
      largeText: clean(parts.filter(item => Math.hypot(item.transform[2], item.transform[3]) >= 13.5).map(item => item.str).join(' ')),
      size: Math.max(...parts.map(item => Math.hypot(item.transform[2], item.transform[3]))),
      x: Math.min(...parts.map(item => item.transform[4])),
      y: group.y
    };
  });
}

function usefulHeading(line, chapterTitle) {
  const text = line.text.replace(/[•●■◆❖]+/g, '').trim();
  const compact = keyOf(text).replace(/\s+/g, '');
  const chapterKey = keyOf(chapterTitle);
  if (line.size < 13.7 || text.length < 3 || text.length > 100 || ignored.test(text)) return false;
  if (/^(letsexplore|letsremember|dontmissout|bigquestions|fascinatingfacts|holisticlens|knowascientist|inanutshell|letusenhanceourlearning)$/i.test(compact)) return false;
  if (/^\d+$/.test(text) || /^(mathematics|physics|chemistry|science)$/i.test(text)) return false;
  if (keyOf(text) === chapterKey || chapterKey.startsWith(keyOf(text)) || chapterKey.endsWith(keyOf(text)) || /^(chapter|unit)\s*\d+/i.test(text)) return false;
  if ((text.match(/\s+/g) || []).length > 12 || /[.!?]$/.test(text)) return false;
  if (!/[\p{L}]/u.test(text)) return false;
  const words = text.match(/[\p{L}\p{N}]+/gu) || [];
  const latinLetters = text.replace(/[^A-Za-z]/g, '');
  if (/[=∑∫]/u.test(text)) return false;
  if (!words.some(word => (word.match(/\p{L}/gu) || []).length >= 4)) return false;
  if (words.length > 1 && words.every(word => word.length <= 3)) return false;
  if (words.length > 1 && latinLetters.length && latinLetters.length < 18 && latinLetters === latinLetters.toUpperCase()) return false;
  if (/\b(?:a|an|and|at|by|for|from|in|of|on|or|the|to|with|infinitely|uniformly)$/i.test(text)) return false;
  return true;
}

async function extract(file, meta) {
  // These PDFs expose body lines as display-size glyph runs rather than
  // structural headings, so their authored lesson maps remain authoritative.
  if (meta.subject === 'Hindi' || (meta.grade === 7 && meta.subject === 'English')) return [];
  const document = await pdfjs.getDocument({ data: new Uint8Array(fs.readFileSync(file)), disableWorker: true }).promise;
  const numberedFound = [];
  const prominentFound = [];
  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    const lines = linesFrom(content.items);
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const normalizedLine = line.text.replace(/\s*\.\s*/g, '.');
      const normalizedLarge = line.largeText.replace(/\s*\.\s*/g, '.');
      const match = normalizedLarge.match(numbered) || normalizedLine.match(numbered);
      if (match && line.size >= 11.8 && !/exercise|example|activity|question/i.test(match[2]) && usefulHeading({ ...line, text: match[2] }, meta.title)) {
        const titleLines = [match[2]];
        for (let next = index + 1; next < lines.length; next += 1) {
          const continuation = lines[next];
          if (line.y - continuation.y > 75 || continuation.largeText.match(/^\d+(?:\s*\.\s*\d+)+/)) break;
          if (continuation.size < 11.8 || continuation.x + 8 < line.x || ignored.test(continuation.largeText)) continue;
          titleLines.push(continuation.largeText);
        }
        numberedFound.push({ number: match[1], title: clean(titleLines.join(' ')), page: pageNumber, official: true });
      } else if (usefulHeading(line, meta.title) && !(meta.subject === 'English Core' && pageNumber === 1)) {
        prominentFound.push({ title: clean(line.largeText || line.text), page: pageNumber, official: true });
      }
    }
  }
  // Numbered headings are the authoritative textbook hierarchy. Prominent
  // headings are used only by narrative books that do not number sections.
  const found = numberedFound.length >= 2 ? numberedFound : prominentFound;
  const unique = [];
  const seen = new Set();
  found.forEach(item => {
    const key = keyOf(item.title);
    if (!key || seen.has(key)) return;
    seen.add(key);
    unique.push(item);
  });
  return unique;
}

const records = {};
for (const [code, book] of Object.entries(books)) {
  const folder = path.join(root, 'assets', 'textbooks', book.grade === 7 ? 'class-7' : 'class-12', code, code === 'lefl1' ? 'lefl1dd' : '');
  const parts = book.parts || book.titles.map((_, index) => String(index + 1).padStart(2, '0'));
  for (let index = 0; index < book.titles.length; index += 1) {
    const part = parts[index];
    const file = path.join(folder, `${code}${part}.pdf`);
    if (!fs.existsSync(file)) continue;
    const meta = { grade: book.grade, subject: book.subject, title: book.titles[index], bookCode: code, part, file: path.relative(root, file).replaceAll('\\', '/') };
    const sections = await extract(file, meta);
    if (sections.length) records[`${book.grade}|${book.subject}|${keyOf(meta.title)}`] = { ...meta, sections };
    process.stdout.write(`${book.grade} ${book.subject} — ${meta.title}: ${sections.length}\n`);
  }
}

const body = `/* Generated from the bundled textbook PDFs by scripts/extract-textbook-sections.mjs. */\n(function(){\n  window.HM.textbookSections=${JSON.stringify(records, null, 2)};\n})();\n`;
fs.writeFileSync(path.join(root, 'js', 'textbook-sections.js'), body, 'utf8');
console.log(`Wrote ${Object.keys(records).length} chapter records.`);
