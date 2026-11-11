import React, { useState, useEffect } from 'react';
import { 
  Building2, FileSpreadsheet, Cpu, FileCheck2, Users, 
  ChevronRight, ChevronDown, CheckCircle2, AlertTriangle, 
  Terminal, FolderGit2, Info, Edit3, Save, RotateCcw, 
  Maximize2, Minimize2, ShieldCheck, HardHat, FileText,
  Search, ExternalLink, HelpCircle, BookOpen, Layers
} from 'lucide-react';

// Datos iniciales estructurados del SIPOC
const initialSipocData = {
  title: "Cargue Planillas de Seguridad Social",
  code: "PR-NOM-042",
  version: "v2026.1",
  responsable: "Practicante Analista de Nómina",
  impactoNegocio: "Permiso de ingreso de trabajadores a campos de extracción. Un error paraliza la operación y genera costos de tiempo inactivo y multas.",

  suppliers: [
    { id: 's1', title: 'Mi Planilla', desc: 'Plataforma para descargar las planillas', icon: 'Building2' },
    { id: 's2', title: 'SAP ERP ', desc: 'Base Maestra de Empleados', icon: 'Cpu' }
  ],

  inputs: [
    { id: 'i1', title: 'Planillas en PDF', desc: 'Comprobantes de pago mes actual' },
    { id: 'i2', title: 'Reporte Excel Masivo', desc: 'Consolidado Nombres + Cédulas' },
    { id: 'i3', title: 'Variantes SAP (GIN)', desc: 'Código Único de Trabajador' }
  ],

  outputs: [
    { id: 'o1', title: 'PDFs Renombrados', desc: 'Formato estándar por Cédula' },
    { id: 'o2', title: 'Template de Cargue', desc: 'Archivo estandarizado (GIN + ID)' }
  ],

  customers: [
    { id: 'c1', title: 'Trabajadores en Campo', desc: 'Acceso habilitado al pozo' },
    { id: 'c3', title: 'Cliente / Auditoría', desc: 'Cumplimiento legal y contractual' }
  ],

  processSteps: [
    {
      id: 'p1',
      stepNumber: 1,
      title: 'Descargar Planillas y Excel',
      summary: 'Obtención  las planillas por empleados en PDF y la planilla en Excel',
      sapTx: 'N/A (Portal Portal Web "Mi Planilla")',
      pcrTitle: 'Descarga incompleta o período equivocado',
      pcrDesc: 'Bajar planillas de un período anterior.',
      checklists: [
        'Confirmar que el período de pago coincida con el mes en curso.'
      ],
      userNotes: 'Recuerda actualizar la página mientras descargas los pdf porque puede tardar un poco o no se actualiza el porcentaje.'
    },
    {
      id: 'p2',
      stepNumber: 2,
      title: 'Ejecutar Macro de Renombrado',
      summary: 'Transformación automatizada de nombres de PDF al estándar Cédula_Nombre.pdf.',
      sapTx: 'Herramienta Excel VBA (Macro_Renombrar_v3.xlsm)',
      sapVariant: 'Plantilla de Rótulo Automático',
      folderPath: '\\\\servidor_nomina\\pozos\\2026\\pdf_renombrados\\',
      pcrTitle: 'Desfase de correspondencia PDF vs. Cédula',
      pcrDesc: 'Si el Excel tiene una fila corrida, la Macro asignará la planilla de una persona al PDF de otra.',
      checklists: [
        'Ejecutar la macro en modo prueba si se agregaron nuevas filas manualmente.',
        'Efectuar conteo exacto: Archivos en carpeta destino = Filas en Excel.',
        'Abrir manualmente el primer, del medio y último PDF para verificar que el contenido coincida con el nombre del archivo.'
      ],
      userNotes: 'Si la macro arroja error de permisos, ejecutar Excel como Administrador o pedir desbloqueo de red a TI.'
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
      userNotes: 'Si una cédula es de un contratista reciente, solicitar la creación del GIN al analista senior antes de continuar.'
    },
    {
      id: 'p4',
      stepNumber: 4,
      title: 'Cargar PDFs a Ruta del Servidor',
      summary: 'Transferencia masiva de planillas al repositorio de acceso remoto de la plataforma.',
      sapTx: 'FTP Client / Repositorio Compartido',
      sapVariant: 'N/A - Protocolo de Red',
      folderPath: '\\\\servidor_nomina\\plataforma_pozos\\planillas_cargadas\\',
      pcrTitle: 'Archivos corruptos o timeout de red durante la carga',
      pcrDesc: 'Un corte breve de red puede dejar archivos en tamaño 0 KB, impidiendo que el trabajador descargue su carné.',
      checklists: [
        'Verificar el peso del lote total antes y después del pegado en el servidor.',
        'Asegurarse de que no existan archivos abiertos en Excel/Adobe mientras se realiza la carga.',
        'Revisar que el nombre de los archivos no contenga caracteres especiales (ñ, tildes, #, /).'
      ],
      userNotes: 'Hacer el cargue preferiblemente antes de las 11:00 AM para evitar congestión de canal con el área de operaciones.'
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
      userNotes: 'Guardar siempre el archivo con extensión .XLSX estándar, no como Libro de Excel 97-2003.'
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
        'Descargar el carné digital de 1 trabajador y confirmar que el PDF que abre corresponde a su cédula.'
      ],
      userNotes: 'Esta es la validación que evita el error de $1.000 USD. No saltarse el muestreo por afán.'
    }
  ]
};

