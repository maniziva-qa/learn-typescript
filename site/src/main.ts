import './style.css';
import { topics } from './content';
import {
  getProgress,
  markTheoryRead,
  saveQuizScore,
  togglePracticeComplete,
  topicScore,
} from './storage';
import type { Topic, TabId } from './types';

// ── State ──────────────────────────────────────────────────────────────────
type View = { kind: 'home' } | { kind: 'topic'; id: string; tab: TabId };

let view: View = { kind: 'home' };

// Quiz state (per session, not persisted)
let quizIndex = 0;
let quizAnswered: (number | null)[] = [];

function go(v: View): void {
  if (v.kind === 'topic') {
    quizIndex = 0;
    quizAnswered = new Array(topics.find(t => t.id === v.id)!.quiz.length).fill(null);
  }
  view = v;
  render();
}

// ── Syntax highlighter (single-pass tokenizer — no cascading replacement) ─
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const KW = 'const|let|var|function|return|type|interface|class|extends|implements|new|this|super|abstract|static|public|private|protected|readonly|async|await|import|export|default|from|if|else|for|while|switch|case|break|throw|try|catch|typeof|instanceof|in|of|true|false|null|undefined|void|never|enum|override|as';
const TY = 'string|number|boolean|any|unknown|bigint|symbol|object|Promise|Array|Map|Set|Record|Partial|Required|Pick|Omit|ReturnType|Awaited|keyof';

// Single combined regex — groups in order of priority
const TOKEN = new RegExp(
  [
    '(\\/\\/[^\\n]*)',             // 1 line comment
    '(\\/\\*[\\s\\S]*?\\*\\/)',    // 2 block comment
    '(`(?:[^`\\\\]|\\\\.)*`)',     // 3 template literal
    '("(?:[^"\\\\]|\\\\.)*")',     // 4 double-quoted string
    "('(?:[^'\\\\]|\\\\.)*')",     // 5 single-quoted string
    `\\b(${KW})\\b`,               // 6 keywords
    `\\b(${TY})\\b`,               // 7 built-in type names
    '\\b([A-Z][A-Za-z0-9]*)\\b',   // 8 PascalCase (user-defined types)
    '\\b(\\d+n?)\\b',              // 9 numbers
  ].join('|'),
  'g'
);

function highlight(code: string): string {
  let result = '';
  let last = 0;
  for (const m of code.matchAll(TOKEN)) {
    result += esc(code.slice(last, m.index));
    const [full, cmt1, cmt2, tmpl, dstr, sstr, kw, ty, pascal, num] = m;
    if      (cmt1 || cmt2)         result += `<span class="cmt">${esc(full)}</span>`;
    else if (tmpl || dstr || sstr) result += `<span class="str">${esc(full)}</span>`;
    else if (kw)                   result += `<span class="kw">${esc(full)}</span>`;
    else if (ty || pascal)         result += `<span class="ty">${esc(full)}</span>`;
    else if (num)                  result += `<span class="num">${esc(full)}</span>`;
    last = m.index! + full.length;
  }
  result += esc(code.slice(last));
  return result;
}

