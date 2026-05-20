"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

type Post = {
  src: string;
  alt: string;
  title: string;
  meta: string;
  pages: string;
  live?: boolean;
  film: string;
};

const POSTS: ReadonlyArray<Post> = [
  {
    src: "/portfolio/northern-pathways/social/carousel-04/01.png",
    alt: "Levels Plan 2026–2028 carousel post",
    title: "Levels Plan · 2026–2028",
    meta: "tr · levels plan · 9-slide carousel",
    pages: "1 / 9",
    film: "Express Entry & PNP",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-05/01.png",
    alt: "Study permit visa officer carousel post",
    title: "Vize memuru · neye bakar?",
    meta: "tr · study permit · NP × EduPathways",
    pages: "1 / 8",
    film: "Temporary Residence",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-07/01.png",
    alt: "Ontario OINP carousel post",
    title: "Ontario · OINP yeni programlar",
    meta: "tr · OINP · Bill 30 · 2025",
    pages: "1 / 6",
    film: "Express Entry & PNP",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-01/01.png",
    alt: "Express Entry consultation carousel post",
    title: "Express Entry · kamuoyu görüşü",
    meta: "tr · IRCC · Apr–May 2026",
    pages: "1 / 6",
    film: "Express Entry & PNP",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-08/01.png",
    alt: "OINP March 2026 carousel post",
    title: "OINP · 18 Mart davet turu",
    meta: "tr · ontario · 2026",
    pages: "1 / 6",
    film: "Express Entry & PNP",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-02/01.png",
    alt: "Super Visa update carousel post",
    title: "Süper Vize · gelir esnekliği",
    meta: "tr · super visa · 2026",
    pages: "1 / 4",
    film: "Family Connect",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-03/01.png",
    alt: "Doctor immigration carousel post",
    title: "Doktor açığı · yeni adımlar",
    meta: "tr · healthcare · RCIC note",
    pages: "1 / 4",
    film: "Express Entry & PNP",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-06/01.png",
    alt: "Yeni Yaşam seminar carousel post",
    title: "Yeni Yaşam · Ankara & İstanbul",
    meta: "tr · seminar · 13 / 20 Ekim",
    pages: "1 / 3",
    film: "Family Connect",
  },
  {
    src: "/portfolio/northern-pathways/social/post-09.png",
    alt: "PGWP webinar single post",
    title: "Webinar · PGWP rules",
    meta: "tr · 22 Aralık 25 · Burcu Akyol",
    pages: "Live",
    live: true,
    film: "Temporary Residence",
  },
  {
    src: "/portfolio/northern-pathways/social/post-10.png",
    alt: "Levels Plan webinar single post",
    title: "Webinar · Levels Plan PR",
    meta: "tr · 11 Kasım 25 · Burcu Akyol",
    pages: "Live",
    live: true,
    film: "Express Entry & PNP",
  },
];

const LIVE_URL = "https://northernpathways.ca/";
const TOTAL = POSTS.length;

/* ============================================================
   Static mockup components — declared at module scope so React
   doesn't recreate them on every render of the parent page.
   None of them depend on parent state.
============================================================ */

function Website() {
  return (
    <article className="np-site">
      <nav className="np-site-nav">
        <span className="logo">
          <Image
            src="/portfolio/northern-pathways/logo/np-mark.png"
            alt=""
            width={42}
            height={42}
          />
          <span className="word">
            NORTHERN PATHWAYS
            <small>IMMIGRATION CONSULTING</small>
          </span>
        </span>
        <nav className="menu">
          <span className="on">Home</span>
          <span>Our Team</span>
          <span>Services</span>
          <span>Tools</span>
          <span>Fees</span>
          <span>Events</span>
          <span>Blog</span>
        </nav>
        <div className="right">
          <span className="lang">
            <span className="on">EN</span>
            <span>TR</span>
          </span>
          <span className="cta">Book a Consultation</span>
        </div>
      </nav>

      <header className="np-site-hero">
        <div className="text">
          <p className="eb">— Northern Pathways · RCIC-IRB —</p>
          <h2>
            Guiding your <em>Canadian immigration journey</em> with
            competence, care, and clarity.
          </h2>
          <p>
            Welcome to Northern Pathways — an immigration practice led by{" "}
            <b>Burcu Akyol, RCIC-IRB</b>. Eligibility assessments, strategic
            guidance, and legal representation for permanent residency, study
            permits, and family sponsorship.
          </p>
          <div className="ctas">
            <span className="p">Book a Consultation</span>
            <span className="s">Try the Calculator</span>
          </div>
        </div>
        <aside className="photo">
          <div className="ph">
            <Image
              src="/portfolio/northern-pathways/people/burcu-akyol.jpg"
              alt="Burcu Akyol"
              fill
              sizes="(max-width: 880px) 60vw, 220px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="who">
            <h4>Burcu Akyol</h4>
            <p>RCIC-IRB · Principal</p>
          </div>
        </aside>
      </header>

      <section className="np-site-services">
        <p className="lbl">— What we handle</p>
        <h3>
          Five practice areas. <em>One regulated counsel</em> on every file.
        </h3>
        <div className="row">
          <div>
            <p className="n">№ 01</p>
            <p className="t">Express Entry & PNP</p>
          </div>
          <div>
            <p className="n">№ 02</p>
            <p className="t">Family Sponsorship</p>
          </div>
          <div>
            <p className="n">№ 03</p>
            <p className="t">Study & Work Permits</p>
          </div>
          <div>
            <p className="n">№ 04</p>
            <p className="t">PR Card Renewal</p>
          </div>
          <div>
            <p className="n">№ 05</p>
            <p className="t">Citizenship</p>
          </div>
        </div>
      </section>

      <footer className="np-site-foot">
        <span className="left">
          © 2026 Northern Pathways Immigration Consulting · All Rights Reserved.
        </span>
        <span className="credit">
          Designed & developed by <b>Frame Flow</b>
        </span>
      </footer>
    </article>
  );
}

