export function calculateValuation({budget, ltv, cac, runway, investorFunding, bonusPoints}) {
    if (!investorFunding) {
        investorFunding = 0
    }
    
    if (!bonusPoints) {
        bonusPoints = 0
    }
    
    const valuation = (budget*200) + ((ltv/cac)*100) + (runway*50) + (investorFunding*250) + bonusPoints
    return valuation
}