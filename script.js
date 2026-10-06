
function snapshotTrace(state, extra = {}) {
  return { ...state, ...extra };
}

function renderTraceConsole(lines) {
  if (!lines || !lines.length) return '<div class="console-line muted">Aún no hay salida.</div>';
  return lines.map(([kind, txt]) => `<div class="console-line ${kind}">${txt}</div>`).join('');
}

function buildProductTrace() {
  const trace = [];
  const state = { codigo:'—', nombre:'—', cantidad:0, ultimoCodigo:'—', ultimoNombre:'—' };
  const consoleLines = [];
  const push = (line, msg, test='—', bool=null, phase='') => trace.push(snapshotTrace(state, {line,msg,test,bool,phase,console:[...consoleLines]}));

  push(0, 'Inicializamos el contador de productos en 0.', '—', null, 'Inicialización');
  state.codigo = 'VAL123'; consoleLines.push(['input','Ingrese código de producto 1: VAL123']);
  push(1, 'Leemos el primer código antes de evaluar el while.', '—', null, 'Lectura inicial');

  const products = [
    ['VAL123','Válvula Neumática','FTR456',2],
    ['FTR456','Filtro Hidráulico','BMB321',3],
    ['BMB321','Bomba Centrífuga','FIN',4]
  ];
  for (const [codigo,nombre,siguiente,nroSig] of products) {
    state.codigo = codigo;
    push(2, `${codigo} no es FIN, por eso el ciclo entra.`, `${codigo} != FIN`, true, 'Evaluar condición');
    state.nombre = nombre; consoleLines.push(['input',`Ingrese nombre del producto ${state.cantidad+1}: ${nombre}`]);
    push(3, `Leemos el nombre asociado al código ${codigo}.`, `${codigo} != FIN`, true, 'Leer nombre');
    state.cantidad += 1;
    push(4, `Incrementamos el contador: cantidad = ${state.cantidad}.`, `${codigo} != FIN`, true, 'Actualizar contador');
    state.ultimoCodigo = codigo;
    push(5, `Guardamos ${codigo} como último código válido.`, `${codigo} != FIN`, true, 'Guardar último código');
    state.ultimoNombre = nombre;
    push(6, `Guardamos “${nombre}” como último nombre válido.`, `${codigo} != FIN`, true, 'Guardar último nombre');
    state.codigo = siguiente; state.nombre = '—'; consoleLines.push(['input',`Ingrese código de producto ${nroSig}: ${siguiente}`]);
    push(7, `Leemos el siguiente código para volver a evaluar la condición.`, `${siguiente} != FIN`, siguiente !== 'FIN', 'Leer siguiente código');
  }

  push(2, 'Ahora el código es FIN: la condición es falsa y no se procesa otro producto.', 'FIN != FIN', false, 'Evaluar condición');
  consoleLines.push(['output',`Total de productos: ${state.cantidad}`]);
  consoleLines.push(['output',`Código: ${state.ultimoCodigo}`]);
  consoleLines.push(['output',`Nombre: ${state.ultimoNombre}`]);
  push(8, 'El while terminó. Mostramos el resumen con los datos acumulados.', 'FIN != FIN', false, 'Salida');
  return trace;
}

function buildTemperatureTrace() {
  const trace = [];
  const state = { temp:'—', max:'—', suma:0, cont:0, prom:'—' };
  const consoleLines = [];
  const push = (line,msg,test='—',bool=null,phase='') => trace.push(snapshotTrace(state,{line,msg,test,bool,phase,console:[...consoleLines]}));
  push(0,'Inicializamos suma y contador en 0.','—',null,'Inicialización');
  state.temp = 75; consoleLines.push(['input','Temperatura 1: 75 °C']);
  push(1,'Leemos la primera temperatura antes de entrar al while.','—',null,'Lectura inicial');

  const temps=[75,78,76,81,89];
  const nexts=[78,76,81,89,95];
  for(let k=0;k<temps.length;k++){
    const t=temps[k]; state.temp=t;
    push(2,`${t} ≤ 90: la condición es verdadera.`,`${t} <= 90`,true,'Evaluar while');
    state.suma += t;
    push(3,`Sumamos ${t}: suma = ${state.suma}.`,`${t} <= 90`,true,'Acumular');
    state.cont += 1;
    push(4,`Incrementamos el contador: contador = ${state.cont}.`,`${t} <= 90`,true,'Contar dato válido');
    const ifok = state.cont===1 || state.max==='—' || t>state.max;
    const expr = state.cont===1 ? `contador == 1` : `${t} > ${state.max}`;
    push(5,`Evaluamos si debemos actualizar el máximo.`,expr,ifok,'Evaluar if');
    if(ifok){
      state.max=t;
      push(6,`Actualizamos máximo = ${t}.`,expr,true,'Actualizar máximo');
    }
    state.temp=nexts[k]; consoleLines.push(['input',`Temperatura ${k+2}: ${nexts[k]} °C`]);
    push(7,`Leemos la siguiente temperatura: ${nexts[k]} °C.`,`${nexts[k]} <= 90`,nexts[k]<=90,'Leer siguiente dato');
  }
  push(2,'95 > 90: la condición del while es falsa. 95 no entra a suma, contador ni máximo.','95 <= 90',false,'Evaluar while');
  consoleLines.push(['alert','Alerta: se excedió la temperatura límite']);
  push(8,'Mostramos la alerta al salir del ciclo.','95 <= 90',false,'Alerta');
  state.prom = (state.suma/state.cont).toFixed(1);
  push(9,`Calculamos promedio = ${state.suma} / ${state.cont} = ${state.prom}.`,'—',null,'Calcular promedio');
  consoleLines.push(['output',`Temperatura máxima: ${state.max}`]);
  push(10,`Mostramos la temperatura máxima: ${state.max}.`,'—',null,'Salida');
  consoleLines.push(['output',`Temperatura promedio: ${state.prom}`]);
  push(11,`Mostramos el promedio final: ${state.prom}.`,'—',null,'Salida');
  return trace;
}

