/**
 * Mock responses for dev mode
 * These simulate OpenAI API responses without making actual API calls
 */

/**
 * Generates a mock fraud analysis response
 * Provides varied responses based on text content
 */
export function generateMockFraudAnalysis(text) {
    // Basic analysis of the text to provide varied mock responses
    const lowerText = text.toLowerCase();

    const suspiciousTerms = [];
    const invalidGstValues = [];
    const duplicateEntries = [];
    const overpricingAmounts = [];
    let severityScore = 0;

    // Check for suspicious fee terms
    const suspiciousWords = [
        'service fee', 'documentation fee', 'handling charges',
        'processing fee', 'administrative fee', 'miscellaneous',
        'convenience charge', 'environmental fee'
    ];

    suspiciousWords.forEach(term => {
        if (lowerText.includes(term)) {
            suspiciousTerms.push(term);
            severityScore += 30;
        }
    });

    // Check for GST/tax mentions
    const gstMatch = lowerText.match(/(\d+)%?\s*gst/i);
    if (gstMatch) {
        const gstRate = parseInt(gstMatch[1]);
        if (gstRate > 18) {
            invalidGstValues.push(`${gstRate}% GST (exceeds standard 18%)`);
            severityScore += 25;
        }
    }

    // Check for duplicate mentions
    if (lowerText.match(/duplicate|repeated|again|twice/)) {
        duplicateEntries.push('Potential duplicate charge detected in text');
        severityScore += 20;
    }

    // Check for overpricing keywords
    if (lowerText.match(/overcharge|excessive|inflated|too high/)) {
        overpricingAmounts.push(100); // Mock amount
        severityScore += 25;
    }

    // Cap severity score at 100
    severityScore = Math.min(severityScore, 100);

    const fraudDetected = severityScore >= 40;

    let reasoning;
    if (fraudDetected) {
        reasoning = `Analysis indicates potential fraud with severity score of ${severityScore}. ` +
            `Detected ${suspiciousTerms.length} suspicious terms, ` +
            `${invalidGstValues.length} invalid GST values, and ` +
            `${duplicateEntries.length} duplicate entries.`;
    } else {
        reasoning = 'No significant fraud indicators found. The invoice appears to be within normal parameters.';
    }

    const response = {
        fraud_detected: fraudDetected,
        severity_score: severityScore,
        suspicious_terms: suspiciousTerms,
        invalid_gst_values: invalidGstValues,
        duplicate_entries: duplicateEntries,
        overpricing_amounts: overpricingAmounts,
        reasoning: reasoning
    };

    return JSON.stringify(response);
}

/**
 * Generates a mock letter generation response
 * Provides explanation and dispute letter based on fraud report
 */
export function generateMockLetter({ originalText, fraudReport, hybridSummary }) {
    const explanation = [];
    let disputeLetter = '';

    // Parse fraud report if it's a string
    let fraudData;
    try {
        fraudData = typeof fraudReport === 'string' ? JSON.parse(fraudReport) : fraudReport;
    } catch (e) {
        fraudData = {
            fraud_detected: false,
            severity_score: 0,
            suspicious_terms: [],
            invalid_gst_values: [],
            duplicate_entries: [],
            overpricing_amounts: []
        };
    }

    // Generate explanation points based on fraud data
    if (fraudData.suspicious_terms && fraudData.suspicious_terms.length > 0) {
        explanation.push(`The invoice contains ${fraudData.suspicious_terms.length} suspicious fee terms that may indicate overcharging.`);
    }

    if (fraudData.invalid_gst_values && fraudData.invalid_gst_values.length > 0) {
        explanation.push('GST/tax rates exceed the standard 18% threshold, which requires verification.');
    }

    if (fraudData.duplicate_entries && fraudData.duplicate_entries.length > 0) {
        explanation.push('Potential duplicate charges were identified that may result in double billing.');
    }

    if (fraudData.overpricing_amounts && fraudData.overpricing_amounts.length > 0) {
        explanation.push('Some fees appear disproportionately high compared to the base charges.');
    }

    if (explanation.length === 0) {
        explanation.push('The invoice appears legitimate with no major red flags.');
        explanation.push('However, it\'s always good practice to verify all charges against your agreement.');
    }

    // Generate dispute letter
    if (fraudData.fraud_detected) {
        disputeLetter = `To Whom It May Concern,

I am writing to formally dispute certain charges on invoice that I received recently. After careful review, I have identified several concerns that require clarification:

${fraudData.suspicious_terms.length > 0 ? `• Multiple suspicious or unclear fees have been charged, including: ${fraudData.suspicious_terms.join(', ')}.` : ''}
${fraudData.invalid_gst_values.length > 0 ? `• The GST/tax rates appear to exceed standard rates: ${fraudData.invalid_gst_values.join(', ')}.` : ''}
${fraudData.duplicate_entries.length > 0 ? `• There appear to be duplicate charges on the invoice.` : ''}
${fraudData.overpricing_amounts.length > 0 ? `• Certain fees appear disproportionately high compared to the base service charges.` : ''}

I kindly request:
1. A detailed breakdown and justification for each charge mentioned above
2. A corrected invoice reflecting only legitimate and agreed-upon charges
3. A refund for any overcharges or unauthorized fees

I would appreciate your prompt attention to this matter. Please contact me at your earliest convenience to resolve these discrepancies.

Thank you for your understanding and cooperation.

Sincerely,
[Your Name]
[Your Contact Information]`;
    } else {
        disputeLetter = `To Whom It May Concern,

I am writing regarding the invoice I recently received. While reviewing the charges, I noticed a few items that I would like to clarify to ensure accuracy.

Could you please provide:
1. A detailed breakdown of all fees and charges
2. Confirmation that all charges align with our agreement
3. Clarification on any fees that were not explicitly discussed

I believe this is likely a simple matter of verification, but I want to ensure that everything is correct before processing payment.

Thank you for your time and assistance. I look forward to your response.

Sincerely,
[Your Name]
[Your Contact Information]`;
    }

    return {
        explanation,
        disputeLetter
    };
}
