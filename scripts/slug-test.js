function generateSlugFromName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const name = process.argv[2] ?? '';
if (!name) {
  console.error('Usage: node scripts/slug-test.js "Your Name"');
  process.exit(1);
}

console.log(generateSlugFromName(name));
