export const maskEmail = (email: string): string => {
  if (!email || !email.includes('@')) {
    return email;
  }

  const [localPart, domain] = email.split('@');

  if (localPart.length <= 1) {
    return email;
  }

  const maskedLocal = localPart.charAt(0) + '*'.repeat(localPart.length - 1);

  return `${maskedLocal}@${domain}`;
}