import React from 'react';
import { 
  GraduationCap, 
  Calculator, 
  GitCompare, 
  Heart, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';

interface NavbarProps {
  onOpenCalculator: () => void;
  onOpenCompare: () => void;
  onOpenWishlist: () => void;
  onOpenGuide: () => void;
  compareCount: number;
  wishlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCalculator,
  onOpenCompare,
  onOpenWishlist,
  onOpenGuide,
  compareCount,
  wishlistCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  Tra Cứu Điểm THPT
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">
                  2023 - 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Hệ thống dữ liệu tuyển sinh vào lớp 10 chính xác & phân tích xu hướng
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition border border-slate-200 hover:border-blue-200"
              title="Tính điểm xét tuyển & gợi ý trường vừa sức"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Tính điểm & Gợi ý</span>
              <span className="sm:hidden">Tính điểm</span>
            </button>

            <button
              onClick={onOpenCompare}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition border border-slate-200 hover:border-indigo-200"
              title="So sánh điểm chuẩn 2-3 trường"
            >
              <GitCompare className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">So sánh</span>
              {compareCount > 0 && (
                <span className="ml-0.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-indigo-600 text-white rounded-full">
                  {compareCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenWishlist}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition border border-slate-200 hover:border-rose-200"
              title="Danh sách nguyện vọng đã lưu"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
              <span className="hidden sm:inline">Nguyện vọng</span>
              {wishlistCount > 0 && (
                <span className="ml-0.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-rose-500 text-white rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenGuide}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-sm transition"
              title="Cẩm nang quy chế tuyển sinh 2026"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">Cẩm nang 2026</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse hidden md:inline" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
