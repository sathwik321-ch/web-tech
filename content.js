// Program data for all sections
const programData = {
    // Incubators
    "t-hub": {
        name: "T-Hub",
        description: "India's largest startup incubator based in Hyderabad, offering comprehensive support for startups. T-Hub has incubated over 2000 startups with a success rate of 75%. Their startups have collectively raised over ₹2000 Crores in funding and created 10,000+ jobs.",
        funding: "₹50 Lakhs",
        equity: "5%",
        contact: {
            email: "startups@t-hub.co",
            phone: "+91 40 4567 8000",
            website: "https://t-hub.co",
            address: "T-Hub Phase 2, IIT-H Campus, Hyderabad, Telangana 500084"
        },
        agenda: [
            "12-month intensive incubation program with personalized mentoring",
            "Access to state-of-the-art labs and prototyping facilities",
            "Dedicated sector-specific mentors from industry and academia",
            "Corporate innovation programs with leading companies",
            "International market access through global partnerships",
            "IP protection and patent filing support",
            "Product development and testing facilities",
            "Customer acquisition and go-to-market strategy support",
            "Regular masterclasses by industry experts",
            "Demo days with national and international investors"
        ],
        eligibility: [
            "Technology startups with innovative solutions",
            "Strong founding team with technical expertise",
            "MVP ready or in advanced development stage",
            "Clear market opportunity and growth potential",
            "Registered company with proper documentation",
            "Commitment to full-time participation",
            "Scalable business model with revenue potential",
            "Willingness to be based in Hyderabad",
            "No external funding above ₹2 Crores",
            "Less than 3 years since incorporation"
        ],
        process: [
            "Online application with detailed business plan",
            "Initial screening by sector experts",
            "Virtual pitch to selection committee",
            "Due diligence and team interviews",
            "Final selection and onboarding",
            "Milestone-based program execution",
            "Quarterly reviews and progress tracking",
            "Investor connect and networking sessions",
            "Demo day preparation and presentation",
            "Graduation and alumni network integration"
        ],
        benefits: [
            "Seed funding up to ₹50 Lakhs with flexible terms",
            "Free co-working space for 12 months",
            "Access to T-Hub's partner network of 400+ companies",
            "Cloud credits worth ₹25 Lakhs from partners",
            "Legal and compliance support worth ₹5 Lakhs",
            "Marketing and PR support worth ₹10 Lakhs",
            "Technology stack and tools worth ₹15 Lakhs",
            "Customer connect programs with corporates",
            "International market access support",
            "Post-program support and alumni benefits"
        ],
        image: "images/t-hub.jpg"
    },
    "cii": {
        name: "CIIE.CO",
        description: "IIM Ahmedabad's premier incubation center focusing on deep-tech startups. CIIE has supported over 1000 startups with a success rate of 70%. Their portfolio companies have raised over ₹1500 Crores and created 8,000+ jobs across India.",
        funding: "₹25 Lakhs",
        equity: "4%",
        contact: {
            email: "apply@ciie.co",
            phone: "+91 79 6632 4000",
            website: "https://ciie.co",
            address: "CIIE, New IIM Campus, Vastrapur, Ahmedabad, Gujarat 380015"
        },
        agenda: [
            "9-month structured incubation program",
            "Sector-specific mentoring from IIM faculty",
            "Research collaboration with IIM departments",
            "Corporate partnerships for pilot projects",
            "Global exposure through exchange programs",
            "Innovation labs and testing facilities",
            "Market research and validation support",
            "Business strategy development workshops",
            "Financial modeling and planning support",
            "Investor readiness and pitch training"
        ],
        eligibility: [
            "Deep-tech startups in priority sectors",
            "Strong technical founding team",
            "Working prototype or validated MVP",
            "Clear IP strategy and potential",
            "Registered entity with proper structure",
            "Full-time commitment from founders",
            "Market validation with early users",
            "Scalable technology solution",
            "No external funding above ₹1 Crore",
            "Less than 2 years since incorporation"
        ],
        process: [
            "Detailed online application submission",
            "Technical evaluation by expert panel",
            "Business model validation round",
            "Team assessment and interviews",
            "Final pitch to selection committee",
            "Program onboarding and orientation",
            "Monthly milestone tracking",
            "Quarterly board presentations",
            "Investor showcase preparation",
            "Graduation and portfolio inclusion"
        ],
        benefits: [
            "Initial funding of ₹25 Lakhs for 4% equity",
            "Follow-on funding access up to ₹2 Crores",
            "Free office space at IIM Ahmedabad",
            "Access to IIM's research resources",
            "Technology commercialization support",
            "Patent filing assistance worth ₹3 Lakhs",
            "Cloud credits worth ₹20 Lakhs",
            "Legal and compliance support",
            "Marketing and branding assistance",
            "Alumni network access and benefits"
        ],
        image: "images/ciie.jpg"
    },
    "nsrcel": {
        name: "NSRCEL",
        description: "IIM Bangalore's innovation and entrepreneurship center supporting both social and commercial ventures. NSRCEL has nurtured over 1200 startups with a focus on sustainable development. Their startups have impacted over 1 million lives and raised ₹800 Crores in funding.",
        funding: "₹30 Lakhs",
        equity: "6%",
        contact: {
            email: "connect@nsrcel.org",
            phone: "+91 80 2699 3401",
            website: "https://nsrcel.org",
            address: "NSRCEL, IIM Bangalore, Bannerghatta Road, Bengaluru, Karnataka 560076"
        },
        agenda: [
            "8-month comprehensive incubation program",
            "Dual focus on social impact and sustainability",
            "Customized mentoring from industry experts",
            "Impact measurement framework development",
            "Sustainable business model workshops",
            "Technology integration support",
            "Market access and scaling strategies",
            "Social impact assessment training",
            "Stakeholder engagement programs",
            "Investment readiness preparation"
        ],
        eligibility: [
            "Social enterprises with innovative solutions",
            "Balanced team with diverse expertise",
            "Demonstrated social impact potential",
            "Sustainable revenue model",
            "Registered as for-profit/non-profit",
            "Full-time dedicated founding team",
            "Early validation with beneficiaries",
            "Scalable and replicable model",
            "No funding above ₹50 Lakhs",
            "Less than 3 years of operations"
        ],
        process: [
            "Comprehensive application with impact plan",
            "Social impact evaluation round",
            "Business sustainability assessment",
            "Founder interviews and background check",
            "Final selection presentation",
            "Program orientation and goal setting",
            "Impact tracking and reporting",
            "Regular mentor interactions",
            "Investor connect sessions",
            "Demo day and showcase"
        ],
        benefits: [
            "Seed funding of ₹30 Lakhs for 6% equity",
            "Impact investment access up to ₹1 Crore",
            "Workspace at IIM Bangalore campus",
            "Social impact measurement tools",
            "Technology and digital transformation support",
            "Legal and regulatory compliance guidance",
            "Marketing and communication strategy",
            "Network of social impact investors",
            "Corporate partnership opportunities",
            "Continued alumni support and resources"
        ],
        image: "images/nsrcel.jpg"
    },
    
    // Accelerators
    "venture": {
        name: "Venture Catalysts",
        description: "India's leading integrated incubator and accelerator platform. Venture Catalysts has invested in over 200 startups with a portfolio value of ₹10,000 Crores. Their startups have created over 15,000 jobs and expanded to 20+ countries.",
        funding: "₹1 Crore",
        equity: "8%",
        contact: {
            email: "startups@venturecatalysts.in",
            phone: "+91 22 4005 2000",
            website: "https://venturecatalysts.in",
            address: "Venture Catalysts HQ, Lower Parel, Mumbai, Maharashtra 400013"
        },
        agenda: [
            "4-month intensive acceleration program",
            "Personalized growth strategy development",
            "Sales and marketing acceleration support",
            "Technology stack optimization",
            "Team building and leadership training",
            "Financial modeling and fundraising prep",
            "Global expansion strategy planning",
            "Product-market fit optimization",
            "Customer acquisition strategy",
            "Investor readiness preparation"
        ],
        eligibility: [
            "Post-revenue startups with proven traction",
            "Monthly revenue above ₹10 Lakhs",
            "Strong founding team with execution track record",
            "Scalable technology platform",
            "Clear competitive advantage",
            "Market size > ₹1000 Crores",
            "Potential for 10x growth in 2 years",
            "Previous funding up to Series A",
            "Operating in high-growth sectors",
            "Registered company with proper structure"
        ],
        process: [
            "Online application submission",
            "Initial screening by investment team",
            "Due diligence and market analysis",
            "Founder background verification",
            "Term sheet negotiation",
            "Program onboarding",
            "Weekly progress tracking",
            "Monthly board meetings",
            "Investor presentations",
            "Demo day preparation"
        ],
        benefits: [
            "Funding up to ₹1 Crore with smart terms",
            "Follow-on funding up to ₹10 Crores",
            "Access to 300+ angel investors",
            "Strategic partnerships with corporates",
            "Global expansion support",
            "Technology infrastructure worth ₹50 Lakhs",
            "Marketing support worth ₹25 Lakhs",
            "Legal and compliance assistance",
            "HR and recruitment support",
            "Post-program funding access"
        ],
        image: "images/venture-catalysts.jpg"
    },
    "xto10x": {
        name: "xto10x",
        description: "Premium accelerator founded by successful startup founders, focusing on scaling technology startups. xto10x has helped over 100 startups achieve 10x growth, with their portfolio companies valued at over ₹20,000 Crores collectively.",
        funding: "₹75 Lakhs",
        equity: "7%",
        contact: {
            email: "scale@xto10x.com",
            phone: "+91 80 4123 5000",
            website: "https://xto10x.com",
            address: "xto10x Technologies, Koramangala, Bangalore, Karnataka 560034"
        },
        agenda: [
            "6-month scaling program",
            "Growth metrics optimization",
            "Tech architecture scaling",
            "Data-driven decision making",
            "Leadership team building",
            "Operational excellence training",
            "Unit economics optimization",
            "International expansion planning",
            "Strategic partnerships development",
            "Investment readiness preparation"
        ],
        eligibility: [
            "Technology startups with PMF",
            "Monthly revenue > ₹25 Lakhs",
            "High growth rate (>20% MoM)",
            "Strong tech architecture",
            "Scalable business model",
            "Market size > ₹5000 Crores",
            "Potential for global expansion",
            "Previous funding up to ₹10 Crores",
            "Full-time founding team",
            "Clear competitive moat"
        ],
        process: [
            "Detailed application review",
            "Technical architecture assessment",
            "Growth metrics evaluation",
            "Team capability analysis",
            "Final selection round",
            "Program customization",
            "Weekly KPI tracking",
            "Monthly strategy reviews",
            "Investor networking",
            "Graduation and showcase"
        ],
        benefits: [
            "Strategic funding of ₹75 Lakhs",
            "Technology scaling support",
            "Access to founder network",
            "Enterprise client connects",
            "International market entry",
            "Cloud credits worth ₹1 Crore",
            "Leadership hiring support",
            "Strategic advisory board",
            "Industry partnerships",
            "Future funding support"
        ],
        image: "images/xto10x.jpg"
    },
    "startup": {
        name: "Startup Oasis",
        description: "Sector-agnostic accelerator focusing on startups from Tier 2 and 3 cities. Startup Oasis has accelerated over 150 startups with a 70% success rate. Their portfolio companies have raised over ₹300 Crores in follow-on funding.",
        funding: "₹50 Lakhs",
        equity: "10%",
        contact: {
            email: "accelerate@startupoasis.in",
            phone: "+91 141 400 8000",
            website: "https://startupoasis.in",
            address: "Startup Oasis, CIIE Building, Jaipur, Rajasthan 302017"
        },
        agenda: [
            "5-month acceleration program",
            "Local market penetration strategy",
            "Resource optimization training",
            "Business model refinement",
            "Team scaling support",
            "Financial planning assistance",
            "Marketing strategy development",
            "Technology adoption guidance",
            "Customer acquisition planning",
            "Investor network access"
        ],
        eligibility: [
            "Startups from Tier 2/3 cities",
            "Minimum viable product ready",
            "Early revenue generation",
            "Local market understanding",
            "Full-time founding team",
            "Scalable business model",
            "Technology integration potential",
            "Previous funding up to ₹25 Lakhs",
            "Clear growth metrics",
            "Strong community connect"
        ],
        process: [
            "Application with local focus",
            "Initial screening round",
            "Local market validation",
            "Team assessment phase",
            "Final pitch presentation",
            "Program orientation",
            "Bi-weekly reviews",
            "Local network building",
            "Investor connections",
            "Demo day events"
        ],
        benefits: [
            "Funding of ₹50 Lakhs",
            "Local market access",
            "Mentorship support",
            "Office space in Jaipur",
            "Government connects",
            "Technology adoption support",
            "Marketing assistance",
            "Legal compliance help",
            "Local talent access",
            "Community building"
        ],
        image: "images/startup-oasis.jpg"
    },
    
    // Government Support
    "startup-india": {
        name: "Startup India Seed Fund",
        description: "Government's flagship initiative providing seed funding to innovative startups. The scheme has supported over 500 startups and disbursed ₹1000 Crores. Portfolio startups have generated 20,000+ jobs and filed 200+ patents.",
        funding: "₹20 Lakhs",
        equity: "0%",
        contact: {
            email: "seedfund@startupindia.gov.in",
            phone: "+91 1800 115 565",
            website: "https://www.startupindia.gov.in",
            address: "Startup India Hub, Udyog Bhawan, New Delhi 110011"
        },
        agenda: [
            "Seed funding for validation of POC",
            "Market entry and commercialization",
            "IP protection and patent filing",
            "Product development support",
            "Regulatory compliance guidance",
            "Market access facilitation",
            "Technology commercialization",
            "Industry connect programs",
            "Mentorship and guidance",
            "International market access"
        ],
        eligibility: [
            "DPIIT recognized startup",
            "Less than 2 years old",
            "Incorporated as private limited",
            "Original innovation",
            "Working prototype ready",
            "No prior funding > ₹10 Lakhs",
            "Indian founder majority",
            "Solving Indian problems",
            "Clear revenue model",
            "Full-time team"
        ],
        process: [
            "Online application submission",
            "Preliminary screening",
            "Expert committee evaluation",
            "Due diligence verification",
            "Grant approval committee",
            "Fund disbursement",
            "Milestone monitoring",
            "Progress reporting",
            "Impact assessment",
            "Final evaluation"
        ],
        benefits: [
            "Up to ₹20 Lakhs grant",
            "Zero equity dilution",
            "Patent fee reimbursement",
            "Compliance support",
            "Government recognition",
            "Market access support",
            "Mentorship access",
            "Networking opportunities",
            "Additional scheme benefits",
            "Performance incentives"
        ],
        image: "images/startup-india.jpg"
    },
    "msme": {
        name: "MSME Loan Scheme",
        description: "Comprehensive financial support program for MSMEs under the Ministry of MSME. The scheme has disbursed over ₹20,000 Crores to 1 lakh MSMEs, creating 5 lakh jobs and supporting export growth of 25%.",
        funding: "₹50 Lakhs",
        equity: "0%",
        contact: {
            email: "support@msme.gov.in",
            phone: "+91 1800 111 955",
            website: "https://msme.gov.in",
            address: "Udyog Bhawan, Rafi Marg, New Delhi 110011"
        },
        agenda: [
            "Working capital support",
            "Equipment financing",
            "Technology upgradation",
            "Export promotion",
            "Quality certification",
            "Marketing assistance",
            "Skill development",
            "Infrastructure support",
            "Digital transformation",
            "Green initiatives"
        ],
        eligibility: [
            "Valid Udyam registration",
            "3+ years operations",
            "Profitable business",
            "Clean credit history",
            "Tax compliance",
            "Environmental compliance",
            "Employment generation",
            "Local manufacturing",
            "Export potential",
            "Growth plan"
        ],
        process: [
            "Online registration",
            "Document submission",
            "Bank evaluation",
            "Field verification",
            "Loan sanction",
            "Disbursement",
            "Utilization monitoring",
            "Progress tracking",
            "Repayment schedule",
            "Performance review"
        ],
        benefits: [
            "Collateral-free loan",
            "Low interest rates",
            "Flexible repayment",
            "Additional subsidies",
            "Tax benefits",
            "Priority sector status",
            "Export incentives",
            "Training support",
            "Market access",
            "Technology support"
        ],
        image: "images/msme.jpg"
    },
    "state": {
        name: "State Startup Policies",
        description: "State-specific startup support programs offering customized benefits. Over 25 states have launched dedicated startup policies, supporting 10,000+ startups with ₹5,000 Crores in funding and creating 2 lakh jobs.",
        funding: "₹25 Lakhs",
        equity: "0%",
        contact: {
            email: "state.startup@gov.in",
            phone: "+91 1800 200 1947",
            website: "https://state.startupindia.gov.in",
            address: "State Innovation Council, State Secretariat"
        },
        agenda: [
            "Local ecosystem development",
            "Infrastructure support",
            "Funding assistance",
            "Skill development",
            "Innovation promotion",
            "Market access",
            "Policy support",
            "Industry collaboration",
            "Research partnerships",
            "Global connectivity"
        ],
        eligibility: [
            "State registration",
            "Local incorporation",
            "Innovation focus",
            "Job creation potential",
            "Local resource usage",
            "Technology adoption",
            "Sector alignment",
            "Growth potential",
            "Social impact",
            "Sustainability"
        ],
        process: [
            "State portal registration",
            "Document verification",
            "Expert evaluation",
            "Presentation round",
            "Committee approval",
            "MoU signing",
            "Fund release",
            "Progress monitoring",
            "Impact reporting",
            "Policy compliance"
        ],
        benefits: [
            "Direct funding support",
            "Rent-free space",
            "Patent assistance",
            "Tax exemptions",
            "Power subsidies",
            "Recruitment assistance",
            "Marketing support",
            "Technical guidance",
            "Networking events",
            "Policy benefits"
        ],
        image: "images/state-startup.jpg"
    },
    
    // Angel Investors
    "ian": {
        name: "Indian Angel Network",
        description: "India's largest network of angel investors with over 500 members across 12 cities. IAN has invested over ₹500 Crores in 150+ startups across various sectors. They focus on early-stage startups with innovative ideas and strong founding teams. IAN has successfully exited 20+ startups with returns ranging from 2x to 10x.",
        funding: "₹50 Lakhs - ₹2 Crores",
        equity: "10-25%",
        contact: {
            email: "invest@indianangelnetwork.com",
            phone: "+91 11 4066 0000",
            website: "https://indianangelnetwork.com",
            address: "Indian Angel Network, 3rd Floor, Worldmark 1, Aerocity, New Delhi 110037"
        },
        agenda: [
            "Early-stage investment with follow-on funding support",
            "Mentorship from successful entrepreneurs with 20+ years of experience",
            "Access to IAN's extensive network of 500+ investors across 12 cities",
            "Follow-on funding support from IAN's network of investors",
            "Exit strategy guidance and preparation",
            "Regular workshops on business model canvas and lean startup methodology",
            "Technical validation and product development guidance",
            "Access to IAN's extensive network of corporate partners",
            "Industry-specific networking events and conferences",
            "Demo day preparation with investor feedback sessions"
        ],
        eligibility: [
            "Innovative business ideas with potential for commercialization",
            "Strong founding team with complementary skills and domain expertise",
            "Clear market opportunity with significant growth potential",
            "Scalable business model with sustainable competitive advantage",
            "Early traction or proof of concept with potential users",
            "Indian citizen or registered Indian company with valid documentation",
            "No previous institutional funding (exceptions for exceptional cases)",
            "Willingness to engage with IAN's extensive network of mentors and investors",
            "Commitment to rapid scaling and market expansion",
            "Ability to leverage technology for disruptive innovation"
        ],
        process: [
            "Pitch submission through IAN portal with detailed business plan",
            "Initial screening by IAN team including successful entrepreneurs",
            "Presentation to IAN members including industry leaders",
            "Due diligence including technical assessment and market validation",
            "Term sheet negotiation and finalization",
            "Investment and post-investment support",
            "Regular progress reviews and milestone tracking",
            "Exit strategy preparation and execution"
        ],
        benefits: [
            "Investment ranging from ₹50 Lakhs to ₹2 Crores with flexible terms",
            "Mentorship from 500+ successful entrepreneurs with 20+ years of experience",
            "Access to IAN's extensive network of 500+ investors across 12 cities",
            "Follow-on funding support from IAN's network of investors",
            "Exit strategy guidance and preparation",
            "Strategic partnerships with corporate partners for pilot projects",
            "International market access through IAN's global partnerships",
            "Board representation and governance support",
            "Access to IAN's extensive resources and expertise",
            "Regular workshops on fundraising, growth strategies, and business development",
            "Industry-specific guidance for regulatory compliance and market entry",
            "Lifetime access to IAN's alumni network and resources"
        ],
        image: "images/ian.jpg"
    },
    "mumbai-angels": {
        name: "Mumbai Angels",
        description: "One of India's most active angel networks with investments in over 100 startups. Mumbai Angels has invested over ₹300 Crores in 100+ startups across various sectors. They focus on early-stage startups with innovative ideas and strong founding teams. Mumbai Angels has successfully exited 15+ startups with returns ranging from 2x to 8x.",
        funding: "₹25 Lakhs - ₹1 Crore",
        equity: "5-20%",
        contact: {
            email: "invest@mumbaiangels.com",
            phone: "+91 22 4007 7000",
            website: "https://mumbaiangels.com",
            address: "Mumbai Angels, 91 Spring Board, Andheri East, Mumbai, Maharashtra 400093"
        },
        agenda: [
            "Early-stage investment with follow-on funding support",
            "Mentorship from successful entrepreneurs with 15+ years of experience",
            "Access to Mumbai Angels' extensive network of 200+ investors",
            "Follow-on funding support from Mumbai Angels' network of investors",
            "Exit strategy guidance and preparation",
            "Regular workshops on business model canvas and lean startup methodology",
            "Technical validation and product development guidance",
            "Access to Mumbai Angels' extensive network of corporate partners",
            "Industry-specific networking events and conferences",
            "Demo day preparation with investor feedback sessions"
        ],
        eligibility: [
            "Innovative business ideas with potential for commercialization",
            "Strong founding team with complementary skills and domain expertise",
            "Clear market opportunity with significant growth potential",
            "Scalable business model with sustainable competitive advantage",
            "Early traction or proof of concept with potential users",
            "Indian citizen or registered Indian company with valid documentation",
            "No previous institutional funding (exceptions for exceptional cases)",
            "Willingness to engage with Mumbai Angels' extensive network of mentors and investors",
            "Commitment to rapid scaling and market expansion",
            "Ability to leverage technology for disruptive innovation"
        ],
        process: [
            "Pitch submission through Mumbai Angels portal with detailed business plan",
            "Initial screening by MA team including successful entrepreneurs",
            "Presentation to MA members including industry leaders",
            "Due diligence including technical assessment and market validation",
            "Term sheet negotiation and finalization",
            "Investment and post-investment support",
            "Regular progress reviews and milestone tracking",
            "Exit strategy preparation and execution"
        ],
        benefits: [
            "Investment ranging from ₹25 Lakhs to ₹1 Crore with flexible terms",
            "Mentorship from successful entrepreneurs with 15+ years of experience",
            "Access to Mumbai Angels' extensive network of 200+ investors",
            "Follow-on funding support from Mumbai Angels' network of investors",
            "Exit strategy guidance and preparation",
            "Strategic partnerships with corporate partners for pilot projects",
            "International market access through Mumbai Angels' global partnerships",
            "Board representation and governance support",
            "Access to Mumbai Angels' extensive resources and expertise",
            "Regular workshops on fundraising, growth strategies, and business development",
            "Industry-specific guidance for regulatory compliance and market entry",
            "Lifetime access to Mumbai Angels' alumni network and resources"
        ],
        image: "images/mumbai-angels.jpg"
    },
    "lead-angels": {
        name: "Lead Angels",
        description: "Pan-India angel network focused on early-stage investments in technology startups. Lead Angels has invested over ₹200 Crores in 80+ startups across various sectors. They focus on technology startups with innovative ideas and strong founding teams. Lead Angels has successfully exited 10+ startups with returns ranging from 2x to 6x.",
        funding: "₹20 Lakhs - ₹75 Lakhs",
        equity: "8-15%",
        contact: {
            email: "invest@leadangels.in",
            phone: "+91 22 4007 7000",
            website: "https://leadangels.in",
            address: "Lead Angels, 91 Spring Board, Andheri East, Mumbai, Maharashtra 400093"
        },
        agenda: [
            "Early-stage investment with follow-on funding support",
            "Mentorship from successful entrepreneurs with 15+ years of experience",
            "Access to Lead Angels' extensive network of 150+ investors",
            "Follow-on funding support from Lead Angels' network of investors",
            "Exit strategy guidance and preparation",
            "Regular workshops on business model canvas and lean startup methodology",
            "Technical validation and product development guidance",
            "Access to Lead Angels' extensive network of corporate partners",
            "Industry-specific networking events and conferences",
            "Demo day preparation with investor feedback sessions"
        ],
        eligibility: [
            "Technology-focused startups with innovative solutions",
            "Strong founding team with technical expertise and domain knowledge",
            "Clear market opportunity with significant growth potential",
            "Scalable business model with sustainable competitive advantage",
            "Early traction or proof of concept with potential users",
            "Indian citizen or registered Indian company with valid documentation",
            "No previous institutional funding (exceptions for exceptional cases)",
            "Willingness to engage with Lead Angels' extensive network of mentors and investors",
            "Commitment to rapid scaling and market expansion",
            "Ability to leverage technology for disruptive innovation"
        ],
        process: [
            "Pitch submission through Lead Angels portal with detailed business plan",
            "Initial screening by LA team including successful entrepreneurs",
            "Presentation to LA members including industry leaders",
            "Due diligence including technical assessment and market validation",
            "Term sheet negotiation and finalization",
            "Investment and post-investment support",
            "Regular progress reviews and milestone tracking",
            "Exit strategy preparation and execution"
        ],
        benefits: [
            "Investment ranging from ₹20 Lakhs to ₹75 Lakhs with flexible terms",
            "Mentorship from successful entrepreneurs with 15+ years of experience",
            "Access to Lead Angels' extensive network of 150+ investors",
            "Follow-on funding support from Lead Angels' network of investors",
            "Exit strategy guidance and preparation",
            "Strategic partnerships with corporate partners for pilot projects",
            "International market access through Lead Angels' global partnerships",
            "Board representation and governance support",
            "Access to Lead Angels' extensive resources and expertise",
            "Regular workshops on fundraising, growth strategies, and business development",
            "Industry-specific guidance for regulatory compliance and market entry",
            "Lifetime access to Lead Angels' alumni network and resources"
        ],
        image: "images/lead-angels.jpg"
    },
    
    // Small Business Development Centers
    "msme-dev": {
        name: "MSME Development Centers",
        description: "Government-supported centers providing comprehensive support to MSMEs across India. These centers have supported over 50,000 MSMEs with various services and resources. They focus on helping MSMEs grow and scale their operations through various support services. The centers have helped MSMEs create over 100,000 jobs and increase their revenue by 30% on average.",
        funding: "₹10 Lakhs - ₹1 Crore",
        equity: "0%",
        contact: {
            email: "support@msmedc.gov.in",
            phone: "+91 11 2306 0000",
            website: "https://msmedc.gov.in",
            address: "MSME Development Center, MSME Bhawan, Okhla Industrial Area, New Delhi 110020"
        },
        agenda: [
            "Business advisory services with industry experts",
            "Technology and innovation support for MSMEs",
            "Market development and export promotion assistance",
            "Skill development and training programs",
            "Access to government schemes and incentives",
            "Regular workshops on business development and growth strategies",
            "Technical validation and product development guidance",
            "Access to MSME's extensive network of corporate partners",
            "Industry-specific networking events and conferences",
            "Export promotion and international market access"
        ],
        eligibility: [
            "MSME registered enterprises with valid Udyam registration",
            "Viable business proposal with growth potential",
            "Compliance with MSME guidelines and regulations",
            "Commitment to growth and development",
            "Willingness to engage with MSME's extensive network of mentors and experts",
            "Ability to leverage technology for business growth",
            "Clear market opportunity with significant growth potential",
            "Scalable business model with sustainable competitive advantage",
            "Early traction or proof of concept with potential customers",
            "Indian citizen or registered Indian company with valid documentation"
        ],
        process: [
            "Registration through MSME portal with detailed business plan",
            "Initial screening by MSME team including industry experts",
            "Assessment of business needs and growth potential",
            "Development of customized support plan",
            "Implementation of support services and resources",
            "Regular progress reviews and milestone tracking",
            "Adjustment of support plan based on progress and feedback"
        ],
        benefits: [
            "Access to government schemes and incentives",
            "Business advisory services from industry experts",
            "Technology and innovation support for MSMEs",
            "Market development and export promotion assistance",
            "Skill development and training programs",
            "Access to MSME's extensive network of corporate partners",
            "Regular workshops on business development and growth strategies",
            "Technical validation and product development guidance",
            "Industry-specific networking events and conferences",
            "Export promotion and international market access",
            "Access to MSME's extensive resources and expertise",
            "Lifetime access to MSME's alumni network and resources"
        ],
        image: "images/msme-dev.jpg"
    },
    "women-entrepreneurship": {
        name: "Women Entrepreneurship Centers",
        description: "Specialized centers supporting women entrepreneurs across India. These centers have supported over 10,000 women entrepreneurs with various services and resources. They focus on helping women entrepreneurs start and grow their businesses through various support services. The centers have helped women entrepreneurs create over 20,000 jobs and increase their revenue by 40% on average.",
        funding: "₹5 Lakhs - ₹50 Lakhs",
        equity: "0%",
        contact: {
            email: "support@wec.gov.in",
            phone: "+91 11 2306 0000",
            website: "https://wec.gov.in",
            address: "Women Entrepreneurship Center, MSME Bhawan, Okhla Industrial Area, New Delhi 110020"
        },
        agenda: [
            "Business advisory services with women entrepreneurs",
            "Technology and innovation support for women entrepreneurs",
            "Market development and export promotion assistance",
            "Skill development and training programs",
            "Access to government schemes and incentives",
            "Regular workshops on business development and growth strategies",
            "Technical validation and product development guidance",
            "Access to WEC's extensive network of corporate partners",
            "Industry-specific networking events and conferences",
            "Export promotion and international market access"
        ],
        eligibility: [
            "Women entrepreneurs with valid business registration",
            "Viable business proposal with growth potential",
            "Compliance with government guidelines and regulations",
            "Commitment to growth and development",
            "Willingness to engage with WEC's extensive network of mentors and experts",
            "Ability to leverage technology for business growth",
            "Clear market opportunity with significant growth potential",
            "Scalable business model with sustainable competitive advantage",
            "Early traction or proof of concept with potential customers",
            "Indian citizen or registered Indian company with valid documentation"
        ],
        process: [
            "Registration through WEC portal with detailed business plan",
            "Initial screening by WEC team including women entrepreneurs",
            "Assessment of business needs and growth potential",
            "Development of customized support plan",
            "Implementation of support services and resources",
            "Regular progress reviews and milestone tracking",
            "Adjustment of support plan based on progress and feedback"
        ],
        benefits: [
            "Access to government schemes and incentives for women entrepreneurs",
            "Business advisory services from women entrepreneurs",
            "Technology and innovation support for women entrepreneurs",
            "Market development and export promotion assistance",
            "Skill development and training programs",
            "Access to WEC's extensive network of corporate partners",
            "Regular workshops on business development and growth strategies",
            "Technical validation and product development guidance",
            "Industry-specific networking events and conferences",
            "Export promotion and international market access",
            "Access to WEC's extensive resources and expertise",
            "Lifetime access to WEC's alumni network and resources"
        ],
        image: "images/women-entrepreneurship.jpg"
    },
    "rural-business": {
        name: "Rural Business Hubs",
        description: "Centers supporting rural entrepreneurs and businesses across India. These hubs have supported over 20,000 rural entrepreneurs with various services and resources. They focus on helping rural entrepreneurs start and grow their businesses through various support services. The hubs have helped rural entrepreneurs create over 40,000 jobs and increase their revenue by 35% on average.",
        funding: "₹2 Lakhs - ₹25 Lakhs",
        equity: "0%",
        contact: {
            email: "support@rbh.gov.in",
            phone: "+91 11 2306 0000",
            website: "https://rbh.gov.in",
            address: "Rural Business Hub, MSME Bhawan, Okhla Industrial Area, New Delhi 110020"
        },
        agenda: [
            "Business advisory services with rural entrepreneurs",
            "Technology and innovation support for rural businesses",
            "Market development and export promotion assistance",
            "Skill development and training programs",
            "Access to government schemes and incentives",
            "Regular workshops on business development and growth strategies",
            "Technical validation and product development guidance",
            "Access to RBH's extensive network of corporate partners",
            "Industry-specific networking events and conferences",
            "Export promotion and international market access"
        ],
        eligibility: [
            "Rural entrepreneurs with valid business registration",
            "Viable business proposal with growth potential",
            "Compliance with government guidelines and regulations",
            "Commitment to growth and development",
            "Willingness to engage with RBH's extensive network of mentors and experts",
            "Ability to leverage technology for business growth",
            "Clear market opportunity with significant growth potential",
            "Scalable business model with sustainable competitive advantage",
            "Early traction or proof of concept with potential customers",
            "Indian citizen or registered Indian company with valid documentation"
        ],
        process: [
            "Registration through RBH portal with detailed business plan",
            "Initial screening by RBH team including rural entrepreneurs",
            "Assessment of business needs and growth potential",
            "Development of customized support plan",
            "Implementation of support services and resources",
            "Regular progress reviews and milestone tracking",
            "Adjustment of support plan based on progress and feedback"
        ],
        benefits: [
            "Access to government schemes and incentives for rural entrepreneurs",
            "Business advisory services from rural entrepreneurs",
            "Technology and innovation support for rural businesses",
            "Market development and export promotion assistance",
            "Skill development and training programs",
            "Access to RBH's extensive network of corporate partners",
            "Regular workshops on business development and growth strategies",
            "Technical validation and product development guidance",
            "Industry-specific networking events and conferences",
            "Export promotion and international market access",
            "Access to RBH's extensive resources and expertise",
            "Lifetime access to RBH's alumni network and resources"
        ],
        image: "images/rural-business.jpg"
    }
};

