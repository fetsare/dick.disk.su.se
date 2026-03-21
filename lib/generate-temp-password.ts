export async function generateTempPassword(length = 12): Promise<string> {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
  let pwd = '';

  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      pwd += chars[array[i] % chars.length];
    }
    return pwd;
  }

  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    pwd += chars[idx];
  }

  return pwd;
}
