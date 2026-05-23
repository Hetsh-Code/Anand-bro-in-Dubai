export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  imageUrl?: string;
  color: string;
  rotation: number;
}

export interface BucketItem {
  id: string;
  text: string;
  done: boolean;
  points: number;
  category: 'exploration' | 'local_life' | 'challenges' | 'food';
}

export interface FamilyMessage {
  id: string;
  author: string;
  relation: string;
  message: string;
  date: string;
  sticker: string;
  bgColor: string;
}

export interface SurvivalTip {
  id: string;
  phrase: string;
  meaning: string;
  pronunciation: string;
  context: string;
  category: 'arabic_101' | 'laws_etiquette' | 'dubai_hacks';
}
