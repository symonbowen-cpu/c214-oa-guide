const LETTERS = ["A", "B", "C", "D"];
const OA = [
  {
    type: "calc", topic: "Cash flow",
    stem: "A firm reports net income of $100,000, depreciation of $25,000, and an increase in accounts receivable of $15,000. What is cash flow from operations?",
    choices: ["$100,000", "$110,000", "$140,000", "$85,000"],
    answer: 1,
    how: [
      "Start from profit, then ask which items moved cash and which did not.",
      "Depreciation lowered net income but no cash left the firm, so add the $25,000 back.",
      "Receivables rose, which means customers still owe money the income statement already counted. That $15,000 is a use of cash, so subtract it.",
      "100,000 + 25,000 − 15,000 = 110,000. The $140,000 choice adds the receivable instead of subtracting it."
    ]
  },
  {
    type: "calc", topic: "Cash flow",
    stem: "Beginning net PP&E is $50,000. Ending net PP&E is $200,000. Depreciation expense is $40,000. What is cash flow from investing?",
    choices: ["$150,000", "($190,000)", "($150,000)", "$190,000"],
    answer: 1,
    how: [
      "Investing cash flow here is the cash spent to grow the plant.",
      "Net PP&E rose by 150,000. That rise already has depreciation taken out, so the cash purchase was larger than the net increase.",
      "Capex = ending net PP&E − beginning net PP&E + depreciation = 200,000 − 50,000 + 40,000 = 190,000.",
      "Buying plant is an outflow, so CFI is ($190,000). The $150,000 choices forget to add depreciation back."
    ]
  },
  {
    type: "calc", topic: "Cash flow",
    stem: "The firm issued stock for $75,000, increased bonds payable by $125,000, and paid dividends of $80,000. What is cash flow from financing?",
    choices: ["$120,000", "$280,000", "$200,000", "$45,000"],
    answer: 0,
    how: [
      "Financing cash flow is cash from owners and lenders, minus cash returned to them.",
      "Stock and new bonds both bring cash in: 75,000 + 125,000 = 200,000.",
      "Dividends send cash out, so subtract 80,000.",
      "200,000 − 80,000 = 120,000. Accounts payable is not financing. It is operating."
    ]
  },
  {
    type: "concept", topic: "Cash flow",
    stem: "Accounts receivable increases. What happens to cash flow from operations?",
    choices: ["CFO increases", "CFO decreases", "CFO is unchanged", "CFI decreases"],
    answer: 1,
    how: [
      "The sale is already in net income. The cash has not arrived.",
      "A rise in receivables is a use of cash inside operations.",
      "CFO falls. CFI is plant and investments, not customer balances."
    ]
  },
  {
    type: "concept", topic: "Cash flow",
    stem: "Accounts payable increases. What happens to cash flow from operations?",
    choices: ["CFO decreases", "CFO increases", "CFI increases", "CFF decreases"],
    answer: 1,
    how: [
      "The expense is already in net income, but the firm has not paid the supplier yet.",
      "Holding onto that cash is a source of operating cash.",
      "CFO rises. Payables are not a financing inflow."
    ]
  },
  {
    type: "calc", topic: "Ratios",
    stem: "Current assets are $210,000, inventory is $90,000, and current liabilities are $100,000. What is the quick ratio?",
    choices: ["2.10", "1.20", "0.90", "3.00"],
    answer: 1,
    how: [
      "The quick ratio asks whether the firm can pay bills without selling inventory.",
      "Drop inventory: 210,000 − 90,000 = 120,000 of quicker assets.",
      "Divide by current liabilities: 120,000 / 100,000 = 1.20.",
      "2.10 is the current ratio, which keeps inventory in."
    ]
  },
  {
    type: "calc", topic: "Ratios",
    stem: "Net income is $80,000, sales are $800,000, assets are $500,000, and equity is $250,000. What is ROE using DuPont?",
    choices: ["10%", "16%", "32%", "20%"],
    answer: 2,
    how: [
      "ROE is profit for the owners relative to the equity they have in the firm.",
      "The three pieces: margin 80/800 = 10%, turnover 800/500 = 1.6, equity multiplier 500/250 = 2.",
      "10% × 1.6 × 2 = 32%. The direct check is 80,000 / 250,000 = 32%.",
      "16% is ROA. ROE is higher because the firm is using debt."
    ]
  },
  {
    type: "concept", topic: "Ratios",
    stem: "Gross margin is the only margin behind peers, and the gap never widens at the operating or net margin. Where is the problem?",
    choices: ["Interest expense", "Operating expenses", "Cost of goods sold", "The tax rate"],
    answer: 2,
    how: [
      "Margins are a chain. The first place a gap appears is the first place to look.",
      "Gross margin is sales minus COGS. If the gap opens there and stays the same size later, later costs are not the cause.",
      "The problem is cost of goods sold."
    ]
  },
  {
    type: "calc", topic: "Time value",
    stem: "You invest $8,000 at 5% for 3 years. What is the future value?",
    choices: ["$9,261", "$8,400", "$9,520", "$10,000"],
    answer: 0,
    how: [
      "Each year the balance earns 5% on the new, larger balance.",
      "Year 1: 8,000 × 1.05 = 8,400. Year 2: 8,400 × 1.05 = 8,820. Year 3: 8,820 × 1.05 = 9,261.",
      "Or one step: 8,000 × (1.05)^3 = 9,261.",
      "$8,400 is simple interest, one year only. $9,520 uses a 6% rate."
    ]
  },
  {
    type: "calc", topic: "Time value",
    stem: "What is the present value of $15,000 received in 5 years if the discount rate is 6%?",
    choices: ["$11,209", "$12,000", "$10,500", "$15,000"],
    answer: 0,
    how: [
      "A dollar later is worth less than a dollar now, because money now can earn 6%.",
      "Divide the future amount by the growth factor for 5 years: (1.06)^5 = 1.3382.",
      "15,000 / 1.3382 = 11,209.",
      "Leaving it at 15,000 ignores the wait. 12,000 is a rough guess, not the discount."
    ]
  },
  {
    type: "calc", topic: "Bonds",
    stem: "A 6% annual coupon bond has 10 years left, face value $1,000, and the market yield is 8%. What is the price, to the nearest dollar?",
    choices: ["$1,000", "$865", "$1,149", "$750"],
    answer: 1,
    how: [
      "The coupon is fixed at $60 a year. Buyers now demand 8%, so they will not pay face.",
      "Price is the present value of ten $60 coupons plus the $1,000 face, all discounted at 8%.",
      "PV of coupons = 60 × 6.710 = 403. PV of face = 1,000 / (1.08)^10 = 463. Together about $865.",
      "Coupon below yield means a discount. $1,149 would be a premium, which needs a yield below 6%."
    ]
  },
  {
    type: "concept", topic: "Bonds",
    stem: "A bond’s coupon rate is 6% and its yield to maturity is 8%. The bond sells at",
    choices: ["a premium", "par", "a discount", "its current yield"],
    answer: 2,
    how: [
      "The coupon is what the bond pays. The yield is what buyers require.",
      "If the bond pays less than the market requires, buyers pay less than face.",
      "That is a discount. Premium means coupon above yield. Par means they match."
    ]
  },
  {
    type: "calc", topic: "Bonds",
    stem: "A $1,000 bond pays a 6% coupon and currently sells for $900. What is the current yield?",
    choices: ["6.00%", "6.67%", "8.00%", "5.40%"],
    answer: 1,
    how: [
      "Current yield is this year’s coupon divided by today’s price. It is not yield to maturity.",
      "Annual coupon = 0.06 × 1,000 = $60.",
      "60 / 900 = 6.67%.",
      "6% is the coupon rate. 8% would be a yield to maturity, which also counts the gain to face."
    ]
  },
  {
    type: "calc", topic: "Bonds",
    stem: "How much interest is paid on a 6% bond over 2 years and 3 months?",
    choices: ["$120", "$135", "$150", "$60"],
    answer: 1,
    how: [
      "Interest here is the coupon cash, not a compound return.",
      "Annual coupon on a $1,000 face is $60.",
      "2 years and 3 months is 2.25 years. 60 × 2.25 = $135.",
      "$120 stops at two years. $150 assumes 2.5 years."
    ]
  },
  {
    type: "calc", topic: "Equity",
    stem: "Last year’s dividend was $2.00. Growth is 4%. The required return is 10%. What is the Gordon price?",
    choices: ["$20.00", "$33.33", "$34.67", "$50.00"],
    answer: 2,
    how: [
      "Gordon prices the next dividend, not last year’s, and only works if the required return beats growth.",
      "Next dividend D1 = 2.00 × 1.04 = 2.08.",
      "The spread you are paid for is 10% − 4% = 6%. Price = 2.08 / 0.06 = $34.67.",
      "$33.33 uses last year’s dividend. $50 is 2 / 0.04, which drops the required return."
    ]
  },
  {
    type: "calc", topic: "Equity",
    stem: "A preferred stock pays a $4 dividend and the required return is 8%. What is the price?",
    choices: ["$32", "$50", "$48", "$40"],
    answer: 1,
    how: [
      "A fixed preferred dividend never grows, so there is no growth term.",
      "Price = dividend / required return.",
      "4 / 0.08 = $50.",
      "That is a perpetuity. Do not subtract a growth rate."
    ]
  },
  {
    type: "calc", topic: "CAPM",
    stem: "The risk-free rate is 3%, the market return is 9%, and beta is 1.3. What is the required return?",
    choices: ["9.0%", "10.8%", "11.7%", "6.9%"],
    answer: 1,
    how: [
      "CAPM starts at the risk-free rate, then adds a premium for market risk.",
      "The market premium is 9% − 3% = 6%, not 9%.",
      "This stock takes 1.3 times that premium: 1.3 × 6% = 7.8%.",
      "Required return = 3% + 7.8% = 10.8%. 11.7% uses the market return instead of the premium."
    ]
  },
  {
    type: "concept", topic: "Risk",
    stem: "A stock has a beta of 0.7. Which statement is correct?",
    choices: ["It amplifies market moves", "It has no systematic risk", "It dampens market moves", "Diversification has removed its beta"],
    answer: 2,
    how: [
      "Beta of 1 matches the market. Above 1 amplifies. Below 1 dampens.",
      "0.7 means a 10% market move tends to show up as about a 7% move in the stock.",
      "Diversification removes firm-specific risk. It does not remove beta."
    ]
  },
  {
    type: "calc", topic: "WACC",
    stem: "Equity is 70% of value at a 12% cost. Debt is 30% at a 6% pre-tax cost. The tax rate is 25%. What is WACC?",
    choices: ["10.20%", "9.75%", "9.30%", "8.40%"],
    answer: 1,
    how: [
      "Blend the costs by market weight. Tax-adjust debt only, because interest is deductible.",
      "Equity piece: 0.70 × 12% = 8.40%.",
      "After-tax debt cost: 6% × (1 − 0.25) = 4.5%. Debt piece: 0.30 × 4.5% = 1.35%.",
      "8.40 + 1.35 = 9.75%. 10.20% forgets the tax shield."
    ]
  },
  {
    type: "concept", topic: "WACC",
    stem: "Which rate discounts free cash flow to the firm?",
    choices: ["The cost of equity", "The cost of debt", "WACC", "The risk-free rate"],
    answer: 2,
    how: [
      "FCFF is cash available to all capital providers, debt and equity.",
      "The matching rate is the blended required return, WACC.",
      "Free cash flow to equity is discounted at the cost of equity. Do not mix them."
    ]
  },
  {
    type: "calc", topic: "Capital budgeting",
    stem: "A project costs $100,000 today and returns $40,000 at the end of each of the next 3 years. The hurdle is 10%. What is the NPV, to the nearest dollar?",
    choices: ["$20,000", "($526)", "$99,474", "$7,200"],
    answer: 1,
    how: [
      "NPV asks whether the discounted inflows beat the cash you give up today.",
      "Each $40,000 is worth less as it arrives later: 40,000/1.10 + 40,000/1.21 + 40,000/1.331.",
      "That sum is about $99,474. Subtract the $100,000 outlay.",
      "NPV is about ($526). Negative, so reject. $20,000 ignores time value."
    ]
  },
  {
    type: "concept", topic: "Capital budgeting",
    stem: "Two mutually exclusive projects. A has the higher IRR. B has the higher NPV. Which do you take?",
    choices: ["A, because IRR is a rate", "B, because NPV measures wealth", "Either, the rules always agree", "The one with the shorter payback"],
    answer: 1,
    how: [
      "IRR is a rate. NPV is dollars of value added.",
      "When the projects fight, the wealth rule wins.",
      "Take B. Payback is only a liquidity screen."
    ]
  },
  {
    type: "concept", topic: "Capital budgeting",
    stem: "Last year’s research on a project cost $200,000. Is it relevant to today’s accept-or-reject decision?",
    choices: ["Yes, add it to the outlay", "Yes, it is an opportunity cost", "No, it is sunk", "Only if the project is accepted"],
    answer: 2,
    how: [
      "A relevant cash flow changes because of the decision you are about to make.",
      "The research cash is already gone either way.",
      "Ignore it. An opportunity cost, such as a machine you could sell today, is different and does count."
    ]
  },
  {
    type: "concept", topic: "Capital budgeting",
    stem: "Why is interest left out of a project’s operating cash flow?",
    choices: ["Interest is not tax deductible", "It is already in the WACC", "Excel cannot handle it", "Only equity projects pay interest"],
    answer: 1,
    how: [
      "The hurdle rate already charges the project for debt.",
      "Putting interest in the cash flows and also in WACC counts debt twice.",
      "Leave interest out of operating cash flow."
    ]
  },
  {
    type: "calc", topic: "Forecasting",
    stem: "ROE is 15% and the firm retains 60% of earnings. What is the sustainable growth rate?",
    choices: ["9.0%", "9.9%", "15.0%", "25.0%"],
    answer: 1,
    how: [
      "Sustainable growth is how fast sales can grow without issuing new equity, given the profit and the dividend policy.",
      "Retention b = 0.60. The inside growth ROE × b = 0.15 × 0.60 = 0.09.",
      "Sustainable growth = 0.09 / (1 − 0.09) = 0.09 / 0.91 = 9.9%.",
      "9% stops too early. It ignores that retained earnings themselves earn a return."
    ]
  },
  {
    type: "calc", topic: "Working capital",
    stem: "Days inventory is 45, days sales outstanding is 30, and days payable is 25. What is the cash conversion cycle?",
    choices: ["100 days", "50 days", "20 days", "75 days"],
    answer: 1,
    how: [
      "The cycle is how long cash is tied up from buying inventory to collecting from customers, after suppliers have floated you.",
      "Operating cycle = 45 + 30 = 75 days.",
      "Suppliers wait 25 days, so subtract that: 75 − 25 = 50 days.",
      "100 adds the payable instead of subtracting it."
    ]
  },
  {
    type: "concept", topic: "Working capital",
    stem: "The current ratio is steady and the quick ratio is falling. What is building?",
    choices: ["Cash", "Inventory", "Payables", "Equity"],
    answer: 1,
    how: [
      "Current ratio includes inventory. Quick ratio drops it.",
      "If the full ratio holds and the acid test weakens, inventory is the piece growing.",
      "Cash would lift the quick ratio. Payables would pressure both."
    ]
  },
  {
    type: "concept", topic: "Regulation",
    stem: "Which act split commercial and investment banking and created deposit insurance?",
    choices: ["McFadden Act", "Glass-Steagall, 1933", "Gramm-Leach-Bliley, 1999", "Dodd-Frank, 2010"],
    answer: 1,
    how: [
      "The stem is the Depression failure: banks underwriting securities and depositors losing money.",
      "Glass-Steagall split the two businesses and created the FDIC.",
      "Gramm-Leach-Bliley largely undid that split in 1999."
    ]
  },
  {
    type: "concept", topic: "Regulation",
    stem: "A bank trades stocks for its own account. Which rule restricts that?",
    choices: ["Regulation S", "Rule 144A", "The Volcker Rule", "SOX Section 302"],
    answer: 2,
    how: [
      "The failure is proprietary trading inside a bank, a 2008 issue.",
      "The Volcker Rule, inside Dodd-Frank, limits that trading.",
      "SOX 302 is the CEO certification. 144A and Reg S are sale exemptions."
    ]
  },
  {
    type: "concept", topic: "Regulation",
    stem: "A firm sells securities only to wealthy institutions and files no S-1. Which exemption is that?",
    choices: ["Regulation S", "Rule 144A", "The Securities Act of 1933", "FINRA"],
    answer: 1,
    how: [
      "No S-1 means it is not a registered public sale.",
      "A sale limited to accredited, institutional buyers is the 144A safe harbor.",
      "Regulation S is the offshore sale to non-U.S. persons."
    ]
  },
  {
    type: "concept", topic: "Regulation",
    stem: "Enron. Executives and the auditor. Which act answers that failure?",
    choices: ["Sarbanes-Oxley", "Riegle-Neal", "DIDMCA", "FIRREA"],
    answer: 0,
    how: [
      "The failure is certified numbers that were not true, and an auditor too close to the client.",
      "Sarbanes-Oxley requires executive certification, auditor independence, and an internal-control assessment.",
      "The other acts are banking and thrift statutes."
    ]
  },
  {
    type: "concept", topic: "Markets",
    stem: "Which statement about markets is correct?",
    choices: ["The firm receives cash in a secondary-market trade", "NYSE is the dealer example and NASDAQ is the auction example", "In a primary sale the issuer receives the cash", "Best efforts means the underwriter buys the issue"],
    answer: 2,
    how: [
      "Primary means the issuer is the seller, so the firm gets the cash.",
      "Secondary is investor to investor. The firm gets nothing.",
      "NYSE is the auction example. NASDAQ is the dealer example. Firm commitment, not best efforts, means the underwriter buys the issue."
    ]
  },
  {
    type: "concept", topic: "Global",
    stem: "The home currency appreciates. Who is hurt?",
    choices: ["Importers", "Exporters", "Foreign tourists visiting the home country", "Holders of home-currency cash"],
    answer: 1,
    how: [
      "A stronger home currency makes home goods more expensive to foreign buyers.",
      "Exporters, and domestic firms competing with imports, lose.",
      "Importers benefit, because foreign goods cost fewer home-currency units."
    ]
  },
  {
    type: "concept", topic: "Efficiency",
    stem: "Under semistrong-form efficiency, which information is already in the price?",
    choices: ["Only past prices", "All public information", "Private information too", "No information at all"],
    answer: 1,
    how: [
      "Weak covers past prices. Semistrong covers all public information. Strong also covers private information.",
      "Under semistrong, public news and charts do not beat the market.",
      "The correct choice is all public information."
    ]
  },
  {
    type: "concept", topic: "Structure",
    stem: "In the pecking order, how does a firm typically raise funds?",
    choices: ["Equity, then debt, then internal cash", "Internal cash, then debt, then equity", "Debt only", "Equity only, to avoid bankruptcy"],
    answer: 1,
    how: [
      "Managers prefer the source that sends the weakest negative signal and costs the least to arrange.",
      "Internal cash first, then debt, then equity.",
      "An equity issue is read as a signal that the stock is expensive."
    ]
  }
];

