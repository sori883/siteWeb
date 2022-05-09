import { paramLoader } from 'types/image/imageLibrary';
export const imageLoader = ({ src, width, quality }: paramLoader): string => `http://localhost:9000/develop/${src}?w=${width}&q=${quality || 75}`;
