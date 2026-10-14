import React from 'react';
import { School } from '../types/school';
import { 
  X, 
  Heart, 
  Trash2, 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  Printer, 
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';

interface WishlistModalProps {
  wishlist: {
    nv1: School | null;
    nv2: School | null;
    nv3: School | null;
  };
  isOpen: boolean;
  onClose: () => void;
  onRemoveFromNv: (nv: 1 | 2 | 3) => void;
  onSelectSchool: (school: School) => void;
  onClearAll: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  wishlist,
  isOpen,
  onClose,
  onRemoveFromNv,
  onSelectSchool,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const hasAnySchool = wishlist.nv1 || wishlist.nv2 || wishlist.nv3;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 print:p-0">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-linear-to-r from-rose-600 via-pink-600 to-indigo-600 p-5 sm:p-6 text-white shrink-0 print:bg-none print:text-black">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition print:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-white/20 text-white print:hidden">
              <Heart className="w-5 h-5" />
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950 print:hidden">
              Phiếu Đăng Ký Dự Kiến
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Danh Sách Nguyện Vọng Tuyển Sinh Lớp 10
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 max-w-2xl mt-1 print:text-slate-600">
            Chiến thuật phân bổ 3 bậc thang: NV1 (Mơ ước) - NV2 (Vừa sức) - NV3 (Bảo đảm an toàn).
          </p>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Strategic advice banner */}
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong className="block mb-0.5">Lời khuyên chiến thuật đặt nguyện vọng 2026:</strong>
              • <strong>NV1:</strong> Đặt trường yêu thích nhất có điểm chuẩn ngang hoặc nhỉnh hơn lực học khoảng 0.5 - 1.0 đ.<br/>
              • <strong>NV2:</strong> Đặt trường có điểm chuẩn thấp hơn NV1 từ 1.0 - 2.0 đ để đảm bảo an toàn trúng tuyển.<br/>
              • <strong>NV3:</strong> Đặt trường có điểm chuẩn thấp hơn năng lực từ 2.5 - 3.5 đ làm phao cứu sinh tuyệt đối.
            </div>
          </div>

          {/* 3 Wishlist Slots */}
          <div className="space-y-4">
            {/* NV1 */}
            <div className="p-4 rounded-2xl border-2 border-blue-200 bg-blue-50/30">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white">
                  Nguyện Vọng 1 (Ưu tiên số 1)
                </span>
                {wishlist.nv1 && (
                  <button
                    onClick={() => onRemoveFromNv(1)}
                    className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1 print:hidden"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Xóa
                  </button>
                )}
              </div>

              {wishlist.nv1 ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-blue-100">
                  <div>
                    <h3 
                      onClick={() => onSelectSchool(wishlist.nv1!)}
                      className="font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 cursor-pointer"
                    >
                      {wishlist.nv1.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {wishlist.nv1.district}, {wishlist.nv1.province} • Mã: {wishlist.nv1.code}
                    </div>
                  </div>
                  <div className="text-right sm:border-l sm:pl-4 border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Chuẩn 2026</span>
                    <span className="text-base font-black text-blue-700">
                      {wishlist.nv1.scores.year2026.toFixed(2)} đ
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 bg-white/70 border border-dashed border-blue-200 rounded-xl text-xs text-slate-400">
                  Chưa chọn trường cho Nguyện vọng 1. Hãy chọn trong danh sách trường.
                </div>
              )}
            </div>

            {/* NV2 */}
            <div className="p-4 rounded-2xl border-2 border-indigo-200 bg-indigo-50/30">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-600 text-white">
                  Nguyện Vọng 2 (Vừa sức / Dự phòng)
                </span>
                {wishlist.nv2 && (
                  <button
                    onClick={() => onRemoveFromNv(2)}
                    className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1 print:hidden"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Xóa
                  </button>
                )}
              </div>

              {wishlist.nv2 ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-indigo-100">
                  <div>
                    <h3 
                      onClick={() => onSelectSchool(wishlist.nv2!)}
                      className="font-bold text-sm sm:text-base text-slate-900 hover:text-indigo-600 cursor-pointer"
                    >
                      {wishlist.nv2.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {wishlist.nv2.district}, {wishlist.nv2.province} • Mã: {wishlist.nv2.code}
                    </div>
                  </div>
                  <div className="text-right sm:border-l sm:pl-4 border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Chuẩn 2026</span>
                    <span className="text-base font-black text-indigo-700">
                      {wishlist.nv2.scores.year2026.toFixed(2)} đ
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 bg-white/70 border border-dashed border-indigo-200 rounded-xl text-xs text-slate-400">
                  Chưa chọn trường cho Nguyện vọng 2.
                </div>
              )}
            </div>

            {/* NV3 */}
            <div className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-slate-700 text-white">
                  Nguyện Vọng 3 (Bảo đảm an toàn đỗ)
                </span>
                {wishlist.nv3 && (
                  <button
                    onClick={() => onRemoveFromNv(3)}
                    className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1 print:hidden"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Xóa
                  </button>
                )}
              </div>

              {wishlist.nv3 ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <h3 
                      onClick={() => onSelectSchool(wishlist.nv3!)}
                      className="font-bold text-sm sm:text-base text-slate-900 hover:text-slate-700 cursor-pointer"
                    >
                      {wishlist.nv3.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {wishlist.nv3.district}, {wishlist.nv3.province} • Mã: {wishlist.nv3.code}
                    </div>
                  </div>
                  <div className="text-right sm:border-l sm:pl-4 border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Chuẩn 2026</span>
                    <span className="text-base font-black text-slate-800">
                      {wishlist.nv3.scores.year2026.toFixed(2)} đ
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 bg-white/70 border border-dashed border-slate-300 rounded-xl text-xs text-slate-400">
                  Chưa chọn trường cho Nguyện vọng 3.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden">
          {hasAnySchool && (
            <button
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa toàn bộ NV
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handlePrint}
              disabled={!hasAnySchool}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-800 text-xs font-bold transition"
            >
              <Printer className="w-3.5 h-3.5" /> In phiếu NV
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
            >
              Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
