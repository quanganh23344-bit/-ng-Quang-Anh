import React from 'react';
import { School } from '../types/school';
import { TrendChart } from './TrendChart';
import { 
  MapPin, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  GitCompare, 
  Heart, 
  Check, 
  Eye, 
  Sparkles 
} from 'lucide-react';

interface SchoolCardProps {
  school: School;
  onSelect: (school: School) => void;
  onToggleCompare: (school: School) => void;
  isComparing: boolean;
  onToggleWishlist: (school: School) => void;
  isWishlisted: boolean;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({
  school,
  onSelect,
  onToggleCompare,
  isComparing,
  onToggleWishlist,
  isWishlisted,
}) => {
  const delta = Number((school.scores.year2026 - school.scores.year2025).toFixed(2));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top Header Card */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase bg-slate-100 text-slate-700">
              Mã: {school.code}
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
              school.type === 'specialized' 
                ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                : 'bg-blue-50 text-blue-700 border border-blue-100'
            }`}>
              {school.type === 'specialized' ? 'Trường Chuyên' : 'THPT Công Lập'}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              Thang {school.scoreScale}đ
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleWishlist(school)}
              className={`p-1.5 rounded-lg transition ${
                isWishlisted 
                  ? 'bg-rose-50 text-rose-600 fill-rose-600' 
                  : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
              }`}
              title={isWishlisted ? 'Xóa khỏi danh sách nguyện vọng' : 'Thêm vào danh sách nguyện vọng'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => onToggleCompare(school)}
              className={`p-1.5 rounded-lg transition ${
                isComparing 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'
              }`}
              title={isComparing ? 'Đã chọn so sánh' : 'Thêm vào so sánh'}
            >
              <GitCompare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* School Name & Location */}
        <h3 
          onClick={() => onSelect(school)}
          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition cursor-pointer line-clamp-1 mb-1"
        >
          {school.name}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{school.district}, {school.province}</span>
        </div>

        {/* 4-Year Score Timeline Grid */}
        <div className="grid grid-cols-4 gap-1.5 py-2.5 px-3 bg-slate-50/80 rounded-xl border border-slate-100 mb-3">
          <div className="text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase block">2023</span>
            <span className="text-xs sm:text-sm font-bold text-slate-700">
              {school.scores.year2023.toFixed(2)}
            </span>
          </div>

          <div className="text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase block">2024</span>
            <span className="text-xs sm:text-sm font-bold text-slate-700">
              {school.scores.year2024.toFixed(2)}
            </span>
          </div>

          <div className="text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase block">2025</span>
            <span className="text-xs sm:text-sm font-bold text-slate-700">
              {school.scores.year2025.toFixed(2)}
            </span>
          </div>

          <div className="text-center bg-blue-100/70 rounded-lg py-0.5 border border-blue-200">
            <span className="text-[10px] font-extrabold text-blue-700 uppercase flex items-center justify-center gap-0.5">
              2026
              <Sparkles className="w-2.5 h-2.5 text-blue-600" />
            </span>
            <span className="text-xs sm:text-sm font-black text-blue-900">
              {school.scores.year2026.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Delta & Trend overview */}
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-1">
            <span className="text-slate-500">So với 2025:</span>
            {delta > 0 ? (
              <span className="inline-flex items-center text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +{delta}
              </span>
            ) : delta < 0 ? (
              <span className="inline-flex items-center text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" /> {delta}
              </span>
            ) : (
              <span className="inline-flex items-center text-slate-600 font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                <Minus className="w-3.5 h-3.5 mr-0.5" /> 0.00
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-slate-600">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Chọi 2026: <strong className="text-slate-900">1:{school.ratio.ratio2026 || '—'}</strong></span>
          </div>
        </div>

        {/* Mini Sparkline Chart */}
        <div className="bg-slate-50/50 rounded-lg p-1.5 border border-slate-100/80">
          <div className="text-[10px] font-medium text-slate-400 mb-1 flex items-center justify-between">
            <span>Biến động 2023 - 2026</span>
            <span className="text-slate-400">Xu hướng</span>
          </div>
          <TrendChart schools={[school]} compact={true} />
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-4 py-3 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="text-xs text-slate-500">
          Chỉ tiêu 2026: <span className="font-bold text-slate-800">{school.quota.year2026}</span> HS
        </div>

        <button
          onClick={() => onSelect(school)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
        >
          <Eye className="w-3.5 h-3.5" />
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};
