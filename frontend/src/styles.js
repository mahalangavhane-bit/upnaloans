// styles.js — shared CSS design tokens (inject once in UpnaLoans.jsx)
export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --orange:      #f97316;
    --orange-dark: #c2410c;
    --orange-mid:  #fb923c;
    --orange-light:#fff7ed;
    --orange-faint:#fffbf5;
    --yellow:      #eab308;
    --yellow-light:#fefce8;
    --yellow-mid:  #facc15;
    --yellow-dark: #a16207;
    --brown-dark:  #1a0800;
    --brown-mid:   #2d1200;
    --green:       #16a34a;
    --green-light: #f0fdf4;
    --blue:        #2563eb;
    --blue-light:  #eff6ff;
    --red:         #dc2626;
    --gray-bg:     #fafaf8;
    --text:        #1c1108;
    --muted:       #78716c;
    --border:      #fed7aa;
    --white:       #ffffff;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; color: var(--text); background: var(--white); }

  /* SECTION COMMONS */
  .section { padding: 80px 0; }
  .section-inner { padding: 0 64px; }
  .section-label { display: inline-block; background: var(--yellow-light); color: #92400e; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 12px; border: 1px solid #fed7aa; }
  .section-title { font-family: 'Sora', sans-serif; font-size: 32px; font-weight: 700; color: var(--brown-dark); margin-bottom: 10px; line-height: 1.25; }
  .section-sub { font-size: 15px; color: var(--muted); max-width: 580px; line-height: 1.7; margin-bottom: 48px; }

  /* HERO */
  .hero { background: white; padding: 80px 0 70px; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; top: -120px; right: -120px; width: 520px; height: 520px; border-radius: 50%; background: radial-gradient(circle, rgba(249,115,22,.12) 0%, transparent 70%); pointer-events: none; }
  .hero::after  { content: ''; position: absolute; bottom: -80px; left: -80px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(234,179,8,.1) 0%, transparent 70%); pointer-events: none; }
  .hero-inner { padding: 0 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .hero-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(249,115,22,.12); color: var(--orange-dark); padding: 6px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 600; letter-spacing: .5px; margin-bottom: 22px; text-transform: uppercase; }
  .hero h1 { font-family: 'Sora', sans-serif; font-size: 46px; font-weight: 800; line-height: 1.15; color: var(--brown-dark); margin-bottom: 20px; }
  .hero h1 span { background: linear-gradient(90deg, #f97316, #eab308); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-sub { font-size: 16px; color: #57534e; line-height: 1.7; margin-bottom: 36px; max-width: 480px; }
  .trust-badges { display: flex; gap: 24px; flex-wrap: wrap; }
  .trust-badge { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #57534e; }
  .trust-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; }

  /* HERO FORM */
  .hero-form { background: white; border-radius: 20px; padding: 30px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); border: 1.5px solid #e5e7eb; }
  .form-tabs { display: flex; gap: 6px; margin-bottom: 22px; background: #f8fafc; border-radius: 10px; padding: 4px; }
  .form-tab { flex: 1; padding: 9px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; background: transparent; font-family: 'DM Sans', sans-serif; color: #78716c; transition: all .2s; }
  .form-tab.active { background: linear-gradient(135deg, var(--orange), var(--yellow)); color: white; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
  .form-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
  .form-field label { font-size: 12.5px; font-weight: 500; color: #374151; }
  .form-field input, .form-field select { height: 42px; border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 0 14px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: var(--text); background: white; transition: border-color .2s; outline: none; }
  .form-field input:focus, .form-field select:focus { border-color: var(--orange); }
  .btn-hero { width: 100%; height: 48px; background: linear-gradient(135deg, #f97316, #eab308); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: opacity .2s; box-shadow: 0 4px 16px rgba(249,115,22,.35); }
  .btn-hero:hover { opacity: .92; }
  .form-note { text-align: center; font-size: 12px; color: var(--muted); margin-top: 10px; }

  /* STATS */
  .stats-bar { background: linear-gradient(135deg, #1a0800, #2d1200); padding: 28px 32px; }
  .stats-inner { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .stat-item { text-align: center; }
  .stat-item + .stat-item { border-left: 1px solid rgba(249,115,22,.25); }
  .stat-num { font-family: 'Sora', sans-serif; font-size: 32px; font-weight: 700; background: linear-gradient(90deg, #fb923c, #facc15); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .stat-label { font-size: 13px; color: rgba(255,255,255,.6); margin-top: 4px; }

  /* PRODUCTS */
  .products-section { background: var(--gray-bg); }
  .products-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 14px; padding: 0 64px; }
  .product-card { background: white; border: 1.5px solid #fed7aa; border-radius: 14px; padding: 18px 10px; text-align: center; cursor: pointer; transition: all .2s; display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .product-card:hover { border-color: var(--orange); transform: translateY(-4px); box-shadow: 0 8px 24px rgba(249,115,22,.12); }
  .product-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
  .product-card p { font-size: 12.5px; font-weight: 500; color: #374151; line-height: 1.4; }

  /* BANKS */
  .banks-section { background: white; }
  .banks-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 0 64px; }
  .bank-card { border: 1.5px solid #fed7aa; border-radius: 16px; padding: 22px; transition: all .2s; cursor: pointer; position: relative; }
  .bank-card:hover { border-color: var(--orange); box-shadow: 0 6px 24px rgba(249,115,22,.12); }
  .bank-card.featured { border-color: var(--orange); }
  .bank-best-badge { background: linear-gradient(135deg, #f97316, #eab308); color: white; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; display: inline-block; margin-bottom: 10px; letter-spacing: .5px; }
  .bank-header { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
  .bank-logo { width: 46px; height: 46px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; }
  .bank-name { font-size: 15px; font-weight: 600; color: var(--text); }
  .bank-type { font-size: 12px; color: var(--muted); }
  .bank-rate { font-size: 22px; font-weight: 700; color: var(--green); margin-bottom: 14px; }
  .bank-row { display: flex; justify-content: space-between; margin-bottom: 9px; }
  .bank-meta-label { font-size: 12px; color: var(--muted); }
  .bank-meta-val { font-size: 13px; font-weight: 600; color: var(--text); }
  .bank-meta-val.green { color: var(--green); }
  .apply-bank-btn { width: 100%; height: 38px; background: var(--orange-light); color: var(--orange-dark); border: 1.5px solid #fed7aa; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; margin-top: 14px; font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .apply-bank-btn:hover { background: linear-gradient(135deg, #f97316, #eab308); color: white; border-color: transparent; }
  .view-all-wrap { text-align: center; margin-top: 36px; }
  .btn-view-all { height: 44px; padding: 0 36px; border: 1.5px solid var(--orange); color: var(--orange-dark); background: transparent; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif; }
  .btn-view-all:hover { background: var(--orange-light); }

  /* EMI CALCULATOR */
  .calc-section { background: var(--gray-bg); }
  .calc-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: start; padding: 0 64px; }
  .calc-box { background: white; border-radius: 20px; padding: 36px; box-shadow: 0 4px 24px rgba(249,115,22,.08); border: 1.5px solid #fed7aa; }
  .calc-field { margin-bottom: 28px; }
  .calc-field-label { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; font-weight: 500; }
  .calc-field-label span { font-weight: 700; color: var(--orange); }
  .range-input { width: 100%; -webkit-appearance: none; height: 5px; border-radius: 3px; outline: none; cursor: pointer; }
  .range-input::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, #f97316, #eab308); cursor: pointer; box-shadow: 0 2px 8px rgba(249,115,22,.4); }
  .calc-result { background: linear-gradient(160deg, #1a0800 0%, #2d1200 60%, #1a0500 100%); border-radius: 20px; padding: 36px; color: white; position: relative; overflow: hidden; }
  .calc-result::before { content: ''; position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(249,115,22,.15), transparent 70%); pointer-events: none; }
  .result-label { font-size: 14px; opacity: .7; margin-bottom: 8px; }
  .result-emi { font-family: 'Sora', sans-serif; font-size: 48px; font-weight: 700; letter-spacing: -1px; margin-bottom: 28px; background: linear-gradient(90deg, #fb923c, #facc15); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 22px; }
  .result-item { background: rgba(249,115,22,.12); border: 1px solid rgba(249,115,22,.2); border-radius: 12px; padding: 16px; }
  .result-item-label { font-size: 12px; opacity: .7; margin-bottom: 6px; }
  .result-item-val { font-size: 18px; font-weight: 700; }
  .pie-bar { width: 100%; height: 10px; border-radius: 6px; overflow: hidden; display: flex; margin-bottom: 10px; }
  .pie-principal { background: linear-gradient(90deg, #f97316, #eab308); height: 100%; transition: width .4s; }
  .pie-interest { background: rgba(255,255,255,.18); flex: 1; }
  .pie-legend { display: flex; gap: 20px; }
  .legend-dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
  .legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; opacity: .8; }
  .btn-apply-calc { width: 100%; height: 44px; background: linear-gradient(135deg, rgba(249,115,22,.2), rgba(234,179,8,.15)); color: white; border: 1.5px solid rgba(249,115,22,.4); border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; margin-top: 22px; font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .btn-apply-calc:hover { background: linear-gradient(135deg, #f97316, #eab308); border-color: transparent; }
  .btn-solid { background: linear-gradient(135deg, #f97316, #eab308); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: opacity .2s; box-shadow: 0 4px 14px rgba(249,115,22,.3); }
  .btn-solid:hover { opacity: .92; }

  /* WHY CHOOSE US */
  .why-section { background: white; }
  .why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .why-card { padding: 28px; border-radius: 16px; border: 1.5px solid #fed7aa; transition: all .25s; position: relative; overflow: hidden; }
  .why-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(249,115,22,.04), rgba(234,179,8,.04)); opacity: 0; transition: opacity .25s; border-radius: 16px; }
  .why-card:hover { border-color: var(--orange); transform: translateY(-5px); box-shadow: 0 12px 32px rgba(249,115,22,.1); }
  .why-card:hover::before { opacity: 1; }
  .why-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 18px; }
  .why-card h3 { font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 10px; color: var(--brown-dark); }
  .why-card p { font-size: 14px; color: var(--muted); line-height: 1.65; }

  /* TOOLS */
  .tools-section { background: var(--gray-bg); }
  .tools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .tool-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(249,115,22,.07); border: 1.5px solid #fed7aa; transition: all .2s; }
  .tool-card:hover { transform: translateY(-5px); box-shadow: 0 12px 36px rgba(249,115,22,.14); border-color: var(--orange); }
  .tool-head { padding: 20px 22px; display: flex; align-items: center; gap: 12px; }
  .tool-head h3 { font-size: 16px; font-weight: 600; font-family: 'Sora', sans-serif; }
  .tool-head-emi  { background: linear-gradient(135deg, #fff7ed, #fefce8); color: var(--orange-dark); }
  .tool-head-elig { background: #e8f7ef; color: var(--green); }
  .tool-head-inv  { background: var(--blue-light); color: var(--blue); }
  .tool-body { padding: 6px 10px 16px; }
  .tool-item { display: flex; justify-content: space-between; align-items: center; padding: 13px 12px; border-bottom: 1px solid #fff7ed; font-size: 14px; cursor: pointer; border-radius: 8px; transition: all .15s; color: #374151; }
  .tool-item:last-child { border-bottom: none; }
  .tool-item:hover { background: #fff7ed; color: var(--orange); }

  /* PROCESS */
  .process-section { background: white; }
  .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; position: relative; }
  .steps-grid::before { content: ''; position: absolute; top: 32px; left: 12%; right: 12%; height: 2px; background: repeating-linear-gradient(90deg, #f97316 0, #f97316 8px, transparent 8px, transparent 16px); z-index: 0; }
  .step-card { text-align: center; position: relative; z-index: 1; }
  .step-num { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #f97316, #eab308); color: white; font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; box-shadow: 0 4px 16px rgba(249,115,22,.35); }
  .step-card h3 { font-size: 15px; font-weight: 600; margin-bottom: 8px; color: var(--brown-dark); font-family: 'Sora', sans-serif; }
  .step-card p { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* TESTIMONIALS */
  .testi-section { background: linear-gradient(160deg, #1a0800 0%, #2d1200 50%, #1a0500 100%); padding: 80px 32px; position: relative; overflow: hidden; }
  .testi-section::before { content: ''; position: absolute; top: -100px; right: -100px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(249,115,22,.12), transparent 70%); pointer-events: none; }
  .testi-header { text-align: center; margin-bottom: 50px; }
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .testi-card { background: rgba(249,115,22,.07); border: 1px solid rgba(249,115,22,.2); border-radius: 16px; padding: 28px; transition: all .2s; }
  .testi-card:hover { background: rgba(249,115,22,.12); border-color: rgba(249,115,22,.4); transform: translateY(-3px); }
  .stars { color: #eab308; font-size: 14px; margin-bottom: 14px; letter-spacing: 2px; }
  .testi-text { font-size: 14.5px; color: rgba(255,255,255,.82); line-height: 1.7; margin-bottom: 20px; }
  .testi-author { display: flex; align-items: center; gap: 12px; }
  .testi-avatar { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0; }
  .testi-name { font-size: 14px; font-weight: 600; color: white; }
  .testi-city { font-size: 12px; color: rgba(255,255,255,.5); }

  /* CTA BANNER */
  .cta-banner { background: linear-gradient(135deg, #f97316, #eab308); padding: 72px 32px; text-align: center; position: relative; overflow: hidden; }
  .cta-banner::before { content: ''; position: absolute; top: -80px; left: -80px; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,.08); pointer-events: none; }
  .cta-banner::after  { content: ''; position: absolute; bottom: -80px; right: -80px; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,.06); pointer-events: none; }
  .cta-banner h2 { font-family: 'Sora', sans-serif; font-size: 36px; font-weight: 700; color: white; margin-bottom: 14px; position: relative; z-index: 1; }
  .cta-banner p { color: rgba(255,255,255,.9); font-size: 16px; margin-bottom: 36px; position: relative; z-index: 1; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }
  .cta-primary { height: 52px; padding: 0 36px; background: var(--brown-dark); color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: opacity .2s; }
  .cta-primary:hover { opacity: .88; }
  .cta-secondary { height: 52px; padding: 0 36px; background: transparent; color: white; border: 2px solid rgba(255,255,255,.7); border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background .2s; }
  .cta-secondary:hover { background: rgba(255,255,255,.15); }

  /* RESPONSIVE */
  @media (max-width: 1100px) { .products-grid { grid-template-columns: repeat(4, 1fr); } }
  @media (max-width: 900px) {
    .hero-inner { grid-template-columns: 1fr; }
    .hero h1 { font-size: 34px; }
    .stats-inner { grid-template-columns: repeat(2, 1fr); }
    .stat-item + .stat-item { border-left: none; }
    .banks-grid { grid-template-columns: 1fr 1fr; }
    .calc-wrapper { grid-template-columns: 1fr; }
    .why-grid { grid-template-columns: 1fr 1fr; }
    .tools-grid { grid-template-columns: 1fr; }
    .steps-grid { grid-template-columns: 1fr 1fr; }
    .steps-grid::before { display: none; }
    .testi-grid { grid-template-columns: 1fr; }
    .products-grid { grid-template-columns: repeat(4, 1fr); }
  }
  @media (max-width: 580px) {
    .banks-grid, .why-grid, .steps-grid { grid-template-columns: 1fr; }
    .products-grid { grid-template-columns: repeat(2, 1fr); }
    .form-row { grid-template-columns: 1fr; }
    .section-title { font-size: 26px; }
    .result-emi { font-size: 36px; }
  }
`;

export function fmtINR(n) {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(1) + " Cr";
  if (n >= 100000)   return "₹" + (n / 100000).toFixed(1) + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
