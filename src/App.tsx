import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, Wifi, ShieldCheck, Cpu, Network, ArrowUpRight } from 'lucide-react'
import MatrixPortrait from './MatrixPortrait'

type Line = { kind: 'input' | 'output' | 'error' | 'system'; content: React.ReactNode }
const commands = ['help', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact', 'whoami', 'date', 'clear']
const skills = [
  { group: 'NETWORK & INFRASTRUCTURE', items: 'Cisco Catalyst 9200 / 9300 • Nexus • LAN / WAN • MPLS • OSPF • BGP • EIGRP • VLAN • STP • HSRP' },
  { group: 'NETWORK SECURITY & NAC', items: 'Cisco ISE • 802.1X • RADIUS • NAC • Forescout • FortiGate • Check Point • Palo Alto • Proxy' },
  { group: 'WIRELESS NETWORK', items: 'Cisco Wireless • Aruba • Ruckus • Cisco WLC 9800 / 3504 • Wireless Design & Troubleshooting' },
  { group: 'MONITORING & OPERATIONS', items: 'SolarWinds Orion • PRTG • NetFlow • Wireshark • Incident & Problem Management • Capacity Planning' },
  { group: 'IT INFRASTRUCTURE', items: 'VMware • Windows Server • Enterprise IT Infrastructure • Data Center Capacity Planning' },
  { group: 'AUTOMATION & DEVELOPMENT', items: 'PowerShell • Python • Node.js • Playwright • AutoHotkey • Power Automate • REST / Webhooks' },
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
        add(<>
          <b className="green">ABOUT MIKE</b>
          <p>Senior Network &amp; IT Infrastructure Engineer with 15+ years of experience in enterprise network infrastructure, network security, wireless technologies, and IT operations.</p>
          <p>Experienced in delivering infrastructure projects from requirements gathering and solution design through procurement, implementation, testing, and handover. Focused on reliable enterprise connectivity, secure network access, operational resilience, and cost optimization.</p>
          <p><span className="label">LOCATION</span> Thailand</p>
          <p><span className="label">CURRENT ROLE</span> Senior Information Technology Engineer · UTAC</p>
          <p><span className="label">SPECIALTIES</span> Enterprise Networking • Network Security • NAC • Wireless • IT Project Delivery</p>
        </>); break
      case 'skills':
        add(<><b className="green">TECHNICAL SKILLS</b>{skills.map(s => <div className="skill-row" key={s.group}><span className="label">{s.group}</span><div>{s.items}</div></div>)}</>); break
      case 'experience':
        add(<>
          <b className="green">PROFESSIONAL EXPERIENCE</b>
          <div className="timeline">
            <div>
              <b>Senior Information Technology Engineer</b>
              <span className="dim">UTAC · Apr 2016 – Present · Bangkok, Thailand</span>
              <p>Lead planning and delivery of enterprise IT infrastructure and network projects across multiple sites, from requirements and solution design through procurement, implementation, and handover.</p>
              <p>Manage project scope, schedules, resources, risks, CAPEX/OPEX budgets, technical specifications, and vendor/carrier relationships.</p>
              <p>Provide technical leadership across LAN/WAN, MPLS, wireless, network security, Cisco ISE, Forescout, FortiGate, Check Point, 802.1X, RADIUS, endpoint visibility, and segmentation.</p>
              <p>Lead major incident coordination, root-cause resolution, lifecycle refresh, capacity planning, infrastructure documentation, and knowledge transfer.</p>
            </div>
            <div>
              <b>Network Specialist Engineer (KBTG)</b>
              <span className="dim">Dimension Data · Sep 2015 – Mar 2016 · Thailand</span>
              <p>Provided Tier 2 network support for nationwide KBank branches and ATM connectivity, including incident troubleshooting, network changes, infrastructure upgrades, and onsite support.</p>
              <p>Coordinated with NOC teams, customers, and vendors; performed proactive network health checks and supported branch network implementations.</p>
            </div>
            <div>
              <b>Network Engineer</b>
              <span className="dim">TT Network Integration (Thailand) Co., Ltd · Jun 2012 – Jul 2015</span>
              <p>Provided onsite network engineering support for Toyota Motor Thailand and Toyota Motor Asia Pacific in a manufacturing environment.</p>
              <p>Supported Cisco Unified Communications Manager, IP phones, SIP/SCCP, voice gateways, Layer 2/3, wireless, network monitoring, incident response, and infrastructure documentation.</p>
              <p>Served as Network Engineer Plant Leader, coordinating team resources and technical knowledge transfer.</p>
            </div>
            <div>
              <b>Network Engineer</b>
              <span className="dim">JCMR Co., Ltd · Jun 2011 – May 2012 · Thailand</span>
              <p>Designed and implemented wireless controller and access point solutions for hotel customers, including site surveys, requirements gathering, network layouts, user documentation, and onsite troubleshooting.</p>
            </div>
          </div>
        </>); break
      case 'projects':
        add(<>
          <b className="green">SELECTED PROJECTS</b>
          <div className="project">
            <b>01 / NETWORK LINK COST REDUCTION</b>
            <p>Replaced a recurring dark-fiber circuit between UTL1 and B8 with a wireless point-to-point link.</p>
            <span className="metric">THB 162,000 / YEAR SAVED</span>
            <p className="dim">One-time implementation cost: approximately USD 1,300.</p>
          </div>
          <div className="project">
