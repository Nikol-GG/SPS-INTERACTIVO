import React, { useState } from 'react';
import { 
  Building2, Cpu, Users, ChevronDown, CheckCircle2, AlertTriangle, 
  Terminal, FolderGit2, Edit3, Save, Maximize2, Minimize2, ShieldCheck, 
  HardHat, FileText, Search, BookOpen, Layers, ArrowLeft, Grid, Filter,
  Clock, CheckSquare, Zap, AlertCircle
} from 'lucide-react';

// Catálogo multitarea con estructuras SIPOC completas para cada proceso

const tasksCatalog = [
  //TAREA 1
  {
    title: "Cargue Planillas de Seguridad Social",
    category: "Seguridad Social",
    version: "v2026.1",
    responsable: "Practicante Analista de Nómina",
    impactoNegocio: "Permiso de ingreso de trabajadores a campos de extracción. Un error paraliza la operación y genera costos de tiempo inactivo y multas contractuales.",
    criticidad: "Alta",
    frecuencia: "Mensual",
    suppliers: [
      { id: 's1', title: 'MiPlanilla', desc: 'Página oficial' },
      { id: 's2', title: 'SAP ERP', desc: 'Base Maestra de Empleados' }
    ],
    inputs: [
      { id: 'i1', title: 'Planillas en PDF', desc: 'Planillas de cada empleado' },
      { id: 'i2', title: 'Reporte Excel Masivo', desc: 'Consolidado de las personas con Seguridad Social' },
      { id: 'i3', title: 'Variantes SAP (GIN)', desc: 'Para obtener el Código Único de Trabajador' }
    ],
    outputs: [
      { id: 'o1', title: 'PDFs Renombrados', desc: '' },
      { id: 'o2', title: 'Template de Cargue', desc: 'Archivo estandarizado (GIN + Nombre + ID)' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores en Campo', desc: 'Acceso habilitado al pozo' },
      { id: 'c3', title: 'Auditoría', desc: 'Cumplimiento legal y contractual' }
    ],
    processSteps: [
      {
        id: 'p1',
        stepNumber: 1,
        title: 'Descargar Planillas y Consolidado',
        summary: 'Obtención masiva de archivos PDF y consolidado Excel desde el operador de información.',
        sapTx: 'Portal Web "Mi Planilla"',
        folderPath: 'https://empresas.miplanilla.com/PublicoEmpresas/Publico/IndexEmpresas',
        pcrTitle: 'Descarga incompleta o período equivocado',
        pcrDesc: 'Bajar planillas de un período anterior.',
        checklists: [
          'Confirmar que el período de pago coincida con el mes en curso.'
        ],
        userNotes: 'Cuando este descargando los pdf, refrescar la página porque puede que no se actualice el porcentaje '
      },
      {
        id: 'p2',
        stepNumber: 2,
        title: 'Ejecutar Macro de Renombrado',
        summary: 'Transformación automatizada de nombres de PDF al estándar',
        sapTx: 'Excel VBA (Macro_Renombrar_v3.xlsm)',
        folderPath: 'ruta del excel para descargar',
        pcrTitle: 'Ninguno',
        pcrDesc: '',
        checklists: [
          'Ejecutar la macro y asegurarse que se hallan renombrado los PDFs.'
        ],
        userNotes: 'Descarga el excel de la macro a tu escritorio'
      },
      {
        id: 'p3',
        stepNumber: 3,
        title: 'Extraer GIN en SAP ERP',
        summary: 'Cruce del número de cédula contra la base maestra para obtener el Código Único GIN.',
        sapTx: 'S_PH0_48000513 - Ad-hoc-Query --> User Group= (HR-ALA)-->JMSPAYROLLCHECK',
        sapVariant: 'CO_NGOMEZSS',
        folderPath: 'SAP ERP -> Exportar a Local: C:\\Users\\Public\\SAP_Exports\\',
        pcrTitle: 'Cédula no encontrada o GIN duplicado',
        pcrDesc: 'Personal de nuevo ingreso que no tenga variante GIN creada en SAP rebotará en la plataforma.',
        checklists: [
          'Utilizar la variante oficial indicada',
          'Pegar las cédulas que se extraen del Excel',
          'Periodo desde el mes pasado'
        ],
        userNotes: 'Algunas veces no descarga el GIN de todos, pueden ser retirados o vuelve a intentar con los que faltaron'
      },
      {
        id: 'p4',
        stepNumber: 4,
        title: 'Cargar PDFs a Ruta del Servidor',
        summary: 'Transferencia masiva de planillas al repositorio de acceso remoto de la plataforma.',
        sapTx: 'Repositorio Compartido',
        sapVariant: 'N/A - Protocolo de Red',
        folderPath: 'Explorados de archivos-->Red-->\\hhowebapps.lam.slb.com\Structure\Autom',
        pcrTitle: 'Error al cargar los archivos',
        pcrDesc: 'Preguntar a Miguel Andres Carvajar que debes hacer o cual es la nueva ruta',
        checklists: [
          'La ruta este sirviendo',
          'Se carguen la totalidad de los PDFs'
        ],
        userNotes: ''
      },
      {
        id: 'p5',
        stepNumber: 5,
        title: 'Estructurar y Cargar Template',
        summary: 'Asociación final en la plataforma entre el GIN, la cédula y la ruta del PDF.',
        sapTx: 'Plataforma Web Control Operaciones Pozos',
        sapVariant: 'Template.xlsx',
        folderPath: '',
        pcrTitle: 'Rechazo de PDFs por el tipo de excel que cargó',
        pcrDesc: 'Asegurese que el tipo de archivo que cargue sea .XLSX y no .XLS',
        checklists: [
          'Hacer un vlookup con la CC para traer el GIN del Query de SAP',
          'Validar que todas las personas tengan su GIN'
        ],
        userNotes: 'Guardar siempre el archivo con extensión .XLSX estándar.'
      },
      {
        id: 'p6',
        stepNumber: 6,
        title: 'Cargue de Archivos',
        summary: 'Subir el template y los PDFs',
        sapTx: 'Portal de Verificación HSE en Campo',
        folderPath: 'https://hhowebapps.lam.slb.com/HRTool/Account/Login-->Social Security-->Upload',
        pcrTitle: 'Poner la fecha que no corresponde',
        pcrDesc: 'Recuerda que las planillas se cargan mes vencido, por eso debes poner un día del mes anterior',
        checklists: [
          'Verificar que con varios GIN que efectivamente se han cargado las planillas',
          'Incluir en la muestra obligatoriamente: el primer registro, el último, y 3 elegidos al azar.'
        ],
        userNotes: ''
      }
    ]
  },
  //TAREA 2
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Actulizar Status 14 a 15",
    category: "Actulizar Status",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, 
  //TAREA 3
    {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "E payroll",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  },
   //TAREA 4
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Pago Seguridad Social COPS",
    category: "Pagos",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, 
    //TAREA 5
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Envío Novedades SAXON",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  },
  //TAREA 6
  {
    id: 'pr-nom-042',
    code: "PR-NOM-042",
    title: "Pago Seguridad Social SAXON",
    category: "Pagos",
    version: "v2026.1",
    responsable: "Practicante Analista de Nómina",
    impactoNegocio: "Permiso de ingreso de trabajadores a campos de extracción. Un error paraliza la operación y genera costos de tiempo inactivo y multas contractuales.",
    criticidad: "Alta",
    frecuencia: "Mensual",
    suppliers: [
      { id: 's1', title: 'MiPlanilla', desc: 'Página oficial' },
      { id: 's2', title: 'SAP ERP', desc: 'Base Maestra de Empleados' }
    ],
    inputs: [
      { id: 'i1', title: 'Planillas en PDF', desc: 'Planillas de cada empleado' },
      { id: 'i2', title: 'Reporte Excel Masivo', desc: 'Consolidado de las personas con Seguridad Social' },
      { id: 'i3', title: 'Variantes SAP (GIN)', desc: 'Para obtener el Código Único de Trabajador' }
    ],
    outputs: [
      { id: 'o1', title: 'PDFs Renombrados', desc: '' },
      { id: 'o2', title: 'Template de Cargue', desc: 'Archivo estandarizado (GIN + Nombre + ID)' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores en Campo', desc: 'Acceso habilitado al pozo' },
      { id: 'c3', title: 'Auditoría', desc: 'Cumplimiento legal y contractual' }
    ],
    processSteps: [
      {
        id: 'p1',
        stepNumber: 1,
        title: 'Descargar Planillas y Consolidado',
        summary: 'Obtención masiva de archivos PDF y consolidado Excel desde el operador de información.',
        sapTx: 'Portal Web "Mi Planilla"',
        sapVariant: 'VAR_NOM_SEGSOC_2026',
        folderPath: '\\\\servidor_nomina\\pozos\\2026\\descargas_raw\\',
        pcrTitle: 'Descarga incompleta o período equivocado',
        pcrDesc: 'Bajar planillas de un período anterior o dejar trabajadores por fuera del lote.',
        checklists: [
          'Confirmar que el período de pago coincida con el mes en curso.',
          'Verificar que el número total de registros en Excel coincida con la cantidad de PDFs bajados.',
          'Guardar archivos exclusivamente en la carpeta oficial del servidor.'
        ],
        userNotes: 'El reporte Excel de Mi Planilla descarga por defecto con comas. Ajustar formato si la macro lo requiere.'
      },
      {
        id: 'p2',
        stepNumber: 2,
        title: 'Ejecutar Macro de Renombrado',
        summary: 'Transformación automatizada de nombres de PDF al estándar Cédula_Nombre.pdf.',
        sapTx: 'Excel VBA (Macro_Renombrar_v3.xlsm)',
        sapVariant: 'Plantilla de Rótulo Automático',
        folderPath: '\\\\servidor_nomina\\pozos\\2026\\pdf_renombrados\\',
        pcrTitle: 'Desfase de correspondencia PDF vs. Cédula',
        pcrDesc: 'Si el Excel tiene una fila corrida, la Macro asignará la planilla de una persona al PDF de otra.',
        checklists: [
          'Ejecutar la macro en modo prueba si se agregaron nuevas filas manualmente.',
          'Efectuar conteo exacto: Archivos en carpeta destino = Filas en Excel.',
          'Abrir manualmente el primer, del medio y último PDF para verificar que el contenido coincida con el nombre del archivo.'
        ],
        userNotes: 'Si la macro arroja error de permisos, ejecutar Excel como Administrador.'
      },
      {
        id: 'p3',
        stepNumber: 3,
        title: 'Extraer GIN en SAP ERP',
        summary: 'Cruce del número de cédula contra la base maestra para obtener el Código Único GIN.',
        sapTx: 'SE16N / ZHR_MAESTRO_POZOS / SQ01',
        sapVariant: '/VAR_HABILITA_POZO_GIN',
        folderPath: 'SAP ERP -> Exportar a Local: C:\\Users\\Public\\SAP_Exports\\',
        pcrTitle: 'Cédula no encontrada o GIN duplicado',
        pcrDesc: 'Personal de nuevo ingreso que no tenga variante GIN creada en SAP rebotará en la plataforma.',
        checklists: [
          'Utilizar la variante oficial /VAR_HABILITA_POZO_GIN en la transacción SE16N.',
          'Asegurar que la búsqueda no limite la cantidad máxima de aciertos a 200 (quitar límite en SAP).',
          'Validar que no existan celdas vacías (#N/A) en el cruce del archivo resultante.'
        ],
        userNotes: 'Si una cédula es de un contratista reciente, solicitar la creación del GIN al analista senior.'
      },
      {
        id: 'p4',
        stepNumber: 4,
        title: 'Cargar PDFs a Ruta del Servidor',
        summary: 'Transferencia masiva de planillas al repositorio de acceso remoto de la plataforma.',
        sapTx: 'Repositorio Compartido / FTP',
        sapVariant: 'N/A - Protocolo de Red',
        folderPath: '\\\\servidor_nomina\\plataforma_pozos\\planillas_cargadas\\',
        pcrTitle: 'Archivos corruptos o timeout de red durante la carga',
        pcrDesc: 'Un corte breve de red puede dejar archivos en tamaño 0 KB, impidiendo que el trabajador descargue su carné.',
        checklists: [
          'Verificar el peso del lote total antes y después del pegado en el servidor.',
          'Asegurarse de que no existan archivos abiertos en Excel/Adobe mientras se realiza la carga.',
          'Revisar que el nombre de los archivos no contenga caracteres especiales (ñ, tildes, #, /).'
        ],
        userNotes: 'Hacer el cargue preferiblemente antes de las 11:00 AM para evitar congestión de canal.'
      },
      {
        id: 'p5',
        stepNumber: 5,
        title: 'Estructurar y Cargar Template',
        summary: 'Asociación final en la plataforma entre el GIN, la cédula y la ruta del PDF.',
        sapTx: 'Plataforma Web Control Operaciones Pozos',
        sapVariant: 'Template_Cargue_Masivo_v4.xlsx',
        folderPath: 'Plataforma HSE -> Menú "Cargue Masivo de Seguridad Social"',
        pcrTitle: 'Rechazo del Template por formato de celdas',
        pcrDesc: 'Cédulas con formato científico (1.02E+09) o GINs con ceros a la izquierda borrados.',
        checklists: [
          'Formatear la columna Cédula y GIN explícitamente como TEXTO en Excel antes de guardar.',
          'Comprobar que no existan duplicados en la columna GIN dentro del mismo lote.',
          'Verificar el mensaje de confirmación del sistema ("Cargue 100% Exitoso").'
        ],
        userNotes: 'Guardar siempre el archivo con extensión .XLSX estándar.'
      },
      {
        id: 'p6',
        stepNumber: 6,
        title: 'Auditoría y Muestreo de Calidad',
        summary: 'Verificación aleatoria y dirigida en la plataforma para confirmar visualización activa.',
        sapTx: 'Portal de Verificación HSE en Campo',
        sapVariant: 'Filtro por Centro de Costo / Pozo Target',
        folderPath: 'Plataforma HSE -> Consulta de Personal Habilitado',
        pcrTitle: 'Confirmación falsa de cargue',
        pcrDesc: 'Confiar en que el sistema funcionó sin validar que el PDF abra correctamente desde la vista del supervisor en pozo.',
        checklists: [
          'Auditar el 10% de la población cargada (mínimo 5 trabajadores).',
          'Incluir en la muestra obligatoriamente: el primer registro, el último, y 3 elegidos al azar.',
          'Descargar el carné digital de 1 trabajador y confirmar que el PDF abre correctamente.'
        ],
        userNotes: 'Esta es la validación que evita el error de $1.000 USD. No saltarse el muestreo.'
      }
    ]
  },
    //TAREA 7
  {
    id: 'pr-nom-015',
    code: "PR-NOM-015",
    title: "Terceros COM/ODP",
    version: "v2026.2",
    responsable: "Practicante / Auxiliar de Nómina",
    impactoNegocio: "Cálculo preciso del salario del colaborador y cobro correcto a EPS/ARL. Errores causan pagos en exceso o pérdida de recobro monetario para la empresa.",
    criticidad: "Alta",
    frecuencia: "Quincenal / Diario",
    suppliers: [
      { id: 's1', title: 'Área de Medicina Laboral / HSE', desc: 'Envío de certificados validados' },
      { id: 's2', title: 'EPS / ARL / Seguros', desc: 'Transcripción oficial de incapacidad' }
    ],
    inputs: [
      { id: 'i1', title: 'Certificados Médicos PDF/Físico', desc: 'Diagnóstico y días Otorgados' },
      { id: 'i2', title: 'Base de Contratos Activos', desc: 'Información Salarial en SAP' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2001 en SAP', desc: 'Registro de Ausentismo Pagado/No Pagado' },
      { id: 'o2', title: 'Planilla de Recobro EPS', desc: 'Soporte para cobro a la entidad' }
    ],
    customers: [
      { id: 'c1', title: 'Empleado', desc: 'Liquidación correcta en su desprendible' },
      { id: 'c2', title: 'Tesorería / Contabilidad', desc: 'Proyección de costos y cartera EPS' }
    ],
    processSteps: [
      {
        id: 'p1_15',
        stepNumber: 1,
        title: 'Recepción y Validación de Transcripción EPS',
        summary: 'Verificar que la incapacidad esté transcrita por la EPS correspondiente antes de radicar en nómina.',
        sapTx: 'N/A - Portal EPS / Gestor Documental',
        sapVariant: 'Validación Radicado Web',
        folderPath: '\\\\servidor_nomina\\incapacidades\\2026\\radicados\\',
        pcrTitle: 'Registrar incapacidad no transcrita',
        pcrDesc: 'Ingresar recomendaciones médicas simples como si fueran incapacidades pagadas por EPS.',
        checklists: [
          'Confirmar que el documento sea la Transcripción Oficial de la EPS y no la orden médica inicial.',
          'Verificar fecha de inicio, días otorgados y código CIE-10.',
          'Validar que el número de cédula coincida exactamente con la base de empleados.'
        ],
        userNotes: 'Incapacidades de más de 3 días deben tener diagnóstico oficial visible.'
      },
      {
        id: 'p2_15',
        stepNumber: 2,
        title: 'Ingreso de Novedad en SAP (Infotipo 2001)',
        summary: 'Registrar el tipo de ausentismo según el origen (Enfermedad General, Accidente Trabajo, Maternidad).',
        sapTx: 'PA30 / PA20 (Infotipo 2001)',
        sapVariant: 'Subtipo 0100 (E.G) / 0200 (A.T)',
        folderPath: 'SAP HR -> Gestión de Tiempos -> Infotipo 2001',
        pcrTitle: 'Selección errónea de Subtipo de Ausentismo',
        pcrDesc: 'Marcar un accidente laboral como enfermedad general, alterando el porcentaje de pago (66.67% vs 100%).',
        checklists: [
          'Ingresar por transacción PA30 al Infotipo 2001 (Ausentismos).',
          'Seleccionar el subtipo adecuado: 0100 (Enfermedad General) o 0200 (Accidente de Trabajo/ARL).',
          'Validar que el sistema reconozca los primeros 2 días a cargo de la empresa y del día 3 en adelante a cargo de EPS.'
        ],
        userNotes: 'Verificar si el empleado tuvo prorrogas dentro de los últimos 30 días.'
      },
      {
        id: 'p3_15',
        stepNumber: 3,
        title: 'Auditoría Cruzada de Liquidación',
        summary: 'Comprobar el impacto del ausentismo en el premando de nómina.',
        sapTx: 'PC00_M38_CALC (Simulación de Nómina)',
        sapVariant: 'SIMULACION_QUINCENAL',
        folderPath: 'SAP HR -> Liquidación -> Simulación',
        pcrTitle: 'Doble pago o descuento indebido',
        pcrDesc: 'Que el sistema liquide días laborados completos al mismo tiempo que la incapacidad.',
        checklists: [
          'Correr simulación de nómina para el empleado con la transacción PC00_M38_CALC.',
          'Revisar el concepto de pago /101 y /559 para asegurar la base correcta.',
          'Verificar que el desprendible de simulación refleje los días de incapacidad separados de los días trabajados.'
        ],
        userNotes: 'Revisar siempre la bitácora de errores de SAP al simular.'
      }
    ]
  },
//TAREA 8
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Pago Nómina Saxon",
    category: "Pagos",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, 
//TAREA 9
    {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Reporte Medicina Prepagada y Plan Dental",
    category: "Reporte",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  },
   //TAREA 10
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Envío Payslips Pensionados",
    category: "Payslips",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, 
    //TAREA 11
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Conciliación de Archivos Compliance",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  },
   //TAREA 12
  {
    id: 'pr-nom-042',
    code: "PR-NOM-042",
    title: "Envío Payslips 1Q/2Q ODP",
    category: "Payslips",
    version: "v2026.1",
    responsable: "Practicante Analista de Nómina",
    impactoNegocio: "Permiso de ingreso de trabajadores a campos de extracción. Un error paraliza la operación y genera costos de tiempo inactivo y multas contractuales.",
    criticidad: "Alta",
    frecuencia: "Mensual",
    suppliers: [
      { id: 's1', title: 'MiPlanilla', desc: 'Página oficial' },
      { id: 's2', title: 'SAP ERP', desc: 'Base Maestra de Empleados' }
    ],
    inputs: [
      { id: 'i1', title: 'Planillas en PDF', desc: 'Planillas de cada empleado' },
      { id: 'i2', title: 'Reporte Excel Masivo', desc: 'Consolidado de las personas con Seguridad Social' },
      { id: 'i3', title: 'Variantes SAP (GIN)', desc: 'Para obtener el Código Único de Trabajador' }
    ],
    outputs: [
      { id: 'o1', title: 'PDFs Renombrados', desc: '' },
      { id: 'o2', title: 'Template de Cargue', desc: 'Archivo estandarizado (GIN + Nombre + ID)' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores en Campo', desc: 'Acceso habilitado al pozo' },
      { id: 'c3', title: 'Auditoría', desc: 'Cumplimiento legal y contractual' }
    ],
    processSteps: [
      {
        id: 'p1',
        stepNumber: 1,
        title: 'Descargar Planillas y Consolidado',
        summary: 'Obtención masiva de archivos PDF y consolidado Excel desde el operador de información.',
        sapTx: 'Portal Web "Mi Planilla"',
        sapVariant: 'VAR_NOM_SEGSOC_2026',
        folderPath: '\\\\servidor_nomina\\pozos\\2026\\descargas_raw\\',
        pcrTitle: 'Descarga incompleta o período equivocado',
        pcrDesc: 'Bajar planillas de un período anterior o dejar trabajadores por fuera del lote.',
        checklists: [
          'Confirmar que el período de pago coincida con el mes en curso.',
          'Verificar que el número total de registros en Excel coincida con la cantidad de PDFs bajados.',
          'Guardar archivos exclusivamente en la carpeta oficial del servidor.'
        ],
        userNotes: 'El reporte Excel de Mi Planilla descarga por defecto con comas. Ajustar formato si la macro lo requiere.'
      },
      {
        id: 'p2',
        stepNumber: 2,
        title: 'Ejecutar Macro de Renombrado',
        summary: 'Transformación automatizada de nombres de PDF al estándar Cédula_Nombre.pdf.',
        sapTx: 'Excel VBA (Macro_Renombrar_v3.xlsm)',
        sapVariant: 'Plantilla de Rótulo Automático',
        folderPath: '\\\\servidor_nomina\\pozos\\2026\\pdf_renombrados\\',
        pcrTitle: 'Desfase de correspondencia PDF vs. Cédula',
        pcrDesc: 'Si el Excel tiene una fila corrida, la Macro asignará la planilla de una persona al PDF de otra.',
        checklists: [
          'Ejecutar la macro en modo prueba si se agregaron nuevas filas manualmente.',
          'Efectuar conteo exacto: Archivos en carpeta destino = Filas en Excel.',
          'Abrir manualmente el primer, del medio y último PDF para verificar que el contenido coincida con el nombre del archivo.'
        ],
        userNotes: 'Si la macro arroja error de permisos, ejecutar Excel como Administrador.'
      },
      {
        id: 'p3',
        stepNumber: 3,
        title: 'Extraer GIN en SAP ERP',
        summary: 'Cruce del número de cédula contra la base maestra para obtener el Código Único GIN.',
        sapTx: 'SE16N / ZHR_MAESTRO_POZOS / SQ01',
        sapVariant: '/VAR_HABILITA_POZO_GIN',
        folderPath: 'SAP ERP -> Exportar a Local: C:\\Users\\Public\\SAP_Exports\\',
        pcrTitle: 'Cédula no encontrada o GIN duplicado',
        pcrDesc: 'Personal de nuevo ingreso que no tenga variante GIN creada en SAP rebotará en la plataforma.',
        checklists: [
          'Utilizar la variante oficial /VAR_HABILITA_POZO_GIN en la transacción SE16N.',
          'Asegurar que la búsqueda no limite la cantidad máxima de aciertos a 200 (quitar límite en SAP).',
          'Validar que no existan celdas vacías (#N/A) en el cruce del archivo resultante.'
        ],
        userNotes: 'Si una cédula es de un contratista reciente, solicitar la creación del GIN al analista senior.'
      },
      {
        id: 'p4',
        stepNumber: 4,
        title: 'Cargar PDFs a Ruta del Servidor',
        summary: 'Transferencia masiva de planillas al repositorio de acceso remoto de la plataforma.',
        sapTx: 'Repositorio Compartido / FTP',
        sapVariant: 'N/A - Protocolo de Red',
        folderPath: '\\\\servidor_nomina\\plataforma_pozos\\planillas_cargadas\\',
        pcrTitle: 'Archivos corruptos o timeout de red durante la carga',
        pcrDesc: 'Un corte breve de red puede dejar archivos en tamaño 0 KB, impidiendo que el trabajador descargue su carné.',
        checklists: [
          'Verificar el peso del lote total antes y después del pegado en el servidor.',
          'Asegurarse de que no existan archivos abiertos en Excel/Adobe mientras se realiza la carga.',
          'Revisar que el nombre de los archivos no contenga caracteres especiales (ñ, tildes, #, /).'
        ],
        userNotes: 'Hacer el cargue preferiblemente antes de las 11:00 AM para evitar congestión de canal.'
      },
      {
        id: 'p5',
        stepNumber: 5,
        title: 'Estructurar y Cargar Template',
        summary: 'Asociación final en la plataforma entre el GIN, la cédula y la ruta del PDF.',
        sapTx: 'Plataforma Web Control Operaciones Pozos',
        sapVariant: 'Template_Cargue_Masivo_v4.xlsx',
        folderPath: 'Plataforma HSE -> Menú "Cargue Masivo de Seguridad Social"',
        pcrTitle: 'Rechazo del Template por formato de celdas',
        pcrDesc: 'Cédulas con formato científico (1.02E+09) o GINs con ceros a la izquierda borrados.',
        checklists: [
          'Formatear la columna Cédula y GIN explícitamente como TEXTO en Excel antes de guardar.',
          'Comprobar que no existan duplicados en la columna GIN dentro del mismo lote.',
          'Verificar el mensaje de confirmación del sistema ("Cargue 100% Exitoso").'
        ],
        userNotes: 'Guardar siempre el archivo con extensión .XLSX estándar.'
      },
      {
        id: 'p6',
        stepNumber: 6,
        title: 'Auditoría y Muestreo de Calidad',
        summary: 'Verificación aleatoria y dirigida en la plataforma para confirmar visualización activa.',
        sapTx: 'Portal de Verificación HSE en Campo',
        sapVariant: 'Filtro por Centro de Costo / Pozo Target',
        folderPath: 'Plataforma HSE -> Consulta de Personal Habilitado',
        pcrTitle: 'Confirmación falsa de cargue',
        pcrDesc: 'Confiar en que el sistema funcionó sin validar que el PDF abra correctamente desde la vista del supervisor en pozo.',
        checklists: [
          'Auditar el 10% de la población cargada (mínimo 5 trabajadores).',
          'Incluir en la muestra obligatoriamente: el primer registro, el último, y 3 elegidos al azar.',
          'Descargar el carné digital de 1 trabajador y confirmar que el PDF abre correctamente.'
        ],
        userNotes: 'Esta es la validación que evita el error de $1.000 USD. No saltarse el muestreo.'
      }
    ]
  },
  //TAREA 13
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Reporte de Provisiones",
    category: "Reporte",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, 
  //TAREA 14
    {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Cierres",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  },
   //TAREA 15
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Reporte Promedios PES y Surenco",
    category: "Reporte",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, 
    //TAREA 16
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Calendario TEAMS",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  },
  //TAREA 17
  {
    id: 'pr-nom-042',
    code: "PR-NOM-042",
    title: "Cashflow",
    version: "v2026.1",
    responsable: "Practicante Analista de Nómina",
    impactoNegocio: "Permiso de ingreso de trabajadores a campos de extracción. Un error paraliza la operación y genera costos de tiempo inactivo y multas contractuales.",
    criticidad: "Alta",
    frecuencia: "Mensual",
    suppliers: [
      { id: 's1', title: 'MiPlanilla', desc: 'Página oficial' },
      { id: 's2', title: 'SAP ERP', desc: 'Base Maestra de Empleados' }
    ],
    inputs: [
      { id: 'i1', title: 'Planillas en PDF', desc: 'Planillas de cada empleado' },
      { id: 'i2', title: 'Reporte Excel Masivo', desc: 'Consolidado de las personas con Seguridad Social' },
      { id: 'i3', title: 'Variantes SAP (GIN)', desc: 'Para obtener el Código Único de Trabajador' }
    ],
    outputs: [
      { id: 'o1', title: 'PDFs Renombrados', desc: '' },
      { id: 'o2', title: 'Template de Cargue', desc: 'Archivo estandarizado (GIN + Nombre + ID)' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores en Campo', desc: 'Acceso habilitado al pozo' },
      { id: 'c3', title: 'Auditoría', desc: 'Cumplimiento legal y contractual' }
    ],
    processSteps: [
      {
        id: 'p1',
        stepNumber: 1,
        title: 'Descargar Planillas y Consolidado',
        summary: 'Obtención masiva de archivos PDF y consolidado Excel desde el operador de información.',
        sapTx: 'Portal Web "Mi Planilla"',
        sapVariant: 'VAR_NOM_SEGSOC_2026',
        folderPath: '\\\\servidor_nomina\\pozos\\2026\\descargas_raw\\',
        pcrTitle: 'Descarga incompleta o período equivocado',
        pcrDesc: 'Bajar planillas de un período anterior o dejar trabajadores por fuera del lote.',
        checklists: [
          'Confirmar que el período de pago coincida con el mes en curso.',
          'Verificar que el número total de registros en Excel coincida con la cantidad de PDFs bajados.',
          'Guardar archivos exclusivamente en la carpeta oficial del servidor.'
        ],
        userNotes: 'El reporte Excel de Mi Planilla descarga por defecto con comas. Ajustar formato si la macro lo requiere.'
      },
      {
        id: 'p2',
        stepNumber: 2,
        title: 'Ejecutar Macro de Renombrado',
        summary: 'Transformación automatizada de nombres de PDF al estándar Cédula_Nombre.pdf.',
        sapTx: 'Excel VBA (Macro_Renombrar_v3.xlsm)',
        sapVariant: 'Plantilla de Rótulo Automático',
        folderPath: '\\\\servidor_nomina\\pozos\\2026\\pdf_renombrados\\',
        pcrTitle: 'Desfase de correspondencia PDF vs. Cédula',
        pcrDesc: 'Si el Excel tiene una fila corrida, la Macro asignará la planilla de una persona al PDF de otra.',
        checklists: [
          'Ejecutar la macro en modo prueba si se agregaron nuevas filas manualmente.',
          'Efectuar conteo exacto: Archivos en carpeta destino = Filas en Excel.',
          'Abrir manualmente el primer, del medio y último PDF para verificar que el contenido coincida con el nombre del archivo.'
        ],
        userNotes: 'Si la macro arroja error de permisos, ejecutar Excel como Administrador.'
      },
      {
        id: 'p3',
        stepNumber: 3,
        title: 'Extraer GIN en SAP ERP',
        summary: 'Cruce del número de cédula contra la base maestra para obtener el Código Único GIN.',
        sapTx: 'SE16N / ZHR_MAESTRO_POZOS / SQ01',
        sapVariant: '/VAR_HABILITA_POZO_GIN',
        folderPath: 'SAP ERP -> Exportar a Local: C:\\Users\\Public\\SAP_Exports\\',
        pcrTitle: 'Cédula no encontrada o GIN duplicado',
        pcrDesc: 'Personal de nuevo ingreso que no tenga variante GIN creada en SAP rebotará en la plataforma.',
        checklists: [
          'Utilizar la variante oficial /VAR_HABILITA_POZO_GIN en la transacción SE16N.',
          'Asegurar que la búsqueda no limite la cantidad máxima de aciertos a 200 (quitar límite en SAP).',
          'Validar que no existan celdas vacías (#N/A) en el cruce del archivo resultante.'
        ],
        userNotes: 'Si una cédula es de un contratista reciente, solicitar la creación del GIN al analista senior.'
      },
      {
        id: 'p4',
        stepNumber: 4,
        title: 'Cargar PDFs a Ruta del Servidor',
        summary: 'Transferencia masiva de planillas al repositorio de acceso remoto de la plataforma.',
        sapTx: 'Repositorio Compartido / FTP',
        sapVariant: 'N/A - Protocolo de Red',
        folderPath: '\\\\servidor_nomina\\plataforma_pozos\\planillas_cargadas\\',
        pcrTitle: 'Archivos corruptos o timeout de red durante la carga',
        pcrDesc: 'Un corte breve de red puede dejar archivos en tamaño 0 KB, impidiendo que el trabajador descargue su carné.',
        checklists: [
          'Verificar el peso del lote total antes y después del pegado en el servidor.',
          'Asegurarse de que no existan archivos abiertos en Excel/Adobe mientras se realiza la carga.',
          'Revisar que el nombre de los archivos no contenga caracteres especiales (ñ, tildes, #, /).'
        ],
        userNotes: 'Hacer el cargue preferiblemente antes de las 11:00 AM para evitar congestión de canal.'
      },
      {
        id: 'p5',
        stepNumber: 5,
        title: 'Estructurar y Cargar Template',
        summary: 'Asociación final en la plataforma entre el GIN, la cédula y la ruta del PDF.',
        sapTx: 'Plataforma Web Control Operaciones Pozos',
        sapVariant: 'Template_Cargue_Masivo_v4.xlsx',
        folderPath: 'Plataforma HSE -> Menú "Cargue Masivo de Seguridad Social"',
        pcrTitle: 'Rechazo del Template por formato de celdas',
        pcrDesc: 'Cédulas con formato científico (1.02E+09) o GINs con ceros a la izquierda borrados.',
        checklists: [
          'Formatear la columna Cédula y GIN explícitamente como TEXTO en Excel antes de guardar.',
          'Comprobar que no existan duplicados en la columna GIN dentro del mismo lote.',
          'Verificar el mensaje de confirmación del sistema ("Cargue 100% Exitoso").'
        ],
        userNotes: 'Guardar siempre el archivo con extensión .XLSX estándar.'
      },
      {
        id: 'p6',
        stepNumber: 6,
        title: 'Auditoría y Muestreo de Calidad',
        summary: 'Verificación aleatoria y dirigida en la plataforma para confirmar visualización activa.',
        sapTx: 'Portal de Verificación HSE en Campo',
        sapVariant: 'Filtro por Centro de Costo / Pozo Target',
        folderPath: 'Plataforma HSE -> Consulta de Personal Habilitado',
        pcrTitle: 'Confirmación falsa de cargue',
        pcrDesc: 'Confiar en que el sistema funcionó sin validar que el PDF abra correctamente desde la vista del supervisor en pozo.',
        checklists: [
          'Auditar el 10% de la población cargada (mínimo 5 trabajadores).',
          'Incluir en la muestra obligatoriamente: el primer registro, el último, y 3 elegidos al azar.',
          'Descargar el carné digital de 1 trabajador y confirmar que el PDF abre correctamente.'
        ],
        userNotes: 'Esta es la validación que evita el error de $1.000 USD. No saltarse el muestreo.'
      }
    ]
  },
    //TAREA 18
  {
    id: 'pr-nom-015',
    code: "PR-NOM-015",
    title: "Anticipo de Vacaciones",
    category: "Pagos",
    version: "v2026.2",
    responsable: "Practicante / Auxiliar de Nómina",
    impactoNegocio: "Cálculo preciso del salario del colaborador y cobro correcto a EPS/ARL. Errores causan pagos en exceso o pérdida de recobro monetario para la empresa.",
    criticidad: "Alta",
    frecuencia: "Quincenal / Diario",
    suppliers: [
      { id: 's1', title: 'Área de Medicina Laboral / HSE', desc: 'Envío de certificados validados' },
      { id: 's2', title: 'EPS / ARL / Seguros', desc: 'Transcripción oficial de incapacidad' }
    ],
    inputs: [
      { id: 'i1', title: 'Certificados Médicos PDF/Físico', desc: 'Diagnóstico y días Otorgados' },
      { id: 'i2', title: 'Base de Contratos Activos', desc: 'Información Salarial en SAP' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2001 en SAP', desc: 'Registro de Ausentismo Pagado/No Pagado' },
      { id: 'o2', title: 'Planilla de Recobro EPS', desc: 'Soporte para cobro a la entidad' }
    ],
    customers: [
      { id: 'c1', title: 'Empleado', desc: 'Liquidación correcta en su desprendible' },
      { id: 'c2', title: 'Tesorería / Contabilidad', desc: 'Proyección de costos y cartera EPS' }
    ],
    processSteps: [
      {
        id: 'p1_15',
        stepNumber: 1,
        title: 'Recepción y Validación de Transcripción EPS',
        summary: 'Verificar que la incapacidad esté transcrita por la EPS correspondiente antes de radicar en nómina.',
        sapTx: 'N/A - Portal EPS / Gestor Documental',
        sapVariant: 'Validación Radicado Web',
        folderPath: '\\\\servidor_nomina\\incapacidades\\2026\\radicados\\',
        pcrTitle: 'Registrar incapacidad no transcrita',
        pcrDesc: 'Ingresar recomendaciones médicas simples como si fueran incapacidades pagadas por EPS.',
        checklists: [
          'Confirmar que el documento sea la Transcripción Oficial de la EPS y no la orden médica inicial.',
          'Verificar fecha de inicio, días otorgados y código CIE-10.',
          'Validar que el número de cédula coincida exactamente con la base de empleados.'
        ],
        userNotes: 'Incapacidades de más de 3 días deben tener diagnóstico oficial visible.'
      },
      {
        id: 'p2_15',
        stepNumber: 2,
        title: 'Ingreso de Novedad en SAP (Infotipo 2001)',
        summary: 'Registrar el tipo de ausentismo según el origen (Enfermedad General, Accidente Trabajo, Maternidad).',
        sapTx: 'PA30 / PA20 (Infotipo 2001)',
        sapVariant: 'Subtipo 0100 (E.G) / 0200 (A.T)',
        folderPath: 'SAP HR -> Gestión de Tiempos -> Infotipo 2001',
        pcrTitle: 'Selección errónea de Subtipo de Ausentismo',
        pcrDesc: 'Marcar un accidente laboral como enfermedad general, alterando el porcentaje de pago (66.67% vs 100%).',
        checklists: [
          'Ingresar por transacción PA30 al Infotipo 2001 (Ausentismos).',
          'Seleccionar el subtipo adecuado: 0100 (Enfermedad General) o 0200 (Accidente de Trabajo/ARL).',
          'Validar que el sistema reconozca los primeros 2 días a cargo de la empresa y del día 3 en adelante a cargo de EPS.'
        ],
        userNotes: 'Verificar si el empleado tuvo prorrogas dentro de los últimos 30 días.'
      },
      {
        id: 'p3_15',
        stepNumber: 3,
        title: 'Auditoría Cruzada de Liquidación',
        summary: 'Comprobar el impacto del ausentismo en el premando de nómina.',
        sapTx: 'PC00_M38_CALC (Simulación de Nómina)',
        sapVariant: 'SIMULACION_QUINCENAL',
        folderPath: 'SAP HR -> Liquidación -> Simulación',
        pcrTitle: 'Doble pago o descuento indebido',
        pcrDesc: 'Que el sistema liquide días laborados completos al mismo tiempo que la incapacidad.',
        checklists: [
          'Correr simulación de nómina para el empleado con la transacción PC00_M38_CALC.',
          'Revisar el concepto de pago /101 y /559 para asegurar la base correcta.',
          'Verificar que el desprendible de simulación refleje los días de incapacidad separados de los días trabajados.'
        ],
        userNotes: 'Revisar siempre la bitácora de errores de SAP al simular.'
      }
    ]
  },
//TAREA 19
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Reporte Retención PES y Surenco",
    category: "Reporte",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, 
//TAREA 20
    {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Payroll Errors",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  },
   //TAREA 21
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Cargue DSPP",
    category: "Interfaces",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, 
    //TAREA 22
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Pago de Interfaces",
    category: "Interfaces",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  },
   //TAREA 23
  {
    id: 'pr-nom-042',
    code: "PR-NOM-042",
    title: "Actualización Status 15 a 19",
    category: "Actualizar Status",
    version: "v2026.1",
    responsable: "Practicante Analista de Nómina",
    impactoNegocio: "Permiso de ingreso de trabajadores a campos de extracción. Un error paraliza la operación y genera costos de tiempo inactivo y multas contractuales.",
    criticidad: "Alta",
    frecuencia: "Mensual",
    suppliers: [
      { id: 's1', title: 'MiPlanilla', desc: 'Página oficial' },
      { id: 's2', title: 'SAP ERP', desc: 'Base Maestra de Empleados' }
    ],
    inputs: [
      { id: 'i1', title: 'Planillas en PDF', desc: 'Planillas de cada empleado' },
      { id: 'i2', title: 'Reporte Excel Masivo', desc: 'Consolidado de las personas con Seguridad Social' },
      { id: 'i3', title: 'Variantes SAP (GIN)', desc: 'Para obtener el Código Único de Trabajador' }
    ],
    outputs: [
      { id: 'o1', title: 'PDFs Renombrados', desc: '' },
      { id: 'o2', title: 'Template de Cargue', desc: 'Archivo estandarizado (GIN + Nombre + ID)' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores en Campo', desc: 'Acceso habilitado al pozo' },
      { id: 'c3', title: 'Auditoría', desc: 'Cumplimiento legal y contractual' }
    ],
    processSteps: [
      {
        id: 'p1',
        stepNumber: 1,
        title: 'Descargar Planillas y Consolidado',
        summary: 'Obtención masiva de archivos PDF y consolidado Excel desde el operador de información.',
        sapTx: 'Portal Web "Mi Planilla"',
        sapVariant: 'VAR_NOM_SEGSOC_2026',
        folderPath: '\\\\servidor_nomina\\pozos\\2026\\descargas_raw\\',
        pcrTitle: 'Descarga incompleta o período equivocado',
        pcrDesc: 'Bajar planillas de un período anterior o dejar trabajadores por fuera del lote.',
        checklists: [
          'Confirmar que el período de pago coincida con el mes en curso.',
          'Verificar que el número total de registros en Excel coincida con la cantidad de PDFs bajados.',
          'Guardar archivos exclusivamente en la carpeta oficial del servidor.'
        ],
        userNotes: 'El reporte Excel de Mi Planilla descarga por defecto con comas. Ajustar formato si la macro lo requiere.'
      },
      {
        id: 'p2',
        stepNumber: 2,
        title: 'Ejecutar Macro de Renombrado',
        summary: 'Transformación automatizada de nombres de PDF al estándar Cédula_Nombre.pdf.',
        sapTx: 'Excel VBA (Macro_Renombrar_v3.xlsm)',
        sapVariant: 'Plantilla de Rótulo Automático',
        folderPath: '\\\\servidor_nomina\\pozos\\2026\\pdf_renombrados\\',
        pcrTitle: 'Desfase de correspondencia PDF vs. Cédula',
        pcrDesc: 'Si el Excel tiene una fila corrida, la Macro asignará la planilla de una persona al PDF de otra.',
        checklists: [
          'Ejecutar la macro en modo prueba si se agregaron nuevas filas manualmente.',
          'Efectuar conteo exacto: Archivos en carpeta destino = Filas en Excel.',
          'Abrir manualmente el primer, del medio y último PDF para verificar que el contenido coincida con el nombre del archivo.'
        ],
        userNotes: 'Si la macro arroja error de permisos, ejecutar Excel como Administrador.'
      },
      {
        id: 'p3',
        stepNumber: 3,
        title: 'Extraer GIN en SAP ERP',
        summary: 'Cruce del número de cédula contra la base maestra para obtener el Código Único GIN.',
        sapTx: 'SE16N / ZHR_MAESTRO_POZOS / SQ01',
        sapVariant: '/VAR_HABILITA_POZO_GIN',
        folderPath: 'SAP ERP -> Exportar a Local: C:\\Users\\Public\\SAP_Exports\\',
        pcrTitle: 'Cédula no encontrada o GIN duplicado',
        pcrDesc: 'Personal de nuevo ingreso que no tenga variante GIN creada en SAP rebotará en la plataforma.',
        checklists: [
          'Utilizar la variante oficial /VAR_HABILITA_POZO_GIN en la transacción SE16N.',
          'Asegurar que la búsqueda no limite la cantidad máxima de aciertos a 200 (quitar límite en SAP).',
          'Validar que no existan celdas vacías (#N/A) en el cruce del archivo resultante.'
        ],
        userNotes: 'Si una cédula es de un contratista reciente, solicitar la creación del GIN al analista senior.'
      },
      {
        id: 'p4',
        stepNumber: 4,
        title: 'Cargar PDFs a Ruta del Servidor',
        summary: 'Transferencia masiva de planillas al repositorio de acceso remoto de la plataforma.',
        sapTx: 'Repositorio Compartido / FTP',
        sapVariant: 'N/A - Protocolo de Red',
        folderPath: '\\\\servidor_nomina\\plataforma_pozos\\planillas_cargadas\\',
        pcrTitle: 'Archivos corruptos o timeout de red durante la carga',
        pcrDesc: 'Un corte breve de red puede dejar archivos en tamaño 0 KB, impidiendo que el trabajador descargue su carné.',
        checklists: [
          'Verificar el peso del lote total antes y después del pegado en el servidor.',
          'Asegurarse de que no existan archivos abiertos en Excel/Adobe mientras se realiza la carga.',
          'Revisar que el nombre de los archivos no contenga caracteres especiales (ñ, tildes, #, /).'
        ],
        userNotes: 'Hacer el cargue preferiblemente antes de las 11:00 AM para evitar congestión de canal.'
      },
      {
        id: 'p5',
        stepNumber: 5,
        title: 'Estructurar y Cargar Template',
        summary: 'Asociación final en la plataforma entre el GIN, la cédula y la ruta del PDF.',
        sapTx: 'Plataforma Web Control Operaciones Pozos',
        sapVariant: 'Template_Cargue_Masivo_v4.xlsx',
        folderPath: 'Plataforma HSE -> Menú "Cargue Masivo de Seguridad Social"',
        pcrTitle: 'Rechazo del Template por formato de celdas',
        pcrDesc: 'Cédulas con formato científico (1.02E+09) o GINs con ceros a la izquierda borrados.',
        checklists: [
          'Formatear la columna Cédula y GIN explícitamente como TEXTO en Excel antes de guardar.',
          'Comprobar que no existan duplicados en la columna GIN dentro del mismo lote.',
          'Verificar el mensaje de confirmación del sistema ("Cargue 100% Exitoso").'
        ],
        userNotes: 'Guardar siempre el archivo con extensión .XLSX estándar.'
      },
      {
        id: 'p6',
        stepNumber: 6,
        title: 'Auditoría y Muestreo de Calidad',
        summary: 'Verificación aleatoria y dirigida en la plataforma para confirmar visualización activa.',
        sapTx: 'Portal de Verificación HSE en Campo',
        sapVariant: 'Filtro por Centro de Costo / Pozo Target',
        folderPath: 'Plataforma HSE -> Consulta de Personal Habilitado',
        pcrTitle: 'Confirmación falsa de cargue',
        pcrDesc: 'Confiar en que el sistema funcionó sin validar que el PDF abra correctamente desde la vista del supervisor en pozo.',
        checklists: [
          'Auditar el 10% de la población cargada (mínimo 5 trabajadores).',
          'Incluir en la muestra obligatoriamente: el primer registro, el último, y 3 elegidos al azar.',
          'Descargar el carné digital de 1 trabajador y confirmar que el PDF abre correctamente.'
        ],
        userNotes: 'Esta es la validación que evita el error de $1.000 USD. No saltarse el muestreo.'
      }
    ]
  },
  //TAREA 24
  {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Cargue de Interfaces",
    category: "Interfaces",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, 
  //TAREA 25
    {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Vacaciones Anticipadas",
    category: "Checks 4A",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  },
   //TAREA 26
    {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Prima Geomobile",
    category: "Checks 4A",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, //TAREA 27
    {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Libranzas BBVA",
    category: "Checks 4A",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, //TAREA 28
    {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Novedades Payroll",
    category: "Checks 4A",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, //TAREA 29
    {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Bono Antiguedad",
    category: "Checks 4A",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, //TAREA 30
    {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Pernonal Art 140",
    category: "Checks 4A",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, //TAREA 31
    {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Apoyo Sostenimiento",
    category: "Checks 4A",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }, //TAREA 32
    {
    id: 'pr-nom-088',
    code: "PR-NOM-088",
    title: "Pensionados",
    category: "Checks 4A",
    version: "v2026.1",
    responsable: "Practicante / Analista de Nómina",
    impactoNegocio: "Garantiza el pago justo por tiempo suplementario respetando la legislación laboral colombiana y los techos presupuestales por centro de costos.",
    criticidad: "Media-Alta",
    frecuencia: "Quincenal",
    suppliers: [
      { id: 's1', title: 'Jefes de Área / Operaciones', desc: 'Aprobación de turnos extra' },
      { id: 's2', title: 'Sistema de Biométrico / Marcaciones', desc: 'Registro físico de ingresos/salidas' }
    ],
    inputs: [
      { id: 'i1', title: 'Reporte de Marcaciones Biométricas', desc: 'Horarios reales marcados' },
      { id: 'i2', title: 'Formato de Autorización de Horas Extras', desc: 'Firma del Director de Área' }
    ],
    outputs: [
      { id: 'o1', title: 'Infotipo 2005 / 2002 en SAP', desc: 'Conceptos de pago asignados' },
      { id: 'o2', title: 'Informe de Costos por Centro de Operaciones', desc: 'Soporte presupuestal' }
    ],
    customers: [
      { id: 'c1', title: 'Trabajadores Operativos', desc: 'Pago puntual de recargos' },
      { id: 'c2', title: 'Control de Gestión / Finanzas', desc: 'Validación presupuestal de nómina' }
    ],
    processSteps: [
      {
        id: 'p1_88',
        stepNumber: 1,
        title: 'Cruce de Marcaciones Biométricas vs. Autorizaciones',
        summary: 'Consolidar las marcaciones del reloj biométrico con las cartas de autorización firmadas.',
        sapTx: 'ZHR_BIOMETRICO / Excel Macro',
        sapVariant: 'VAR_MARCACIONES_CRUDE',
        folderPath: '\\\\servidor_nomina\\horas_extras\\2026\\consolidado\\',
        pcrTitle: 'Pagar horas extras no autorizadas por jefatura',
        pcrDesc: 'Liquidar tiempo de permanencia voluntario o marcaciones tempranas que no fueron aprobadas por la gerencia.',
        checklists: [
          'Cargar el reporte biométrico quincenal.',
          'Aplicar la regla de tolerancia (15 minutos antes/después del turno no cuentan como HE).',
          'Validar que cada hora extra tenga firma de aprobación del jefe directo.'
        ],
        userNotes: 'Verificar que no se superen las 12 horas extras semanales por ley.'
      },
      {
        id: 'p2_88',
        stepNumber: 2,
        title: 'Carga Masiva de Conceptos en SAP (Infotipo 2005)',
        summary: 'Procesar los conceptos de Recargo Nocturno (25%), HE Diurna (25%), HE Nocturna (75%), Festiva (100%).',
        sapTx: 'PA30 / CATS / ZHR_CARGA_HE',
        sapVariant: 'TEMPLATE_HE_2026',
        folderPath: 'SAP HR -> Tiempos -> Infotipo 2005',
        pcrTitle: 'Confusión de recargos y multiplicadores',
        pcrDesc: 'Cargar Horas Extras Diurnas Festivas con el concepto de Diurna Ordinaria, subpagando al colaborador.',
        checklists: [
          'Validar los códigos de concepto en SAP: 1100 (HED), 1105 (HEN), 1110 (HEDF), 1115 (HENF).',
          'Subir el template a través del programa ZHR_CARGA_HE.',
          'Verificar que el log de errores no presente registros rechazados.'
        ],
        userNotes: 'Prestar atención a los turnos nocturnos que cruzan la medianoche.'
      }
    ]
  }
];

export default function App() {
  const [tasks, setTasks] = useState(tasksCatalog);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  
  // Estado para la vista de detalle SIPOC
  const [expandedSteps, setExpandedSteps] = useState({ 'p1': true });
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [completedChecklists, setCompletedChecklists] = useState({});

  // Categorías únicas para filtro
  const categories = ['Todas', ...Array.from(new Set(tasksCatalog.map(t => t.category)))];

  // Tarea activa seleccionada
  const activeTask = tasks.find(t => t.id === selectedTaskId);

  // Filtrado del catálogo
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Manejadores de detalle
  const toggleStep = (id) => {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    if (!activeTask) return;
    const all = {};
    activeTask.processSteps.forEach(step => { all[step.id] = true; });
    setExpandedSteps(all);
  };

  const collapseAll = () => {
    setExpandedSteps({});
  };

  const handleEditNote = (step) => {
    setEditingNoteId(step.id);
    setNoteText(step.userNotes || '');
  };

  const handleSaveNote = (stepId) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== selectedTaskId) return task;
      return {
        ...task,
        processSteps: task.processSteps.map(step => 
          step.id === stepId ? { ...step, userNotes: noteText } : step
        )
      };
    }));
    setEditingNoteId(null);
  };

  const toggleChecklist = (stepId, index) => {
    const key = `${selectedTaskId}-${stepId}-${index}`;
    setCompletedChecklists(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
      
      {/* HEADER PRINCIPAL GLOBAL */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
                <HardHat className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Portal de Procesos de Nómina</span>
                </h1>
                <p className="text-xs text-slate-400">Sistema de Control Operativo</p>
              </div>
            </div>

            {selectedTaskId && (
              <button
                onClick={() => setSelectedTaskId(null)}
                className="sm:hidden px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver</span>
              </button>
            )}
          </div>

          {selectedTaskId ? (
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => setSelectedTaskId(null)}
                className="hidden sm:flex px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors items-center space-x-1.5 shadow-md shadow-blue-950/50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Catálogo</span>
              </button>
              <button
                onClick={expandAll}
                className="px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center space-x-1 border border-slate-700"
                title="Expandir todos los pasos"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Expandir</span>
              </button>
              <button
                onClick={collapseAll}
                className="px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center space-x-1 border border-slate-700"
                title="Colapsar todos los pasos"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Colapsar</span>
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Modo Preventivo: 0 Errores Tolerados</span>
            </div>
          )}
        </div>
      </header>

      {/* VISTA 1: CATÁLOGO DE TAREAS (DASHBOARD PRINCIPAL) */}
      {!selectedTaskId ? (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          {/* BANNER DE BIENVENIDA MENTORÍA */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/50 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10 text-blue-400">
              <Layers className="w-64 h-64" />
            </div>
            <div className="relative z-10 max-w-3xl space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                SPS Interactivo de Nómina
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Aquí podrás tener una visualización sobre el paso a paso de las tareas que te corresponden de una forma más amigable. Evitando cometer errores que en su momento yo pude cometer. Sácale el máximo provecho. Espero te sea de gran ayuda. Just Do It
              </p>
            </div>
          </div>

          {/* BARRA DE BÚSQUEDA Y FILTROS */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            {/* Buscador */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Buscar por código (ej. PR-NOM-042) o título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Filtros de Categoría */}
            <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <div className="flex space-x-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all whitespace-nowrap ${
                      selectedCategory === cat 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* GRID DE TARJETAS DE TAREAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTasks.map(task => (
              <div 
                key={task.id}
                onClick={() => {
                  setSelectedTaskId(task.id);
                  setExpandedSteps({ [task.processSteps[0]?.id || 'p1']: true });
                }}
                className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/60 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-blue-950/20 group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Header Tarjeta */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-1 text-xs font-mono font-semibold bg-blue-950 text-blue-400 border border-blue-800 rounded-md">
                      {task.code}
                    </span>
                    <span className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full border ${
                      task.criticidad === 'Alta' 
                        ? 'bg-rose-950/60 text-rose-300 border-rose-800/60' 
                        : 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                    }`}>
                      Riesgo {task.criticidad}
                    </span>
                  </div>

                  {/* Título y Categoría */}
                  <div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors leading-snug">
                      {task.title}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-400 mt-1">{task.category}</p>
                  </div>

                  {/* Impacto Resumido */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    {task.impactoNegocio}
                  </p>
                </div>

                {/* Footer Tarjeta */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-3 font-mono text-[11px]">
                    <span className="flex items-center space-x-1">
                      <Layers className="w-3.5 h-3.5 text-blue-400" />
                      <span>{task.processSteps.length} Pasos</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{task.frecuencia}</span>
                    </span>
                  </div>
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform font-medium flex items-center space-x-1">
                    <span>Abrir SIPOC</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-sm text-slate-400">No se encontraron tareas con el criterio de búsqueda.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg"
              >
                Limpiar filtros
              </button>
            </div>
          )}

        </main>
      ) : (
        
        /* VISTA 2: DETALLE DEL SIPOC INTERACTIVO PARA LA TAREA SELECCIONADA */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

          {/* BARRA SUPERIOR DE CONTEXTO DE LA TAREA */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-blue-950 text-blue-400 border border-blue-800 rounded">
                    {activeTask.code}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{activeTask.version}</span>
                  <span className="text-xs text-slate-500">&bull;</span>
                  <span className="text-xs text-blue-400 font-medium">{activeTask.category}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{activeTask.title}</h2>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <div className="px-3 py-1.5 bg-amber-950/40 border border-amber-800/50 rounded-xl text-xs text-amber-300 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Riesgo Crítico: <strong>{activeTask.criticidad}</strong></span>
                </div>
              </div>
            </div>

            {/* Impacto en Negocio */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-semibold">Impacto en el Negocio: </strong>
                <span>{activeTask.impactoNegocio}</span>
              </div>
            </div>
          </div>

          {/* ESTRUCTURA GENERAL SIPOC (5 COLUMNAS) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            
            {/* SUPPLIERS */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-blue-400 pb-2 border-b border-slate-800">
                <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-blue-950 border border-blue-800 rounded">S</span>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">Suppliers</h3>
              </div>
              <div className="space-y-2 flex-1 pt-1">
                {activeTask.suppliers.map(s => (
                  <div key={s.id} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs">
                    <p className="font-semibold text-slate-200">{s.title}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* INPUTS */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-indigo-400 pb-2 border-b border-slate-800">
                <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-indigo-950 border border-indigo-800 rounded">I</span>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">Inputs</h3>
              </div>
              <div className="space-y-2 flex-1 pt-1">
                {activeTask.inputs.map(i => (
                  <div key={i.id} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs">
                    <p className="font-semibold text-slate-200">{i.title}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{i.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PROCESS INDICATOR */}
            <div className="bg-blue-950/30 border border-blue-600/40 rounded-xl p-3.5 flex flex-col space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-blue-800/50">
                <div className="flex items-center space-x-2 text-blue-400">
                  <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-blue-600 text-white rounded">P</span>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-blue-300">Process</h3>
                </div>
                <span className="text-[10px] bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-full border border-blue-700/50 font-mono">
                  {activeTask.processSteps.length} Pasos
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center text-center p-2">
                <Layers className="w-7 h-7 text-blue-400 mb-2 animate-pulse" />
                <p className="text-xs font-medium text-slate-200">Flujo Operativo</p>
                <p className="text-[10px] text-slate-400 mt-1">Despliega los pasos inferiores para ver controles.</p>
              </div>
            </div>

            {/* OUTPUTS */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 pb-2 border-b border-slate-800">
                <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-emerald-950 border border-emerald-800 rounded">O</span>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">Outputs</h3>
              </div>
              <div className="space-y-2 flex-1 pt-1">
                {activeTask.outputs.map(o => (
                  <div key={o.id} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs">
                    <p className="font-semibold text-slate-200">{o.title}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{o.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CUSTOMERS */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-purple-400 pb-2 border-b border-slate-800">
                <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-purple-950 border border-purple-800 rounded">C</span>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">Customers</h3>
              </div>
              <div className="space-y-2 flex-1 pt-1">
                {activeTask.customers.map(c => (
                  <div key={c.id} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs">
                    <p className="font-semibold text-slate-200">{c.title}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* SECUENCIA DETALLADA DE PASOS */}
          <section className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span>Secuencia Detallada de Ejecución y Controles de Calidad</span>
              </h3>
            </div>

            <div className="space-y-3">
              {activeTask.processSteps.map((step) => {
                const isExpanded = expandedSteps[step.id];

                return (
                  <div 
                    key={step.id} 
                    className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                      isExpanded 
                        ? 'bg-slate-900 border-blue-500/50 shadow-lg shadow-blue-950/20' 
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/70'
                    }`}
                  >
                    {/* Header del Paso */}
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <div className="flex items-center space-x-3.5 min-w-0">
                        <div className={`w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center shrink-0 border ${
                          isExpanded 
                            ? 'bg-blue-600 border-blue-400 text-white' 
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}>
                          {step.stepNumber}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-slate-100 truncate">{step.title}</h4>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{step.summary}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        {step.sapTx && step.sapTx !== 'N/A' && (
                          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-emerald-400 border border-slate-800">
                            <Terminal className="w-3 h-3 mr-1 text-emerald-500" />
                            {step.sapTx.split('/')[0]}
                          </span>
                        )}
                        <div className={`p-1 rounded text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-blue-400' : ''}`}>
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </button>

                    {/* Contenido Desplegable */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-800 bg-slate-950/60 space-y-4 text-xs">
                        
                        {/* Ficha Técnica */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                            <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                              <Terminal className="w-4 h-4" />
                              <span>Transacción / Sistema</span>
                            </div>
                            <p className="font-mono text-slate-200 text-[11px] pt-1">{step.sapTx}</p>
                          </div>

                          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                            <div className="flex items-center space-x-1.5 text-blue-400 font-semibold">
                              <BookOpen className="w-4 h-4" />
                              <span>Variante Recomendada</span>
                            </div>
                            <p className="font-mono text-slate-200 text-[11px] pt-1">{step.sapVariant}</p>
                          </div>

                          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                            <div className="flex items-center space-x-1.5 text-indigo-400 font-semibold">
                              <FolderGit2 className="w-4 h-4" />
                              <span>Ruta de Servidor</span>
                            </div>
                            <p className="font-mono text-slate-300 text-[10px] break-all pt-1 bg-slate-950 p-1 rounded border border-slate-800">
                              {step.folderPath}
                            </p>
                          </div>
                        </div>

                        {/* Riesgo y Checklists */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Riesgo */}
                          <div className="p-3.5 bg-amber-950/20 border border-amber-800/40 rounded-xl space-y-2">
                            <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs">
                              <AlertTriangle className="w-4 h-4 shrink-0" />
                              <span>Punto Crítico de Riesgo (PCR): {step.pcrTitle}</span>
                            </div>
                            <p className="text-amber-200/80 text-xs leading-relaxed pl-6">
                              {step.pcrDesc}
                            </p>
                          </div>

                          {/* Checklist */}
                          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs mb-1">
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              <span>Checklist de Verificación (Doble Check)</span>
                            </div>
                            <div className="space-y-1.5 pl-1">
                              {step.checklists.map((check, idx) => {
                                const checkKey = `${selectedTaskId}-${step.id}-${idx}`;
                                const isChecked = !!completedChecklists[checkKey];
                                return (
                                  <label 
                                    key={idx}
                                    onClick={() => toggleChecklist(step.id, idx)}
                                    className={`flex items-start space-x-2 p-1.5 rounded cursor-pointer transition-colors ${
                                      isChecked ? 'bg-emerald-950/30 text-emerald-300' : 'hover:bg-slate-800/50 text-slate-300'
                                    }`}
                                  >
                                    <input 
                                      type="checkbox" 
                                      checked={isChecked}
                                      onChange={() => {}} 
                                      className="mt-0.5 rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0"
                                    />
                                    <span className={`text-[11px] leading-snug ${isChecked ? 'line-through text-slate-400' : ''}`}>
                                      {check}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>

                        </div>

                        {/* Notas */}
                        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-slate-400 font-medium">
                              <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                              <span>Manual de la Practicante (Notas Personales)</span>
                            </div>
                            {editingNoteId !== step.id && (
                              <button
                                onClick={() => handleEditNote(step)}
                                className="text-[11px] text-blue-400 hover:text-blue-300 underline"
                              >
                                Editar notas
                              </button>
                            )}
                          </div>

                          {editingNoteId === step.id ? (
                            <div className="space-y-2 pt-1">
                              <textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-sans"
                                rows={3}
                              />
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => setEditingNoteId(null)}
                                  className="px-2.5 py-1 text-xs bg-slate-800 text-slate-300 rounded"
                                >
                                  Cancelar
                                </button>
                                <button
                                  onClick={() => handleSaveNote(step.id)}
                                  className="px-2.5 py-1 text-xs bg-blue-600 text-white font-medium rounded flex items-center space-x-1"
                                >
                                  <Save className="w-3 h-3" />
                                  <span>Guardar</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-300 italic bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                              "{step.userNotes || 'Sin notas adicionadas.'}"
                            </p>
                          )}
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>Portal Multitarea de Procesos de Nómina &bull; Gestión de Calidad</p>
          <p className="text-slate-600">Diseñado para asegurar la constancia y prevenir errores operativos</p>
        </div>
      </footer>

    </div>
  );
}