function codeBlock(code: string): string {
  return `<pre><code>${highlight(code)}</code></pre>`;
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function renderSidebar(): string {
  const p = getProgress();
  const activeId = view.kind === 'topic' ? view.id : null;

  const topicItems = topics.map(t => {
    const theory  = p.theoryRead.includes(t.id);
    const quiz    = (p.quizBestScore[t.id] ?? 0) > 0;
    const practice = p.practiceComplete.includes(t.id);
    return `
      <button class="topic-btn ${activeId === t.id ? 'active' : ''}" data-topic="${t.id}">
        <span class="icon">${t.icon}</span>
        <span class="label">${t.title}</span>
        <span class="dots">
          <span class="dot ${theory ? 'filled' : ''}" title="Theory"></span>
          <span class="dot ${quiz ? 'filled' : ''}" title="Quiz"></span>
          <span class="dot ${practice ? 'filled' : ''}" title="Practice"></span>
        </span>
      </button>`;
  }).join('');

  const done = topics.filter(t => topicScore(t.id) >= 3).length;

  return `
    <div class="sidebar-logo">
      <h1>TS Daily Practice</h1>
      <p>Theory · Quiz · Code</p>
      <div class="streak">🔥 ${p.streak} day streak</div>
    </div>
    <nav>
      <div class="nav-section">Topics ${done}/${topics.length}</div>
      ${topicItems}
    </nav>
  `;
}

// ── Home ───────────────────────────────────────────────────────────────────
function renderHome(): string {
  const p = getProgress();
  const total = topics.length;
  const done  = topics.filter(t => topicScore(t.id) >= 3).length;

  const cards = topics.map(t => {
    const theory   = p.theoryRead.includes(t.id);
    const quizDone = (p.quizBestScore[t.id] ?? 0) > 0;
    const practice = p.practiceComplete.includes(t.id);
    return `
      <div class="topic-card" data-topic="${t.id}">
        <div class="t-icon">${t.icon}</div>
        <h3>${t.title}</h3>
        <div class="tagline">${t.tagline}</div>
        <div class="pill-row">
          <span class="pill ${theory   ? 'done' : ''}">Theory</span>
          <span class="pill ${quizDone ? 'done' : ''}">Quiz</span>
          <span class="pill ${practice ? 'done' : ''}">Practice</span>
        </div>
      </div>`;
  }).join('');

  return `
    <div class="topbar">
      <h2>Home</h2>
      <span class="progress-summary">${done}/${total} topics covered</span>
    </div>
    <div class="content">
      <div class="home-header">
        <h2>Learn TypeScript</h2>
        <p>Each topic has Theory, a 5-question Quiz, and a hands-on Practice challenge.</p>
      </div>
      <div class="topic-grid">${cards}</div>
    </div>`;
}

// ── Topic: Theory tab ──────────────────────────────────────────────────────
function renderTheory(topic: Topic): string {
  const p = getProgress();
  const isRead = p.theoryRead.includes(topic.id);

  const sections = topic.theory.map(s => `
    <div class="theory-section">
      <h3>${s.title}</h3>
      <p>${s.body}</p>
      ${codeBlock(s.code)}
    </div>`).join('');

  return `
    ${sections}
    <button class="theory-read-btn ${isRead ? 'done' : ''}" id="theory-read-btn">
      ${isRead ? '✓ Marked as read' : '📖 Mark as read'}
    </button>`;
}

// ── Topic: Quiz tab ────────────────────────────────────────────────────────
function renderQuiz(topic: Topic): string {
  const total = topic.quiz.length;

  // Show result screen
  if (quizIndex >= total) {
    const score = quizAnswered.filter((a, i) => a === topic.quiz[i].correctIndex).length;
    saveQuizScore(topic.id, score);
    const emoji = score === total ? '🎉' : score >= total * 0.8 ? '👍' : score >= total * 0.6 ? '🙂' : '📚';
    return `
      <div class="quiz-wrap">
        <div class="quiz-result">
          <div class="score-circle">${score}/${total}</div>
          <h3>${emoji} ${score === total ? 'Perfect score!' : score >= total * 0.8 ? 'Great job!' : 'Keep practising!'}</h3>
          <p>${score === total ? 'You answered every question correctly.' : `You got ${score} out of ${total} right.`}</p>
          <div style="display:flex;gap:10px;justify-content:center">
            <button class="btn btn-primary" id="quiz-retry">Retry Quiz</button>
            <button class="btn btn-ghost"   id="go-practice">Go to Practice →</button>
          </div>
        </div>
      </div>`;
  }

  const q = topic.quiz[quizIndex];
  const answered = quizAnswered[quizIndex];
  const showExplanation = answered !== null;

  const pips = topic.quiz.map((_, i) => {
    const a = quizAnswered[i];
    let cls = i === quizIndex ? 'active' : '';
    if (a !== null) cls = a === topic.quiz[i].correctIndex ? 'correct' : 'wrong';
    return `<div class="qpip ${cls}"></div>`;
  }).join('');

  const opts = q.options.map((opt, i) => {
    const letter = 'ABCD'[i];
    let cls = '';
    if (showExplanation) {
      if (i === q.correctIndex) cls = answered === i ? 'correct' : 'reveal';
      else if (i === answered)  cls = 'wrong';
    }
    const content = opt.code
      ? `<span class="option-code">${opt.code}</span>`
      : opt.text;
    return `
      <button class="option-btn ${cls}" data-opt="${i}" ${showExplanation ? 'disabled' : ''}>
        <span class="opt-letter">${letter}</span>
        <span>${content}</span>
      </button>`;
  }).join('');

  const nav = showExplanation ? `
    <div class="quiz-nav">
      <button class="btn btn-primary" id="quiz-next">
        ${quizIndex + 1 < total ? 'Next →' : 'See Results →'}
      </button>
    </div>` : '';

  return `
    <div class="quiz-wrap">
      <div class="quiz-progress-bar">${pips}</div>
      <div style="font-size:11px;color:var(--text-dim);margin-bottom:14px">
        Question ${quizIndex + 1} of ${total}
      </div>
      <div class="quiz-q">${q.question}</div>
      ${q.code ? `<div class="quiz-code">${codeBlock(q.code)}</div>` : ''}
      <div class="options">${opts}</div>
      ${showExplanation ? `<div class="explanation">💡 ${q.explanation}</div>` : ''}
      ${nav}
    </div>`;
}

// ── Topic: Practice tab ────────────────────────────────────────────────────
function renderPractice(topic: Topic): string {
  const p = getProgress();
  const isDone = p.practiceComplete.includes(topic.id);
  const c = topic.challenge;
  const savedCode = localStorage.getItem(`code:${topic.id}`) ?? c.starterCode;

  return `
    <div class="practice-wrap">
      <div class="challenge-title">${c.title}</div>
      <div class="challenge-desc">${c.description}</div>
      <div class="editor-label">Your Solution</div>
      <textarea id="editor" spellcheck="false">${savedCode}</textarea>
      <button class="hints-toggle" id="hints-toggle">💡 Show hints</button>
      <ul class="hints-list" id="hints-list" style="display:none">
        ${c.hints.map(h => `<li>${h}</li>`).join('')}
      </ul>
      <div class="action-row">
        ${isDone
          ? `<span class="done-badge">✅ Completed</span>
             <button class="btn btn-ghost" id="toggle-done">Undo</button>`
          : `<button class="btn btn-success" id="toggle-done">✓ Mark Complete</button>`
        }
      </div>
    </div>`;
}

// ── Topic wrapper (tabs) ───────────────────────────────────────────────────
function renderTopic(topicId: string, tab: TabId): string {
  const topic = topics.find(t => t.id === topicId)!;

  const tabs: { id: TabId; label: string }[] = [
    { id: 'theory',   label: '📖 Theory'   },
    { id: 'quiz',     label: '🧠 Quiz'     },
    { id: 'practice', label: '💻 Practice' },
  ];

  const tabHtml = tabs.map(t => `
    <button class="tab-btn ${t.id === tab ? 'active' : ''}" data-tab="${t.id}">
      ${t.label}
    </button>`).join('');

  let content = '';
  if (tab === 'theory')   content = renderTheory(topic);
  if (tab === 'quiz')     content = renderQuiz(topic);
  if (tab === 'practice') content = renderPractice(topic);

  const score = topicScore(topicId);

  return `
    <div class="topbar">
      <h2>${topic.icon} ${topic.title}</h2>
      <span class="progress-summary">Score: ${score} pt${score !== 1 ? 's' : ''}</span>
    </div>
    <div class="content">
      <div class="topic-page">
        <div class="topic-header">
          <button class="back" id="back-btn">← Back</button>
          <div class="t-title">
            <h2>${topic.title}</h2>
            <p>${topic.tagline}</p>
          </div>
        </div>
        <div class="tabs">${tabHtml}</div>
        <div id="tab-content">${content}</div>
      </div>
    </div>`;
}

// ── Bind events ────────────────────────────────────────────────────────────
function bindEvents(): void {
  // Topic card / sidebar button
  document.querySelectorAll<HTMLElement>('[data-topic]').forEach(el => {
    el.addEventListener('click', () => go({ kind: 'topic', id: el.dataset.topic!, tab: 'theory' }));
  });

  // Back button
  document.getElementById('back-btn')?.addEventListener('click', () => go({ kind: 'home' }));

  // Tab buttons
  document.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (view.kind === 'topic') {
        go({ kind: 'topic', id: view.id, tab: btn.dataset.tab as TabId });
      }
    });
  });

  // Theory read button
  document.getElementById('theory-read-btn')?.addEventListener('click', () => {
    if (view.kind === 'topic') {
      markTheoryRead(view.id);
      renderAll();
    }
  });

  // Quiz options
  if (view.kind === 'topic' && view.tab === 'quiz') {
    const topicId = view.id;
    const topic = topics.find(t => t.id === topicId)!;

    document.querySelectorAll<HTMLButtonElement>('[data-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (quizAnswered[quizIndex] !== null) return;
        quizAnswered[quizIndex] = parseInt(btn.dataset.opt!);
        // re-render just the tab content
        const tabContent = document.getElementById('tab-content')!;
        tabContent.innerHTML = renderQuiz(topic);
        bindTabContentEvents(topicId, topic);
      });
    });

    bindTabContentEvents(topicId, topic);
  }

  // Practice toggle
  document.getElementById('toggle-done')?.addEventListener('click', () => {
    if (view.kind === 'topic') {
      togglePracticeComplete(view.id);
      renderAll();
    }
  });

  // Hints toggle
  document.getElementById('hints-toggle')?.addEventListener('click', () => {
    const list = document.getElementById('hints-list')!;
    const btn  = document.getElementById('hints-toggle')!;
    const open = list.style.display !== 'none';
    list.style.display = open ? 'none' : 'block';
    btn.textContent = open ? '💡 Show hints' : '🙈 Hide hints';
  });

  // Code editor auto-save + tab key
  const editor = document.getElementById('editor') as HTMLTextAreaElement | null;
  if (editor && view.kind === 'topic') {
    const id = view.id;
    editor.addEventListener('input', () => localStorage.setItem(`code:${id}`, editor.value));
    editor.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = editor.selectionStart, en = editor.selectionEnd;
        editor.value = editor.value.slice(0, s) + '  ' + editor.value.slice(en);
        editor.selectionStart = editor.selectionEnd = s + 2;
      }
    });
  }
}

