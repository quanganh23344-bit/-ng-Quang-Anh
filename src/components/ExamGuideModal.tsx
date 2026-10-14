import React from 'react';
import { 
  X, 
  BookOpen, 
  Calendar, 
  Lightbulb, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Award,
  Sparkles
} from 'lucide-react';
import { EXAM_POLICY_2026 } from '../data/schoolsData';

interface ExamGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExamGuideModal: React.FC<ExamGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-linear-to-r from-blue-700 via-indigo-700 to-sky-700 p-5 sm:p-6 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-white/20 text-white">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950">
              Cẩm Nang Mùa Thi 2026
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Hướng Dẫn Tuyển Sinh Vào Lớp 10 THPT Năm 2026
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
            Tổng hợp quy chế thi theo chương trình GDPT 2018 mới, cách tính điểm xét tuyển và chiến lược đỗ trường điểm.
          </p>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          {/* Key Update 2026 Notice */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
            <div className="flex items-center gap-2 font-bold text-indigo-900 text-sm sm:text-base mb-1.5">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Điểm mới nổi bật của kỳ thi vào lớp 10 năm học 2026
            </div>
            <p className="text-slate-600">
              Kỳ thi năm 2026 tiếp tục triển khai đánh giá theo định hướng phát triển năng lực của <strong>Chương trình GDPT 2018</strong>. Cấu trúc đề thi chú trọng các câu hỏi gắn liền bối cảnh thực tế đời sống, tư duy phản biện, kỹ năng đọc hiểu văn bản ngoài sách giáo khoa và các dạng toán ứng dụng mô hình hóa.
            </p>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Lộ trình & Mốc thời gian trọng tâm mùa thi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-blue-600 uppercase block mb-1">Tháng 3 - 4</span>
                <strong className="text-slate-800 block text-xs">Công bố kế hoạch & Chỉ tiêu</strong>
                <p className="text-[11px] text-slate-500 mt-1">Sở GD&ĐT công bố số môn thi, chỉ tiêu tuyển sinh và phương thức xét tuyển các trường.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-indigo-600 uppercase block mb-1">Tháng 5</span>
                <strong className="text-slate-800 block text-xs">Đăng ký Nguyện vọng</strong>
                <p className="text-[11px] text-slate-500 mt-1">Thí sinh nộp phiếu đăng ký NV1, NV2, NV3. Sở GD công bố số lượng hồ sơ nộp vào từng trường.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-emerald-600 uppercase block mb-1">Đầu Tháng 6</span>
                <strong className="text-slate-800 block text-xs">Chính thức Thi tuyển</strong>
                <p className="text-[11px] text-slate-500 mt-1">Diễn ra kỳ thi tuyển sinh chung 3 môn Toán, Văn, Ngoại ngữ và các môn thi Chuyên.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-amber-600 uppercase block mb-1">Cuối Tháng 6 - 7</span>
                <strong className="text-slate-800 block text-xs">Công bố Điểm chuẩn & Nhập học</strong>
                <p className="text-[11px] text-slate-500 mt-1">Công bố điểm thi, phổ điểm chuẩn chính thức và xác nhận thủ tục nhập học trực tuyến.</p>
              </div>
            </div>
          </div>

          {/* Regional Policy Breakdown */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              Công thức tính điểm & Quy chế theo tỉnh / thành phố
            </h3>
            <div className="space-y-3">
              {/* Hà Nội */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800 text-sm">1. Thành phố Hà Nội</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold">Thang 50 / Thang 30</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>• Phương thức:</strong> {EXAM_POLICY_2026.hanoi.method}</p>
                  <p><strong>• Công thức:</strong> {EXAM_POLICY_2026.hanoi.scoreFormula}</p>
                  <p><strong>• Quy chế NV:</strong> {EXAM_POLICY_2026.hanoi.note}</p>
                </div>
              </div>

              {/* TP.HCM */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800 text-sm">2. Thành phố Hồ Chí Minh</span>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-semibold">Thang 30 (Hệ số 1)</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>• Phương thức:</strong> {EXAM_POLICY_2026.hcm.method}</p>
                  <p><strong>• Công thức:</strong> {EXAM_POLICY_2026.hcm.scoreFormula}</p>
                  <p><strong>• Quy chế NV:</strong> {EXAM_POLICY_2026.hcm.note}</p>
                </div>
              </div>

              {/* Đà Nẵng */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800 text-sm">3. Thành phố Đà Nẵng</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-semibold">Thang chuẩn hóa</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>• Phương thức:</strong> {EXAM_POLICY_2026.danang.method}</p>
                  <p><strong>• Công thức:</strong> {EXAM_POLICY_2026.danang.scoreFormula}</p>
                  <p><strong>• Quy chế NV:</strong> {EXAM_POLICY_2026.danang.note}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Golden Tips */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              5 Bí quyết vàng để đặt nguyện vọng không bị trượt oan
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2.5 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">1. Đánh giá đúng năng lực thực tế qua các kỳ thi thử:</strong>
                  <span>Lấy điểm trung bình của 2-3 đợt thi thử gần nhất làm căn cứ, trừ hao khoảng 0.5 - 1.0 điểm để tính mức an toàn trước biến số tâm lý phòng thi.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">2. Áp dụng quy tắc khoảng cách điểm (Gap):</strong>
                  <span>Điểm chuẩn các trường ở NV1 và NV2 nên cách nhau tối thiểu 1.5 đến 2.0 điểm. Không đặt 2 trường có điểm chuẩn xấp xỉ nhau vì nếu trượt NV1 thì gần như chắc chắn sẽ trượt luôn NV2.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">3. Xem xét khoảng cách địa lý và phương tiện di chuyển:</strong>
                  <span>Ưu tiên trường học trong bán kính thuận tiện di chuyển (dưới 7km) để đảm bảo sức khỏe học tập suốt 3 năm cấp ba.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">4. Phân tích biến động điểm 4 năm liên tiếp (2023 - 2026):</strong>
                  <span>Không chỉ nhìn vào điểm năm liền trước (2025). Những trường có điểm giảm sâu bất thường năm 2024-2025 thường sẽ bật tăng trở lại vào năm 2026 do tâm lý đổ xô nộp hồ sơ.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">5. Luôn chuẩn bị phương án dự phòng THPT tư thục / chất lượng cao:</strong>
                  <span>Tìm hiểu trước 1-2 trường tư thục uy tín xét học bạ sớm để giải tỏa áp lực tâm lý cho cả học sinh và phụ huynh.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
          >
            Đã hiểu, quay lại tra cứu
          </button>
        </div>
      </div>
    </div>
  );
};
