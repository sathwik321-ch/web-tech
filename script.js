// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(18, 18, 18, 0.98)';
        nav.style.padding = '1rem 5%';
    } else {
        nav.style.background = 'rgba(18, 18, 18, 0.95)';
        nav.style.padding = '1.5rem 5%';
    }
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Add form submission animation
        const button = contactForm.querySelector('button');
        button.innerHTML = 'Sending...';
        button.style.opacity = '0.7';
        button.disabled = true;
        
        try {
            // Submit the form data
            const response = await fetch('handle_contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (result.success) {
                button.innerHTML = 'Message Sent!';
                button.style.backgroundColor = '#00ff9d';
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            button.innerHTML = 'Error!';
            button.style.backgroundColor = '#ff3333';
            alert('Error: ' + error.message);
        } finally {
            setTimeout(() => {
                button.innerHTML = 'Send Message';
                button.style.opacity = '1';
                button.style.backgroundColor = '';
                button.disabled = false;
            }, 3000);
        }
    });
}

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scroll = window.scrollY;
        
        if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Program data
const programData = {
    // Incubator Programs
    't-hub': {
        title: 'T-Hub',
        description: 'India\'s largest startup incubator, providing comprehensive support for early-stage startups.',
        funding: '₹50 Lakhs',
        equity: '5%',
        eligibility: [
            'Early-stage startups',
            'Innovative business model',
            'Scalable solution',
            'Strong founding team'
        ],
        process: [
            'Online application submission',
            'Initial screening',
            'Pitch presentation',
            'Due diligence',
            'Final selection'
        ],
        benefits: [
            'Access to mentors and experts',
            'Infrastructure support',
            'Networking opportunities',
            'Investor connect',
            'Technical resources'
        ]
    },
    'ciie': {
        title: 'CIIE.CO',
        description: 'Premier innovation hub at IIM Ahmedabad, supporting startups across various sectors.',
        funding: '₹75 Lakhs',
        equity: '7%',
        eligibility: [
            'Innovative technology solution',
            'Market-ready product',
            'Experienced team',
            'Clear growth potential'
        ],
        process: [
            'Application review',
            'Team interview',
            'Technical assessment',
            'Business model validation',
            'Selection and onboarding'
        ],
        benefits: [
            'Research and development support',
            'Industry connections',
            'Academic resources',
            'Funding opportunities',
            'Market access'
        ]
    },
    'nsrcel': {
        title: 'NSRCEL',
        description: 'Startup hub at IIM Bangalore, fostering entrepreneurship through various programs.',
        funding: '₹1 Crore',
        equity: '8%',
        eligibility: [
            'Technology-driven solution',
            'Proven market traction',
            'Strong team background',
            'Innovative approach'
        ],
        process: [
            'Application screening',
            'Pitch evaluation',
            'Technical review',
            'Business assessment',
            'Final selection'
        ],
        benefits: [
            'Academic expertise',
            'Industry mentorship',
            'Funding support',
            'Networking events',
            'Research collaboration'
        ]
    },

    // Accelerator Programs
    'venture-catalysts': {
        title: 'Venture Catalysts',
        description: 'India\'s first integrated incubator and accelerator platform, offering comprehensive support for early-stage startups.',
        funding: '₹1 Crore',
        equity: '8%',
        eligibility: [
            'Early-stage startups',
            'Innovative solution',
            'Market potential',
            'Strong team'
        ],
        process: [
            'Application review',
            'Initial screening',
            'Pitch presentation',
            'Due diligence',
            'Program selection'
        ],
        benefits: [
            'Intensive mentorship',
            'Direct investor access',
            'Global market exposure',
            'Technical infrastructure'
        ]
    },
    'xto10x': {
        title: 'xto10x',
        description: 'Growth accelerator founded by ex-Flipkart leaders, focusing on scaling startups through proven methodologies.',
        funding: '₹75 Lakhs',
        equity: '7%',
        eligibility: [
            'Growth-stage startup',
            'Proven business model',
            'Market traction',
            'Scalable operations'
        ],
        process: [
            'Business assessment',
            'Growth potential evaluation',
            'Team interview',
            'Strategy alignment',
            'Program selection'
        ],
        benefits: [
            'Growth strategy consulting',
            'Operational excellence',
            'Leadership development',
            'Market expansion support'
        ]
    },
    'startup-oasis': {
        title: 'Startup Oasis',
        description: 'Jaipur-based accelerator supporting early-stage startups with a focus on innovation and sustainable growth.',
        funding: '₹50 Lakhs',
        equity: '10%',
        eligibility: [
            'Early-stage startup',
            'Innovative solution',
            'Regional focus',
            'Sustainable model'
        ],
        process: [
            'Application screening',
            'Solution evaluation',
            'Team assessment',
            'Market validation',
            'Program selection'
        ],
        benefits: [
            'Product-market fit validation',
            'Business model refinement',
            'Investor readiness',
            'Regional market access'
        ]
    },

    // Government Programs
    'startup-india': {
        title: 'Startup India Seed Fund',
        description: 'Financial assistance of up to ₹20 Lakhs for proof of concept, prototype development, product trials, and market entry.',
        funding: '₹20 Lakhs',
        equity: 'No equity',
        eligibility: [
            'DPIIT-recognized startup',
            'Innovative business model',
            'Less than 2 years old',
            'Indian registered entity'
        ],
        process: [
            'Online application',
            'Document verification',
            'Project evaluation',
            'Expert review',
            'Final approval'
        ],
        benefits: [
            'No equity dilution',
            'Mentorship support',
            'Networking opportunities',
            'Market access support'
        ]
    },
    'mudra': {
        title: 'MUDRA Yojana',
        description: 'Loans up to ₹10 Lakhs for micro enterprises under three categories: Shishu, Kishore, and Tarun.',
        funding: '₹10 Lakhs',
        equity: 'N/A',
        eligibility: [
            '18-65 years age',
            'Indian citizen',
            'Micro enterprise',
            'Business viability'
        ],
        process: [
            'Application submission',
            'Document verification',
            'Business assessment',
            'Credit evaluation',
            'Loan disbursement'
        ],
        benefits: [
            'Collateral-free loans',
            'Lower interest rates',
            'Flexible repayment',
            'Quick disbursement'
        ]
    },
    'standup-india': {
        title: 'Stand-Up India',
        description: 'Loans from ₹10 Lakhs to ₹1 Crore for SC/ST and women entrepreneurs in manufacturing, services, or trading sectors.',
        funding: '₹1 Crore',
        equity: 'N/A',
        eligibility: [
            'SC/ST or women entrepreneur',
            '18-65 years age',
            'First-time entrepreneur',
            'Business viability'
        ],
        process: [
            'Application submission',
            'Document verification',
            'Business assessment',
            'Credit evaluation',
            'Loan disbursement'
        ],
        benefits: [
            'Composite loan',
            'Working capital',
            'Handholding support',
            'Skill development'
        ]
    },
    'msme': {
        title: 'MSME Loan Scheme',
        description: 'Comprehensive financial support program for MSMEs under the Ministry of MSME. The scheme has disbursed over ₹20,000 Crores to 1 lakh MSMEs, creating 5 lakh jobs and supporting export growth of 25%.',
        funding: '₹10 Lakhs - ₹1 Crore',
        equity: 'No equity',
        eligibility: [
            'MSME registered',
            'Business viability',
            'Credit history',
            'Collateral security',
            'Business experience',
            'Project feasibility'
        ],
        process: [
            'Online application submission',
            'Document verification',
            'Business assessment',
            'Credit evaluation',
            'Loan disbursement'
        ],
        benefits: [
            'Collateral-free loans',
            'Lower interest rates',
            'Flexible repayment',
            'Quick disbursement',
            'Government support',
            'Business growth assistance'
        ]
    },
    'msme-dev': {
        title: 'MSME Development Centers',
        description: 'Government-supported centers providing comprehensive support to MSMEs across India. These centers have supported over 50,000 MSMEs with various services and resources. They focus on helping MSMEs grow and scale their operations through various support services.',
        funding: '₹10 Lakhs - ₹1 Crore',
        equity: '0%',
        eligibility: [
            'MSME registered enterprises',
            'Business viability',
            'Growth potential',
            'Local presence',
            'Clean compliance',
            'Employment focus',
            'Technology adoption readiness',
            'Market expansion potential',
            'Quality standards compliance',
            'Environmental sustainability'
        ],
        process: [
            'Registration through MSME portal',
            'Initial screening',
            'Business assessment',
            'Resource allocation',
            'Support initiation',
            'Progress monitoring',
            'Impact assessment',
            'Support extension',
            'Growth tracking',
            'Success documentation'
        ],
        benefits: [
            'Business advisory services with industry experts',
            'Technology and innovation support for MSMEs',
            'Market development and export promotion assistance',
            'Skill development and training programs',
            'Access to government schemes and incentives',
            'Regular workshops on business development and growth strategies',
            'Technical validation and product development guidance',
            'Access to MSME\'s extensive network of corporate partners',
            'Industry-specific networking events and conferences',
            'Export promotion and international market access'
        ]
    },
    'women-entrepreneurship': {
        title: 'Women Entrepreneurship Centers',
        description: 'Specialized centers focused on empowering women entrepreneurs across India. These centers have supported over 25,000 women-led businesses, creating 75,000 jobs and generating ₹2,000 Crores in revenue. They provide comprehensive support to help women entrepreneurs start and scale their businesses.',
        funding: '₹5 Lakhs - ₹50 Lakhs',
        equity: '0%',
        eligibility: [
            'Women-led business (51% ownership)',
            'Business viability',
            'Innovation potential',
            'Employment creation',
            'Local presence',
            'Clean compliance',
            'Skill development readiness',
            'Market expansion potential',
            'Quality standards compliance',
            'Social impact focus'
        ],
        process: [
            'Registration through women entrepreneurship portal',
            'Initial screening',
            'Business assessment',
            'Skill gap analysis',
            'Support initiation',
            'Progress monitoring',
            'Impact assessment',
            'Support extension',
            'Growth tracking',
            'Success documentation'
        ],
        benefits: [
            'Business advisory services with women mentors',
            'Technology and innovation support',
            'Market development and export promotion assistance',
            'Skill development and training programs',
            'Access to government schemes and incentives',
            'Regular workshops on business development and growth strategies',
            'Technical validation and product development guidance',
            'Access to women entrepreneur networks and corporate partners',
            'Industry-specific networking events and conferences',
            'Export promotion and international market access',
            'Childcare support during training programs',
            'Flexible training schedules'
        ]
    },
    'rural-business': {
        title: 'Rural Business Hubs',
        description: 'Centers focused on promoting entrepreneurship in rural areas. These hubs have supported over 30,000 rural businesses, creating 90,000 jobs and generating ₹3,000 Crores in revenue. They provide comprehensive support to help rural entrepreneurs start and scale their businesses.',
        funding: '₹2 Lakhs - ₹25 Lakhs',
        equity: '0%',
        eligibility: [
            'Rural-based business',
            'Business viability',
            'Innovation potential',
            'Employment creation',
            'Local resource utilization',
            'Clean compliance',
            'Skill development readiness',
            'Market expansion potential',
            'Quality standards compliance',
            'Environmental sustainability'
        ],
        process: [
            'Registration through rural business portal',
            'Initial screening',
            'Business assessment',
            'Skill gap analysis',
            'Support initiation',
            'Progress monitoring',
            'Impact assessment',
            'Support extension',
            'Growth tracking',
            'Success documentation'
        ],
        benefits: [
            'Business advisory services with rural experts',
            'Technology and innovation support',
            'Market development and export promotion assistance',
            'Skill development and training programs',
            'Access to government schemes and incentives',
            'Regular workshops on business development and growth strategies',
            'Technical validation and product development guidance',
            'Access to rural business networks and corporate partners',
            'Industry-specific networking events and conferences',
            'Export promotion and international market access',
            'Infrastructure support',
            'Connectivity assistance'
        ]
    },

    // State Startup Policies
    'state': {
        title: 'State Startup Policies',
        description: 'State-specific startup support programs offering customized benefits. Over 25 states have launched dedicated startup policies, supporting 10,000+ startups with ₹5,000 Crores in funding and creating 2 lakh jobs.',
        funding: '₹25 Lakhs',
        equity: '0%',
        eligibility: [
            'State registration',
            'Local incorporation',
            'Innovation focus',
            'Job creation potential',
            'Local resource usage',
            'Technology adoption',
            'Sector alignment',
            'Growth potential',
            'Social impact',
            'Sustainability'
        ],
        process: [
            'State portal registration',
            'Document verification',
            'Expert evaluation',
            'Presentation round',
            'Committee approval',
            'MoU signing',
            'Fund release',
            'Progress monitoring',
            'Impact reporting',
            'Policy compliance'
        ],
        benefits: [
            'Direct funding support',
            'Rent-free space',
            'Patent assistance',
            'Tax exemptions',
            'Power subsidies',
            'Recruitment assistance',
            'Marketing support',
            'Technical guidance',
            'Networking events',
            'Policy benefits'
        ]
    },

    // Angel Investors
    'ian': {
        title: 'Indian Angel Network',
        description: 'India\'s largest network of angel investors with over 500 members across 12 cities. IAN has invested over ₹500 Crores in 150+ startups across various sectors. They focus on early-stage startups with innovative ideas and strong founding teams.',
        funding: '₹50 Lakhs - ₹2 Crores',
        equity: '10-25%',
        eligibility: [
            'Innovative business ideas with potential for commercialization',
            'Strong founding team with complementary skills and domain expertise',
            'Clear market opportunity with significant growth potential',
            'Scalable business model with sustainable competitive advantage',
            'Early traction or proof of concept with potential users',
            'Indian citizen or registered Indian company with valid documentation',
            'No previous institutional funding (exceptions for exceptional cases)',
            'Willingness to engage with IAN\'s extensive network of mentors and investors',
            'Commitment to rapid scaling and market expansion',
            'Ability to leverage technology for disruptive innovation'
        ],
        process: [
            'Pitch submission through IAN portal with detailed business plan',
            'Initial screening by IAN team including successful entrepreneurs',
            'Presentation to IAN members including industry leaders',
            'Due diligence including technical assessment and market validation',
            'Term sheet negotiation and finalization',
            'Investment and post-investment support',
            'Regular progress reviews and milestone tracking',
            'Exit strategy preparation and execution'
        ],
        benefits: [
            'Investment ranging from ₹50 Lakhs to ₹2 Crores with flexible terms',
            'Mentorship from successful entrepreneurs with 20+ years of experience',
            'Access to IAN\'s extensive network of 500+ investors across 12 cities',
            'Follow-on funding support from IAN\'s network of investors',
            'Exit strategy guidance and preparation',
            'Strategic partnerships with corporate partners for pilot projects',
            'International market access through IAN\'s global partnerships',
            'Board representation and governance support',
            'Access to IAN\'s extensive resources and expertise',
            'Regular workshops on fundraising, growth strategies, and business development'
        ]
    },
    'mumbai-angels': {
        title: 'Mumbai Angels',
        description: 'One of India\'s most active angel networks with investments in over 100 startups. Mumbai Angels has invested over ₹300 Crores in 100+ startups across various sectors. They focus on early-stage startups with innovative ideas and strong founding teams.',
        funding: '₹25 Lakhs - ₹1 Crore',
        equity: '5-20%',
        eligibility: [
            'Innovative business ideas with potential for commercialization',
            'Strong founding team with complementary skills and domain expertise',
            'Clear market opportunity with significant growth potential',
            'Scalable business model with sustainable competitive advantage',
            'Early traction or proof of concept with potential users',
            'Indian citizen or registered Indian company with valid documentation',
            'No previous institutional funding (exceptions for exceptional cases)',
            'Willingness to engage with Mumbai Angels\' extensive network of mentors and investors',
            'Commitment to rapid scaling and market expansion',
            'Ability to leverage technology for disruptive innovation'
        ],
        process: [
            'Pitch submission through Mumbai Angels portal with detailed business plan',
            'Initial screening by MA team including successful entrepreneurs',
            'Presentation to MA members including industry leaders',
            'Due diligence including technical assessment and market validation',
            'Term sheet negotiation and finalization',
            'Investment and post-investment support',
            'Regular progress reviews and milestone tracking',
            'Exit strategy preparation and execution'
        ],
        benefits: [
            'Investment ranging from ₹25 Lakhs to ₹1 Crore with flexible terms',
            'Mentorship from successful entrepreneurs with 15+ years of experience',
            'Access to Mumbai Angels\' extensive network of 200+ investors',
            'Follow-on funding support from Mumbai Angels\' network of investors',
            'Exit strategy guidance and preparation',
            'Strategic partnerships with corporate partners for pilot projects',
            'International market access through Mumbai Angels\' global partnerships',
            'Board representation and governance support',
            'Access to Mumbai Angels\' extensive resources and expertise',
            'Regular workshops on fundraising, growth strategies, and business development'
        ]
    },
    'lead-angels': {
        title: 'Lead Angels',
        description: 'Pan-India angel network focused on early-stage investments in technology startups. Lead Angels has invested over ₹200 Crores in 80+ startups across various sectors. They focus on technology startups with innovative ideas and strong founding teams.',
        funding: '₹20 Lakhs - ₹75 Lakhs',
        equity: '8-15%',
        eligibility: [
            'Technology-focused startups with innovative solutions',
            'Strong founding team with technical expertise and domain knowledge',
            'Clear market opportunity with significant growth potential',
            'Scalable business model with sustainable competitive advantage',
            'Early traction or proof of concept with potential users',
            'Indian citizen or registered Indian company with valid documentation',
            'No previous institutional funding (exceptions for exceptional cases)',
            'Willingness to engage with Lead Angels\' extensive network of mentors and investors',
            'Commitment to rapid scaling and market expansion',
            'Ability to leverage technology for disruptive innovation'
        ],
        process: [
            'Pitch submission through Lead Angels portal with detailed business plan',
            'Initial screening by LA team including successful entrepreneurs',
            'Presentation to LA members including industry leaders',
            'Due diligence including technical assessment and market validation',
            'Term sheet negotiation and finalization',
            'Investment and post-investment support',
            'Regular progress reviews and milestone tracking',
            'Exit strategy preparation and execution'
        ],
        benefits: [
            'Investment ranging from ₹20 Lakhs to ₹75 Lakhs with flexible terms',
            'Mentorship from successful entrepreneurs with 15+ years of experience',
            'Access to Lead Angels\' extensive network of 150+ investors',
            'Follow-on funding support from Lead Angels\' network of investors',
            'Exit strategy guidance and preparation',
            'Strategic partnerships with corporate partners for pilot projects',
            'International market access through Lead Angels\' global partnerships',
            'Board representation and governance support',
            'Access to Lead Angels\' extensive resources and expertise',
            'Regular workshops on fundraising, growth strategies, and business development'
        ]
    }
};