export default function App() {
  const [data, setData] = useState(initialSipocData);
  const [expandedSteps, setExpandedSteps] = useState({ 'p1': true }); // El primer paso inicia abierto por defecto
  const [activeTab, setActiveTab] = useState('diagram');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [completedChecklists, setCompletedChecklists] = useState({});

  // Manejadores de colapso/expansión
  const toggleStep = (id) => {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all = {};
    data.processSteps.forEach(step => { all[step.id] = true; });
    setExpandedSteps(all);
  };

  const collapseAll = () => {
    setExpandedSteps({});
  };

  // Manejo de Notas del Practicante
  const handleEditNote = (step) => {
    setEditingNoteId(step.id);
    setNoteText(step.userNotes || '');
  };

  const handleSaveNote = (stepId) => {
    setData(prev => ({
      ...prev,
      processSteps: prev.processSteps.map(step => 
        step.id === stepId ? { ...step, userNotes: noteText } : step
      )
    }));
    setEditingNoteId(null);
  };

  // Toggle checklist
  const toggleChecklist = (stepId, index) => {
    const key = `${stepId}-${index}`;
    setCompletedChecklists(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-500 selection:text-white">
      
      {/* HEADER PRINCIPAL */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
              <HardHat className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-xs font-mono bg-blue-950 text-blue-400 border border-blue-800 rounded">
                  {data.code}
                </span>
                <span className="text-xs text-slate-400 font-mono">{data.version}</span>
              </div>
              <h1 className="text-lg font-bold text-white tracking-tight">{data.title}</h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end md:self-auto">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center space-x-1 border border-slate-700"
              title="Expandir todos los detalles del proceso"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expandir Todo</span>
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center space-x-1 border border-slate-700"
              title="Colapsar todos los pasos"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Colapsar Todo</span>
            </button>
          </div>
        </div>
      </header>

      {/* BARRA DE CONTEXTO E IMPACTO EN NEGOCIO */}
      <section className="bg-slate-950/60 border-b border-slate-800/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 text-xs flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-400 bg-amber-950/30 px-3 py-1.5 rounded-lg border border-amber-900/40">
            <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
            <span><strong className="font-semibold text-amber-300">Impacto en Negocio:</strong> {data.impactoNegocio}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-400 shrink-0">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span><strong>Responsable:</strong> {data.responsable}</span>
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

        {/* NAVEGACIÓN Y RESUMEN GENERAL DEL SIPOC */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          
          {/* S - SUPPLIERS */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3.5 flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-blue-400 pb-2 border-b border-slate-700/50">
              <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-blue-950 border border-blue-800 rounded">S</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">Suppliers</h3>
            </div>
            <div className="space-y-2 flex-1 pt-1">
              {data.suppliers.map(s => (
                <div key={s.id} className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg text-xs">
                  <p className="font-semibold text-slate-200">{s.title}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* I - INPUTS */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3.5 flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 pb-2 border-b border-slate-700/50">
              <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-indigo-950 border border-indigo-800 rounded">I</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">Inputs</h3>
            </div>
            <div className="space-y-2 flex-1 pt-1">
              {data.inputs.map(i => (
                <div key={i.id} className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg text-xs">
                  <p className="font-semibold text-slate-200">{i.title}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">{i.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* P - PROCESS (INDICADOR) */}
          <div className="bg-blue-950/20 border border-blue-600/40 rounded-xl p-3.5 flex flex-col space-y-2 shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-blue-800/40">
              <div className="flex items-center space-x-2 text-blue-400">
                <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-blue-600 text-white rounded">P</span>
                <h3 className="font-bold text-xs uppercase tracking-wider text-blue-300">Process</h3>
              </div>
              <span className="text-[10px] bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full border border-blue-700/50 font-mono">
                {data.processSteps.length} Pasos
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center text-center p-2">
              <Layers className="w-8 h-8 text-blue-400 mb-2 animate-pulse" />
              <p className="text-xs font-medium text-slate-200">Flujo Secuencial Operativo</p>
              <p className="text-[10px] text-slate-400 mt-1">Explora los desplegables inferiores para ver transacciones SAP y controles.</p>
            </div>
          </div>

          {/* O - OUTPUTS */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3.5 flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 pb-2 border-b border-slate-700/50">
              <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-emerald-950 border border-emerald-800 rounded">O</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">Outputs</h3>
            </div>
            <div className="space-y-2 flex-1 pt-1">
              {data.outputs.map(o => (
                <div key={o.id} className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg text-xs">
                  <p className="font-semibold text-slate-200">{o.title}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* C - CUSTOMERS */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3.5 flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-purple-400 pb-2 border-b border-slate-700/50">
              <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-purple-950 border border-purple-800 rounded">C</span>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">Customers</h3>
            </div>
            <div className="space-y-2 flex-1 pt-1">
              {data.customers.map(c => (
                <div key={c.id} className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg text-xs">
                  <p className="font-semibold text-slate-200">{c.title}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SECCIÓN DETALLADA DEL PROCESO (PASOS EXPANDIBLES) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span>Secuencia Detallada de Ejecución y Controles de Calidad</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Haz clic en cualquier paso para abrir la guía técnica de transacciones, variantes y riesgos.</p>
            </div>
          </div>

          {/* LISTA DE PASOS INTERACTIVOS */}
          <div className="space-y-3">
            {data.processSteps.map((step) => {
              const isExpanded = expandedSteps[step.id];

              return (
                <div 
                  key={step.id} 
                  className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? 'bg-slate-800/90 border-blue-500/50 shadow-lg shadow-blue-950/20' 
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70 hover:border-slate-600'
                  }`}
                >
                  {/* BARRA SUPERIOR DEL PASO (HEADER CLICKABLE) */}
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center shrink-0 border transition-colors ${
                        isExpanded 
                          ? 'bg-blue-600 border-blue-400 text-white shadow-sm' 
                          : 'bg-slate-700 border-slate-600 text-slate-300'
                      }`}>
                        {step.stepNumber}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-slate-100 truncate flex items-center space-x-2">
                          <span>{step.title}</span>
                        </h3>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{step.summary}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      {step.sapTx && step.sapTx !== 'N/A' && (
                        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-emerald-400 border border-slate-700">
                          <Terminal className="w-3 h-3 mr-1 text-emerald-500" />
                          {step.sapTx.split('/')[0]}
                        </span>
                      )}
                      <div className={`p-1 rounded-md text-slate-400 hover:text-white transition-transform ${isExpanded ? 'rotate-180 text-blue-400' : ''}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </button>

                  {/* CONTENIDO DESPLEGABLE CON DETALLES */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-700/50 bg-slate-900/60 space-y-4 text-xs">
                      
                      {/* INFORMACIÓN TÉCNICA Y RUTAS */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                        
                        {/* Transacción SAP */}
                        <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                          <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                            <Terminal className="w-4 h-4" />
                            <span>Transacción / Herramienta</span>
                          </div>
                          <p className="font-mono text-slate-200 text-[11px] pt-1">{step.sapTx}</p>
                        </div>

                        {/* Variante */}
                        <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                          <div className="flex items-center space-x-1.5 text-blue-400 font-semibold">
                            <BookOpen className="w-4 h-4" />
                            <span>Variante a Utilizar</span>
                          </div>
                          <p className="font-mono text-slate-200 text-[11px] pt-1">{step.sapVariant}</p>
                        </div>

                        {/* Ruta de Servidor */}
                        <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                          <div className="flex items-center space-x-1.5 text-indigo-400 font-semibold">
                            <FolderGit2 className="w-4 h-4" />
                            <span>Ruta de Servidor / Directorio</span>
                          </div>
                          <p className="font-mono text-slate-300 text-[10px] break-all pt-1 bg-slate-900 p-1 rounded border border-slate-800">
                            {step.folderPath}
                          </p>
                        </div>

                      </div>

                      {/* RIESGO CRÍTICO (PCR) Y VERIFICACIONES */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* ALERTA DE RIESGO */}
                        <div className="p-3.5 bg-amber-950/20 border border-amber-800/40 rounded-xl space-y-2">
                          <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs">
                            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>Punto Crítico de Riesgo (PCR): {step.pcrTitle}</span>
                          </div>
                          <p className="text-amber-200/80 text-xs leading-relaxed pl-6">
                            {step.pcrDesc}
                          </p>
                        </div>

                        {/* CHECKLIST DE DOBLE CHECK */}
                        <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                          <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs mb-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Checklist de Verificación (Doble Check)</span>
                          </div>
                          <div className="space-y-1.5 pl-1">
                            {step.checklists.map((check, idx) => {
                              const checkKey = `${step.id}-${idx}`;
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
                                    onChange={() => {}} // Manejado en el label
                                    className="mt-0.5 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 focus:ring-offset-0"
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

                      {/* NOTAS PERSONALIZADAS DE LA PRACTICANTE */}
                      <div className="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-slate-400 font-medium">
                            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                            <span>Manual de la Practicante (Notas Personales)</span>
                          </div>
                          {editingNoteId !== step.id && (
                            <button
                              onClick={() => handleEditNote(step)}
                              className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center space-x-1 underline"
                            >
                              <span>Editar notas</span>
                            </button>
                          )}
                        </div>

                        {editingNoteId === step.id ? (
                          <div className="space-y-2 pt-1">
                            <textarea
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans"
                              rows={3}
                              placeholder="Escribe tus observaciones o tips para este paso..."
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setEditingNoteId(null)}
                                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                              >
                                Cancelar
                              </button>
                              <button
                                onClick={() => handleSaveNote(step.id)}
                                className="px-2.5 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium rounded flex items-center space-x-1"
                              >
                                <Save className="w-3 h-3" />
                                <span>Guardar</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-300 italic bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/50">
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

      {/* FOOTER CORPORATIVO */}
      <footer className="bg-slate-950 border-t border-slate-800 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>Sistema de Excelencia Operativa en Nómina &bull; Gestión de Riesgos e Ingeniería Industrial</p>
          <p className="text-slate-600">Diseñado para la formación de practicantes de alto rendimiento</p>
        </div>
      </footer>

    </div>
  );
}
