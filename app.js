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
{ type:"calc", topic:"Ratios", stem:"Current assets $210,000, inventory $90,000, current liabilities $100,000. Quick ratio?", choices:["2.10","1.20","0.90","3.00"], answer:1, how:["Quick drops inventory.","210,000 − 90,000 = 120,000.","120,000 / 100,000 = 1.20.","2.10 is the current ratio."] },
{ type:"calc", topic:"Ratios", stem:"NI $80,000, sales $800,000, assets $500,000, equity $250,000. DuPont ROE?", choices:["10%","16%","32%","20%"], answer:2, how:["Profit margin = NI / Sales = 80,000 / 800,000 = 0.10 (10%).","Asset turnover = Sales / Assets = 800,000 / 500,000 = 1.6.","Equity multiplier = Assets / Equity = 500,000 / 250,000 = 2.0.","ROE = 0.10 × 1.6 × 2.0 = 0.32 (32%). Direct check: 80,000 / 250,000 = 32%."] },
{ type:"calc", topic:"Time value", stem:"Invest $8,000 at 5% for 3 years. Future value?", choices:["$9,261","$8,400","$9,520","$10,000"], answer:0, how:["Compound: 8,000 × (1.05)^3.","(1.05)^3 = 1.157625.","8,000 × 1.157625 = 9,261.","$8,400 is one year of simple interest."] },
{ type:"calc", topic:"Time value", stem:"Present value of $15,000 in 5 years at 6%?", choices:["$11,209","$12,000","$10,500","$15,000"], answer:0, how:["Discount: divide by (1.06)^5.","(1.06)^5 ≈ 1.3382.","15,000 / 1.3382 ≈ 11,209."] },
{ type:"calc", topic:"Bonds", stem:"6% annual coupon, 10 years left, face $1,000, yield 8%. Price to nearest dollar?", choices:["$1,000","$866","$1,149","$750"], answer:1, how:["Coupon is fixed at $60; market wants 8%.","PV of coupons ≈ 403; PV of face ≈ 463.","Sum ≈ $866.","Coupon below yield means discount."] },
{ type:"calc", topic:"Bonds", stem:"$1,000 bond, 6% coupon, sells for $900. Current yield?", choices:["6.00%","6.67%","8.00%","5.40%"], answer:1, how:["Current yield = coupon / price.","60 / 900 = 6.67%.","Not YTM."] },
{ type:"calc", topic:"Bonds", stem:"Interest paid on a 6% bond over 2 years and 3 months?", choices:["$120","$135","$150","$60"], answer:1, how:["Annual coupon $60.","2 years 3 months = 2.25 years.","60 × 2.25 = $135."] },
{ type:"calc", topic:"Equity", stem:"Last dividend $2.00, growth 4%, required return 10%. Gordon price?", choices:["$20.00","$33.33","$34.67","$50.00"], answer:2, how:["Use next year’s dividend: 2 × 1.04 = 2.08.","Spread is 10% − 4% = 6%.","2.08 / 0.06 = $34.67."] },
{ type:"calc", topic:"Equity", stem:"Preferred pays $4, required return 8%. Price?", choices:["$32","$50","$48","$40"], answer:1, how:["Fixed dividend, no growth.","P = 4 / 0.08 = $50."] },
{ type:"calc", topic:"CAPM", stem:"Rf 3%, market 9%, beta 1.3. Required return?", choices:["9.0%","10.8%","11.7%","6.9%"], answer:1, how:["Premium is 9% − 3% = 6%.","1.3 × 6% = 7.8%.","3% + 7.8% = 10.8%."] },
{ type:"calc", topic:"WACC", stem:"Equity 70% at 12%, debt 30% at 6% pre-tax, tax 25%. WACC?", choices:["10.20%","9.75%","9.30%","8.40%"], answer:1, how:["Equity piece 0.70 × 12% = 8.40%.","After-tax debt 6% × 0.75 = 4.5%; piece 0.30 × 4.5% = 1.35%.","8.40 + 1.35 = 9.75%."] },
{ type:"calc", topic:"Capital budgeting", stem:"Outlay $100,000, then $40,000 at the end of each of 3 years, hurdle 10%. NPV nearest dollar?", choices:["$20,000","($526)","$99,474","$7,200"], answer:1, how:["Discount each inflow.","PV of inflows ≈ $99,474.","Subtract outlay: ≈ ($526). Reject."] },
{ type:"calc", topic:"Forecasting", stem:"ROE 15%, retention 60%. Sustainable growth rate?", choices:["9.0%","9.9%","15.0%","25.0%"], answer:1, how:["Retention ratio b = 60% = 0.60.","ROE × b = 0.15 × 0.60 = 0.09.","SGR = 0.09 ÷ (1 − 0.09) = 0.09 ÷ 0.91 ≈ 0.0989 = 9.9%."] },
{ type:"calc", topic:"Working capital", stem:"DIO 45, DSO 30, DPO 25. Cash conversion cycle?", choices:["100 days","50 days","20 days","75 days"], answer:1, how:["Operating cycle 45 + 30 = 75.","Subtract payables: 75 − 25 = 50."] },
{ type:"calc", topic:"Bonds", stem:"A bond sells at face value when", choices:["Coupon exceeds yield","Required return equals the coupon rate","Yield is zero","It is convertible"], answer:1, how:["When the fixed coupon matches the market requirement, price equals face."] },
{ type:"calc", topic:"Time value", stem:"Which Excel function finds the rate given PV, FV, PMT, and nper?", choices:["PV","FV","RATE","NPV"], answer:2, how:["RATE solves for the interest rate or yield."] },
{ type:"calc", topic:"WACC", stem:"A firm’s credit rating is downgraded. The likely effect is", choices:["Lower cost of capital","Higher cost of capital","No change","Higher stock price"], answer:1, how:["Lenders demand a higher yield. The cost of financing rises."] },
{ type:"calc", topic:"Statements", stem:"Net income $200,000, retained earnings rose only $50,000. What explains the difference?", choices:["Depreciation of $150,000","Dividends of $150,000","A stock split","An increase in accounts payable"], answer:1, how:["Change in RE = Net income − Dividends.","200,000 − 50,000 = 150,000 paid out as dividends."] },
{ type:"calc", topic:"Ratios", stem:"Freedom Rock: Sales $20,000, total assets $8,000. Total asset turnover?", choices:["0.40","2.50","1.25","4.00"], answer:1, how:["Turnover = Sales / Assets.","20,000 / 8,000 = 2.50."] },
{ type:"calc", topic:"Ratios", stem:"Rusty RoboTech: Net income $2,000, sales $5,000. Profit margin?", choices:["25%","40%","50%","20%"], answer:1, how:["Margin = NI / Sales.","2,000 / 5,000 = 40%."] },
{ type:"calc", topic:"Equity", stem:"Total equity $200 million, 20 million shares. Book value per share?", choices:["$5","$10","$20","$100"], answer:1, how:["Book value per share = Equity / shares.","200 / 20 = $10."] },
{ type:"calc", topic:"Equity", stem:"Market cap $500 million, NI $25 million, 10 million shares. EPS?", choices:["$2.50","$5.00","$25","$50"], answer:0, how:["EPS = NI / shares outstanding.","25 / 10 = $2.50."] },
{ type:"calc", topic:"Valuation", stem:"Next dividend $1.80, growth 7%, required return 11%. Gordon value?", choices:["$16.36","$45.00","$25.71","$18.00"], answer:1, how:["P0 = D1 / (k − g).","1.80 / (0.11 − 0.07) = 45."] },
{ type:"calc", topic:"Valuation", stem:"Next dividend $4.12, growth 3%, required return 11%. Gordon value?", choices:["$37.45","$51.50","$41.20","$48.00"], answer:1, how:["4.12 / (0.11 − 0.03) = 51.50."] },
{ type:"calc", topic:"Forecasting", stem:"Sales $500,000, AR/Sales 15%, next year sales up 20%. Projected AR?", choices:["$75,000","$90,000","$60,000","$100,000"], answer:1, how:["New sales = 500,000 × 1.20 = 600,000.","AR = 15% × 600,000 = 90,000."] },
{ type:"calc", topic:"Forecasting", stem:"Sales $500,000, cash/sales 5%, next year sales +20%. Projected cash?", choices:["$25,000","$30,000","$20,000","$35,000"], answer:1, how:["New sales = 600,000.","Cash = 5% × 600,000 = 30,000."] },
{ type:"calc", topic:"Forecasting", stem:"NI $50,000, equity $350,000, payout 12%. Sustainable growth rate nearest?", choices:["9.0%","12.6%","14.4%","10.0%"], answer:2, how:["ROE = Net income / Equity = 50,000 / 350,000 ≈ 0.1429 (14.29%).","Payout is 12%, so retention ratio b = 1 − 0.12 = 0.88.","ROE × b = 0.1429 × 0.88 ≈ 0.1257 (12.57%).","SGR = 0.1257 / (1 − 0.1257) ≈ 0.1438 ≈ 14.4%."] },
{ type:"calc", topic:"Capital budgeting", stem:"Outlay $80,000. Incremental net revenues: Y1 15k, Y2 20k, Y3 35k, Y4 40k, Y5 41k. Payback (round up)?", choices:["2 years","3 years","4 years","5 years"], answer:2, how:["Cumulative: 15+20=35, +35=70.","Need 10 more of the 40 in year 4.","3 + 10/40 = 3.25 years → round up to 4."] },
{ type:"calc", topic:"Specialist / Bid-ask", stem:"The ask price of Stock A is $56.75, while the bid price for Stock A is $56.71. What is the bid-ask spread?", choices:["0.02","0.04","0.06","0.10"], answer:1, how:["Spread = Ask − Bid.","56.75 − 56.71 = 0.04."] },
{ type:"calc", topic:"Specialist / Bid-ask", stem:"The ask price of Stock A is $215.54, while the bid price for Stock A is $215.14. What is the bid-ask spread?", choices:["0.20","0.30","0.40","0.50"], answer:2, how:["Spread = Ask − Bid.","215.54 − 215.14 = 0.40."] },
{ type:"calc", topic:"Accrual accounting", stem:"A customer purchased $500,000 of product. Cash of $300,000 is paid today and $200,000 is due in 60 days. Expense is $300,000, of which $100,000 has not been paid. Under accrual accounting, you will most likely report:", choices:["revenues of $500,000 and expenses of $200,000","revenues of $300,000 and expenses of $200,000","revenues of $500,000 and expenses of $300,000","revenues of $300,000 and expenses of $300,000"], answer:2, how:["Earnings process is complete, so recognize the full $500,000 revenue.","Matching principle requires the full $300,000 expense that generated that revenue, regardless of cash payment timing."] },
{ type:"calc", topic:"Balance sheet", stem:"A firm purchased equipment three years ago for $500,000. Depreciation claimed: $20,000, $35,000, and $32,500. Gross Fixed Assets should be equal to:", choices:["$412,500","$445,000","$480,000","$500,000"], answer:3, how:["Gross Fixed Assets = original cost.","Depreciation reduces Net Fixed Assets, not Gross Fixed Assets.","Gross remains $500,000."] },
{ type:"calc", topic:"Retained earnings", stem:"TellAll reports retained earnings of $1,122 and $1,402 for 20X1 and 20X2. Dividends were $200 and $225. What was net income for 20X2?", choices:["$55","$280","$505","$1,225"], answer:2, how:["New RE = Old RE + NI − Dividends.","1,402 = 1,122 + NI − 225.","NI = 1,402 − 1,122 + 225 = 505."] },
{ type:"calc", topic:"Retained earnings", stem:"BackJack reports retained earnings of $15,225 for 20X2. Dividends of $4,000 and $2,025 were paid in 20X1 and 20X2. Net income was $8,000 and $5,000. What were retained earnings for 20X1?", choices:["$2,975","$4,075","$12,250","$18,200"], answer:2, how:["New RE = Old RE + (NI − Div).","Old RE = New RE − (NI − Div).","15,225 − (5,000 − 2,025) = 15,225 − 2,975 = 12,250."] },
{ type:"calc", topic:"CFI", stem:"Gross PP&E rose from $20,600 to $22,500. Assuming no asset disposals, what is CFI?", choices:["$1,900","$200","$5,600","None of the above"], answer:0, how:["With no disposals, CFI = change in Gross PP&E.","22,500 − 20,600 = 1,900 (outflow)."] },
{ type:"calc", topic:"CFI", stem:"Last year Net PP&E was $4,600; this year it is $4,500. Depreciation expense this year is $800. Assuming no disposals, what is CFI?", choices:["$100","($100)","($900)","$700"], answer:3, how:["CFI = Change in Net PP&E + Depreciation.","(4,500 − 4,600) + 800 = −100 + 800 = 700 (outflow)."] },
{ type:"calc", topic:"CFI", stem:"Gross PP&E was $5,000 in 20X1 and $6,300 in 20X2. Accumulated depreciation was $2,000 and $2,400. Assuming no disposals, CFI is closest to:", choices:["$400","$1,300","$1,500","$1,700"], answer:1, how:["CFI = Change in Gross PP&E.","6,300 − 5,000 = 1,300."] },
{ type:"calc", topic:"CFI", stem:"Net PP&E rose from $15,200 to $15,400. Depreciation expense is $1,600. Assuming no disposals, what is CFI?", choices:["$1,800","$200","$1,700","None of the above"], answer:0, how:["CFI = Change in Net PP&E + Depreciation.","(15,400 − 15,200) + 1,600 = 200 + 1,600 = 1,800."] },
{ type:"calc", topic:"CFI", stem:"If a firm’s net PP&E increased by $200 and depreciation expense was $250, what was CFI?", choices:["The CFI would be $200 since it reflects the increase in net PP&E only.","The CFI would be equal to the depreciation expense since it’s a non-cash expense.","The CFI would be $50, the net increase in PP&E after accounting for depreciation.","The CFI for that year was $450, indicating an investment in new PP&E."], answer:3, how:["CFI = Change in Net PP&E + Depreciation = 200 + 250 = 450 (outflow)."] },
{ type:"calc", topic:"CFF", stem:"Balken: Change in AP $50, notes payable $100, long-term debt $200, change in RE −$120, dividends $160. What is net income?", choices:["−$40","−$120","$40","$120"], answer:2, how:["Change in RE = NI − Dividends.","−120 = NI − 160.","NI = −120 + 160 = 40."] },
{ type:"calc", topic:"CFF", stem:"U&I: RE last year $2,000, this year $2,500. This year’s NI is $650. Dividends this year were:", choices:["$0","$150","$500","$650"], answer:1, how:["Change in RE = NI − Dividends.","500 = 650 − Dividends.","Dividends = 650 − 500 = 150."] },
{ type:"calc", topic:"CFF", stem:"Balken: Change in notes payable $100, long-term debt $200, change in RE −$120, NI $170. What is CFF?", choices:["−$10","$10","$130","$180"], answer:1, how:["Dividends = NI − Change in RE = 170 − (−120) = 290.","CFF = Change in notes payable + Change in LT debt − Dividends.","100 + 200 − 290 = 10."] },
{ type:"calc", topic:"Profitability", stem:"Kyoto Restaurant has total asset turnover of 1.50, debt-to-equity ratio of 1, and net profit margin of 6.00%. What is Kyoto’s ROE?", choices:["14%","18%","22%","26%"], answer:1, how:["ROE = Net Margin × TAT × (1 + D/E).","0.06 × 1.50 × (1 + 1) = 0.06 × 1.50 × 2 = 0.18 = 18%."] },
{ type:"calc", topic:"Excel TVM", stem:"Suppose that you purchased a car on a loan. The total cost of the car is $50,000. The loan term is six years with a 3% APR. You will make monthly payments. What is the value for the rate input in Excel?", choices:["0.0025","3","36","72"], answer:0, how:["Monthly rate = APR / 12.","0.03 / 12 = 0.0025."] },
{ type:"calc", topic:"Excel functions", stem:"Suppose that you are planning to put aside $500 each month for 25 years to save up $1,500,000. You use the RATE function in Excel to figure out the interest rate that you need on the account. The function returns 0.0121 or 1.21%. Given this information, what is the annual interest rate (APR) you need to earn to meet the goal?", choices:["-500%","1.21%","14.58%","30.37%"], answer:2, how:["RATE returns the monthly rate.","APR = monthly rate × 12.","0.0121 × 12 = 0.1452 ≈ 14.58%."] },
{ type:"calc", topic:"Bond pricing", stem:"A company has a bond that matures in 10 years and has a $1,000 face value. The coupon rate is 9%, and the investor’s required rate of return is 11%. The coupon is paid semiannually. What value should be input for the “rate” variable in the PV function in Excel to find the price of this bond?", choices:["0.055","0.11","0.045","0.09"], answer:0, how:["Semiannual discount rate = annual YTM / 2.","0.11 / 2 = 0.055."] },
{ type:"calc", topic:"Equity valuation", stem:"XYZ Motors paid a $2.75 dividend last year. At a constant growth rate of 8%, what is the value of the common stock if the investors require a 14% rate of return?", choices:["$41.75","$45.00","$47.25","$49.50"], answer:3, how:["Next dividend D1 = 2.75 × 1.08 = 2.97.","Gordon: P0 = D1 / (k − g) = 2.97 / (0.14 − 0.08) = 2.97 / 0.06 = 49.50."] },
{ type:"calc", topic:"Equity valuation", stem:"You are considering purchasing a stock that recently paid a dividend of $2.10 and is expected to grow at the average industry rate of 3% a year. What would you pay for this stock if you require a 10% return on your investments?", choices:["$28.76","$29.87","$30.00","$30.90"], answer:3, how:["D1 = 2.10 × 1.03 = 2.163.","P0 = 2.163 / (0.10 − 0.03) = 2.163 / 0.07 = 30.90."] },
{ type:"calc", topic:"Equity valuation", stem:"Honeydwell’s common stock just paid a dividend of $1.95. Dividends are expected to grow at a 5% annual rate forever. If Honeydwell’s stock is currently selling at $25.45, what is the stock’s expected rate of return?", choices:["11.98%","12.50%","12.72%","13.05%"], answer:3, how:["D1 = 1.95 × 1.05 = 2.0475.","k = D1/P0 + g = 2.0475 / 25.45 + 0.05 ≈ 0.0805 + 0.05 = 0.1305 = 13.05%."] },
{ type:"calc", topic:"Preferred stock", stem:"You own 175 shares of Rain’s preferred stock, which currently sells for $45 per share and pays annual dividends of $2.90 per share. What is your expected return?", choices:["5.25%","2.86%","3.29%","6.44%"], answer:3, how:["Preferred stock is a perpetuity.","k = D / P = 2.90 / 45 = 0.0644 = 6.44%.","Number of shares does not affect the rate of return."] },
{ type:"calc", topic:"Preferred stock", stem:"FredCo preferred stock pays a constant dividend of $3.55 to its shareholders. If your required rate of return on investments is 9%, what would you be willing to pay for FredCo stock?", choices:["$27.22","$32.59","$38.08","$39.44"], answer:3, how:["Price of preferred = D / k.","3.55 / 0.09 = 39.44."] },
{ type:"calc", topic:"Preferred stock", stem:"You have purchased 1,000 shares of Omega Corporation for $11 per share. You require a 35% return for investing in start-up companies. How much must the dividend be in order to reach your required rate of return?", choices:["$31.43","$3.85","$4.02","$28.24"], answer:1, how:["Required dividend = Price × required return.","11 × 0.35 = 3.85."] },
{ type:"calc", topic:"Cost of equity", stem:"A firm expects to pay a dividend of $5 in the next year and anticipates increasing the dividend 3% per year indefinitely. If the current share price is $20, what is the cost of equity, according to the Gordon growth model?", choices:["3%","7.2%","14.6%","28.0%"], answer:3, how:["k = D1/P0 + g.","5 / 20 + 0.03 = 0.25 + 0.03 = 0.28 = 28%."] },
{ type:"calc", topic:"Cost of equity", stem:"Consider a firm that has a β of 0.9. Returns for the market are expected to be 10%, while the risk-free rate is 4%. According to the CAPM, what is the cost of equity?", choices:["4.0%","9.4%","10.0%","12.3%"], answer:1, how:["Market risk premium = 10% − 4% = 6%.","Cost of equity = 4% + 0.9 × 6% = 4% + 5.4% = 9.4%."] },
{ type:"calc", topic:"Cost of equity", stem:"Firm XYZ had historical stock returns of -2.5%, 1.5%, 5.3%, and 3.4%. Using these historical returns, what is the cost of equity?", choices:["1.9%","3.4%","4.1%","5.3%"], answer:0, how:["Arithmetic average = (−2.5 + 1.5 + 5.3 + 3.4) / 4.","(−2.5 + 1.5 = −1; −1 + 5.3 = 4.3; 4.3 + 3.4 = 7.7).","7.7 / 4 = 1.925% ≈ 1.9%."] },
{ type:"calc", topic:"SGR", stem:"FarFromGrooving, Inc. has just been invited to bid on the contract of its dreams. Last year, FarFromGrooving had a net margin of 1.96%, plowback ratio of 75%, ROA of 6.52%, and ROE of 11.9%. Using this information, calculate the company’s SGR to the nearest percent.", choices:["8%","9%","10%","11%","12%","None of the above"], answer:1, how:["SGR = ROE × plowback.","0.119 × 0.75 = 0.08925 ≈ 9%."] },
{ type:"calc", topic:"SGR", stem:"GetStrong, Inc. has net income of $10 million and equity on the balance sheet of $100 million. The company pays an aggregate dividend of $3 million. Compute GetStrong’s sustainable growth rate (SGR).", choices:["3.0%","5.0%","7.0%","10.0%","Not enough information"], answer:2, how:["ROE = 10 / 100 = 10%.","Payout = 3 / 10 = 30%, so plowback = 70%.","SGR = 10% × 0.70 = 7%."] },
{ type:"calc", topic:"SGR", stem:"Given the following information, what is the sustainable growth rate for this company? Net income $2,000,000; Sales $20,000,000; Assets $4,000,000; Dividends $1,000,000; Equity $3,000,000; Liabilities $1,000,000.", choices:["42%","29%","22%","35%","33%"], answer:4, how:["Payout = 1,000,000 / 2,000,000 = 0.5, so plowback = 0.5.","ROE = 2,000,000 / 3,000,000 = 0.667.","SGR = 0.667 × 0.5 ≈ 0.333 = 33%."] },
{ type:"calc", topic:"Terminal cash flow", stem:"Suppose that a firm is considering a project. It estimates that the realizable salvage value of the equipment for the project is $50,000. The equipment will be depreciated down to $10,000 when the project is terminated. How is the tax effect on the sale of this equipment at the end of the project calculated?", choices:["$50,000 multiplied by the tax rate","$10,000 minus $50,000, multiplied by the tax rate","$10,000 multiplied by the tax rate","$50,000 minus $10,000, multiplied by the tax rate"], answer:3, how:["Tax is paid on the gain.","Gain = Salvage − Book value = 50,000 − 10,000.","Tax effect = (50,000 − 10,000) × tax rate."] },
{ type:"calc", topic:"Combined leverage", stem:"If ABC Co. has a DOL of 1.8 and a DFL of 1.6, what is its degree of combined leverage (DCL)?", choices:["0.2","1.125","2.88","3.4"], answer:2, how:["DCL = DOL × DFL.","1.8 × 1.6 = 2.88."] },
{ type:"calc", topic:"Combined leverage", stem:"A firm has sales of $15 million, variable costs of $5 million, fixed costs of $3 million, interest expense of $2 million, and taxes of $0.5 million. What is the degree of combined leverage? (Round to the nearest hundredth.)", choices:["1.43","2.00","2.50","2.00"], answer:1, how:["Contribution margin = Sales − VC = 15 − 5 = 10.","EBIT = Contribution − Fixed = 10 − 3 = 7.","EBT = EBIT − Interest = 7 − 2 = 5.","DCL = Contribution / EBT = 10 / 5 = 2.00.","(Taxes are not used in the DCL formula.)"] },
{ type:"calc", topic:"Cash cycle", stem:"A firm purchased raw materials on April 1st on credit, paid for the materials on April 15th, finished producing and sold the finished product on May 15th, and received payment on May 30th. How many days was the cash cycle?", choices:["30","45","50","55"], answer:1, how:["Cash cycle runs from cash out to cash in.","Cash left on April 15 and returned on May 30.","April 15 to May 30 = 45 days."] },
{ type:"calc", topic:"Cash cycle", stem:"A firm purchased raw materials on April 1st on credit, paid for the materials on April 15th, and finished producing and sold the finished product for cash on May 15th. How many days was the cash cycle?", choices:["15","20","25","30"], answer:3, how:["Cash left on April 15 and returned on May 15.","April 15 to May 15 = 30 days."] },
{ type:"calc", topic:"Cash cycle", stem:"A firm purchased raw materials on June 1st on credit, paid for the materials on June 10th, finished producing and sold the finished product on June 20th, and received payment on June 27th. How many days was the cash cycle?", choices:["13","15","17","21"], answer:2, how:["Cash left on June 10 and returned on June 27.","June 10 to June 27 = 17 days."] },
{ type:"calc", topic:"Operating cycle", stem:"A firm purchased raw materials on April 1st on credit, paid for the materials on April 15th, finished producing and sold the finished product on May 15th, and received payment on May 30th. How many days was the operating cycle?", choices:["30","60","90","120"], answer:1, how:["Operating cycle runs from receipt of materials to receipt of cash.","April 1 to May 30 = 60 days."] },
{ type:"calc", topic:"Operating cycle", stem:"A firm purchased raw materials on April 1st on credit, paid for the materials on April 15th, and finished producing and sold the finished product for cash on May 15th. How many days was the operating cycle?", choices:["40","43","45","47"], answer:2, how:["Materials received April 1; cash received May 15.","April 1 to May 15 = 45 days."] },
{ type:"calc", topic:"Cash ratio", stem:"Suppose a company has the following information in its current asset accounts and has $54,000 in current liabilities. Cash and Cash Equivalents $13,500; Inventory $34,000; Accounts Receivable $28,200. What is the firm’s cash ratio?", choices:["0.25","0.40","0.48","0.52"], answer:0, how:["Cash ratio = Cash / Current liabilities.","13,500 / 54,000 = 0.25."] },
{ type:"calc", topic:"Receivables", stem:"Suppose a company has the following information in its current asset accounts and has $54,000 in current liabilities. Cash $13,500; Inventory $34,000; Accounts Receivable $28,200. If the company has sales of $105,000, what is the firm’s days’ sales in receivables?", choices:["0.13","1.29","54.22","98.03"], answer:3, how:["Receivables turnover = Sales / AR = 105,000 / 28,200 ≈ 3.7234.","Days’ sales in receivables = 365 / 3.7234 ≈ 98.03."] },
{ type:"calc", topic:"Liquidity ratios", stem:"Suppose a company has the following information in its current asset accounts and has $54,000 in current liabilities as well as $75,700 in current assets. Cash $13,500; Inventory $34,000; Accounts Receivable $28,200. What is the firm’s quick ratio?", choices:["0.25","0.63","0.77","0.92"], answer:2, how:["Quick ratio = (Current assets − Inventory) / Current liabilities.","(75,700 − 34,000) / 54,000 = 41,700 / 54,000 ≈ 0.77."] },
{ type:"calc", topic:"Trade credit", stem:"Suppose a firm was provided an option to purchase $100 of raw materials according to a 3/15, net 45 discount policy. What is the 30-day interest rate as a percent on this effective loan? (Round to the nearest hundredth.)", choices:["3.09","3.00","2.91","3.15"], answer:0, how:["If the discount is forgone, the firm pays $100 in 45 days instead of $97 in 15 days.","The extra cost is $3 on $97 for 30 days.","30-day rate = 3 / 97 ≈ 0.03093 = 3.09%."] },
{ type:"calc", topic:"Comparable multiples", stem:"Bernie’s Event Planning has the following data: Sales $2,380,000; COGS 550,000; Depreciation 578; Operating Expense 748,000; Interest 5,000; Tax 376,950. The Price-to-EBITDA multiple for comparable firms is 3. What is the fair price for Bernie’s?", choices:["$1,512,000","$2,380,000","$3,246,000","$3,952,000","None of these choices"], answer:2, how:["EBITDA = Sales − COGS − Operating Expense.","2,380,000 − 550,000 − 748,000 = 1,082,000.","Value = 3 × 1,082,000 = 3,246,000."] },
{ type:"calc", topic:"Comparable multiples", stem:"McBurger Corp sells for $98.60 per share. Net income is $5 million, of which $2.5 million was paid as dividends, and 2.5 million shares are outstanding. Burgerz R Us has net income of $550,000. Using McBurger’s P/E, what should SomeNewBurger pay for Burgerz R Us?", choices:["$550,000","$5 million","$10.4 million","$21.3 million","$27.1 million"], answer:4, how:["McBurger EPS = 5,000,000 / 2,500,000 = $2.","P/E = 98.60 / 2 = 49.3.","Burgerz value = 49.3 × 550,000 ≈ $27.1 million."] },
{ type:"calc", topic:"Retained earnings", stem:"A firm reported retained earnings of $305 in 20X2. For 20X3, the firm reports retained earnings of $400 and pays dividends of $25. What was net income in 20X3?", choices:["$95","$120","$145","$195"], answer:1, how:["New RE = Old RE + NI − Dividends.","400 = 305 + NI − 25.","NI = 400 − 305 + 25 = 120."] },
{ type:"calc", topic:"Retained earnings", stem:"A firm reported retained earnings of $300 in 12/31/20X2. For 12/31/20X3, the firm reports retained earnings of $400 and pays dividends of $25. What was the firm’s net income in 20X3?", choices:["$100","$125","$300","$400"], answer:1, how:["NI = End RE − Beg RE + Dividends.","400 − 300 + 25 = 125."] },
{ type:"calc", topic:"CFF", stem:"Balken, Inc. reports: Change in AP $50, notes payable $100, long-term debt $200, change in RE −$120, NI $170. What is CFF?", choices:["−$10","$10","$130","$180"], answer:1, how:["Dividends = NI − Change in RE = 170 − (−120) = 290.","CFF = Change in NP + Change in LT debt − Dividends = 100 + 200 − 290 = 10."] },
{ type:"calc", topic:"CFF", stem:"Given: RE 3,400 → 3,600; NP 1,200 → 1,300; CS 4,200 → 4,500; NI 500; LT Debt unchanged at 4,500. What is CFF for 20X3?", choices:["($100)","$0","$100","$200"], answer:2, how:["Change in NP = 100.","Change in CS = 300.","Dividends = NI − Change in RE = 500 − 200 = 300.","CFF = 100 + 0 + 300 − 300 = 100."] },
{ type:"calc", topic:"CFO", stem:"Company A: Net income $100,000; Depreciation $20,000; Change in A/R $10,000. What is CFO?", choices:["$(130,000)","$100,000","$110,000","$120,000"], answer:2, how:["CFO = NI + Dep − Increase in AR.","100,000 + 20,000 − 10,000 = 110,000."] },
{ type:"calc", topic:"CFI", stem:"Company B: Gross equipment 1/1 $50,000; 12/31 $65,000; NI $100,000; Dep $20,000. What is CFI for 20X4?", choices:["$(15,000)","$15,000","$80,000","$100,000"], answer:0, how:["CFI = Change in Gross PP&E = 65,000 − 50,000 = 15,000 outflow."] },
{ type:"calc", topic:"CFO", stem:"Given: NI 450,000; Change in AR 120,000; Change in inventory −90,000; Dep 110,000; Change in AP 50,000; Change in accrued −75,000. What is CFO?", choices:["$375,000","$410,000","$505,000","$570,000"], answer:2, how:["CFO = NI + Dep − Increase AR + Decrease inv + Increase AP − Decrease accruals.","450,000 + 110,000 − 120,000 + 90,000 + 50,000 − 75,000 = 505,000."] },
{ type:"calc", topic:"CFI", stem:"Given: Increase in gross PP&E 125,000; Beg net PP&E 750,000; End net PP&E 850,000; Dep 25,000. What is CFI?", choices:["$(125,000)","$(75,000)","$150,000","$850,000"], answer:0, how:["CFI = Change in Gross PP&E = 125,000 outflow.","Equivalently: Change in Net PP&E + Dep = 100,000 + 25,000 = 125,000."] },
{ type:"calc", topic:"CFF", stem:"Given: Increase in mortgage payable 300,000; Decrease in bonds payable 75,000; Dividends paid 80,000. What is CFF?", choices:["$145,000","$225,000","$230,000","$505,000"], answer:0, how:["CFF = Increase in mortgage − Decrease in bonds − Dividends.","300,000 − 75,000 − 80,000 = 145,000."] },
{ type:"calc", topic:"CFI", stem:"Last year net PP&E was $4,600; this year $4,500. Depreciation this year is $800. Assuming no disposals, what is CFI?", choices:["$100 outflow","$100 inflow","$700 outflow","$900 inflow"], answer:2, how:["CFI = Change in Net PP&E + Dep = (4,500 − 4,600) + 800 = 700 outflow."] },
{ type:"calc", topic:"FCFF", stem:"EBIT 1,000,000; Dep 30,000; Change in WC (10,000); Net CAPEX 15,000; Tax 40%. Compute FCFF.", choices:["$600,000","$610,000","$625,000","$675,000"], answer:2, how:["NOPAT = 1,000,000 × (1 − 0.4) = 600,000.","FCFF = NOPAT + Dep − Increase in NWC − CAPEX.","600,000 + 30,000 − (−10,000) − 15,000 = 625,000."] },
{ type:"calc", topic:"Ratios", stem:"Fielder Medical Supplies: Sales 15,000; Total Assets 20,900. Total asset turnover is closest to:", choices:["0.38","0.72","1.39","2.11"], answer:1, how:["TAT = Sales / Total Assets = 15,000 / 20,900 ≈ 0.72."] },
{ type:"calc", topic:"Ratios", stem:"Fielder: Sales 15,000; Net PP&E 8,350. Industry fixed asset turnover is 2.31. Which conclusion is most plausible?", choices:["Fielder is using its fixed assets less efficiently than the industry norm.","Fielder must relax credit standards to increase sales.","Fielder likely needs to invest in fixed assets in the near future.","Fielder is using its fixed assets more efficiently than the industry norm."], answer:0, how:["FAT = 15,000 / 8,350 ≈ 1.80, which is below the industry 2.31."] },
{ type:"calc", topic:"Ratios", stem:"Fielder: CA 12,550; Inventory 5,300; CL 4,260. What is the quick ratio?", choices:["0.34","1.52","1.70","2.95"], answer:2, how:["Quick = (CA − Inv) / CL = (12,550 − 5,300) / 4,260 = 7,250 / 4,260 ≈ 1.70."] },
{ type:"calc", topic:"Ratios", stem:"Fielder: NI 462; Total Assets 20,900. What is ROA?", choices:["0.0221%","2.21%","3.92%","7.27%"], answer:1, how:["ROA = 462 / 20,900 ≈ 0.0221 = 2.21%."] },
{ type:"calc", topic:"Ratios", stem:"Fielder: Operating expense 3,250 + Dep 1,300; Sales 15,000. What percentage of sales is consumed by operating expense (including depreciation)?", choices:["10.13%","30.34%","40.47%","59.53%"], answer:1, how:["(3,250 + 1,300) / 15,000 = 4,550 / 15,000 = 30.33%."] },
{ type:"calc", topic:"Ratios", stem:"Fielder: NI 462; Equity 8,300; Assets 20,900. Industry ROE 4.12%, ROA 2.09%. What is the most plausible conclusion?", choices:["Fielder is underperforming the industry.","Fielder should use more equity financing.","The industry is outperforming Fielder.","Fielder is more profitable than the industry."], answer:3, how:["ROE = 462 / 8,300 ≈ 5.56% > 4.12%.","ROA = 462 / 20,900 ≈ 2.21% > 2.09%."] },
{ type:"calc", topic:"Ratios", stem:"Suppose a firm has a debt-to-equity ratio of 1.50. What percentage of the firm’s assets are financed by equity?", choices:["40%","50%","60%","70%"], answer:0, how:["D/E = 1.5 means Debt = 1.5, Equity = 1.","Total = 2.5.","Equity share = 1 / 2.5 = 0.40 = 40%."] },
{ type:"calc", topic:"Ratios", stem:"Fielder: CA 12,550; CL 4,260; Inv 5,300. Industry current 2.76, quick 1.56. Which statement is most accurate?", choices:["Fielder is likely to be more liquid than the industry because of the firm’s high current and quick ratios.","Fielder’s inventories are less liquid than the industry average.","Fielder’s higher current ratio and quick ratio could be due to higher levels of long-term debt.","Fielder’s higher liquidity ratios are likely due to higher fixed assets."], answer:0, how:["Current = 12,550 / 4,260 ≈ 2.94 > 2.76.","Quick = (12,550 − 5,300) / 4,260 ≈ 1.70 > 1.56."] },
{ type:"calc", topic:"Ratios", stem:"Company X: AR 600, Inventory 800, Fixed assets 1,000, AP 500, LT debt 900, CS 400. What is the current ratio?", choices:["1.2","1.5","2.0","2.8"], answer:3, how:["Current assets = 600 + 800 = 1,400.","Current liabilities = 500.","Current ratio = 1,400 / 500 = 2.8."] },
{ type:"calc", topic:"Ratios", stem:"Cash 100, AR 250, Inventory 300, AP 300. What is the quick ratio?", choices:["0.33","1.00","1.17","2.17"], answer:2, how:["Quick = (100 + 250) / 300 = 350 / 300 ≈ 1.17."] },
{ type:"calc", topic:"Ratios", stem:"Current assets 80, fixed assets 120, sales 150, EBIT 35. What is fixed asset turnover?", choices:["0.80","1.25","2.29","5.71"], answer:1, how:["FAT = Sales / Fixed assets = 150 / 120 = 1.25."] },
{ type:"calc", topic:"Ratios", stem:"Current assets 90, fixed assets 140, debt 125. What is the debt ratio?", choices:["0.54","1.12","1.36","1.84"], answer:0, how:["Total assets = 90 + 140 = 230.","Debt ratio = 125 / 230 ≈ 0.54."] },
{ type:"calc", topic:"Ratios", stem:"Suppose a firm has a debt-to-equity ratio of 1. What percentage of the firm’s assets is financed by equity?", choices:["40%","50%","60%","70%"], answer:1, how:["D/E = 1 means equal debt and equity.","Equity share = 1 / (1 + 1) = 50%."] },
{ type:"calc", topic:"Preferred stock", stem:"What is the value of a preferred stock where the dividend rate is 15% on a $100 par value? The appropriate discount rate is 12%.", choices:["$115.25","$125.00","$127.75","$130.25"], answer:1, how:["Dividend = 0.15 × 100 = 15.","Price = D / k = 15 / 0.12 = 125."] },
{ type:"calc", topic:"Preferred stock", stem:"Calculate the value of a preferred stock that pays a dividend of $5 per share, assuming a required rate of return of 14%.", choices:["$30.90","$32.50","$35.71","$38.22"], answer:2, how:["Price = D / k = 5 / 0.14 ≈ 35.71."] },
{ type:"calc", topic:"Equity valuation", stem:"ABC’s common stock currently sells for $36.68 per share. The company’s executives anticipate a growth rate of 6% and a future dividend of $1.75. What is your expected rate of return?", choices:["9.33%","9.45%","10.25%","10.77%"], answer:3, how:["k = D1/P0 + g = 1.75 / 36.68 + 0.06 ≈ 0.0477 + 0.06 = 0.1077 = 10.77%."] },
{ type:"calc", topic:"Equity valuation", stem:"A company just paid a dividend of $2.30 per share. Future growth will be 2%. What is the value of the stock if you require an 8% return?", choices:["$28.75","$38.33","$39.10","$41.67"], answer:2, how:["D1 = 2.30 × 1.02 = 2.346.","P0 = 2.346 / (0.08 − 0.02) = 2.346 / 0.06 = 39.10."] },
{ type:"calc", topic:"Preferred stock", stem:"Preferred stock sells for $85 and pays a dividend today of $2.25. What is the rate of return?", choices:["0.0265","0.2250","0.2650","0.3176"], answer:0, how:["k = D / P = 2.25 / 85 = 0.0265."] },
{ type:"calc", topic:"Equity valuation", stem:"Expected dividend $13.85, growth 2.75%, price $290. What is the expected rate of return?", choices:["0.0375","0.0408","0.0411","0.0753"], answer:3, how:["k = 13.85 / 290 + 0.0275 ≈ 0.0478 + 0.0275 = 0.0753."] },
{ type:"calc", topic:"Equity valuation", stem:"Friend recommends buying if price exceeds $165. Growth 4%, latest dividend $6, required return 11%. Why should you buy or not buy?", choices:["Do not buy—the calculated price is too low.","Do not buy—the return is higher than growth.","Buy—the calculated price is higher.","Buy—the dividend is higher than the return."], answer:0, how:["D1 = 6 × 1.04 = 6.24.","P0 = 6.24 / (0.11 − 0.04) = 6.24 / 0.07 ≈ 89.14.","Calculated value is well below $165, so do not buy."] },
{ type:"calc", topic:"Equity valuation", stem:"Dividend $6 today, growth 4.5%, required return 7%. What is the value of the common stock?", choices:["$85.71","$179.14","$240.00","$250.80"], answer:3, how:["D1 = 6 × 1.045 = 6.27.","P0 = 6.27 / (0.07 − 0.045) = 6.27 / 0.025 = 250.80."] },
{ type:"calc", topic:"Equity valuation", stem:"Common stock worth $75, growth 5%, expected dividend next year $2. What is the expected rate of return?", choices:["0.0267","0.0550","0.0750","0.0767"], answer:3, how:["k = 2 / 75 + 0.05 = 0.0267 + 0.05 = 0.0767."] },
{ type:"calc", topic:"Preferred stock", stem:"What is the value of preferred stock when the dividend is $3 per share and the expected rate of return is 6.5%?", choices:["$46.15","$56.15","$72.63","$191.45"], answer:0, how:["Price = 3 / 0.065 ≈ 46.15."] },
{ type:"calc", topic:"Equity valuation", stem:"Next year’s dividend $4, growth 5%, required return 15%. What is the price according to the Gordon model?", choices:["$19.22","$40.00","$46.52","$59.43"], answer:1, how:["P0 = 4 / (0.15 − 0.05) = 4 / 0.10 = 40."] },
{ type:"calc", topic:"Equity valuation", stem:"Recently paid dividend $3, growth 6%, required return 12%. What is the price according to the Gordon model?", choices:["$47.26","$53.00","$61.52","$75.61"], answer:1, how:["D1 = 3 × 1.06 = 3.18.","P0 = 3.18 / (0.12 − 0.06) = 3.18 / 0.06 = 53."] },
{ type:"calc", topic:"Equity valuation", stem:"Next year’s dividend $3, growth 7%, current price $50. What is the required return?", choices:["11%","13%","16.5%","19%"], answer:1, how:["k = 3 / 50 + 0.07 = 0.06 + 0.07 = 0.13 = 13%."] },
{ type:"calc", topic:"SGR", stem:"Net profit margin 8%, total asset turnover 5, equity multiplier 1. Firm pays no dividends. What is the sustainable growth rate?", choices:["0%","5%","8%","20%","40%"], answer:4, how:["ROE = 0.08 × 5 × 1 = 0.40.","Plowback = 1 (no dividends).","SGR = 40%."] },
{ type:"calc", topic:"Forecasting", stem:"Sales $1,000,000. Cash 25% of sales, AR 13% of sales, Inventory 15% of COGS, COGS 50% of sales. What are total current assets?", choices:["$338,000","$380,000","$455,000","$1,030,000"], answer:2, how:["Cash = 0.25 × 1,000,000 = 250,000.","AR = 0.13 × 1,000,000 = 130,000.","Inventory = 0.15 × 0.50 × 1,000,000 = 75,000.","Total CA = 250,000 + 130,000 + 75,000 = 455,000."] },
{ type:"calc", topic:"Forecasting", stem:"Whole Pine forecasts sales of $450 million. Spontaneous: cash 5%, AR 17%, inventory 11%, PP&E 48%, AP 18%. Mortgage $30M, bonds $50M, equity $150M, earnings $35M. What is DFN?", choices:["−$16.5 million","$15.5 million","$18.5 million","$33 million"], answer:2, how:["Assets = (0.05+0.17+0.11+0.48) × 450 = 0.81 × 450 = 364.5.","Liabilities + Equity = 0.18×450 + 30 + 50 + 150 + 35 = 81 + 265 = 346.","DFN = 364.5 − 346 = 18.5."] },
{ type:"calc", topic:"Forecasting", stem:"Paradigm Toys forecasts sales $750,000. Cash 11%, AR 8%, inventory 13%, AP 14%. PP&E $210,000. LT debt $120,000, equity $85,000, profits $55,000. What is DFN?", choices:["$25,000","$30,000","$85,000","$110,000"], answer:2, how:["Spontaneous assets = (0.11+0.08+0.13)×750,000 = 240,000.","Total assets = 240,000 + 210,000 = 450,000.","Financing = 0.14×750,000 + 120,000 + 85,000 + 55,000 = 105,000 + 260,000 = 365,000.","DFN = 450,000 − 365,000 = 85,000."] },
{ type:"calc", topic:"SGR", stem:"Jaunty Coffee: sales $70M, expenses $50M, tax 40%, equity $42M, dividends $4.5M. What is SGR?", choices:["0.1429","0.1667","0.1786","0.6015"], answer:2, how:["EBT = 70 − 50 = 20.","NI = 20 × (1 − 0.4) = 12.","ROE = 12 / 42 ≈ 0.2857.","Payout = 4.5 / 12 = 0.375, plowback = 0.625.","SGR = 0.2857 × 0.625 ≈ 0.1786."] },
{ type:"calc", topic:"SGR", stem:"Freedom Rock: NI $25M, assets $100M, equity $85M, payout 12%. What is SGR?", choices:["0.0353","0.1285","0.2200","0.2588"], answer:3, how:["ROE = 25 / 85 ≈ 0.2941.","Plowback = 1 − 0.12 = 0.88.","SGR = 0.2941 × 0.88 ≈ 0.2588."] },
{ type:"calc", topic:"Forecasting", stem:"Sales $10M, pre-tax earnings $1M, payout 0.12, tax 40%. What is the increase in retained earnings?", choices:["$400,000","$528,000","$726,000","$880,000"], answer:1, how:["NI = 1,000,000 × (1 − 0.4) = 600,000.","Dividends = 0.12 × 600,000 = 72,000.","Increase in RE = 600,000 − 72,000 = 528,000."] },
{ type:"calc", topic:"SGR", stem:"Sales $2.5M, total expenses $2.0M, assets $3.0M, equity $1.3M, payout 0.25. What is SGR?", choices:["0.2552","0.2885","0.3846","0.7500"], answer:1, how:["NI = 2.5 − 2.0 = 0.5.","ROE = 0.5 / 1.3 ≈ 0.3846.","Plowback = 0.75.","SGR = 0.3846 × 0.75 ≈ 0.2885."] },
{ type:"calc", topic:"Leverage", stem:"Sales $101M, VC $74M, FC $15M, interest $3M, taxes $0.5M. What is DCL?", choices:["2.22","2.70","3.00","3.38"], answer:2, how:["Contribution = 101 − 74 = 27.","EBIT = 27 − 15 = 12.","EBT = 12 − 3 = 9.","DCL = Contribution / EBT = 27 / 9 = 3.00."] },
{ type:"calc", topic:"Leverage", stem:"EBIT $14M, interest $5M. What is DFL?", choices:["1.56","2.80","3.50","4.67"], answer:0, how:["DFL = EBIT / (EBIT − Interest) = 14 / (14 − 5) = 14 / 9 ≈ 1.56."] },
{ type:"calc", topic:"Leverage", stem:"Sales $150M, VC $61M, EBIT $44M, interest $22M. What is DCL?", choices:["2.02","3.03","4.05","5.00"], answer:2, how:["Contribution = 150 − 61 = 89.","EBT = 44 − 22 = 22.","DCL = 89 / 22 ≈ 4.05."] },
{ type:"calc", topic:"Leverage", stem:"VC $14M, FC $18M, EBIT $25M. What is DOL?", choices:["1.28","1.72","2.28","2.56"], answer:1, how:["Contribution = EBIT + FC = 25 + 18 = 43.","DOL = Contribution / EBIT = 43 / 25 = 1.72."] },
{ type:"calc", topic:"Leverage", stem:"Sales $15M, VC $4M, FC $6M, EBIT $5M. What is DOL?", choices:["1.80","2.20","2.50","3.00"], answer:1, how:["Contribution = 15 − 4 = 11.","DOL = 11 / 5 = 2.20."] },
{ type:"calc", topic:"Leverage", stem:"DOL 1.5, DFL 2.2. What is DCL?", choices:["1.47","3.30","3.70","4.00"], answer:1, how:["DCL = DOL × DFL = 1.5 × 2.2 = 3.30."] },
{ type:"calc", topic:"Leverage", stem:"EBIT $138M, interest $77M. What is DFL?", choices:["1.79","2.26","3.45","4.60"], answer:1, how:["DFL = 138 / (138 − 77) = 138 / 61 ≈ 2.26."] },
{ type:"calc", topic:"Leverage", stem:"Sales $102M, FC $58M, EBIT $35M. What is DOL?", choices:["1.66","2.66","2.91","3.40"], answer:1, how:["Contribution = EBIT + FC = 35 + 58 = 93.","DOL = 93 / 35 ≈ 2.66."] },
{ type:"calc", topic:"Leverage", stem:"DOL 2.1, DFL 2.5. What is DCL?", choices:["4.60","5.25","5.60","6.00"], answer:1, how:["DCL = 2.1 × 2.5 = 5.25."] },
{ type:"calc", topic:"Leverage", stem:"EBIT $56M, EBT $34M. What is DFL?", choices:["1.65","1.85","2.00","2.25"], answer:0, how:["DFL = EBIT / EBT = 56 / 34 ≈ 1.65."] },
{ type:"calc", topic:"Leverage", stem:"EBIT $126M, EBT $101M. What is DFL?", choices:["1.25","1.35","1.45","1.55"], answer:0, how:["DFL = 126 / 101 ≈ 1.25."] },
{ type:"calc", topic:"Leverage", stem:"Sales $56M, VC $20M, FC $21M. What is DOL?", choices:["1.71","2.40","3.20","4.00"], answer:1, how:["Contribution = 56 − 20 = 36.","EBIT = 36 − 21 = 15.","DOL = 36 / 15 = 2.40."] },
{ type:"calc", topic:"Leverage", stem:"Company A: EBIT 700,000, interest 30,000. Company B: EBIT 1,500,000, interest 30,000. Which has higher DFL?", choices:["Company A","Company B","Companies A and B have the same leverage.","There is not enough information to determine."], answer:0, how:["A: 700 / 670 ≈ 1.045.","B: 1,500 / 1,470 ≈ 1.020.","A has the higher DFL."] },
{ type:"calc", topic:"Leverage", stem:"Company Y: EBIT 3M, sales 25M, VC 18M. DOL of Z is 5.25. How does Y compare?", choices:["Operating leverage of 0.43; as sales increase, Company Y’s profits will rise faster than Company Z’s.","Operating leverage of 2.33; as sales increase, the profits of both companies will stay the same.","Operating leverage of 0.43; as sales increase, Company Y’s profits will rise slower than Company Z’s.","Operating leverage of 2.33; as sales increase, Company Y’s profits will rise slower than Company Z’s."], answer:3, how:["DOL Y = (25 − 18) / 3 = 7 / 3 ≈ 2.33.","2.33 < 5.25, so Y’s profits rise more slowly."] },
{ type:"calc", topic:"Leverage", stem:"EBIT 500,000, interest 50,000, sales 4,500,000, VC 3,000,000. What is DFL?", choices:["1.11","1.33","3.00","3.33"], answer:0, how:["DFL = 500 / (500 − 50) = 500 / 450 ≈ 1.11."] },
{ type:"calc", topic:"Leverage", stem:"EBIT 700,000, interest 100,000, sales 3,500,000, VC 1,200,000. What is DCL?", choices:["0.462","2.917","3.833","5.000"], answer:2, how:["Contribution = 3,500 − 1,200 = 2,300.","DCL = 2,300 / (700 − 100) = 2,300 / 600 ≈ 3.833."] },
{ type:"calc", topic:"Leverage", stem:"Sales 100,000, VC 75,000, EBIT 10,000. What is DOL?", choices:["1.00","2.05","2.50","10.00"], answer:2, how:["DOL = (100,000 − 75,000) / 10,000 = 2.50."] },
{ type:"calc", topic:"Operating cycle", stem:"Raw materials June 1 on credit, paid June 10, sold June 20, cash received June 27. How many days was the operating cycle?", choices:["23","25","27","29"], answer:2, how:["Operating cycle runs from receipt of materials to receipt of cash.","June 1 to June 27 = 27 days."] },
{ type:"calc", topic:"Valuation", stem:"Sales $10M, EBITDA $2.5M, earnings $1.5M. Agreed P/EBITDA of 5. How much is the firm worth?", choices:["$2.5 million","$7.5 million","$12.5 million","$50 million","Not enough data to tell"], answer:2, how:["Value = 5 × 2.5M = 12.5M."] },
{ type:"calc", topic:"Valuation", stem:"Bullzai: earnings $1,200,000 on 350,000 shares. Endothon sells for $21 with EPS $3.80. What is Bullzai’s value?", choices:["$1,330,000","$6,632,000","$7,000,000","$7,350,000"], answer:1, how:["Bullzai EPS = 1,200,000 / 350,000 ≈ 3.4286.","Endothon P/E = 21 / 3.80 ≈ 5.5263.","Value = 3.4286 × 5.5263 × 350,000 ≈ 6,632,000."] },
{ type:"calc", topic:"Valuation", stem:"Wild Parsley: EPS $2.80, 125,000 shares. Orange Zest sells for $43 with EPS $5. What is Wild Parsley’s value?", choices:["$1,920,000","$2,800,000","$3,010,000","$5,375,000"], answer:2, how:["Orange Zest P/E = 43 / 5 = 8.6.","Value = 8.6 × 2.80 × 125,000 = 3,010,000."] },
{ type:"concept", topic:"Ratios", stem:"Gross margin is the only margin behind peers; the gap never widens later. Where is the problem?", choices:["Interest","Operating expenses","Cost of goods sold","Tax rate"], answer:2, how:["The first place a gap appears is the cause.","Gross margin is sales minus COGS.","Later margins do not widen, so later costs are not the problem."] },
{ type:"concept", topic:"Working capital", stem:"Current ratio steady, quick ratio falling. What is building?", choices:["Cash","Inventory","Payables","Equity"], answer:1, how:["Quick drops inventory.","If the full ratio holds and quick weakens, inventory is growing."] },
{ type:"concept", topic:"Regulation", stem:"Which act split commercial and investment banking and created deposit insurance?", choices:["McFadden","Glass-Steagall 1933","Gramm-Leach-Bliley 1999","Dodd-Frank 2010"], answer:1, how:["Depression response.","Glass-Steagall split the businesses and created the FDIC."] },
{ type:"concept", topic:"Regulation", stem:"A bank trades stocks for its own account. Which rule restricts that?", choices:["Regulation S","Rule 144A","Volcker Rule","SOX Section 302"], answer:2, how:["Proprietary trading inside a bank.","Volcker (inside Dodd-Frank) limits it."] },
{ type:"concept", topic:"Regulation", stem:"Securities sold only to wealthy institutions, no S-1. Which exemption?", choices:["Regulation S","Rule 144A","Securities Act of 1933","FINRA"], answer:1, how:["No S-1 means not a registered public sale.","Limited to accredited buyers is 144A."] },
{ type:"concept", topic:"Regulation", stem:"Enron. Executives and the auditor. Which act answers that?", choices:["Sarbanes-Oxley","Riegle-Neal","DIDMCA","FIRREA"], answer:0, how:["Certified numbers that were not true.","SOX requires executive certification, auditor independence, and internal controls."] },
{ type:"concept", topic:"Markets", stem:"Which is correct?", choices:["Firm receives cash in a secondary trade","NYSE is the dealer example","In a primary sale the issuer receives the cash","Best efforts means the underwriter buys the issue"], answer:2, how:["Primary: issuer is the seller and gets the cash.","Secondary is investor to investor. Firm commitment means the underwriter buys the issue."] },
{ type:"concept", topic:"Forecasting", stem:"30% chance of recession. Probability of expansion?", choices:["30%","70%","100%","0%"], answer:1, how:["Probabilities of complementary events sum to 100%."] },
{ type:"concept", topic:"Equity", stem:"Preferred stock is considered", choices:["Pure debt","Pure equity","A hybrid","A derivative"], answer:2, how:["Fixed claim like debt, ownership features like equity.","Cumulative, no voting, higher claim than common."] },
{ type:"concept", topic:"Markets", stem:"Underwriter buys the entire issue and resells it. This is", choices:["Best efforts","Firm commitment","Private placement","Regulation S"], answer:1, how:["Firm commitment means the underwriter purchases the issue."] },
{ type:"concept", topic:"Working capital", stem:"Managing working capital means", choices:["Collect slowly and pay quickly","Collect quickly and pay slowly","Maximize inventory","Minimize payables"], answer:1, how:["Speed collections, delay disbursements. That shortens the cash cycle."] },
{ type:"concept", topic:"Regulation", stem:"SEC Form S-1 is", choices:["The annual report","The IPO prospectus","The quarterly report","A private placement memo"], answer:1, how:["S-1 is the original offering prospectus for a public sale."] },
{ type:"concept", topic:"Regulation", stem:"Regulation S allows", choices:["Sales to accredited U.S. buyers","Offshore sales to non-U.S. persons","Any private placement","Bank proprietary trading"], answer:1, how:["Reg S is the offshore safe harbor."] },
{ type:"concept", topic:"Forecasting", stem:"In percent-of-sales forecasting, the first step is", choices:["Secure financing","Project future sales","Set the dividend","Issue equity"], answer:1, how:["Everything else scales from the sales forecast."] },
{ type:"concept", topic:"Valuation", stem:"Private company valuation often uses", choices:["Gordon only","Comparable multiples (PE)","Only book value","Only CAPM"], answer:1, how:["Comparable multiples apply market ratios to private earnings."] },
{ type:"concept", topic:"Markets", stem:"NYSE is the classic example of", choices:["A dealer market","An auction market","An OTC market only","A primary market"], answer:1, how:["NYSE is the auction/specialist example. NASDAQ is the dealer example."] },
{ type:"concept", topic:"Regulation", stem:"FINRA primarily", choices:["Sets monetary policy","Regulates broker-dealers","Issues deposit insurance","Writes the tax code"], answer:1, how:["FINRA oversees broker-dealers and their conduct."] },
{ type:"concept", topic:"Markets", stem:"What is an auction market in secondary financial markets?", choices:["Dealers quote bid and ask from inventory","Buyers and sellers submit competing bids and offers that are matched","The issuer sells new securities to the public","A negotiated OTC trade between two institutions"], answer:1, how:["Auction markets match highest bid with lowest offer.","NYSE is the classic example.","Dealer markets use market-maker quotes instead."] },
{ type:"concept", topic:"Ratios", stem:"What does ROE measure?", choices:["Profit per dollar of sales","Return generated on shareholders’ equity","How fast assets turn over","The firm’s interest coverage"], answer:1, how:["ROE = NI / Equity.","It shows the return owners earn on the capital they have invested."] },
{ type:"concept", topic:"Equity", stem:"In bankruptcy, primary difference in claim hierarchy between common and preferred stockholders?", choices:["Common has priority","Preferred has priority over common","They rank equally","Preferred is paid after all creditors and common"], answer:1, how:["Preferred sits above common in the residual claim order.","Both are behind debt."] },
{ type:"concept", topic:"Equity", stem:"Key advantage of common stock over preferred?", choices:["Fixed dividend","Priority in bankruptcy","Voting rights and residual upside","Tax-exempt dividends"], answer:2, how:["Common has voting power.","It receives residual earnings after preferred."] },
{ type:"concept", topic:"CAPM", stem:"Significance of the market risk premium in CAPM?", choices:["It is the risk-free rate","It is the extra return investors require for bearing market risk","It equals beta","It is the firm’s cost of debt"], answer:1, how:["Premium = Rm − Rf.","CAPM scales that premium by beta."] },
{ type:"concept", topic:"CAPM", stem:"What does CAPM imply about stocks with beta greater than 1?", choices:["They have lower expected return than the market","They amplify market moves and require a higher return","They are risk-free","Their return equals the risk-free rate"], answer:1, how:["Beta > 1 means more systematic risk.","Required return = Rf + β(Rm − Rf) exceeds the market return."] },
{ type:"concept", topic:"Working capital", stem:"How does a JIT inventory system affect working capital?", choices:["Increases inventory and WC","Reduces inventory and the working-capital requirement","Has no effect","Increases receivables"], answer:1, how:["JIT keeps inventory low.","Lower inventory frees cash and reduces the WC need."] },
{ type:"concept", topic:"Working capital", stem:"Best ratio to assess efficiency of a firm’s credit policy?", choices:["Current ratio","Receivables turnover or days sales outstanding","Inventory turnover","Debt ratio"], answer:1, how:["Credit policy shows up in how fast receivables are collected.","High turnover / low DSO means tighter credit."] },
{ type:"concept", topic:"Regulation", stem:"Primary role of the SEC?", choices:["Set monetary policy","Protect investors and maintain fair, orderly markets","Insure bank deposits","Underwrite new issues"], answer:1, how:["SEC oversees securities markets and disclosure.","FDIC insures deposits; the Fed handles monetary policy."] },
{ type:"concept", topic:"Regulation", stem:"After going public, what must a company file with the SEC?", choices:["Only the IPO prospectus","Periodic reports such as 10-K and 10-Q","Nothing further","Only insider trading reports"], answer:1, how:["Public companies file ongoing disclosure.","10-K (annual) and 10-Q (quarterly) are the main reports."] },
{ type:"concept", topic:"Regulation", stem:"Under SOX, what must the annual report include regarding internal control?", choices:["Nothing","Management’s assessment of internal controls over financial reporting","A list of all employees","The firm’s marketing plan"], answer:1, how:["SOX requires management to assess and report on internal control.","Auditors also attest."] },
{ type:"concept", topic:"Shareholder value", stem:"Traditionally, the goal of the firm is to ___________ shareholder value.", choices:["protect","maximize","preserve"], answer:1, how:["The traditional goal is to maximize shareholder value."] },
{ type:"concept", topic:"Shareholder value", stem:"Firms that are maximizing shareholder value will generally see increases in the firm’s stock price.", choices:["True","False"], answer:0, how:["Successful value maximization is reflected in a higher stock price."] },
{ type:"concept", topic:"Shareholder value", stem:"What is a way firms can maximize shareholder value?", choices:["Provide raises to all employees to improve morale","Invest in new machinery that will be profitable","Invest capital into projects that will improve the visibility of the firm","Increase sales of products even if at a loss"], answer:1, how:["Investments that raise productivity and profitability increase shareholder value."] },
{ type:"concept", topic:"Shareholder value", stem:"Privately held companies and publicly traded companies will always maximize shareholder value in the same way.", choices:["True","False"], answer:1, how:["Private and public firms face different constraints and may make different decisions."] },
{ type:"concept", topic:"Cash flow statement", stem:"Cash flow from operations (CFO) cannot be managed.", choices:["True","False"], answer:1, how:["Managerial discretion in reporting can affect reported CFO."] },
{ type:"concept", topic:"Cash flow statement", stem:"The statement of cash flows categorizes cash flows into cash flow from operations, cash flow from production, and cash flow from financing.", choices:["True","False"], answer:1, how:["The three categories are operations, investing, and financing.","There is no “production” category."] },
{ type:"concept", topic:"Cash flow statement", stem:"Unlike net income, cash flow from operations (CFO) is not subject to managerial discretion or manipulation.", choices:["True","False"], answer:1, how:["While total cash is hard to manipulate, cash can be shifted between categories (CFO vs CFI)."] },
{ type:"concept", topic:"Cash flow statement", stem:"Which activity would be classified under cash flow from investing (CFI)?", choices:["Sales generated by the firm","Payment of dividends","Issuance of equity or debt","Purchase of long-term assets"], answer:3, how:["Purchases and sales of long-term assets are investing activities."] },
{ type:"concept", topic:"Cash flow statement", stem:"Which types of transactions are typically reported under cash flow from financing (CFF)?", choices:["Issuance of debt, equity transactions, and paying dividends","Acquisition and disposal of fixed assets","Purchase of inventory and payment to suppliers","Sales revenue, returns, and discounts"], answer:0, how:["CFF covers debt issuance/repayment, equity issuance/repurchase, and dividends."] },
{ type:"concept", topic:"Cash flow statement", stem:"What does cash flow from financing (CFF) measure?", choices:["Net cash impact of financing decisions","Cash spent on operational expenses","Net cash impact of sales transactions","Cash utilized in purchasing fixed assets"], answer:0, how:["CFF captures the net cash effect of financing activities."] },
{ type:"concept", topic:"Ratios", stem:"The ratios used in financial analysis are defined by GAAP.", choices:["True","False"], answer:1, how:["There are no GAAP rules for ratios.","Analysts can construct the ratios they need."] },
{ type:"concept", topic:"Ratios", stem:"Which of the following statements is NOT correct with respect to using ratios to analyze a firm or firms?", choices:["Ratio analysis can be used to assess the need for cost cutting initiatives.","Ratio analysis can be used to compare three companies with different sizes, strategies, and risks.","A change in ratios reveals the economic character of the firm.","Analysts can create a new ratio to show more detail about the cost structure of a company."], answer:2, how:["Ratios flag areas for investigation.","They do not by themselves reveal the economic character of the firm."] },
{ type:"concept", topic:"Ratios", stem:"Which of the following is NOT one of the common categories of ratios?", choices:["Liquidity","Profitability","Financing","Operating"], answer:3, how:["Common categories are liquidity, asset-use efficiency, financing (leverage), and profitability.","“Operating” is not a standard category in this framework."] },
{ type:"concept", topic:"Ratios", stem:"Ratios help identify the areas of a firm that need investigation.", choices:["True","False"], answer:0, how:["Ratios point to questions; they do not answer them."] },
{ type:"concept", topic:"Equity", stem:"Stockholders own the remaining earnings after operations are paid for and creditors are paid, making equity a _________ claim.", choices:["backlog","fixed","residual","limited"], answer:2, how:["Equity holders have a residual claim: they receive what remains after creditors are paid."] },
{ type:"concept", topic:"Equity", stem:"Stock and equity essentially mean the same thing in finance.", choices:["True","False"], answer:0, how:["Buying a share of stock makes you a partial owner; stock and equity both refer to ownership."] },
{ type:"concept", topic:"Equity", stem:"Common stock shareholders (in the aggregate) have all of the following rights EXCEPT:", choices:["Voting rights to elect the board of directors","Input on hiring and firing upper management","The right to sell shares at will","Highest claims position in a liquidation case"], answer:3, how:["Common shareholders have the lowest claim in liquidation.","They are paid after debt holders and preferred shareholders."] },
{ type:"concept", topic:"Equity", stem:"Common stock represents ownership in the firm.", choices:["True","False"], answer:0, how:["Common stock is an ownership claim."] },
{ type:"concept", topic:"Equity", stem:"Common stock guarantees an equal stream of future cash flows.", choices:["True","False"], answer:1, how:["Dividends on common stock are discretionary and can vary or be zero."] },
{ type:"concept", topic:"Equity", stem:"What are the two main types of stock?", choices:["Common and preferred","Fixed and preferred","Common and fixed","Directed and common"], answer:0, how:["The two main types are common stock and preferred stock."] },
{ type:"concept", topic:"Equity", stem:"Stocks are _________.", choices:["temporary-return securities","constant-return securities","fixed-return securities","variable-return securities"], answer:3, how:["Future cash flows on stock are uncertain, so stocks are variable-return securities."] },
{ type:"concept", topic:"Equity", stem:"Investing in a good, stable company is always a good investment.", choices:["True","False"], answer:1, how:["A good company can still be a bad investment if the stock is overpriced."] },
{ type:"concept", topic:"Equity", stem:"We can value stocks like debt by discounting all future cash flows to the present value.", choices:["True","False"], answer:0, how:["Both stock and bond valuation discount expected future cash flows to the present."] },
{ type:"concept", topic:"Preferred stock", stem:"Which of the following is true for preferred stockholders?", choices:["They will have dividend priority over common stockholders.","Their dividends will increase as the company grows.","They receive the same dividend as common stockholders.","Their dividends fluctuate every year."], answer:0, how:["Preferred dividends are paid before common dividends and are typically fixed."] },
{ type:"concept", topic:"Preferred stock", stem:"If a company neglects paying dividends to a preferred stockholder in year one, but they pay the set dividend in year two, they must do which of the following?", choices:["Pay common stockholders dividends in year two","Convert preferred stock to common stock shares","File for a dismissal of last year’s dividends with the SEC","Pay year one preferred dividend before paying any common stockholder dividends"], answer:3, how:["With cumulative preferred stock, missed dividends accumulate and must be paid before any common dividend."] },
{ type:"concept", topic:"Preferred stock", stem:"Most corporations in the U.S. issue preferred stock.", choices:["True","False"], answer:1, how:["Most firms do not issue preferred stock.","Utilities and some VC-backed firms are the common issuers."] },
{ type:"concept", topic:"CAPM", stem:"According to the CAPM, all unsystematic risk can be diversified away.", choices:["True","False"], answer:0, how:["Unsystematic (firm-specific) risk can be eliminated through diversification."] },
{ type:"concept", topic:"CAPM", stem:"According to the CAPM, some systematic risk can be diversified away.", choices:["True","False"], answer:1, how:["Systematic risk affects the market and cannot be diversified away."] },
{ type:"concept", topic:"CAPM", stem:"The CAPM beta for the market is equal to 1.", choices:["True","False"], answer:0, how:["The market portfolio has a beta of 1 by definition."] },
{ type:"concept", topic:"CAPM", stem:"According to the CAPM, only systematic risk affects the expected return of an individual stock.", choices:["True","False"], answer:0, how:["Only non-diversifiable (systematic) risk is priced; unsystematic risk is not rewarded."] },
{ type:"concept", topic:"CAPM", stem:"Which of the following is NOT an implication of the capital asset pricing model (CAPM)?", choices:["Investors will hold the market portfolio.","The expected return of a stock depends on the stock’s beta.","The expected return of a stock depends on the size of the market risk premium.","All the choices above are implications of the CAPM."], answer:3, how:["All three statements are implications of the CAPM."] },
{ type:"concept", topic:"CAPM", stem:"Which of the following is an implication of the capital asset pricing model (CAPM)?", choices:["Investors will hold a small number of individual stocks.","The expected return of a stock depends on the stock’s beta.","The expected return of a stock is independent of market-wide price movements.","None of the choices are implications of the CAPM."], answer:1, how:["Under CAPM, expected return = Rf + beta × market risk premium."] }
];;

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
    const sc = score();
    if (sc.done >= sc.total && sc.total > 0 && !state.missed && state.filter === "all") {
      return `<p class="kicker">Objective assessment</p><h1>Set complete</h1><div class="goldline"></div>
        <div class="card">
          <p>You answered all ${sc.total} questions. Score: <strong>${sc.right} / ${sc.total}</strong> (${Math.round(sc.right/sc.total*100)}%).</p>
          <p class="small">Tap below to clear your answers and start a fresh pass.</p>
          <button class="primary" style="margin-top:12px;width:100%" onclick="resetProgress()">Start over</button>
        </div>`;
    }
    const i = Math.min(state.i, list.length-1);
    const q = list[i];
    const picked = state.picks[q.idx];
    const open = !!state.revealed[q.idx];
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
        <button class="chip" onclick="resetProgress()">Reset</button>
      </div>
      <div class="card">
        <span class="badge">${q.type==="calc"?"Calculation":"Concept"} · ${q.topic}</span>
        <p class="small" style="margin-top:8px">Question ${i+1} of ${list.length}</p>
        <h2>${q.stem}</h2>
        ${choices}${how}
        ${excelPanel()}
        <div class="row" style="margin-top:12px">
          <button class="ghost" style="flex:1" onclick="step(-1)">Back</button>
          <button class="primary" style="flex:1" onclick="step(1)">${open?"Next":"Next (unanswered)"}</button>
        </div>
      </div>`;
  }
};

function excelPanel(){
  const fn = state.excelFn || "fv";
  const open = state.excelOpen ? " open" : "";
  const chips = ["fv","pv","pmt","rate","npv","irr"].map(id =>
    `<button class="chip ${fn===id?"on":""}" onclick="setExcelFn('${id}')">${id.toUpperCase()}</button>`
  ).join("");
  return `<details class="card" style="margin-top:10px"${open}>
    <summary style="cursor:pointer;font-weight:600;color:var(--gold2)" onclick="state.excelOpen=true;save()">Excel calculator (tap to use while answering)</summary>
    <div style="margin-top:10px">
      <div class="tabs" id="fn-tabs" style="margin-bottom:8px">${chips}</div>
      <div id="excel-inputs">${excelInputs()}</div>
      <button class="primary" style="margin-top:10px" onclick="runExcel()">Calculate</button>
      <div id="excel-out"></div>
    </div>
  </details>`;
}
function setExcelFn(fn){
  state.excelFn = fn;
  state.excelOpen = true;
  save();
  const box = document.getElementById("excel-inputs");
  if (box) {
    box.innerHTML = excelInputs();
    document.querySelectorAll("#fn-tabs .chip").forEach(b => {
      b.classList.toggle("on", b.textContent.toLowerCase() === fn);
    });
    const det = box.closest("details");
    if (det) det.open = true;
  } else {
    render();
  }
}
function runExcel(){
  const fn=state.excelFn||"fv";
  const out=document.getElementById("excel-out");
  try{
    let res="";
    if(fn==="fv"){
      const rate=num("er"), nper=num("en"), pmt=num("ep"), pv=num("epv")||0;
      res=money(FV(rate,nper,pmt,pv));
    }else if(fn==="pv"){
      const rate=num("er"), nper=num("en"), pmt=num("ep"), fv=num("efv")||0;
      res=money(PV(rate,nper,pmt,fv));
    }else if(fn==="pmt"){
      const rate=num("er"), nper=num("en"), pv=num("epv"), fv=num("efv")||0;
      res=money(PMT(rate,nper,pv,fv));
    }else if(fn==="rate"){
      const nper=num("en"), pmt=num("ep"), pv=num("epv"), fv=num("efv")||0;
      res=pct(RATE(nper,pmt,pv,fv));
    }else if(fn==="npv"){
      const rate=num("er"), cfs=(document.getElementById("ecfs").value||"").split(",").map(s=>Number(s.trim())).filter(n=>!isNaN(n));
      const init=num("einit")||0;
      res=money(NPV(rate,cfs)+init);
    }else if(fn==="irr"){
      const cfs=(document.getElementById("ecfs").value||"").split(",").map(s=>Number(s.trim())).filter(n=>!isNaN(n));
      res=pct(IRR(cfs));
    }
    out.innerHTML=`<div class="out"><strong>${res}</strong></div>`;
  }catch(e){ out.innerHTML=`<div class="out" style="background:#2A1816;border-color:#6B3A34">Check inputs. ${e.message||""}</div>`; }
}
function FV(rate,nper,pmt,pv){ return -pv*Math.pow(1+rate,nper) - pmt*((Math.pow(1+rate,nper)-1)/rate); }
function PV(rate,nper,pmt,fv){ return -pmt*(1-Math.pow(1+rate,-nper))/rate - fv/Math.pow(1+rate,nper); }
function PMT(rate,nper,pv,fv){ return rate*(pv*Math.pow(1+rate,nper)+fv)/(Math.pow(1+rate,nper)-1)*-1; }
function RATE(nper,pmt,pv,fv){
  let r=0.1;
  for(let i=0;i<40;i++){
    const f=pv*Math.pow(1+r,nper)+pmt*(Math.pow(1+r,nper)-1)/r+fv;
    const df=nper*pv*Math.pow(1+r,nper-1)+pmt*((nper*r*Math.pow(1+r,nper-1)-(Math.pow(1+r,nper)-1))/(r*r));
    r-=f/df;
  }
  return r;
}
function NPV(rate,cfs){ return cfs.reduce((s,cf,i)=>s+cf/Math.pow(1+rate,i+1),0); }
function IRR(cfs){
  let r=0.1;
  for(let i=0;i<50;i++){
    let npv=0,d=0;
    for(let t=0;t<cfs.length;t++){ npv+=cfs[t]/Math.pow(1+r,t); d-=t*cfs[t]/Math.pow(1+r,t+1); }
    r-=npv/d;
  }
  return r;
}
function excelInputs(){
  const fn=state.excelFn||"fv";
  if(fn==="fv") return `<label>Rate (decimal)</label><input id="er" value="0.08"><label>Nper</label><input id="en" value="10"><label>Pmt (use negative if you pay)</label><input id="ep" value="-100"><label>PV (use negative if you invest)</label><input id="epv" value="-1000">`;
  if(fn==="pv") return `<label>Rate</label><input id="er" value="0.08"><label>Nper</label><input id="en" value="10"><label>Pmt</label><input id="ep" value="60"><label>FV</label><input id="efv" value="1000">`;
  if(fn==="pmt") return `<label>Rate</label><input id="er" value="0.06/12"><label>Nper</label><input id="en" value="360"><label>PV</label><input id="epv" value="200000"><label>FV</label><input id="efv" value="0">`;
  if(fn==="rate") return `<label>Nper</label><input id="en" value="10"><label>Pmt</label><input id="ep" value="-100"><label>PV</label><input id="epv" value="1000"><label>FV</label><input id="efv" value="0">`;
  if(fn==="npv") return `<label>Rate</label><input id="er" value="0.10"><label>Initial outlay (negative)</label><input id="einit" value="-1000"><label>Future cash flows (comma-separated, period 1 onward)</label><input id="ecfs" value="300,400,500">`;
  if(fn==="irr") return `<label>Cash flows including year 0 (comma-separated)</label><input id="ecfs" value="-1000,300,400,500">`;
  return "";
}
function pick(idx,n){ if(state.revealed[idx])return; state.picks[idx]=n; state.revealed[idx]=true; save(); render(); }
function resetProgress(){
  state.picks = {};
  state.revealed = {};
  state.i = 0;
  state.missed = false;
  save();
  render();
}
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
  if(!state.excelFn) state.excelFn="fv";
  document.getElementById("app").innerHTML=views[state.tab]();
  document.getElementById("nav").innerHTML=[["chapters","Chapters"],["excel","Excel"],["calc","Calc"],["oa","OA"]].map(([id,label])=>`<button class="${state.tab===id?"on":""}" onclick="state.tab='${id}';save();render()"><b>${label[0]}</b>${label}</button>`).join("");
  if(state.tab==="oa"){
    const box=document.getElementById("excel-inputs");
    if(box) box.innerHTML=excelInputs();
  }
}
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
render();