// Modal functionality
const modal = document.getElementById('programModal');
const closeBtn = document.querySelector('.close-btn');

// Close modal when clicking the close button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Function to open program modal
function openProgramModal(program) {
    const modal = document.getElementById('programModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFunding = document.getElementById('modalFunding');
    const modalEquity = document.getElementById('modalEquity');
    const modalEligibility = document.getElementById('modalEligibility');
    const modalProcess = document.getElementById('modalProcess');
    const modalBenefits = document.getElementById('modalBenefits');

    // Handle both data structures (from script.js and content.js)
    const title = program.title || program.name;
    const description = program.description;
    const funding = program.funding;
    const equity = program.equity;
    const eligibility = program.eligibility || [];
    const process = program.process || [];
    const benefits = program.benefits || [];

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalFunding.innerHTML = `<i class="fas fa-money-bill-wave"></i> ${funding}`;
    modalEquity.innerHTML = `<i class="fas fa-chart-pie"></i> ${equity}`;

    // Clear existing lists
    modalEligibility.innerHTML = '';
    modalProcess.innerHTML = '';
    modalBenefits.innerHTML = '';

    // Populate lists
    eligibility.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalEligibility.appendChild(li);
    });

    process.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalProcess.appendChild(li);
    });

    benefits.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalBenefits.appendChild(li);
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Function to open application form
function openApplicationForm(programId, programTitle) {
    const modal = document.getElementById('programModal');
    modal.innerHTML = `
        <div class="modal-content application-form">
            <span class="close-btn">&times;</span>
            <h2>Apply for ${programTitle}</h2>
            <form id="applicationForm">
                <input type="hidden" id="programId" value="${programId}">
                <input type="hidden" id="programTitle" value="${programTitle}">
                
                <div class="form-group">
                    <label for="appName">Full Name *</label>
                    <input type="text" id="appName" required>
                </div>
                
                <div class="form-group">
                    <label for="appEmail">Email Address *</label>
                    <input type="email" id="appEmail" required>
                </div>
                
                <div class="form-group">
                    <label for="appPhone">Phone Number *</label>
                    <input type="tel" id="appPhone" required>
                </div>
                
                <div class="form-group">
                    <label for="appCompanyName">Company/Startup Name *</label>
                    <input type="text" id="appCompanyName" required>
                </div>
                
                <div class="form-group">
                    <label for="appBusinessDescription">Business Description *</label>
                    <textarea id="appBusinessDescription" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="appTeamSize">Team Size</label>
                    <input type="number" id="appTeamSize" min="1">
                </div>
                
                <div class="form-group">
                    <label for="appFundingNeeded">Funding Needed (in Lakhs)</label>
                    <input type="number" id="appFundingNeeded" step="0.01">
                </div>
                
                <button type="submit" class="submit-btn">Submit Application</button>
            </form>
        </div>
    `;

    // Add event listeners
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.onclick = () => modal.style.display = 'none';

    const applicationForm = document.getElementById('applicationForm');
    applicationForm.onsubmit = async (e) => {
        e.preventDefault();
        
        const submitBtn = applicationForm.querySelector('button');
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
        
        try {
            const formData = {
                programId: document.getElementById('programId').value,
                programTitle: document.getElementById('programTitle').value,
                name: document.getElementById('appName').value,
                email: document.getElementById('appEmail').value,
                phone: document.getElementById('appPhone').value,
                companyName: document.getElementById('appCompanyName').value,
                businessDescription: document.getElementById('appBusinessDescription').value,
                teamSize: document.getElementById('appTeamSize').value || null,
                fundingNeeded: document.getElementById('appFundingNeeded').value || null
            };

            const response = await fetch('handle_application.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (result.success) {
                alert('Application submitted successfully!');
                modal.style.display = 'none';
                
                // Log the application activity
                logActivity('program_application', {
                    programId: formData.programId,
                    programTitle: formData.programTitle
                });
            } else {
                throw new Error(result.message || 'Failed to submit application');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            submitBtn.innerHTML = 'Submit Application';
            submitBtn.disabled = false;
        }
    };

    modal.style.display = 'block';
}

// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for Learn More buttons
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const programId = this.getAttribute('data-program');
            // Check both script.js and content.js data
            let program = programData[programId];
            
            // If program not found, try to find it by name
            if (!program) {
                const programName = this.closest('.program-card').querySelector('h3').textContent;
                // Search for program by name in programData
                for (const key in programData) {
                    if (programData[key].name === programName || programData[key].title === programName) {
                        program = programData[key];
                        break;
                    }
                }
            }
            
            if (program) {
                openProgramModal(program);
            } else {
                console.error('Program data not found for:', programId);
            }
        });
    });

    // Add event listeners for Apply Now buttons
    document.querySelectorAll('.apply-now-btn').forEach(button => {
        button.addEventListener('click', function() {
            const programId = this.getAttribute('data-program');
            const programTitle = this.closest('.program-card').querySelector('h3').textContent;
            
            // Check both script.js and content.js data
            let program = programData[programId];
            
            // If program not found, try to find it by name
            if (!program) {
                // Search for program by name in programData
                for (const key in programData) {
                    if (programData[key].name === programTitle || programData[key].title === programTitle) {
                        program = programData[key];
                        break;
                    }
                }
            }
            
            if (program) {
                openApplicationForm(programId, programTitle);
            } else {
                console.error('Program data not found for:', programId);
            }
        });
    });

    // Close modal when clicking the close button
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('programModal').style.display = 'none';
        document.body.style.overflow = '';
    });

    // Close application modal when clicking the close button
    document.getElementById('closeApplicationBtn').addEventListener('click', () => {
        document.getElementById('applicationModal').style.display = 'none';
        document.body.style.overflow = '';
    });

    // Handle application form submission
    document.getElementById('applicationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get program ID from form
        const programId = this.getAttribute('data-program-id');
        
        // Log the application (replace with actual form submission logic)
        console.log('Application submitted for program:', programId);
        
        // Show success message
        alert('Your application has been submitted successfully!');
        
        // Close modal
        document.getElementById('applicationModal').style.display = 'none';
        document.body.style.overflow = '';
    });

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        const programModal = document.getElementById('programModal');
        const applicationModal = document.getElementById('applicationModal');
        
        if (event.target === programModal) {
            programModal.style.display = 'none';
            document.body.style.overflow = '';
        }
        
        if (event.target === applicationModal) {
            applicationModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const programCards = document.querySelectorAll('.program-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        
        programCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-type') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Sort functionality
const sortSelect = document.getElementById('sortSelect');
sortSelect.addEventListener('change', () => {
    const sortBy = sortSelect.value;
    const cardsContainer = document.querySelector('.program-cards');
    const cards = Array.from(cardsContainer.querySelectorAll('.program-card'));

    cards.sort((a, b) => {
        if (sortBy === 'name') {
            return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
        } else if (sortBy === 'funding') {
            const amountA = parseInt(a.querySelector('.program-meta span').textContent.replace(/[^0-9]/g, ''));
            const amountB = parseInt(b.querySelector('.program-meta span').textContent.replace(/[^0-9]/g, ''));
            return amountB - amountA;
        } else if (sortBy === 'equity') {
            const equityA = parseInt(a.querySelector('.program-meta span:nth-child(2)').textContent.replace(/[^0-9]/g, ''));
            const equityB = parseInt(b.querySelector('.program-meta span:nth-child(2)').textContent.replace(/[^0-9]/g, ''));
            return equityA - equityB;
        }
    });

    cards.forEach(card => cardsContainer.appendChild(card));
});

// Mobile menu toggle
const menuBtnMobile = document.querySelector('.menu-btn-mobile');
const navLinksMobile = document.querySelector('.nav-links-mobile');

menuBtnMobile.addEventListener('click', () => {
    navLinksMobile.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtnMobile.contains(e.target) && !navLinksMobile.contains(e.target)) {
        navLinksMobile.classList.remove('active');
    }
});

// Function to log activity
async function logActivity(type, data) {
    try {
        const response = await fetch('log_activity.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                data: data
            })
        });

        const result = await response.json();
        if (!result.success) {
            console.error('Error logging activity:', result.error);
        }
    } catch (error) {
        console.error('Error logging activity:', error);
    }
}
