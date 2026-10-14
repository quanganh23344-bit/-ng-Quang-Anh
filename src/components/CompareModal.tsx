import React from 'react';
import { School } from '../types/school';
import { TrendChart } from './TrendChart';
import { X, GitCompare, Trash2, MapPin, Users, Award, Building, Sparkles } from 'lucide-react';

interface CompareModalProps {
  schools: School[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (schoolId: string) => void;
  onClear: () => void;
  onSelectSchool: (school: School) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  schools,
  isOpen,
  onClose,
  onRemove,
  onClear,
  onSelectSchool,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-5xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-linear-to-r from-indigo-700 via-blue-700 to-indigo-800 p-5 sm:p-6 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-white/20 text-white">
              <GitCompare className="w-5 h-5" />
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950">
              Đối Soánh Song Song
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            So Sánh Điểm Chuẩn & Thông Số Tuyển Sinh
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
            Đặt các trường lên bàn cân để dễ dàng quyết định phân bổ Nguyện vọng 1, Nguyện vọng 2 và Nguyện vọng 3.
          </p>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {schools.length === 0 ? (
            <div className="text-center py-12">
              <GitCompare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">Chưa chọn trường nào để so sánh</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Hãy bấm vào biểu tượng so sánh trên danh sách trường để thêm vào bàn cân đối chiếu.
              </p>
            </div>
          ) : (
            <>
              {/* Multi-School Trend Line Chart */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    Biểu đồ đối chiếu điểm chuẩn (2023 - 2026)
                  </h3>
                  <button
                    onClick={onClear}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Xóa tất cả
                  </button>
                </div>
                <TrendChart schools={schools} compact={false} />
              </div>

              {/* Side-by-Side Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 font-bold text-slate-500 w-44 bg-slate-50/80 rounded-l-xl">
                        Tiêu chí so sánh
                      </th>
                      {schools.map((school) => (
                        <th key={school.id} className="py-3 px-4 min-w-[200px] bg-slate-50/40">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div 
                                onClick={() => onSelectSchool(school)}
                                className="font-black text-sm text-slate-900 hover:text-blue-600 cursor-pointer"
                              >
                                {school.name}
                              </div>
                              <div className="text-[11px] text-slate-500">{school.district}, {school.province}</div>
                            </div>
                            <button
                              onClick={() => onRemove(school.id)}
                              className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                              title="Xóa trường khỏi so sánh"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-600">Loại trường & Thang điểm</td>
                      {schools.map((s) => (
                        <td key={s.id} className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            s.type === 'specialized' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {s.type === 'specialized' ? 'Chuyên' : 'Công lập'}
                          </span>
                          <span className="ml-1.5 text-slate-500">Thang {s.scoreScale}đ</span>
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-blue-50/30">
                      <td className="py-3 px-4 font-bold text-blue-900">Điểm chuẩn 2026 (Mới nhất)</td>
                      {schools.map((s) => (
                        <td key={s.id} className="py-3 px-4">
                          <span className="text-base font-black text-blue-700">
                            {s.scores.year2026.toFixed(2)} đ
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-600">Điểm chuẩn 2025</td>
                      {schools.map((s) => (
                        <td key={s.id} className="py-3 px-4 font-bold text-slate-800">
                          {s.scores.year2025.toFixed(2)} đ
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-600">Điểm chuẩn 2024</td>
                      {schools.map((s) => (
                        <td key={s.id} className="py-3 px-4 font-bold text-slate-800">
                          {s.scores.year2024.toFixed(2)} đ
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-600">Điểm chuẩn 2023</td>
                      {schools.map((s) => (
                        <td key={s.id} className="py-3 px-4 font-bold text-slate-800">
                          {s.scores.year2023.toFixed(2)} đ
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-600">Tỷ lệ chọi 2026</td>
                      {schools.map((s) => (
                        <td key={s.id} className="py-3 px-4">
                          <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                            1 : {s.ratio.ratio2026 || '—'}
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-600">Chỉ tiêu 2026</td>
                      {schools.map((s) => (
                        <td key={s.id} className="py-3 px-4 font-semibold text-slate-800">
                          {s.quota.year2026} học sinh
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-600">Điểm dự kiến NV2</td>
                      {schools.map((s) => (
                        <td key={s.id} className="py-3 px-4 text-slate-700 font-medium">
                          {s.nv2Score?.year2026 ? `${s.nv2Score.year2026} đ` : `${(s.scores.year2026 + 1.0).toFixed(2)} đ`}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-600">Điểm nổi bật</td>
                      {schools.map((s) => (
                        <td key={s.id} className="py-3 px-4 text-slate-600 italic">
                          "{s.highlight}"
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition"
          >
            Đóng bảng so sánh
          </button>
        </div>
      </div>
    </div>
  );
};