function buildWorkerTrace() {
  const trace=[];
  const state={worker:'—',hrs:'—',count:0,total:0};
  const consoleLines=[];
  const push=(line,msg,test='—',bool=null,phase='')=>trace.push(snapshotTrace(state,{line,msg,test,bool,phase,console:[...consoleLines]}));
  push(0,'Inicializamos cantidad y totalHoras en 0.','—',null,'Inicialización');
  state.worker='Juan'; consoleLines.push(['input','Trabajador 1: Juan']);
  push(1,'Leemos el primer trabajador antes del while.','—',null,'Lectura inicial');

  const workers=[
    {name:'Juan',attempts:[5,7],next:'Ana',nextN:2},
    {name:'Ana',attempts:[8],next:'Luis',nextN:3},
    {name:'Luis',attempts:[13,9],next:'FIN',nextN:4}
  ];
  for(const w of workers){
    state.worker=w.name;
    push(2,`${w.name} != FIN, por eso entramos al ciclo.`,`${w.name} != FIN`,true,'Evaluar while externo');
    state.hrs=w.attempts[0]; consoleLines.push(['input',`Horas: ${w.attempts[0]}`]);
    push(3,`Leemos las horas de ${w.name}: ${state.hrs}.`,'—',null,'Leer horas');
    let idx=0;
    while(true){
      const invalid=state.hrs<6 || state.hrs>12;
      push(4,`Evaluamos si ${state.hrs} está fuera del rango 6–12.`,`${state.hrs} < 6 or ${state.hrs} > 12`,invalid,'Validar horas');
      if(!invalid) break;
      consoleLines.push(['alert','Hora incorrecta, ingrésela nuevamente.']);
      push(5,'La hora es inválida, por eso mostramos el mensaje de error.',`${state.hrs} < 6 or ${state.hrs} > 12`,true,'Mensaje de error');
      idx += 1; state.hrs=w.attempts[idx]; consoleLines.push(['input',`Horas: ${state.hrs}`]);
      push(6,`Volvemos a leer las horas. Nuevo valor: ${state.hrs}.`,'—',null,'Reingresar horas');
    }
    state.count += 1;
    push(7,`Como las horas son válidas, cantidad = ${state.count}.`,'—',null,'Actualizar contador');
    state.total += state.hrs;
    push(8,`Sumamos las horas: totalHoras = ${state.total}.`,'—',null,'Acumular horas');
    state.worker=w.next; state.hrs='—'; consoleLines.push(['input',`Trabajador ${w.nextN}: ${w.next}`]);
    push(9,`Leemos el siguiente nombre para volver a evaluar el while externo.`,'—',null,'Leer siguiente trabajador');
  }
  push(2,'FIN == FIN: la condición externa es falsa y terminamos.','FIN != FIN',false,'Evaluar while externo');
  consoleLines.push(['output',`Cantidad de trabajadores: ${state.count}`]);
  push(10,`Mostramos la cantidad final de trabajadores: ${state.count}.`,'—',null,'Salida');
  consoleLines.push(['output',`Total de horas: ${state.total}`]);
  push(11,`Mostramos el total de horas acumuladas: ${state.total}.`,'—',null,'Salida');
  return trace;
}

