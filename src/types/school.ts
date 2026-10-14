export interface SchoolScore {
  year2023: number;
  year2024: number;
  year2025: number;
  year2026: number; // Điểm chính thức hoặc dự kiến mới nhất
  status2026?: 'official' | 'projected' | 'first_batch';
}

export interface SchoolQuota {
  year2023?: number;
  year2024?: number;
  year2025?: number;
  year2026: number;
}

export interface SchoolRatio {
  applicants2025?: number;
  applicants2026?: number;
  ratio2025?: number; // Tỷ lệ chọi 1 : x
  ratio2026?: number;
}

export interface School {
  id: string;
  name: string;
  code: string;
  province: string; // 'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Nghệ An'
  district: string;
  address: string;
  type: 'public' | 'specialized' | 'high_quality' | 'private';
  scoreScale: 30 | 50; // Thang điểm tính (Hà Nội trước đây 50, hoặc chuẩn hóa 30)
  scores: SchoolScore;
  nv2Score?: {
    year2024?: number;
    year2025?: number;
    year2026?: number;
  };
  nv3Score?: {
    year2024?: number;
    year2025?: number;
    year2026?: number;
  };
  quota: SchoolQuota;
  ratio: SchoolRatio;
  highlight?: string;
  description: string;
  facilities: string[];
  website?: string;
  phone?: string;
  averageClassCount?: number;
  tags: string[];
}

export type ProvinceFilter = 'Tất cả' | 'Hà Nội' | 'TP. Hồ Chí Minh' | 'Đà Nẵng' | 'Hải Phòng' | 'Nghệ An';
export type TypeFilter = 'all' | 'public' | 'specialized' | 'high_quality';
export type TrendFilter = 'all' | 'increasing' | 'decreasing' | 'stable';
export type SortOption = 'score_desc' | 'score_asc' | 'trend_desc' | 'name_asc' | 'ratio_desc';