function bindTabContentEvents(topicId: string, topic: Topic): void {
  // Quiz next
  document.getElementById('quiz-next')?.addEventListener('click', () => {
    quizIndex++;
    const tabContent = document.getElementById('tab-content')!;
    tabContent.innerHTML = renderQuiz(topic);
    bindTabContentEvents(topicId, topic);
  });

  // Quiz retry
  document.getElementById('quiz-retry')?.addEventListener('click', () => {
    quizIndex = 0;
    quizAnswered = new Array(topic.quiz.length).fill(null);
    const tabContent = document.getElementById('tab-content')!;
    tabContent.innerHTML = renderQuiz(topic);
    bindTabContentEvents(topicId, topic);
    renderSidebarOnly();
  });

  // Go to practice
  document.getElementById('go-practice')?.addEventListener('click', () => {
    go({ kind: 'topic', id: topicId, tab: 'practice' });
  });

  // Quiz options (re-bind after re-render)
  document.querySelectorAll<HTMLButtonElement>('[data-opt]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (quizAnswered[quizIndex] !== null) return;
      quizAnswered[quizIndex] = parseInt(btn.dataset.opt!);
      const tabContent = document.getElementById('tab-content')!;
      tabContent.innerHTML = renderQuiz(topic);
      bindTabContentEvents(topicId, topic);
    });
  });
}

// ── Render ─────────────────────────────────────────────────────────────────
function renderAll(): void {
  document.querySelector('.sidebar')!.innerHTML = renderSidebar();
  document.querySelector('.main')!.innerHTML =
    view.kind === 'home'
      ? renderHome()
      : renderTopic(view.id, view.tab);
  bindEvents();
}

function renderSidebarOnly(): void {
  document.querySelector('.sidebar')!.innerHTML = renderSidebar();
  // re-bind sidebar topic buttons
  document.querySelectorAll<HTMLElement>('.sidebar [data-topic]').forEach(el => {
    el.addEventListener('click', () => go({ kind: 'topic', id: el.dataset.topic!, tab: 'theory' }));
  });
}

function render(): void { renderAll(); }

// ── Bootstrap ──────────────────────────────────────────────────────────────
document.getElementById('app')!.innerHTML = `
  <div class="sidebar"></div>
  <div class="main"></div>
`;

render();
