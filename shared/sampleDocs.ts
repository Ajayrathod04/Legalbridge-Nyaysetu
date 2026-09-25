export interface SampleDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  v2Content?: string;
}

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: 'sample-employment-v1',
    title: 'Standard Employment Agreement (v1)',
    description: 'Full-time senior software engineer contract with IP assignment, notice period, and non-compete clauses.',
    category: 'Employment',
    content: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is made effective as of October 1, 2026, by and between Nexus Tech Solutions Pvt. Ltd. ("Employer") and Rohan Sharma ("Employee").

1. POSITION AND DUTIES
1.1 The Employee is hired as a Senior Software Engineer.
1.2 The Employee shall devote full professional time and effort to the business of the Employer.

2. COMPENSATION AND BENEFITS
2.1 Annual CTC: The Employer shall pay the Employee a base salary of INR 18,000,000 per annum, payable in monthly installments.
2.2 Performance Bonus: Eligible for an annual performance bonus of up to 15% based on company and individual key performance indicators.
2.3 Health Insurance: Comprehensive medical insurance coverage up to INR 500,000 for Employee and direct dependents.

3. TERM AND TERMINATION
3.1 Notice Period: Either party may terminate this Agreement by providing sixty (60) days written notice to the other party.
3.2 Immediate Termination: The Employer reserves the right to terminate employment immediately without notice in cases of gross misconduct, breach of confidentiality, or criminal activity.
3.3 Buyout Option: In lieu of notice, the Employer may elect to pay salary for the notice period.

4. CONFIDENTIALITY AND PROPRIETARY INFORMATION
4.1 The Employee agrees to maintain strict confidentiality of all proprietary source code, client lists, trade secrets, and operational algorithms during and after employment.
4.2 Non-Disclosure: The obligation of non-disclosure shall survive for a period of three (3) years following termination of employment.

5. INTELLECTUAL PROPERTY RIGHTS
5.1 Work for Hire: All inventions, code, designs, and patentable works created by the Employee during the term of employment using company resources shall remain the sole and exclusive property of the Employer.

6. RESTRICTIVE COVENANTS & NON-COMPETE
6.1 Non-Compete: During employment and for twelve (12) months thereafter, the Employee shall not work for any direct competitor operating in the AI automation domain within India.
6.2 Non-Solicitation: For eighteen (18) months following termination, Employee shall not solicit existing clients or recruit current employees of the Employer.

7. GOVERNING LAW AND DISPUTE RESOLUTION
7.1 Governing Law: This Agreement shall be governed by and construed in accordance with the laws of India.
7.2 Dispute Resolution: Any disputes arising out of this Agreement shall be resolved through binding arbitration in Bengaluru under the Arbitration and Conciliation Act, 1996.`,
    v2Content: `EMPLOYMENT AGREEMENT (AMENDED VERSION)

This Employment Agreement ("Agreement") is made effective as of November 1, 2026, by and between Nexus Tech Solutions Pvt. Ltd. ("Employer") and Rohan Sharma ("Employee").

1. POSITION AND DUTIES
1.1 The Employee is hired as a Lead Software Architect.
1.2 The Employee shall devote full professional time and effort to the business of the Employer.

2. COMPENSATION AND BENEFITS
2.1 Annual CTC: The Employer shall pay the Employee a base salary of INR 22,000,000 per annum, payable in monthly installments.
2.2 Performance Bonus: Eligible for an annual performance bonus of up to 20% based on company and individual key performance indicators.
2.3 Health Insurance: Comprehensive medical insurance coverage up to INR 1,000,000 for Employee and direct dependents.

3. TERM AND TERMINATION
3.1 Notice Period: Either party may terminate this Agreement by providing ninety (90) days written notice to the other party.
3.2 Immediate Termination: The Employer reserves the right to terminate employment immediately without notice in cases of gross misconduct, breach of confidentiality, or criminal activity.
3.3 Buyout Option: In lieu of notice, the Employer may elect to pay salary for the notice period.
3.4 Clawback Clause: If Employee resigns within twelve (12) months of joining, joining bonus of INR 300,000 must be repaid in full.

4. CONFIDENTIALITY AND PROPRIETARY INFORMATION
4.1 The Employee agrees to maintain strict confidentiality of all proprietary source code, client lists, trade secrets, and operational algorithms during and after employment.
4.2 Non-Disclosure: The obligation of non-disclosure shall survive indefinitely following termination of employment.

5. INTELLECTUAL PROPERTY RIGHTS
5.1 Work for Hire: All inventions, code, designs, and patentable works created by the Employee during the term of employment using company resources shall remain the sole and exclusive property of the Employer.

