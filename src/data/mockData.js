export const mockCompanies = [
  {
    id: 1,
    name: "TechCorp Security",
    description: "Leading technology company focused on secure software development",
    industry: "Technology",
    website: "https://techcorp.com",
    bugReportsCount: 12,
    isActive: true,
    createdAt: "2024-01-15",
    bugReportTemplate: {
      title: "Brief description of the vulnerability",
      description: "Detailed description of the vulnerability...",
      severity: "medium",
      stepsToReproduce: "1. Go to...\n2. Click on...\n3. Observe...",
      expectedBehavior: "Expected: What should happen\nActual: What actually happens",
      additionalInfo: "Any additional context, screenshots, or information..."
    }
  },
  {
    id: 2,
    name: "StartupXYZ",
    description: "Innovative startup building the next generation of mobile applications",
    industry: "Technology",
    website: "https://startupxyz.com",
    bugReportsCount: 8,
    isActive: true,
    createdAt: "2024-02-01",
    bugReportTemplate: {
      title: "Brief description of the vulnerability",
      description: "Detailed description of the vulnerability...",
      severity: "medium",
      stepsToReproduce: "1. Go to...\n2. Click on...\n3. Observe...",
      expectedBehavior: "Expected: What should happen\nActual: What actually happens",
      additionalInfo: "Any additional context, screenshots, or information..."
    }
  },
  {
    id: 3,
    name: "FinanceFlow",
    description: "Financial services platform for small and medium businesses",
    industry: "Finance",
    website: "https://financeflow.com",
    bugReportsCount: 5,
    isActive: true,
    createdAt: "2024-01-20",
    bugReportTemplate: {
      title: "Brief description of the vulnerability",
      description: "Detailed description of the vulnerability...",
      severity: "medium",
      stepsToReproduce: "1. Go to...\n2. Click on...\n3. Observe...",
      expectedBehavior: "Expected: What should happen\nActual: What actually happens",
      additionalInfo: "Any additional context, screenshots, or information..."
    }
  }
];

export const mockBugReports = [
  {
    id: 1,
    title: "Authentication Bypass Found",
    companyId: 1,
    companyName: "TechCorp Security",
    description: "Discovered a critical authentication bypass that allows unauthorized access to admin panel.",
    severity: "high",
    status: "pending",
    submittedAt: "2024-01-28",
    attachments: ["screenshot1.png", "proof_of_concept.txt"]
  },
  {
    id: 2,
    title: "SQL Injection in Search",
    companyId: 2,
    companyName: "StartupXYZ",
    description: "Found SQL injection vulnerability in the search functionality that can be exploited to extract user data.",
    severity: "medium",
    status: "under_review",
    submittedAt: "2024-01-30",
    attachments: ["exploit_script.sql"]
  },
  {
    id: 3,
    title: "XSS in Contact Form",
    companyId: 3,
    companyName: "FinanceFlow",
    description: "Stored XSS vulnerability in the contact form that persists in the database.",
    severity: "low",
    status: "accepted",
    submittedAt: "2024-02-01",
    attachments: ["xss_payload.html"]
  }
];