function buildInspectionTrace() {
  const trace=[];
  const state={approved:0,rejected:0,total:0,pct:'—',estado:'—'};
  const consoleLines=[];
  const push=(line,msg,test='—',bool=null,phase='')=>trace.push(snapshotTrace(state,{line,msg,test,bool,phase,console:[...consoleLines]}));
  push(0,'Inicializamos aprobados en 0.','—',null,'Inicialización');
  push(1,'Inicializamos rechazados en 0.','—',null,'Inicialización');
  const seq=['R','A','R','A','A','A','A'];
  for(let i=0;i<seq.length;i++){
    push(2,`Evaluamos ${state.approved} < 5. Todavía ${state.approved<5?'seguimos':'terminamos'}.`,`${state.approved} < 5`,state.approved<5,'Evaluar while');
    state.estado=seq[i]; state.total=i+1; consoleLines.push(['input',`Producto ${i+1}: ${seq[i]}`]);
    push(3,`Leemos el estado del producto ${i+1}: ${seq[i]}.`,'—',null,'Leer estado');
    const isA=seq[i]==='A';
    push(4,`Evaluamos si el estado es A.`,`${seq[i]} == A`,isA,'Evaluar if');
    if(isA){
      state.approved += 1;
      push(5,`Es aprobado: aprobados = ${state.approved}.`,'—',null,'Actualizar contador aprobados');
    } else {
      push(6,'La condición del if es falsa, así que entramos al else.','—',null,'Else');
      state.rejected += 1;
      push(7,`Es rechazado: rechazados = ${state.rejected}.`,'—',null,'Actualizar rechazados');
    }
  }
  push(2,`Evaluamos ${state.approved} < 5. Ahora es falso y el while termina.`,`${state.approved} < 5`,false,'Evaluar while');
  state.pct=((state.approved/(state.approved+state.rejected))*100).toFixed(2);
  push(8,`Calculamos porcentaje = 5 / 7 × 100 = ${state.pct}%.`,'—',null,'Calcular porcentaje');
  consoleLines.push(['output',`Aprobados: ${state.approved}`]); push(9,'Mostramos aprobados.','—',null,'Salida');
  consoleLines.push(['output',`Rechazados: ${state.rejected}`]); push(10,'Mostramos rechazados.','—',null,'Salida');
  consoleLines.push(['output',`% Aprobados: ${state.pct}`]); push(11,'Mostramos el porcentaje final.','—',null,'Salida');
  return trace;
}

