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
            <b>02 / ENTERPRISE NETWORK &amp; NAC</b>
            <p>Network access control and access-security work involving Cisco ISE, 802.1X, RADIUS, Forescout, firewall platforms, endpoint visibility, and segmentation.</p>
            <span className="tag">Cisco ISE · 802.1X · Forescout · FortiGate · Check Point</span>
          </div>
          <div className="project">
            <b>03 / NETWORK AUTOMATION</b>
            <p>Built PowerShell-based Wi-Fi speed testing and scheduled operational checks, integrating command-line testing tools and desktop automation.</p>
            <span className="tag">PowerShell · Ookla CLI · AutoHotkey</span>
          </div>
          <div className="project">
            <b>04 / JAPANESE LIVE TRANSCRIPTION</b>
            <p>Developed a Chrome extension and Node.js relay prototype for capturing browser-tab audio and streaming Japanese transcription.</p>
            <span className="tag">Chrome MV3 · Node.js · OpenAI Realtime</span>
          </div>
        </>); break
      case 'certifications': case 'certs':
        add(<>
          <b className="green">CERTIFICATIONS &amp; PROFESSIONAL DEVELOPMENT</b>
          <p><span className="metric">CCNP</span> <span className="dim">Cisco Certified Network Professional</span></p>
          <p><span className="metric">VMware Certified</span> <span className="dim">As listed on LinkedIn</span></p>
          <p><span className="metric">Fortinet NSE 4</span> <span className="dim">Network Security Professional · legacy certification</span></p>
          <p><span className="metric">TOEIC 790</span> <span className="dim">Latest score shared</span></p>
          <p className="dim">Certification dates and credential IDs are not displayed.</p>
        </>); break
      case 'contact':
        add(<>
          <b className="green">LET'S CONNECT</b>
          <p>Interested in professional opportunities, technical discussions, and collaboration in enterprise networking, IT infrastructure, and network security.</p>
          <p><span className="label">EMAIL</span><br/><Mail size={14} className="inline-icon"/> <a href="mailto:mike_peerawat@icloud.com">mike_peerawat@icloud.com</a></p>
          <p><span className="label">LINKEDIN</span><br/><Linkedin size={14} className="inline-icon"/> <a href="https://www.linkedin.com/in/peerawatdueanchay" target="_blank" rel="noreferrer">linkedin.com/in/peerawatdueanchay</a></p>
          <p><span className="label">PORTFOLIO SOURCE CODE</span><br/><Github size={14} className="inline-icon"/> <a href="https://github.com/matefeedkillrepeat30-create/mike-matrix-terminal-portfolio" target="_blank" rel="noreferrer">GitHub Repository · Matrix Terminal Portfolio</a></p>
          <p><span className="label">LOCATION</span> Thailand · Bangkok</p>
          <p><span className="label">FOCUS AREAS</span> Network Engineering • Network Security • IT Infrastructure • Enterprise Networking</p>
          <p><a className="inline-command" href="mailto:mike_peerawat@icloud.com">GET IN TOUCH ↗</a></p>
        </>); break
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
    <section className="stats"><div><strong>15<span>+</span></strong><small>YEARS IN IT INFRASTRUCTURE</small></div><div><strong>4</strong><small>CORE TECHNICAL DOMAINS</small></div><div><strong>162K</strong><small>THB ANNUAL COST REDUCTION</small></div><div><strong>4</strong><small>CAREER MILESTONES</small></div></section>
    <footer><span>© 2026 PEERAWAT DUEANCHAY / NETWORK &amp; SECURITY ENGINEERING.</span><span><span className="pulse"/> ALL SYSTEMS NOMINAL</span></footer>
  </main>
}
export default App
