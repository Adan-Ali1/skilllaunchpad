(()=>{
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem('sl-'+key))??fallback}catch{return fallback}};
  const insertBefore=(node,html)=>node?.insertAdjacentHTML('beforebegin',html);
  const home=document.body.dataset.page==='home'||location.pathname==='/'||location.pathname.endsWith('/index.html');
  if(!home)return;

  const nav=document.querySelector('#primary-navigation');
  if(nav){nav.innerHTML='<a class="navbtn" href="skill-finder.html">Find My Skill</a><a href="roadmaps.html">Roadmaps</a><a href="projects.html">Projects</a><a href="#guides">Guides</a><a href="tools.html">Free tools</a><a href="dashboard.html">My progress</a>'}
  const hero=document.querySelector('.hero');
  if(hero){
    const h=hero.querySelector('h1'); if(h)h.innerHTML='Learn a skill.<br>Build something <em>real.</em>';
    const actions=hero.querySelector('.actions'); if(actions)actions.innerHTML='<a class="btn" href="skill-finder.html">Find My Skill →</a><a class="link" href="roadmaps.html">Explore Roadmaps</a>';
    const proof=hero.querySelector('.proof'); if(proof)proof.textContent='No signup required · Free to explore · Beginner-friendly';
    hero.setAttribute('aria-labelledby','home-title'); if(h)h.id='home-title';
  }
  const journey=document.querySelector('section.journey');
  insertBefore(journey,`<section class="start-card wrap" aria-labelledby="start-title"><div class="start-copy"><span class="eyebrow">A GOOD PLACE TO BEGIN</span><h2 id="start-title">Not sure where to start?</h2><p>Answer a few quick questions and get a practical skill, first project and next step to explore.</p><a class="btn" href="skill-finder.html">Take the Skill Finder →</a><small>No account needed. Your choices stay in this browser.</small></div><div class="start-preview" aria-label="A preview of the four Skill Finder questions"><div><small>01 · INTEREST</small><b>What do you enjoy?</b></div><div><small>02 · TIME</small><b>How much time can you give?</b></div><div><small>03 · STYLE</small><b>What kind of work fits you?</b></div><div><small>04 · GOAL</small><b>What would you like to make?</b></div></div></section>`);
  if(journey){
    const grid=journey.querySelector('.journey-grid');
    if(grid){const stages=[['01','✳','DISCOVER','Find a skill','Explore interests and choose one small direction.','skill-finder.html'],['02','↗','LEARN','Follow a roadmap','Build useful basics in a manageable order.','roadmaps.html'],['03','▧','PRACTICE','Complete a project','Apply one idea to a fictional, focused brief.','projects.html'],['04','◫','BUILD','Create portfolio proof','Collect samples and describe your own work.','portfolio-builder.html'],['05','✎','SHOWCASE','Explain your process','Turn choices and learning into a clear case study.','case-study-builder.html'],['06','→','LAUNCH','Prepare a next step','Draft a thoughtful message or plan.','tools.html']];grid.classList.add('path-grid');grid.innerHTML=stages.map(([n,icon,kicker,title,desc,href])=>`<a class="path-step" href="${href}"><span class="path-number">${n}</span><span class="path-icon" aria-hidden="true">${icon}</span><small>${kicker}</small><b>${title}</b><span>${desc}</span><strong>Open step <i aria-hidden="true">→</i></strong></a>`).join('')}
    const heading=journey.querySelector('h2');if(heading)heading.innerHTML='A clear path from curiosity to <em>your next step.</em>';
    const desc=journey.querySelector('.sub');if(desc)desc.textContent='Discover → learn → practice → build → showcase → launch. Each step points to something useful you can do next.';
  }
  const skillHeading=[...document.querySelectorAll('h2')].find(h=>h.textContent.includes('Choose an area to explore'));
  const skillSection=skillHeading?.closest('section');
  if(skillSection){
    const skillCards=skillSection.querySelector('.journey-grid');skillCards?.classList.add('skill-grid');
    skillCards?.querySelectorAll('a').forEach(a=>{const title=a.querySelector('b')?.textContent||'Skill';const body=a.querySelector('span')?.textContent||'';a.innerHTML=`<small>BEGINNER · PROJECT-BASED</small><b>${esc(title)}</b><span>${esc(body)}</span><strong>Explore roadmap <i aria-hidden="true">→</i></strong>`});
    const section=skillSection;
    section.insertAdjacentHTML('afterend',`<section class="make-section wrap" aria-labelledby="make-title"><div class="section-heading"><div><span class="eyebrow">LEARN BY MAKING</span><h2 id="make-title">What could you <em>build?</em></h2><p class="sub">Small, finished samples make practice visible. Pick one and explore its brief.</p></div><a class="text-link" href="projects.html">Browse all projects →</a></div><div class="make-grid">${[
      ['WEB DEVELOPMENT','A one-page business site','2–4 hours','web'],['GRAPHIC DESIGN','A social media starter kit','1–3 hours','design'],['VIDEO EDITING','A captioned short-form edit','2–4 hours','video'],['CONTENT WRITING','A useful beginner guide','1–2 hours','writing'],['UI/UX DESIGN','A simple booking flow','2–4 hours','ux'],['DATA ANALYSIS','A clear sample-data report','2–3 hours','data']
    ].map(([skill,project,time,id])=>`<a class="make-card" href="projects.html?skill=${id}"><small>${skill}</small><b>${project}</b><span><i>BEGINNER</i><i>${time}</i></span><strong>View project <i aria-hidden="true">↗</i></strong></a>`).join('')}</div></section><section class="first-project wrap" aria-labelledby="first-project-title"><div class="brief-label"><small>YOUR FIRST PROJECT</small><span>FICTIONAL PRACTICE BRIEF</span></div><div class="brief-main"><span class="eyebrow">NO CLIENT NEEDED TO START</span><h2 id="first-project-title">Your first project is <em>waiting.</em></h2><p>You can build proof of your skills with a small practice brief. Start with a clear problem, make a useful sample and explain what you learned.</p><div class="brief-facts"><div><small>SCENARIO</small><b>A local café needs a simple launch page.</b></div><div><small>GOAL</small><b>Help visitors find hours, menu and location.</b></div><div><small>DELIVERABLE</small><b>A clear one-page website sample.</b></div><div><small>TIME</small><b>About 2–4 flexible practice hours.</b></div></div><a class="btn" href="projects.html?skill=web">Give me a project →</a></div></section>`);
  }
  const challengeHeading=[...document.querySelectorAll('h2')].find(h=>h.textContent.includes('Practice a little each day.'));
  const challengeSection=challengeHeading?.closest('section');
  if(challengeSection){
    challengeHeading.innerHTML='Thirty days of small, <em>practical steps.</em>';
    const p=challengeSection.querySelector('p');if(p)p.textContent='A flexible plan takes you from choosing a skill to publishing an honest sample. Pause, repeat a day or move at your own pace.';
    const preview=document.createElement('div');preview.className='challenge-preview';preview.innerHTML='<div class="challenge-top"><div><small>30-DAY SKILL CHALLENGE</small><b id="challenge-count">0 / 30 days</b></div><div class="mini-progress" role="progressbar" aria-label="30-day challenge progress" aria-valuemin="0" aria-valuemax="30" aria-valuenow="0"><i></i></div></div><div class="challenge-days"><span><b>DAY 01</b>Choose a skill</span><span><b>DAY 02</b>Study the basics</span><span class="today"><b>DAY 03</b>Make something small</span><span><b>DAY 04</b>Improve it</span><span class="ellipsis">···</span><span><b>DAY 30</b>Publish your best work</span></div>';
    p?.insertAdjacentElement('afterend',preview);
    const btn=challengeSection.querySelector('a.btn');if(btn)btn.textContent='Start the 30-Day Challenge →';
    const count=read('challenge',[]).length;const progress=preview.querySelector('.mini-progress');const fill=preview.querySelector('.mini-progress i');const countLabel=preview.querySelector('#challenge-count');progress.setAttribute('aria-valuenow',String(count));fill.style.width=(count/30*100)+'%';countLabel.textContent=`${count} / 30 days`;
    challengeSection.insertAdjacentHTML('afterend',`<section class="today-card wrap" aria-labelledby="today-title"><div><span class="eyebrow">ONE USEFUL ACTION</span><h2 id="today-title">What should I do <em>today?</em></h2><p id="today-copy" aria-live="polite"></p><a id="today-link" class="btn" href="skill-finder.html">Choose a skill →</a></div><div class="today-checklist" aria-label="Possible next actions"><span>□ Choose a skill</span><span>□ Complete a guide</span><span>□ Start a project</span><span>□ Improve a sample</span><span>□ Write a case study</span><span>□ Prepare a first message</span></div></section>`);
    suggestNext();
  }
  const toolSection=document.querySelector('.tool');
  if(toolSection)toolSection.insertAdjacentHTML('afterend',`<section class="tool-categories wrap" aria-labelledby="tool-categories-title"><div class="section-heading"><div><span class="eyebrow">FREE-FIRST TOOLBOX</span><h2 id="tool-categories-title">A useful tool for <em>each step.</em></h2><p class="sub">Browser-based helpers and templates. No paid AI or signup required for these tools.</p></div><a class="text-link" href="tools.html">Explore all free tools →</a></div><div class="tool-category-grid"><a href="skill-finder.html"><small>DISCOVER</small><b>Skill Finder</b><span>Explore a direction that fits your interests and time.</span><i>Try tool →</i></a><a href="tools/portfolio-brief-builder.html"><small>BUILD</small><b>Portfolio Brief Builder</b><span>Generate a fictional practice brief to work on.</span><i>Try tool →</i></a><a href="pricing-calculator.html"><small>FREELANCE</small><b>Pricing Calculator</b><span>Estimate from your own hours, rate and assumptions.</span><i>Try tool →</i></a><a href="career-copy-studio.html"><small>CAREER</small><b>Career Copy Studio</b><span>Draft a resume line or introduction you can edit.</span><i>Try tool →</i></a></div></section>`);
  const close=document.querySelector('.closing');
  if(close){const title=close.querySelector('h2');if(title)title.innerHTML='You don’t need to know everything.<br><em>Just where to start.</em>';const link=close.querySelector('a.btn');if(link){link.href='skill-finder.html';link.textContent='Find My Skill →';link.insertAdjacentHTML('afterend',' <a class="close-secondary" href="projects.html">Explore Projects</a>')}}
  enhanceFooter();

  function suggestNext(){
    const copy=document.querySelector('#today-copy'),link=document.querySelector('#today-link');if(!copy||!link)return;
    const skillIds=['web','design','video','writing','seo','marketing','ux','data','va','social'];
    const active=skillIds.map(id=>({id,steps:read('road-'+id,[])})).find(x=>x.steps.length);
    const projectDone=read('projects',[]).length;
    const portfolio=read('portfolio',{});
    const guideDone=read('guides',[]).length;
    if(!active){copy.textContent='Start by choosing one skill to explore. The Skill Finder will suggest a direction and a first project.';link.href='skill-finder.html';link.textContent='Find My Skill →';return}
    if(active.steps.length<10){copy.textContent=`You’ve started a ${active.id.toUpperCase()} roadmap. Continue with the next small learning step, then try a related practice brief.`;link.href=`roadmaps.html?skill=${active.id}`;link.textContent='Continue your roadmap →';return}
    if(!projectDone){copy.textContent='Your roadmap is underway. Put one idea into practice with a small fictional project.';link.href=`projects.html?skill=${active.id}`;link.textContent='Choose a practice project →';return}
    if(!portfolio.name){copy.textContent='You have practice work to show. Add a project and a short, honest description to your portfolio.';link.href='portfolio-builder.html';link.textContent='Build your portfolio →';return}
    if(!guideDone){copy.textContent='Your portfolio draft is started. Read a short guide or improve one detail in your project case study.';link.href='index.html#guides';link.textContent='Choose a guide →';return}
    copy.textContent='Review one sample, note what you learned, and choose a manageable next project.';link.href='projects.html';link.textContent='Explore another project →';
  }
  function enhanceFooter(){const footer=document.querySelector('footer');if(!footer)return;const foot=footer.querySelector('.foot');if(!foot)return;foot.innerHTML='<a class="brand" href="index.html"><img class="brand-logo" src="/assets/skilllaunchpad-logo.svg" alt="SkillLaunchpad home"></a><span class="footer-tagline">Practical learning for your next step.</span><div><b>Explore</b><a href="skill-finder.html">Skills</a><a href="roadmaps.html">Roadmaps</a><a href="index.html#guides">Guides</a><a href="projects.html">Projects</a><a href="tools.html">Tools</a></div><div><b>Build</b><a href="portfolio-builder.html">Portfolio</a><a href="case-study-builder.html">Case studies</a><a href="challenge/30-day.html">30-Day Challenge</a></div><div><b>Company</b><a href="about.html">About</a><a href="contact.html">Contact</a><a href="faq.html">FAQ</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></div>';}
})();