const slides = [
  {
    title: "¿Qué hace realmente un while?",
    short: "Idea central",
    render(step) {
      const beats = [
        {
          tag: "Concepto",
          body: `
            <div class="slide-kicker">01 · Idea central</div>
            <h2 class="slide-title">WHILE significa: <span class="highlight">“repite mientras esto siga siendo verdadero”</span></h2>
            <p class="slide-subtitle">No necesitas saber cuántas repeticiones habrá. En el patrón básico que aprenderemos primero, usamos un <strong>contador</strong> y una condición que depende de ese contador.</p>
            <div class="flow">
              <div class="flow-node active">Evaluar contador en la condición</div><div class="flow-arrow">→</div>
              <div class="flow-node">Ejecutar bloque</div><div class="flow-arrow">→</div>
              <div class="flow-node">Actualizar contador</div><div class="flow-arrow">↺</div>
            </div>
            <div class="step-callout"><strong>Relación clave</strong><span>El contador aparece en la condición. Al cambiar el contador dentro del ciclo, también puede cambiar el resultado de la condición.</span></div>
          `
        },
        {
          tag: "La condición",
          body: `
            <div class="slide-kicker">01 · Idea central</div>
            <h2 class="slide-title">El ciclo no “decide” al final. <span class="highlight">Pregunta antes de entrar.</span></h2>
            <div class="logic-board">
              <div>
                <div class="code">
                  <span class="code-line"><span class="var">contador</span> = <span class="num">1</span></span>
                  <span class="code-line active"><span class="kw">Mientras</span> contador &lt; 5:</span>
                  <span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;ejecutar instrucciones</span>
                  <span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;contador = contador + 1</span>
                </div>
                <div class="step-callout"><strong>La condición y el contador están conectados</strong><span>La condición lee el valor del contador antes de cada repetición. Después, el cuerpo actualiza ese contador.</span></div>
              </div>
              <div class="trace-panel">
                <div class="condition-box"><span class="condition-expression">contador = 1</span><span class="bool-pill">VALOR</span></div>
                <div class="condition-box"><span class="condition-expression">contador &lt; 5</span><span class="bool-pill bool-true">VERDADERO</span></div>
                <div class="condition-box"><span class="condition-expression">¿entra al cuerpo?</span><span class="bool-pill bool-true">SÍ</span></div>
              </div>
            </div>
          `
        },
        {
          tag: "Riesgo típico",
          body: `
            <div class="slide-kicker">01 · Idea central</div>
            <h2 class="slide-title">Un while necesita una <span class="danger">salida posible</span>.</h2>
            <div class="grid-2">
              <div class="card warn-card">
                <h3>❌ Problema</h3>
                <div class="code">
                  <span class="code-line"><span class="var">contador</span> = <span class="num">1</span></span>
                  <span class="code-line"><span class="kw">Mientras</span> contador &lt; 5:</span>
                  <span class="code-line active">&nbsp;&nbsp;&nbsp;&nbsp;mostrar(contador)</span>
                </div>
                <p style="margin-top:10px">El contador nunca cambia. Como la condición depende de él, siempre sigue siendo verdadera.</p>
              </div>
              <div class="card good-card">
                <h3>✅ Solución</h3>
                <div class="code">
                  <span class="code-line"><span class="var">contador</span> = <span class="num">1</span></span>
                  <span class="code-line"><span class="kw">Mientras</span> contador &lt; 5:</span>
                  <span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;print(contador)</span>
                  <span class="code-line active">&nbsp;&nbsp;&nbsp;&nbsp;contador = contador + 1</span>
                </div>
                <p style="margin-top:10px">Al actualizar el contador, cambia el valor que se evalúa en la condición y el ciclo puede terminar.</p>
              </div>
            </div>
          `
        }
      ];
      return wrapBeat(beats, step);
    },
    steps: 3
  },
  {
    title: "Pseudocódigo: sintaxis base",
    short: "Sintaxis",
    render(step) {
      const active = Math.min(step, 4);
      const lines = [
        `<span class="var">contador</span> = valor_inicial`,
        `<span class="kw">Mientras</span> contador &lt; limite:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;instrucciones`,
        `&nbsp;&nbsp;&nbsp;&nbsp;contador = contador + paso`
      ];

      return `
        <div class="slide-kicker">02 · Sintaxis</div>
        <h2 class="slide-title">La anatomía de un <span class="highlight">while</span></h2>
        <p class="slide-subtitle">Presenta primero el molde. Después revela qué papel cumple cada línea.</p>
        <div class="grid-2">
          <div class="code-wrap">
            <div class="micro-tag" style="margin-bottom:10px">PSEUDOCÓDIGO</div>
            <div class="code">${lines.map((l,i)=>`<span class="code-line ${i===active-1?'active':''} ${active>0 && i>active-1?'dim':''}">${l}</span>`).join('')}</div>
          </div>
          <div class="trace-panel">
            ${active===0 ? `<div class="card accent-card fade-in"><h3>Molde completo</h3><p>Antes de resolver ejercicios, el alumno debe reconocer estas cuatro piezas.</p></div>` : ''}
            ${active>=1 ? `<div class="card fade-in"><h3>1. Inicialización del contador</h3><p>El contador empieza con un valor conocido.</p></div>` : ''}
            ${active>=2 ? `<div class="card accent-card fade-in"><h3>2. Condición relacionada con el contador</h3><p>La condición usa el contador: por ejemplo, <code>contador &lt; limite</code>. Se evalúa antes de cada repetición.</p></div>` : ''}
            ${active>=3 ? `<div class="card fade-in"><h3>3. Cuerpo</h3><p>Aquí ocurre el trabajo repetitivo: leer, contar, sumar, comparar, etc.</p></div>` : ''}
            ${active>=4 ? `<div class="card good-card fade-in"><h3>4. Actualización del contador</h3><p>El contador cambia dentro del ciclo. Ese nuevo valor será usado cuando la condición vuelva a evaluarse.</p></div>` : ''}
          </div>
        </div>
        <div class="pill-row">
          <span class="pill"><strong>Relación principal:</strong> contador → condición → actualización → condición</span>
          <span class="pill"><strong>Contador:</strong> contador += 1</span>
          <span class="pill"><strong>Acumulador:</strong> total += valor</span>
          <span class="pill"><strong>Otros casos:</strong> el while también puede usar centinelas como FIN o SALIR</span>
        </div>
      `;
    },
    steps: 5
  },
  {
    title: "Ejercicio 1 · Productos hasta FIN",
    short: "Centinela textual · línea por línea",
    render(step) {
      const trace = buildProductTrace();
      const t = trace[Math.min(step, trace.length - 1)];
      const code = [
        `cantidad = 0`,
        `codigo = input(<span class="str">"Código: "</span>)`,
        `<span class="kw">while</span> codigo != <span class="str">"FIN"</span>:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;nombre = input(<span class="str">"Nombre: "</span>)`,
        `&nbsp;&nbsp;&nbsp;&nbsp;cantidad = cantidad + 1`,
        `&nbsp;&nbsp;&nbsp;&nbsp;ultimoCodigo = codigo`,
        `&nbsp;&nbsp;&nbsp;&nbsp;ultimoNombre = nombre`,
        `&nbsp;&nbsp;&nbsp;&nbsp;codigo = input(<span class="str">"Código: "</span>)`,
        `print(cantidad, ultimoCodigo, ultimoNombre)`
      ];
      return `
        <div class="slide-kicker">03 · Ejercicio 1 · Ejecución línea por línea</div>
        <h2 class="slide-title">Productos hasta que el código sea <span class="highlight">FIN</span></h2>
        <div class="logic-board compact-exercise">
          <div>
            <div class="micro-tag" style="margin-bottom:8px">CÓDIGO PYTHON · LÍNEA ACTUAL</div>
            <div class="code">${code.map((l,i)=>`<span class="code-line ${i===t.line?'active':''}">${l}</span>`).join('')}</div>
            <div class="step-callout"><strong>${t.phase}</strong><span>${t.msg}</span></div>
          </div>
          <div class="trace-panel">
            <div class="condition-box"><span class="condition-expression">${t.test}</span>${t.bool===null?'<span class="bool-pill">—</span>':`<span class="bool-pill ${t.bool?'bool-true':'bool-false'}">${t.bool?'VERDADERO':'FALSO'}</span>`}</div>
            <div class="var-grid">
              ${varBox('codigo', t.codigo)} ${varBox('nombre', t.nombre)} ${varBox('cantidad', t.cantidad)} ${varBox('ultimoCodigo', t.ultimoCodigo)} ${varBox('ultimoNombre', t.ultimoNombre)}
            </div>
            <div class="console">${renderTraceConsole(t.console)}</div>
          </div>
        </div>`;
    },
    steps: buildProductTrace().length
  },
  {
    title: "Ejercicio 2 · Temperaturas hasta > 90°C",
    short: "Límite numérico · línea por línea",
    render(step) {
      const trace = buildTemperatureTrace();
      const s = trace[Math.min(step, trace.length - 1)];
      const code = [
        `suma = 0; contador = 0`,
        `temperatura = float(input(<span class="str">"Temperatura: "</span>))`,
        `<span class="kw">while</span> temperatura &lt;= 90:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;suma = suma + temperatura`,
        `&nbsp;&nbsp;&nbsp;&nbsp;contador = contador + 1`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> contador == 1 <span class="kw">or</span> temperatura &gt; maximo:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maximo = temperatura`,
        `&nbsp;&nbsp;&nbsp;&nbsp;temperatura = float(input(<span class="str">"Temperatura: "</span>))`,
        `print(<span class="str">"Alerta: se excedió la temperatura límite"</span>)`,
        `promedio = suma / contador`,
        `print(<span class="str">"Temperatura máxima:"</span>, maximo)`,
        `print(<span class="str">"Temperatura promedio:"</span>, promedio)`
      ];
      return `
        <div class="slide-kicker">04 · Ejercicio 2 · Ejecución línea por línea</div>
        <h2 class="slide-title">La temperatura de corte <span class="danger">no se procesa</span></h2>
        <div class="logic-board compact-exercise">
          <div>
            <div class="micro-tag" style="margin-bottom:8px">CÓDIGO PYTHON · LÍNEA ACTUAL</div>
            <div class="code">${code.map((l,i)=>`<span class="code-line ${i===s.line?'active':''}">${l}</span>`).join('')}</div>
            <div class="step-callout"><strong>${s.phase}</strong><span>${s.msg}</span></div>
          </div>
          <div class="trace-panel">
            <div class="condition-box"><span class="condition-expression">${s.test}</span>${s.bool===null?'<span class="bool-pill">—</span>':`<span class="bool-pill ${s.bool?'bool-true':'bool-false'}">${s.bool?'VERDADERO':'FALSO'}</span>`}</div>
            <div class="var-grid">${varBox('temperatura',s.temp)} ${varBox('máximo',s.max)} ${varBox('suma',s.suma)} ${varBox('contador',s.cont)} ${varBox('promedio',s.prom)}</div>
            <div class="console">${renderTraceConsole(s.console)}</div>
          </div>
        </div>`;
    },
    steps: buildTemperatureTrace().length
  },
  {
    title: "Ejercicio 4 · Validación dentro de un while",
    short: "Validación · línea por línea",
    render(step) {
      const trace = buildWorkerTrace();
      const s = trace[Math.min(step, trace.length - 1)];
      const code = [
        `cantidad = 0; totalHoras = 0`,
        `nombre = input(<span class="str">"Trabajador: "</span>)`,
        `<span class="kw">while</span> nombre != <span class="str">"FIN"</span>:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;horas = int(input(<span class="str">"Horas: "</span>))`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">while</span> horas &lt; 6 <span class="kw">or</span> horas &gt; 12:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="str">"Hora incorrecta"</span>)`,
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;horas = int(input(<span class="str">"Horas: "</span>))`,
        `&nbsp;&nbsp;&nbsp;&nbsp;cantidad = cantidad + 1`,
        `&nbsp;&nbsp;&nbsp;&nbsp;totalHoras = totalHoras + horas`,
        `&nbsp;&nbsp;&nbsp;&nbsp;nombre = input(<span class="str">"Trabajador: "</span>)`,
        `print(<span class="str">"Cantidad de trabajadores:"</span>, cantidad)`,
        `print(<span class="str">"Total de horas:"</span>, totalHoras)`
      ];
      return `
        <div class="slide-kicker">05 · Ejercicio 4 · Ejecución línea por línea</div>
        <h2 class="slide-title">Un while recorre trabajadores y otro <span class="highlight">valida las horas</span></h2>
        <div class="logic-board compact-exercise">
          <div>
            <div class="micro-tag" style="margin-bottom:8px">CÓDIGO PYTHON · LÍNEA ACTUAL</div>
            <div class="code">${code.map((l,i)=>`<span class="code-line ${i===s.line?'active':''}">${l}</span>`).join('')}</div>
            <div class="step-callout"><strong>${s.phase}</strong><span>${s.msg}</span></div>
          </div>
          <div class="trace-panel">
            <div class="condition-box"><span class="condition-expression">${s.test}</span>${s.bool===null?'<span class="bool-pill">—</span>':`<span class="bool-pill ${s.bool?'bool-true':'bool-false'}">${s.bool?'VERDADERO':'FALSO'}</span>`}</div>
            <div class="var-grid">${varBox('trabajador',s.worker)} ${varBox('horas',s.hrs)} ${varBox('cantidad',s.count)} ${varBox('totalHoras',s.total)}</div>
            <div class="console">${renderTraceConsole(s.console)}</div>
          </div>
        </div>`;
    },
    steps: buildWorkerTrace().length
  },
  {
    title: "Ejercicio 8 · Hasta 5 aprobados",
    short: "Contador como condición · línea por línea",
    render(step) {
      const trace = buildInspectionTrace();
      const s = trace[Math.min(step, trace.length - 1)];
      const code = [
        `aprobados = 0`,
        `rechazados = 0`,
        `<span class="kw">while</span> aprobados &lt; 5:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;estado = input(<span class="str">"Estado (A/R): "</span>)`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> estado == <span class="str">"A"</span>:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aprobados += 1`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">else</span>:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rechazados += 1`,
        `porcentaje = aprobados / (aprobados + rechazados) * 100`,
        `print(<span class="str">"Aprobados:"</span>, aprobados)`,
        `print(<span class="str">"Rechazados:"</span>, rechazados)`,
        `print(<span class="str">"% Aprobados:"</span>, porcentaje)`
      ];
      return `
        <div class="slide-kicker">06 · Ejercicio 8 · Ejecución línea por línea</div>
        <h2 class="slide-title">La condición depende directamente del <span class="highlight">contador aprobados</span></h2>
        <div class="logic-board compact-exercise">
          <div>
            <div class="micro-tag" style="margin-bottom:8px">CÓDIGO PYTHON · LÍNEA ACTUAL</div>
            <div class="code">${code.map((l,i)=>`<span class="code-line ${i===s.line?'active':''}">${l}</span>`).join('')}</div>
            <div class="step-callout"><strong>${s.phase}</strong><span>${s.msg}</span></div>
          </div>
          <div class="trace-panel">
            <div class="condition-box"><span class="condition-expression">${s.test}</span>${s.bool===null?'<span class="bool-pill">—</span>':`<span class="bool-pill ${s.bool?'bool-true':'bool-false'}">${s.bool?'VERDADERO':'FALSO'}</span>`}</div>
            <div class="var-grid">${varBox('estado',s.estado)} ${varBox('aprobados',s.approved)} ${varBox('rechazados',s.rejected)} ${varBox('total',s.total)} ${varBox('% aprobados',s.pct)}</div>
            <div class="console">${renderTraceConsole(s.console)}</div>
          </div>
        </div>`;
    },
    steps: buildInspectionTrace().length
  },
  {
    title: "Mini laboratorio · Tú controlas el while",
    short: "Simulador",
    render(step) {
      return `
        <div class="slide-kicker">07 · Mini laboratorio</div>
        <h2 class="slide-title">Ahora el alumno <span class="highlight">maneja el contador</span></h2>
        <p class="slide-subtitle">Usa los botones para modificar <code>contador</code> y observa cómo cambia directamente el resultado de la condición del while.</p>
        <div class="grid-2">
          <div class="card accent-card">
            <h3>Condición</h3>
            <div class="big-equation"><span id="labContador">1</span> &lt; 5</div>
            <div id="labBool" class="micro-tag" style="margin-top:16px">VERDADERO</div>
            <div class="pill-row">
              <button class="secondary-btn" onclick="labChange(-1)">contador - 1</button>
              <button class="primary-btn" onclick="labChange(1)">contador + 1</button>
              <button class="secondary-btn" onclick="labReset()">Reiniciar</button>
            </div>
          </div>
          <div>
            <div class="micro-tag" style="margin-bottom:10px">CÓDIGO PYTHON</div>
            <div class="code">
              <span class="code-line"><span class="var">contador</span> = <span class="num">1</span></span>
              <span id="labWhile" class="code-line active"><span class="kw">while</span> contador &lt; 5:</span>
              <span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;mostrar(contador)</span>
              <span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;contador = contador + 1</span>
            </div>
            <div class="step-callout"><strong>Uso sugerido en clase</strong><span>Pregúntales “¿qué pasa con la condición si contador vale 5?”, “¿y si vale 10?”, “¿y si vale -3?”. Luego deja que lo prueben.</span></div>
          </div>
        </div>
      `;
    },
    steps: 1
  },
  {
    title: "Cierre · Cómo pensar cualquier while",
    short: "Checklist mental",
    render(step) {
      const items = [
        ['1','¿Cuál es el contador que usaré en este while?'],
        ['2','¿Cómo aparece ese contador dentro de la condición?'],
        ['3','¿Qué trabajo se repite?'],
        ['4','¿Cómo se actualiza el contador en cada vuelta?'],
        ['5','¿El dato que termina el ciclo se procesa o no?'],
        ['6','¿Necesito contador, acumulador, máximo o mínimo?']
      ];
      const reveal = Math.min(step+1, items.length);
      return `
        <div class="slide-kicker">08 · Cierre</div>
        <h2 class="slide-title">Antes de programar, responde estas <span class="highlight">6 preguntas</span></h2>
        <div class="grid-3">
          ${items.slice(0,reveal).map(([n,txt],i)=>`<div class="card ${i===reveal-1?'accent-card fade-in':''}"><h3>${n}</h3><p>${txt}</p></div>`).join('')}
        </div>
        ${reveal===items.length?`<div class="step-callout"><strong>Regla final</strong><span>En un while basado en contador, la condición lee el contador y el cuerpo lo actualiza. Esa relación es la que permite que el ciclo avance y finalmente termine.</span></div>`:''}
      `;
    },
    steps: 6
  }
];

