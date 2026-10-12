const EXCEL = [
  { name: "FV", syntax: "=FV(rate, nper, pmt, [pv], [type])", use: "Future value of a lump sum or annuity.", oa: "Enter the rate and nper as cell references. Cash you put in is negative. Type 0 (or blank) for end-of-period payments.", trap: "Hard-coding the number inside the function instead of the cell the sheet points to." },
  { name: "PV", syntax: "=PV(rate, nper, pmt, [fv], [type])", use: "Present value. Also the bond price.", oa: "Bond price is −PV(yield, periods, coupon, face). Face is almost always 1000. A negative result means the price you pay.", trap: "Using the coupon rate as the discount rate. Discount at the yield." },
  { name: "PMT", syntax: "=PMT(rate, nper, pv, [fv], [type])", use: "Periodic payment on a loan or savings plan.", oa: "Rate is the rate per period. For monthly, divide the annual rate by 12 and multiply years by 12.", trap: "Forgetting to match the rate period to the payment period." },
  { name: "RATE", syntax: "=RATE(nper, pmt, pv, [fv], [type], [guess])", use: "Interest rate or yield given the other variables.", oa: "Used when the question asks for the rate or YTM. PV is usually entered negative.", trap: "Leaving PV and FV the same sign. One must be opposite the other." },
  { name: "NPER", syntax: "=NPER(rate, pmt, pv, [fv], [type])", use: "Number of periods.", oa: "Rare but appears. Same sign rules as the other TVM functions.", trap: "Mixing annual and monthly periods." },
  { name: "NPV", syntax: "=NPV(rate, value1, [value2], ...)", use: "Present value of a series of future cash flows.", oa: "Excel NPV starts at period 1. Subtract the period-0 outlay outside the function: =NPV(rate, B2:B5) + B1, where B1 is the negative outlay.", trap: "Including the initial outlay inside NPV. That double-discounts year 0." },
  { name: "IRR", syntax: "=IRR(values, [guess])", use: "Discount rate that makes NPV zero.", oa: "The range must include the initial outflow (negative) and the later inflows. Accept if IRR exceeds the hurdle.", trap: "Leaving the initial cash flow out of the range, or all values the same sign." }
];

const EXCEL_RULES = [
  "Sign convention: money you pay out is negative. Money you receive is positive. Excel needs opposite signs to solve.",
  "On the OA, put the inputs in the cells the question names, then reference those cells inside the function. Do not type the raw number in the formula if the sheet expects a cell reference.",
  "Partial credit is real. Fill every cell you can. Bond face value is $1,000 — enter it even if the rest of the bond sheet is wrong.",
  "Type argument: 0 or blank = ordinary annuity (end of period). 1 = annuity due (beginning). Most OA problems are ordinary.",
  "Rate and nper must match. Annual rate with annual periods, or rate/m and nper × m for more frequent payments.",
  "NPV trap: the function discounts its first value as period 1. Add the year-0 cash flow outside the function.",
  "IRR range must contain the initial outflow and at least one later inflow."
];