const RULES = [
  ["NPV", "Accept if NPV > 0.", "On a fight with IRR, follow NPV."],
  ["IRR", "Accept an independent project if IRR > WACC.", "Scale and timing cause conflicts with NPV."],
  ["Bonds", "Yield up, price down.", "Coupon above yield is a premium."],
  ["CAPM", "Rf + beta × (Rm − Rf).", "The parenthesis is the premium, not the market return."],
  ["Gordon", "D1 / (k − g).", "Use next year’s dividend."],
  ["WACC", "Tax-adjust debt only.", "Discount FCFF at WACC."],
  ["Sunk", "Ignore it.", "Opportunity cost still counts."]
];
const FORMULAS = [
  ["CFO", "NI + dep − increase in AR + increase in AP"],
  ["Capex", "End net PPE − begin net PPE + dep"],
  ["Quick", "(CA − inventory) / CL"],
  ["DuPont", "Margin × turnover × assets/equity"],
  ["Gordon", "D1 / (k − g)"],
  ["CAPM", "Rf + beta(Rm − Rf)"],
  ["WACC", "We·Re + Wd·Rd(1−T)"],
  ["SGR", "(ROE × b) / (1 − ROE × b)"],
  ["CCC", "DIO + DSO − DPO"]
];

const state = JSON.parse(localStorage.getItem("c214oa") || "{\"tab\":\"oa\",\"i\":0,\"picks\":{},\"revealed\":{},\"filter\":\"all\",\"missed\":false}");
function save() { localStorage.setItem("c214oa", JSON.stringify(state)); }
function money(n) { return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 }); }
function pct(n) { return (n * 100).toFixed(2) + "%"; }