let currentSlide = 0;
let currentStep = 0;
let labContador = 1;

const slideEl = document.getElementById('slide');
const slideNav = document.getElementById('slideNav');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const btnPrevSlide = document.getElementById('btnPrevSlide');
const btnNextSlide = document.getElementById('btnNextSlide');
const btnPrevStep = document.getElementById('btnPrevStep');
const btnNextStep = document.getElementById('btnNextStep');
const helpDialog = document.getElementById('helpDialog');

function wrapBeat(beats, step) {
  return beats[Math.min(step, beats.length - 1)].body;
}

function varBox(name, value) {
  return `<div class="var-box"><div class="var-name">${name}</div><div class="var-value">${value}</div></div>`;
}

function productConsole(step) {
  const lines = [];
  if (step >= 1) lines.push(['input','Ingrese código de producto 1: VAL123']);
  if (step >= 2) lines.push(['input','Ingrese nombre del producto 1: Válvula Neumática']);
  if (step >= 3) { lines.push(['input','Ingrese código de producto 2: FTR456']); lines.push(['input','Ingrese nombre del producto 2: Filtro Hidráulico']); }
  if (step >= 4) { lines.push(['input','Ingrese código de producto 3: BMB321']); lines.push(['input','Ingrese nombre del producto 3: Bomba Centrífuga']); }
  if (step >= 5) lines.push(['input','Ingrese código de producto 4: FIN']);
  if (step >= 6) { lines.push(['output','Total de productos: 3']); lines.push(['output','Código: BMB321']); lines.push(['output','Nombre: Bomba Centrífuga']); }
  if (!lines.length) lines.push(['muted','La consola aparecerá conforme avancemos.']);
  return lines.map(([c,t])=>`<div class="console-line ${c}">${t}</div>`).join('');
}