const CHAPTERS = [
  { n: 1, title: "Overview of Finance", keys: [
    "Three areas: corporate finance (firm decisions), investments (valuing instruments), financial institutions (intermediaries linking savers and borrowers).",
    "Goal of the firm: maximize shareholder wealth (stock price), not just current profit. Accounts for time, risk, and cash flows.",
    "Primary market: issuer receives the cash (IPO, new bonds). Secondary market: investor-to-investor; firm receives nothing.",
    "Syndicate underwrites. Firm commitment: underwriter buys the issue. Best efforts: no guarantee.",
    "Treasury securities, corporate bonds, and stocks are the core instruments."
  ]},
  { n: 2, title: "Income Statement and Balance Sheet", keys: [
    "Income statement is for a period; balance sheet is a point in time. Assets = Liabilities + Equity.",
    "Revenue recognized when earned (delivered); expenses when incurred (matching).",
    "Depreciation is on the income statement but is non-cash. Actual taxes (IRS) can differ from GAAP tax expense.",
    "Retained earnings change = Net income − Dividends.",
    "Operating income and EBIT are generally the same."
  ]},
  { n: 3, title: "Statement of Cash Flows", keys: [
    "CFO starts with NI, adds depreciation, subtracts increases in operating current assets (AR, inventory), adds increases in operating current liabilities (AP).",
    "AR up → CFO down. AP up → CFO up.",
    "CFI: Capex = Ending Net PP&E − Beginning Net PP&E + Depreciation (outflow).",
    "CFF: stock issuance + debt issuance − dividends − debt repayment. AP is not financing.",
    "FCFF is cash to all capital providers; FCFE is cash to equity only."
  ]},
  { n: 4, title: "Ratio Analysis", keys: [
    "Liquidity: current and quick. Quick drops inventory (least liquid current asset).",
    "If current ratio holds and quick falls, inventory is building.",
    "Profitability: gross, operating, net margin. A gap that opens at gross and stays points to COGS.",
    "Efficiency: asset turnover, inventory/receivables turnover.",
    "DuPont ROE = margin × turnover × equity multiplier. ROE > ROA when leveraged."
  ]},
  { n: 5, title: "Time Value of Money", keys: [
    "FV = PV × (1+r)^n. Money later is worth less.",
    "Excel: FV, PV, PMT, RATE, NPER. Sign convention: cash out is negative.",
    "Ordinary annuity: end of period. Annuity due: beginning.",
    "Use cell references on the OA, not hard-coded numbers inside functions."
  ]},
  { n: 6, title: "Debt, Valuation, and Interest Rates", keys: [
    "Coupon is fixed. Yield is what the market requires. Coupon = yield → par ($1,000). Coupon < yield → discount. Coupon > yield → premium.",
    "Price = PV of coupons + PV of face, discounted at YTM. Excel: −PV(ytm, nper, pmt, fv).",
    "Current yield = annual coupon / price (not YTM).",
    "Partial-year interest: annual coupon × (years + months/12). 6% for 2.25 years = $135.",
    "Convertible can become stock. Debentures are unsecured. Municipal interest is federal-tax-exempt; Treasuries are taxable."
  ]},
  { n: 7, title: "Equity and Valuation", keys: [
    "Gordon: P0 = D1 / (k − g). Use next year’s dividend. Requires k > g. Recognize by growth language.",
    "Preferred: fixed dividend perpetuity P = D / r. Hybrid: cumulative, no voting, higher claim in bankruptcy, no maturity.",
    "Common: voting, residual claim, variable returns, no maturity.",
    "Start-ups often issue preferred in an IPO."
  ]},
  { n: 8, title: "Risk and CAPM", keys: [
    "Total risk = systematic + unsystematic. Diversification removes idiosyncratic (firm-specific) risk, not beta.",
    "Beta measures systematic risk relative to the market. <1 dampens; >1 amplifies.",
    "CAPM: Rf + β(Rm − Rf). The premium is Rm − Rf, not Rm.",
    "Efficient frontier: maximum return for a given risk. Prudent investor seeks highest return for appropriate risk."
  ]},
  { n: 9, title: "Cost of Capital", keys: [
    "WACC = We·Re + Wd·Rd(1−T). Tax-adjust debt only.",
    "Discount FCFF at WACC. Discount FCFE at cost of equity.",
    "Cost of equity from CAPM or Gordon. After-tax cost of debt = Rd(1−T).",
    "A credit downgrade raises the cost of financing."
  ]},
  { n: 10, title: "Financial Forecasting", keys: [
    "Percent-of-sales: project sales first. Spontaneous accounts move with sales; discretionary (long-term debt, equity) need management action.",
    "Discretionary financing needed (DFN) is the plug.",
    "Sustainable growth = (ROE × b) / (1 − ROE × b). Growth without new equity.",
    "Subjective estimates appear in capital budgeting (economic life of a new asset)."
  ]},
  { n: 11, title: "Capital Budgeting", keys: [
    "Accept if NPV > 0. On a fight with IRR, follow NPV (wealth).",
    "IRR > WACC for independent projects. Payback is only a liquidity screen.",
    "Sunk costs ignored. Opportunity costs count. Interest left out of OCF (already in WACC).",
    "Initial outlay includes asset cost, shipping/installation, and increase in NWC.",
    "Differential cash flow: (ΔRev − ΔCosts − Dep) × (1−T). Subtract increase in NWC."
  ]},
  { n: 12, title: "Capital Structure", keys: [
    "Pecking order: internal cash, then debt, then equity (equity signals stock is expensive).",
    "Why not 100% debt? Bankruptcy and agency costs rise.",
    "Optimal structure balances tax shield of debt against distress costs."
  ]},
  { n: 13, title: "Working Capital Management", keys: [
    "Cash conversion cycle = DIO + DSO − DPO. Collect quickly, pay slowly.",
    "Float: speed collections, slow disbursements.",
    "Net working capital = current assets − current liabilities."
  ]},
  { n: 14, title: "Firm Valuation", keys: [
    "DCF uses free cash flows instead of dividends. FCFF discounted at WACC.",
    "FCFF = EBIT(1−T) + Dep − Capex − ΔNWC.",
    "Comparable multiples (PE) used for private firms. Intrinsic value is PV of expected cash flows."
  ]},
  { n: 15, title: "Government Regulation", keys: [
    "Glass-Steagall (1933): split commercial and investment banking; created FDIC.",
    "Gramm-Leach-Bliley (1999): largely repealed that split.",
    "Sarbanes-Oxley: Enron response. CEO/CFO certification, auditor independence, internal controls.",
    "Dodd-Frank / Volcker: limits proprietary trading by banks.",
    "Rule 144A: private sale to accredited/institutional buyers in the U.S. Reg S: offshore to non-U.S. persons.",
    "Securities Act of 1933: prospectus (S-1). SEC (1934) enforces. FINRA regulates brokers."
  ]},
  { n: 16, title: "Global Financial Management", keys: [
    "Home-currency appreciation hurts exporters (goods more expensive abroad) and helps importers.",
    "Outsourcing: fewer domestic jobs, lower product costs. Tariffs: more domestic jobs, higher consumer prices.",
    "Hedging reduces currency risk. Country risk must be considered in international valuation."
  ]}
];

