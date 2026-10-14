import React, { useState, useMemo } from 'react';
import { SCHOOLS_DATA, PROVINCE_OPTIONS } from './data/schoolsData';
import { School, ProvinceFilter, TypeFilter, TrendFilter, SortOption } from './types/school';
import { Navbar } from './components/Navbar';
import { StatsBanner } from './components/StatsBanner';
import { SchoolCard } from './components/SchoolCard';
import { SchoolDetailModal } from './components/SchoolDetailModal';
import { ScoreCalculatorModal } from './components/ScoreCalculatorModal';
import { CompareModal } from './components/CompareModal';
import { WishlistModal } from './components/WishlistModal';
import { ExamGuideModal } from './components/ExamGuideModal';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  Table as TableIcon, 
  ArrowUpDown, 
  GitCompare, 
  Sparkles, 
  TrendingUp, 
  Flame, 
  CheckCircle2, 
  RotateCcw,
  GraduationCap,
  ExternalLink,
  Info
} from 'lucide-react';

export default function App() {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<ProvinceFilter>('Tất cả');
  const [selectedType, setSelectedType] = useState<TypeFilter>('all');
  const [selectedTrend, setSelectedTrend] = useState<TrendFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('score_desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals state
  const [activeSchool, setActiveSchool] = useState<School | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Compare & Wishlist state
  const [compareList, setCompareList] = useState<School[]>([]);
  const [wishlist, setWishlist] = useState<{
    nv1: School | null;
    nv2: School | null;
    nv3: School | null;
  }>({
    nv1: SCHOOLS_DATA[0] || null, // Default Chu Văn An as target example
    nv2: SCHOOLS_DATA[1] || null, // Kim Liên
    nv3: SCHOOLS_DATA[14] || null, // Khương Đình
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Toggle compare
  const handleToggleCompare = (school: School) => {
    if (compareList.some(s => s.id === school.id)) {
      setCompareList(prev => prev.filter(s => s.id !== school.id));
      showToast(`Đã xóa ${school.name} khỏi danh sách so sánh`);
    } else {
      if (compareList.length >= 4) {
        showToast('Bạn chỉ có thể so sánh tối đa 4 trường cùng lúc!');
        return;
      }
      setCompareList(prev => [...prev, school]);
      showToast(`Đã thêm ${school.name} vào bàn cân so sánh`);
    }
  };

  // Toggle Wishlist (assign to first empty NV slot, or remove)
  const isWishlisted = (schoolId: string) => {
    return wishlist.nv1?.id === schoolId || wishlist.nv2?.id === schoolId || wishlist.nv3?.id === schoolId;
  };

  const handleToggleWishlist = (school: School) => {
    if (isWishlisted(school.id)) {
      // remove
      if (wishlist.nv1?.id === school.id) setWishlist(w => ({ ...w, nv1: null }));
      if (wishlist.nv2?.id === school.id) setWishlist(w => ({ ...w, nv2: null }));
      if (wishlist.nv3?.id === school.id) setWishlist(w => ({ ...w, nv3: null }));
      showToast(`Đã bỏ ${school.name} khỏi danh sách nguyện vọng`);
    } else {
      // assign to first empty
      if (!wishlist.nv1) {
        setWishlist(w => ({ ...w, nv1: school }));
        showToast(`Đã đặt ${school.name} làm Nguyện vọng 1!`);
      } else if (!wishlist.nv2) {
        setWishlist(w => ({ ...w, nv2: school }));
        showToast(`Đã đặt ${school.name} làm Nguyện vọng 2!`);
      } else if (!wishlist.nv3) {
        setWishlist(w => ({ ...w, nv3: school }));
        showToast(`Đã đặt ${school.name} làm Nguyện vọng 3!`);
      } else {
        // overwrite NV3
        setWishlist(w => ({ ...w, nv3: school }));
        showToast(`Đã cập nhật ${school.name} vào Nguyện vọng 3!`);
      }
    }
  };

  const handleAddToWishlistWithPriority = (school: School, priority: 1 | 2 | 3) => {
    if (priority === 1) setWishlist(w => ({ ...w, nv1: school }));
    if (priority === 2) setWishlist(w => ({ ...w, nv2: school }));
    if (priority === 3) setWishlist(w => ({ ...w, nv3: school }));
    showToast(`Đã đặt ${school.name} vào Nguyện vọng ${priority}!`);
  };

  const handleRemoveFromNv = (priority: 1 | 2 | 3) => {
    if (priority === 1) setWishlist(w => ({ ...w, nv1: null }));
    if (priority === 2) setWishlist(w => ({ ...w, nv2: null }));
    if (priority === 3) setWishlist(w => ({ ...w, nv3: null }));
    showToast(`Đã xóa trường khỏi Nguyện vọng ${priority}`);
  };

  const handleClearAllWishlist = () => {
    setWishlist({ nv1: null, nv2: null, nv3: null });
    showToast('Đã xóa toàn bộ nguyện vọng đã lưu');
  };

  // Filter & Sort Logic
  const filteredSchools = useMemo(() => {
    return SCHOOLS_DATA.filter(school => {
      // Province match
      if (selectedProvince !== 'Tất cả' && school.province !== selectedProvince) {
        return false;
      }

      // Type match
      if (selectedType !== 'all' && school.type !== selectedType) {
        return false;
      }

      // Trend match
      if (selectedTrend !== 'all') {
        const delta = school.scores.year2026 - school.scores.year2025;
        if (selectedTrend === 'increasing' && delta <= 0) return false;
        if (selectedTrend === 'decreasing' && delta >= 0) return false;
        if (selectedTrend === 'stable' && Math.abs(delta) > 0.1) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = school.name.toLowerCase().includes(q);
        const matchCode = school.code.toLowerCase().includes(q);
        const matchDistrict = school.district.toLowerCase().includes(q);
        const matchTags = school.tags.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchCode && !matchDistrict && !matchTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'score_desc') {
        return b.scores.year2026 - a.scores.year2026;
      }
      if (sortOption === 'score_asc') {
        return a.scores.year2026 - b.scores.year2026;
      }
      if (sortOption === 'trend_desc') {
        const deltaA = a.scores.year2026 - a.scores.year2025;
        const deltaB = b.scores.year2026 - b.scores.year2025;
        return deltaB - deltaA;
      }
      if (sortOption === 'ratio_desc') {
        return (b.ratio.ratio2026 || 0) - (a.ratio.ratio2026 || 0);
      }
      if (sortOption === 'name_asc') {
        return a.name.localeCompare(b.name, 'vi');
      }
      return 0;
    });
  }, [searchQuery, selectedProvince, selectedType, selectedTrend, sortOption]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedProvince('Tất cả');
    setSelectedType('all');
    setSelectedTrend('all');
    setSortOption('score_desc');
  };

  const totalWishlistCount = [wishlist.nv1, wishlist.nv2, wishlist.nv3].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-bottom-5 duration-200 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        compareCount={compareList.length}
        wishlistCount={totalWishlistCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Banner with Stats */}
        <StatsBanner
          schools={SCHOOLS_DATA}
          onOpenGuide={() => setIsGuideOpen(true)}
        />

        {/* Search, Filters, and Display Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-6 space-y-4">
          {/* Top Search Input */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm nhanh theo tên trường (Chu Văn An, Yên Hòa...), quận huyện, mã trường..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Quick Calculator Shortcut */}
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs sm:text-sm font-bold transition shrink-0"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              Gợi ý trường theo điểm của tôi
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            {/* Province Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500 mr-1 hidden md:inline">
                Tỉnh / Thành:
              </span>
              {PROVINCE_OPTIONS.map((province) => (
                <button
                  key={province}
                  onClick={() => setSelectedProvince(province)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    selectedProvince === province
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {province}
                </button>
              ))}
            </div>

            {/* Right Tools: Type, Trend, Sort & View Mode */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as TypeFilter)}
                className="text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-slate-700"
              >
                <option value="all">Mọi loại trường</option>
                <option value="public">Công lập</option>
                <option value="specialized">Trường Chuyên</option>
              </select>

              {/* Trend Filter */}
              <select
                value={selectedTrend}
                onChange={(e) => setSelectedTrend(e.target.value as TrendFilter)}
                className="text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-slate-700"
              >
                <option value="all">Mọi xu hướng</option>
                <option value="increasing">Tăng điểm 2026</option>
                <option value="decreasing">Giảm điểm 2026</option>
                <option value="stable">Điểm ổn định</option>
              </select>

              {/* Sort Order */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-slate-700"
              >
                <option value="score_desc">Điểm 2026 cao nhất</option>
                <option value="score_asc">Điểm 2026 thấp nhất</option>
                <option value="trend_desc">Tăng điểm mạnh nhất</option>
                <option value="ratio_desc">Tỷ lệ chọi cao nhất</option>
                <option value="name_asc">Tên trường (A - Z)</option>
              </select>

              {/* View Switcher */}
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition ${
                    viewMode === 'grid' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Xem dạng thẻ"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-md transition ${
                    viewMode === 'table' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Xem bảng so sánh điểm chuẩn 2023 - 2026"
                >
                  <TableIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Results Status */}
        <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>
              Tìm thấy <strong className="text-slate-800">{filteredSchools.length}</strong> trường THPT
              {selectedProvince !== 'Tất cả' && ` tại ${selectedProvince}`}
            </span>
            {(searchQuery || selectedProvince !== 'Tất cả' || selectedType !== 'all' || selectedTrend !== 'all') && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold ml-2"
              >
                <RotateCcw className="w-3 h-3" /> Đặt lại bộ lọc
              </button>
            )}
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Dữ liệu bao gồm điểm thi chính thức 2023, 2024, 2025 và cập nhật mới nhất 2026
          </span>
        </div>

        {/* Content View: Grid or Table */}
        {filteredSchools.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">Không tìm thấy trường nào phù hợp</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Hãy thử thay đổi từ khóa tìm kiếm hoặc bấm đặt lại toàn bộ bộ lọc.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSchools.map((school) => (
              <SchoolCard
                key={school.id}
                school={school}
                onSelect={(s) => setActiveSchool(s)}
                onToggleCompare={handleToggleCompare}
                isComparing={compareList.some(s => s.id === school.id)}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={isWishlisted(school.id)}
              />
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                    <th className="py-3 px-4">Tên trường</th>
                    <th className="py-3 px-3">Khu vực</th>
                    <th className="py-3 px-3">Loại hình</th>
                    <th className="py-3 px-3 text-center">Thang</th>
                    <th className="py-3 px-3 text-center">2023</th>
                    <th className="py-3 px-3 text-center">2024</th>
                    <th className="py-3 px-3 text-center">2025</th>
                    <th className="py-3 px-3 text-center bg-blue-50/70 text-blue-900 font-extrabold">2026</th>
                    <th className="py-3 px-3 text-center">Tăng/Giảm</th>
                    <th className="py-3 px-3 text-center">Chọi 2026</th>
                    <th className="py-3 px-3 text-center">Chỉ tiêu</th>
                    <th className="py-3 px-4 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSchools.map((s) => {
                    const delta = Number((s.scores.year2026 - s.scores.year2025).toFixed(2));
                    const compared = compareList.some(item => item.id === s.id);
                    return (
                      <tr key={s.id} className="hover:bg-blue-50/30 transition">
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setActiveSchool(s)}
                            className="font-bold text-slate-900 hover:text-blue-600 text-left line-clamp-1"
                          >
                            {s.name}
                          </button>
                          <span className="text-[10px] text-slate-400 block">Mã: {s.code}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                          {s.district}, {s.province}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.type === 'specialized' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {s.type === 'specialized' ? 'Chuyên' : 'Công lập'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center text-slate-500 font-semibold">
                          {s.scoreScale}đ
                        </td>
                        <td className="py-3 px-3 text-center font-semibold text-slate-700">
                          {s.scores.year2023.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-center font-semibold text-slate-700">
                          {s.scores.year2024.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-center font-semibold text-slate-700">
                          {s.scores.year2025.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-center font-black text-blue-700 bg-blue-50/50">
                          {s.scores.year2026.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-center font-bold">
                          {delta > 0 ? (
                            <span className="text-rose-600">+{delta}</span>
                          ) : delta < 0 ? (
                            <span className="text-emerald-600">{delta}</span>
                          ) : (
                            <span className="text-slate-400">0.00</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center font-semibold text-slate-700">
                          1:{s.ratio.ratio2026 || '—'}
                        </td>
                        <td className="py-3 px-3 text-center text-slate-600">
                          {s.quota.year2026}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setActiveSchool(s)}
                              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[11px] font-bold"
                            >
                              Xem
                            </button>
                            <button
                              onClick={() => handleToggleCompare(s)}
                              className={`p-1 rounded-md text-xs font-bold border ${
                                compared 
                                  ? 'bg-indigo-600 text-white border-indigo-600' 
                                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                              }`}
                              title={compared ? 'Bỏ so sánh' : 'Thêm so sánh'}
                            >
                              <GitCompare className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Floating Compare Action Bar if items selected */}
      {compareList.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 backdrop-blur-md animate-in slide-in-from-bottom-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <GitCompare className="w-4 h-4 text-indigo-400" />
            <span>Đã chọn <strong className="text-indigo-400">{compareList.length}</strong> trường để so sánh</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
            >
              Mở bảng so sánh →
            </button>
            <button
              onClick={() => setCompareList([])}
              className="text-xs text-slate-400 hover:text-white px-2 py-1"
            >
              Xóa
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              10
            </div>
            <span className="font-bold text-slate-800">
              Cổng Tra Cứu Điểm Chuẩn Lớp 10 THPT Toàn Quốc (2023 - 2026)
            </span>
          </div>

          <div className="text-center sm:text-right">
            <p>Dữ liệu tổng hợp từ Sở Giáo Dục & Đào Tạo Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng, Nghệ An.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Hỗ trợ tính điểm xét tuyển theo chương trình Giáo dục Phổ thông 2018 mới.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SchoolDetailModal
        school={activeSchool}
        onClose={() => setActiveSchool(null)}
        onToggleCompare={handleToggleCompare}
        isComparing={activeSchool ? compareList.some(s => s.id === activeSchool.id) : false}
        onAddToWishlistWithPriority={handleAddToWishlistWithPriority}
        isWishlisted={activeSchool ? isWishlisted(activeSchool.id) : false}
      />

      <ScoreCalculatorModal
        schools={SCHOOLS_DATA}
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onSelectSchool={(s) => {
          setIsCalculatorOpen(false);
          setActiveSchool(s);
        }}
        onAddToWishlist={(s, p) => {
          handleAddToWishlistWithPriority(s, p);
        }}
      />

      <CompareModal
        schools={compareList}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemove={(id) => setCompareList(prev => prev.filter(s => s.id !== id))}
        onClear={() => setCompareList([])}
        onSelectSchool={(s) => {
          setIsCompareOpen(false);
          setActiveSchool(s);
        }}
      />

      <WishlistModal
        wishlist={wishlist}
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onRemoveFromNv={handleRemoveFromNv}
        onSelectSchool={(s) => {
          setIsWishlistOpen(false);
          setActiveSchool(s);
        }}
        onClearAll={handleClearAllWishlist}
      />

      <ExamGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
