// src/utils/pdfGenerator.js
import jsPDF from "jspdf";
import "jspdf-autotable";

// Function to add a logo
const addLogo = (doc) => {
  const imgData = 'https://i.ibb.co/vY4WCxQ/logo.png'; // Ruta de la imagen
  doc.addImage(imgData, 'JPEG', 10, 10, 50, 20); // Ajustar la posición y el tamaño según sea necesario
};

export const generarPDFPaciente = (patient, history, citas, debe, trans) => {
  const doc = new jsPDF();

  // Agregar logo
  addLogo(doc);

  // Título
  doc.setFontSize(20);
  doc.text("Detalles del Paciente", 70, 30);

  // Información del paciente en tabla
  const patientInfo = [
    ["Nombre Completo", `${patient.nombre} ${patient.apellido}`],
    ["Cedula", patient.cedula],
    ["Sexo", patient.sexo],
    ["Edad", patient.edad],
    ["Fecha de Nacimiento", patient.fecha_nacimiento],
    ["Dirección", patient.direccion],
    ["Teléfono", patient.telefono],
    ["Email", patient.correoElectronico],
    ["Médico Tratante", `${patient.nombreDoctor} ${patient.apellidoDoctor}`],
    ["Nº de Historia Clínica", history.codigo_historia],
    ["Deuda del Paciente", `${parseFloat(debe).toFixed(2)}$`],
    ["Diagnóstico", history.diagnostico],
    ["Secuencia de Tratamiento", history.secuenciaTratamiento]
  ];

  doc.autoTable({
    startY: 40,
    head: [['Informacion General','']],
    body: patientInfo,
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

  // Tabla de Citas

  if (citas.length > 0) {
    const citasTitleY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14); // Tamaño de fuente reducido para el título
    const citasTitleX = (doc.internal.pageSize.width /2) - (doc.getStringUnitWidth("Control de Citas") * 16/2); // Centrar el título
    doc.text("Control de Citas", citasTitleX, citasTitleY); // Título para la tabla de citas
    doc.setFontSize(12); 
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
  
      head: [['Fecha', 'Motivo', 'Estado', 'Observaciones', 'Doctor', 'Servicio']],
      body: citas.map(cita => [
        cita.fecha_cita,
        cita.motivo,
        cita.estado,
        cita.observaciones,
        `${cita.unDoctor.nombre} ${cita.unDoctor.apellido}`,
        cita.servicio.nombre
      ]),
      headStyles: {
        fillColor: [0, 139, 148], // Fondo verde para el encabezado
        textColor: [255, 255, 255], // Texto blanco para el encabezado
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Gris claro para filas alternas
      },
    });
  }


  if (trans.length > 0) {
    const transTitleY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 100;
    doc.setFontSize(14); // Tamaño de fuente reducido para el título
    const transTitleX = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth("Control de Pagos") * 16/2 ); // Centrar el título
    doc.text("Control de Pagos", transTitleX, transTitleY); // Título para la tabla de transacciones
    doc.setFontSize(12); // Restaurar tamaño de fuente normal
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
      head: [['Nº de Recibo', 'Fecha', 'Saldo Deudor', 'Monto Cancelado', 'Método de Pago', 'Observaciones']],
      body: trans.map(tran => [
        tran.codigo_transaccion,
        tran.fecha,
        tran.deuda,
        tran.ingreso,
        tran.formaPago,
        tran.observaciones
      ]),
      headStyles: {
        fillColor: [0, 139, 148], // Fondo verde para el encabezado
        textColor: [255, 255, 255], // Texto blanco para el encabezado
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Gris claro para filas alternas
      },
    });
  }

  // Pie de página
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  doc.setFontSize(8);
  doc.text(`Generado el: ${dateStr}`, 10, doc.lastAutoTable.finalY + 10);

  // Guardar el PDF
  doc.save(`detalles_paciente_${patient.cedula}_${dateStr}.pdf`);
};
