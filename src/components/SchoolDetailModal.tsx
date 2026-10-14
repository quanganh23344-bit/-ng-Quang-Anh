import React from 'react';
import { School } from '../types/school';
import { TrendChart } from './TrendChart';
import { 
  X, 
  MapPin, 
  Phone, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Heart, 
  GitCompare,
  Building,
  GraduationCap
} from 'lucide-react';

interface SchoolDetailModalProps {
  school: School | null;
  onClose: () => void;
  onToggleCompare: (school: School) => void;
  isComparing: boolean;
  onAddToWishlistWithPriority: (school: School, nv: 1 | 2 | 3) => void;
  isWishlisted: boolean;
}

export const SchoolDetailModal: React.FC<SchoolDetailModalProps> = ({
  school,
  onClose,
  onToggleCompare,
  isComparing,
  onAddToWishlistWithPriority,
  isWishlisted,
}) => {
  if (!school) return null;

  const delta26vs25 = Number((school.scores.year2026 - school.scores.year2025).toFixed(2));
  const delta25vs24 = Number((school.scores.year2025 - school.scores.year2024).toFixed(2));
  const delta24vs23 = Number((school.scores.year2024 - school.scores.year2023).toFixed(2));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-linear-to-r from-blue-700 via-indigo-700 to-blue-800 p-5 sm:p-6 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-xs">
              Mã tuyển sinh: {school.code}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950">
              {school.type === 'specialized' ? 'Trường THPT Chuyên' : 'Trường THPT Công Lập'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-300/30">
              Thang điểm {school.scoreScale}đ
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
            {school.name}
          </h2>

          <div className="flex items-center gap-2 text-sm text-blue-100">
            <MapPin className="w-4 h-4 text-blue-300 shrink-0" />
            <span>{school.address}</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Quick Score Spotlight Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase">Năm 2023</span>
              <div className="text-xl font-black text-slate-800 mt-1">
                {school.scores.year2023.toFixed(2)} đ
              </div>
              <span className="text-[11px] text-slate-500">
                {school.scoreScale === 50 ? 'TB: ~8.9 đ/môn' : 'TB: ~8.8 đ/môn'}
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase">Năm 2024</span>
              <div className="text-xl font-black text-slate-800 mt-1">
                {school.scores.year2024.toFixed(2)} đ
              </div>
              <span className={`text-[11px] font-semibold ${delta24vs23 >= 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {delta24vs23 >= 0 ? `+${delta24vs23}` : delta24vs23} đ so với 23
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase">Năm 2025</span>
              <div className="text-xl font-black text-slate-800 mt-1">
                {school.scores.year2025.toFixed(2)} đ
              </div>
              <span className={`text-[11px] font-semibold ${delta25vs24 >= 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {delta25vs24 >= 0 ? `+${delta25vs24}` : delta25vs24} đ so với 24
              </span>
            </div>

            <div className="bg-blue-50/90 rounded-2xl p-3 border-2 border-blue-400 text-center shadow-xs">
              <span className="text-xs font-bold text-blue-700 uppercase flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Năm 2026
              </span>
              <div className="text-2xl font-black text-blue-900 mt-1">
                {school.scores.year2026.toFixed(2)} đ
              </div>
              <span className={`text-[11px] font-bold ${delta26vs25 >= 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {delta26vs25 >= 0 ? `+${delta26vs25}` : delta26vs25} đ so với 25
              </span>
            </div>
          </div>

          {/* Interactive Trend Chart */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                  Biểu đồ diễn biến điểm chuẩn (2023 - 2026)
                </h3>
              </div>
              <span className="text-xs text-slate-500">Thang điểm: {school.scoreScale}</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Theo dõi đồ thị điểm chuẩn qua 4 năm để nhận định mức độ cạnh tranh và độ ổn định phổ điểm.
            </p>
            <TrendChart schools={[school]} compact={false} />
          </div>

          {/* Quota & Competition Ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-3">
                <Users className="w-4 h-4 text-indigo-600" />
                Chỉ tiêu & Tỷ lệ chọi tuyển sinh
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Chỉ tiêu năm 2026:</span>
                  <span className="font-bold text-slate-800">{school.quota.year2026} học sinh</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Chỉ tiêu năm 2025:</span>
                  <span className="font-semibold text-slate-700">{school.quota.year2025 || '—'} học sinh</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Tỷ lệ chọi năm 2026:</span>
                  <span className="font-bold text-rose-600">1 : {school.ratio.ratio2026 || 'Đang cập nhật'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Hồ sơ đăng ký NV1 dự kiến:</span>
                  <span className="font-semibold text-slate-700">{school.ratio.applicants2026 || '—'} thí sinh</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-3">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                Quy định xét tuyển Nguyện vọng
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Điểm chuẩn Nguyện vọng 1:</span>
                  <span className="font-bold text-blue-700">{school.scores.year2026.toFixed(2)} đ</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Điểm chuẩn NV2 (dự kiến):</span>
                  <span className="font-bold text-slate-800">
                    {school.nv2Score?.year2026 
                      ? `${school.nv2Score.year2026.toFixed(2)} đ (+1.0 đ)` 
                      : `${(school.scores.year2026 + 1.0).toFixed(2)} đ`}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Điểm chuẩn NV3 (dự kiến):</span>
                  <span className="font-bold text-slate-800">
                    {school.nv3Score?.year2026 
                      ? `${school.nv3Score.year2026.toFixed(2)} đ (+2.0 đ)` 
                      : `${(school.scores.year2026 + 2.0).toFixed(2)} đ`}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 italic mt-1">
                  * Điểm trúng tuyển NV2 cao hơn NV1 ít nhất 1.0 điểm; NV3 cao hơn NV1 ít nhất 2.0 điểm.
                </p>
              </div>
            </div>
          </div>

          {/* Description & Highlight */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Giới thiệu trường & Môi trường đào tạo
            </h4>
            <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-blue-900 block mb-1">💡 Điểm nổi bật:</strong>
              {school.highlight}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {school.description}
            </p>
          </div>

          {/* Facilities */}
          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-2.5 flex items-center gap-2">
              <Building className="w-4 h-4 text-indigo-600" />
              Cơ sở vật chất & Tiện ích
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {school.facilities.map((facility, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
            {school.phone && (
              <a href={`tel:${school.phone}`} className="flex items-center gap-1.5 hover:text-blue-600 transition">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Hotline: {school.phone}</span>
              </a>
            )}
            {school.website && (
              <a href={school.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">Website chính thức</span>
              </a>
            )}
          </div>
        </div>

        {/* Modal Footer Actions: Assign to NV1, NV2, NV3 */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(school)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                isComparing 
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              {isComparing ? 'Đang so sánh' : 'So sánh trường này'}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500 mr-1 hidden sm:inline">
              Lưu vào nguyện vọng:
            </span>
            <button
              onClick={() => onAddToWishlistWithPriority(school, 1)}
              className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
            >
              Đặt làm NV 1
            </button>
            <button
              onClick={() => onAddToWishlistWithPriority(school, 2)}
              className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs"
            >
              Đặt làm NV 2
            </button>
            <button
              onClick={() => onAddToWishlistWithPriority(school, 3)}
              className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs"
            >
              Đặt làm NV 3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
