export const PARTIES = [
  { name:"DMK",    full:"Dravida Munnetra Kazhagam",              pct:49.48, vote:34.0, alliance:0.82, anti:0.62, social:0.75, media:0.60, caste:0.60, welfare:16, cand:7.0, spend:0.78, color:"#E84B3A", founded:1949 },
  { name:"AIADMK", full:"All India Anna Dravida Munnetra Kazhagam", pct:34.18, vote:30.0, alliance:0.65, anti:0.35, social:0.55, media:0.50, caste:0.68, welfare:10, cand:6.5, spend:0.65, color:"#3B82F6", founded:1972 },
  { name:"TVK",    full:"Tamilaga Vettri Kazhagam",                pct:9.14,  vote:8.0,  alliance:0.30, anti:0.10, social:0.85, media:0.70, caste:0.50, welfare:0,  cand:6.8, spend:0.55, color:"#8B5CF6", founded:2024 },
  { name:"MNM",    full:"Makkal Needhi Maiam",                     pct:3.07,  vote:2.5,  alliance:0.15, anti:0.10, social:0.55, media:0.40, caste:0.30, welfare:0,  cand:5.8, spend:0.25, color:"#EC4899", founded:2018 },
  { name:"BJP",    full:"Bharatiya Janata Party",                  pct:1.69,  vote:5.0,  alliance:0.35, anti:0.20, social:0.65, media:0.45, caste:0.28, welfare:8,  cand:5.5, spend:0.60, color:"#F97316", founded:1980 },
  { name:"PMK",    full:"Pattali Makkal Katchi",                   pct:0.81,  vote:6.0,  alliance:0.55, anti:0.25, social:0.40, media:0.40, caste:0.80, welfare:4,  cand:6.0, spend:0.45, color:"#10B981", founded:1989 },
  { name:"AMMK",   full:"Amma Makkal Munnetra Kazhagam",           pct:0.81,  vote:4.5,  alliance:0.25, anti:0.30, social:0.30, media:0.30, caste:0.55, welfare:2,  cand:5.0, spend:0.35, color:"#F59E0B", founded:2018 },
  { name:"DMDK",   full:"Desiya Murpokku Dravida Kazhagam",        pct:0.81,  vote:3.5,  alliance:0.30, anti:0.20, social:0.25, media:0.28, caste:0.45, welfare:2,  cand:5.2, spend:0.30, color:"#6B7280", founded:2005 },
];

export const MODELS = [
  { name:"Logistic Regression", cv:"1.0000 ± 0.0000", testAuc:"1.0000", testAcc:"100%", best:true  },
  { name:"Random Forest",       cv:"1.0000 ± 0.0000", testAuc:"1.0000", testAcc:"100%", best:false },
  { name:"XGBoost",             cv:"1.0000 ± 0.0000", testAuc:"1.0000", testAcc:"100%", best:false },
  { name:"Gradient Boosting",   cv:"1.0000 ± 0.0000", testAuc:"1.0000", testAcc:"100%", best:false },
  { name:"SVM",                 cv:"1.0000 ± 0.0000", testAuc:"1.0000", testAcc:"100%", best:false },
  { name:"Ensemble (Voting)",   cv:"—",               testAuc:"1.0000", testAcc:"100%", best:false },
];

export const FEATURES = [
  { name:"Vote × Alliance interaction", score:0.1487 },
  { name:"Welfare scheme count",        score:0.1382 },
  { name:"Vote share",                  score:0.1156 },
  { name:"Welfare × Candidate score",   score:0.1100 },
  { name:"Seat share",                  score:0.1068 },
  { name:"Campaign spend",              score:0.1018 },
  { name:"Media coverage",              score:0.0863 },
  { name:"Alliance bonus",              score:0.0845 },
  { name:"Net favorability",            score:0.0442 },
  { name:"Candidate reputation",        score:0.0416 },
];

export const CORR = [
  { name:"Welfare scheme",  r:0.8436 },
  { name:"Media coverage",  r:0.8432 },
  { name:"Vote share",      r:0.7872 },
  { name:"Seat share",      r:0.7651 },
  { name:"Campaign spend",  r:0.7571 },
  { name:"Alliance bonus",  r:0.7135 },
  { name:"Candidate rep.",  r:0.7009 },
  { name:"Caste factor",    r:0.3495 },
  { name:"Social media",    r:0.1123 },
  { name:"Anti-incumbency", r:-0.0118 },
];

export const HISTORY = [
  { year:1977, winner:"AIADMK", dmk:30, aiadmk:40 },
  { year:1980, winner:"DMK",    dmk:37, aiadmk:28 },
  { year:1984, winner:"AIADMK", dmk:34, aiadmk:40 },
  { year:1989, winner:"DMK",    dmk:32, aiadmk:36 },
  { year:1991, winner:"AIADMK", dmk:37, aiadmk:32 },
  { year:1996, winner:"DMK",    dmk:35, aiadmk:30 },
  { year:2001, winner:"AIADMK", dmk:31, aiadmk:38 },
  { year:2006, winner:"DMK",    dmk:36, aiadmk:30 },
  { year:2011, winner:"AIADMK", dmk:35, aiadmk:40 },
  { year:2016, winner:"AIADMK", dmk:33, aiadmk:40 },
  { year:2021, winner:"DMK",    dmk:38, aiadmk:30 },
];

export const WIN_RATES = [
  { party:"AIADMK",   rate:0.545, color:"#3B82F6" },
  { party:"DMK",      rate:0.455, color:"#E84B3A" },
  { party:"Congress", rate:0,     color:"#6B7280" },
  { party:"BJP",      rate:0,     color:"#F97316" },
  { party:"PMK",      rate:0,     color:"#10B981" },
  { party:"MDMK",     rate:0,     color:"#6B7280" },
  { party:"VCK",      rate:0,     color:"#6B7280" },
  { party:"TVK",      rate:0,     color:"#8B5CF6" },
  { party:"MNM",      rate:0,     color:"#EC4899" },
];