6. RESTRICTIVE COVENANTS & NON-COMPETE
6.1 Non-Compete: During employment and for six (6) months thereafter, the Employee shall not work for any direct competitor operating in the AI automation domain within South Asia.
6.2 Non-Solicitation: For twelve (12) months following termination, Employee shall not solicit existing clients or recruit current employees of the Employer.

7. GOVERNING LAW AND DISPUTE RESOLUTION
7.1 Governing Law: This Agreement shall be governed by and construed in accordance with the laws of India.
7.2 Dispute Resolution: Any disputes arising out of this Agreement shall be resolved through binding arbitration in Bengaluru under the Arbitration and Conciliation Act, 1996.`
  },
  {
    id: 'sample-residential-lease',
    title: 'Residential Lease Agreement',
    description: '11-month apartment rental agreement detailing security deposit, lock-in period, and maintenance terms.',
    category: 'Tenancy',
    content: `RESIDENTIAL LEASE AGREEMENT

This Lease Agreement is entered into on October 1, 2026, by and between Mr. Suresh Kumar ("Landlord") and Ms. Ananya Verma ("Tenant").

1. PREMISES AND LEASE TERM
1.1 Premises: Apartment 402, Green Valley Heights, Sector 62, Noida, UP.
1.2 Term: The lease shall be for a duration of eleven (11) months, starting October 1, 2026 to August 31, 2027.
1.3 Lock-In Period: Both Landlord and Tenant agree to a strict six (6) month lock-in period during which neither party may terminate the lease.

2. RENT AND SECURITY DEPOSIT
2.1 Monthly Rent: Tenant shall pay INR 35,000 per month, due on or before the 5th day of each calendar month.
2.2 Security Deposit: Tenant has deposited INR 105,000 (3 months rent) as refundable security deposit.
2.3 Deposit Refund: Landlord shall refund the security deposit within 30 days of vacation, subject to deductions for unpaid utilities or structural damage beyond normal wear and tear.

3. MAINTENANCE AND UTILITIES
3.1 Electricity & Water: Tenant shall pay electricity and water bills directly to relevant municipal authorities based on actual meter consumption.
3.2 Maintenance Charges: Society monthly maintenance fees of INR 3,500 shall be borne by the Tenant.
3.3 Repairs: Minor repairs under INR 1,000 shall be paid by Tenant. Structural repairs or plumbing issues exceeding INR 1,000 shall be repaired by Landlord.

4. TERMINATION AND NOTICE
4.1 Notice Period: After the 6-month lock-in period, either party may terminate the agreement by serving one (1) month written notice.
4.2 Early Vacation Penalty: If Tenant vacates prior to the 6-month lock-in period, the entire security deposit of INR 105,000 shall be forfeited.

5. RESTRICTIONS
5.1 Subletting: Tenant shall not sublet, assign, or transfer the lease premises to any third party without express written consent.
5.2 Alterations: No structural modifications, painting, or heavy drilling without prior written approval of the Landlord.`
  },
  {
    id: 'sample-freelance-contract',
    title: 'Independent Contractor Services Agreement',
    description: 'Freelance software development & consulting agreement with milestone payments and IP transfer upon full payment.',
    category: 'Freelance / Consulting',
    content: `INDEPENDENT CONTRACTOR SERVICES AGREEMENT

This Services Agreement is executed on October 5, 2026, by Apex Digital Labs LLC ("Client") and Vikram Rao ("Contractor").

1. SCOPE OF SERVICES
1.1 Contractor agrees to design and build a custom full-stack web application dashboard as described in Exhibit A.
1.2 Timeline: Project execution shall complete within eight (8) weeks from receipt of initial deposit.

2. PAYMENT TERMS
2.1 Total Fee: Total contract value is INR 400,000.
2.2 Payment Milestones:
    - Milestone 1: 30% advance deposit upon signing (INR 120,000).
    - Milestone 2: 40% upon frontend UI completion and demo (INR 160,000).
    - Milestone 3: 30% upon final delivery and acceptance testing (INR 120,000).
2.3 Late Payment Penalty: Overdue invoices shall accrue interest at 1.5% per month until paid in full.

3. INTELLECTUAL PROPERTY OWNERSHIP
3.1 Ownership Transfer: Full copyright and intellectual property rights in the deliverables shall transfer to Client ONLY UPON RECEIPT OF FINAL PAYMENT.
3.2 Background IP: Contractor retains sole ownership of pre-existing software tools, libraries, and code templates.

4. TERMINATION
4.1 Termination for Convenience: Either party may terminate with 14 days written notice.
4.2 Compensation on Termination: Upon early termination by Client, Contractor shall be paid pro-rata for all work completed up to the date of termination.

5. LIMITATION OF LIABILITY
5.1 Total aggregate liability of Contractor under this Agreement shall not exceed the total fees paid by Client to Contractor in the preceding three (3) months.`
  }
];
