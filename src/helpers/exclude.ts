

// Exclude keys from player
export function exclude(player: any, keys: any) {
  return Object.fromEntries(
    Object.entries(player).filter(([key]) => !keys.includes(key))
  );
}