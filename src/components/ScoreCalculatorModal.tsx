import React, { useState, useMemo } from 'react';
import { School } from '../types/school';
import { 
  X, 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface ScoreCalculatorModalProps {
  schools: School[];
  isOpen: boolean;
  onClose: () => void;
  onSelectSchool: (school: School) => void;
  onAddToWishlist: (school: School, priority: 1 | 2 | 3) => void;
}

export const ScoreCalculatorModal: React.FC<ScoreCalculatorModalProps> = ({
  schools,
  isOpen,
  onClose,
  onSelectSchool,
  onAddToWishlist,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string>('Hà Nội');
  const [mathScore, setMathScore] = useState<number>(8.0);
  const [litScore, setLitScore] = useState<number>(8.0);
  const [engScore, setEngScore] = useState<number>(8.5);
  const [priorityScore, setPriorityScore] = useState<number>(0.0);
  const [targetYear, setTargetYear] = useState<'2025' | '2026'>('2026');

  // Hà Nội scale 50: (Toán + Văn)*2 + Anh + UT
  const scoreScale50 = useMemo(() => {
    const val = (mathScore + litScore) * 2 + engScore + priorityScore;
    return Number(val.toFixed(2));
  }, [mathScore, litScore, engScore, priorityScore]);

  // Standard scale 30: Toán + Văn + Anh + UT
  const scoreScale30 = useMemo(() => {
    const val = mathScore + litScore + engScore + priorityScore;
    return Number(val.toFixed(2));
  }, [mathScore, litScore, engScore, priorityScore]);

  // Filter schools in selected province
  const provinceSchools = useMemo(() => {
    return schools.filter(s => s.province === selectedProvince);
  }, [schools, selectedProvince]);

  // Categorize schools
  const categorizedSchools = useMemo(() => {
    const safe: { school: School; diff: number; scoreUsed: number }[] = [];
    const moderate: { school: School; diff: number; scoreUsed: number }[] = [];
    const risky: { school: School; diff: number; scoreUsed: number }[] = [];

    provinceSchools.forEach(school => {
      const userScore = school.scoreScale === 50 ? scoreScale50 : scoreScale30;
      const benchmark = targetYear === '2026' ? school.scores.year2026 : school.scores.year2025;
      const diff = Number((userScore - benchmark).toFixed(2));

      if (diff >= 1.0) {
        safe.push({ school, diff, scoreUsed: userScore });
      } else if (diff >= -1.0) {
        moderate.push({ school, diff, scoreUsed: userScore });
      } else {
        risky.push({ school, diff, scoreUsed: userScore });
      }
    });

    // Sort safe descending by benchmark, moderate descending, risky ascending
    safe.sort((a, b) => b.school.scores.year2026 - a.school.scores.year2026);
    moderate.sort((a, b) => b.school.scores.year2026 - a.school.scores.year2026);
    risky.sort((a, b) => b.school.scores.year2026 - a.school.scores.year2026);

    return { safe, moderate, risky };
  }, [provinceSchools, scoreScale50, scoreScale30, targetYear]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-linear-to-r from-blue-600 via-indigo-600 to-sky-600 p-5 sm:p-6 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-white/20 text-white">
              <Calculator className="w-5 h-5" />
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950">
              Mô Phỏng Trúng Tuyển 2026
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Công Cụ Tính Điểm & Gợi Ý Trường THPT Vừa Sức
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
            Nhập điểm thi thử hoặc dự kiến 3 môn để hệ thống tự động phân loại trường thành: Vùng An Toàn, Vùng Vừa Sức và Vùng Thử Thách.
          </p>
        </div>

        {/* Calculator Inputs Bar */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 shrink-0">
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 sm:gap-4 items-end">
            <div className="col-span-2 sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Khu vực tuyển sinh
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-xs focus:ring-2 focus:ring-blue-500"
              >
                <option value="Hà Nội">Hà Nội (Thang 50đ)</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh (Thang 30đ)</option>
                <option value="Đà Nẵng">Đà Nẵng (Thang 30đ)</option>
                <option value="Hải Phòng">Hải Phòng (Thang 50đ)</option>
                <option value="Nghệ An">Nghệ An (Thang 30đ)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Toán (0-10)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.25"
                value={mathScore}
                onChange={(e) => setMathScore(Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
                className="w-full text-xs sm:text-sm font-bold text-center rounded-xl border border-slate-300 bg-white px-2 py-2 text-slate-800 shadow-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ngữ văn (0-10)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.25"
                value={litScore}
                onChange={(e) => setLitScore(Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
                className="w-full text-xs sm:text-sm font-bold text-center rounded-xl border border-slate-300 bg-white px-2 py-2 text-slate-800 shadow-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ngoại ngữ (0-10)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.25"
                value={engScore}
                onChange={(e) => setEngScore(Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
                className="w-full text-xs sm:text-sm font-bold text-center rounded-xl border border-slate-300 bg-white px-2 py-2 text-slate-800 shadow-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Điểm ưu tiên
              </label>
              <input
                type="number"
                min="0"
                max="2"
                step="0.5"
                value={priorityScore}
                onChange={(e) => setPriorityScore(Math.min(2, Math.max(0, parseFloat(e.target.value) || 0)))}
                className="w-full text-xs sm:text-sm font-bold text-center rounded-xl border border-slate-300 bg-white px-2 py-2 text-slate-800 shadow-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Result Calculation Banner */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              {selectedProvince === 'Hà Nội' || selectedProvince === 'Hải Phòng' ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-600 font-medium">Tổng điểm xét tuyển (Thang 50):</span>
                  <span className="text-2xl font-black text-blue-700 bg-blue-100/70 px-3 py-0.5 rounded-lg border border-blue-200">
                    {scoreScale50} đ
                  </span>
                  <span className="text-xs text-slate-400">
                    ((Toán + Văn) x 2 + Anh + {priorityScore})
                  </span>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-600 font-medium">Tổng điểm xét tuyển (Thang 30):</span>
                  <span className="text-2xl font-black text-blue-700 bg-blue-100/70 px-3 py-0.5 rounded-lg border border-blue-200">
                    {scoreScale30} đ
                  </span>
                  <span className="text-xs text-slate-400">
                    (Toán + Văn + Anh + {priorityScore})
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span>So sánh theo điểm năm:</span>
              <button
                onClick={() => setTargetYear('2026')}
                className={`px-2.5 py-1 rounded-md transition ${
                  targetYear === '2026' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                Năm 2026 (Mới nhất)
              </button>
              <button
                onClick={() => setTargetYear('2025')}
                className={`px-2.5 py-1 rounded-md transition ${
                  targetYear === '2025' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                Năm 2025
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Recommended School Lists */}
        <div className="overflow-y-auto p-5 space-y-6">
          {/* 1. Safe Zone */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1 rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-emerald-800 text-sm sm:text-base">
                  Vùng An Toàn — Khả năng trúng tuyển cao (&gt;90%)
                </h3>
                <p className="text-xs text-emerald-600">
                  Điểm của bạn cao hơn điểm chuẩn từ +1.0 điểm trở lên. Phù hợp làm NV2 hoặc NV3 dự phòng chắc chắn.
                </p>
              </div>
              <span className="ml-auto text-xs font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {categorizedSchools.safe.length} trường
              </span>
            </div>

            {categorizedSchools.safe.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 text-slate-500 text-xs text-center border border-slate-200">
                Chưa có trường nào trong khu vực này thuộc vùng an toàn với mức điểm hiện tại. Hãy thử nâng điểm các môn!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categorizedSchools.safe.map(({ school, diff }) => (
                  <div 
                    key={school.id}
                    className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 transition flex items-center justify-between gap-3"
                  >
                    <div>
                      <div 
                        onClick={() => onSelectSchool(school)}
                        className="font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                      >
                        {school.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Chuẩn {targetYear}: <strong className="text-slate-800">{school.scores[`year${targetYear}`].toFixed(2)} đ</strong>
                        <span className="ml-2 font-bold text-emerald-700">(Dư +{diff} đ)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onAddToWishlist(school, 2)}
                        className="px-2 py-1 bg-white hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-300 text-[11px] font-bold rounded-lg transition"
                        title="Thêm vào Nguyện vọng 2 an toàn"
                      >
                        Lưu NV2
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Moderate Zone */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1 rounded-full bg-amber-100 text-amber-700">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-amber-800 text-sm sm:text-base">
                  Vùng Vừa Sức & Cân Nhắc — Khả năng trúng tuyển (60% - 85%)
                </h3>
                <p className="text-xs text-amber-700">
                  Điểm của bạn dao động trong khoảng ±1.0 điểm so với trường. Đây là nhóm mục tiêu lý tưởng nhất cho Nguyện vọng 1!
                </p>
              </div>
              <span className="ml-auto text-xs font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                {categorizedSchools.moderate.length} trường
              </span>
            </div>

            {categorizedSchools.moderate.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 text-slate-500 text-xs text-center border border-slate-200">
                Không có trường nào nằm trong khoảng chênh lệch ±1.0 điểm.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categorizedSchools.moderate.map(({ school, diff }) => (
                  <div 
                    key={school.id}
                    className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 transition flex items-center justify-between gap-3"
                  >
                    <div>
                      <div 
                        onClick={() => onSelectSchool(school)}
                        className="font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                      >
                        {school.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Chuẩn {targetYear}: <strong className="text-slate-800">{school.scores[`year${targetYear}`].toFixed(2)} đ</strong>
                        <span className={`ml-2 font-bold ${diff >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                          ({diff >= 0 ? `+${diff}` : diff} đ)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onAddToWishlist(school, 1)}
                        className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded-lg transition"
                        title="Đặt làm Nguyện vọng 1"
                      >
                        Chọn NV1
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Risky Zone */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1 rounded-full bg-rose-100 text-rose-700">
                <XCircle className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-rose-800 text-sm sm:text-base">
                  Vùng Thử Thách & Nguy Cơ — Cần bứt phá thêm
                </h3>
                <p className="text-xs text-rose-600">
                  Điểm của bạn thấp hơn điểm chuẩn từ 1.0 điểm trở lên. Nếu chọn làm NV1, bạn cần ôn luyện tăng tốc.
                </p>
              </div>
              <span className="ml-auto text-xs font-black bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                {categorizedSchools.risky.length} trường
              </span>
            </div>

            {categorizedSchools.risky.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 text-slate-500 text-xs text-center border border-slate-200">
                Điểm số của bạn rất cao! Không có trường nào vượt quá tầm với trong khu vực này.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categorizedSchools.risky.slice(0, 6).map(({ school, diff }) => (
                  <div 
                    key={school.id}
                    className="p-3 rounded-xl border border-rose-200 bg-rose-50/30 hover:bg-rose-50 transition flex items-center justify-between gap-3"
                  >
                    <div>
                      <div 
                        onClick={() => onSelectSchool(school)}
                        className="font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                      >
                        {school.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Chuẩn {targetYear}: <strong className="text-slate-800">{school.scores[`year${targetYear}`].toFixed(2)} đ</strong>
                        <span className="ml-2 font-bold text-rose-600">({diff} đ)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectSchool(school)}
                      className="text-xs text-slate-500 hover:text-blue-600 font-semibold"
                    >
                      Chi tiết →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-center shrink-0">
          <p className="text-xs text-slate-500">
            * Kết quả gợi ý chỉ mang tính chất tham khảo, dựa trên quy chế xét tuyển của Sở Giáo dục và Đào tạo.
          </p>
        </div>
      </div>
    </div>
  );
};
