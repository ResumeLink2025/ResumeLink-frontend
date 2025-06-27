export const preventDefaults = (e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};
