import jsPDF from "jspdf";
import "jspdf-autotable";

// Function to add a logo
const addLogo = (doc) => {
  const imgData = './.././.././../public/assets/logo.png'; // Ruta de la imagen
  doc.addImage(imgData, 'JPEG', 10, 10, 50, 20); // Ajustar la posición y el tamaño según sea necesario
};

export const generarPDFPresupuesto = (presu, totalMonto) => {
  const doc = new jsPDF();

  // Agregar logo
  addLogo(doc);

  // Título
  doc.setFontSize(20);
  doc.text(" Presupuesto", 70, 30);

  // Información del presupuesto en tabla
  const presuInfo = [
    ["Nº", presu.codigo_presupuesto],
    ["Nombre Completo", `${presu.nombre} ${presu.apellido}`],
    ["Cedula", presu.cedula]
  ];

  doc.autoTable({
    startY: 40,
    head: [['Información del Presupuesto', '']],
    body: presuInfo,
    styles: {
      fontSize: 12,
      halign: 'left'
    },
    headStyles: {
      fillColor: [0, 139, 148],
      textColor: [255, 255, 255]
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240]
    }
  });

  // Tabla de Detalles
  if (presu.detalles.length > 0) {
    const detallesTitleY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14); // Tamaño de fuente reducido para el título
    const detallesTitleX = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth("Detalles del Presupuesto") * 16 / 2); // Centrar el título
    doc.text("Detalles del Presupuesto", detallesTitleX, detallesTitleY); // Título para la tabla de detalles
    doc.setFontSize(12);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Descripción', 'Monto']],
      body: presu.detalles.map(detalle => [
        detalle.descripcion,
        detalle.monto
      ]),
      headStyles: {
        fillColor: [0, 139, 148], // Fondo verde para el encabezado
        textColor: [255, 255, 255], // Texto blanco para el encabezado
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Gris claro para filas alternas
      },
    });


   // Agregar el total centrado
   const totalTitleY = doc.lastAutoTable.finalY + 10;
   const totalTitleX = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(`Total: ${totalMonto.toFixed(2)}`) * doc.internal.getFontSize() / 2);
   doc.text(`Total: ${totalMonto.toFixed(2)}`, totalTitleX, totalTitleY);
 }

  // Pie de página
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  doc.setFontSize(8);
  doc.text(`Generado el: ${dateStr}`, 10, doc.lastAutoTable.finalY + 20);

  // Guardar el PDF
  doc.save(`presupuesto_${presu.codigo_presupuesto}_${dateStr}.pdf`);
};