const OA = [
  { type:"calc", topic:"Cash flow", stem:"Net income $100,000, depreciation $25,000, accounts receivable increased $15,000. Cash flow from operations?", choices:["$100,000","$110,000","$140,000","$85,000"], answer:1, how:["Start from profit.","Depreciation is non-cash, so add $25,000.","Receivables rose: sale is in income but cash has not arrived, so subtract $15,000.","100,000 + 25,000 − 15,000 = 110,000."] },
  { type:"calc", topic:"Cash flow", stem:"Beginning net PP&E $50,000, ending net PP&E $200,000, depreciation $40,000. Cash flow from investing?", choices:["$150,000","($190,000)","($150,000)","$190,000"], answer:1, how:["Capex is the cash spent on plant.","Net increase is $150,000, but depreciation was already subtracted, so add it back.","200,000 − 50,000 + 40,000 = 190,000.","Buying plant is an outflow: ($190,000)."] },
  { type:"calc", topic:"Cash flow", stem:"Issued stock $75,000, increased bonds $125,000, paid dividends $80,000. Cash flow from financing?", choices:["$120,000","$280,000","$200,000","$45,000"], answer:0, how:["Financing is cash from owners and lenders minus cash returned.","Inflows: 75,000 + 125,000 = 200,000.","Subtract dividends: 200,000 − 80,000 = 120,000.","Payables are operating, not financing."] },
  { type:"concept", topic:"Cash flow", stem:"Accounts receivable increases. Impact on CFO?", choices:["CFO increases","CFO decreases","Unchanged","CFI decreases"], answer:1, how:["Sale is already in net income.","Cash has not arrived.","Rise in receivables is a use of operating cash."] },
  { type:"concept", topic:"Cash flow", stem:"Accounts payable increases. Impact on CFO?", choices:["CFO decreases","CFO increases","CFI increases","CFF decreases"], answer:1, how:["Expense is already in net income.","Firm has not paid the supplier yet.","Holding the cash is a source of operating cash."] },
  { type:"calc", topic:"Ratios", stem:"Current assets $210,000, inventory $90,000, current liabilities $100,000. Quick ratio?", choices:["2.10","1.20","0.90","3.00"], answer:1, how:["Quick drops inventory.","210,000 − 90,000 = 120,000.","120,000 / 100,000 = 1.20.","2.10 is the current ratio."] },
  { type:"calc", topic:"Ratios", stem:"NI $80,000, sales $800,000, assets $500,000, equity $250,000. DuPont ROE?", choices:["10%","16%","32%","20%"], answer:2, how:["Margin 10%, turnover 1.6, multiplier 2.","10% × 1.6 × 2 = 32%.","Direct check: 80,000 / 250,000 = 32%.","16% is ROA."] },
  { type:"concept", topic:"Ratios", stem:"Gross margin is the only margin behind peers; the gap never widens later. Where is the problem?", choices:["Interest","Operating expenses","Cost of goods sold","Tax rate"], answer:2, how:["The first place a gap appears is the cause.","Gross margin is sales minus COGS.","Later margins do not widen, so later costs are not the problem."] },
  { type:"calc", topic:"Time value", stem:"Invest $8,000 at 5% for 3 years. Future value?", choices:["$9,261","$8,400","$9,520","$10,000"], answer:0, how:["Compound: 8,000 × (1.05)^3.","(1.05)^3 = 1.157625.","8,000 × 1.157625 = 9,261.","$8,400 is one year of simple interest."] },
  { type:"calc", topic:"Time value", stem:"Present value of $15,000 in 5 years at 6%?", choices:["$11,209","$12,000","$10,500","$15,000"], answer:0, how:["Discount: divide by (1.06)^5.","(1.06)^5 ≈ 1.3382.","15,000 / 1.3382 ≈ 11,209."] },
  { type:"calc", topic:"Bonds", stem:"6% annual coupon, 10 years left, face $1,000, yield 8%. Price to nearest dollar?", choices:["$1,000","$866","$1,149","$750"], answer:1, how:["Coupon is fixed at $60; market wants 8%.","PV of coupons ≈ 403; PV of face ≈ 463.","Sum ≈ $866.","Coupon below yield means discount."] },
  { type:"concept", topic:"Bonds", stem:"Coupon 6%, yield 8%. The bond sells at", choices:["a premium","par","a discount","its current yield"], answer:2, how:["Bond pays less than the market requires.","Buyers pay less than face.","That is a discount."] },
  { type:"calc", topic:"Bonds", stem:"$1,000 bond, 6% coupon, sells for $900. Current yield?", choices:["6.00%","6.67%","8.00%","5.40%"], answer:1, how:["Current yield = coupon / price.","60 / 900 = 6.67%.","Not YTM."] },
  { type:"calc", topic:"Bonds", stem:"Interest paid on a 6% bond over 2 years and 3 months?", choices:["$120","$135","$150","$60"], answer:1, how:["Annual coupon $60.","2 years 3 months = 2.25 years.","60 × 2.25 = $135."] },
  { type:"calc", topic:"Equity", stem:"Last dividend $2.00, growth 4%, required return 10%. Gordon price?", choices:["$20.00","$33.33","$34.67","$50.00"], answer:2, how:["Use next year’s dividend: 2 × 1.04 = 2.08.","Spread is 10% − 4% = 6%.","2.08 / 0.06 = $34.67."] },
  { type:"calc", topic:"Equity", stem:"Preferred pays $4, required return 8%. Price?", choices:["$32","$50","$48","$40"], answer:1, how:["Fixed dividend, no growth.","P = 4 / 0.08 = $50."] },
  { type:"calc", topic:"CAPM", stem:"Rf 3%, market 9%, beta 1.3. Required return?", choices:["9.0%","10.8%","11.7%","6.9%"], answer:1, how:["Premium is 9% − 3% = 6%.","1.3 × 6% = 7.8%.","3% + 7.8% = 10.8%."] },
  { type:"concept", topic:"Risk", stem:"Beta of 0.7 means the stock", choices:["amplifies market moves","has no systematic risk","dampens market moves","has had beta removed by diversification"], answer:2, how:["Beta of 1 matches the market.","Below 1 dampens.","Diversification removes firm-specific risk, not beta."] },
  { type:"calc", topic:"WACC", stem:"Equity 70% at 12%, debt 30% at 6% pre-tax, tax 25%. WACC?", choices:["10.20%","9.75%","9.30%","8.40%"], answer:1, how:["Equity piece 0.70 × 12% = 8.40%.","After-tax debt 6% × 0.75 = 4.5%; piece 0.30 × 4.5% = 1.35%.","8.40 + 1.35 = 9.75%."] },
  { type:"concept", topic:"WACC", stem:"Which rate discounts free cash flow to the firm?", choices:["Cost of equity","Cost of debt","WACC","Risk-free rate"], answer:2, how:["FCFF is cash to all capital providers.","Match it with the blended rate, WACC."] },
  { type:"calc", topic:"Capital budgeting", stem:"Outlay $100,000, then $40,000 at the end of each of 3 years, hurdle 10%. NPV nearest dollar?", choices:["$20,000","($526)","$99,474","$7,200"], answer:1, how:["Discount each inflow.","PV of inflows ≈ $99,474.","Subtract outlay: ≈ ($526). Reject."] },
  { type:"concept", topic:"Capital budgeting", stem:"Mutually exclusive. A has higher IRR, B has higher NPV. Take", choices:["A","B","Either","The shorter payback"], answer:1, how:["NPV measures wealth added.","On a conflict, follow NPV."] },
  { type:"concept", topic:"Capital budgeting", stem:"Last year’s research cost $200,000. Relevant today?", choices:["Add to outlay","Opportunity cost","Sunk, ignore","Only if accepted"], answer:2, how:["Already spent either way.","Ignore sunk costs. Opportunity cost of an asset you could sell still counts."] },
  { type:"concept", topic:"Capital budgeting", stem:"Why leave interest out of project operating cash flow?", choices:["Not deductible","Already in WACC","Excel cannot handle it","Only equity projects pay interest"], answer:1, how:["The hurdle already charges for debt.","Including interest double-counts."] },
  { type:"calc", topic:"Forecasting", stem:"ROE 15%, retention 60%. Sustainable growth rate?", choices:["9.0%","9.9%","15.0%","25.0%"], answer:1, how:["ROE × b = 0.09.","SGR = 0.09 / (1 − 0.09) = 9.9%."] },
  { type:"calc", topic:"Working capital", stem:"DIO 45, DSO 30, DPO 25. Cash conversion cycle?", choices:["100 days","50 days","20 days","75 days"], answer:1, how:["Operating cycle 45 + 30 = 75.","Subtract payables: 75 − 25 = 50."] },
  { type:"concept", topic:"Working capital", stem:"Current ratio steady, quick ratio falling. What is building?", choices:["Cash","Inventory","Payables","Equity"], answer:1, how:["Quick drops inventory.","If the full ratio holds and quick weakens, inventory is growing."] },
  { type:"concept", topic:"Regulation", stem:"Which act split commercial and investment banking and created deposit insurance?", choices:["McFadden","Glass-Steagall 1933","Gramm-Leach-Bliley 1999","Dodd-Frank 2010"], answer:1, how:["Depression response.","Glass-Steagall split the businesses and created the FDIC."] },
  { type:"concept", topic:"Regulation", stem:"A bank trades stocks for its own account. Which rule restricts that?", choices:["Regulation S","Rule 144A","Volcker Rule","SOX Section 302"], answer:2, how:["Proprietary trading inside a bank.","Volcker (inside Dodd-Frank) limits it."] },
  { type:"concept", topic:"Regulation", stem:"Securities sold only to wealthy institutions, no S-1. Which exemption?", choices:["Regulation S","Rule 144A","Securities Act of 1933","FINRA"], answer:1, how:["No S-1 means not a registered public sale.","Limited to accredited buyers is 144A."] },
  { type:"concept", topic:"Regulation", stem:"Enron. Executives and the auditor. Which act answers that?", choices:["Sarbanes-Oxley","Riegle-Neal","DIDMCA","FIRREA"], answer:0, how:["Certified numbers that were not true.","SOX requires executive certification, auditor independence, and internal controls."] },
  { type:"concept", topic:"Markets", stem:"Which is correct?", choices:["Firm receives cash in a secondary trade","NYSE is the dealer example","In a primary sale the issuer receives the cash","Best efforts means the underwriter buys the issue"], answer:2, how:["Primary: issuer is the seller and gets the cash.","Secondary is investor to investor. Firm commitment means the underwriter buys the issue."] },
  { type:"concept", topic:"Global", stem:"Home currency appreciates. Who is hurt?", choices:["Importers","Exporters","Foreign tourists visiting","Holders of home-currency cash"], answer:1, how:["Stronger currency makes home goods more expensive abroad.","Exporters lose."] },
  { type:"concept", topic:"Efficiency", stem:"Under semistrong efficiency, prices already reflect", choices:["Only past prices","All public information","Private information too","Nothing"], answer:1, how:["Weak = past prices. Semistrong = all public. Strong = private too."] },
  { type:"concept", topic:"Structure", stem:"Pecking order typical sequence", choices:["Equity, then debt, then internal","Internal cash, then debt, then equity","Debt only","Equity only"], answer:1, how:["Managers prefer the least negative signal.","Internal first, then debt, then equity."] },
  { type:"concept", topic:"Overview", stem:"Primary goal of financial management in a public firm", choices:["Maximize current net income","Maximize shareholder wealth","Maximize market share","Minimize taxes"], answer:1, how:["Shareholder wealth is the stock price.","It accounts for time, risk, and cash flows."] },
  { type:"concept", topic:"Statements", stem:"Actual taxes paid versus GAAP tax expense", choices:["Always the same","Actual follows IRS, GAAP follows accounting rules","Always higher under IRS","Not reported"], answer:1, how:["IRS rules differ from GAAP.","The numbers can differ."] },
  { type:"concept", topic:"Forecasting", stem:"30% chance of recession. Probability of expansion?", choices:["30%","70%","100%","0%"], answer:1, how:["Probabilities of complementary events sum to 100%."] },
  { type:"concept", topic:"Risk", stem:"Risk eliminated by a diversified portfolio", choices:["Systematic","Idiosyncratic","Market","Interest rate"], answer:1, how:["Firm-specific risk cancels across holdings.","Beta remains."] },
  { type:"concept", topic:"Equity", stem:"Preferred stock is considered", choices:["Pure debt","Pure equity","A hybrid","A derivative"], answer:2, how:["Fixed claim like debt, ownership features like equity.","Cumulative, no voting, higher claim than common."] },
  { type:"concept", topic:"Markets", stem:"Underwriter buys the entire issue and resells it. This is", choices:["Best efforts","Firm commitment","Private placement","Regulation S"], answer:1, how:["Firm commitment means the underwriter purchases the issue."] },
  { type:"calc", topic:"Bonds", stem:"A bond sells at face value when", choices:["Coupon exceeds yield","Required return equals the coupon rate","Yield is zero","It is convertible"], answer:1, how:["When the fixed coupon matches the market requirement, price equals face."] },
  { type:"concept", topic:"Working capital", stem:"Managing working capital means", choices:["Collect slowly and pay quickly","Collect quickly and pay slowly","Maximize inventory","Minimize payables"], answer:1, how:["Speed collections, delay disbursements. That shortens the cash cycle."] },
  { type:"concept", topic:"Global", stem:"Outsourcing manufacturing to a lower-cost country tends to", choices:["Raise domestic employment and lower profits","Lower domestic employment and raise profits","Have no effect","Raise consumer prices only"], answer:1, how:["Labor cost falls, so profits rise. Domestic jobs fall."] },
  { type:"concept", topic:"Regulation", stem:"SEC Form S-1 is", choices:["The annual report","The IPO prospectus","The quarterly report","A private placement memo"], answer:1, how:["S-1 is the original offering prospectus for a public sale."] },
  { type:"concept", topic:"Regulation", stem:"Regulation S allows", choices:["Sales to accredited U.S. buyers","Offshore sales to non-U.S. persons","Any private placement","Bank proprietary trading"], answer:1, how:["Reg S is the offshore safe harbor."] },
  { type:"calc", topic:"Time value", stem:"Which Excel function finds the rate given PV, FV, PMT, and nper?", choices:["PV","FV","RATE","NPV"], answer:2, how:["RATE solves for the interest rate or yield."] },
  { type:"concept", topic:"Capital budgeting", stem:"Payback period", choices:["Accounts for time value","Is the primary decision rule","Is a liquidity screen only","Equals IRR"], answer:2, how:["It ignores cash flows after the cutoff and the time value of money."] },
  { type:"concept", topic:"Risk", stem:"Points on the efficient frontier measure", choices:["Minimum risk for any return","Maximum return for a given level of risk","Beta only","Idiosyncratic risk"], answer:1, how:["Efficient portfolios deliver the highest return for each risk level."] },
  { type:"concept", topic:"Statements", stem:"Item on the income statement but not a cash outflow", choices:["Interest paid","Dividends","Depreciation","Taxes paid"], answer:2, how:["Depreciation reduces accounting income but no cash leaves."] },
  { type:"concept", topic:"Forecasting", stem:"In percent-of-sales forecasting, the first step is", choices:["Secure financing","Project future sales","Set the dividend","Issue equity"], answer:1, how:["Everything else scales from the sales forecast."] },
  { type:"concept", topic:"Valuation", stem:"Private company valuation often uses", choices:["Gordon only","Comparable multiples (PE)","Only book value","Only CAPM"], answer:1, how:["Comparable multiples apply market ratios to private earnings."] },
  { type:"concept", topic:"Markets", stem:"NYSE is the classic example of", choices:["A dealer market","An auction market","An OTC market only","A primary market"], answer:1, how:["NYSE is the auction/specialist example. NASDAQ is the dealer example."] },
  { type:"concept", topic:"Regulation", stem:"FINRA primarily", choices:["Sets monetary policy","Regulates broker-dealers","Issues deposit insurance","Writes the tax code"], answer:1, how:["FINRA oversees broker-dealers and their conduct."] },
  { type:"calc", topic:"WACC", stem:"A firm’s credit rating is downgraded. The likely effect is", choices:["Lower cost of capital","Higher cost of capital","No change","Higher stock price"], answer:1, how:["Lenders demand a higher yield. The cost of financing rises."] },
  { type:"concept", topic:"Capital budgeting", stem:"An opportunity cost in capital budgeting is", choices:["A sunk research expense","The cash you could get by selling an asset you already own","Interest on the loan","Depreciation"], answer:1, how:["Using the asset means you forgo the cash from selling it. That counts."] },
  { type:"concept", topic:"Overview", stem:"Three main areas of finance are", choices:["Accounting, marketing, operations","Corporate finance, investments, financial institutions","Taxes, law, regulation","Only investments"], answer:1, how:["Textbook Topic 1: corporate finance, investments, and financial institutions."] },
  { type:"concept", topic:"Cash flow", stem:"Which is a financing inflow?", choices:["Increase in accounts receivable","Purchase of equipment","Issuance of bonds","Payment of dividends"], answer:2, how:["New debt brings cash in. Dividends send cash out. AR and equipment are not financing."] }
];

