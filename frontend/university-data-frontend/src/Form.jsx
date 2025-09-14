// form.jsx
import React, { useState, useEffect } from 'react';
import './form.css';

const CollegeProgramForm = () => {
  const [formData, setFormData] = useState({
    college: '',
    totalPrograms: '',
    ugcFollowed: '',
    ugProgramsNumber: '',
    ugProgramsPercentage: '',
    regulatingCouncilsNumber: '',
    regulatingCouncilsNames: '',
    regulatingCouncilsPercentage: '',
    ccfugpProgramsNumber: '',
    ccfugpProgramsPercentage: '',
    bachelorDegreeNumber: '',
    bachelorDegreeList: '',
    bachelorDegreePercentage: '',
    bVocNumber: '',
    bVocList: '',
    bVocPercentage: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // College data from CSV
  const collegeData = {
    'JCBUST': {
      programs: 20, 
      ugcFollowed: 'Yes',
      ugProgramsNumber: 2,
      ugProgramsPercentage: 10,
      regulatingCouncilsNumber: 10,
      regulatingCouncilsPercentage: 50,
      bachelorDegreeNumber: 3,
      bachelorDegreePercentage: 15,
      bVocNumber: 5,
      bVocPercentage: 25
    },
    'GJU': { 
      programs: 10, 
      ugcFollowed: 'Yes',
      ugProgramsNumber: 3,
      ugProgramsPercentage: 30,
      regulatingCouncilsNumber: 5,
      regulatingCouncilsPercentage: 50,
      bachelorDegreeNumber: 0,
      bachelorDegreePercentage: 0,
      bVocNumber: 1,
      bVocPercentage: 10
    },
    'Manav Rachna': { 
      programs: 15, 
      ugcFollowed: 'No',
      ugProgramsNumber: 0,
      ugProgramsPercentage: 0,
      regulatingCouncilsNumber: 10,
      regulatingCouncilsPercentage: 66.6666667,
      bachelorDegreeNumber: 2,
      bachelorDegreePercentage: 13.3333333,
      bVocNumber: 1,
      bVocPercentage: 6.6666667
    },
    'DCRUST': { 
      programs: 25, 
      ugcFollowed: 'Yes',
      ugProgramsNumber: 6,
      ugProgramsPercentage: 24,
      regulatingCouncilsNumber: 12,
      regulatingCouncilsPercentage: 48,
      bachelorDegreeNumber: 0,
      bachelorDegreePercentage: 0,
      bVocNumber: 3,
      bVocPercentage: 12
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.college) {
      newErrors.college = 'Please select an institution';
    }

    if (!formData.ugcFollowed) {
      newErrors.ugcFollowed = 'Please select if UGC CCFUGP is followed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          college: '',
          totalPrograms: '',
          ugcFollowed: '',
          ugProgramsNumber: '',
          ugProgramsPercentage: '',
          regulatingCouncilsNumber: '',
          regulatingCouncilsNames: '',
          regulatingCouncilsPercentage: '',
          ccfugpProgramsNumber: '',
          ccfugpProgramsPercentage: '',
          bachelorDegreeNumber: '',
          bachelorDegreeList: '',
          bachelorDegreePercentage: '',
          bVocNumber: '',
          bVocList: '',
          bVocPercentage: ''
        });
      }, 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      college: '',
      totalPrograms: '',
      ugcFollowed: '',
      ugProgramsNumber: '',
      ugProgramsPercentage: '',
      regulatingCouncilsNumber: '',
      regulatingCouncilsNames: '',
      regulatingCouncilsPercentage: '',
      ccfugpProgramsNumber: '',
      ccfugpProgramsPercentage: '',
      bachelorDegreeNumber: '',
      bachelorDegreeList: '',
      bachelorDegreePercentage: '',
      bVocNumber: '',
      bVocList: '',
      bVocPercentage: ''
    });
    setErrors({});
    setSubmitted(false);
  };

  // Auto-populate fields when college is selected
  useEffect(() => {
    if (formData.college && collegeData[formData.college]) {
      const data = collegeData[formData.college];
      setFormData(prev => ({
        ...prev,
        totalPrograms: data.programs,
        ugProgramsNumber: data.ugProgramsNumber,
        ugProgramsPercentage: data.ugProgramsPercentage,
        regulatingCouncilsNumber: data.regulatingCouncilsNumber,
        regulatingCouncilsPercentage: data.regulatingCouncilsPercentage,
        bachelorDegreeNumber: data.bachelorDegreeNumber,
        bachelorDegreePercentage: data.bachelorDegreePercentage,
        bVocNumber: data.bVocNumber,
        bVocPercentage: data.bVocPercentage
      }));
    }
  }, [formData.college]);

  return (
    <div className="container">
      <div className="header">
        <h1 className="header-title">🏛️ UGC College Program Registration System</h1>
        <p className="header-subtitle">University Grants Commission - Government of India</p>
      </div>

      <div className="form-container">
        <h2 className="form-title">Institution Program Registration Form</h2>

        {submitted && (
          <div className="success-message">
            ✅ Form submitted successfully! Thank you for your submission.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Institution Selection */}
            <div className="form-group form-group-full">
              <label className="label">
                Select Institution <span className="required">*</span>
              </label>
              <select
                className="select"
                value={formData.college}
                onChange={(e) => updateFormData('college', e.target.value)}
                required
              >
                <option value="">-- Select Institution --</option>
                <option value="JCBUST">JCBUST</option>
                <option value="GJU">GJU</option>
                <option value="Manav Rachna">Manav Rachna</option>
                <option value="DCRUST">DCRUST</option>
              </select>
              {errors.college && <span className="validation-message">{errors.college}</span>}
            </div>

            {/* Total Programs Card */}
            {formData.college && (
              <div className="card">
                <h3 className="card-title">{formData.totalPrograms || '0'}</h3>
                <p className="card-subtitle">Total Number of Programs</p>
              </div>
            )}

            {/* UGC CCFUGP Section */}
            <h3 className="section-title">UGC CCFUGP Information</h3>
            
            <div className="form-group form-group-full">
              <label className="label">
                Is UGC CCFUGP followed? <span className="required">*</span>
              </label>
              <div className="radio-group">
                <div
                  className={`radio-option ${formData.ugcFollowed === 'Yes' ? 'selected' : ''}`}
                  onClick={() => updateFormData('ugcFollowed', 'Yes')}
                >
                  <input
                    type="radio"
                    name="ugc_followed"
                    value="Yes"
                    checked={formData.ugcFollowed === 'Yes'}
                    onChange={() => updateFormData('ugcFollowed', 'Yes')}
                  />
                  <label>Yes</label>
                </div>
                <div
                  className={`radio-option ${formData.ugcFollowed === 'No' ? 'selected' : ''}`}
                  onClick={() => updateFormData('ugcFollowed', 'No')}
                >
                  <input
                    type="radio"
                    name="ugc_followed"
                    value="No"
                    checked={formData.ugcFollowed === 'No'}
                    onChange={() => updateFormData('ugcFollowed', 'No')}
                  />
                  <label>No</label>
                </div>
              </div>
              {errors.ugcFollowed && <span className="validation-message">{errors.ugcFollowed}</span>}
            </div>

            <div className="form-group">
              <label className="label">Number of UG programmes aligned to UGC CCFUGP</label>
              <input
                type="number"
                className="input"
                value={formData.ugProgramsNumber}
                onChange={(e) => updateFormData('ugProgramsNumber', e.target.value)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="label">Percentage of UG programmes aligned to UGC CCFUGP</label>
              <input
                type="number"
                className="input"
                value={formData.ugProgramsPercentage}
                onChange={(e) => updateFormData('ugProgramsPercentage', e.target.value)}
                min="0"
                max="100"
                step="0.01"
              />
            </div>

            {/* Regulating Councils Section */}
            <h3 className="section-title">Regulating Councils Information</h3>

            <div className="form-group">
              <label className="label">Number of UG programmes aligned to Regulating Councils</label>
              <input
                type="number"
                className="input"
                value={formData.regulatingCouncilsNumber}
                onChange={(e) => updateFormData('regulatingCouncilsNumber', e.target.value)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="label">Percentage aligned to Regulating Councils</label>
              <input
                type="number"
                className="input"
                value={formData.regulatingCouncilsPercentage}
                onChange={(e) => updateFormData('regulatingCouncilsPercentage', e.target.value)}
                min="0"
                max="100"
                step="0.01"
              />
            </div>

            <div className="form-group form-group-full">
              <label className="label">Names of Regulating Councils</label>
              <textarea
                className="textarea"
                value={formData.regulatingCouncilsNames}
                onChange={(e) => updateFormData('regulatingCouncilsNames', e.target.value)}
                placeholder="Enter council names separated by commas (e.g., AICTE, UGC, NCTE)"
                rows="3"
              />
            </div>

            {/* CCFUGP Programs Section */}
            <h3 className="section-title">CCFUGP Programs (neither CCFUGP nor Council)</h3>

            <div className="form-group">
              <label className="label">Number of programmes neither CCFUGP nor Council</label>
              <input
                type="number"
                className="input"
                value={formData.ccfugpProgramsNumber}
                onChange={(e) => updateFormData('ccfugpProgramsNumber', e.target.value)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="label">Percentage of programmes neither CCFUGP nor Council</label>
              <input
                type="number"
                className="input"
                value={formData.ccfugpProgramsPercentage}
                onChange={(e) => updateFormData('ccfugpProgramsPercentage', e.target.value)}
                min="0"
                max="100"
                step="0.01"
              />
            </div>

            {/* Bachelor Degree Programs Section */}
            <h3 className="section-title">3-year Bachelor Degree Programs</h3>

            <div className="form-group">
              <label className="label">Number of 3-year bachelor Degree programmes (non-B.VOC)</label>
              <input
                type="number"
                className="input"
                value={formData.bachelorDegreeNumber}
                onChange={(e) => updateFormData('bachelorDegreeNumber', e.target.value)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="label">Percentage of 3-year bachelor Degree programmes (non-B.VOC)</label>
              <input
                type="number"
                className="input"
                value={formData.bachelorDegreePercentage}
                onChange={(e) => updateFormData('bachelorDegreePercentage', e.target.value)}
                min="0"
                max="100"
                step="0.01"
              />
            </div>

            <div className="form-group form-group-full">
              <label className="label">List of 3-year bachelor Degree programmes (non-B.VOC)</label>
              <textarea
                className="textarea"
                value={formData.bachelorDegreeList}
                onChange={(e) => updateFormData('bachelorDegreeList', e.target.value)}
                placeholder="Enter program names separated by commas (e.g., B.A., B.Sc., B.Com)"
                rows="3"
              />
            </div>

            {/* B.VOC Programs Section */}
            <h3 className="section-title">B.VOC Programs</h3>

            <div className="form-group">
              <label className="label">Number of B.VOC programmes</label>
              <input
                type="number"
                className="input"
                value={formData.bVocNumber}
                onChange={(e) => updateFormData('bVocNumber', e.target.value)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="label">Percentage of B.VOC programmes</label>
              <input
                type="number"
                className="input"
                value={formData.bVocPercentage}
                onChange={(e) => updateFormData('bVocPercentage', e.target.value)}
                min="0"
                max="100"
                step="0.01"
              />
            </div>

            <div className="form-group form-group-full">
              <label className="label">List of B.VOC programmes</label>
              <textarea
                className="textarea"
                value={formData.bVocList}
                onChange={(e) => updateFormData('bVocList', e.target.value)}
                placeholder="Enter B.VOC program names separated by commas"
                rows="3"
              />
            </div>
          </div>

          <div className="button-container">
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Reset Form
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Registration
            </button>
          </div>

          <div className="form-footer">
            <p>© 2024 University Grants Commission, Government of India. All rights reserved.</p>
            <p>For technical support, contact: support@ugc.ac.in</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollegeProgramForm;