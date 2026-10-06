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
    short: "Centinela textual",
    render(step) {
      const traces = [
        {codigo:'—', nombre:'—', cantidad:0, ultimoCodigo:'—', ultimoNombre:'—', cond:'?', bool:null, active:0, msg:'Primero necesitamos un dato que pueda detener el ciclo.'},
        {codigo:'VAL123', nombre:'—', cantidad:0, ultimoCodigo:'—', ultimoNombre:'—', cond:'VAL123 != FIN', bool:true, active:1, msg:'Leemos el código ANTES del while. Como no es FIN, entramos.'},
        {codigo:'VAL123', nombre:'Válvula Neumática', cantidad:1, ultimoCodigo:'VAL123', ultimoNombre:'Válvula Neumática', cond:'VAL123 != FIN', bool:true, active:3, msg:'Procesamos el producto: pedimos nombre, contamos y lo guardamos como “último”.'},
        {codigo:'FTR456', nombre:'Filtro Hidráulico', cantidad:2, ultimoCodigo:'FTR456', ultimoNombre:'Filtro Hidráulico', cond:'FTR456 != FIN', bool:true, active:4, msg:'Al final del ciclo se lee el siguiente código. La condición se vuelve a evaluar.'},
        {codigo:'BMB321', nombre:'Bomba Centrífuga', cantidad:3, ultimoCodigo:'BMB321', ultimoNombre:'Bomba Centrífuga', cond:'BMB321 != FIN', bool:true, active:4, msg:'Tercera repetición: cantidad llega a 3 y se actualiza el último producto.'},
        {codigo:'FIN', nombre:'—', cantidad:3, ultimoCodigo:'BMB321', ultimoNombre:'Bomba Centrífuga', cond:'FIN != FIN', bool:false, active:1, msg:'FIN NO se procesa como producto. Solo hace falsa la condición.'},
        {codigo:'FIN', nombre:'—', cantidad:3, ultimoCodigo:'BMB321', ultimoNombre:'Bomba Centrífuga', cond:'FIN != FIN', bool:false, active:5, msg:'El ciclo termina y mostramos el resumen.'}
      ];
      const t = traces[Math.min(step, traces.length-1)];
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
      const lineMap = [1,1,2,4,7,2,8];
      return `
        <div class="slide-kicker">03 · Ejercicio 1 · Centinela textual</div>
        <h2 class="slide-title">Productos hasta que el código sea <span class="highlight">FIN</span></h2>
        <div class="logic-board">
          <div>
            <div class="micro-tag" style="margin-bottom:10px">CÓDIGO PYTHON</div>
            <div class="code">${code.map((l,i)=>`<span class="code-line ${i===lineMap[Math.min(step,lineMap.length-1)]?'active':''}">${l}</span>`).join('')}</div>
            <div class="step-callout"><strong>Paso ${step+1}</strong><span>${t.msg}</span></div>
          </div>
          <div class="trace-panel">
            <div class="condition-box"><span class="condition-expression">${t.cond}</span>${t.bool===null?'<span class="bool-pill">AÚN NO</span>':`<span class="bool-pill ${t.bool?'bool-true':'bool-false'}">${t.bool?'VERDADERO':'FALSO'}</span>`}</div>
            <div class="var-grid">
              ${varBox('codigo', t.codigo)}
              ${varBox('nombre', t.nombre)}
              ${varBox('cantidad', t.cantidad)}
              ${varBox('ultimoCodigo', t.ultimoCodigo)}
              ${varBox('ultimoNombre', t.ultimoNombre)}
            </div>
            <div class="console">${productConsole(step)}</div>
          </div>
        </div>
      `;
    },
    steps: 7
  },
  {
    title: "Ejercicio 2 · Temperaturas hasta > 90°C",
    short: "Dato de corte no se procesa",
    render(step) {
      const states = [
        {temp:'—', max:'—', suma:0, cont:0, prom:'—', bool:null, note:'Antes de leer temperaturas, necesitamos preparar contador, suma y máximo.'},
        {temp:75, max:75, suma:75, cont:1, prom:'—', bool:true, note:'75 ≤ 90, así que esta temperatura SÍ cuenta.'},
        {temp:78, max:78, suma:153, cont:2, prom:'—', bool:true, note:'78 supera al máximo anterior (75), por eso máximo = 78.'},
        {temp:76, max:78, suma:229, cont:3, prom:'—', bool:true, note:'76 se suma, pero no cambia el máximo.'},
        {temp:81, max:81, suma:310, cont:4, prom:'—', bool:true, note:'81 se vuelve el nuevo máximo.'},
        {temp:89, max:89, suma:399, cont:5, prom:'—', bool:true, note:'Hasta aquí todo sigue siendo válido.'},
        {temp:95, max:89, suma:399, cont:5, prom:'—', bool:false, note:'95 provoca la alerta. NO se suma, NO aumenta el contador, NO cambia el máximo.'},
        {temp:95, max:89, suma:399, cont:5, prom:'79.8', bool:false, note:'Al salir: promedio = 399 / 5 = 79.8.'}
      ];
      const s = states[Math.min(step, states.length-1)];
      const code = [
        `suma = 0; contador = 0`,
        `temperatura = float(input(<span class="str">"Temperatura: "</span>))`,
        `<span class="kw">while</span> temperatura &lt;= 90:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;suma = suma + temperatura`,
        `&nbsp;&nbsp;&nbsp;&nbsp;contador = contador + 1`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> contador == 1 <span class="kw">or</span> temperatura &gt; maximo:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maximo = temperatura`,
        `&nbsp;&nbsp;&nbsp;&nbsp;temperatura = float(input(<span class="str">"Temperatura: "</span>))`,
        `promedio = suma / contador`
      ];
      const activeLines = [0,3,5,3,5,5,2,8];
      return `
        <div class="slide-kicker">04 · Ejercicio 2 · Límite numérico</div>
        <h2 class="slide-title">La temperatura que rompe la condición <span class="danger">no entra al cálculo</span></h2>
        <div class="logic-board">
          <div>
            <div class="micro-tag" style="margin-bottom:10px">CÓDIGO PYTHON</div>
            <div class="code">${code.map((l,i)=>`<span class="code-line ${i===activeLines[Math.min(step,activeLines.length-1)]?'active':''}">${l}</span>`).join('')}</div>
            <div class="step-callout"><strong>Clave del ejercicio</strong><span>${s.note}</span></div>
          </div>
          <div class="trace-panel">
            <div class="condition-box"><span class="condition-expression">${s.temp==='—'?'temperatura <= 90':`${s.temp} <= 90`}</span>${s.bool===null?'<span class="bool-pill">AÚN NO</span>':`<span class="bool-pill ${s.bool?'bool-true':'bool-false'}">${s.bool?'VERDADERO':'FALSO'}</span>`}</div>
            <div class="var-grid">
              ${varBox('temperatura', s.temp)}
              ${varBox('máximo', s.max)}
              ${varBox('suma', s.suma)}
              ${varBox('contador', s.cont)}
              ${varBox('promedio', s.prom)}
            </div>
            <div class="console">${temperatureConsole(step)}</div>
          </div>
        </div>
      `;
    },
    steps: 8
  },
  {
    title: "Ejercicio 4 · Validación dentro de un while",
    short: "Dos niveles de repetición",
    render(step) {
      const states = [
        {worker:'—', hrs:'—', count:0,total:0,outer:'?',inner:'?', note:'Hay un ciclo grande para trabajadores y una validación para horas.'},
        {worker:'Juan', hrs:5, count:0,total:0,outer:'Juan != FIN',inner:'5 está entre 6 y 12', note:'Juan no termina el proceso, pero 5 horas es inválido.'},
        {worker:'Juan', hrs:7, count:1,total:7,outer:'Juan != FIN',inner:'7 está entre 6 y 12', note:'Cuando la hora es válida, recién contamos al trabajador y sumamos sus horas.'},
        {worker:'Ana', hrs:8, count:2,total:15,outer:'Ana != FIN',inner:'8 está entre 6 y 12', note:'Ana entra directamente: 8 es válido.'},
        {worker:'Luis', hrs:13, count:2,total:15,outer:'Luis != FIN',inner:'13 está entre 6 y 12', note:'13 es inválido: todavía no contamos a Luis.'},
        {worker:'Luis', hrs:9, count:3,total:24,outer:'Luis != FIN',inner:'9 está entre 6 y 12', note:'Con 9 horas, Luis pasa la validación.'},
        {worker:'FIN', hrs:'—', count:3,total:24,outer:'FIN != FIN',inner:'—', note:'FIN corta el ciclo externo. Resultado: 3 trabajadores y 24 horas.'}
      ];
      const s = states[Math.min(step,states.length-1)];
      const innerOk = typeof s.hrs === 'number' ? s.hrs>=6 && s.hrs<=12 : null;
      const outerOk = s.worker !== '—' ? s.worker !== 'FIN' : null;
      return `
        <div class="slide-kicker">05 · Ejercicio 4 · Validación</div>
        <h2 class="slide-title">Un <span class="highlight">while</span> puede controlar el proceso y otro validar el dato</h2>
        <div class="grid-2">
          <div>
            <div class="micro-tag" style="margin-bottom:10px">CÓDIGO PYTHON</div>
            <div class="code">
              <span class="code-line">nombre = input(<span class="str">"Trabajador: "</span>)</span>
              <span class="code-line ${step===6?'active':''}"><span class="kw">while</span> nombre != <span class="str">"FIN"</span>:</span>
              <span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;horas = int(input(<span class="str">"Horas: "</span>))</span>
              <span class="code-line ${step===1||step===4?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">while</span> horas &lt; 6 <span class="kw">or</span> horas &gt; 12:</span>
              <span class="code-line ${step===1||step===4?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(<span class="str">"Hora incorrecta"</span>)</span>
              <span class="code-line ${step===1||step===4?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;horas = int(input(<span class="str">"Horas: "</span>))</span>
              <span class="code-line ${step===2||step===3||step===5?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;cantidad = cantidad + 1</span>
              <span class="code-line ${step===2||step===3||step===5?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;totalHoras = totalHoras + horas</span>
              <span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;nombre = input(<span class="str">"Trabajador: "</span>)</span>
            </div>
            <div class="step-callout"><strong>Lectura pedagógica</strong><span>${s.note}</span></div>
          </div>
          <div class="trace-panel">
            <div class="condition-box"><span class="condition-expression">${s.outer}</span>${outerOk===null?'<span class="bool-pill">—</span>':`<span class="bool-pill ${outerOk?'bool-true':'bool-false'}">${outerOk?'VERDADERO':'FALSO'}</span>`}</div>
            <div class="condition-box"><span class="condition-expression">${s.inner}</span>${innerOk===null?'<span class="bool-pill">—</span>':`<span class="bool-pill ${innerOk?'bool-true':'bool-false'}">${innerOk?'VÁLIDO':'INVÁLIDO'}</span>`}</div>
            <div class="var-grid">
              ${varBox('trabajador', s.worker)}
              ${varBox('horas', s.hrs)}
              ${varBox('cantidad', s.count)}
              ${varBox('totalHoras', s.total)}
            </div>
            <div class="console">${workerConsole(step)}</div>
          </div>
        </div>
      `;
    },
    steps: 7
  },
  {
    title: "Ejercicio 8 · Hasta 5 aprobados",
    short: "Contador como condición",
    render(step) {
      const seq = ['R','A','R','A','A','A','A'];
      const shown = seq.slice(0, Math.min(step, seq.length));
      const approved = shown.filter(x=>x==='A').length;
      const rejected = shown.filter(x=>x==='R').length;
      const total = shown.length;
      const pct = total ? ((approved/total)*100).toFixed(2) : '—';
      const done = approved >= 5;
      return `
        <div class="slide-kicker">06 · Ejercicio 8 · Condición por contador</div>
        <h2 class="slide-title">El ciclo termina cuando <span class="highlight">aprobados llega a 5</span>, no cuando total llega a 5</h2>
        <div class="logic-board">
          <div>
            <div class="micro-tag" style="margin-bottom:10px">CÓDIGO PYTHON</div>
            <div class="code">
              <span class="code-line">aprobados = 0; rechazados = 0</span>
              <span class="code-line ${!done?'active':''}"><span class="kw">while</span> aprobados &lt; 5:</span>
              <span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;estado = input(<span class="str">"Estado (A/R): "</span>)</span>
              <span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> estado == <span class="str">"A"</span>:</span>
              <span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aprobados += 1</span>
              <span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">else</span>:</span>
              <span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rechazados += 1</span>
              <span class="code-line ${done?'active':''}">porcentaje = aprobados / (aprobados + rechazados) * 100</span>
            </div>
            <div class="pill-row">${seq.map((x,i)=>`<span class="pill ${i<shown.length?'':'muted'}"><strong>${i+1}:</strong> ${i<shown.length?x:'?'}</span>`).join('')}</div>
            <div class="step-callout"><strong>${done?'Condición alcanzada':'Todavía seguimos'}</strong><span>${done?'El contador aprobados llegó a 5 ⇒ la condición aprobados < 5 se vuelve falsa y el while termina.':'aprobados funciona como contador: aparece en la condición y aumenta dentro del ciclo.'}</span></div>
          </div>
          <div class="trace-panel">
            <div class="condition-box"><span class="condition-expression">${approved} &lt; 5</span><span class="bool-pill ${done?'bool-false':'bool-true'}">${done?'FALSO':'VERDADERO'}</span></div>
            <div class="var-grid">
              ${varBox('aprobados', approved)}
              ${varBox('rechazados', rejected)}
              ${varBox('total', total)}
              ${varBox('% aprobados', pct)}
            </div>
            <div class="console">${inspectionConsole(step, seq)}</div>
          </div>
        </div>
      `;
    },
    steps: 8
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
