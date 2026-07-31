(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,82785,e=>{"use strict";var r=e.i(43476),t=e.i(46932);e.s(["default",0,function({children:e,className:a="",delay:i=0,id:n}){return(0,r.jsx)(t.motion.div,{id:n,initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-100px"},transition:{duration:.6,delay:i,ease:"easeOut"},className:a,children:e})}])},94352,e=>{"use strict";var r=e.i(43476),t=e.i(71645),a=e.i(82785);function i(e){if("u"<typeof document)return;let r=`; ${document.cookie}`.split(`; ${e}=`);if(2===r.length)return r.pop()?.split(";").shift()}let n=`
  .lp{
    --navy-900:#0a1628;
    --navy-800:#132240;
    --navy-700:#1b2e4a;
    --navy-600:#243a5e;
    --slate-900:#0f172a;
    --slate-700:#334155;
    --slate-600:#475569;
    --slate-500:#64748b;
    --slate-300:#cbd5e1;
    --slate-200:#e2e8f0;
    --slate-100:#f1f5f9;
    --slate-50:#f8fafc;
    --orange-500:#e8731a;
    --orange-400:#f5882e;
    --gold:#c9a94e;
    --green:#00a544;
    --radius:.5rem;
    --radius-lg:.75rem;
    --shadow-sm:0 1px 2px rgba(10,22,40,.06);
    --shadow-md:0 4px 12px rgba(10,22,40,.08);
    --shadow-lg:0 12px 32px rgba(10,22,40,.12);
    font-family:'Inter','Inter Fallback',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    color:var(--slate-700);
    line-height:1.6;
    background:#fff;
    -webkit-font-smoothing:antialiased;
  }
  .lp *{box-sizing:border-box}
  .lp img{max-width:100%;display:block}
  .lp a{color:inherit;text-decoration:none}
  .lp .container{max-width:1180px;margin:0 auto;padding:0 24px}

  .lp .btn{
    display:inline-flex;align-items:center;justify-content:center;gap:8px;
    padding:14px 24px;border-radius:var(--radius);
    font-weight:600;font-size:1rem;line-height:1;
    border:1px solid transparent;cursor:pointer;
    transition:transform .15s ease, background .15s ease, box-shadow .15s ease;
  }
  .lp .btn-primary{background:var(--orange-500);color:#fff;box-shadow:var(--shadow-md)}
  .lp .btn-primary:hover{background:var(--orange-400);transform:translateY(-1px);box-shadow:var(--shadow-lg)}
  .lp .btn-primary:disabled{opacity:.6;cursor:not-allowed;transform:none}
  .lp .btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.2)}
  .lp .btn-ghost:hover{background:rgba(255,255,255,.06)}
  .lp .btn-large{padding:18px 32px;font-size:1.05rem}

  .lp .hero{
    background:radial-gradient(1200px 600px at 80% -10%, rgba(232,115,26,.18), transparent 60%),
               linear-gradient(180deg,var(--navy-900) 0%, var(--navy-800) 100%);
    color:#fff;padding:48px 0 72px;position:relative;overflow:hidden;
  }
  .lp .hero::before{
    content:"";position:absolute;inset:0;
    background-image:
      linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
    background-size:48px 48px;
    mask-image:radial-gradient(ellipse at 70% 30%, #000 30%, transparent 70%);
    pointer-events:none;
  }
  .lp .hero-grid{display:grid;grid-template-columns:1fr;gap:32px;align-items:start;position:relative}
  @media(min-width:980px){.lp .hero-grid{grid-template-columns:1fr 1.25fr;gap:56px}}
  @media(min-width:980px){.lp .hero-text{align-self:center}}
  @media(min-width:1100px){.lp .hero .container{max-width:1320px}}
  .lp .eyebrow{
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(232,115,26,.12);color:var(--orange-400);
    padding:8px 14px;border-radius:999px;font-size:.8rem;font-weight:600;
    letter-spacing:.05em;text-transform:uppercase;
    border:1px solid rgba(232,115,26,.25);
  }
  .lp .eyebrow::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--orange-400);box-shadow:0 0 0 4px rgba(245,136,46,.2)}
  .lp .hero h1{
    font-size:clamp(1.9rem,3.8vw,3rem);
    line-height:1.1;font-weight:800;letter-spacing:-.02em;
    color:#fff;margin:14px 0 14px;
  }
  .lp .hero h1 .accent{color:var(--orange-400)}
  .lp .hero p.lead{font-size:1.05rem;color:#cbd5e1;max-width:620px;margin-bottom:20px}
  .lp .hero-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:20px}
  .lp .hero-trust{display:flex;flex-wrap:wrap;gap:24px;color:#94a3b8;font-size:.9rem}
  .lp .hero-trust span{display:inline-flex;align-items:center;gap:6px}
  .lp .hero-trust svg{width:16px;height:16px;color:var(--orange-400)}

  .lp .form-card{
    background:#fff;color:var(--slate-900);
    border-radius:var(--radius-lg);
    padding:24px;
    box-shadow:var(--shadow-lg);
    border:1px solid var(--slate-200);
  }
  .lp .form-card-header{margin-bottom:14px}
  .lp .form-card h3{font-size:1.25rem;font-weight:700;color:var(--navy-900);margin-bottom:4px;letter-spacing:-.01em}
  .lp .form-card .sub{color:var(--slate-600);font-size:.9rem}
  .lp form .field{margin-bottom:10px}
  .lp form label{display:block;font-size:.82rem;font-weight:600;color:var(--slate-700);margin-bottom:4px}
  .lp form input, .lp form select, .lp form textarea{
    width:100%;padding:10px 12px;
    border:1px solid var(--slate-300);
    border-radius:var(--radius);
    font-family:inherit;font-size:.95rem;color:var(--slate-900);
    background:#fff;transition:border-color .15s ease, box-shadow .15s ease;
  }
  .lp form input:focus, .lp form select:focus, .lp form textarea:focus{
    outline:none;border-color:var(--orange-500);
    box-shadow:0 0 0 3px rgba(232,115,26,.15);
  }
  .lp form .row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  @media(max-width:520px){.lp form .row{grid-template-columns:1fr}}
  .lp .form-footer{font-size:.78rem;color:var(--slate-500);margin-top:10px;line-height:1.5}
  .lp .form-success{
    display:none;background:#dcfce7;color:#065f46;
    padding:16px;border-radius:var(--radius);font-weight:600;
    border:1px solid #86efac;margin-top:14px;
  }
  .lp .form-success.show{display:block}

  .lp section{padding:88px 0}
  .lp .section-title{text-align:center;margin-bottom:56px}
  .lp .section-title .kicker{
    display:inline-block;color:var(--orange-500);font-weight:700;
    font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px;
  }
  .lp .section-title h2{
    font-size:clamp(1.7rem,3vw,2.4rem);font-weight:800;
    color:var(--navy-900);letter-spacing:-.02em;line-height:1.2;
  }
  .lp .section-title p{max-width:680px;margin:14px auto 0;color:var(--slate-600);font-size:1.05rem}

  .lp .services{background:#fff}
  .lp .services-grid{display:grid;grid-template-columns:1fr;gap:20px}
  @media(min-width:720px){.lp .services-grid{grid-template-columns:repeat(2,1fr)}}
  @media(min-width:980px){.lp .services-grid{grid-template-columns:repeat(3,1fr)}}
  .lp .service{
    background:#fff;border:1px solid var(--slate-200);
    border-radius:var(--radius-lg);padding:28px;
    transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  }
  .lp .service:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);border-color:var(--orange-400)}
  .lp .service-icon{
    width:48px;height:48px;border-radius:10px;
    background:linear-gradient(135deg,var(--orange-500),var(--orange-400));
    display:flex;align-items:center;justify-content:center;color:#fff;
    margin-bottom:18px;
  }
  .lp .service h3{font-size:1.15rem;font-weight:700;color:var(--navy-900);margin-bottom:8px}
  .lp .service p{color:var(--slate-600);font-size:.95rem}

  .lp .how{background:var(--slate-50)}
  .lp .steps{display:grid;grid-template-columns:1fr;gap:24px;counter-reset:step}
  @media(min-width:720px){.lp .steps{grid-template-columns:repeat(3,1fr)}}
  .lp .step{position:relative;background:#fff;border-radius:var(--radius-lg);padding:32px 28px;border:1px solid var(--slate-200);counter-increment:step}
  .lp .step::before{
    content:counter(step,decimal-leading-zero);
    position:absolute;top:-18px;left:28px;
    background:var(--navy-900);color:var(--orange-400);
    padding:6px 12px;border-radius:6px;
    font-weight:700;font-size:.85rem;letter-spacing:.05em;
  }
  .lp .step h3{font-size:1.15rem;font-weight:700;color:var(--navy-900);margin:8px 0 8px}
  .lp .step p{color:var(--slate-600);font-size:.95rem}

  .lp .faq{background:#fff}
  .lp .faq-list{max-width:820px;margin:0 auto}
  .lp details{border-bottom:1px solid var(--slate-200);padding:20px 0}
  .lp summary{cursor:pointer;font-weight:600;color:var(--navy-900);font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px}
  .lp summary::-webkit-details-marker{display:none}
  .lp summary::after{content:"+";font-size:1.5rem;color:var(--orange-500);font-weight:400;transition:transform .2s}
  .lp details[open] summary::after{transform:rotate(45deg)}
  .lp details p{color:var(--slate-600);margin-top:12px;font-size:.97rem}
`,s=()=>(0,r.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:(0,r.jsx)("polyline",{points:"20 6 9 17 4 12"})}),o=({children:e})=>(0,r.jsx)("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e}),l=[{title:"Unit Turnovers",description:"Paint, patch, clean, ready-for-tenant in days, not weeks. Fewer vacancy days, more rent collected.",icon:(0,r.jsx)(o,{children:(0,r.jsx)("path",{d:"M3 21h18M5 21V7l8-4 8 4v14M9 9h.01M9 12h.01M9 15h.01M9 18h.01M14 9h.01M14 12h.01M14 15h.01M14 18h.01"})})},{title:"Water Damage Restoration",description:"Extraction, drying, reconstruction. After-hours availability, insurance paperwork included.",icon:(0,r.jsx)(o,{children:(0,r.jsx)("path",{d:"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"})})},{title:"Asbestos Testing & Removal",description:"Ontario Reg 278/05 compliant. Protect tenants and protect yourself from legal liability.",icon:(0,r.jsxs)(o,{children:[(0,r.jsx)("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),(0,r.jsx)("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),(0,r.jsx)("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]})},{title:"Painting (Interior + Exterior)",description:"Clean lines, proper prep, fast turnaround. Common areas, units, exteriors, lobbies.",icon:(0,r.jsxs)(o,{children:[(0,r.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),(0,r.jsx)("path",{d:"M3 9h18M9 21V9"})]})},{title:"Drywall & Plaster Repair",description:"Patches, full sheets, stipple ceiling repair. Invisible repairs that don’t telegraph through paint.",icon:(0,r.jsx)(o,{children:(0,r.jsx)("path",{d:"M14.7 6.3l3 3M3 21l3.5-1 13.5-13.5-2.5-2.5L3.5 17.5z"})})},{title:"After-Hours Availability",description:"Pipe burst after the office closes? We pick up. Property emergencies don’t wait until morning.",icon:(0,r.jsxs)(o,{children:[(0,r.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,r.jsx)("polyline",{points:"12 6 12 12 16 14"})]})}];e.s(["default",0,function(){let e=(0,t.useRef)(null),[o,d]=(0,t.useState)(!1),[c,p]=(0,t.useState)(!1),[m,h]=(0,t.useState)(null);async function u(r){if(r.preventDefault(),!e.current)return;h(null),d(!0);let t=Object.fromEntries(new FormData(e.current).entries()),a="u">typeof crypto&&crypto.randomUUID?crypto.randomUUID():`evt-${Date.now()}-${Math.random().toString(36).slice(2,10)}`;t.event_id=a,t.source="meta_ads_landing_b2b",t.submitted_at=new Date().toISOString();let n=i("_fbc"),s=i("_fbp");n&&(t.fbc=n),s&&(t.fbp=s);try{"function"==typeof window.fbq&&window.fbq("track","Lead",{content_name:"B2B Walkthrough",content_category:"Property Management",value:100,currency:"CAD"},{eventID:a});let e=await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw Error(`Submission failed: ${e.status}`);p(!0);let r=document.getElementById("formSuccess");r?.scrollIntoView({behavior:"smooth",block:"center"})}catch(e){console.error(e),h("Sorry — something went wrong submitting the form. Please call (613) 698-0303.")}finally{d(!1)}}return(0,r.jsxs)("div",{className:"lp pt-26",children:[(0,r.jsx)("style",{dangerouslySetInnerHTML:{__html:n}}),(0,r.jsx)("section",{className:"hero",children:(0,r.jsxs)("div",{className:"container hero-grid",children:[(0,r.jsxs)(a.default,{className:"hero-text",children:[(0,r.jsx)("span",{className:"eyebrow",children:"For Ottawa Property Managers"}),(0,r.jsxs)("h1",{children:["Free Building Walkthrough"," ",(0,r.jsx)("span",{className:"accent",children:"+ 24-Hour Quote"})]}),(0,r.jsx)("p",{className:"lead",children:"Stop juggling five contractors. We'll walk your building, flag paint, drywall, asbestos, and water damage issues you didn't know about, and deliver a clear written quote within 24 hours. One vendor. Eight years in Ottawa. 1,000+ projects."}),(0,r.jsxs)("div",{className:"hero-ctas",children:[(0,r.jsx)("a",{href:"#quote",className:"btn btn-primary btn-large",children:"Book My Free Walkthrough"}),(0,r.jsx)("a",{href:"tel:+16136980303",className:"btn btn-ghost btn-large",children:"Call (613) 698-0303"})]}),(0,r.jsxs)("div",{className:"hero-trust",children:[(0,r.jsxs)("span",{children:[(0,r.jsx)(s,{})," Ontario Reg 278/05 compliant"]}),(0,r.jsxs)("span",{children:[(0,r.jsx)(s,{})," After-hours availability"]}),(0,r.jsxs)("span",{children:[(0,r.jsx)(s,{})," Insurance claim assist"]})]})]}),(0,r.jsxs)(a.default,{id:"quote",delay:.2,className:"form-card",children:[(0,r.jsxs)("div",{className:"form-card-header",children:[(0,r.jsx)("h3",{children:"Get your free walkthrough"}),(0,r.jsx)("p",{className:"sub",children:"Takes 30 seconds. We respond within 1 business day."})]}),(0,r.jsxs)("form",{ref:e,onSubmit:u,noValidate:!0,children:[(0,r.jsxs)("div",{className:"field",children:[(0,r.jsx)("label",{htmlFor:"role",children:"Your role *"}),(0,r.jsxs)("select",{id:"role",name:"role",required:!0,defaultValue:"",children:[(0,r.jsx)("option",{value:"",disabled:!0,children:"Select your role"}),(0,r.jsx)("option",{children:"Property Manager"}),(0,r.jsx)("option",{children:"Building Manager / Superintendent"}),(0,r.jsx)("option",{children:"Property Management Company"}),(0,r.jsx)("option",{children:"Other"})]})]}),(0,r.jsxs)("div",{className:"field",children:[(0,r.jsx)("label",{htmlFor:"units",children:"How many units / properties do you manage? *"}),(0,r.jsxs)("select",{id:"units",name:"units",required:!0,defaultValue:"",children:[(0,r.jsx)("option",{value:"",disabled:!0,children:"Select range"}),(0,r.jsx)("option",{children:"1–5 units"}),(0,r.jsx)("option",{children:"6–25 units"}),(0,r.jsx)("option",{children:"26–100 units"}),(0,r.jsx)("option",{children:"100+ units"}),(0,r.jsx)("option",{children:"Other"})]})]}),(0,r.jsxs)("div",{className:"field",children:[(0,r.jsx)("label",{htmlFor:"service",children:"What service do you need? *"}),(0,r.jsxs)("select",{id:"service",name:"service",required:!0,defaultValue:"",children:[(0,r.jsx)("option",{value:"",disabled:!0,children:"Select service"}),(0,r.jsx)("option",{children:"Unit turnover (paint + drywall + cleanup)"}),(0,r.jsx)("option",{children:"Water damage restoration"}),(0,r.jsx)("option",{children:"Asbestos testing / removal"}),(0,r.jsx)("option",{children:"Painting (interior or exterior)"}),(0,r.jsx)("option",{children:"Drywall / plaster repair"}),(0,r.jsx)("option",{children:"Multiple / not sure"})]})]}),(0,r.jsxs)("div",{className:"field",children:[(0,r.jsx)("label",{htmlFor:"timeline",children:"Timeline *"}),(0,r.jsxs)("select",{id:"timeline",name:"timeline",required:!0,defaultValue:"",children:[(0,r.jsx)("option",{value:"",disabled:!0,children:"Select timeline"}),(0,r.jsx)("option",{children:"Urgent (this week)"}),(0,r.jsx)("option",{children:"Within 2 weeks"}),(0,r.jsx)("option",{children:"1–3 months"}),(0,r.jsx)("option",{children:"Just exploring"})]})]}),(0,r.jsxs)("div",{className:"row",children:[(0,r.jsxs)("div",{className:"field",children:[(0,r.jsx)("label",{htmlFor:"name",children:"Full name *"}),(0,r.jsx)("input",{id:"name",name:"name",type:"text",autoComplete:"name",required:!0})]}),(0,r.jsxs)("div",{className:"field",children:[(0,r.jsx)("label",{htmlFor:"company",children:"Company"}),(0,r.jsx)("input",{id:"company",name:"company",type:"text",autoComplete:"organization"})]})]}),(0,r.jsxs)("div",{className:"row",children:[(0,r.jsxs)("div",{className:"field",children:[(0,r.jsx)("label",{htmlFor:"email",children:"Email *"}),(0,r.jsx)("input",{id:"email",name:"email",type:"email",autoComplete:"email",required:!0})]}),(0,r.jsxs)("div",{className:"field",children:[(0,r.jsx)("label",{htmlFor:"phone",children:"Phone *"}),(0,r.jsx)("input",{id:"phone",name:"phone",type:"tel",autoComplete:"tel",required:!0})]})]}),(0,r.jsxs)("div",{className:"field",children:[(0,r.jsx)("label",{htmlFor:"besttime",children:"Best time to reach you"}),(0,r.jsx)("input",{id:"besttime",name:"besttime",type:"text",placeholder:"e.g. weekdays 9–11am"})]}),(0,r.jsx)("button",{type:"submit",className:"btn btn-primary",style:{width:"100%",padding:"14px 24px"},disabled:o||c,children:o?"Submitting…":c?"Thanks — request received":"Book My Free Walkthrough"}),(0,r.jsx)("p",{className:"form-footer",children:"By submitting, you agree to be contacted by Fidan Construction about your inquiry. We never share your information."}),m&&(0,r.jsx)("p",{role:"alert",style:{color:"#b91c1c",background:"#fee2e2",border:"1px solid #fecaca",padding:12,borderRadius:8,marginTop:12,fontSize:".9rem"},children:m}),(0,r.jsx)("div",{id:"formSuccess",className:`form-success${c?" show":""}`,role:"status",children:"Thanks — we received your request. Seyf will reach out within 1 business day."})]})]})]})}),(0,r.jsx)("section",{className:"services",children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsxs)(a.default,{className:"section-title",children:[(0,r.jsx)("span",{className:"kicker",children:"One vendor. Five services."}),(0,r.jsx)("h2",{children:"Everything your building needs, under one roof"}),(0,r.jsx)("p",{children:"Stop chasing five different contractors. From a single vacant unit turnover to a full asbestos abatement, we handle it."})]}),(0,r.jsx)("div",{className:"services-grid",children:l.map((e,t)=>(0,r.jsxs)(a.default,{delay:.1*t,className:"service",children:[(0,r.jsx)("div",{className:"service-icon",children:e.icon}),(0,r.jsx)("h3",{children:e.title}),(0,r.jsx)("p",{children:e.description})]},e.title))})]})}),(0,r.jsx)("section",{className:"how",children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsxs)(a.default,{className:"section-title",children:[(0,r.jsx)("span",{className:"kicker",children:"How it works"}),(0,r.jsx)("h2",{children:"From request to written quote in 24 hours"})]}),(0,r.jsx)("div",{className:"steps",children:[{title:"Submit the form",description:"Tell us your role, building size, and what you need. Takes 30 seconds."},{title:"30-min on-site walkthrough",description:"Seyf or our lead estimator meets you on site, identifies issues, and answers questions."},{title:"Written quote in 24 hours",description:"Clear scope, fixed pricing, realistic timeline. No surprises, no fluff."}].map((e,t)=>(0,r.jsxs)(a.default,{delay:.15*t,className:"step",children:[(0,r.jsx)("h3",{children:e.title}),(0,r.jsx)("p",{children:e.description})]},e.title))})]})}),(0,r.jsx)("section",{className:"faq",children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsxs)(a.default,{className:"section-title",children:[(0,r.jsx)("span",{className:"kicker",children:"FAQ"}),(0,r.jsx)("h2",{children:"Quick answers"})]}),(0,r.jsx)("div",{className:"faq-list",children:[{q:"Is the walkthrough actually free?",a:"Yes — completely free, no obligation. We use it to give you an accurate quote and to see if we’re the right fit. About 30 minutes on site."},{q:"What areas of Ottawa do you cover?",a:"Ottawa metro and surrounding areas — Kanata, Nepean, Orleans, Barrhaven, Gatineau. If you’re within ~50 km of downtown Ottawa, we’ll come to you."},{q:"Do you handle insurance claims for water damage?",a:"Yes. We document the damage, work directly with adjusters, and provide the paperwork your insurer needs."},{q:"How fast can you turn over a vacant unit?",a:"Most standard turnovers (paint, patch, clean) take 3–5 business days. Larger or damaged units take longer; we’ll commit to a timeline in the quote."},{q:"Are you licensed for asbestos work in Ontario?",a:"Yes. We operate in compliance with Ontario Regulation 278/05 — the provincial standard for asbestos testing, containment, and removal."},{q:"Can we get a single quote for multiple buildings?",a:"Yes — we work with property management companies on portfolio-level pricing. Mention this on the form and we’ll structure the proposal accordingly."}].map((e,t)=>(0,r.jsx)(a.default,{delay:.05*t,children:(0,r.jsxs)("details",{children:[(0,r.jsx)("summary",{children:e.q}),(0,r.jsx)("p",{children:e.a})]})},e.q))})]})})]})}])}]);