const state = JSON.parse(localStorage.getItem("c214full") || '{"tab":"chapters","ch":0,"i":0,"picks":{},"revealed":{},"filter":"all","calc":"bond"}');
function save() { localStorage.setItem("c214full", JSON.stringify(state)); }
function money(n) { return n.toLocaleString(undefined,{style:"currency",currency:"USD",maximumFractionDigits:2}); }
function pct(n) { return (n*100).toFixed(2)+"%"; }

function pool() {
  let list = OA.map((q,idx)=>({...q,idx}));
  if (state.filter==="calc") list = list.filter(q=>q.type==="calc");
  if (state.filter==="concept") list = list.filter(q=>q.type==="concept");
  if (state.missed) list = list.filter(q=>state.revealed[q.idx] && state.picks[q.idx]!==q.answer);
  return list.length ? list : OA.map((q,idx)=>({...q,idx}));
}
function score() {
  const done = OA.filter((_,i)=>state.revealed[i]);
  const right = done.filter(q=>state.picks[OA.indexOf(q)]===q.answer).length;
  return {done:done.length, right, total:OA.length};
}

const views = {
  chapters() {
    if (state.chView) {
      const c = CHAPTERS[state.ch];
      return `<p class="kicker">Topic ${c.n}</p><h1>${c.title}</h1><div class="goldline"></div>
        <div class="card"><ul>${c.keys.map(k=>`<li>${k}</li>`).join("")}</ul></div>
        <button class="ghost" onclick="state.chView=false;save();render()">Back to topics</button>`;
    }
    return `<p class="kicker">Textbook</p><h1>Chapters</h1><div class="goldline"></div>
      <p class="small">Brau / Holmes / Blau, 16 topics. Tap a topic for the OA-critical concepts.</p>
      ${CHAPTERS.map((c,i)=>`<div class="card chapter" onclick="state.ch=${i};state.chView=true;save();render()"><strong>${c.n}. ${c.title}</strong><div class="small">${c.keys.length} key points</div></div>`).join("")}`;
  },
  calc() {
    const tabs = ["bond","gordon","capm","wacc","npv"].map(id=>`<button class="chip ${state.calc===id?"on":""}" onclick="state.calc='${id}';render()">${id.toUpperCase()}</button>`).join("");
    return `<p class="kicker">Excel-style</p><h1>Calculators</h1><div class="goldline"></div>
      <div class="tabs">${tabs}</div>
      <div class="card">${calcBody()}</div>`;
  },
  excel() {
    const cards = EXCEL.map(f=>`<div class="card"><h3>${f.name}</h3><div class="formula">${f.syntax}</div><p>${f.use}</p><p class="small"><strong>On the OA:</strong> ${f.oa}</p><p class="small"><strong>Trap:</strong> ${f.trap}</p></div>`).join("");
    const rules = EXCEL_RULES.map(r=>`<li>${r}</li>`).join("");
    return `<p class="kicker">Cell graded</p><h1>Excel functions</h1><div class="goldline"></div>
      <p class="small">These are the functions the Excel block of the OA uses. Reference cells, not hard-coded numbers. Partial credit is awarded per cell.</p>
      <div class="card"><h3>Rules that save points</h3><ul>${rules}</ul></div>
      ${cards}`;
  },
  oa() {
    const list = pool();
    const i = Math.min(state.i, list.length-1);
    const q = list[i];
    const picked = state.picks[q.idx];
    const open = !!state.revealed[q.idx];
    const sc = score();
    const choices = q.choices.map((c,n)=>{
      let cls="choice";
      if (open && n===q.answer) cls+=" right";
      else if (open && n===picked) cls+=" wrong";
      else if (!open && n===picked) cls+=" pick";
      return `<button class="${cls}" onclick="pick(${q.idx},${n})"><span class="ltr">${"ABCD"[n]}</span>${c}</button>`;
    }).join("");
    const how = open ? `<div class="how"><h3>How to get there</h3><ol>${q.how.map(s=>`<li>${s}</li>`).join("")}</ol></div>` : "";
    return `<p class="kicker">Objective assessment</p><h1>OA practice</h1><div class="goldline"></div>
      <p class="small">${sc.right} right of ${sc.done} answered · ${sc.total} questions. Same shape as the OA: stem, four choices, then the path.</p>
      <div class="tabs">
        ${["all","calc","concept"].map(f=>`<button class="chip ${state.filter===f?"on":""}" onclick="state.filter='${f}';state.i=0;save();render()">${f==="all"?"All":f==="calc"?"Calculations":"Concepts"}</button>`).join("")}
        <button class="chip ${state.missed?"on":""}" onclick="state.missed=!state.missed;state.i=0;save();render()">Missed</button>
      </div>
      <div class="card">
        <span class="badge">${q.type==="calc"?"Calculation":"Concept"} · ${q.topic}</span>
        <p class="small" style="margin-top:8px">Question ${i+1} of ${list.length}</p>
        <h2>${q.stem}</h2>
        ${choices}${how}
        <div class="row" style="margin-top:12px">
          <button class="ghost" style="flex:1" onclick="step(-1)">Back</button>
          <button class="primary" style="flex:1" onclick="step(1)">${open?"Next":"Skip"}</button>
        </div>
      </div>`;
  }
};