function pool() {
  let list = OA.map((q, idx) => ({ ...q, idx }));
  if (state.filter === "calc") list = list.filter(q => q.type === "calc");
  if (state.filter === "concept") list = list.filter(q => q.type === "concept");
  if (state.missed) list = list.filter(q => state.revealed[q.idx] && state.picks[q.idx] !== q.answer);
  return list.length ? list : OA.map((q, idx) => ({ ...q, idx }));
}
function score() {
  const done = OA.filter((_, i) => state.revealed[i]);
  const right = done.filter((q, i) => state.picks[OA.indexOf(q)] === q.answer).length;
  return { done: done.length, right, total: OA.length };
}

const views = {
  oa() {
    const list = pool();
    const i = Math.min(state.i, list.length - 1);
    const q = list[i];
    const picked = state.picks[q.idx];
    const open = !!state.revealed[q.idx];
    const sc = score();
    const choices = q.choices.map((c, n) => {
      let cls = "choice";
      if (open && n === q.answer) cls += " right";
      else if (open && n === picked) cls += " wrong";
      else if (!open && n === picked) cls += " pick";
      return `<button class="${cls}" onclick="pick(${q.idx},${n})"><span class="ltr">${LETTERS[n]}</span>${c}</button>`;
    }).join("");
    const how = open ? `<div class="how"><h3>How to get there</h3><ol>${q.how.map(s => `<li>${s}</li>`).join("")}</ol></div>` : "";
    return `<p class="kicker">Objective assessment</p><h1>OA practice</h1><div class="goldline"></div>
      <p class="small">${sc.right} right of ${sc.done} answered · ${sc.total} in the bank. Same shape as the OA: a stem, four choices, then the path to the number.</p>
      <div class="tabs" style="margin:8px 0">
        ${["all","calc","concept"].map(f => `<button class="chip ${state.filter===f?"on":""}" onclick="state.filter='${f}';state.i=0;save();render()">${f === "all" ? "All" : f === "calc" ? "Calculations" : "Concepts"}</button>`).join("")}
        <button class="chip ${state.missed?"on":""}" onclick="state.missed=!state.missed;state.i=0;save();render()">Missed</button>
      </div>
      <div class="card">
        <span class="badge">${q.type === "calc" ? "Calculation" : "Concept"} · ${q.topic}</span>
        <p class="small" style="margin-top:8px">Question ${i + 1} of ${list.length}</p>
        <h2>${q.stem}</h2>
        ${choices}
        ${how}
        <div class="row" style="margin-top:12px">
          <button class="ghost" style="flex:1" onclick="step(-1)">Back</button>
          <button class="primary" style="flex:1" onclick="step(1)">${open ? "Next" : "Skip"}</button>
        </div>
      </div>`;
  },
  rules() {
    return `<p class="kicker">Do not miss</p><h1>Decision rules</h1><div class="goldline"></div>
      <div class="card">${RULES.map(r => `<div class="rule"><div class="tag">${r[0]}</div><div><strong>${r[1]}</strong><div class="small">${r[2]}</div></div></div>`).join("")}</div>
      <div class="card"><h3>Formula sheet</h3>${FORMULAS.map(f => `<div class="rule"><div class="tag">${f[0]}</div><div class="formula">${f[1]}</div></div>`).join("")}</div>`;
  },
  calc() {
    return `<p class="kicker">Check a stem</p><h1>Calculators</h1><div class="goldline"></div>
      <div class="tabs">${["bond","gordon","capm","wacc","npv"].map(id => `<button class="chip ${state.calc===id?"on":""}" onclick="state.calc='${id}';render()">${id.toUpperCase()}</button>`).join("")}</div>
      <div class="card">${calcBody()}</div>`;
  }
};

