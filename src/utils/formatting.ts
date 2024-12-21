export const normalizeText = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const formatLocation = (name: string, state: string | undefined, country: string): string => {
  const parts = [name];
  if (state) parts.push(state);
  parts.push(country);
  return parts.join(', ');
};