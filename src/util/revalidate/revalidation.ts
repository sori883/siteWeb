export const revalidateIndex = (): void => {
  fetch('/api/revalidate');
};

export const revalidateCategoryIndex = (slug: string): void => {
  fetch(`/api/revalidate/${slug}`);
};