function temperatureConsole(step) {
  const temps = [75,78,76,81,89,95];
  const lines = [];
  for (let i=0; i<Math.min(step, temps.length); i++) lines.push(['input',`Temperatura ${i+1}: ${temps[i]} °C`]);
  if (step >= 7) { lines.push(['alert','Alerta: se excedió la temperatura límite']); lines.push(['output','Temperatura máxima: 89']); lines.push(['output','Temperatura promedio: 79.8']); }
  if (!lines.length) lines.push(['muted','Preparando variables...']);
  return lines.map(([c,t])=>`<div class="console-line ${c}">${t}</div>`).join('');
}

function workerConsole(step) {
  const states = [
    [],
    [['input','Trabajador 1: Juan'],['input','Horas: 5'],['alert','Hora incorrecta, ingrésela nuevamente.']],
    [['input','Trabajador 1: Juan'],['input','Horas: 7']],
    [['input','Trabajador 2: Ana'],['input','Horas: 8']],
    [['input','Trabajador 3: Luis'],['input','Horas: 13'],['alert','Hora incorrecta, ingrésela nuevamente.']],
    [['input','Trabajador 3: Luis'],['input','Horas: 9']],
    [['input','Trabajador 4: FIN'],['output','Cantidad de trabajadores: 3'],['output','Total de horas: 24']]
  ];
  const all=[];
  for(let i=1;i<=step;i++) all.push(...states[i]);
  if(!all.length) all.push(['muted','Observa dos niveles de repetición.']);
  return all.map(([c,t])=>`<div class="console-line ${c}">${t}</div>`).join('');
}

