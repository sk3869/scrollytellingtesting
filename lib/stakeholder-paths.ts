export interface StakeholderPath {
  id: string;
  label: string;
  href: string;
}

export const STAKEHOLDER_PATHS: StakeholderPath[] = [
  { id: "home", label: "Home", href: "/" },
];

export function getStakeholderPath(id: string): StakeholderPath | undefined {
  return STAKEHOLDER_PATHS.find((p) => p.id === id);
}
