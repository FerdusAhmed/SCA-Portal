import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download } from 'lucide-react';

const DownloadExamRoutine = ({ e }) => {

    const formatTime = (timeString) => {
        if (!timeString) return "";
        let [hours, minutes] = timeString.split(':');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    };

  // ... আগের ইমপোর্টগুলো
const downloadPDF = (exam) => {
    if (!exam) return;

    const doc = new jsPDF('p', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();

    // ১. Header - গাঢ় থেকে হালকা গ্রেডিয়েন্ট বা ক্লিন লুক
    doc.setFillColor(31, 41, 55); // Dark Gray for premium look
    doc.rect(0, 0, pageWidth, 100, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("SHAHID CADET ACADEMY", 40, 50);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Kaliganj, Bangladesh | 2026 Academic Session", 40, 70);

    // ২. Exam Information Card
    doc.setFillColor(249, 250, 251); // Very light gray
    doc.roundedRect(40, 120, pageWidth - 80, 70, 5, 5, 'F');
    doc.setTextColor(50);
    doc.setFontSize(14);
    doc.text(`Exam: ${exam.exam}`, 55, 145);
    doc.setFontSize(11);
    doc.text(`Class: ${exam.class.split('-')[1]} | Date: ${exam.startDate} - ${exam.endDate}`, 55, 165);

    // ৩. AutoTable - ক্লিন এবং মডার্ন
    autoTable(doc, {
        startY: 210,
        head: [['No', 'Subject Name', 'Date', 'Start Time', 'End Time']],
        body: exam.subjects.map((sub, index) => [
            index + 1,
            sub.subjectName,
            sub.examDate,
            formatTime(sub.startTime),
            formatTime(sub.endTime),
        ]),
        headStyles: {
            fillColor: [31, 41, 55], // হেডার টেবিলটিও প্রিমিয়াম কালারে
            textColor: 255,
            fontSize: 10,
            halign: 'center',
            fontStyle: 'bold'
        },
        bodyStyles: {
            fontSize: 10,
            lineColor: [229, 231, 235],
            lineWidth: 0.5,
            halign: 'center'
        },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        columnStyles: { 1: { halign: 'left' } },
        margin: { left: 40, right: 40 }
    });

    // ৪. Footer with Page Numbering
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 40, doc.internal.pageSize.getHeight() - 30);
    doc.text(`Page 1 of ${pageCount}`, pageWidth - 60, doc.internal.pageSize.getHeight() - 30);

    doc.save(`Routine_${exam.class}.pdf`);
};

    return (
       <button
  onClick={() => downloadPDF(e)}
  className="w-full flex items-center justify-center gap-2 py-3 px-4 md:py-3.5 md:px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 uppercase text-[10px] md:text-[11px] tracking-widest whitespace-nowrap"
>
  <Download size={16} />
  <span>
    Download <span className="hidden sm:inline">Routine</span> <span className="hidden md:inline">PDF</span>
  </span>
</button>
    );
};

export default DownloadExamRoutine;