function Crs() {
  return (
    <div className="np-crs">
      <div className="calc-stage" data-anim="on">
        {/* FORM VIEW ------------------------------------------ */}
        <div className="view form">
          <div className="form-grid">
            <aside className="calc-sidebar">
              <h4>Assessment Factors</h4>
              <ul>
                <li className="blue"   data-step="1"><span className="ic">👤</span><span className="nm">Age</span><span className="ind"><span className="spin" /><span className="check">✓</span></span></li>
                <li className="pink"   data-step="2"><span className="ic">💍</span><span className="nm">Marital Status</span><span className="ind"><span className="spin" /><span className="check">✓</span></span></li>
                <li className="red"    data-step="3"><span className="ic">🎓</span><span className="nm">Education</span><span className="ind"><span className="spin" /><span className="check">✓</span></span></li>
                <li className="blue"   data-step="4"><span className="ic">🗣️</span><span className="nm">Language Proficiency</span><span className="ind"><span className="spin" /><span className="check">✓</span></span></li>
                <li className="green"  data-step="5"><span className="ic">💼</span><span className="nm">Work Experience</span><span className="ind"><span className="spin" /><span className="check">✓</span></span></li>
                <li className="purple" data-step="6"><span className="ic">⭐</span><span className="nm">Additional Factors</span><span className="ind"><span className="spin" /><span className="check">✓</span></span></li>
              </ul>
            </aside>

            <main className="calc-panel">
              {/* Pane 1 · Age */}
              <div className="pane p1">
                <div className="head"><span className="av blue">👤</span><h2>Age</h2></div>
                <label>How old are you? <span className="req">*</span></label>
                <div className="select s1"><span className="placeholder">Select</span><span className="picked">32 years old</span></div>
                <div className="pane-foot"><span className="btn-next">Next →</span></div>
              </div>

              {/* Pane 2 · Marital Status */}
              <div className="pane p2">
                <div className="head"><span className="av pink">💍</span><h2>Marital Status</h2></div>
                <label>Are you married or in a common-law relationship? <span className="req">*</span></label>
                <div className="select s2"><span className="placeholder">Select</span><span className="picked">Married — spouse not accompanying</span></div>
                <div className="pane-foot"><span className="btn-next">Next →</span></div>
              </div>

              {/* Pane 3 · Education */}
              <div className="pane p3">
                <div className="head"><span className="av red">🎓</span><h2>Education</h2></div>
                <label>What is your highest level of education? <span className="req">*</span></label>
                <div className="select s3"><span className="placeholder">Select</span><span className="picked">Master&rsquo;s degree — ECA verified</span></div>
                <div className="pane-foot"><span className="btn-next">Next →</span></div>
              </div>

              {/* Pane 4 · Language Proficiency */}
              <div className="pane p4">
                <div className="head"><span className="av blue">🗣️</span><h2>Language Proficiency</h2></div>
                <div className="info-card blue"><b>First official language (English)</b> — CLB across all four skills.</div>
                <div className="row">
                  <div>
                    <label>Speaking</label>
                    <div className="select s4a"><span className="placeholder">Select</span><span className="picked">CLB 9</span></div>
                  </div>
                  <div>
                    <label>Listening</label>
                    <div className="select s4b"><span className="placeholder">Select</span><span className="picked">CLB 9</span></div>
                  </div>
                  <div>
                    <label>Reading</label>
                    <div className="select s4c"><span className="placeholder">Select</span><span className="picked">CLB 9</span></div>
                  </div>
                  <div>
                    <label>Writing</label>
                    <div className="select s4d"><span className="placeholder">Select</span><span className="picked">CLB 9</span></div>
                  </div>
                </div>
                <div className="pane-foot"><span className="btn-next">Next →</span></div>
              </div>

              {/* Pane 5 · Work Experience */}
              <div className="pane p5">
                <div className="head"><span className="av green">💼</span><h2>Work Experience</h2></div>
                <label>Foreign work experience (NOC TEER 0–3) <span className="req">*</span></label>
                <div className="select s5a"><span className="placeholder">Select</span><span className="picked">3+ years — skilled, paid</span></div>
                <label>Canadian work experience</label>
                <div className="select s5b"><span className="placeholder">Select</span><span className="picked">1 year — full-time</span></div>
                <div className="pane-foot"><span className="btn-next">Next →</span></div>
              </div>

              {/* Pane 6 · Additional Factors */}
              <div className="pane p6">
                <div className="head"><span className="av purple">⭐</span><h2>Additional Factors</h2></div>
                <label>Provincial nomination</label>
                <div className="select s6a"><span className="placeholder">Select</span><span className="picked">None</span></div>
                <label>Study in Canada</label>
                <div className="select s6b"><span className="placeholder">Select</span><span className="picked">1–2 year credential</span></div>
                <div className="pane-foot"><span className="btn-next">Calculate →</span></div>
              </div>
            </main>
          </div>

          {/* CTA + progress */}
          <div className="calc-cta-wrap">
            <span className="calc-cta"><span className="ic">🖩</span> Calculate My CRS Score →</span>
            <p className="calc-progress">
              Form progress:{" "}
              <span className="pct">
                <span className="v" data-v="0">0%</span>
                <span className="v" data-v="13">13%</span>
                <span className="v" data-v="27">27%</span>
                <span className="v" data-v="40">40%</span>
                <span className="v" data-v="60">60%</span>
                <span className="v" data-v="75">75%</span>
                <span className="v" data-v="100">100%</span>
              </span>
            </p>
            <div className="calc-progress-bar"><span /></div>
          </div>
        </div>

        {/* RESULTS VIEW ---------------------------------------- */}
        <div className="view results">
          <div className="results-card">
            <div className="results-head">
              <h2>Your CRS Score</h2>
              <p>Comprehensive Ranking System Score Breakdown</p>
            </div>
            <div className="results-score">
              <div className="score-circle">
                <div><div className="num">524</div><div className="lbl">Points</div></div>
              </div>
              <p className="results-total">Total CRS Score</p>
            </div>
            <div className="results-grid-wrap">
              <p className="grid-head">Score Breakdown</p>
              <div className="results-grid">

                <article className="c-core">
                  <div className="top"><h5>Core / Human capital factors</h5><span className="score">421</span></div>
                  <ul>
                    <li>Age = 110</li>
                    <li>Level of education = 135</li>
                    <li>Official Languages = 136</li>
                    <li className="indent">· First Official Language = 136</li>
                    <li className="indent">· Second Official Language = 0</li>
                    <li>Canadian work experience = 40</li>
                    <li className="subtotal">Subtotal — Core / Human capital factors = 421</li>
                  </ul>
                </article>

                <article className="c-spouse">
                  <div className="top"><h5>Spouse factors</h5><span className="score">0</span></div>
                  <ul>
                    <li>Level of education = 0</li>
                    <li>First Official Languages = 0</li>
                    <li>Canadian work experience = 0</li>
                    <li className="subtotal">Subtotal — Spouse factors = 0</li>
                  </ul>
                </article>

                <article className="c-trans">
                  <div className="top"><h5>Skill transferability factors</h5><span className="score">88</span></div>
                  <ul>
                    <li><b>Education (max 50)</b></li>
                    <li className="indent">A) Language &amp; education = 50</li>
                    <li className="indent">B) Canadian exp &amp; education = 25</li>
                    <li className="indent italic">Subtotal = 50</li>
                    <li><b>Foreign work experience (max 50)</b></li>
                    <li className="indent">A) Language &amp; foreign exp = 25</li>
                    <li className="indent">B) Canadian &amp; foreign exp = 13</li>
                    <li className="indent italic">Subtotal = 38</li>
                    <li>Certificate of qualification = 0</li>
                    <li className="subtotal italic">Subtotal — Skill transferability = 88</li>
                  </ul>
                </article>

                <article className="c-add">
                  <div className="top"><h5>Additional points (max 600)</h5><span className="score">15</span></div>
                  <ul>
                    <li>Provincial nomination = 0</li>
                    <li>Study in Canada = 15</li>
                    <li>Sibling in Canada = 0</li>
                    <li>French-language skills = 0</li>
                    <li className="subtotal">Subtotal — Additional points = 15</li>
                  </ul>
                </article>

              </div>
            </div>
            <div className="results-foot">
              <button type="button" className="btn ghost">Hide Results</button>
              <button type="button" className="btn red">Calculate New Score →</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Fswp() {
  return (
    <div className="np-fswp">
      <div className="calc-stage" data-anim="on">
        {/* FORM VIEW ------------------------------------------ */}
        <div className="view form">
          <div className="form-grid">
            <aside className="calc-sidebar">
              <h4>Assessment Factors</h4>
              <ul>
                <li className="blue"   data-step="1"><span className="ic">🗣️</span><span className="nm">Language Skills</span><span className="ind"><span className="spin" /><span className="check">✓</span></span></li>
                <li className="green"  data-step="2"><span className="ic">🎓</span><span className="nm">Education</span><span className="ind"><span className="spin" /><span className="check">✓</span></span></li>
                <li className="orange" data-step="3"><span className="ic">💼</span><span className="nm">Skilled Work</span><span className="ind"><span className="spin" /><span className="check">✓</span></span></li>
                <li className="pink"   data-step="4"><span className="ic">👤</span><span className="nm">Age</span><span className="ind"><span className="spin" /><span className="check">✓</span></span></li>
                <li className="purple" data-step="5"><span className="ic">🏢</span><span className="nm">Arranged Employment</span><span className="ind"><span className="spin" /><span className="check">✓</span></span></li>
                <li className="yellow" data-step="6"><span className="ic">⭐</span><span className="nm">Adaptability</span><span className="ind"><span className="spin" /><span className="check">✓</span></span></li>
              </ul>
            </aside>

            <main className="calc-panel">
              {/* Pane 1 · Language Proficiency */}
              <div className="pane p1">
                <div className="head"><span className="av blue">🗣️</span><h2>Language Proficiency</h2></div>

                <div className="alert">
                  <span className="ai">!</span>
                  <div><b>Important Notice</b><br />Warning: Below CLB 7 — Not eligible to apply</div>
                </div>

                <div className="dual-test">
                  <div className="test-card blue">
                    <h6><span className="num">1</span>Language Test — 1</h6>
                    <p className="hint">Which language test have you taken, or do you plan to take?<span className="req">&nbsp;*</span></p>
                    <div className="select fs1"><span className="placeholder">Select test</span><span className="picked">CELPIP-G</span></div>
                    <p className="scores-head">Language scores below</p>
                    <div className="skill-grid">
                      <div>
                        <label>Listening *</label>
                        <div className="select fs1a"><span className="placeholder">Select</span><span className="picked">10-12 (CLB 10)</span></div>
                      </div>
                      <div>
                        <label>Speaking *</label>
                        <div className="select fs1b"><span className="placeholder">Select</span><span className="picked">10-12 (CLB 10)</span></div>
                      </div>
                      <div>
                        <label>Reading *</label>
                        <div className="select fs1c"><span className="placeholder">Select</span><span className="picked">10-12 (CLB 10)</span></div>
                      </div>
                      <div>
                        <label>Writing *</label>
                        <div className="select fs1d"><span className="placeholder">Select</span><span className="picked">10-12 (CLB 10)</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="test-card green">
                    <h6><span className="num">2</span>Language Test — 2</h6>
                    <p className="hint">
                      Use this option only if you want to include a second language
                      test (English or French). If you do not plan to include one, you
                      may leave this section blank.
                    </p>
                    <div className="select fs1e"><span className="placeholder">Select</span><span className="picked">None or not applicable</span></div>
                  </div>
                </div>

                <div className="pane-foot"><span className="btn-next">Next →</span></div>
              </div>

              {/* Pane 2 · Education */}
              <div className="pane p2">
                <div className="head"><span className="av green">🎓</span><h2>Education</h2></div>
                <label>What is your highest level of education? <span className="req">*</span></label>
                <div className="select fs2"><span className="placeholder">Select</span><span className="picked">Master&rsquo;s degree</span></div>
                <div className="info-card green">
                  <b>Per IRCC grid.</b> Doctorate = 25 · Master&rsquo;s or professional degree = 23 ·
                  two or more credentials (one 3+ years) = 22 · bachelor = 21.
                </div>
                <div className="pane-foot"><span className="btn-next">Next →</span></div>
              </div>

              {/* Pane 3 · Skilled Work */}
              <div className="pane p3">
                <div className="head"><span className="av orange">💼</span><h2>Skilled Work Experience</h2></div>
                <label>How many years of skilled work experience do you have? <span className="req">*</span></label>
                <div className="select fs3"><span className="placeholder">Select</span><span className="picked">2–3 years</span></div>
                <div className="info-card orange">
                  <b>NOC TEER 0, 1, 2 or 3 only.</b> Continuous paid work in the last
                  ten years. Maximum 15 points at 6+ years; 1 year = 9 points.
                </div>
                <div className="pane-foot"><span className="btn-next">Next →</span></div>
              </div>

              {/* Pane 4 · Age */}
              <div className="pane p4">
                <div className="head"><span className="av pink">👤</span><h2>Age</h2></div>
                <label>What is your age? <span className="req">*</span></label>
                <div className="select fs4"><span className="placeholder">Select</span><span className="picked">18–35 years</span></div>
                <div className="info-card pink">
                  <b>Peak window.</b> 18–35 awards the full 12 points; one point drops
                  for each year from 36 onward, reaching 0 at age 47+.
                </div>
                <div className="pane-foot"><span className="btn-next">Next →</span></div>
              </div>

              {/* Pane 5 · Arranged Employment */}
              <div className="pane p5">
                <div className="head"><span className="av purple">🏢</span><h2>Arranged Employment</h2></div>
                <label>Do you have a valid job offer from a Canadian employer? <span className="req">*</span></label>
                <div className="select fs5"><span className="placeholder">Select</span><span className="picked">No</span></div>
                <div className="info-card purple">
                  <b>Requires a positive LMIA</b>, or an LMIA-exempt offer that meets
                  IRCC&rsquo;s employer compliance criteria. All-or-nothing: <b>0 or 10</b>.
                </div>
                <div className="pane-foot"><span className="btn-next">Next →</span></div>
              </div>

              {/* Pane 6 · Adaptability */}
              <div className="pane p6">
                <div className="head"><span className="av yellow">⭐</span><h2>Adaptability</h2></div>
                <label>Select all factors that apply — cap of 10 points total:</label>
                <div className="check-list">
                  <div className="ck-item" data-c="1">
                    <span className="box">✓</span>
                    <span className="lbl">Previous Canadian study (1+ years)</span>
                    <span className="pts">+5</span>
                  </div>
                  <div className="ck-item" data-c="2">
                    <span className="box">✓</span>
                    <span className="lbl">Previous Canadian work (1+ years)</span>
                    <span className="pts">+10</span>
                  </div>
                  <div className="ck-item" data-c="3">
                    <span className="box">✓</span>
                    <span className="lbl">Relatives in Canada (citizen or PR)</span>
                    <span className="pts">+5</span>
                  </div>
                </div>
                <div className="info-card yellow">
                  <b>Cap at 10.</b> Stack as many factors as apply — the total still
                  won&rsquo;t exceed 10 points toward your FSWP score.
                </div>
                <div className="pane-foot"><span className="btn-next">Calculate →</span></div>
              </div>
            </main>
          </div>

          <div className="calc-cta-wrap">
            <span className="calc-cta"><span className="ic">🖩</span> Calculate FSWP Score →</span>
            <p className="calc-progress">
              Form progress:{" "}
              <span className="pct">
                <span className="v" data-v="0">0%</span>
                <span className="v" data-v="13">13%</span>
                <span className="v" data-v="27">27%</span>
                <span className="v" data-v="40">40%</span>
                <span className="v" data-v="60">60%</span>
                <span className="v" data-v="75">75%</span>
                <span className="v" data-v="100">100%</span>
              </span>
            </p>
            <div className="calc-progress-bar"><span /></div>
          </div>
        </div>

        {/* RESULTS VIEW ---------------------------------------- */}
        <div className="view results">
          <div className="results-card">
            <div className="results-head">
              <h2>Your FSWP Score Results</h2>
              <p>Federal Skilled Worker Program Score Breakdown</p>
            </div>
            <div className="results-score">
              <div className="score-circle">
                <div><div className="num">78</div><div className="lbl">Points</div></div>
              </div>
              <p className="results-total">Total FSWP Score</p>
            </div>
            <div className="results-grid-wrap">
              <div className="note-eligibility">
                <b>Note:</b> To be eligible for the Federal Skilled Worker Program, you
                must score at least <b>67 points</b> and meet all program requirements.
              </div>
              <p className="grid-head">Score Breakdown</p>
              <div className="results-grid-fswp">

                <article className="t-lang">
                  <span className="lbl">Language skills<small>(maximum 28 points)</small></span>
                  <span className="num">24</span>
                </article>

                <article className="t-adapt">
                  <span className="lbl">Adaptability<small>(maximum 10 points)</small></span>
                  <span className="num">10</span>
                </article>

                <article className="t-edu">
                  <span className="lbl">Education<small>(maximum 25 points)</small></span>
                  <span className="num">23</span>
                </article>

                <article className="t-emp">
                  <span className="lbl">Arranged employment in Canada<small>(maximum 10 points)</small></span>
                  <span className="num">0</span>
                </article>

                <article className="t-work">
                  <span className="lbl">Skilled work experience<small>(maximum 15 points)</small></span>
                  <span className="num">9</span>
                </article>

                <article className="t-age">
                  <span className="lbl">Age<small>(maximum 12 points)</small></span>
                  <span className="num">12</span>
                </article>

              </div>
            </div>
            <div className="results-foot">
              <button type="button" className="btn ghost">Hide Results</button>
              <button type="button" className="btn red">Calculate New Score →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Draws() {
  const rows: ReadonlyArray<{
    id: string;
    date: string;
    type: string;
    cls: string;
    inv: string;
    cut: string;
    trendDir: "down" | "up";
    trendPct: string;
  }> = [
    { id: "#411", date: "May 11, 2026",   type: "Provincial Nominee Program",      cls: "p-pnp",    inv: "380",   cut: "798", trendDir: "down", trendPct: "3%"  },
    { id: "#414", date: "April 29, 2026", type: "French Language proficiency (Version 2)", cls: "p-fr", inv: "4,000", cut: "400", trendDir: "down", trendPct: "16%" },
    { id: "#418", date: "April 28, 2026", type: "Canadian Experience Class",       cls: "p-cec",    inv: "2,000", cut: "514", trendDir: "down", trendPct: "2%"  },
    { id: "#412", date: "April 27, 2026", type: "Provincial Nominee Program",      cls: "p-pnp",    inv: "473",   cut: "795", trendDir: "down", trendPct: "4%"  },
    { id: "#411", date: "April 15, 2026", type: "French Language proficiency (Version 2)", cls: "p-fr", inv: "4,000", cut: "429", trendDir: "up",   trendPct: "7%"  },
    { id: "#428", date: "April 14, 2026", type: "Canadian Experience Class",       cls: "p-cec",    inv: "2,000", cut: "515", trendDir: "down", trendPct: "3%"  },
    { id: "#409", date: "April 13, 2026", type: "Provincial Nominee Program",      cls: "p-pnp",    inv: "324",   cut: "786", trendDir: "down", trendPct: "4%"  },
    { id: "#408", date: "April 2, 2026",  type: "Trades Occupations, 2026 Version 2", cls: "p-tr", inv: "3,000", cut: "477", trendDir: "down", trendPct: "7%"  },
    { id: "#487", date: "March 31, 2026", type: "Canadian Experience Class",       cls: "p-cec",    inv: "2,250", cut: "509", trendDir: "down", trendPct: "4%"  },
    { id: "#486", date: "March 30, 2026", type: "Provincial Nominee Program",      cls: "p-pnp",    inv: "356",   cut: "802", trendDir: "up",   trendPct: "1%"  },
  ];

  const chips: ReadonlyArray<{ name: string; count: number; on?: boolean }> = [
    { name: "All Draws", count: 350, on: true },
    { name: "General",   count: 59  },
    { name: "PNP",       count: 97  },
    { name: "CEC",       count: 26  },
    { name: "French",    count: 40  },
    { name: "Healthcare",count: 14  },
    { name: "Trade",     count: 9   },
    { name: "Other",     count: 15  },
    { name: "Transport", count: 2   },
    { name: "Education", count: 3   },
    { name: "FSW",       count: 32  },
  ];

  return (
    <div className="np-draws">
      <header className="dr-banner">
        <div className="dr-banner-l">
          <span className="dr-bi">📅</span>
          <div className="dr-banner-t">
            <h4>Latest Express Entry Draws</h4>
            <p>Real-time draw information</p>
          </div>
        </div>
        <span className="dr-banner-r" aria-hidden="true">×</span>
      </header>

      <div className="dr-toolbar">
        <p className="dr-toolbar-lbl">Filter by Type</p>
        <div className="dr-chips">
          {chips.map((c) => (
            <span key={c.name} className={`dr-chip${c.on ? " on" : ""}`}>
              {c.name} <em>{c.count}</em>
            </span>
          ))}
        </div>
        <div className="dr-view">
          <span className="dr-vw on">⊞ LEDGER</span>
          <span className="dr-vw">📈 TRENDS</span>
        </div>
      </div>

      <div className="dr-pag">
        <span className="dr-pag-prev">‹ Previous</span>
        <span className="dr-pag-page">Page <b>1</b> of 17</span>
        <span className="dr-pag-next">Next ›</span>
        <span className="dr-pag-info">Showing <b>10</b> of <b>156</b> draws</span>
      </div>

      <div className="dr-table-wrap">
        <table className="dr-table">
          <thead>
            <tr>
              <th>Round #</th>
              <th>Date</th>
              <th>Type</th>
              <th className="r">Invitations</th>
              <th className="r">CRS Score</th>
              <th className="r">Trend</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={`${row.id}-${i}`}>
                <td><span className="dr-id">{row.id}</span></td>
                <td className="dim">{row.date}</td>
                <td>
                  <span className={`dr-pill ${row.cls}`}>{row.type}</span>
                </td>
                <td className="r dim">
                  <span className="dr-inv">
                    <span className="eye" aria-hidden="true">⊙</span>
                    {row.inv}
                  </span>
                </td>
                <td className="r">
                  <span className="dr-score">
                    <span className="arr" aria-hidden="true">↘</span>
                    {row.cut}
                  </span>
                </td>
                <td className="r">
                  <span className={`dr-trend ${row.trendDir}`}>
                    {row.trendDir === "down" ? "+ " : "− "}
                    {row.trendPct} {row.trendDir}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="dr-foot">
        <span>Stay updated with the latest immigration draws.</span>
        <button type="button" className="dr-refresh">↻ Refresh</button>
      </footer>
    </div>
  );
}

/* ============================================================
   The page itself — state, key handling, and the rendered
   case-study layout.
============================================================ */
export function NorthernPathwaysPage({ client }: Props) {
  const frameNumber = getFrameNumber(client);

  /* MODAL — image lightbox for the social posts only */
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const isOpen = modalIndex !== null;
  const activePost = isOpen ? POSTS[modalIndex] : null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalIndex(null);
      } else if (e.key === "ArrowLeft") {
        setModalIndex((i) =>
          i === null ? null : (i - 1 + TOTAL) % TOTAL
        );
      } else if (e.key === "ArrowRight") {
        setModalIndex((i) =>
          i === null ? null : (i + 1) % TOTAL
        );
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <LoadingTransition
        frameNumber={frameNumber}
        clientName={client.name}
        scope={client.services}
        location={client.location}
        year={client.year}
      />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&display=swap"
      />

      <div className="np-page">
        {/* TOP RAIL ---------------------------------------------- */}
        <header className="np-rail">
          <Link href="/portfolio" className="np-rail-back">
            ← Portfolio
          </Link>
          <span className="np-rail-center">
            NORTHERN PATHWAYS · CASE STUDY
          </span>
          <span className="np-rail-meta">
            FrameFlow · Reel <b>{frameNumber}</b> · 2026
          </span>
        </header>

        {/* HERO ----------------------------------------------- */}
        <section className="np-hero">
          <div className="np-hero-inner">
            <div className="np-hero-logo">
              <Image
                src="/portfolio/northern-pathways/logo/np-primary.png"
                alt="Northern Pathways Immigration Consulting"
                width={700}
                height={400}
                priority
              />
            </div>
            <p className="np-hero-meta">
              <span className="e">Case Study · {frameNumber}</span>
              <span className="sep">/</span>
              <span>Web Design + Development</span>
              <span className="sep">/</span>
              <span>Multilingual EN · TR</span>
            </p>

            <h1 className="np-hero-title">
              A complete digital rebuild for{" "}
              <em>a regulated</em> Canadian immigration consultancy.
            </h1>

            <div className="np-hero-deck">
              <p className="desc">
                FrameFlow rebuilt{" "}
                <b>Northern Pathways Immigration Consulting</b> from the
                ground up — a marketing site that speaks two languages,
                paired with three custom client tools that turn IRCC&rsquo;s
                selection grid into something a prospect can actually use:
                a CRS calculator, a Six Selection Factors eligibility
                checker, and a complete searchable archive of every
                Express Entry & PNP draw since 2015.
              </p>
              <p className="np-tagline">
                &ldquo;Guiding your Canadian immigration journey with
                competence, care, and clarity.&rdquo;
                <small>— The brand tagline · locked</small>
              </p>
            </div>
          </div>
        </section>

        {/* FACT SHEET ---------------------------------------------- */}
        <section className="np-factsheet">
          <div className="np-factsheet-grid">
            <div>
              <p className="k">Client</p>
              <p className="v">
                Northern Pathways
                <small>Immigration Consulting</small>
              </p>
            </div>
            <div>
              <p className="k">Year</p>
              <p className="v">
                2025 — 2026
                <small>11-month engagement</small>
              </p>
            </div>
            <div>
              <p className="k">Scope</p>
              <p className="v">
                Site + 3 tools
                <small>Design · Build · Deploy</small>
              </p>
            </div>
            <div>
              <p className="k">Locales</p>
              <p className="v">
                EN · TR
                <small>12 routes per locale</small>
              </p>
            </div>
            <div>
              <p className="k">Live at</p>
              <p className="v">
                northernpathways.ca
                <small>Public · indexed</small>
              </p>
            </div>
          </div>
        </section>

        {/* BRIEF -------------------------------------------------- */}
        <section className="np-brief">
          <div className="np-brief-grid">
            <div>
              <p className="np-eyebrow">— The brief</p>
              <h2>
                Findable, bookable, <em>trustworthy.</em> In two languages.
              </h2>
            </div>
            <div className="body">
              <p>
                Northern Pathways is a Toronto-based immigration practice
                led by an <strong>RCIC-IRB</strong> — a regulated consultant
                who can speak in front of the Immigration and Refugee Board.
                The brief was simple to state and difficult to deliver:
                build a site that is findable on search, bookable in a tap,
                and trustworthy enough that someone betting their family on
                the right counsel feels they have made the right choice.
              </p>
              <p>
                The previous site was a static brochure. There was no way
                for a prospect to self-assess their score, no way to find
                out whether they would even pass the Federal Skilled Worker
                eligibility cutoff, and no way to read the latest IRCC draw
                without leaving the site. Conversion was a phone call.
              </p>
              <p>
                FrameFlow rebuilt the site, designed and shipped{" "}
                <em>three regulator-grade tools</em>, mirrored everything in
                Turkish for the diaspora that drives most of the firm&rsquo;s
                prospects, and folded the result into a single coherent
                brand experience — institutional in tone, clear in voice,
                transparent about what a consult costs.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 01 — WEBSITE ------------------------------------- */}
        <section className="np-section">
          <header className="np-sec-head">
            <span className="num">
              01<i>.</i>
            </span>
            <div className="text">
              <p className="lbl">— The website</p>
              <h2>
                The complete <em>marketing site,</em> rebuilt.
              </h2>
            </div>
            <p className="meta">
              Routes <b>12</b> · Locales <b>EN+TR</b>
              <br />
              Live since <b>Q1 2026</b>
            </p>
          </header>

          <div className="np-browser">
            <header className="np-browser-chrome">
              <span className="dots">
                <span />
                <span />
                <span />
              </span>
              <span className="url">northernpathways.ca/en</span>
              <span className="lang">
                <span className="on">EN</span>
                <span>TR</span>
              </span>
            </header>
            <Website />
          </div>

          <div className="np-obs">
            <div>
              <p className="k">Pages</p>
              <p className="v">
                12<small>routes per locale, 24 total</small>
              </p>
            </div>
            <div>
              <p className="k">Stack</p>
              <p className="v">
                Next.js<small>App Router · server components</small>
              </p>
            </div>
            <div>
              <p className="k">A11y</p>
              <p className="v">
                WCAG 2.2 AA<small>contrast · focus · keyboard</small>
              </p>
            </div>
            <div>
              <p className="k">Lighthouse</p>
              <p className="v">
                99 · 100 · 100 · 100<small>perf · a11y · BP · SEO</small>
              </p>
            </div>
          </div>
        </section>

        {/* TOOLS INTRO -------------------------------------------- */}
        <section className="np-tools-intro">
          <div className="deck">
            <h2>
              Three custom tools, <em>built for a regulated practice.</em>
            </h2>
            <div className="body">
              <p>
                Each tool is purpose-built around a single decision a prospect
                actually needs to make —{" "}
                <strong>can I qualify · can I score · what is happening this week.</strong>{" "}
                Together they replace the phone-call-as-funnel with a
                self-serve front desk that turns curious visitors into
                informed consultations.
              </p>
            </div>
          </div>
        </section>

        {/* TOOL 01 — CRS ------------------------------------------- */}
        <section className="np-tool">
          <div className="np-tool-grid">
            <aside className="np-tool-text">
              <p className="np-tool-tag">
                Tool <b>01.</b> · Live
              </p>
              <h3 className="np-tool-name">
                CRS <em>Calculator.</em>
              </h3>
              <p className="np-tool-desc">
                A faithful implementation of the{" "}
                <b>Comprehensive Ranking System</b>. <em>15 fields, 6 categories,</em>{" "}
                1,200-point ceiling. The score updates live as the prospect
                fills in their profile, with each category tabulated on the
                right and an exportable signed PDF the user can take to a
                consult.
              </p>
              <ul className="np-tool-features">
                <li>
                  <span>
                    <b>Six categories</b> — Core / Spouse / Skill Transferability / Additional / French / PNP nomination
                  </span>
                </li>
                <li>
                  <span>
                    <b>Tooltipped to source</b> — every field links to the IRCC specification it implements
                  </span>
                </li>
                <li>
                  <span>
                    <b>Signed PDF export</b> — counsel-of-record signature on the printable summary
                  </span>
                </li>
                <li>
                  <span>
                    <b>Bilingual</b> — full Turkish translation, including all field labels and tooltips
                  </span>
                </li>
              </ul>
            </aside>

            <div className="np-toolwin">
              <header className="np-toolwin-chrome">
                <span className="dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="url">northernpathways.ca/tools/crs</span>
                <span className="live">Live</span>
              </header>
              <Crs />
            </div>
          </div>
        </section>

        {/* TOOL 02 — FSWP ------------------------------------------ */}
        <section className="np-tool">
          <div className="np-tool-grid alt">
            <div className="np-toolwin">
              <header className="np-toolwin-chrome">
                <span className="dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="url">northernpathways.ca/tools/fswp</span>
                <span className="live">Live</span>
              </header>
              <Fswp />
            </div>

            <aside className="np-tool-text">
              <p className="np-tool-tag">
                Tool <b>02.</b> · Live
              </p>
              <h3 className="np-tool-name">
                FSWP <em>Eligibility.</em>
              </h3>
              <p className="np-tool-desc">
                A real-time pass/fail against the{" "}
                <b>Federal Skilled Worker Programme&rsquo;s</b> Six Selection
                Factors, with the <em>67/100 cutoff</em> rendered visibly on
                the meter. Prospects know in seconds whether they qualify
                before they invest the time of a CRS calculation.
              </p>
              <ul className="np-tool-features">
                <li>
                  <span>
                    <b>Six factors</b> — Language · Education · Experience · Age · Arranged Employment · Adaptability
                  </span>
                </li>
                <li>
                  <span>
                    <b>67-point pass mark</b> visualised on a horizontal scale, not buried in a footnote
                  </span>
                </li>
                <li>
                  <span>
                    <b>Honest verdict</b> — eligible / not yet eligible / not eligible, with a recommended next step for each
                  </span>
                </li>
                <li>
                  <span>
                    <b>Hands off to the calculator</b> — pass the FSWP, the next click loads the CRS calc with your data prefilled
                  </span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {/* TOOL 03 — DRAWS ------------------------------------------ */}
        <section className="np-tool">
          <div className="np-tool-grid">
            <aside className="np-tool-text">
              <p className="np-tool-tag">
                Tool <b>03.</b> · Live
              </p>
              <h3 className="np-tool-name">
                Latest <em>IRCC Draws.</em>
              </h3>
              <p className="np-tool-desc">
                An indexed, filterable archive of{" "}
                <b>every Express Entry and PNP draw since 2015</b> —{" "}
                <em>156+ rows</em> at last refresh, mirrored to the database
                within minutes of an IRCC announcement. The archive is the
                firm&rsquo;s single source of truth: the practice site, the
                social handle, and the calculator&rsquo;s &ldquo;this week&rsquo;s
                cutoff&rdquo; all read from it.
              </p>
              <ul className="np-tool-features">
                <li>
                  <span>
                    <b>156+ draws indexed</b> from June 2015 through to this week, fully searchable
                  </span>
                </li>
                <li>
                  <span>
                    <b>Category filters</b> — General · Healthcare · Trades · French · CEC · PNP · Education · Transport
                  </span>
                </li>
                <li>
                  <span>
                    <b>Cutoff sparkline</b> — 12-month trend across draw streams, hover for exact reading
                  </span>
                </li>
                <li>
                  <span>
                    <b>Auto-mirrored</b> to the Turkish-language Instagram explainer the morning after a draw
                  </span>
                </li>
              </ul>
            </aside>

            <div className="np-toolwin np-draws-win">
              <header className="np-toolwin-chrome">
                <span className="dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="url">northernpathways.ca/draws</span>
                <span className="live">Live · auto-refresh</span>
              </header>
              <Draws />
            </div>
          </div>
        </section>

        {/* BILINGUAL ------------------------------------------------ */}
        <section className="np-section np-bilingual">
          <header className="np-sec-head">
            <span className="num">
              02<i>.</i>
            </span>
            <div className="text">
              <p className="lbl">— Bilingual</p>
              <h2>
                Two languages, <em>one source of truth.</em>
              </h2>
            </div>
            <p className="meta">
              EN+TR · 24 routes
              <br />
              Single content model
            </p>
          </header>

          <div className="np-bilingual-grid">
            <article className="np-bili-card">
              <span className="flag">EN</span>
              <p className="lbl">English locale</p>
              <h4>
                Guiding your{" "}
                <em>Canadian immigration journey</em> with competence, care,
                and clarity.
              </h4>
              <p>
                The English locale is the canonical content. Every page,
                every tool, every IRCC draw record is written here first —
                then mirrored.
              </p>
              <div className="routes">
                {["/en", "/en/services", "/en/tools/crs", "/en/tools/fswp", "/en/draws", "/en/fees", "/en/blog"].map(
                  (r) => (
                    <span key={r}>
                      <b>{r.charAt(0)}</b>
                      {r.slice(1)}
                    </span>
                  )
                )}
              </div>
            </article>

            <article className="np-bili-card">
              <span className="flag">TR</span>
              <p className="lbl">Turkish locale</p>
              <h4>
                Kanada göçmenlik yolculuğunuzda{" "}
                <em>yetkinlik, özen ve netlikle</em> rehberlik.
              </h4>
              <p>
                The Turkish locale serves the diaspora that drives most of
                the firm&rsquo;s prospects — same routes, same tools,
                mirrored Turkish UI.
              </p>
              <div className="routes">
                {["/tr", "/tr/hizmetler", "/tr/araclar/crs", "/tr/araclar/fswp", "/tr/cekilisler", "/tr/ucretler", "/tr/blog"].map(
                  (r) => (
                    <span key={r}>
                      <b>{r.charAt(0)}</b>
                      {r.slice(1)}
                    </span>
                  )
                )}
              </div>
            </article>
          </div>
        </section>

        {/* CONTENT — SOCIAL POSTS (clickable) ----------------------- */}
        <section className="np-section np-social">
          <header className="np-sec-head">
            <span className="num">
              03<i>.</i>
            </span>
            <div className="text">
              <p className="lbl">— Content</p>
              <h2>
                The Turkish-language <em>explainer programme.</em>
              </h2>
            </div>
            <p className="meta">
              @kanadadayeniyasam
              <br />
              248 posts this season
            </p>
          </header>

          <div className="np-social-grid">
            {POSTS.map((post, i) => (
              <button
                key={post.src}
                type="button"
                className="np-social-card"
                onClick={() => setModalIndex(i)}
                aria-label={`Open ${post.title}`}
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 480px) 50vw, (max-width: 880px) 33vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="badge">№ {String(i + 1).padStart(2, "0")}</span>
                <span className={`pages${post.live ? " live" : ""}`}>
                  {post.pages}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ABOUT THE CLIENT ----------------------------------------- */}
        <section className="np-about">
          <div className="np-about-inner">
            <header className="np-sec-head np-sec-head--no-rule">
              <span className="num">
                04<i>.</i>
              </span>
              <div className="text">
                <p className="lbl">— About the client</p>
                <h2>
                  The <em>practice</em> behind the brief.
                </h2>
              </div>
              <p className="meta">
                RCIC-IRB · CICC
                <br />
                Toronto · 2019 →
              </p>
            </header>

            <div className="np-about-grid">
              <aside className="np-about-portrait">
                <div className="ph">
                  <Image
                    src="/portfolio/northern-pathways/people/burcu-akyol.jpg"
                    alt="Burcu Akyol, RCIC-IRB"
                    fill
                    sizes="(max-width: 880px) 70vw, 320px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="who">
                  <h4>Burcu Akyol</h4>
                  <p className="role">RCIC-IRB · Principal</p>
                  <dl>
                    <div>
                      <dt>Licence</dt>
                      <dd>RCIC-IRB</dd>
                    </div>
                    <div>
                      <dt>College</dt>
                      <dd>CICC</dd>
                    </div>
                    <div>
                      <dt>Board</dt>
                      <dd>CAPIC</dd>
                    </div>
                    <div>
                      <dt>Faculty</dt>
                      <dd>Queen&rsquo;s</dd>
                    </div>
                    <div>
                      <dt>Practising</dt>
                      <dd>2019 →</dd>
                    </div>
                  </dl>
                </div>
              </aside>

              <div className="np-about-text">
                <p className="lbl">— The business</p>
                <h2>
                  Northern <em>Pathways.</em>
                </h2>
                <p>
                  A Canadian immigration firm providing{" "}
                  <strong>
                    eligibility assessments, strategic guidance, and legal
                    representation
                  </strong>{" "}
                  for individuals seeking permanent residency, study permits,
                  and family sponsorship. Led by an{" "}
                  <em>RCIC and university professor,</em> the firm combines
                  technical legal expertise with lived experience to provide
                  ethical, client-centered immigration services.
                </p>
                <p>
                  This site is the operational front desk for that practice
                  — the place a prospect arrives at, self-assesses against
                  the IRCC grid, reads the latest draw, and books a consult,
                  in either of two languages.
                </p>

                <div className="np-dna">
                  <div className="col">
                    <h5>Brand values</h5>
                    <div className="pills">
                      {[
                        "Ethical Integrity",
                        "Legal Accuracy",
                        "Transparency",
                        "Client-Centred Service",
                      ].map((v, i) => (
                        <span key={v} className={i === 0 ? "primary" : ""}>
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col">
                    <h5>Aesthetic</h5>
                    <div className="pills">
                      {[
                        "Institutional professionalism",
                        "Canadian identity",
                        "Transparent clarity",
                        "Minimalist modernity",
                        "Authoritative trust",
                      ].map((v, i) => (
                        <span key={v} className={i === 0 ? "primary" : ""}>
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col">
                    <h5>Tone of voice</h5>
                    <div className="pills">
                      {["Professional", "Empathetic", "Clear", "Authoritative"].map(
                        (v, i) => (
                          <span key={v} className={i === 0 ? "primary" : ""}>
                            {v}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* VISIT LIVE SITE CTA ---------------------------------- */}
            <a
              className="np-live-cta"
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text">
                Visit the live site →
                <small>
                  northernpathways.ca · designed &amp; developed by FrameFlow ·
                  footer credit on every page
                </small>
              </span>
              <span className="visit">Open ↗</span>
            </a>
          </div>
        </section>

        {/* CLOSE ---------------------------------------------------- */}
        <section className="np-close">
          <div className="np-close-inner">
            <div className="np-close-grid">
              <div>
                <p className="lbl">— Outcome</p>
                <h2>
                  A practice with a{" "}
                  <em>self-serve front desk,</em> in two languages.
                </h2>
              </div>
              <div className="right">
                <p>
                  The website is live, the three tools are in production, and
                  the IRCC draws archive auto-mirrors to the firm&rsquo;s
                  Turkish-language handle the morning after every draw.{" "}
                  <b>Conversion is no longer a phone call.</b>
                </p>
                <a
                  className="live-link"
                  href={LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit northernpathways.ca
                </a>
              </div>
            </div>

            <footer className="np-credit">
              <span>
                Reel <b>{frameNumber}</b> · Northern Pathways · 2025–2026
              </span>
              <span className="center">
                Designed &amp; developed by <b>Frame Flow</b>
              </span>
              <span className="right">
                Set in <b>Montserrat</b> · 300–900
              </span>
            </footer>
          </div>
        </section>

        {/* MODAL — social-post lightbox ---------------------------- */}
        {isOpen && activePost && (
          <div
            className="np-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${activePost.title} — ${modalIndex! + 1} of ${TOTAL}`}
            onClick={() => setModalIndex(null)}
          >
            <button
              type="button"
              className="np-modal-nav prev"
              aria-label="Previous post"
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((i) =>
                  i === null ? null : (i - 1 + TOTAL) % TOTAL
                );
              }}
            >
              ←
            </button>

            <div
              className="np-modal-stage"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="np-modal-bar top">
                <span className="np-modal-counter">
                  ★ Post <b>{String(modalIndex! + 1).padStart(2, "0")}</b> /{" "}
                  {String(TOTAL).padStart(2, "0")}
                </span>
                <span className="np-modal-brand">
                  NORTHERN PATHWAYS · CASE FILE
                </span>
                <button
                  type="button"
                  className="np-modal-close"
                  aria-label="Close"
                  onClick={() => setModalIndex(null)}
                >
                  ×
                </button>
              </div>

              <div className="np-modal-body is-image">
                <Image
                  src={activePost.src}
                  alt={activePost.alt}
                  fill
                  sizes="(max-width: 880px) 92vw, 720px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              <div className="np-modal-bar bot">
                <span className="np-modal-slate">
                  <b>{activePost.title}</b> · {activePost.meta} ·{" "}
                  <em>{activePost.pages}</em>
                </span>
              </div>
            </div>

            <button
              type="button"
              className="np-modal-nav next"
              aria-label="Next post"
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((i) =>
                  i === null ? null : (i + 1) % TOTAL
                );
              }}
            >
              →
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        body:has(.np-page) {
          background: #ffffff;
        }

        .np-page {
          --red:   #b92025;
          --red-d: #94181c;
          --paper: #f9f9f9;
          --white: #ffffff;
          --ink:   #2c2b2b;
          --ink-1: rgba(44, 43, 43, 0.92);
          --ink-2: rgba(44, 43, 43, 0.72);
          --ink-3: rgba(44, 43, 43, 0.50);
          --ink-4: rgba(44, 43, 43, 0.28);
          --ink-5: rgba(44, 43, 43, 0.14);
          --ink-6: rgba(44, 43, 43, 0.06);
          --on-dark-1: rgba(255, 255, 255, 0.92);
          --on-dark-2: rgba(255, 255, 255, 0.62);
          --on-dark-3: rgba(255, 255, 255, 0.32);
          --on-dark-4: rgba(255, 255, 255, 0.14);
          --type:  "Montserrat", system-ui, sans-serif;
          --max:   1480px;
          --pad-x: clamp(20px, 5vw, 56px);

          background: var(--white);
          color: var(--ink);
          font-family: var(--type);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          border-top: 4px solid var(--red);
        }
        .np-page a { color: inherit; text-decoration: none; }
        .np-page img { display: block; max-width: 100%; }

        /* TOP RAIL */
        .np-rail {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
          padding: 14px 32px;
          background: var(--ink);
          color: var(--on-dark-2);
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
        }
        .np-rail-back { color: var(--on-dark-2); transition: color 0.2s; }
        .np-rail-back:hover { color: var(--red); }
        .np-rail-center {
          text-align: center;
          color: var(--white);
          letter-spacing: 0.5em;
          white-space: nowrap;
        }
        .np-rail-meta {
          text-align: right;
          color: var(--on-dark-2);
        }
        .np-rail-meta b { color: var(--red); }
        @media (max-width: 720px) {
          .np-rail {
            grid-template-columns: 1fr;
            gap: 4px;
            text-align: center;
            padding: 12px 16px;
          }
          .np-rail-back, .np-rail-meta { text-align: center; }
        }

        /* HERO */
        .np-hero {
          padding: clamp(72px, 9vw, 120px) var(--pad-x) clamp(56px, 7vw, 88px);
          position: relative;
        }
        .np-hero-inner {
          max-width: var(--max);
          margin: 0 auto;
        }
        .np-hero-logo {
          margin-bottom: clamp(40px, 5vw, 64px);
          padding-bottom: clamp(32px, 4vw, 48px);
          border-bottom: 1px solid var(--ink-5);
        }
        .np-hero-logo :global(img) {
          display: block;
          width: auto;
          height: clamp(72px, 9vw, 112px);
          max-width: 100%;
          object-fit: contain;
          object-position: left center;
        }
        .np-hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 18px 28px;
          align-items: baseline;
          margin-bottom: 36px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-hero-meta .e { color: var(--red); }
        .np-hero-meta .e::before {
          content: "";
          display: inline-block;
          vertical-align: middle;
          width: 28px;
          height: 1.5px;
          background: var(--red);
          margin-right: 12px;
          margin-bottom: 3px;
        }
        .np-hero-meta .sep { color: var(--ink-4); }
        .np-hero-title {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(40px, 7vw, 108px);
          line-height: 0.96;
          letter-spacing: -0.035em;
          color: var(--ink);
          margin-bottom: 28px;
          max-width: 17ch;
        }
        .np-hero-title em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-hero-deck {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(280px, 1fr);
          gap: 56px;
          align-items: end;
          padding-top: 28px;
          border-top: 1px solid var(--ink-5);
        }
        .np-hero-deck .desc {
          font-family: var(--type);
          font-weight: 400;
          font-size: clamp(15px, 1.4vw, 18px);
          line-height: 1.7;
          color: var(--ink-2);
          max-width: 56ch;
        }
        .np-hero-deck .desc b { color: var(--ink); font-weight: 700; }
        .np-tagline {
          font-family: var(--type);
          font-style: italic;
          font-weight: 500;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.55;
          color: var(--ink);
          padding-left: 22px;
          border-left: 3px solid var(--red);
        }
        .np-tagline small {
          display: block;
          font-style: normal;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-top: 12px;
        }
        @media (max-width: 880px) {
          .np-hero-deck { grid-template-columns: 1fr; gap: 28px; }
        }

        /* FACT SHEET */
        .np-factsheet {
          padding: 32px var(--pad-x) 56px;
        }
        .np-factsheet-grid {
          max-width: var(--max);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          border-top: 2px solid var(--red);
          border-bottom: 2px solid var(--red);
        }
        .np-factsheet-grid > div {
          padding: 22px 22px 24px;
          border-left: 1px solid var(--ink-5);
        }
        .np-factsheet-grid > div:first-child {
          border-left: 0;
          padding-left: 0;
        }
        .np-factsheet-grid > div:last-child { padding-right: 0; }
        .np-factsheet-grid .k {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 10px;
        }
        .np-factsheet-grid .v {
          font-family: var(--type);
          font-weight: 800;
          font-size: 18px;
          line-height: 1.2;
          letter-spacing: -0.005em;
          color: var(--ink);
        }
        .np-factsheet-grid .v small {
          display: block;
          font-family: var(--type);
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0;
          text-transform: none;
          color: var(--ink-3);
          margin-top: 4px;
        }
        @media (max-width: 880px) {
          .np-factsheet-grid { grid-template-columns: 1fr 1fr; }
          .np-factsheet-grid > div {
            padding: 18px;
            border-left: 0;
            border-top: 1px solid var(--ink-5);
          }
          .np-factsheet-grid > div:nth-child(odd) { border-right: 1px solid var(--ink-5); }
          .np-factsheet-grid > div:first-child,
          .np-factsheet-grid > div:nth-child(2) {
            border-top: 0;
            padding-top: 0;
          }
        }

        /* BRIEF */
        .np-brief {
          padding: clamp(56px, 7vw, 88px) var(--pad-x);
        }
        .np-brief-grid {
          max-width: var(--max);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.5fr);
          gap: 64px;
          align-items: start;
        }
        .np-brief-grid h2 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-top: 16px;
          max-width: 14ch;
        }
        .np-brief-grid h2 em { font-style: italic; font-weight: 500; color: var(--red); }
        .np-brief-grid .body p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.85;
          color: var(--ink-2);
          margin-bottom: 1.1em;
          max-width: 60ch;
        }
        .np-brief-grid .body p:first-child {
          font-size: 18px;
          color: var(--ink-1);
          font-weight: 500;
          padding-left: 18px;
          border-left: 3px solid var(--red);
        }
        .np-brief-grid .body p:first-child::first-letter {
          font-family: var(--type);
          font-weight: 800;
          font-size: 48px;
          line-height: 0.85;
          float: left;
          padding: 4px 12px 0 0;
          color: var(--red);
        }
        .np-brief-grid .body p strong { color: var(--ink); font-weight: 700; }
        .np-brief-grid .body p em { font-style: italic; font-weight: 500; color: var(--red); }
        .np-eyebrow {
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
        }
        @media (max-width: 880px) {
          .np-brief-grid { grid-template-columns: 1fr; gap: 28px; }
        }

        /* SECTION + SECTION HEADER */
        .np-section {
          max-width: var(--max);
          margin: 0 auto;
          padding: 0 var(--pad-x) clamp(72px, 8vw, 112px);
        }
        .np-sec-head {
          padding: clamp(72px, 8vw, 112px) 0 clamp(28px, 3.5vw, 44px);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 36px;
          align-items: end;
          border-top: 1px solid var(--ink-5);
          position: relative;
        }
        .np-sec-head::before {
          content: "";
          position: absolute;
          top: -1.5px;
          left: 0;
          width: 96px;
          height: 3px;
          background: var(--red);
        }
        .np-sec-head--no-rule { border-top: 0; padding-top: 0; }
        .np-sec-head--no-rule::before { display: none; }
        .np-sec-head .num {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(48px, 6vw, 80px);
          line-height: 0.85;
          letter-spacing: -0.04em;
          color: var(--red);
        }
        .np-sec-head .num i {
          font-style: normal;
          color: var(--ink);
          font-weight: 500;
        }
        .np-sec-head .text { padding-bottom: 6px; }
        .np-sec-head h2 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(28px, 3.6vw, 48px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--ink);
        }
        .np-sec-head h2 em { font-style: italic; font-weight: 500; color: var(--red); }
        .np-sec-head .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 12px;
        }
        .np-sec-head .meta {
          text-align: right;
          font-family: var(--type);
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-3);
          padding-bottom: 8px;
          max-width: 22ch;
          line-height: 1.55;
        }
        .np-sec-head .meta b { color: var(--ink); font-weight: 800; }
        @media (max-width: 720px) {
          .np-sec-head { grid-template-columns: auto 1fr; gap: 18px; }
          .np-sec-head .meta { display: none; }
        }

        /* BROWSER + TOOL CHROME (clickable div styled as window) */
        .np-browser, .np-toolwin {
          background: var(--white);
          border: 1px solid var(--ink-5);
          border-radius: 6px;
          overflow: hidden;
          box-shadow:
            0 32px 80px -32px rgba(44, 43, 43, 0.22),
            0 12px 32px -16px rgba(44, 43, 43, 0.08);
          position: relative;
          width: 100%;
        }
        .np-browser::before, .np-toolwin::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--red);
          z-index: 5;
        }
        .np-browser-chrome, .np-toolwin-chrome {
          padding: 12px 16px;
          background: var(--paper);
          border-bottom: 1px solid var(--ink-5);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 18px;
          align-items: center;
        }
        .np-toolwin-chrome { padding: 11px 14px; gap: 12px; }
        .np-browser-chrome .dots, .np-toolwin-chrome .dots { display: flex; gap: 6px; }
        .np-toolwin-chrome .dots { gap: 5px; }
        .np-browser-chrome .dots span, .np-toolwin-chrome .dots span {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--ink-4);
        }
        .np-toolwin-chrome .dots span {
          width: 9px;
          height: 9px;
        }
        .np-browser-chrome .dots span:first-child,
        .np-toolwin-chrome .dots span:first-child { background: var(--red); }
        .np-browser-chrome .url, .np-toolwin-chrome .url {
          padding: 5px 14px;
          background: var(--white);
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          font-family: var(--type);
          font-weight: 600;
          font-size: 12px;
          color: var(--ink-2);
          max-width: 380px;
          margin: 0 auto;
        }
        .np-toolwin-chrome .url {
          font-size: 11px;
          padding: 4px 10px;
          max-width: 260px;
        }
        .np-browser-chrome .url::before { content: "🔒  "; opacity: 0.6; }
        .np-browser-chrome .lang {
          display: inline-flex;
          gap: 0;
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          overflow: hidden;
        }
        .np-browser-chrome .lang span {
          padding: 4px 9px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: var(--ink-3);
        }
        .np-browser-chrome .lang .on {
          background: var(--red);
          color: var(--white);
        }
        .np-toolwin-chrome .live {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
        }
        .np-toolwin-chrome .live::before {
          content: "● ";
          animation: np-pulse 1.5s ease-in-out infinite;
        }
        @keyframes np-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* WEBSITE MOCKUP */
        .np-site { background: var(--white); }
        .np-site-nav {
          padding: 22px 36px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 36px;
          align-items: center;
          border-bottom: 1px solid var(--ink-5);
        }
        .np-site-nav .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .np-site-nav .logo img {
          width: 42px;
          height: 42px;
          object-fit: contain;
        }
        .np-site-nav .logo .word {
          font-family: var(--type);
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.04em;
          color: var(--ink);
          line-height: 1;
        }
        .np-site-nav .logo .word small {
          display: block;
          font-family: var(--type);
          font-weight: 700;
          font-size: 8px;
          letter-spacing: 0.32em;
          color: var(--red);
          margin-top: 4px;
        }
        .np-site-nav .menu {
          display: flex;
          justify-content: center;
          gap: 32px;
          font-family: var(--type);
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.06em;
          color: var(--ink-1);
        }
        .np-site-nav .menu .on {
          color: var(--red);
          position: relative;
        }
        .np-site-nav .menu .on::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -8px;
          height: 2px;
          background: var(--red);
        }
        .np-site-nav .right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .np-site-nav .right .lang {
          display: inline-flex;
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          overflow: hidden;
        }
        .np-site-nav .right .lang span {
          padding: 5px 9px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: var(--ink-3);
        }
        .np-site-nav .right .lang .on {
          background: var(--ink);
          color: var(--white);
        }
        .np-site-nav .right .cta {
          padding: 10px 18px;
          background: var(--red);
          color: var(--white);
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.12em;
          border-radius: 4px;
        }
        .np-site-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(220px, 0.9fr);
          gap: 56px;
          align-items: center;
          padding: 64px 36px;
          background: var(--paper);
          border-bottom: 1px solid var(--ink-5);
        }
        .np-site-hero .text { min-width: 0; }
        .np-site-hero .eb {
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 18px;
        }
        .np-site-hero h2 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(24px, 3vw, 40px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 20px;
        }
        .np-site-hero h2 em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-site-hero p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 14px;
          line-height: 1.65;
          color: var(--ink-2);
          max-width: 52ch;
          margin-bottom: 22px;
        }
        .np-site-hero p b { font-weight: 700; color: var(--ink); }
        .np-site-hero .ctas {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .np-site-hero .ctas span {
          padding: 11px 18px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-radius: 4px;
        }
        .np-site-hero .ctas .p {
          background: var(--red);
          color: var(--white);
        }
        .np-site-hero .ctas .s {
          border: 1.5px solid var(--ink);
          color: var(--ink);
        }
        .np-site-hero .photo {
          background: var(--white);
          padding: 14px 14px 18px;
          border: 1px solid var(--ink-5);
          box-shadow: 0 16px 48px -24px rgba(44, 43, 43, 0.25);
        }
        .np-site-hero .photo .ph {
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--paper);
          position: relative;
        }
        .np-site-hero .photo .who {
          padding-top: 14px;
          border-top: 3px solid var(--red);
          margin-top: 14px;
        }
        .np-site-hero .photo .who h4 {
          font-family: var(--type);
          font-weight: 800;
          font-size: 14px;
          letter-spacing: -0.005em;
          color: var(--ink);
        }
        .np-site-hero .photo .who p {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--red);
          margin: 4px 0 0;
        }
        .np-site-services {
          padding: 36px 36px 22px;
          border-bottom: 1px solid var(--ink-5);
        }
        .np-site-services .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 18px;
        }
        .np-site-services h3 {
          font-family: var(--type);
          font-weight: 800;
          font-size: 22px;
          letter-spacing: -0.015em;
          color: var(--ink);
          margin-bottom: 22px;
          max-width: 28ch;
        }
        .np-site-services h3 em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-site-services .row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }
        .np-site-services .row > div {
          padding: 14px 12px 16px;
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          background: var(--white);
          transition: border-color 0.2s, transform 0.2s;
        }
        .np-site-services .row > div:hover {
          border-color: var(--red);
          transform: translateY(-2px);
        }
        .np-site-services .row .n {
          font-family: var(--type);
          font-weight: 800;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 6px;
        }
        .np-site-services .row .t {
          font-family: var(--type);
          font-weight: 700;
          font-size: 12px;
          line-height: 1.25;
          letter-spacing: -0.005em;
          color: var(--ink);
        }
        .np-site-foot {
          padding: 22px 36px;
          background: var(--paper);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 18px;
          align-items: center;
          border-top: 4px solid var(--red);
        }
        .np-site-foot .left {
          font-family: var(--type);
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-site-foot .credit {
          font-family: var(--type);
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink);
        }
        .np-site-foot .credit b { color: var(--red); }
        @media (max-width: 880px) {
          .np-site-nav {
            padding: 16px 20px;
            grid-template-columns: auto auto;
          }
          .np-site-nav .menu { display: none; }
          .np-site-hero {
            grid-template-columns: 1fr;
            padding: 32px 20px;
            gap: 22px;
          }
          .np-site-services { padding: 22px 20px; }
          .np-site-services .row { grid-template-columns: repeat(2, 1fr); }
          .np-site-foot {
            padding: 14px 20px;
            grid-template-columns: 1fr;
            gap: 8px;
            text-align: center;
          }
        }

        /* OBSERVATIONS BAR */
        .np-obs {
          margin-top: 32px;
          padding: 26px 30px;
          background: var(--ink);
          color: var(--white);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .np-obs > div {
          padding: 0 22px;
          border-left: 1px solid var(--on-dark-3);
        }
        .np-obs > div:first-child {
          border-left: 0;
          padding-left: 0;
        }
        .np-obs .k {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 10px;
        }
        .np-obs .v {
          font-family: var(--type);
          font-weight: 800;
          font-size: 22px;
          letter-spacing: -0.015em;
          color: var(--white);
        }
        .np-obs > div:nth-child(4) .v { color: var(--red); }
        .np-obs .v small {
          display: block;
          margin-top: 4px;
          font-family: var(--type);
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0;
          text-transform: none;
          color: var(--on-dark-2);
        }
        @media (max-width: 880px) {
          .np-obs {
            grid-template-columns: 1fr 1fr;
            gap: 18px;
            padding: 22px;
          }
          .np-obs > div {
            padding: 0;
            border-left: 0;
          }
        }

        /* TOOLS INTRO */
        .np-tools-intro {
          max-width: var(--max);
          margin: 0 auto;
          padding: clamp(72px, 8vw, 112px) var(--pad-x) clamp(28px, 3.5vw, 48px);
          border-top: 1px solid var(--ink-5);
        }
        .np-tools-intro .deck {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.4fr);
          gap: 64px;
          align-items: end;
        }
        .np-tools-intro h2 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(36px, 4.6vw, 64px);
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: var(--ink);
          max-width: 12ch;
        }
        .np-tools-intro h2 em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-tools-intro .body p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.75;
          color: var(--ink-2);
          max-width: 56ch;
        }
        .np-tools-intro .body p strong {
          color: var(--ink);
          font-weight: 700;
        }
        @media (max-width: 880px) {
          .np-tools-intro .deck {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        /* TOOL */
        .np-tool {
          max-width: var(--max);
          margin: 0 auto;
          padding: clamp(48px, 6vw, 80px) var(--pad-x);
        }
        .np-tool + .np-tool { border-top: 1px solid var(--ink-5); }
        .np-tool-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.45fr);
          gap: 56px;
          align-items: start;
        }
        .np-tool-grid.alt {
          grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.85fr);
        }
        .np-tool-grid.alt .np-tool-text { order: 2; }
        @media (max-width: 980px) {
          .np-tool-grid, .np-tool-grid.alt {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .np-tool-grid.alt .np-tool-text { order: 0; }
        }

        .np-tool-text { position: sticky; top: 96px; }
        @media (max-width: 980px) {
          .np-tool-text { position: static; }
        }

        .np-tool-tag {
          font-family: var(--type);
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 16px;
          display: inline-flex;
          align-items: baseline;
          gap: 12px;
        }
        .np-tool-tag b {
          font-family: var(--type);
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.04em;
          color: var(--ink);
        }
        .np-tool-name {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 18px;
        }
        .np-tool-name em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-tool-desc {
          font-family: var(--type);
          font-weight: 400;
          font-size: 15px;
          line-height: 1.75;
          color: var(--ink-2);
          margin-bottom: 18px;
          max-width: 44ch;
        }
        .np-tool-desc b { color: var(--ink); font-weight: 700; }
        .np-tool-desc em {
          font-style: italic;
          color: var(--red);
          font-weight: 500;
        }
        .np-tool-features {
          padding-top: 18px;
          border-top: 2px solid var(--red);
          list-style: none;
          margin: 0;
          padding-left: 0;
        }
        .np-tool-features li {
          padding: 12px 0;
          border-bottom: 1px dashed var(--ink-5);
          display: flex;
          align-items: baseline;
          gap: 14px;
          font-family: var(--type);
          font-weight: 500;
          font-size: 13px;
          line-height: 1.55;
          color: var(--ink-1);
        }
        .np-tool-features li::before {
          content: "→";
          flex: 0 0 16px;
          font-family: var(--type);
          font-weight: 800;
          font-size: 14px;
          line-height: 1.55;
          color: var(--red);
        }
        .np-tool-features li > span {
          flex: 1 1 auto;
          min-width: 0;
        }
        .np-tool-features li b {
          color: var(--red);
          font-weight: 800;
        }

        /* ╭───────────────────────────────────────────────╮
           │ CRS + FSWP TOOL SHOWCASES — animated mockups │
           ╰───────────────────────────────────────────────╯
           Both calculators share the same calc-shell layout;
           palette, sidebar colours, and section content differ. */

        .np-crs, .np-fswp {
          /* duration of one demo loop (sidebar pulse, form fill, results) */
          --duration: 24s;

          /* breakdown / pane color bands — faithful to live tool */
          --blue-50:   #eff6ff; --blue-100:  #dbeafe; --blue-200:  #bfdbfe;
          --blue-600:  #2563eb; --blue-700:  #1d4ed8; --blue-800:  #1e40af;
          --pink-50:   #fdf2f8; --pink-100:  #fce7f3; --pink-200:  #fbcfe8;
          --pink-600:  #db2777; --pink-700:  #be185d; --pink-800:  #9d174d;
          --green-50:  #f0fdf4; --green-100: #dcfce7; --green-200: #bbf7d0;
          --green-600: #16a34a; --green-700: #15803d; --green-800: #166534;
          --purple-50: #faf5ff; --purple-100:#f3e8ff; --purple-200:#e9d5ff;
          --purple-600:#9333ea; --purple-700:#7e22ce; --purple-800:#6b21a8;
          --yellow-50: #fefce8; --yellow-100:#fef9c3; --yellow-200:#fef08a;
          --yellow-300:#fde047; --yellow-600:#ca8a04; --yellow-700:#a16207; --yellow-800:#854d0e;
          --orange-50: #fff7ed; --orange-100:#ffedd5; --orange-200:#fed7aa;
          --orange-600:#ea580c; --orange-700:#c2410c; --orange-800:#9a3412;
          --rose-50:   #fff1f2; --rose-100:  #ffe4e6; --rose-200:  #fecdd3;
          --rose-600:  #e11d48; --rose-800:  #9f1239;
          --red-d:     #8e1318;
          --red-100:   #fde8e9;
          --inkc-2:    #4a4847;
          --inkc-3:    #807c79;
          --inkc-4:    #b7b3af;
          --inkc-5:    #e2dfdc;

          position: relative;
          padding: clamp(20px, 3vw, 32px);
          background: linear-gradient(135deg, #fafafa 0%, #ffffff 50%, var(--red-100) 100%);
          overflow: hidden;
        }
        .np-crs::before, .np-fswp::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 600px 220px at 90% 10%, rgba(185, 32, 37, 0.06), transparent 60%),
            radial-gradient(ellipse 500px 200px at 10% 90%, rgba(185, 32, 37, 0.04), transparent 60%);
        }

        .np-crs .calc-stage,
        .np-fswp .calc-stage {
          position: relative;
        }
        /* reserve enough height for the tallest view (form OR results) so the
           absolutely-positioned results card never overflows the parent's
           overflow:hidden gradient clip */
        .np-crs  .calc-stage { min-height: 640px; }
        .np-fswp .calc-stage { min-height: 720px; }
        .np-crs .view,
        .np-fswp .view {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.6s ease;
        }
        .np-crs .view.form,
        .np-fswp .view.form { position: relative; opacity: 1; }
        .np-crs .view.results,
        .np-fswp .view.results { opacity: 0; }
        .np-crs .calc-stage[data-anim="on"] .view.form,
        .np-fswp .calc-stage[data-anim="on"] .view.form     { animation: showForm    var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .view.results,
        .np-fswp .calc-stage[data-anim="on"] .view.results  { animation: showResults var(--duration) linear infinite; }
        @keyframes showForm {
          0%, 75%   { opacity: 1; }
          78%, 95%  { opacity: 0; }
          98%, 100% { opacity: 1; }
        }
        @keyframes showResults {
          0%, 75%   { opacity: 0; transform: translateY(8px); }
          78%, 95%  { opacity: 1; transform: translateY(0); }
          98%, 100% { opacity: 0; transform: translateY(8px); }
        }

        .np-crs .form-grid,
        .np-fswp .form-grid {
          display: grid;
          grid-template-columns: 240px minmax(0, 1fr);
          gap: 18px;
        }

        /* SIDEBAR ----------------------------------------- */
        .np-crs .calc-sidebar,
        .np-fswp .calc-sidebar {
          background: var(--white);
          border: 1px solid var(--inkc-5);
          border-radius: 14px;
          padding: 14px 12px;
          box-shadow: 0 1px 0 #fff inset;
        }
        .np-crs .calc-sidebar h4,
        .np-fswp .calc-sidebar h4 {
          font-family: var(--type);
          font-weight: 700;
          font-size: 13px;
          color: var(--ink);
          margin: 2px 4px 12px;
          letter-spacing: -0.01em;
        }
        .np-crs .calc-sidebar ul,
        .np-fswp .calc-sidebar ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 0;
          margin: 0;
        }
        .np-crs .calc-sidebar li,
        .np-fswp .calc-sidebar li {
          position: relative;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 11px;
          border-radius: 9px;
          background: #f6f6f6;
          border: 1px solid transparent;
          font-family: var(--type);
          font-size: 12px;
          font-weight: 500;
          color: var(--ink);
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .np-crs .calc-sidebar li .ic,
        .np-fswp .calc-sidebar li .ic {
          width: 20px; height: 20px;
          display: grid; place-items: center;
          flex-shrink: 0;
          font-size: 12px;
        }
        .np-crs .calc-sidebar li .nm,
        .np-fswp .calc-sidebar li .nm {
          flex: 1;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .np-crs .calc-sidebar li .ind,
        .np-fswp .calc-sidebar li .ind {
          position: relative;
          width: 14px; height: 14px;
          flex-shrink: 0;
        }
        .np-crs .calc-sidebar li .ind .spin,
        .np-fswp .calc-sidebar li .ind .spin {
          position: absolute;
          inset: 0;
          border: 2px solid #f59e0b;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          opacity: 1;
        }
        .np-crs .calc-sidebar li .ind .check,
        .np-fswp .calc-sidebar li .ind .check {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          color: #10b981;
          font-size: 11px;
          font-weight: 800;
          line-height: 1;
          opacity: 0;
          transform: scale(0.5);
        }
        .np-crs .calc-sidebar li.active .ind .spin,
        .np-fswp .calc-sidebar li.active .ind .spin   { border-color: #fde68a; border-top-color: transparent; }
        .np-crs .calc-sidebar li.active .ind .check,
        .np-fswp .calc-sidebar li.active .ind .check  { color: #86efac; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .np-crs .calc-sidebar li.active,
        .np-fswp .calc-sidebar li.active {
          color: #fff;
          box-shadow: 0 6px 14px -8px rgba(0, 0, 0, 0.35);
          border-width: 2px;
        }
        .np-crs .calc-sidebar li.blue.active,
        .np-fswp .calc-sidebar li.blue.active   { background: linear-gradient(90deg, var(--blue-600), var(--blue-700));     border-color: #3b82f6; }
        .np-crs .calc-sidebar li.pink.active,
        .np-fswp .calc-sidebar li.pink.active   { background: linear-gradient(90deg, var(--pink-600), var(--pink-700));     border-color: #f472b6; }
        .np-crs .calc-sidebar li.red.active,
        .np-fswp .calc-sidebar li.red.active    { background: linear-gradient(90deg, var(--red), var(--red-d));              border-color: #ef4444; }
        .np-crs .calc-sidebar li.green.active,
        .np-fswp .calc-sidebar li.green.active  { background: linear-gradient(90deg, var(--green-600), var(--green-700));   border-color: #4ade80; }
        .np-crs .calc-sidebar li.purple.active,
        .np-fswp .calc-sidebar li.purple.active { background: linear-gradient(90deg, var(--purple-600), var(--purple-700)); border-color: #c084fc; }
        .np-crs .calc-sidebar li.orange.active,
        .np-fswp .calc-sidebar li.orange.active { background: linear-gradient(90deg, var(--orange-600), var(--orange-700)); border-color: #fb923c; }
        .np-fswp .calc-sidebar li.yellow.active { background: linear-gradient(90deg, var(--yellow-600), var(--yellow-700)); border-color: #facc15; }

        /* CRS sidebar windows (a1..a6) */
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="1"] { animation: a1 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="2"] { animation: a2 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="3"] { animation: a3 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="4"] { animation: a4 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="5"] { animation: a5 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="6"] { animation: a6 var(--duration) linear infinite; }
        @keyframes a1 {
          0%,   11% { background: linear-gradient(90deg, var(--blue-600), var(--blue-700));   color: #fff; border-color: #3b82f6; box-shadow: 0 6px 14px -8px rgba(0,0,0,0.35); }
          12%, 100% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
        }
        @keyframes a2 {
          0%,   11% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
          12%, 23%  { background: linear-gradient(90deg, var(--pink-600), var(--pink-700));   color: #fff; border-color: #f472b6; box-shadow: 0 6px 14px -8px rgba(0,0,0,0.35); }
          24%, 100% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
        }
        @keyframes a3 {
          0%,   23% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
          24%, 35%  { background: linear-gradient(90deg, var(--red), var(--red-d));         color: #fff; border-color: #ef4444; box-shadow: 0 6px 14px -8px rgba(0,0,0,0.35); }
          36%, 100% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
        }
        @keyframes a4 {
          0%,   35% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
          36%, 47%  { background: linear-gradient(90deg, var(--blue-600), var(--blue-700));   color: #fff; border-color: #3b82f6; box-shadow: 0 6px 14px -8px rgba(0,0,0,0.35); }
          48%, 100% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
        }
        @keyframes a5 {
          0%,   47% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
          48%, 59%  { background: linear-gradient(90deg, var(--green-600), var(--green-700)); color: #fff; border-color: #4ade80; box-shadow: 0 6px 14px -8px rgba(0,0,0,0.35); }
          60%, 100% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
        }
        @keyframes a6 {
          0%,   59% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
          60%, 72%  { background: linear-gradient(90deg, var(--purple-600), var(--purple-700)); color: #fff; border-color: #c084fc; box-shadow: 0 6px 14px -8px rgba(0,0,0,0.35); }
          73%, 100% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
        }

        /* FSWP sidebar windows (fa1..fa6) — different palette per step */
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="1"] { animation: fa1 var(--duration) linear infinite; }
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="2"] { animation: fa2 var(--duration) linear infinite; }
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="3"] { animation: fa3 var(--duration) linear infinite; }
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="4"] { animation: fa4 var(--duration) linear infinite; }
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="5"] { animation: fa5 var(--duration) linear infinite; }
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="6"] { animation: fa6 var(--duration) linear infinite; }
        @keyframes fa1 {
          0%,   11% { background: linear-gradient(90deg, var(--blue-600), var(--blue-700));     color: #fff; border-color: #3b82f6; box-shadow: 0 6px 14px -8px rgba(0,0,0,0.35); }
          12%, 100% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
        }
        @keyframes fa2 {
          0%,   11% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
          12%, 23%  { background: linear-gradient(90deg, var(--green-600), var(--green-700));   color: #fff; border-color: #4ade80; box-shadow: 0 6px 14px -8px rgba(0,0,0,0.35); }
          24%, 100% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
        }
        @keyframes fa3 {
          0%,   23% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
          24%, 35%  { background: linear-gradient(90deg, var(--orange-600), var(--orange-700)); color: #fff; border-color: #fb923c; box-shadow: 0 6px 14px -8px rgba(0,0,0,0.35); }
          36%, 100% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
        }
        @keyframes fa4 {
          0%,   35% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
          36%, 47%  { background: linear-gradient(90deg, var(--pink-600), var(--pink-700));     color: #fff; border-color: #f472b6; box-shadow: 0 6px 14px -8px rgba(0,0,0,0.35); }
          48%, 100% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
        }
        @keyframes fa5 {
          0%,   47% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
          48%, 59%  { background: linear-gradient(90deg, var(--purple-600), var(--purple-700)); color: #fff; border-color: #c084fc; box-shadow: 0 6px 14px -8px rgba(0,0,0,0.35); }
          60%, 100% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
        }
        @keyframes fa6 {
          0%,   59% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
          60%, 72%  { background: linear-gradient(90deg, var(--yellow-600), var(--yellow-700)); color: #fff; border-color: #facc15; box-shadow: 0 6px 14px -8px rgba(0,0,0,0.35); }
          73%, 100% { background: #f6f6f6; color: var(--ink); border-color: transparent; box-shadow: none; }
        }

        /* sidebar indicator state-swap (spinner opacity + check fade-in) */
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="1"] .spin,
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="1"] .spin  { animation: spin 0.8s linear infinite, sp1 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="2"] .spin,
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="2"] .spin  { animation: spin 0.8s linear infinite, sp2 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="3"] .spin,
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="3"] .spin  { animation: spin 0.8s linear infinite, sp3 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="4"] .spin,
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="4"] .spin  { animation: spin 0.8s linear infinite, sp4 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="5"] .spin,
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="5"] .spin  { animation: spin 0.8s linear infinite, sp5 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="6"] .spin,
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="6"] .spin  { animation: spin 0.8s linear infinite, sp6 var(--duration) linear infinite; }

        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="1"] .check,
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="1"] .check { animation: ck1 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="2"] .check,
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="2"] .check { animation: ck2 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="3"] .check,
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="3"] .check { animation: ck3 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="4"] .check,
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="4"] .check { animation: ck4 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="5"] .check,
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="5"] .check { animation: ck5 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-sidebar li[data-step="6"] .check,
        .np-fswp .calc-stage[data-anim="on"] .calc-sidebar li[data-step="6"] .check { animation: ck6 var(--duration) linear infinite; }

        @keyframes sp1 { 0%, 10% { opacity: 1; } 11%, 94% { opacity: 0; } 95%, 100% { opacity: 1; } }
        @keyframes sp2 { 0%, 22% { opacity: 1; } 23%, 94% { opacity: 0; } 95%, 100% { opacity: 1; } }
        @keyframes sp3 { 0%, 34% { opacity: 1; } 35%, 94% { opacity: 0; } 95%, 100% { opacity: 1; } }
        @keyframes sp4 { 0%, 46% { opacity: 1; } 47%, 94% { opacity: 0; } 95%, 100% { opacity: 1; } }
        @keyframes sp5 { 0%, 58% { opacity: 1; } 59%, 94% { opacity: 0; } 95%, 100% { opacity: 1; } }
        @keyframes sp6 { 0%, 71% { opacity: 1; } 72%, 94% { opacity: 0; } 95%, 100% { opacity: 1; } }
        @keyframes ck1 {
          0%,   10% { opacity: 0; transform: scale(0.5); }
          11%,  13% { opacity: 1; transform: scale(1.25); }
          14%,  94% { opacity: 1; transform: scale(1); }
          95%, 100% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes ck2 {
          0%,   22% { opacity: 0; transform: scale(0.5); }
          23%,  25% { opacity: 1; transform: scale(1.25); }
          26%,  94% { opacity: 1; transform: scale(1); }
          95%, 100% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes ck3 {
          0%,   34% { opacity: 0; transform: scale(0.5); }
          35%,  37% { opacity: 1; transform: scale(1.25); }
          38%,  94% { opacity: 1; transform: scale(1); }
          95%, 100% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes ck4 {
          0%,   46% { opacity: 0; transform: scale(0.5); }
          47%,  49% { opacity: 1; transform: scale(1.25); }
          50%,  94% { opacity: 1; transform: scale(1); }
          95%, 100% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes ck5 {
          0%,   58% { opacity: 0; transform: scale(0.5); }
          59%,  61% { opacity: 1; transform: scale(1.25); }
          62%,  94% { opacity: 1; transform: scale(1); }
          95%, 100% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes ck6 {
          0%,   71% { opacity: 0; transform: scale(0.5); }
          72%,  74% { opacity: 1; transform: scale(1.25); }
          75%,  94% { opacity: 1; transform: scale(1); }
          95%, 100% { opacity: 0; transform: scale(0.5); }
        }

        /* MAIN PANEL + PANES ------------------------------ */
        .np-crs .calc-panel,
        .np-fswp .calc-panel {
          background: var(--white);
          border: 1px solid var(--inkc-5);
          border-radius: 14px;
          padding: 24px 24px 16px;
          min-height: 440px;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .np-fswp .calc-panel { min-height: 520px; }
        .np-crs .calc-panel .pane,
        .np-fswp .calc-panel .pane {
          position: absolute;
          inset: 24px 24px 16px;
          opacity: 0;
          transform: translateY(6px);
        }
        .np-crs .calc-panel .pane h2,
        .np-fswp .calc-panel .pane h2 {
          font-family: var(--type);
          font-weight: 700;
          font-size: 19px;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .np-crs .calc-panel .pane .head,
        .np-fswp .calc-panel .pane .head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .np-crs .calc-panel .pane .head .av,
        .np-fswp .calc-panel .pane .head .av {
          width: 30px; height: 30px;
          border-radius: 50%;
          display: grid; place-items: center;
          color: #fff;
          font-size: 13px;
          flex-shrink: 0;
        }
        .np-crs .av.blue,   .np-fswp .av.blue   { background: linear-gradient(135deg, var(--blue-600), var(--blue-700)); }
        .np-crs .av.pink,   .np-fswp .av.pink   { background: linear-gradient(135deg, var(--pink-600), var(--pink-700)); }
        .np-crs .av.red,    .np-fswp .av.red    { background: linear-gradient(135deg, var(--red), var(--red-d)); }
        .np-crs .av.green,  .np-fswp .av.green  { background: linear-gradient(135deg, var(--green-600), var(--green-700)); }
        .np-crs .av.purple, .np-fswp .av.purple { background: linear-gradient(135deg, var(--purple-600), var(--purple-700)); }
        .np-crs .av.orange, .np-fswp .av.orange { background: linear-gradient(135deg, var(--orange-600), var(--orange-700)); }
        .np-crs .av.yellow, .np-fswp .av.yellow { background: linear-gradient(135deg, var(--yellow-600), var(--yellow-700)); }

        .np-crs .calc-panel label,
        .np-fswp .calc-panel label {
          display: block;
          font-family: var(--type);
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .np-crs .calc-panel label .req,
        .np-fswp .calc-panel label .req,
        .np-crs .calc-panel .req,
        .np-fswp .calc-panel .req { color: var(--red); }

        .np-crs .calc-panel .select,
        .np-fswp .calc-panel .select {
          width: 100%;
          height: 42px;
          background: #fff;
          border: 1px solid var(--inkc-4);
          border-radius: 8px;
          padding: 0 14px;
          font-family: var(--type);
          font-size: 13px;
          color: var(--inkc-3);
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          transition: border-color 0.3s ease, color 0.3s ease;
          position: relative;
        }
        .np-crs .calc-panel .select::after,
        .np-fswp .calc-panel .select::after {
          content: "▾";
          color: var(--inkc-3);
          font-size: 11px;
        }
        .np-crs .calc-panel .row,
        .np-fswp .calc-panel .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .np-crs .calc-panel .info-card,
        .np-fswp .calc-panel .info-card {
          border-radius: 10px;
          padding: 12px 14px;
          border-left: 4px solid;
          margin-bottom: 12px;
          font-family: var(--type);
          font-size: 12px;
          color: var(--inkc-2);
          line-height: 1.5;
        }
        .np-crs .calc-panel .info-card.blue,
        .np-fswp .calc-panel .info-card.blue   { background: linear-gradient(90deg, var(--blue-50), var(--blue-100));   border-color: var(--blue-600); }
        .np-fswp .calc-panel .info-card.green  { background: linear-gradient(90deg, var(--green-50), var(--green-100)); border-color: var(--green-600); }
        .np-fswp .calc-panel .info-card.pink   { background: linear-gradient(90deg, var(--pink-50), var(--pink-100));   border-color: var(--pink-600); }
        .np-fswp .calc-panel .info-card.yellow { background: linear-gradient(90deg, var(--yellow-50), var(--yellow-100)); border-color: var(--yellow-600); }
        .np-fswp .calc-panel .info-card.orange { background: linear-gradient(90deg, var(--orange-50), var(--orange-100)); border-color: var(--orange-600); }
        .np-fswp .calc-panel .info-card.purple { background: linear-gradient(90deg, var(--purple-50), var(--purple-100)); border-color: var(--purple-600); }
        .np-crs .calc-panel .info-card b,
        .np-fswp .calc-panel .info-card b { color: var(--ink); }

        /* pane visibility windows */
        .np-crs .calc-stage[data-anim="on"] .pane.p1,
        .np-fswp .calc-stage[data-anim="on"] .pane.p1 { animation: pa1 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .pane.p2,
        .np-fswp .calc-stage[data-anim="on"] .pane.p2 { animation: pa2 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .pane.p3,
        .np-fswp .calc-stage[data-anim="on"] .pane.p3 { animation: pa3 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .pane.p4,
        .np-fswp .calc-stage[data-anim="on"] .pane.p4 { animation: pa4 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .pane.p5,
        .np-fswp .calc-stage[data-anim="on"] .pane.p5 { animation: pa5 var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .pane.p6,
        .np-fswp .calc-stage[data-anim="on"] .pane.p6 { animation: pa6 var(--duration) linear infinite; }
        @keyframes pa1 { 0%, 10% { opacity: 1; transform: translateY(0); } 11%, 100% { opacity: 0; transform: translateY(-6px); } }
        @keyframes pa2 { 0%, 11% { opacity: 0; transform: translateY(6px); } 12%, 22% { opacity: 1; transform: translateY(0); } 23%, 100% { opacity: 0; transform: translateY(-6px); } }
        @keyframes pa3 { 0%, 23% { opacity: 0; transform: translateY(6px); } 24%, 34% { opacity: 1; transform: translateY(0); } 35%, 100% { opacity: 0; transform: translateY(-6px); } }
        @keyframes pa4 { 0%, 35% { opacity: 0; transform: translateY(6px); } 36%, 46% { opacity: 1; transform: translateY(0); } 47%, 100% { opacity: 0; transform: translateY(-6px); } }
        @keyframes pa5 { 0%, 47% { opacity: 0; transform: translateY(6px); } 48%, 58% { opacity: 1; transform: translateY(0); } 59%, 100% { opacity: 0; transform: translateY(-6px); } }
        @keyframes pa6 { 0%, 59% { opacity: 0; transform: translateY(6px); } 60%, 71% { opacity: 1; transform: translateY(0); } 72%, 100% { opacity: 0; transform: translateY(-6px); } }

        /* CRS select fill (s1..s6b) */
        .np-crs .calc-panel .select.s1  { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) *  2/100); }
        .np-crs .calc-panel .select.s2  { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 14/100); }
        .np-crs .calc-panel .select.s3  { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 26/100); }
        .np-crs .calc-panel .select.s4a { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 37/100); }
        .np-crs .calc-panel .select.s4b { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 38/100); }
        .np-crs .calc-panel .select.s4c { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 39/100); }
        .np-crs .calc-panel .select.s4d { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 40/100); }
        .np-crs .calc-panel .select.s5a { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 50/100); }
        .np-crs .calc-panel .select.s5b { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 52/100); }
        .np-crs .calc-panel .select.s6a { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 62/100); }
        .np-crs .calc-panel .select.s6b { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 64/100); }
        @keyframes fillSelect {
          0%,  2%    { color: var(--inkc-3); border-color: var(--inkc-4); }
          3%,  94%   { color: var(--ink); border-color: var(--inkc-3); }
          95%, 100%  { color: var(--inkc-3); border-color: var(--inkc-4); }
        }

        .np-crs .calc-panel .select .placeholder,
        .np-crs .calc-panel .select .picked,
        .np-fswp .calc-panel .select .placeholder,
        .np-fswp .calc-panel .select .picked {
          transition: opacity 0.3s ease;
        }
        .np-crs .calc-panel .select .picked,
        .np-fswp .calc-panel .select .picked { opacity: 0; position: absolute; }

        /* CRS placeholder/picked swap */
        .np-crs .calc-panel .select.s1 .placeholder { animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) *  2/100); }
        .np-crs .calc-panel .select.s1 .picked      { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) *  2/100); }
        .np-crs .calc-panel .select.s2 .placeholder { animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 14/100); }
        .np-crs .calc-panel .select.s2 .picked      { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 14/100); }
        .np-crs .calc-panel .select.s3 .placeholder { animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 26/100); }
        .np-crs .calc-panel .select.s3 .picked      { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 26/100); }
        .np-crs .calc-panel .select.s4a .placeholder{ animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 37/100); }
        .np-crs .calc-panel .select.s4a .picked     { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 37/100); }
        .np-crs .calc-panel .select.s4b .placeholder{ animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 38/100); }
        .np-crs .calc-panel .select.s4b .picked     { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 38/100); }
        .np-crs .calc-panel .select.s4c .placeholder{ animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 39/100); }
        .np-crs .calc-panel .select.s4c .picked     { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 39/100); }
        .np-crs .calc-panel .select.s4d .placeholder{ animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 40/100); }
        .np-crs .calc-panel .select.s4d .picked     { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 40/100); }
        .np-crs .calc-panel .select.s5a .placeholder{ animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 50/100); }
        .np-crs .calc-panel .select.s5a .picked     { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 50/100); }
        .np-crs .calc-panel .select.s5b .placeholder{ animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 52/100); }
        .np-crs .calc-panel .select.s5b .picked     { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 52/100); }
        .np-crs .calc-panel .select.s6a .placeholder{ animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 62/100); }
        .np-crs .calc-panel .select.s6a .picked     { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 62/100); }
        .np-crs .calc-panel .select.s6b .placeholder{ animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 64/100); }
        .np-crs .calc-panel .select.s6b .picked     { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 64/100); }
        @keyframes hidePlaceholder {
          0%,   2%   { opacity: 1; }
          3%,  94%   { opacity: 0; }
          95%, 100%  { opacity: 1; }
        }
        @keyframes showPicked {
          0%,   2%   { opacity: 0; transform: translateY(2px); }
          3%,  94%   { opacity: 1; transform: translateY(0); }
          95%, 100%  { opacity: 0; transform: translateY(2px); }
        }

        /* pane footer "Next →" -------------------------- */
        .np-crs .calc-panel .pane-foot,
        .np-fswp .calc-panel .pane-foot {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding-top: 16px;
          border-top: 1px solid var(--inkc-5);
          display: flex;
          justify-content: flex-end;
        }
        .np-crs .calc-panel .btn-next,
        .np-fswp .calc-panel .btn-next {
          background: linear-gradient(90deg, var(--red), var(--red-d));
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 9px 18px;
          font-family: var(--type);
          font-weight: 600;
          font-size: 12.5px;
          letter-spacing: 0.01em;
          box-shadow: 0 6px 12px -6px rgba(185, 32, 37, 0.6);
        }

        /* CTA + progress ------------------------------- */
        .np-crs .calc-cta-wrap,
        .np-fswp .calc-cta-wrap {
          margin-top: 20px;
          text-align: center;
        }
        .np-crs .calc-cta,
        .np-fswp .calc-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 11px 22px;
          background: var(--inkc-4);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 13.5px;
          letter-spacing: 0.01em;
          box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.2);
          transition: background 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease;
        }
        .np-crs .calc-stage[data-anim="on"] .calc-cta,
        .np-fswp .calc-stage[data-anim="on"] .calc-cta { animation: ctaActivate var(--duration) linear infinite; }
        @keyframes ctaActivate {
          0%,   72% { background: #b7b3af; box-shadow: 0 8px 16px -8px rgba(0,0,0,0.2); }
          73%,  75% { background: linear-gradient(90deg, var(--red), var(--red-d)); transform: scale(1.06); box-shadow: 0 12px 24px -8px rgba(185,32,37,0.55); }
          76%, 100% { background: linear-gradient(90deg, var(--red), var(--red-d)); transform: scale(1); box-shadow: 0 8px 16px -8px rgba(185,32,37,0.4); }
        }
        .np-crs .calc-cta .ic,
        .np-fswp .calc-cta .ic { font-size: 13px; }

        .np-crs .calc-progress,
        .np-fswp .calc-progress {
          margin-top: 10px;
          font-family: var(--type);
          font-size: 11px;
          font-weight: 500;
          color: var(--inkc-3);
          letter-spacing: 0.01em;
        }
        .np-crs .calc-progress .pct,
        .np-fswp .calc-progress .pct {
          /* inline-grid stacks all .v in one cell — container keeps real
             intrinsic height so it baseline-aligns with "Form progress:" */
          display: inline-grid;
          grid-template: auto / auto;
          vertical-align: baseline;
          color: var(--red);
          font-weight: 700;
        }
        .np-crs .calc-progress .pct .v,
        .np-fswp .calc-progress .pct .v {
          grid-column: 1;
          grid-row: 1;
          opacity: 0;
        }
        .np-crs .calc-progress .pct .v:first-child,
        .np-fswp .calc-progress .pct .v:first-child { opacity: 1; }

        .np-crs .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="0"],
        .np-fswp .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="0"]   { animation: pctV0   var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="13"],
        .np-fswp .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="13"]  { animation: pctV13  var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="27"],
        .np-fswp .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="27"]  { animation: pctV27  var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="40"],
        .np-fswp .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="40"]  { animation: pctV40  var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="60"],
        .np-fswp .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="60"]  { animation: pctV60  var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="75"],
        .np-fswp .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="75"]  { animation: pctV75  var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="100"],
        .np-fswp .calc-stage[data-anim="on"] .calc-progress .pct .v[data-v="100"] { animation: pctV100 var(--duration) linear infinite; }
        @keyframes pctV0   { 0%, 9%   { opacity: 1; } 10%, 100% { opacity: 0; } }
        @keyframes pctV13  { 0%, 9%   { opacity: 0; } 10%, 21%  { opacity: 1; } 22%, 100% { opacity: 0; } }
        @keyframes pctV27  { 0%, 21%  { opacity: 0; } 22%, 33%  { opacity: 1; } 34%, 100% { opacity: 0; } }
        @keyframes pctV40  { 0%, 33%  { opacity: 0; } 34%, 45%  { opacity: 1; } 46%, 100% { opacity: 0; } }
        @keyframes pctV60  { 0%, 45%  { opacity: 0; } 46%, 57%  { opacity: 1; } 58%, 100% { opacity: 0; } }
        @keyframes pctV75  { 0%, 57%  { opacity: 0; } 58%, 69%  { opacity: 1; } 70%, 100% { opacity: 0; } }
        @keyframes pctV100 { 0%, 69%  { opacity: 0; } 70%, 100% { opacity: 1; } }

        .np-crs .calc-progress-bar,
        .np-fswp .calc-progress-bar {
          margin: 8px auto 0;
          height: 4px;
          background: #ebe9e7;
          border-radius: 4px;
          overflow: hidden;
          max-width: 320px;
        }
        .np-crs .calc-progress-bar > span,
        .np-fswp .calc-progress-bar > span {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, var(--red), var(--red-d));
          width: 0%;
          border-radius: 4px;
        }
        .np-crs .calc-stage[data-anim="on"] .calc-progress-bar > span,
        .np-fswp .calc-stage[data-anim="on"] .calc-progress-bar > span { animation: fillProgress var(--duration) linear infinite; }
        @keyframes fillProgress {
          0%   { width: 0%; }
          10%  { width: 13%; }
          22%  { width: 27%; }
          34%  { width: 40%; }
          46%  { width: 60%; }
          58%  { width: 75%; }
          70%  { width: 100%; }
          75%, 100% { width: 100%; }
        }

        /* RESULTS CARD --------------------------------- */
        .np-crs .results-card,
        .np-fswp .results-card {
          background: var(--white);
          border: 1px solid var(--inkc-5);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 24px 48px -32px rgba(0,0,0,0.25);
        }
        .np-crs .results-head,
        .np-fswp .results-head {
          background: linear-gradient(90deg, var(--red), var(--red-d));
          padding: 26px 30px;
          color: #fff;
          text-align: center;
        }
        .np-crs .results-head h2,
        .np-fswp .results-head h2 {
          font-family: var(--type);
          font-weight: 700;
          font-size: 24px;
          margin-bottom: 5px;
          letter-spacing: -0.01em;
        }
        .np-crs .results-head p,
        .np-fswp .results-head p {
          color: rgba(255,255,255,0.85);
          font-family: var(--type);
          font-size: 12.5px;
        }
        .np-crs .results-score {
          padding: 32px 24px 28px;
          text-align: center;
          background: linear-gradient(135deg, var(--blue-50), #e8eefc);
        }
        .np-fswp .results-score {
          padding: 32px 24px 28px;
          text-align: center;
          background: linear-gradient(135deg, #fffbeb, #fef9c3);
        }
        .np-crs .score-circle,
        .np-fswp .score-circle {
          width: 120px;
          height: 120px;
          margin: 0 auto 16px;
          background: linear-gradient(135deg, var(--red), var(--red-d));
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #fff;
          box-shadow: 0 24px 32px -16px rgba(185, 32, 37, 0.55);
          position: relative;
        }
        .np-crs .score-circle::before,
        .np-fswp .score-circle::before {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1.5px dashed rgba(185, 32, 37, 0.25);
        }
        .np-crs .score-circle .num,
        .np-fswp .score-circle .num {
          font-family: var(--type);
          font-weight: 800;
          font-size: 36px;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .np-crs .score-circle .lbl,
        .np-fswp .score-circle .lbl {
          font-family: var(--type);
          font-size: 10.5px;
          opacity: 0.9;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-top: 2px;
        }
        .np-crs .calc-stage[data-anim="on"] .score-circle,
        .np-fswp .calc-stage[data-anim="on"] .score-circle { animation: scoreIn var(--duration) linear infinite; }
        @keyframes scoreIn {
          0%, 75%   { opacity: 0; transform: scale(0.7); }
          78%, 95%  { opacity: 1; transform: scale(1); }
          96%, 100% { opacity: 0; transform: scale(0.95); }
        }
        .np-crs .results-total,
        .np-fswp .results-total {
          font-family: var(--type);
          font-weight: 600;
          font-size: 17px;
          color: var(--ink);
        }
        .np-crs .results-grid-wrap,
        .np-fswp .results-grid-wrap {
          padding: 22px 22px 16px;
        }
        .np-crs .results-grid-wrap .grid-head,
        .np-fswp .results-grid-wrap .grid-head {
          font-family: var(--type);
          font-weight: 700;
          font-size: 13.5px;
          margin-bottom: 12px;
          color: var(--ink);
        }

        /* CRS results: 4-tile grid */
        .np-crs .results-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .np-crs .results-grid > article {
          border: 1px solid;
          border-radius: 10px;
          padding: 12px;
          font-family: var(--type);
          font-size: 11px;
          line-height: 1.5;
          opacity: 0;
          transform: translateY(8px);
        }
        .np-crs .calc-stage[data-anim="on"] .results-grid > article { animation: cardIn var(--duration) linear infinite; }
        .np-crs .calc-stage[data-anim="on"] .results-grid > article:nth-child(1) { animation-delay: calc(var(--duration) * 0.5/100); }
        .np-crs .calc-stage[data-anim="on"] .results-grid > article:nth-child(2) { animation-delay: calc(var(--duration) * 1.5/100); }
        .np-crs .calc-stage[data-anim="on"] .results-grid > article:nth-child(3) { animation-delay: calc(var(--duration) * 2.5/100); }
        .np-crs .calc-stage[data-anim="on"] .results-grid > article:nth-child(4) { animation-delay: calc(var(--duration) * 3.5/100); }
        @keyframes cardIn {
          0%, 76%   { opacity: 0; transform: translateY(8px); }
          79%, 96%  { opacity: 1; transform: translateY(0); }
          97%, 100% { opacity: 0; transform: translateY(0); }
        }
        .np-crs .results-grid article .top {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 6px;
        }
        .np-crs .results-grid article h5 {
          font-family: var(--type);
          font-weight: 700;
          font-size: 12px;
          line-height: 1.25;
          max-width: 70%;
        }
        .np-crs .results-grid article .score {
          font-family: var(--type);
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -0.02em;
        }
        .np-crs .results-grid article ul {
          list-style: none; display: flex; flex-direction: column; gap: 2px;
          padding: 0; margin: 0;
        }
        .np-crs .results-grid article ul li.indent { padding-left: 10px; }
        .np-crs .results-grid article ul li.subtotal { font-weight: 700; padding-top: 4px; margin-top: 4px; border-top: 1px solid currentColor; opacity: 0.8; }
        .np-crs .results-grid article ul li.italic { font-style: italic; }
        .np-crs .results-grid article.c-core   { background: var(--blue-50);   border-color: var(--blue-200);   color: var(--blue-700); }
        .np-crs .results-grid article.c-core   h5 { color: var(--blue-800); }
        .np-crs .results-grid article.c-core   .score { color: var(--blue-600); }
        .np-crs .results-grid article.c-spouse { background: var(--pink-50);   border-color: var(--pink-200);   color: var(--pink-700); }
        .np-crs .results-grid article.c-spouse h5 { color: var(--pink-800); }
        .np-crs .results-grid article.c-spouse .score { color: var(--pink-600); }
        .np-crs .results-grid article.c-trans  { background: var(--green-50);  border-color: var(--green-200);  color: var(--green-700); }
        .np-crs .results-grid article.c-trans  h5 { color: var(--green-800); }
        .np-crs .results-grid article.c-trans  .score { color: var(--green-600); }
        .np-crs .results-grid article.c-add    { background: var(--purple-50); border-color: var(--purple-200); color: var(--purple-700); }
        .np-crs .results-grid article.c-add    h5 { color: var(--purple-800); }
        .np-crs .results-grid article.c-add    .score { color: var(--purple-600); }

        /* FSWP "Important Notice" red banner */
        .np-fswp .alert {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 14px;
          background: linear-gradient(90deg, #fef2f2, #fee2e2);
          border: 1px solid #fecaca;
          border-radius: 8px;
          margin-bottom: 14px;
          font-family: var(--type);
          font-size: 12px;
          color: #991b1b;
          line-height: 1.45;
        }
        .np-fswp .alert .ai {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #dc2626;
          color: #fff;
          display: grid; place-items: center;
          font-weight: 800;
          font-size: 11px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .np-fswp .alert b { color: #7f1d1d; font-weight: 700; }

        /* FSWP dual test-card layout */
        .np-fswp .dual-test {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 14px;
        }
        .np-fswp .test-card {
          border-radius: 10px;
          padding: 12px 12px 10px;
          border: 1px solid;
        }
        .np-fswp .test-card.blue  { background: linear-gradient(180deg, var(--blue-50), #fbfdff);  border-color: var(--blue-200); }
        .np-fswp .test-card.green { background: linear-gradient(180deg, var(--green-50), #fcfffd); border-color: var(--green-200); }
        .np-fswp .test-card h6 {
          display: flex; align-items: center; gap: 7px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 12px;
          margin-bottom: 6px;
          letter-spacing: -0.005em;
        }
        .np-fswp .test-card .num {
          display: inline-grid; place-items: center;
          width: 18px; height: 18px;
          border-radius: 50%;
          color: #fff; font-size: 10px; font-weight: 800;
          flex-shrink: 0;
        }
        .np-fswp .test-card.blue  h6 { color: var(--blue-800); }
        .np-fswp .test-card.blue  .num { background: var(--blue-600); }
        .np-fswp .test-card.green h6 { color: var(--green-800); }
        .np-fswp .test-card.green .num { background: var(--green-600); }
        .np-fswp .test-card .hint {
          font-family: var(--type);
          font-size: 10.5px;
          color: var(--inkc-3);
          line-height: 1.5;
          margin-bottom: 8px;
        }
        .np-fswp .test-card .scores-head {
          font-family: var(--type);
          font-size: 10.5px;
          color: var(--blue-700);
          font-weight: 700;
          text-decoration: underline;
          margin: 4px 0 6px;
        }
        .np-fswp .test-card label { font-size: 11px; margin-bottom: 4px; font-weight: 600; }
        .np-fswp .test-card .select {
          height: 32px;
          font-size: 11.5px;
          padding: 0 9px;
          margin-bottom: 6px;
        }
        .np-fswp .skill-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }
        .np-fswp .skill-grid .select { margin-bottom: 0; }

        /* FSWP select fill timing (fs1..fs5 + fs1a..fs1d) */
        .np-fswp .calc-panel .select.fs1  { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) *  2/100); }
        .np-fswp .calc-panel .select.fs1a { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) *  4/100); }
        .np-fswp .calc-panel .select.fs1b { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) *  5/100); }
        .np-fswp .calc-panel .select.fs1c { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) *  6/100); }
        .np-fswp .calc-panel .select.fs1d { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) *  7/100); }
        .np-fswp .calc-panel .select.fs1e { color: var(--ink); border-color: var(--inkc-3); }
        .np-fswp .calc-panel .select.fs2  { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 14/100); }
        .np-fswp .calc-panel .select.fs3  { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 26/100); }
        .np-fswp .calc-panel .select.fs4  { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 38/100); }
        .np-fswp .calc-panel .select.fs5  { animation: fillSelect var(--duration) linear infinite; animation-delay: calc(var(--duration) * 50/100); }

        .np-fswp .calc-panel .select.fs1  .placeholder { animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) *  2/100); }
        .np-fswp .calc-panel .select.fs1  .picked      { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) *  2/100); }
        .np-fswp .calc-panel .select.fs1a .placeholder { animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) *  4/100); }
        .np-fswp .calc-panel .select.fs1a .picked      { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) *  4/100); }
        .np-fswp .calc-panel .select.fs1b .placeholder { animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) *  5/100); }
        .np-fswp .calc-panel .select.fs1b .picked      { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) *  5/100); }
        .np-fswp .calc-panel .select.fs1c .placeholder { animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) *  6/100); }
        .np-fswp .calc-panel .select.fs1c .picked      { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) *  6/100); }
        .np-fswp .calc-panel .select.fs1d .placeholder { animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) *  7/100); }
        .np-fswp .calc-panel .select.fs1d .picked      { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) *  7/100); }
        .np-fswp .calc-panel .select.fs1e .placeholder { opacity: 0; }
        .np-fswp .calc-panel .select.fs1e .picked      { opacity: 1; position: relative; }
        .np-fswp .calc-panel .select.fs2  .placeholder { animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 14/100); }
        .np-fswp .calc-panel .select.fs2  .picked      { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 14/100); }
        .np-fswp .calc-panel .select.fs3  .placeholder { animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 26/100); }
        .np-fswp .calc-panel .select.fs3  .picked      { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 26/100); }
        .np-fswp .calc-panel .select.fs4  .placeholder { animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 38/100); }
        .np-fswp .calc-panel .select.fs4  .picked      { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 38/100); }
        .np-fswp .calc-panel .select.fs5  .placeholder { animation: hidePlaceholder var(--duration) linear infinite; animation-delay: calc(var(--duration) * 50/100); }
        .np-fswp .calc-panel .select.fs5  .picked      { animation: showPicked      var(--duration) linear infinite; animation-delay: calc(var(--duration) * 50/100); }

        /* FSWP adaptability checklist */
        .np-fswp .check-list {
          display: flex; flex-direction: column; gap: 8px;
          margin-bottom: 14px;
        }
        .np-fswp .ck-item {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 13px;
          border: 1px solid var(--inkc-5);
          border-radius: 9px;
          background: #fafafa;
          font-family: var(--type);
          font-size: 12.5px;
          color: var(--ink);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .np-fswp .ck-item .box {
          width: 18px; height: 18px;
          border: 1.5px solid var(--inkc-4);
          border-radius: 4px;
          background: #fff;
          display: grid; place-items: center;
          color: transparent;
          font-size: 11px;
          font-weight: 800;
          line-height: 1;
          flex-shrink: 0;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
        .np-fswp .ck-item .lbl { flex: 1; }
        .np-fswp .ck-item .pts {
          font-family: var(--type);
          font-size: 10.5px;
          font-weight: 700;
          color: var(--yellow-700);
          background: rgba(202, 138, 4, 0.12);
          padding: 3px 9px;
          border-radius: 6px;
          flex-shrink: 0;
        }
        .np-fswp .calc-stage[data-anim="on"] .ck-item[data-c="1"]      { animation: ckRow1 var(--duration) linear infinite; }
        .np-fswp .calc-stage[data-anim="on"] .ck-item[data-c="2"]      { animation: ckRow2 var(--duration) linear infinite; }
        .np-fswp .calc-stage[data-anim="on"] .ck-item[data-c="3"]      { animation: ckRow3 var(--duration) linear infinite; }
        .np-fswp .calc-stage[data-anim="on"] .ck-item[data-c="1"] .box { animation: ckBox1 var(--duration) linear infinite; }
        .np-fswp .calc-stage[data-anim="on"] .ck-item[data-c="2"] .box { animation: ckBox2 var(--duration) linear infinite; }
        .np-fswp .calc-stage[data-anim="on"] .ck-item[data-c="3"] .box { animation: ckBox3 var(--duration) linear infinite; }
        @keyframes ckRow1 { 0%, 62% { background: #fafafa; border-color: var(--inkc-5); } 63%, 100% { background: var(--yellow-50); border-color: var(--yellow-300); } }
        @keyframes ckRow2 { 0%, 64% { background: #fafafa; border-color: var(--inkc-5); } 65%, 100% { background: var(--yellow-50); border-color: var(--yellow-300); } }
        @keyframes ckRow3 { 0%, 66% { background: #fafafa; border-color: var(--inkc-5); } 67%, 100% { background: var(--yellow-50); border-color: var(--yellow-300); } }
        @keyframes ckBox1 { 0%, 62% { background: #fff; border-color: var(--inkc-4); color: transparent; } 63%, 100% { background: var(--yellow-600); border-color: var(--yellow-600); color: #fff; } }
        @keyframes ckBox2 { 0%, 64% { background: #fff; border-color: var(--inkc-4); color: transparent; } 65%, 100% { background: var(--yellow-600); border-color: var(--yellow-600); color: #fff; } }
        @keyframes ckBox3 { 0%, 66% { background: #fff; border-color: var(--inkc-4); color: transparent; } 67%, 100% { background: var(--yellow-600); border-color: var(--yellow-600); color: #fff; } }

        /* FSWP results: eligibility note + 6-tile grid */
        .np-fswp .note-eligibility {
          background: linear-gradient(90deg, var(--yellow-50), #fffbeb);
          border: 1px solid var(--yellow-200);
          border-left: 4px solid var(--yellow-600);
          border-radius: 8px;
          padding: 11px 16px;
          margin: 0 0 16px;
          font-family: var(--type);
          font-size: 11.5px;
          color: #713f12;
          line-height: 1.55;
        }
        .np-fswp .note-eligibility b { color: #422006; font-weight: 700; }
        .np-fswp .results-grid-fswp {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 4px;
        }
        .np-fswp .results-grid-fswp > article {
          border: 1px solid;
          border-radius: 10px;
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(8px);
        }
        .np-fswp .results-grid-fswp .lbl {
          font-family: var(--type);
          font-size: 12px;
          font-weight: 600;
          line-height: 1.35;
          max-width: 70%;
        }
        .np-fswp .results-grid-fswp .lbl small {
          display: block;
          font-weight: 500;
          opacity: 0.78;
          font-size: 10.5px;
          margin-top: 2px;
        }
        .np-fswp .results-grid-fswp .num {
          font-family: var(--type);
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .np-fswp .results-grid-fswp article.t-lang  { background: var(--green-50);  border-color: var(--green-200);  color: var(--green-800); }
        .np-fswp .results-grid-fswp article.t-lang  .num { color: var(--green-600); }
        .np-fswp .results-grid-fswp article.t-adapt { background: var(--purple-50); border-color: var(--purple-200); color: var(--purple-800); }
        .np-fswp .results-grid-fswp article.t-adapt .num { color: var(--purple-600); }
        .np-fswp .results-grid-fswp article.t-edu   { background: var(--blue-50);   border-color: var(--blue-200);   color: var(--blue-800); }
        .np-fswp .results-grid-fswp article.t-edu   .num { color: var(--blue-600); }
        .np-fswp .results-grid-fswp article.t-emp   { background: var(--rose-50);   border-color: var(--rose-200);   color: var(--rose-800); }
        .np-fswp .results-grid-fswp article.t-emp   .num { color: var(--rose-600); }
        .np-fswp .results-grid-fswp article.t-work  { background: var(--orange-50); border-color: var(--orange-200); color: var(--orange-800); }
        .np-fswp .results-grid-fswp article.t-work  .num { color: var(--orange-600); }
        .np-fswp .results-grid-fswp article.t-age   { background: var(--pink-50);   border-color: var(--pink-200);   color: var(--pink-800); }
        .np-fswp .results-grid-fswp article.t-age   .num { color: var(--pink-600); }
        .np-fswp .calc-stage[data-anim="on"] .results-grid-fswp > article { animation: cardIn var(--duration) linear infinite; }
        .np-fswp .calc-stage[data-anim="on"] .results-grid-fswp > article:nth-child(1) { animation-delay: calc(var(--duration) * 0.4/100); }
        .np-fswp .calc-stage[data-anim="on"] .results-grid-fswp > article:nth-child(2) { animation-delay: calc(var(--duration) * 1.0/100); }
        .np-fswp .calc-stage[data-anim="on"] .results-grid-fswp > article:nth-child(3) { animation-delay: calc(var(--duration) * 1.6/100); }
        .np-fswp .calc-stage[data-anim="on"] .results-grid-fswp > article:nth-child(4) { animation-delay: calc(var(--duration) * 2.2/100); }
        .np-fswp .calc-stage[data-anim="on"] .results-grid-fswp > article:nth-child(5) { animation-delay: calc(var(--duration) * 2.8/100); }
        .np-fswp .calc-stage[data-anim="on"] .results-grid-fswp > article:nth-child(6) { animation-delay: calc(var(--duration) * 3.4/100); }

        .np-crs .results-foot,
        .np-fswp .results-foot {
          background: #f6f6f6;
          border-top: 1px solid var(--inkc-5);
          padding: 16px 22px;
          display: flex;
          justify-content: center;
          gap: 12px;
        }
        .np-crs .results-foot .btn,
        .np-fswp .results-foot .btn {
          padding: 9px 18px;
          border-radius: 8px;
          font-family: var(--type);
          font-size: 12.5px;
          font-weight: 600;
          border: none;
          cursor: default;
        }
        .np-crs .results-foot .btn.ghost,
        .np-fswp .results-foot .btn.ghost { background: #4a4847; color: #fff; }
        .np-crs .results-foot .btn.red,
        .np-fswp .results-foot .btn.red   { background: linear-gradient(90deg, var(--red), var(--red-d)); color: #fff; }

        @media (max-width: 880px) {
          .np-crs, .np-fswp { padding: 20px; }
          .np-crs .form-grid, .np-fswp .form-grid { grid-template-columns: 1fr; }
          .np-crs .calc-panel { min-height: 400px; }
          .np-fswp .calc-panel { min-height: 640px; }
          .np-fswp .dual-test { grid-template-columns: 1fr; }
          .np-crs .results-grid { grid-template-columns: 1fr; }
          .np-fswp .results-grid-fswp { grid-template-columns: 1fr; }
          .np-crs .score-circle, .np-fswp .score-circle { width: 96px; height: 96px; }
          .np-crs .score-circle .num, .np-fswp .score-circle .num { font-size: 30px; }
        }

        /* ╭───────────────────────────────────────────────╮
           │ DRAWS TRACKER — faithful to live design       │
           ╰───────────────────────────────────────────────╯ */
        .np-draws {
          background: #f8f8f8;
        }

        /* red banner header */
        .np-draws .dr-banner {
          background: linear-gradient(90deg, var(--red), var(--red-d, #8e1318));
          color: #fff;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }
        .np-draws .dr-banner-l {
          display: flex; align-items: center; gap: 12px;
        }
        .np-draws .dr-bi {
          width: 30px; height: 30px;
          display: grid; place-items: center;
          background: rgba(255,255,255,0.18);
          border-radius: 7px;
          font-size: 15px;
        }
        .np-draws .dr-banner-t h4 {
          font-family: var(--type);
          font-weight: 700;
          font-size: 16px;
          line-height: 1.2;
          letter-spacing: -0.005em;
          color: #fff;
          margin-bottom: 1px;
        }
        .np-draws .dr-banner-t p {
          font-family: var(--type);
          font-weight: 500;
          font-size: 11.5px;
          color: rgba(255,255,255,0.78);
        }
        .np-draws .dr-banner-r {
          color: rgba(255,255,255,0.72);
          font-size: 22px;
          line-height: 1;
          width: 28px; height: 28px;
          display: grid; place-items: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.10);
        }

        /* toolbar with filter chips + view toggle */
        .np-draws .dr-toolbar {
          background: #fff;
          border-bottom: 1px solid var(--ink-5);
          padding: 14px 24px 12px;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          gap: 14px;
          align-items: center;
        }
        .np-draws .dr-toolbar-lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-3);
          white-space: nowrap;
        }
        .np-draws .dr-chips {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          mask-image: linear-gradient(90deg, #000 0%, #000 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 92%, transparent 100%);
        }
        .np-draws .dr-chips::-webkit-scrollbar { display: none; }
        .np-draws .dr-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 10px;
          background: #f3f3f3;
          border: 1px solid #e5e5e5;
          border-radius: 999px;
          font-family: var(--type);
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.005em;
          color: var(--ink-2);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .np-draws .dr-chip em {
          font-style: normal;
          font-weight: 700;
          font-size: 9.5px;
          color: var(--ink-3);
          background: #fff;
          border-radius: 999px;
          padding: 1px 6px;
        }
        .np-draws .dr-chip.on {
          background: var(--ink);
          color: #fff;
          border-color: var(--ink);
        }
        .np-draws .dr-chip.on em {
          color: #fff;
          background: rgba(255,255,255,0.18);
        }
        .np-draws .dr-view {
          display: inline-flex;
          gap: 4px;
          padding: 3px;
          background: #f3f3f3;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
        }
        .np-draws .dr-vw {
          padding: 4px 10px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 9.5px;
          letter-spacing: 0.14em;
          color: var(--ink-3);
          border-radius: 4px;
          white-space: nowrap;
        }
        .np-draws .dr-vw.on {
          background: #fff;
          color: var(--red);
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        /* pagination row */
        .np-draws .dr-pag {
          background: #fff;
          border-bottom: 1px solid var(--ink-5);
          padding: 10px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--type);
          font-weight: 600;
          font-size: 11.5px;
          color: var(--ink-3);
        }
        .np-draws .dr-pag-prev,
        .np-draws .dr-pag-next {
          padding: 4px 9px;
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          color: var(--ink-2);
          background: #fafafa;
        }
        .np-draws .dr-pag-prev { opacity: 0.5; }
        .np-draws .dr-pag-page {
          color: var(--ink-2);
        }
        .np-draws .dr-pag-page b { color: var(--ink); font-weight: 800; }
        .np-draws .dr-pag-info {
          margin-left: auto;
          font-size: 10.5px;
          letter-spacing: 0.04em;
          color: var(--ink-3);
        }
        .np-draws .dr-pag-info b { color: var(--ink); font-weight: 800; }

        /* table */
        .np-draws .dr-table-wrap {
          background: #fff;
        }
        .np-draws .dr-table {
          width: 100%;
          border-collapse: collapse;
        }
        .np-draws .dr-table thead th {
          padding: 11px 18px;
          text-align: left;
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-3);
          background: #fafafa;
          border-bottom: 1px solid var(--ink-5);
          white-space: nowrap;
        }
        .np-draws .dr-table thead th.r { text-align: right; }
        .np-draws .dr-table tbody td {
          padding: 11px 18px;
          border-bottom: 1px solid var(--ink-5);
          font-family: var(--type);
          font-weight: 600;
          font-size: 12.5px;
          color: var(--ink);
          vertical-align: middle;
        }
        .np-draws .dr-table tbody td.r { text-align: right; }
        .np-draws .dr-table tbody td.dim { color: var(--ink-3); font-weight: 500; }
        .np-draws .dr-table tbody tr:last-child td { border-bottom: 0; }
        .np-draws .dr-table tbody tr:hover { background: #fafafa; }

        .np-draws .dr-id {
          font-family: var(--type);
          font-weight: 800;
          font-size: 12.5px;
          color: var(--red);
          letter-spacing: 0.01em;
        }
        .np-draws .dr-pill {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          font-family: var(--type);
          font-weight: 600;
          font-size: 10.5px;
          letter-spacing: 0;
          border: 1px solid transparent;
          white-space: nowrap;
        }
        /* per-category pill colors */
        .np-draws .dr-pill.p-pnp { background: #fef2f2; color: #b91c1c; border-color: #fecaca; }
        .np-draws .dr-pill.p-cec { background: #fff7ed; color: #9a3412; border-color: #fed7aa; }
        .np-draws .dr-pill.p-fr  { background: #eff6ff; color: #1e40af; border-color: #bfdbfe; }
        .np-draws .dr-pill.p-tr  { background: #fef3c7; color: #92400e; border-color: #fde68a; }
        .np-draws .dr-pill.p-gen { background: #f3f4f6; color: #374151; border-color: #e5e7eb; }
        .np-draws .dr-pill.p-hc  { background: #fdf2f8; color: #9d174d; border-color: #fbcfe8; }

        .np-draws .dr-inv {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--type);
          font-weight: 600;
          font-size: 12.5px;
          color: var(--ink-2);
        }
        .np-draws .dr-inv .eye { color: var(--ink-4); font-size: 12px; }

        .np-draws .dr-score {
          display: inline-flex; align-items: center; gap: 4px;
          font-family: var(--type);
          font-weight: 800;
          font-size: 14px;
          color: var(--red);
          letter-spacing: -0.005em;
        }
        .np-draws .dr-score .arr { font-size: 12px; }

        .np-draws .dr-trend {
          display: inline-flex; align-items: center;
          padding: 3px 9px;
          border-radius: 999px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 10.5px;
          letter-spacing: 0.005em;
          white-space: nowrap;
        }
        .np-draws .dr-trend.down { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        .np-draws .dr-trend.up   { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }

        /* footer */
        .np-draws .dr-foot {
          padding: 12px 24px;
          background: #fff;
          border-top: 1px solid var(--ink-5);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          font-family: var(--type);
          font-weight: 500;
          font-size: 11px;
          color: var(--ink-3);
        }
        .np-draws .dr-refresh {
          padding: 7px 14px;
          background: linear-gradient(90deg, var(--red), var(--red-d, #8e1318));
          color: #fff;
          border: none;
          border-radius: 6px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.01em;
          display: inline-flex; align-items: center; gap: 6px;
          cursor: default;
        }

        @media (max-width: 880px) {
          .np-draws .dr-banner { padding: 14px 18px; }
          .np-draws .dr-toolbar {
            grid-template-columns: 1fr;
            padding: 12px 18px;
            gap: 10px;
          }
          .np-draws .dr-pag { padding: 10px 18px; flex-wrap: wrap; gap: 8px; }
          .np-draws .dr-pag-info { width: 100%; margin-left: 0; }
          .np-draws .dr-table thead th { padding: 10px 14px; font-size: 9px; }
          .np-draws .dr-table tbody td { padding: 10px 14px; font-size: 11.5px; }
          .np-draws .dr-foot { padding: 12px 18px; flex-direction: column; align-items: stretch; }
        }

        /* BILINGUAL */
        .np-bilingual-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }
        .np-bili-card {
          background: var(--paper);
          border: 1px solid var(--ink-5);
          border-radius: 6px;
          padding: 28px 28px 32px;
          position: relative;
          overflow: hidden;
          border-top: 4px solid var(--red);
        }
        .np-bili-card .flag {
          position: absolute;
          top: 22px;
          right: 22px;
          padding: 4px 10px;
          background: var(--red);
          color: var(--white);
          font-family: var(--type);
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.2em;
          border-radius: 3px;
        }
        .np-bili-card .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 12px;
        }
        .np-bili-card h4 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(20px, 2.4vw, 26px);
          line-height: 1.15;
          letter-spacing: -0.015em;
          color: var(--ink);
          margin-bottom: 14px;
          max-width: 22ch;
        }
        .np-bili-card h4 em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-bili-card p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 14px;
          line-height: 1.7;
          color: var(--ink-2);
          margin-bottom: 18px;
          max-width: 50ch;
        }
        .np-bili-card .routes {
          padding-top: 14px;
          border-top: 1px solid var(--ink-5);
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .np-bili-card .routes span {
          padding: 4px 9px;
          background: var(--white);
          border: 1px solid var(--ink-5);
          border-radius: 3px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.04em;
          color: var(--ink-1);
        }
        .np-bili-card .routes span b {
          color: var(--red);
          font-weight: 800;
        }
        @media (max-width: 720px) {
          .np-bilingual-grid { grid-template-columns: 1fr; }
        }

        /* SOCIAL POSTS GRID (clickable) */
        .np-social-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }
        .np-social-card {
          position: relative;
          background: var(--white);
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          padding: 0;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .np-social-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--red);
          z-index: 2;
        }
        .np-social-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px -16px rgba(44, 43, 43, 0.22);
          border-color: var(--red);
        }
        .np-social-card .badge {
          position: absolute;
          top: 8px;
          left: 8px;
          padding: 3px 7px;
          background: var(--ink);
          color: var(--white);
          font-family: var(--type);
          font-weight: 800;
          font-size: 8px;
          letter-spacing: 0.2em;
          border-radius: 2px;
          z-index: 3;
        }
        .np-social-card .pages {
          position: absolute;
          top: 8px;
          right: 8px;
          padding: 3px 7px;
          background: var(--white);
          color: var(--ink);
          font-family: var(--type);
          font-weight: 800;
          font-size: 8px;
          letter-spacing: 0.18em;
          border: 1px solid var(--ink-5);
          border-radius: 2px;
          z-index: 3;
        }
        .np-social-card .pages.live {
          background: var(--red);
          color: var(--white);
          border-color: var(--red);
        }
        @media (max-width: 880px) {
          .np-social-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 480px) {
          .np-social-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ABOUT */
        .np-about {
          background: var(--paper);
          padding: 0 var(--pad-x);
          border-top: 1px solid var(--ink-5);
        }
        .np-about-inner {
          max-width: var(--max);
          margin: 0 auto;
          padding: clamp(72px, 8vw, 112px) 0;
        }
        .np-about-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.4fr);
          gap: 64px;
          align-items: start;
          margin-top: 8px;
        }
        .np-about-portrait {
          background: var(--white);
          border: 1px solid var(--ink-5);
          padding: 14px 14px 18px;
          box-shadow: 0 16px 48px -24px rgba(44, 43, 43, 0.2);
          position: relative;
        }
        .np-about-portrait::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--red);
        }
        .np-about-portrait::after {
          content: "RCIC-IRB";
          position: absolute;
          top: 22px;
          left: -10px;
          padding: 5px 12px;
          background: var(--red);
          color: var(--white);
          font-family: var(--type);
          font-weight: 800;
          font-size: 9px;
          letter-spacing: 0.32em;
          box-shadow: 0 6px 14px -4px rgba(185, 32, 37, 0.4);
        }
        .np-about-portrait .ph {
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--paper);
          position: relative;
        }
        .np-about-portrait .who {
          padding-top: 14px;
          border-top: 3px solid var(--red);
          margin-top: 14px;
        }
        .np-about-portrait .who h4 {
          font-family: var(--type);
          font-weight: 800;
          font-size: 18px;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .np-about-portrait .who .role {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--red);
          margin: 4px 0 12px;
        }
        .np-about-portrait .who dl > div {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 6px 0;
          border-top: 1px dashed var(--ink-5);
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-about-portrait .who dl > div:first-child { border-top: 0; }
        .np-about-portrait .who dl dd {
          color: var(--ink);
          font-weight: 800;
        }
        .np-about-text { min-width: 0; }
        .np-about-text .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 16px;
        }
        .np-about-text h2 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(32px, 4vw, 56px);
          line-height: 1.0;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 22px;
        }
        .np-about-text h2 em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-about-text p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.8;
          color: var(--ink-2);
          margin-bottom: 1em;
          max-width: 60ch;
        }
        .np-about-text p strong { color: var(--ink); font-weight: 700; }
        .np-about-text p em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-dna {
          margin-top: 26px;
          padding-top: 22px;
          border-top: 1px solid var(--ink-5);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .np-dna .col h5 {
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 12px;
        }
        .np-dna .col .pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .np-dna .col .pills span {
          padding: 6px 11px;
          background: var(--white);
          border: 1px solid var(--ink-5);
          border-radius: 999px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.02em;
          color: var(--ink-1);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .np-dna .col .pills span:hover {
          border-color: var(--red);
          color: var(--red);
        }
        .np-dna .col .pills span.primary {
          background: var(--red);
          border-color: var(--red);
          color: var(--white);
        }
        @media (max-width: 880px) {
          .np-about-grid { grid-template-columns: 1fr; gap: 28px; }
          .np-dna { grid-template-columns: 1fr; gap: 14px; }
        }

        /* LIVE CTA */
        .np-live-cta {
          margin: 64px auto 0;
          padding: 30px 36px;
          background: var(--red);
          color: var(--white);
          border: 2px solid var(--ink);
          box-shadow: 10px 10px 0 var(--ink);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: center;
          transition: transform 0.3s, box-shadow 0.3s;
          max-width: var(--max);
        }
        .np-live-cta:hover {
          transform: translateY(-3px);
          box-shadow: 13px 13px 0 var(--ink);
        }
        .np-live-cta .text {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(22px, 3vw, 32px);
          letter-spacing: -0.015em;
          color: var(--white);
          line-height: 1.1;
        }
        .np-live-cta .text small {
          display: block;
          font-family: var(--type);
          font-weight: 500;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.85);
          margin-top: 6px;
          letter-spacing: 0;
        }
        .np-live-cta .visit {
          padding: 14px 22px;
          background: var(--white);
          color: var(--red);
          font-family: var(--type);
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        @media (max-width: 720px) {
          .np-live-cta {
            grid-template-columns: 1fr;
            padding: 22px;
          }
        }

        /* CLOSE */
        .np-close {
          background: var(--ink);
          color: var(--white);
          padding: 0 var(--pad-x);
          position: relative;
          overflow: hidden;
          border-top: 6px solid var(--red);
        }
        .np-close::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(185, 32, 37, 0.18), transparent 70%);
          pointer-events: none;
        }
        .np-close-inner {
          max-width: var(--max);
          margin: 0 auto;
          padding: clamp(80px, 9vw, 128px) 0 clamp(72px, 8vw, 112px);
          position: relative;
          z-index: 2;
        }
        .np-close-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.9fr);
          gap: 64px;
          align-items: end;
        }
        .np-close .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 22px;
        }
        .np-close h2 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(40px, 5.6vw, 88px);
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: var(--white);
          max-width: 14ch;
        }
        .np-close h2 em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-close .right { padding-bottom: 8px; }
        .np-close .right p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.7;
          color: var(--on-dark-2);
          margin-bottom: 1em;
          max-width: 36ch;
        }
        .np-close .right p b { color: var(--white); font-weight: 700; }
        .np-close .right .live-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 22px;
          background: var(--red);
          color: var(--white);
          font-family: var(--type);
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border-radius: 4px;
          margin-top: 18px;
          transition: background 0.2s, color 0.2s;
        }
        .np-close .right .live-link::after {
          content: "↗";
          font-size: 14px;
        }
        .np-close .right .live-link:hover {
          background: var(--white);
          color: var(--ink);
        }
        .np-credit {
          margin-top: clamp(56px, 7vw, 96px);
          padding-top: 28px;
          border-top: 1px solid var(--on-dark-3);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 18px;
          align-items: center;
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--on-dark-2);
        }
        .np-credit .center {
          text-align: center;
          color: var(--red);
          letter-spacing: 0.4em;
        }
        .np-credit .right { text-align: right; }
        .np-credit b { color: var(--white); font-weight: 800; }
        @media (max-width: 880px) {
          .np-close-grid { grid-template-columns: 1fr; gap: 28px; }
          .np-credit {
            grid-template-columns: 1fr;
            gap: 6px;
            text-align: center;
          }
          .np-credit .right { text-align: center; }
        }

        /* MODAL — NP brand styling */
        .np-modal {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: rgba(44, 43, 43, 0.88);
          backdrop-filter: blur(6px);
          animation: np-fade 0.22s ease-out;
        }
        @keyframes np-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .np-modal-stage {
          position: relative;
          width: min(960px, 92vw);
          height: min(92vh, 1200px);
          max-height: 92vh;
          background: var(--white);
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          overflow: hidden;
          animation: np-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow:
            0 32px 80px -16px rgba(0, 0, 0, 0.55),
            0 0 0 4px var(--red);
        }
        @keyframes np-pop {
          from {
            transform: scale(0.96);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .np-modal-bar {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-3);
          background: var(--paper);
        }
        .np-modal-bar.top {
          border-bottom: 2px solid var(--red);
          justify-content: space-between;
        }
        .np-modal-bar.bot {
          border-top: 1px solid var(--ink-5);
          justify-content: center;
          letter-spacing: 0;
          text-transform: none;
          font-weight: 600;
          color: var(--ink-2);
          font-size: 13px;
        }
        .np-modal-counter b {
          color: var(--red);
          font-weight: 900;
        }
        .np-modal-brand {
          letter-spacing: 0.32em;
          color: var(--ink);
          font-weight: 800;
        }
        .np-modal-close {
          width: 32px;
          height: 32px;
          background: var(--ink);
          color: var(--white);
          border: 0;
          cursor: pointer;
          font-family: var(--type);
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
          border-radius: 3px;
        }
        .np-modal-close:hover {
          background: var(--red);
          color: var(--white);
        }
        .np-modal-slate b {
          color: var(--ink);
          font-weight: 800;
        }
        .np-modal-slate em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-modal-body {
          flex: 1 1 auto;
          min-height: 0;
          position: relative;
          overflow: auto;
        }
        .np-modal-body.is-image {
          background: var(--ink);
          overflow: hidden;
        }
        .np-modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--white);
          color: var(--ink);
          border: 2px solid var(--ink);
          cursor: pointer;
          font-family: var(--type);
          font-size: 22px;
          font-weight: 700;
          line-height: 1;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, background 0.2s, color 0.2s;
          z-index: 5;
        }
        .np-modal-nav:hover {
          transform: translateY(-50%) scale(1.06);
          background: var(--red);
          color: var(--white);
          border-color: var(--red);
        }
        .np-modal-nav.prev { left: 32px; }
        .np-modal-nav.next { right: 32px; }
        @media (max-width: 720px) {
          .np-modal { padding: 16px; }
          .np-modal-stage {
            width: 100%;
            height: 86vh;
          }
          .np-modal-nav { width: 44px; height: 44px; font-size: 18px; }
          .np-modal-nav.prev { left: 8px; }
          .np-modal-nav.next { right: 8px; }
        }
      `}</style>
    </>
  );
}
