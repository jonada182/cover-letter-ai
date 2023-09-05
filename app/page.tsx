'use client'
import { Form, FormButton, FormInput, FormTextarea } from "@/components/Form"
import { useGetCareerProfile, usePostCoverLetter } from "@/hooks";
import { CoverLetterRequest } from "@/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { usePageContext } from "./contexts/PageContext";
import jsPDF from "jspdf";

const initialCoverLetterRequest: CoverLetterRequest = {
  email: 'test@ceo.com',
  job_posting: {
    company_name: '',
    job_details: '',
    job_role: '',
    skills: '',
  }
};

const initialCoverLetter = "[Your Name]\n[Your Address]\n[City, State, ZIP]\n[Email Address]\n[Phone Number]\n[Date]\n\n[Employer's Name]\n[Company Name]\n[Company Address]\n[City, State, ZIP]\n\nDear [Employer's Name],\n\nI am writing to express my keen interest in the CEO position at Acme Inc. As a highly experienced executive leader with over 10 years in various management roles, I strongly believe that my skills in sales, accounting, and management align perfectly with the requirements of this position.\n\nWith a proven track record of successfully driving growth and profitability in my previous roles, I have consistently demonstrated my ability to lead companies towards achieving their strategic goals. Throughout my career, I have held senior executive positions where I have been responsible for developing and implementing comprehensive sales strategies that resulted in substantial revenue growth. Furthermore, my expertise in accounting allowed me to effectively manage financial resources, optimize budgets, and make data-driven decisions that positively impacted the organization's bottom line.\n\nIn addition to my sales and accounting skills, I possess exceptional leadership and management capabilities. I have a strong ability to motivate and inspire teams, fostering a culture of productivity, innovation, and collaboration. By leveraging my strategic mindset and strong business acumen, I have been able to successfully navigate through challenges, identify opportunities for improvement, and implement effective solutions. I am confident that these qualities, coupled with my extensive experience, make me an ideal candidate for the CEO role at Acme Inc.\n\nI am attracted to Acme Inc. for its strong reputation in the industry and its commitment to excellence. I am excited about the opportunity to lead the company through its next phase of growth and contribute to its continued success. I believe that my expertise, combined with Acme Inc.'s exceptional team, products, and market position, can lead to significant achievements in the near future.\n\nI would welcome the opportunity to discuss how my skills and experience align with the needs of Acme Inc. Thank you for considering my application. I have attached my resume for your review, and I look forward to the possibility of discussing my candidacy further.\n\nSincerely,\n\n[Your Name]";

export default function Page() {
  const [coverLetterRequest, setCoverLetterRequest] = useState<CoverLetterRequest>(initialCoverLetterRequest);
  const [coverLetterText, setCoverLetterText] = useState<string>(initialCoverLetter)
  const { setError, setLoading } = usePageContext();

  const { 
    data: careerProfileData, 
    isSuccess: careerProfileSuccess,
    isLoading: careerProfileLoading,
    error: careerProfileError,
  } = useGetCareerProfile({ email: coverLetterRequest.email, isEnabled: false });
  const { 
    data: coverLetter, 
    error: coverLetterError, 
    isLoading: coverLetterLoading, 
    mutate: submitCoverLetter,
    reset: resetCoverLetter,
  } = usePostCoverLetter();

  useEffect(() => {
    if (coverLetter) {
      setCoverLetterText(coverLetter)
    } else {
      setCoverLetterText(initialCoverLetter)
    }
    
    setLoading(coverLetterLoading)
    setError(coverLetterError)
  }, [coverLetter, coverLetterError, coverLetterLoading]);

  useEffect(() => {
    if (careerProfileData?.contact_info?.email) {
      
    } else {
      
    }
    
    setLoading(careerProfileLoading)
    setError(careerProfileError)
  }, [careerProfileData, careerProfileError, careerProfileLoading]);

  const setFormValue = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const name = event.target.name
    setCoverLetterRequest((prev) => {
      if (name.startsWith('job_posting.')) {
        const jobPostingProperty = name.split('.')[1];
        return {
          ...prev,
          job_posting: {
            ...prev.job_posting,
            [jobPostingProperty]: value,
          },
        }
      }
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  
  const submitCoverLetterForm = (event: FormEvent) => {
    event.preventDefault();
    submitCoverLetter(coverLetterRequest);
  }

  const downloadCoverLetterPDF = () => {
    const pdf = new jsPDF()
    pdf.setFontSize(10)
    // Set margins and content width
    const marginTop = 20;
    const marginLeft = 20;
    const contentWidth = pdf.internal.pageSize.getWidth() - marginLeft * 2;
    // Split the content into lines that fit within the content width
    const lines = pdf.splitTextToSize(coverLetterText, contentWidth);
    pdf.text(lines, marginLeft, marginTop)
    pdf.save(`coverletter-${coverLetterRequest.job_posting.company_name?.toLowerCase()}.pdf`)
  }

  if (coverLetterLoading) {
    return null
  }

  if (coverLetterText) {
    return (
     <div className="flex flex-col gap-6">
      <textarea 
        className="whitespace-pre-line shadow-md p-12 bg-white text-black border border-gray-200 h-80 max-h-screen font-sans"
        onChange={(e) => setCoverLetterText(e.target.value)} 
        value={coverLetterText}
      />
      <div className="flex flex-grow align-middle justify-end gap-6">
        <FormButton text="New Cover Letter" onClick={() => resetCoverLetter()}/>
        <FormButton text="Download PDF" onClick={() => downloadCoverLetterPDF()}/>
      </div>
     </div>
    )
  }

  return (
    <div>
      <Form handleOnSubmit={submitCoverLetterForm}>
        <FormInput 
          type="email" 
          labelName="Email" 
          name="email" 
          placeholder="your@email.com" 
          value={coverLetterRequest.email}
          handleOnChange={(e) => setFormValue(e)}
        />
        <div className={!careerProfileSuccess ? 'hidden' : ''}>
          <h4 className="text-gray-600 border-b-gray-300 border-b-2 py-4 mb-4">Job Posting</h4>
          <FormInput 
            type="text" 
            labelName="Company Name" 
            name="job_posting.company_name" 
            placeholder="Acme Inc" 
            value={coverLetterRequest.job_posting.company_name} 
            handleOnChange={(e) => setFormValue(e)}
          />
          <FormInput 
            type="text" 
            labelName="Job Role" 
            name="job_posting.job_role" 
            placeholder="CEO" 
            value={coverLetterRequest.job_posting.job_role} 
            handleOnChange={(e) => setFormValue(e)}
          />
          <FormTextarea 
            labelName="Job Details" 
            name="job_posting.job_details" 
            placeholder="Looking for a ..." 
            value={coverLetterRequest.job_posting.job_details} 
            handleOnChange={(e) => setFormValue(e)}
          />
          <FormInput 
            type="text" 
            labelName="Skills" 
            name="job_posting.skills" 
            placeholder="sales, accounting, etc." 
            value={coverLetterRequest.job_posting.skills} 
            handleOnChange={(e) => setFormValue(e)}
          />
        </div>
        <FormButton type="submit" text="Generate Cover Letter" id="submit_cover_letter" disabled={!careerProfileSuccess}/>
      </Form>
    </div>
  )
}
