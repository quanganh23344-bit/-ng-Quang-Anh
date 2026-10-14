import React from 'react';
import { School } from '../types/school';
import { TrendingUp, Users, Award, Building2, BellRing } from 'lucide-react';

interface StatsBannerProps {
  schools: School[];
  onOpenGuide: () => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ schools, onOpenGuide }) => {
  const totalSchools = schools.length;
  
  // Highest score in scale 50
  const maxScale50 = Math.max(...schools.filter(s => s.scoreScale === 50).map(s => s.scores.year2026));
  // Highest score in scale 30
  const maxScale30 = Math.max(...schools.filter(s => s.scoreScale === 30).map(s => s.scores.year2026));

  // Max competition ratio in 2026
  const maxRatio = Math.max(...schools.map(s => s.ratio.ratio2026 || 0));

  return (
    <div className="relative mb-6">
      {/* Top Notice Banner */}
      <div className="bg-linear-to-r from-blue-700 via-indigo-700 to-sky-700 rounded-2xl p-4 sm:p-6 text-white shadow-lg shadow-indigo-950/10 mb-6 overflow-hidden relative">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-200 border border-amber-300/30">
              <BellRing className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              Cập nhật mùa thi vào lớp 10 năm học 2026 - 2027
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Cổng Tra Cứu Điểm Chuẩn THPT (2023 - 2026)
            </h1>
            <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
              Theo dõi biến động điểm chuẩn 4 năm liên tiếp, phân tích tỷ lệ chọi 2026, giả lập tính điểm thi thử và nhận gợi ý đặt nguyện vọng tối ưu theo chương trình GDPT mới.
            </p>
          </div>

          <button
            onClick={onOpenGuide}
            className="self-start md:self-center shrink-0 px-4 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs sm:text-sm hover:bg-blue-50 transition shadow-md hover:scale-105 active:scale-95"
          >
            Xem Quy Chế 2026 →
          </button>
        </div>

        {/* Quick Highlights Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-5 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 text-blue-200 text-xs font-medium mb-1">
              <Building2 className="w-3.5 h-3.5" />
              Số trường theo dõi
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{totalSchools} trường</div>
            <div className="text-[11px] text-blue-200">5 tỉnh/thành phố lớn</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 text-amber-200 text-xs font-medium mb-1">
              <Award className="w-3.5 h-3.5" />
              Top điểm thang 50
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-300">{maxScale50} đ</div>
            <div className="text-[11px] text-blue-200">Chu Văn An (Hà Nội)</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-medium mb-1">
              <Award className="w-3.5 h-3.5" />
              Top điểm thang 30
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-300">{maxScale30} đ</div>
            <div className="text-[11px] text-blue-200">Lê Quý Đôn / Lê Hồng Phong</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 text-rose-200 text-xs font-medium mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Tỷ lệ chọi cao nhất
            </div>
            <div className="text-xl sm:text-2xl font-black text-rose-300">1 : {maxRatio}</div>
            <div className="text-[11px] text-blue-200">Chuyên Lê Hồng Phong TP.HCM</div>
          </div>
        </div>
      </div>
    </div>
  );
};
