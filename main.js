(()=>{
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const projectSource=window.projectsData||window.portfolioProjects||[];
  const projects=projectSource.map((p,i)=>({
    id:p.id||`project-${i}`,
    title:p.title||p.name||`Project ${i+1}`,
    category:String(p.category||p.type||'GIS').toUpperCase(),
    year:String(p.year||p.date||''),
    location:p.location||'',
    description:p.description||p.overview||'',
    overview:p.overview||p.description||'',
    whatIDid:p.whatIDid||'',
    objective:p.objective||'',
    methodology:p.methodology||'',
    features:Array.isArray(p.features)?p.features:[],
    results:p.results||'',
    image:p.image||p.thumbnail||'',
    tools:Array.isArray(p.tools)?p.tools:(p.software||[]),
    resources:p.resources||{}
  }));
  const certs=window.certificatesData||[], achievements=window.achievementData||[];
  const nav=$('#nav'), loader=$('#loader'), cursor=$('#cursor');

  addEventListener('load',()=>setTimeout(()=>loader?.classList.add('hide'),250),{once:true});
  if(window.Lenis&&window.gsap&&window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    const lenis=new Lenis({duration:1.05,smoothWheel:true,wheelMultiplier:.85,anchors:true});
    window.lenis=lenis;
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(t=>lenis.raf(t*1000));
    gsap.ticker.lagSmoothing(0);
  }
  addEventListener('scroll',()=>{
    nav?.classList.toggle('scrolled',scrollY>30);
    const max=document.documentElement.scrollHeight-innerHeight;
    const progress=$('.scroll-progress i');
    if(progress) progress.style.transform=`scaleY(${max?scrollY/max:0})`;
  },{passive:true});
  $('.menu')?.addEventListener('click',()=>nav.classList.toggle('open'));
  $$('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

  const revealObserver=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('revealed');revealObserver.unobserve(e.target)}
  }),{threshold:.1});
  $$('.reveal').forEach(e=>revealObserver.observe(e));

  if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    let x=innerWidth/2,y=innerHeight/2,cx=x,cy=y;
    addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY});
    (function tick(){
      cx+=(x-cx)*.18;cy+=(y-cy)*.18;
      if(cursor){cursor.style.left=cx+'px';cursor.style.top=cy+'px'}
      requestAnimationFrame(tick);
    })();
    document.addEventListener('pointerover',e=>{
      if(e.target.closest('.project-row,a,button')) cursor?.classList.add('view');
    });
    document.addEventListener('pointerout',e=>{
      if(e.target.closest('.project-row,a,button')) cursor?.classList.remove('view');
    });
  }

  [['heroVideo','.hero-video'],['aboutVideo','.about-video']].forEach(([id,sel])=>{
    const v=$('#'+id); if(!v)return;
    v.addEventListener('canplay',()=>{v.classList.add('ready');v.parentElement.classList.add('has-video')},{once:true});
    v.addEventListener('error',()=>{v.style.display='none'});
  });

  const portrait=$('[data-parallax]');
  if(portrait&&matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    addEventListener('pointermove',e=>{
      const dx=(e.clientX/innerWidth-.5)*12,dy=(e.clientY/innerHeight-.5)*12;
      portrait.style.transform=`translate(${dx}px,${dy}px)`;
    });
  }

  const list=$('#projectList'), img=$('#previewImg'), cat=$('#previewCat'), year=$('#previewYear');
  let filter='ALL';
  const matches=p=>filter==='ALL'||p.category.includes(filter);
  const visible=()=>projects.filter(matches);
  const escapeHTML=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const safeUrl=v=>{
    try{const u=new URL(v,location.href);return /^https?:$/.test(u.protocol)?u.href:''}catch{return ''}
  };
  function preview(p){
    if(!img)return;
    img.classList.remove('loaded');
    if(p.image){
      img.src=p.image;
      img.onload=()=>img.classList.add('loaded');
      img.onerror=()=>img.classList.remove('loaded');
    }else img.removeAttribute('src');
    img.alt=p.title; if(cat)cat.textContent=p.category; if(year)year.textContent=p.year;
  }
  function render(){
    if(!list)return;
    list.innerHTML='';
    visible().forEach((p,i)=>{
      const b=document.createElement('button');
      b.type='button'; b.className='project-row';
      b.innerHTML=`<span class="num">${String(i+1).padStart(2,'0')}</span><h3>${escapeHTML(p.title)}</h3><span class="meta"><b>${escapeHTML(p.category)}</b><span>${escapeHTML(p.year)}</span></span>`;
      b.addEventListener('mouseenter',()=>preview(p));
      b.addEventListener('focus',()=>preview(p));
      b.addEventListener('click',()=>openProject(p));
      list.appendChild(b);
    });
    if(visible()[0])preview(visible()[0]);
  }
  $$('#filters button').forEach(b=>b.addEventListener('click',()=>{
    $$('#filters button').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); filter=b.dataset.filter; render();
  }));
  render();

  const modal=$('#projectModal');
  function section(title,content){
    if(!content)return '';
    if(Array.isArray(content)&&!content.length)return '';
    if(Array.isArray(content)) return `<section class="modal-section"><h3>${escapeHTML(title)}</h3><ul>${content.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></section>`;
    return `<section class="modal-section"><h3>${escapeHTML(title)}</h3><p>${escapeHTML(content)}</p></section>`;
  }
  function openProject(p){
    $('#modalCat').textContent=p.category;
    $('#modalTitle').textContent=p.title;
    $('#modalMeta').textContent=[p.location,p.year].filter(Boolean).join('  /  ');
    $('#modalText').innerHTML=
      section('Overview',p.overview)+
      section('What I Did',p.whatIDid)+
      section('Objective',p.objective)+
      section('Methodology',p.methodology)+
      section('Key Features',p.features)+
      section('Results / Output',p.results);
    $('#modalTags').innerHTML=p.tools.map(t=>`<span>${escapeHTML(t)}</span>`).join('');
    const links=[];
    for(const [k,v] of Object.entries(p.resources||{})){
      const u=safeUrl(v); if(!u)continue;
      const label={github:'GitHub Repository',interactiveMap:'Live Project'}[k]||k.replace(/([A-Z])/g,' $1');
      links.push(`<a href="${escapeHTML(u)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>`);
    }
    $('#modalLinks').innerHTML=links.join('');
    const mi=$('#modalImg'); mi.src=p.image||''; mi.alt=p.title;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
  }
  function close(){modal?.classList.remove('open');modal?.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
  $$('[data-close]').forEach(x=>x.addEventListener('click',close));
  addEventListener('keydown',e=>{if(e.key==='Escape')close()});

  const cg=$('#certGrid'), ce=$('#certEmpty');
  if(certs.length){
    ce.classList.remove('show');
    cg.innerHTML=certs.map((c,i)=>`<article class="cert" tabindex="0" data-cert="${i}"><img src="${escapeHTML(c.image||'')}" alt="${escapeHTML(c.title||'Certificate')}"><div class="cert-body"><h3>${escapeHTML(c.title||'Certificate')}</h3><p>${escapeHTML(c.organization||'')} · ${escapeHTML(c.date||'')}</p></div></article>`).join('');
  }else ce.classList.add('show');
  const al=$('#achievementList');
  if(achievements.length) al.innerHTML=achievements.map(a=>`<div class="achievement"><b>${escapeHTML(a.year||'')}</b><span>${escapeHTML(a.text||a.title||'')}</span></div>`).join('');
  else al.innerHTML='<div class="achievement"><b>—</b><span>No achievement records have been added yet.</span></div>';

  if(window.Globe){
    const coords=projects.filter(p=>Number.isFinite(+p.lat)&&Number.isFinite(+p.lng));
    if(coords.length){
      const globe=Globe()($('#globeViz')).backgroundColor('#090909').globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg').pointsData(coords).pointLat('lat').pointLng('lng').pointColor(()=> '#00D4FF').pointAltitude(.02).pointRadius(.35);
      globe.controls().autoRotate=true; globe.controls().autoRotateSpeed=.35;
    }else if($('#globeStrip')) $('#globeStrip').style.display='none';
  }else if($('#globeStrip')) $('#globeStrip').style.display='none';
})();