function inspectionConsole(step, seq) {
  const shown = seq.slice(0, Math.min(step, seq.length));
  const lines = shown.map((x,i)=>['input',`Producto ${i+1}: ${x}`]);
  if (step >= seq.length) {
    lines.push(['output','Aprobados: 5']);
    lines.push(['output','Rechazados: 2']);
    lines.push(['output','% Aprobados: 71.42']);
  }
  if (!lines.length) lines.push(['muted','Empieza con aprobados = 0.']);
  return lines.map(([c,t])=>`<div class="console-line ${c}">${t}</div>`).join('');
}

function buildNav() {
  slideNav.innerHTML = slides.map((s,i)=>`
    <button class="nav-item ${i===currentSlide?'active':''}" onclick="goSlide(${i})">
      <span class="nav-number">${i+1}</span>
      <span class="nav-copy"><strong>${s.title}</strong><span>${s.short}</span></span>
    </button>
  `).join('');
}

function render() {
  const s = slides[currentSlide];
  const maxStep = Math.max(1, s.steps);
  currentStep = Math.max(0, Math.min(currentStep, maxStep-1));
  slideEl.innerHTML = `<div class="micro-tag">Slide ${currentSlide+1} · Micro-paso ${currentStep+1}/${maxStep}</div>${s.render(currentStep)}`;
  const ratio = ((currentStep+1)/maxStep)*100;
  progressBar.style.width = `${ratio}%`;
  progressText.textContent = `Slide ${currentSlide+1} de ${slides.length} · Paso ${currentStep+1} de ${maxStep}`;
  buildNav();
  btnPrevStep.disabled = currentStep === 0;
  btnNextStep.textContent = currentStep === maxStep-1 ? 'Slide siguiente →' : 'Siguiente paso →';
  btnPrevSlide.disabled = currentSlide === 0;
  btnNextSlide.disabled = currentSlide === slides.length-1;
  if (slides[currentSlide].short === 'Simulador') updateLabUI();
}

