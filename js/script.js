document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const resumeForm = document.getElementById('resumeForm');
    const addExperienceBtn = document.getElementById('addExperience');
    const addEducationBtn = document.getElementById('addEducation');
    const experienceFields = document.getElementById('experienceFields');
    const educationFields = document.getElementById('educationFields');
    const skillInput = document.getElementById('skillInput');
    const skillList = document.getElementById('skillList');
    const resetFormBtn = document.getElementById('resetForm');
    const downloadPdfBtn = document.getElementById('downloadPdf');
    const resumeTheme = document.getElementById('resumeTheme');
    const colorScheme = document.getElementById('colorScheme');
    const resumePreview = document.getElementById('resumePreview');

    // Add experience entry
    addExperienceBtn.addEventListener('click', function() {
        const newExperience = document.createElement('div');
        newExperience.className = 'experience-entry';
        newExperience.innerHTML = `
            <div class="form-row">
                <div class="form-col">
                    <label>Job Title</label>
                    <input type="text" class="jobTitle" required>
                </div>
                <div class="form-col">
                    <label>Company</label>
                    <input type="text" class="company" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label>Start Date</label>
                    <input type="month" class="startDate">
                </div>
                <div class="form-col">
                    <label>End Date</label>
                    <input type="month" class="endDate">
                </div>
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label>Description</label>
                    <textarea class="jobDescription" rows="3"></textarea>
                </div>
            </div>
            <button type="button" class="remove-experience">Remove</button>
        `;
        experienceFields.appendChild(newExperience);
        
        // Add event listener to the new remove button
        newExperience.querySelector('.remove-experience').addEventListener('click', function() {
            if (experienceFields.children.length > 1) {
                experienceFields.removeChild(newExperience);
            } else {
                alert('You need at least one work experience entry.');
            }
        });
    });

    // Add education entry
    addEducationBtn.addEventListener('click', function() {
        const newEducation = document.createElement('div');
        newEducation.className = 'education-entry';
        newEducation.innerHTML = `
            <div class="form-row">
                <div class="form-col">
                    <label>Degree</label>
                    <input type="text" class="degree" required>
                </div>
                <div class="form-col">
                    <label>Institution</label>
                    <input type="text" class="institution" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label>Year Completed</label>
                    <input type="month" class="educationDate">
                </div>
            </div>
            <button type="button" class="remove-education">Remove</button>
        `;
        educationFields.appendChild(newEducation);
        
        // Add event listener to the new remove button
        newEducation.querySelector('.remove-education').addEventListener('click', function() {
            if (educationFields.children.length > 1) {
                educationFields.removeChild(newEducation);
            } else {
                alert('You need at least one education entry.');
            }
        });
    });

    // Add skills
    skillInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            e.preventDefault();
            
            const skill = this.value.trim();
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.innerHTML = `
                ${skill}
                <button type="button">&times;</button>
            `;
            
            skillList.appendChild(skillTag);
            this.value = '';
            
            // Add event listener to remove button
            skillTag.querySelector('button').addEventListener('click', function() {
                skillList.removeChild(skillTag);
            });
        }
    });

    // Add certification entry
    const addCertificationBtn = document.getElementById('addCertification');
    const certificationFields = document.getElementById('certificationFields');
    if (addCertificationBtn && certificationFields) {
        addCertificationBtn.addEventListener('click', function() {
            const newCertification = document.createElement('div');
            newCertification.className = 'certification-entry';
            newCertification.innerHTML = `
                <div class="form-row">
                    <div class="form-col">
                        <label>Certification Name</label>
                        <input type="text" class="certificationName" required>
                    </div>
                    <div class="form-col">
                        <label>Issuer</label>
                        <input type="text" class="certificationIssuer" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label>Date</label>
                        <input type="month" class="certificationDate">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <label>Description</label>
                        <textarea class="certificationDescription" rows="2"></textarea>
                    </div>
                </div>
                <button type="button" class="remove-certification">Remove</button>
            `;
            certificationFields.appendChild(newCertification);
            // Add event listener to the new remove button
            newCertification.querySelector('.remove-certification').addEventListener('click', function() {
                if (certificationFields.children.length > 1) {
                    certificationFields.removeChild(newCertification);
                } else {
                    alert('You need at least one certification entry.');
                }
            });
        });
        // Remove certification entry for the first one
        certificationFields.querySelector('.remove-certification').addEventListener('click', function() {
            if (certificationFields.children.length > 1) {
                certificationFields.removeChild(certificationFields.firstElementChild);
            } else {
                alert('You need at least one certification entry.');
            }
        });
    }

    // Reset form
    resetFormBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset the form? All your data will be lost.')) {
            resumeForm.reset();
            skillList.innerHTML = '';
            
            // Reset to one experience and one education entry
            while (experienceFields.children.length > 1) {
                experienceFields.removeChild(experienceFields.lastChild);
            }
            
            while (educationFields.children.length > 1) {
                educationFields.removeChild(educationFields.lastChild);
            }
            
            // Clear all inputs in the first entries
            const firstExperience = experienceFields.firstElementChild;
            firstExperience.querySelector('.jobTitle').value = '';
            firstExperience.querySelector('.company').value = '';
            firstExperience.querySelector('.startDate').value = '';
            firstExperience.querySelector('.endDate').value = '';
            firstExperience.querySelector('.jobDescription').value = '';
            
            const firstEducation = educationFields.firstElementChild;
            firstEducation.querySelector('.degree').value = '';
            firstEducation.querySelector('.institution').value = '';
            firstEducation.querySelector('.educationDate').value = '';
            
            // Reset preview
            resumePreview.innerHTML = `
                <div class="resume-placeholder">
                    <p>Fill out the form to see your resume preview</p>
                </div>
            `;
        }
    });

    // Download PDF (mock functionality)
    downloadPdfBtn.addEventListener('click', function() {
        alert('This is just a mock.');
    });

    // Update resume preview
    resumeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updateResumePreview();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Theme and color scheme changes
    resumeTheme.addEventListener('change', updateResumePreview);
    colorScheme.addEventListener('change', updateResumePreview);

    // Collapsible sections logic
    document.querySelectorAll('.collapsible').forEach(section => {
        const header = section.querySelector('.collapsible-header');
        const toggleBtn = section.querySelector('.collapse-toggle');
        const content = section.querySelector('.collapsible-content');
        // Set initial state
        section.classList.remove('collapsed');
        toggleBtn.setAttribute('aria-expanded', 'true');
        // Toggle on header or button click
        function toggleCollapse() {
            const isCollapsed = section.classList.toggle('collapsed');
            toggleBtn.setAttribute('aria-expanded', !isCollapsed);
            content.setAttribute('aria-hidden', isCollapsed);
        }
        header.addEventListener('click', function(e) {
            // Only toggle if not clicking inside the content
            if (e.target === header || e.target === toggleBtn || header.contains(e.target)) {
                toggleCollapse();
            }
        });
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleCollapse();
        });
    });

    // Function to update the resume preview
    function updateResumePreview() {
        // Get form values
        const formData = {
            personal: {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                linkedin: document.getElementById('linkedin').value,
                portfolio: document.getElementById('portfolio').value
            },
            summary: document.getElementById('summary').value,
            experiences: [],
            educations: [],
            skills: [],
            certifications: []
        };

        // Get work experiences
        const experienceEntries = document.querySelectorAll('.experience-entry');
        experienceEntries.forEach(entry => {
            formData.experiences.push({
                jobTitle: entry.querySelector('.jobTitle').value,
                company: entry.querySelector('.company').value,
                startDate: formatDate(entry.querySelector('.startDate').value),
                endDate: formatDate(entry.querySelector('.endDate').value),
                description: entry.querySelector('.jobDescription').value
            });
        });

        // Get education
        const educationEntries = document.querySelectorAll('.education-entry');
        educationEntries.forEach(entry => {
            formData.educations.push({
                degree: entry.querySelector('.degree').value,
                institution: entry.querySelector('.institution').value,
                date: formatDate(entry.querySelector('.educationDate').value)
            });
        });

        // Get skills
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            formData.skills.push(tag.firstChild.textContent.trim());
        });

        // Get certifications
        const certificationEntries = document.querySelectorAll('.certification-entry');
        certificationEntries.forEach(entry => {
            formData.certifications.push({
                name: entry.querySelector('.certificationName').value,
                issuer: entry.querySelector('.certificationIssuer').value,
                date: formatDate(entry.querySelector('.certificationDate').value),
                description: entry.querySelector('.certificationDescription').value
            });
        });

        // Get selected theme and color
        const theme = resumeTheme.value;
        const color = colorScheme.value;

        // Generate HTML for the resume
        resumePreview.innerHTML = generateResumeHTML(formData, theme, color);
    }

    // Helper function to format date (MM/YYYY)
    function formatDate(dateString) {
        if (!dateString) return 'Present';
        
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        
        return `${month} ${year}`;
    }

    // Function to generate the resume HTML
    function generateResumeHTML(data, theme, color) {
        let experiencesHTML = '';
        let educationHTML = '';
        let skillsHTML = '';
        
        // Generate experiences HTML
        data.experiences.forEach(exp => {
            if (exp.jobTitle && exp.company) {
                experiencesHTML += `
                    <div class="resume-experience-item">
                        <div class="resume-job-header">
                            <div>
                                <span class="resume-job-title">${exp.jobTitle}</span>
                                <span class="resume-company">, ${exp.company}</span>
                            </div>
                            <div class="resume-date">${exp.startDate} - ${exp.endDate}</div>
                        </div>
                        <div class="resume-job-description">${exp.description}</div>
                    </div>
                `;
            }
        });
        
        // Generate education HTML
        data.educations.forEach(edu => {
            if (edu.degree && edu.institution) {
                educationHTML += `
                    <div class="resume-education-item">
                        <div class="resume-education-header">
                            <div>
                                <span class="resume-degree">${edu.degree}</span>
                                <span class="resume-institution">, ${edu.institution}</span>
                            </div>
                            <div class="resume-date">${edu.date}</div>
                        </div>
                    </div>
                `;
            }
        });
        
        // Generate certifications HTML
        let certificationsHTML = '';
        if (data.certifications && data.certifications.length > 0 && data.certifications.some(c => c.name && c.issuer)) {
            certificationsHTML = `
                <div class="resume-section">
                    <h2 class="resume-section-title">CERTIFICATIONS</h2>
                    ${data.certifications.map(cert => cert.name && cert.issuer ? `
                        <div class="resume-certification-item">
                            <div class="resume-cert-header">
                                <span class="resume-cert-title">
                                    <span class="resume-cert-name">${cert.name}</span>
                                    <span class="resume-cert-issuer">, ${cert.issuer}</span>
                                </span>
                                <span class="resume-date">${cert.date}</span>
                            </div>
                            <div class="resume-cert-description">${cert.description || ''}</div>
                        </div>
                    ` : '').join('')}
                </div>
            `;
        }
        // Generate skills HTML as comma-separated list
        if (data.skills && data.skills.length > 0) {
            skillsHTML = `
                <div class="resume-section">
                    <h2 class="resume-section-title">SKILLS</h2>
                    <div class="resume-skills-list">${data.skills.map(skill => skill.trim()).filter(Boolean).join(', ')}</div>
                </div>
            `;
        }
        
        // Generate contact HTML (split left/right)
        const leftContactItems = [];
        const rightContactItems = [];
        if (data.personal.email) leftContactItems.push(`<div class="resume-contact-item">${data.personal.email}</div>`);
        if (data.personal.phone) leftContactItems.push(`<div class="resume-contact-item">${data.personal.phone}</div>`);
        if (data.personal.linkedin) rightContactItems.push(`<div class="resume-contact-item"><a href="${data.personal.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div>`);
        if (data.personal.portfolio) rightContactItems.push(`<div class="resume-contact-item"><a href="${data.personal.portfolio}" target="_blank" rel="noopener">Portfolio</a></div>`);
        
        // Combine all parts
        return `
            <div class="resume ${theme} ${color}">
                <div class="resume-header">
                    <h1 class="resume-name">${data.personal.firstName} ${data.personal.lastName}</h1>
                    <div class="resume-contact">
                        <div class="resume-contact-left">
                            ${leftContactItems.join('')}
                        </div>
                        <div class="resume-contact-right">
                            ${rightContactItems.join('')}
                        </div>
                    </div>
                </div>
                
                ${data.summary ? `
                    <div class="resume-section">
                        <h2 class="resume-section-title">PROFESSIONAL SUMMARY</h2>
                        <div class="resume-summary">${data.summary}</div>
                    </div>
                ` : ''}
                
                ${experiencesHTML ? `
                    <div class="resume-section">
                        <h2 class="resume-section-title">WORK EXPERIENCE</h2>
                        ${experiencesHTML}
                    </div>
                ` : ''}
                
                ${skillsHTML}
                
                ${educationHTML ? `
                    <div class="resume-section">
                        <h2 class="resume-section-title">EDUCATION</h2>
                        ${educationHTML}
                    </div>
                ` : ''}
                
                ${certificationsHTML}
            </div>
        `;
    }
});