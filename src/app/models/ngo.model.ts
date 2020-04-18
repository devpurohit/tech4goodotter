export interface Ngo {
    name: string;
    state: string;
    domain: Domain;
    techteam: boolean;
    toolsapplied: [string];
    hwdeficit: HardwareDeficit;
    a12: boolean;
    g80: boolean;
    fcra: boolean;
    budget: boolean;
    benificiaries: number;
}

enum Domain {
    'health', 'skill', 'env', 'edu', 'tech', 'hunger', 'gender', 'human', 'women', 'child', 'disaster', 'employ',
}

enum HardwareDeficit {
    'loc', 'nowr', 'laptops', 'phone', 'none',
}