function nextStep() {
  const s = slides[currentSlide];
  if (currentStep < s.steps - 1) currentStep++;
  else if (currentSlide < slides.length - 1) { currentSlide++; currentStep = 0; }
  render();
}
function prevStep() {
  if (currentStep > 0) currentStep--;
  else if (currentSlide > 0) { currentSlide--; currentStep = slides[currentSlide].steps - 1; }
  render();
}
function nextSlide() { if (currentSlide < slides.length - 1) { currentSlide++; currentStep = 0; render(); } }
function prevSlide() { if (currentSlide > 0) { currentSlide--; currentStep = 0; render(); } }
function goSlide(i) { currentSlide = i; currentStep = 0; render(); }
function restartSlide() { currentStep = 0; if (slides[currentSlide].short === 'Simulador') labContador = 1; render(); }

btnNextStep.addEventListener('click', nextStep);
btnPrevStep.addEventListener('click', prevStep);
btnNextSlide.addEventListener('click', nextSlide);
btnPrevSlide.addEventListener('click', prevSlide);
document.getElementById('btnHelp').addEventListener('click', ()=>helpDialog.showModal());
document.getElementById('btnCloseHelp').addEventListener('click', ()=>helpDialog.close());
document.getElementById('btnFullscreen').addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}

window.labChange = function(delta) { labContador += delta; updateLabUI(); };
window.labReset = function() { labContador = 1; updateLabUI(); };
function updateLabUI() {
  const contador = document.getElementById('labContador');
  const b = document.getElementById('labBool');
  const w = document.getElementById('labWhile');
  if (!contador || !b || !w) return;
  contador.textContent = labContador;
  const ok = labContador < 5;
  b.textContent = ok ? 'VERDADERO · puede entrar' : 'FALSO · se detiene';
  b.style.borderColor = ok ? 'rgba(70,209,143,.5)' : 'rgba(255,107,107,.5)';
  b.style.background = ok ? 'rgba(70,209,143,.12)' : 'rgba(255,107,107,.12)';
  b.style.color = ok ? '#bff6d8' : '#ffd0d0';
  w.classList.toggle('active', ok);
}

document.addEventListener('keydown', (e)=>{
  if (helpDialog.open && e.key !== 'Escape') return;
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextStep(); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prevStep(); }
  else if (e.key === 'ArrowDown') { e.preventDefault(); nextSlide(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); prevSlide(); }
  else if (e.key.toLowerCase() === 'f') toggleFullscreen();
  else if (e.key.toLowerCase() === 'r') restartSlide();
});

render();
