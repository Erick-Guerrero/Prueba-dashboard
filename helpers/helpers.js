import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

export const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/

export const exportToExcel = (csvData, fileName, imageBase64) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const formattedDate = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  const newFileName = `${fileName}_${formattedDate}${fileExtension}`;
  const ws = XLSX.utils.json_to_sheet(csvData);


  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, newFileName);
};

function validate(input) {
  let errors = {};
  if (!input.name || /[^a-zA-Z, ]/g.test(input.name)) {
    errors.name = 'Name is not valid';
  } else if (!input.number || /^[0-9]+([,][0-9]+)?$/g.test(input.number)) {
    errors.number = 'ingresa un número válido';
  } else if (
    !input.email ||
    /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/g.test(input.email)
  ) {
    errors.email = 'email is required';
  } else if (!input.season) {
    errors.season = 'season is required';
  }
  return errors;
}




export const formatHora = (createdAt) => {
  const fecha = new Date(createdAt);
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();

  // Puedes ajustar el formato según tus preferencias
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
}


export const formatFecha = (fecha) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(fecha).toLocaleDateString(undefined, options);
}

export default { validate};