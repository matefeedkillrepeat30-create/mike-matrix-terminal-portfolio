import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, Wifi, ShieldCheck, Cpu, Network, ArrowUpRight } from 'lucide-react'
import MatrixPortrait from './MatrixPortrait'

type Line = { kind: 'input' | 'output' | 'error' | 'system'; content: React.ReactNode }
const commands = ['help', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact', 'whoami', 'date', 'clear']
const skills = [
  { group: 'NETWORK & INFRASTRUCTURE', items: 'Cisco Catalyst 9200 / 9300 • Nexus • Wireless LAN Controller 9800 / 3504 • Routing & Switching • Network Design' },
  { group: 'NETWORK SECURITY', items: 'Cisco ISE • 802.1X / NAC • FortiGate • Check Point • Forescout • Network Access Control' },
  { group: 'MONITORING & OPERATIONS', items: 'SolarWinds Orion • Infrastructure Monitoring • Incident Troubleshooting • Capacity & Performance' },
  { group: 'AUTOMATION & DEVELOPMENT', items: 'PowerShell • Python • Node.js • Playwright • AutoHotkey • Power Automate • REST / Webhooks' },
  { group: 'PLATFORMS & TOOLS', items: 'Windows Server • Cloud Server • Google Sheets • Git • npm • LINE Official Account' },
]
function Output({ line }: { line: Line }) {
  return <div className={`line ${line.kind}`}>{line.kind === 'input' && <span className="prompt">mike@matrix:~$ </span>}{line.content}</div>
}
function App() {
  const [history, setHistory] = useState<Line[]>([
    { kind: 'system', content: <>Welcome to <b className="green">MIKE://PORTFOLIO</b> <span className="dim">v1.0.0</span></> },
    { kind: 'system', content: <>Senior IT Infrastructure &amp; Network Security Engineer</> },
    { kind: 'system', content: <>Type <b className="green">help</b> to explore. Press <kbd>↑</kbd>/<kbd>↓</kbd> for command history or <kbd>Tab</kbd> to autocomplete.</> },
    { kind: 'output', content: <span className="dim">────────────────────────────────────────────────────────────────────────</span> },
  ])
  const [value, setValue] = useState('')
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [pastCommands, setPastCommands] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('terminal')
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [history])

  const run = (raw: string) => {
    const text = raw.trim()
    if (!text) return
    const [cmdRaw] = text.split(/\s+/)
    const cmd = cmdRaw.toLowerCase()
    const next: Line[] = [{ kind: 'input', content: text }]
    setPastCommands(p => [text, ...p].slice(0, 50)); setHistoryIndex(-1); setValue('')
    const add = (content: React.ReactNode, kind: Line['kind'] = 'output') => next.push({ kind, content })
    switch (cmd) {
      case 'help': case 'man':
        add(<><b className="green">AVAILABLE COMMANDS</b><div className="command-grid">{commands.map(c => <button key={c} className="command-link" onClick={() => run(c)}>{c}</button>)}</div><p className="dim">Tip: use Tab for autocomplete. Commands are case-insensitive.</p></>); break
      case 'about': case 'whoami':
        add(<><b className="green">ABOUT MIKE</b><p>Senior IT Infrastructure &amp; Network Security Engineer with 15+ years of experience designing, operating, securing, and improving enterprise IT environments.</p><p>Focused on resilient infrastructure, network access control, security architecture, and practical automation that reduces operational effort and cost.</p><p><span className="label">LOCATION</span> Bangkok, Thailand</p><p><span className="label">PROFILE</span> Infrastructure • Network • Security • Automation</p></>); break
      case 'skills':
        add(<><b className="green">TECHNICAL SKILLS</b>{skills.map(s => <div className="skill-row" key={s.group}><span className="label">{s.group}</span><div>{s.items}</div></div>)}</>); break
      case 'experience':
        add(<><b className="green">EXPERIENCE HIGHLIGHTS</b><div className="timeline"><div><b>Senior IT Infrastructure &amp; Network Engineering</b><span className="dim">Enterprise environments · Thailand</span><p>Network and security operations, infrastructure lifecycle, wireless, NAC, troubleshooting, vendor coordination, and service improvement.</p></div><div><b>Testing &amp; Training Operations</b><span className="dim">Investment industry · Thailand</span><p>Exam operations, scheduling, venue readiness, proctor coordination, communications calendar, and LINE Official Account administration.</p></div></div><p className="dim">Detailed employer names and dates can be added when you provide the final CV version.</p></>); break
      case 'projects':
        add(<><b className="green">SELECTED PROJECTS</b><div className="project"><b>01 / LINK COST REDUCTION</b><p>Replaced a recurring dark-fiber circuit between UTL1 and B8 with a wireless point-to-point link.</p><span className="metric">THB 162,000 / YEAR SAVED</span><span className="dim">One-time implementation: approx. USD 1,300</span></div><div className="project"><b>02 / NETWORK AUTOMATION</b><p>PowerShell and automation workflows for Wi-Fi speed testing, scheduled execution, and operational checks.</p><span className="tag">PowerShell · Ookla CLI · AutoHotkey</span></div><div className="project"><b>03 / NETWORK ACCESS &amp; SECURITY</b><p>Enterprise NAC and access-control initiatives involving Cisco ISE, 802.1X, and multi-vendor security platforms.</p><span className="tag">Cisco ISE · 802.1X · Fortinet · Check Point</span></div><div className="project"><b>04 / JAPANESE LIVE TRANSCRIPTION</b><p>Chrome extension and Node.js relay prototype for capturing tab audio and streaming Japanese transcription.</p><span className="tag">Chrome MV3 · Node.js · OpenAI Realtime</span></div></>); break
      case 'certifications': case 'certs':
        add(<><b className="green">CERTIFICATIONS &amp; LEARNING</b><p><span className="metric">CCNP</span> <span className="dim">Cisco Certified Network Professional</span></p><p><span className="metric">Fortinet NSE 4</span> <span className="dim">Network Security Professional (legacy certification)</span></p><p><span className="metric">TOEIC 790</span> <span className="dim">Latest score shared</span></p><p className="dim">Certification dates and credential IDs intentionally omitted until verified.</p></>); break
      case 'contact':
        add(<><b className="green">CONTACT</b><p>Interested in infrastructure, network security, and automation opportunities.</p><p><Mail size={14} className="inline-icon"/> Add your preferred email address</p><p><Linkedin size={14} className="inline-icon"/> Add your LinkedIn profile URL</p><p><Github size={14} className="inline-icon"/> Add your GitHub profile URL</p><p className="dim">Replace these placeholders in src/App.tsx before publishing.</p></>); break
      case 'date': add(new Date().toLocaleString()); break
      case 'clear': setHistory([]); return
      case 'sudo': add('Nice try. This portfolio runs on curiosity, not root privileges.', 'error'); break
      default: add(<>Command not found: <b>{cmdRaw}</b>. Type <button className="inline-command" onClick={() => run('help')}>help</button> to see available commands.</>, 'error')
    }
    setHistory(h => [...h, ...next])
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); run(value) }
    if (e.key === 'ArrowUp') { e.preventDefault(); const i = Math.min(historyIndex + 1, pastCommands.length - 1); setHistoryIndex(i); setValue(pastCommands[i] || '') }
    if (e.key === 'ArrowDown') { e.preventDefault(); const i = historyIndex - 1; setHistoryIndex(i); setValue(i < 0 ? '' : pastCommands[i] || '') }
    if (e.key === 'Tab') { e.preventDefault(); const match = commands.find(c => c.startsWith(value.toLowerCase())); if (match) setValue(match) }
    if (e.ctrlKey && e.key.toLowerCase() === 'l') { e.preventDefault(); setHistory([]) }
  }
  const quick = (c: string) => run(c)
  return <main className="page-shell">
    <div className="matrix-rain" aria-hidden="true">01010110　01001101　10101001　01101010　01001101　10100101　01011010　00110101</div>
    <header className="topbar"><a className="brand" href="#home"><span className="brand-mark">M<span>_</span></span><span>MIKE<span className="brand-sub">.SYS</span></span></a><nav><button className={activeTab === 'terminal' ? 'nav-active' : ''} onClick={() => setActiveTab('terminal')}>TERMINAL</button><button className={activeTab === 'profile' ? 'nav-active' : ''} onClick={() => { setActiveTab('profile'); run('about') }}>PROFILE</button><a href="https://github.com/matefeedkillrepeat30-create" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={12}/></a></nav><div className="status"><span className="pulse"/> SYSTEM ONLINE</div></header>
    <section className="hero" id="home"><div className="hero-copy"><div className="eyebrow"><span/> PERSONAL PORTFOLIO / 2026</div><h1>THINK IN<br/><span>NETWORKS.</span><br/>BUILD <span>SECURE.</span></h1><p>Engineering reliable infrastructure. Securing connections. Automating the repetitive.</p><div className="hero-tags"><span><Network size={14}/> NETWORK ENGINEERING</span><span><ShieldCheck size={14}/> CYBERSECURITY</span><span><Cpu size={14}/> AUTOMATION</span></div></div><div className="hero-art">   <MatrixPortrait /> </div></section>
    <section className="terminal-wrap"><div className="terminal-window" onClick={() => inputRef.current?.focus()}><div className="window-bar"><div className="window-dots"><i/><i/><i/></div><div className="window-title"><Wifi size={12}/> mike@matrix: ~/portfolio</div><span className="window-status">zsh — 80×24</span></div><div className="terminal-body"><div className="terminal-output">{history.map((line, i) => <Output line={line} key={i}/>)}<div ref={bottomRef}/></div><form className="input-line" onSubmit={e => { e.preventDefault(); run(value) }}><label htmlFor="terminal-input" className="prompt">mike@matrix:~$</label><input id="terminal-input" ref={inputRef} value={value} onChange={e => setValue(e.target.value)} onKeyDown={onKeyDown} autoComplete="off" spellCheck={false} aria-label="Terminal command"/><span className="cursor"/></form></div><div className="terminal-footer"><span>● UTF-8</span><span>MAIN · MATRIX THEME</span><span>COMMANDS: {commands.length}</span></div></div><div className="quick-commands"><span className="label">QUICK ACCESS</span>{['about','skills','experience','projects','certifications','contact','help'].map(c => <button key={c} onClick={() => quick(c)}>{c}</button>)}</div></section>
    <section className="stats"><div><strong>15<span>+</span></strong><small>YEARS EXPERIENCE</small></div><div><strong>5<span>+</span></strong><small>SECURITY / NETWORK PLATFORMS</small></div><div><strong>162K</strong><small>THB ANNUAL COST SAVING</small></div><div><strong>∞</strong><small>WAYS TO OPTIMIZE</small></div></section>
    <footer><span>© 2026 MIKE / BUILT FOR THE NEXT PACKET.</span><span><span className="pulse"/> ALL SYSTEMS NOMINAL</span></footer>
  </main>
}
export default App