function pick(idx,n){ if(state.revealed[idx])return; state.picks[idx]=n; state.revealed[idx]=true; save(); render(); }
function step(dir){ const list=pool(); state.i=(state.i+dir+list.length)%list.length; save(); render(); }
function num(id){ return Number(document.getElementById(id).value); }
function calcBody(){
  const c=state.calc||"bond";
  if(c==="bond") return `<h3>Bond price</h3><p class="small">Face stays 1,000. Coupon below yield is a discount.</p><label>Coupon</label><input id="cp" value="0.06"><label>Yield</label><input id="ytm" value="0.08"><label>Years</label><input id="yrs" value="10"><label>Payments per year</label><input id="m" value="1"><button class="primary" style="margin-top:12px" onclick="runBond()">Price it</button><div id="result"></div>`;
  if(c==="gordon") return `<h3>Gordon</h3><label>Last dividend</label><input id="d0" value="2"><label>Growth</label><input id="g" value="0.04"><label>Required return</label><input id="k" value="0.10"><button class="primary" style="margin-top:12px" onclick="runGordon()">Price it</button><div id="result"></div>`;
  if(c==="capm") return `<h3>CAPM</h3><label>Risk-free</label><input id="rf" value="0.03"><label>Market return</label><input id="rm" value="0.09"><label>Beta</label><input id="beta" value="1.3"><button class="primary" style="margin-top:12px" onclick="runCapm()">Required return</button><div id="result"></div>`;
  if(c==="wacc") return `<h3>WACC</h3><label>Equity weight</label><input id="we" value="0.7"><label>Cost of equity</label><input id="re" value="0.12"><label>Debt weight</label><input id="wd" value="0.3"><label>Pre-tax debt</label><input id="rd" value="0.06"><label>Tax</label><input id="tax" value="0.25"><button class="primary" style="margin-top:12px" onclick="runWacc()">Blend it</button><div id="result"></div>`;
  return `<h3>NPV</h3><label>Outlay</label><input id="cost" value="100000"><label>Annual cash flow</label><input id="cf" value="40000"><label>Years</label><input id="yrs" value="3"><label>Hurdle</label><input id="hurdle" value="0.10"><button class="primary" style="margin-top:12px" onclick="runNpv()">Decide</button><div id="result"></div>`;
}
function show(html){ document.getElementById("result").innerHTML=`<div class="out">${html}</div>`; }
function runBond(){ const cp=num("cp"),ytm=num("ytm"),m=num("m"),r=ytm/m,pmt=1000*cp/m,n=num("yrs")*m; const price=pmt*(1-Math.pow(1+r,-n))/r+1000/Math.pow(1+r,n); const kind=cp>ytm?"Premium":cp<ytm?"Discount":"Par"; show(`<strong>${money(price)}</strong><div>${kind}. Buyers require ${pct(ytm)} and the bond pays ${pct(cp)}.</div>`); }
function runGordon(){ const d1=num("d0")*(1+num("g")),k=num("k"),g=num("g"); if(k<=g) return show("k must exceed g."); show(`<strong>${money(d1/(k-g))}</strong><div>Next dividend ${money(d1)} over the spread ${pct(k-g)}.</div>`); }
function runCapm(){ const prem=num("rm")-num("rf"); show(`<strong>${pct(num("rf")+num("beta")*prem)}</strong><div>Start at risk-free. Add beta times the premium ${pct(prem)}.</div>`); }
function runWacc(){ const after=num("rd")*(1-num("tax")); show(`<strong>${pct(num("we")*num("re")+num("wd")*after)}</strong><div>Tax-adjust debt only. After-tax debt ${pct(after)}.</div>`); }
function runNpv(){ const r=num("hurdle"),cf=num("cf"),n=num("yrs"); let pv=0; for(let t=1;t<=n;t++) pv+=cf/Math.pow(1+r,t); const npv=pv-num("cost"); show(`<strong>${money(npv)}</strong><div>${npv>0?"Accept.":"Reject."} Discount each cash flow, add, then subtract today’s outlay.</div>`); }
function render(){
  if(!state.calc) state.calc="bond";
  document.getElementById("app").innerHTML=views[state.tab]();
  document.getElementById("nav").innerHTML=[["chapters","Chapters"],["excel","Excel"],["calc","Calc"],["oa","OA"]].map(([id,label])=>`<button class="${state.tab===id?"on":""}" onclick="state.tab='${id}';save();render()"><b>${label[0]}</b>${label}</button>`).join("");
}
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
render();