// Program details data
const programDetails = {
    't-hub': {
        title: 'T-Hub',
        description: 'India\'s largest startup incubator based in Hyderabad, offering mentorship and funding support.',
        funding: '₹50 Lakhs',
        equity: '5%',
        agenda: [
            '6-month intensive incubation program',
            'Weekly mentorship sessions',
            'Access to T-Hub workspace',
            'Networking events and workshops',
            'Demo day preparation',
            'Investor connect program'
        ],
        eligibility: [
            'Early-stage startups (0-3 years)',
            'Innovative business model',
            'Scalable solution',
            'Strong founding team',
            'Minimum viable product ready',
            'Indian registered company'
        ],
        process: [
            'Online application submission',
            'Initial screening',
            'Pitch presentation',
            'Due diligence',
            'Selection committee review',
            'Onboarding and program start'
        ],
        benefits: [
            'Seed funding up to ₹50 Lakhs',
            '5% equity stake',
            'Access to mentor network',
            'Infrastructure support',
            'Legal and compliance guidance',
            'Market access and partnerships'
        ]
    },
    'cii': {
        title: 'CIIE.CO',
        description: 'IIM Ahmedabad\'s incubation center supporting deep-tech startups.',
        funding: '₹25 Lakhs',
        equity: '4%',
        agenda: [
            '12-month deep-tech incubation',
            'Technical mentorship from IIM faculty',
            'Research collaboration opportunities',
            'Industry connect program',
            'Patent filing support',
            'Market validation workshops'
        ],
        eligibility: [
            'Deep-tech startups',
            'Technology innovation focus',
            'Research-backed solution',
            'Strong IP potential',
            'Technical founding team',
            'Proof of concept ready'
        ],
        process: [
            'Application review',
            'Technical assessment',
            'Team interview',
            'Due diligence',
            'Selection panel review',
            'Program induction'
        ],
        benefits: [
            'Funding up to ₹25 Lakhs',
            '4% equity stake',
            'Technical mentorship',
            'Research facilities access',
            'IP support',
            'Industry partnerships'
        ]
    },
    'venture': {
        title: 'Venture Catalysts',
        description: 'India\'s first integrated incubator and accelerator platform.',
        funding: '₹1 Crore',
        equity: '8%',
        agenda: [
            '90-day intensive accelerator program',
            'Daily mentoring sessions',
            'Weekly progress reviews',
            'Market strategy development',
            'Investor pitch preparation',
            'Demo day showcase'
        ],
        eligibility: [
            'Growth-stage startups',
            'Proven business model',
            'Market traction with customers',
            'Strong team with execution capability',
            'Clear growth metrics',
            'Funding readiness'
        ],
        process: [
            'Application review',
            'Pitch presentation',
            'Team interview',
            'Due diligence',
            'Selection panel review',
            'Program start'
        ],
        benefits: [
            'Funding up to ₹1 Crore',
            '8% equity stake',
            'Expert mentorship',
            'Market access',
            'Investor network',
            'Growth support'
        ]
    },
    'startup': {
        title: 'Startup Oasis',
        description: 'Jaipur-based accelerator supporting early-stage startups.',
        funding: '₹50 Lakhs',
        equity: '10%',
        agenda: [
            '4-month accelerator program',
            'Business model validation',
            'Market entry strategy',
            'Team development',
            'Financial planning',
            'Investor readiness'
        ],
        eligibility: [
            'Early-stage startups',
            'Innovative solution',
            'Market potential',
            'Committed team',
            'MVP ready',
            'Growth mindset'
        ],
        process: [
            'Application review',
            'Solution assessment',
            'Team interview',
            'Due diligence',
            'Selection panel review',
            'Program start'
        ],
        benefits: [
            'Funding up to ₹50 Lakhs',
            '10% equity stake',
            'Business mentorship',
            'Market validation',
            'Team building',
            'Investor access'
        ]
    },
    'msme': {
        title: 'MSME Loan Scheme',
        description: 'Government-backed loans for micro, small and medium enterprises.',
        funding: '₹50 Lakhs',
        equity: '0%',
        agenda: [
            'Loan processing',
            'Business advisory',
            'Financial planning',
            'Market development',
            'Technology upgrade',
            'Skill development'
        ],
        eligibility: [
            'MSME registered',
            'Business viability',
            'Credit history',
            'Collateral security',
            'Business experience',
            'Project feasibility'
        ],
        process: [
            'Application submission',
            'Document verification',
            'Credit assessment',
            'Project evaluation',
            'Approval process',
            'Loan disbursement'
        ],
        benefits: [
            'Loan up to ₹50 Lakhs',
            'Lower interest rates',
            'Collateral security',
            'Quick processing',
            'Technical support',
            'Market assistance'
        ]
    },
    'state': {
        title: 'State Startup Policies',
        description: 'Various state government initiatives and grants for startups.',
        funding: '₹25 Lakhs',
        equity: '0%',
        agenda: [
            'Policy implementation',
            'Incentive distribution',
            'Infrastructure support',
            'Skill development',
            'Market access',
            'Innovation support'
        ],
        eligibility: [
            'State registered startup',
            'Innovation focus',
            'Employment potential',
            'Local presence',
            'Clean compliance',
            'Growth potential'
        ],
        process: [
            'State registration',
            'Policy application',
            'Document verification',
            'Committee review',
            'Approval process',
            'Benefit distribution'
        ],
        benefits: [
            'Grants up to ₹25 Lakhs',
            'Tax benefits',
            'Infrastructure support',
            'Market access',
            'Skill development',
            'Innovation support'
        ]
    },
    'ian': {
        title: 'Indian Angel Network',
        description: 'India\'s largest network of angel investors with over 500 members across 12 cities.',
        funding: '₹50 Lakhs - ₹2 Crores',
        equity: '10-25%',
        agenda: [
            'Investment evaluation',
            'Due diligence process',
            'Term sheet negotiation',
            'Portfolio support',
            'Exit planning',
            'Growth monitoring'
        ],
        eligibility: [
            'Early-stage startup',
            'Innovative solution',
            'Strong team',
            'Market potential',
            'Scalable business',
            'Clear exit strategy'
        ],
        process: [
            'Pitch submission',
            'Initial screening',
            'Due diligence',
            'Term negotiation',
            'Investment decision',
            'Deal closure'
        ],
        benefits: [
            'Investment ₹50L-2Cr',
            '10-25% equity',
            'Mentor network',
            'Industry connect',
            'Growth support',
            'Exit guidance'
        ]
    },
    'mumbai-angels': {
        title: 'Mumbai Angels',
        description: 'One of India\'s most active angel networks with investments in over 100 startups.',
        funding: '₹25 Lakhs - ₹1 Crore',
        equity: '5-20%',
        agenda: [
            'Investment process',
            'Portfolio management',
            'Growth monitoring',
            'Exit planning',
            'Network access',
            'Strategic guidance'
        ],
        eligibility: [
            'Early-growth stage',
            'Proven concept',
            'Strong team',
            'Market traction',
            'Scalable model',
            'Clear metrics'
        ],
        process: [
            'Application review',
            'Pitch presentation',
            'Due diligence',
            'Term negotiation',
            'Investment decision',
            'Deal closure'
        ],
        benefits: [
            'Investment ₹25L-1Cr',
            '5-20% equity',
            'Expert network',
            'Industry access',
            'Growth support',
            'Exit guidance'
        ]
    },
    'lead-angels': {
        title: 'Lead Angels',
        description: 'Pan-India angel network focused on early-stage investments in technology startups.',
        funding: '₹20 Lakhs - ₹75 Lakhs',
        equity: '8-15%',
        agenda: [
            'Investment evaluation',
            'Portfolio support',
            'Growth monitoring',
            'Exit planning',
            'Network access',
            'Strategic guidance'
        ],
        eligibility: [
            'Early-stage startup',
            'Tech innovation',
            'Strong team',
            'Market potential',
            'Scalable solution',
            'Clear metrics'
        ],
        process: [
            'Pitch submission',
            'Initial screening',
            'Due diligence',
            'Term negotiation',
            'Investment decision',
            'Deal closure'
        ],
        benefits: [
            'Investment ₹20L-75L',
            '8-15% equity',
            'Mentor network',
            'Industry connect',
            'Growth support',
            'Exit guidance'
        ]
    },
    'msme-dev': {
        title: 'MSME Development Centers',
        description: 'Government-supported centers providing training, mentoring, and resources for small businesses.',
        funding: '₹10 Lakhs - ₹1 Crore',
        equity: '0%',
        agenda: [
            'Business advisory services',
            'Financial planning support',
            'Market development assistance',
            'Technology upgrade guidance',
            'Skill development programs',
            'Quality certification support'
        ],
        eligibility: [
            'MSME registered',
            'Business viability',
            'Growth potential',
            'Local presence',
            'Clean compliance',
            'Employment focus'
        ],
        process: [
            'Registration',
            'Need assessment',
            'Plan development',
            'Implementation',
            'Monitoring',
            'Support extension'
        ],
        benefits: [
            'Support ₹10L-50L',
            'Technical guidance',
            'Market access',
            'Skill development',
            'Quality certification',
            'Growth support'
        ]
    },
    'women-entrepreneurship': {
        title: 'Women Entrepreneurship Centers',
        description: 'Specialized centers supporting women entrepreneurs with training and funding opportunities.',
        funding: '₹5 Lakhs - ₹25 Lakhs',
        equity: '0%',
        agenda: [
            'Business training',
            'Financial literacy',
            'Market access',
            'Technology adoption',
            'Skill development',
            'Networking support'
        ],
        eligibility: [
            'Women entrepreneur',
            'Business viability',
            'Innovation focus',
            'Growth potential',
            'Local presence',
            'Clean compliance'
        ],
        process: [
            'Application',
            'Need assessment',
            'Plan development',
            'Implementation',
            'Monitoring',
            'Support extension'
        ],
        benefits: [
            'Support ₹5L-25L',
            'Business training',
            'Market access',
            'Financial support',
            'Skill development',
            'Network access'
        ]
    },
    'rural-business': {
        title: 'Rural Business Hubs',
        description: 'Centers focused on developing entrepreneurship in rural areas with specialized support.',
        funding: '₹2 Lakhs - ₹10 Lakhs',
        equity: '0%',
        agenda: [
            'Rural development',
            'Skill training',
            'Market access',
            'Technology adoption',
            'Financial inclusion',
            'Infrastructure support'
        ],
        eligibility: [
            'Rural entrepreneur',
            'Business viability',
            'Employment focus',
            'Local presence',
            'Clean compliance',
            'Growth potential'
        ],
        process: [
            'Registration',
            'Need assessment',
            'Plan development',
            'Implementation',
            'Monitoring',
            'Support extension'
        ],
        benefits: [
            'Support ₹2L-10L',
            'Skill training',
            'Market access',
            'Financial support',
            'Infrastructure help',
            'Growth guidance'
        ]
    }
};