function pick(idx, n) {
  if (state.revealed[idx]) return;
  state.picks[idx] = n;
  state.revealed[idx] = true;
  save();
  render();
}
function step(dir) {
  const list = pool();
  state.i = (state.i + dir + list.length) % list.length;
  save();
  render();
}
function num(id) { return Number(document.getElementById(id).value); }
function calcBody() {
  const c = state.calc || "bond";
  if (c === "bond") return `<h3>Bond price</h3><p class="small">Coupon below yield is a discount. Face stays 1,000.</p><label>Coupon</label><input id="cp" value="0.06"><label>Yield</label><input id="ytm" value="0.08"><label>Years</label><input id="yrs" value="10"><label>Payments per year</label><input id="m" value="1"><button class="primary" style="margin-top:12px" onclick="runBond()">Price it</button><div id="result"></div>`;
  if (c === "gordon") return `<h3>Gordon</h3><label>Last dividend</label><input id="d0" value="2"><label>Growth</label><input id="g" value="0.04"><label>Required return</label><input id="k" value="0.10"><button class="primary" style="margin-top:12px" onclick="runGordon()">Price it</button><div id="result"></div>`;
  if (c === "capm") return `<h3>CAPM</h3><label>Risk-free</label><input id="rf" value="0.03"><label>Market return</label><input id="rm" value="0.09"><label>Beta</label><input id="beta" value="1.3"><button class="primary" style="margin-top:12px" onclick="runCapm()">Required return</button><div id="result"></div>`;
  if (c === "wacc") return `<h3>WACC</h3><label>Equity weight</label><input id="we" value="0.7"><label>Cost of equity</label><input id="re" value="0.12"><label>Debt weight</label><input id="wd" value="0.3"><label>Pre-tax debt</label><input id="rd" value="0.06"><label>Tax</label><input id="tax" value="0.25"><button class="primary" style="margin-top:12px" onclick="runWacc()">Blend it</button><div id="result"></div>`;
  return `<h3>NPV</h3><label>Outlay</label><input id="cost" value="100000"><label>Annual cash flow</label><input id="cf" value="40000"><label>Years</label><input id="yrs" value="3"><label>Hurdle</label><input id="hurdle" value="0.10"><button class="primary" style="margin-top:12px" onclick="runNpv()">Decide</button><div id="result"></div>`;
}
function show(html) { document.getElementById("result").innerHTML = `<div class="out">${html}</div>`; }
function runBond() {
  const cp = num("cp"), ytm = num("ytm"), m = num("m"), r = ytm / m, pmt = 1000 * cp / m, n = num("yrs") * m;
  const price = pmt * (1 - Math.pow(1 + r, -n)) / r + 1000 / Math.pow(1 + r, n);
  const kind = cp > ytm ? "Premium" : cp < ytm ? "Discount" : "Par";
  show(`<strong>${money(price)}</strong><div>${kind}. Buyers require ${pct(ytm)} and the bond pays ${pct(cp)}, so the price moves until those match.</div>`);
}
function runGordon() {
  const d1 = num("d0") * (1 + num("g")), k = num("k"), g = num("g");
  if (k <= g) return show("k must exceed g.");
  show(`<strong>${money(d1 / (k - g))}</strong><div>Use next year’s dividend, ${money(d1)}, over the spread ${pct(k - g)}.</div>`);
}
function runCapm() {
  const prem = num("rm") - num("rf");
  show(`<strong>${pct(num("rf") + num("beta") * prem)}</strong><div>Start at the risk-free rate. Add beta times the premium ${pct(prem)}.</div>`);
}
function runWacc() {
  const after = num("rd") * (1 - num("tax"));
  show(`<strong>${pct(num("we") * num("re") + num("wd") * after)}</strong><div>Tax-adjust debt only. After-tax debt cost ${pct(after)}.</div>`);
}
function runNpv() {
  const r = num("hurdle"), cf = num("cf"), n = num("yrs");
  let pv = 0;
  for (let t = 1; t <= n; t++) pv += cf / Math.pow(1 + r, t);
  const npv = pv - num("cost");
  show(`<strong>${money(npv)}</strong><div>${npv > 0 ? "Accept." : "Reject."} Discount each cash flow, add them, then subtract today’s outlay.</div>`);
}
function render() {
  if (!state.calc) state.calc = "bond";
  document.getElementById("app").innerHTML = views[state.tab]();
  document.getElementById("nav").innerHTML = [["oa", "OA"], ["rules", "Rules"], ["calc", "Calc"]]
    .map(([id, label]) => `<button class="${state.tab === id ? "on" : ""}" onclick="state.tab='${id}';save();render()"><b>${label[0]}</b>${label}</button>`).join("");
}
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
render();
