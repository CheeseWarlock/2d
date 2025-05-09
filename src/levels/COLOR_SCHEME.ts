export const VIVID_COLORS = [
  "#DE60F2", // Heliotrope
  "#F9547B", // Cerise
  "#FF9050", // Coral
  "#FFE16D", // Chiffon
  "#90F263", // Spearmint
  "#C0FFEE", // Seafoam
  "#8FD1F7", // Duke
  "#A9FF84", // Cornflower
];

export const VIVID_COLORS_RGB = VIVID_COLORS.map((c) => ({
  r: parseInt(c.slice(1, 3), 16).toFixed(1),
  g: parseInt(c.slice(3, 5), 16).toFixed(1),
  b: parseInt(c.slice(5, 7), 16).toFixed(1),
}));