// Function to populate modal with program details
function populateModal(programType) {
    const program = programData[programType];
    if (!program) return;

    document.getElementById('modalTitle').textContent = program.title;
    document.getElementById('modalDescription').textContent = program.description;
    document.getElementById('modalFunding').innerHTML = `<i class="fas fa-money-bill-wave"></i> ${program.funding}`;
    document.getElementById('modalEquity').innerHTML = `<i class="fas fa-chart-pie"></i> ${program.equity}`;

    // Populate eligibility list
    const eligibilityList = document.getElementById('modalEligibility');
    eligibilityList.innerHTML = program.eligibility.map(item => `<li>${item}</li>`).join('');

    // Populate process list
    const processList = document.getElementById('modalProcess');
    processList.innerHTML = program.process.map(item => `<li>${item}</li>`).join('');

    // Populate benefits list
    const benefitsList = document.getElementById('modalBenefits');
    benefitsList.innerHTML = program.benefits.map(item => `<li>${item}</li>`).join('');

    // Show modal
    document.getElementById('programModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // If "all" is selected, show all cards
        if (filter === 'all') {
            document.querySelectorAll('.program-card').forEach(card => {
                card.style.display = 'block';
            });
        } else {
            // Otherwise, filter cards based on data-type
            document.querySelectorAll('.program-card').forEach(card => {
                const cardType = card.getAttribute('data-type');
                if (cardType.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
        }
    });
}

        // Scroll to section if data-scroll attribute is present
        const scrollTo = this.getAttribute('data-scroll');
        if (scrollTo) {
            document.querySelector(scrollTo).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Sort functionality
document.getElementById('sortSelect').addEventListener('change', function() {
    const sortBy = this.value;
    const cards = Array.from(document.querySelectorAll('.program-card'));
    
    cards.sort((a, b) => {
        if (sortBy === 'name') {
            return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
        } else if (sortBy === 'funding') {
            const aFunding = a.querySelector('.program-meta span:first-child').textContent;
            const bFunding = b.querySelector('.program-meta span:first-child').textContent;
            return extractFundingValue(bFunding) - extractFundingValue(aFunding);
        } else if (sortBy === 'equity') {
            const aEquity = a.querySelector('.program-meta span:last-child').textContent;
            const bEquity = b.querySelector('.program-meta span:last-child').textContent;
            return extractEquityValue(bEquity) - extractEquityValue(aEquity);
        }
    });
    
    const container = document.querySelector('.program-cards');
    cards.forEach(card => container.appendChild(card));
});

// Helper function to extract funding value for sorting
function extractFundingValue(fundingText) {
    const match = fundingText.match(/₹(\d+(?:,\d+)?)\s*(?:Lakhs|Crore)/);
    if (match) {
        let value = parseInt(match[1].replace(/,/g, ''));
        if (fundingText.includes('Crore')) {
            value *= 100;
        }
        return value;
    }
    return 0;
}

// Helper function to extract equity value for sorting
function extractEquityValue(equityText) {
    const match = equityText.match(/(\d+(?:\.\d+)?)%/);
    if (match) {
        return parseFloat(match[1]);
    }
    return 0;
}

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
            });
        });