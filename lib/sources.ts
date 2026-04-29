export interface Source {
  id: string;
  label: string;
  url?: string;
  date?: string;
  type: "external" | "internal-doctrine" | "internal-author" | "benchmark-local";
}

const SOURCES: Source[] = [
  {
    id: "alz2024",
    label: "Alzheimer's Association Facts & Figures 2024",
    url: "https://www.alz.org/alzheimers-dementia/facts-figures",
    date: "2024",
    type: "external",
  },
  {
    id: "who2023",
    label: "WHO Dementia Fact Sheet 2023",
    url: "https://www.who.int/news-room/fact-sheets/detail/dementia",
    date: "2023",
    type: "external",
  },
  {
    id: "lancet2020",
    label: "Lancet Commission on Dementia Prevention 2020",
    url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30367-6/fulltext",
    date: "2020",
    type: "external",
  },
  {
    id: "nia2024",
    label: "NIH National Institute on Aging — Alzheimer's Disease",
    url: "https://www.nia.nih.gov/health/alzheimers-and-dementia",
    date: "2024",
    type: "external",
  },
];

export function getSource(id: string): Source | undefined {
  return SOURCES.find((s) => s.id === id);
}

export function getAllSources(): Source[] {
  return SOURCES;
}
