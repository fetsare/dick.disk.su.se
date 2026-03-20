import { hashPassword } from '../lib/hash-password';

async function main() {
  const password = 'TestPassword123!';

  const hash = await hashPassword(password);

  console.log('Plain password:', password);
  console.log('Hashed password:', hash);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
