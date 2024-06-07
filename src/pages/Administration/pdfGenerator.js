import jsPDF from "jspdf";
import "jspdf-autotable";

// Function to add a logo
const addLogo = (doc) => {
  const imgData = 'https://i.ibb.co/vY4WCxQ/logo.png'; // Ruta de la imagen
  doc.addImage(imgData, 'JPEG', 10, 10, 50, 20); // Ajustar la posición y el tamaño según sea necesario
};

export const generadorPDF = (transData, paciente, cedula, montoBs) => {
  // Ajustar los valores nulos a 0.00
  const ingreso = transData.ingreso ? parseFloat(transData.ingreso).toFixed(2) : '0.00';
  const deuda = transData.deuda ? parseFloat(transData.deuda).toFixed(2) : '0.00';

  // Calcular montos en Bolívares
  const ingresoBs = transData.ingreso ? (parseFloat(transData.ingreso) * montoBs).toFixed(2) : '0.00';
  const deudaBs = transData.deuda ? (parseFloat(transData.deuda) * montoBs).toFixed(2) : '0.00';

  const doc = new jsPDF();

  // Agregar logo
  addLogo(doc);

  // Título
  doc.setFontSize(20);
  doc.text("Registro de Pago", 70, 30);

  // Contenido de la tabla
  const tableColumn = ["Clave", "Valor"];
  const tableRows = [];

  const transactionData = [
    ["Fecha", transData.fecha],
    ["Cédula del Paciente", cedula],
    ["Nombre del Paciente", paciente.nombre],
    ["Apellido del Paciente", paciente.apellido],
    ["Monto de Consulta o Servicio (USD)", `${deuda}$`],
    ["Monto Cancelado por el Paciente (USD)", `${ingreso}$`],
    ["Monto de Consulta o Servicio (Bs)", `${deudaBs} Bs`],
    ["Monto Cancelado por el Paciente (Bs)", `${ingresoBs} Bs`],
    ["Observaciones", transData.observaciones],
    ["Método de Pago", transData.formaPago],
  ];

  transactionData.forEach(transRow => {
    const transData = [
      transRow[0],
      transRow[1],
    ];
    tableRows.push(transData);
  });

  // Estilos de la tabla
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 50,
    styles: {
      fontSize: 10,
      halign: 'center',
    },
    headStyles: {
      fillColor: [0, 139, 148], // Fondo verde para el encabezado
      textColor: [255, 255, 255], // Texto blanco para el encabezado
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240], // Gris claro para filas alternas
    },
  });

  // Pie de página
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  
  // Reducir el tamaño de la letra para el pie de página
  doc.setFontSize(8);
  doc.text(`Generado el: ${dateStr}`, 10, doc.lastAutoTable.finalY + 10);

  // Guardar el PDF
  doc.save(`registro_pago_${dateStr}.pdf`);
};
